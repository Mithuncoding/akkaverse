/**
 * Gemini client — the optional AI brain behind the Kannada Assistant.
 *
 * The app works fully offline from a curated knowledge base (data/knowledge.ts).
 * When a Gemini key is present (NEXT_PUBLIC_GEMINI_API_KEY) we let the model
 * compose a richer, grounded answer; otherwise callers fall back gracefully.
 *
 * Model: gemini-2.5-flash-lite — Google's cheapest text model, with a free
 * tier, ideal for low-cost hackathon usage.
 */

const KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? "";
const MODEL = process.env.NEXT_PUBLIC_GEMINI_MODEL || "gemini-2.5-flash-lite";

/** True when a key is configured, so the UI can show an "AI" badge. */
export const geminiEnabled = (): boolean => KEY.trim().length > 0;

const SYSTEM = `You are Akka, a warm, knowledgeable guide to the culture, history,
heritage, festivals, language and places of Karnataka, India. Answer in a friendly,
concise way (2-4 short paragraphs max). Prefer facts grounded in the provided
context. If the user writes in Kannada, reply in Kannada; otherwise reply in English.
Never invent citations. Keep it vivid but accurate.`;

export type GeminiResult = { text: string } | null;

/**
 * Ask Gemini a question, optionally grounded with local context snippets.
 * Returns null on any error / missing key so callers can fall back.
 */
export async function askGemini(
  question: string,
  context?: string,
  opts: { signal?: AbortSignal } = {},
): Promise<GeminiResult> {
  if (!geminiEnabled()) return null;

  const grounding = context?.trim()
    ? `\n\nContext you may use (Karnataka knowledge base):\n${context.trim()}`
    : "";

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    MODEL,
  )}:generateContent?key=${encodeURIComponent(KEY)}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: opts.signal,
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM }] },
        contents: [{ role: "user", parts: [{ text: `${question}${grounding}` }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 512,
          topP: 0.95,
        },
      }),
    });

    if (!res.ok) return null;
    const data = (await res.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };
    const text = data.candidates?.[0]?.content?.parts
      ?.map((p) => p.text ?? "")
      .join("")
      .trim();
    return text ? { text } : null;
  } catch {
    return null;
  }
}
