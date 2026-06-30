/**
 * Gemini client helper — now a thin, secure bridge to the server.
 *
 * The browser NEVER talks to Google directly anymore (that would expose the
 * API key). Instead it POSTs to our own /api/ask route, which holds the key
 * server-side, caches answers, and degrades gracefully. The app still works
 * fully offline from the curated knowledge base (data/knowledge.ts) — these
 * helpers simply return null when AI is unavailable.
 */

export type GeminiResult = { text: string } | null;

/**
 * Ask the server-side assistant a question, optionally grounded with local
 * context. Returns null on any error so callers can fall back to the knowledge
 * base. Never throws.
 */
export async function askGemini(
  question: string,
  context?: string,
  opts: { signal?: AbortSignal } = {},
): Promise<GeminiResult> {
  try {
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: opts.signal,
      body: JSON.stringify({ question, context: context ?? "" }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { text?: string | null };
    return data?.text ? { text: data.text } : null;
  } catch {
    return null;
  }
}

/**
 * Whether the server has a Gemini key configured. Cached after the first check
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
