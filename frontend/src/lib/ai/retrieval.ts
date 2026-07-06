/**
 * Web grounding — keyless retrieval from Wikipedia (server-side only).
 *
 * This is the anti-hallucination engine. Before the model answers, we search
 * Wikipedia for the question, pull the intro extracts of the best matches, and
 * feed them to the model as the source of truth. That means time-sensitive or
 * factual questions — "who is the current CM of Karnataka?", "most visited
 * place", "compare Karnataka and Kerala" — are answered from a real, citable
 * source instead of the model's frozen memory.
 *
 * Free, no API key, no vendor lock-in. Wikipedia asks for a descriptive
 * User-Agent, which we send. Everything degrades gracefully: on any failure we
 * return empty grounding and the model still answers from its own knowledge +
 * the curated knowledge base.
 */

const UA = "Akkaverse/1.0 (https://akkaverse.vercel.app; heritage education app)";
const API = "https://en.wikipedia.org/w/api.php";
const TIMEOUT_MS = 8000;
const MAX_TITLES = 5;
const MAX_BLOCKS = 3;
const PER_EXTRACT = 900;

export type WebSource = { title: string; url: string };
export type Grounding = { context: string; sources: WebSource[] };

const EMPTY: Grounding = { context: "", sources: [] };

async function wikiFetch(params: Record<string, string>, signal: AbortSignal) {
  const url = `${API}?${new URLSearchParams({ format: "json", ...params })}`;
  const res = await fetch(url, {
    signal,
    headers: { "User-Agent": UA, "Api-User-Agent": UA },
  });
  if (!res.ok) return null;
  return res.json();
}

/**
 * Strip conversational filler so the search targets the actual entity.
 * "Who is the current Chief Minister of Karnataka?" → "the chief minister of
 * karnataka" — which matches the right article, unlike the raw question.
 */
function cleanQuery(q: string): string {
  const s = q
    .toLowerCase()
    .replace(/[?!.]+$/g, " ")
    .replace(
      /\b(who|what|where|when|which|how|why|whose|whom|is|are|was|were|do|does|did|can|could|would|should|please|tell|me|us|about|give|current|currently|latest|now|explain)\b/g,
      " ",
    )
    .replace(/\s+/g, " ")
    .trim();
  return s.length >= 3 ? s : q;
}

/** Title-first "I'm feeling lucky" lookup — great for named entities. */
async function openSearch(q: string, signal: AbortSignal): Promise<string[]> {
  const res = (await wikiFetch(
    { action: "opensearch", search: q, limit: "3", namespace: "0" },
    signal,
  )) as [string, string[], string[], string[]] | null;
  return Array.isArray(res?.[1]) ? res![1] : [];
}

/** Full-text search — good for descriptive / comparative questions. */
async function fullSearch(q: string, signal: AbortSignal): Promise<string[]> {
  const res = (await wikiFetch(
    { action: "query", list: "search", srsearch: q, srlimit: String(MAX_TITLES), srprop: "" },
    signal,
  )) as { query?: { search?: { title: string }[] } } | null;
  return res?.query?.search?.map((s) => s.title).filter(Boolean) ?? [];
}

/**
 * Retrieve grounding for a question. Returns a compact, source-tagged context
 * block and a list of citable sources (title + URL).
 */
export async function retrieveContext(question: string): Promise<Grounding> {
  const q = question.trim();
  if (q.length < 3) return EMPTY;

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    // 1) Find the most relevant articles. Title-matching (opensearch on the
    //    cleaned entity) first for precision, then full-text for breadth.
    const cleaned = cleanQuery(q);
    const [titled, broad] = await Promise.all([
      openSearch(cleaned, ctrl.signal),
      fullSearch(q, ctrl.signal),
    ]);

    // Drop off-topic noise (opensearch/full-text sometimes surface unrelated
    // pages). Keep a title only if it shares a meaningful word with the query
    // or is clearly India/Karnataka-related.
    const tokens = cleaned.split(/\s+/).filter((w) => w.length >= 4);
    const relevant = (title: string) => {
      const t = title.toLowerCase();
      if (/\b(karnataka|kannada|india|indian|mysore|mysuru|bengaluru)\b/.test(t))
        return true;
      return tokens.some((w) => t.includes(w));
    };

    let titles = Array.from(new Set([...titled, ...broad]));
    const filtered = titles.filter(relevant);
    titles = (filtered.length > 0 ? filtered : titles).slice(0, MAX_TITLES);
    if (titles.length === 0) return EMPTY;

    // 2) Pull the intro extract + canonical URL for the top matches in one call.
    const extracts = (await wikiFetch(
      {
        action: "query",
        prop: "extracts|info",
        inprop: "url",
        exintro: "1",
        explaintext: "1",
        redirects: "1",
        titles: titles.slice(0, MAX_TITLES).join("|"),
      },
      ctrl.signal,
    )) as {
      query?: {
        pages?: Record<
          string,
          { title?: string; extract?: string; fullurl?: string }
        >;
      };
    } | null;

    const pages = extracts?.query?.pages
      ? Object.values(extracts.query.pages)
      : [];
    // Index by title so we can emit in SEARCH-RELEVANCE order (the pages object
    // is keyed by internal pageid, which is NOT the ranking we want).
    const byTitle = new Map(pages.map((p) => [p.title ?? "", p]));

    const blocks: string[] = [];
    const sources: WebSource[] = [];
    for (const title of titles) {
      const p = byTitle.get(title);
      const extract = (p?.extract ?? "").trim();
      if (!p || !extract) continue;
      blocks.push(`## ${title}\n${extract.slice(0, PER_EXTRACT)}`);
      sources.push({
        title,
        url:
          p.fullurl ??
          `https://en.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, "_"))}`,
      });
      if (blocks.length >= MAX_BLOCKS) break;
    }

    if (blocks.length === 0) return EMPTY;
    return {
      context: `Live reference from Wikipedia (use as the source of truth for facts, names, and dates):\n\n${blocks.join("\n\n")}`,
      sources,
    };
  } catch {
    return EMPTY;
  } finally {
    clearTimeout(timer);
  }
}
