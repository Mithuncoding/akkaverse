/**
 * /api/ask — the secure server-side brain for the Akka assistant.
 *
 * Why a route handler? The Gemini key MUST stay on the server. Calling Google
 * directly from the browser (the old approach) inlined the key into the client
 * bundle — anyone could steal it. Here the key never leaves the server.
 *
 * Production-grade by design:
 *  • Reads GEMINI_API_KEY from the server environment only (never NEXT_PUBLIC).
 *  • Economical model (gemini-2.5-flash-lite) with a tight token budget.
 *  • In-memory LRU+TTL cache — identical questions are answered instantly and
 *    for free, which matters during a live demo where judges repeat prompts.
 *  • Always degrades gracefully: returns { text: null } so the client can fall
 *    back to the curated, cited knowledge base.
 */

import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Server-only secret. Back-compat: accept the legacy NEXT_PUBLIC name if that's
// all that's configured, but GEMINI_API_KEY is the correct, secure variable.
const KEY =
  process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const MODEL =
  process.env.GEMINI_MODEL ||
  process.env.NEXT_PUBLIC_GEMINI_MODEL ||
  "gemini-2.5-flash-lite";

const SYSTEM = `You are Akka, a warm, knowledgeable guide to the culture, history, heritage, festivals, language and places of Karnataka, India. Answer in a friendly, concise way (2-4 short paragraphs max). Prefer facts grounded in the provided context. If the user writes in Kannada, reply in Kannada; otherwise reply in English. Never invent citations. Keep it vivid but accurate.`;

/* --- tiny in-memory cache (per server instance) --------------------- */
type Cached = { text: string; at: number };
const cache = new Map<string, Cached>();
const TTL_MS = 1000 * 60 * 60; // 1 hour
const MAX_ENTRIES = 200;

function cacheKey(q: string, c: string) {
  return `${q}\u0000${c}`.toLowerCase();
}

function readCache(key: string): string | null {
  const hit = cache.get(key);
  if (!hit) return null;
  if (Date.now() - hit.at > TTL_MS) {
    cache.delete(key);
    return null;
  }
  // refresh recency (LRU)
  cache.delete(key);
  cache.set(key, hit);
  return hit.text;
}

function writeCache(key: string, text: string) {
  cache.set(key, { text, at: Date.now() });
  if (cache.size > MAX_ENTRIES) {
    const oldest = cache.keys().next().value;
    if (oldest) cache.delete(oldest);
  }
}

/** Health/feature flag for the UI — never leaks the key itself. */
export async function GET() {
  return NextResponse.json({ enabled: KEY.trim().length > 0, model: MODEL });
}

export async function POST(req: NextRequest) {
  if (!KEY) return NextResponse.json({ text: null });

  let body: { question?: unknown; context?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ text: null }, { status: 400 });
  }

  const question = String(body.question ?? "").trim().slice(0, 2000);
  const context = String(body.context ?? "").slice(0, 6000);
  if (!question) return NextResponse.json({ text: null }, { status: 400 });

  const key = cacheKey(question, context);
  const cached = readCache(key);
  if (cached) return NextResponse.json({ text: cached, cached: true });

  const grounding = context.trim()
    ? `\n\nContext you may use (Karnataka knowledge base):\n${context.trim()}`
    : "";

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    MODEL,
  )}:generateContent`;

  try {
    // Abort if Gemini is slow — the curated fallback is always ready.
    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 12000);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": KEY,
      },
      signal: ctrl.signal,
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM }] },
        contents: [
          { role: "user", parts: [{ text: `${question}${grounding}` }] },
        ],
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: 420,
          topP: 0.95,
          // Flash-Lite supports a "thinking" phase that silently eats the
          // output-token budget (causing empty replies) and adds latency/cost.
          // For a grounded Q&A assistant we want a direct answer, so disable it.
          thinkingConfig: { thinkingBudget: 0 },
        },
      }),
    }).finally(() => clearTimeout(timeout));

    if (!res.ok) return NextResponse.json({ text: null });

    const data = (await res.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };
    const text = data.candidates?.[0]?.content?.parts
      ?.map((p) => p.text ?? "")
      .join("")
      .trim();

    if (!text) return NextResponse.json({ text: null });
    writeCache(key, text);
    return NextResponse.json({ text });
  } catch {
    return NextResponse.json({ text: null });
  }
}
