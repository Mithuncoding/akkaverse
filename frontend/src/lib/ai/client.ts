/**
 * Akka client — a thin, secure bridge from the browser to /api/ask.
 *
 * The browser NEVER talks to NVIDIA directly (that would expose the API key).
 * It POSTs to our own /api/ask route, which holds the key server-side, seeds
 * and caches answers, and degrades gracefully. The app still works fully from
 * the curated knowledge base when AI is unavailable — these helpers simply
 * return null so callers can fall back.
 *
 * Two shapes:
 *  • askAkka()    → one-shot JSON answer (simple call sites, fallbacks).
 *  • streamAkka() → real token streaming over SSE (chat & historian feel live).
 */

export type ReplyLang = "auto" | "en" | "kn" | "both";
export type WebSource = { title: string; url: string };
export type AkkaResult = { text: string; sources?: WebSource[] } | null;

/**
 * Ask Akka a question, optionally grounded with local context. Returns null on
 * any error so callers can fall back to the knowledge base. Never throws.
 */
export async function askAkka(
  question: string,
  context?: string,
  opts: { signal?: AbortSignal; replyLang?: ReplyLang } = {},
): Promise<AkkaResult> {
  try {
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: opts.signal,
      body: JSON.stringify({
        question,
        context: context ?? "",
        replyLang: opts.replyLang ?? "auto",
      }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      text?: string | null;
      sources?: WebSource[];
    };
    return data?.text ? { text: data.text, sources: data.sources } : null;
  } catch {
    return null;
  }
}

/**
 * Stream Akka's answer token-by-token. Calls `onToken` for each chunk as it
 * arrives and resolves with the full text (or null if nothing streamed).
 * Falls back cleanly: if streaming fails, callers can use askAkka/local KB.
 */
export async function streamAkka(
  question: string,
  context: string,
  handlers: {
    onToken: (t: string) => void;
    onSources?: (s: WebSource[]) => void;
    signal?: AbortSignal;
    replyLang?: ReplyLang;
  } = {
    onToken: () => {},
  },
): Promise<string | null> {
  try {
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: handlers.signal,
      body: JSON.stringify({
        question,
        context,
        stream: true,
        replyLang: handlers.replyLang ?? "auto",
      }),
    });
    if (!res.ok || !res.body) return null;

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buf = "";
    let full = "";

    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += decoder.decode(value, { stream: true });
      const lines = buf.split("\n");
      buf = lines.pop() ?? "";
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;
        try {
          const evt = JSON.parse(trimmed.slice(5).trim()) as {
            token?: string;
            done?: boolean;
            sources?: WebSource[];
          };
          if (evt.sources && handlers.onSources) handlers.onSources(evt.sources);
          if (evt.token) {
            full += evt.token;
            handlers.onToken(evt.token);
          }
        } catch {
          /* ignore partial frames */
        }
      }
    }
    return full || null;
  } catch {
    return null;
  }
}

/**
 * Whether the server has an NVIDIA key configured. Cached after the first check
 * so the UI badge resolves once and stays put. Never leaks the key.
 */
let cachedEnabled: boolean | null = null;
export async function getAiEnabled(): Promise<boolean> {
  if (cachedEnabled !== null) return cachedEnabled;
  try {
    const res = await fetch("/api/ask", { method: "GET" });
    const data = (await res.json()) as { enabled?: boolean };
    cachedEnabled = Boolean(data?.enabled);
  } catch {
    cachedEnabled = false;
  }
  return cachedEnabled;
}

/* Back-compat alias — existing call sites import { askGemini }. */
export const askGemini = askAkka;
export type GeminiResult = AkkaResult;
