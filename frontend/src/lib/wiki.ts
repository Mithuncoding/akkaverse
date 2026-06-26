/**
 * Live district info + photo, pulled from Wikipedia's public REST summary API.
 *
 * This is what makes the map feel alive: instead of hard-coding a paragraph and
 * an image per district, we fetch a fresh summary and lead photo at runtime.
 * Results are cached in-memory for the session so repeat clicks are instant.
 *
 * No API key required. The endpoint is CORS-enabled for browser use.
 */

import cacheManifest from "@/data/district-cache.json";

export type WikiInfo = {
  /** English summary paragraph. */
  extractEn: string;
  /** Kannada summary paragraph, when a matching ಕನ್ನಡ article exists. */
  extractKn: string | null;
  /** Lead image URL, if the article has one. */
  imageUrl: string | null;
  /** Canonical article URL (English). */
  pageUrl: string | null;
};

/**
 * Build-time cache produced by `scripts/cache-districts.mjs`, keyed by district
 * id. When present, the map renders instantly from local data + a locally saved
 * photo (`/districts/<id>.jpg`) instead of hitting Wikipedia on every click.
 */
const manifest = cacheManifest as Record<string, WikiInfo>;

const cache = new Map<string, WikiInfo>();

type Summary = {
  extract?: string;
  thumbnail?: { source?: string };
  originalimage?: { source?: string };
  content_urls?: { desktop?: { page?: string } };
};

async function fetchSummary(
  lang: "en" | "kn",
  title: string,
): Promise<Summary | null> {
  try {
    const res = await fetch(
      `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        title,
      )}`,
      { headers: { Accept: "application/json" } },
    );
    if (!res.ok) return null;
    return (await res.json()) as Summary;
  } catch {
    return null;
  }
}

/**
 * Fallback image lookup via the MediaWiki PageImages API. This often returns a
 * lead photo even when the REST summary has no thumbnail. CORS-enabled with
 * `origin=*`, no key required.
 */
async function fetchPageImage(
  lang: "en" | "kn",
  title: string,
): Promise<string | null> {
  try {
    const url =
      `https://${lang}.wikipedia.org/w/api.php?action=query&format=json` +
      `&origin=*&prop=pageimages&piprop=original|thumbnail&pithumbsize=800` +
      `&titles=${encodeURIComponent(title)}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = (await res.json()) as {
      query?: {
        pages?: Record<
          string,
          { original?: { source?: string }; thumbnail?: { source?: string } }
        >;
      };
    };
    const pages = data.query?.pages ?? {};
    for (const p of Object.values(pages)) {
      const src = p.original?.source ?? p.thumbnail?.source;
      if (src) return src;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Fetch live info for a district.
 * @param enTitle English Wikipedia article title.
 * @param knTitle Kannada article title to try (usually the Kannada place name).
 * @param imageTitle Optional landmark article to borrow a photo from when the
 *   district's own article has none (e.g. "Nandi Hills" for Chikkaballapura).
 * @param id District id — when given, a complete build-time cache entry is
 *   returned instantly (no network), so the map loads fast.
 */
export async function getDistrictInfo(
  enTitle: string,
  knTitle?: string,
  imageTitle?: string,
  id?: string,
): Promise<WikiInfo> {
  // 1) Prefer the local build-time cache (instant, offline, no rate limits).
  if (id) {
    const local = manifest[id];
    if (local && (local.extractEn || local.imageUrl)) {
      return local;
    }
  }

  const key = `${enTitle}|${knTitle ?? ""}|${imageTitle ?? ""}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const [en, kn] = await Promise.all([
    fetchSummary("en", enTitle),
    knTitle ? fetchSummary("kn", knTitle) : Promise.resolve(null),
  ]);

  // Resolve a lead image through several free fallbacks so every district
  // shows a photo: own summary → Kannada summary → PageImages → landmark.
  let imageUrl =
    en?.originalimage?.source ??
    en?.thumbnail?.source ??
    kn?.originalimage?.source ??
    kn?.thumbnail?.source ??
    null;

  if (!imageUrl) imageUrl = await fetchPageImage("en", enTitle);
  if (!imageUrl && knTitle) imageUrl = await fetchPageImage("kn", knTitle);
  if (!imageUrl && imageTitle) {
    imageUrl =
      (await fetchPageImage("en", imageTitle)) ??
      (await fetchSummary("en", imageTitle).then(
        (s) => s?.originalimage?.source ?? s?.thumbnail?.source ?? null,
      ));
  }

  const info: WikiInfo = {
    extractEn: en?.extract ?? "",
    extractKn: kn?.extract ?? null,
    imageUrl,
    pageUrl: en?.content_urls?.desktop?.page ?? null,
  };

  cache.set(key, info);
  return info;
}
