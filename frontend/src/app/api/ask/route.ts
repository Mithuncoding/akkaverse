/**
 * /api/ask — the secure server-side brain for Akka, powered by NVIDIA NIM.
 *
 * Why a route handler? The NVIDIA API key MUST stay on the server. Calling the
 * inference endpoint from the browser would inline the key into the client
 * bundle where anyone could steal it. Here the key never leaves the server.
 *
 * NVIDIA NIM exposes an OpenAI-compatible endpoint
 * (https://integrate.api.nvidia.com/v1/chat/completions), so a single small
 * fetch drives any NIM model — swap models with one env var, no code change.
 *
 * Production-grade by design:
 *  • Key read from the server environment only (NVIDIA_API_KEY, never NEXT_PUBLIC).
 *  • Seeded answers for common demo questions → instant, free, never fail.
 *  • In-memory LRU+TTL cache — identical questions are answered instantly.
 *  • In-flight de-duplication — concurrent identical asks share one call.
 *  • Per-IP token-bucket rate limit — caps abuse and runaway cost.
 *  • Streaming (SSE) or JSON, selected per request.
 *  • Tight timeout + graceful degradation: returns { text: null } so the client
 *    can fall back to the curated, cited knowledge base. The app always works.
 */

import { NextRequest, NextResponse } from "next/server";

import { buildMessages } from "@/lib/ai/prompts";
import { seededAnswer, normalizeQuestion } from "@/lib/ai/grounding";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* --- configuration (server-only) ------------------------------------ */
const KEY = process.env.NVIDIA_API_KEY || "";
const MODEL = process.env.NIM_MODEL || "meta/llama-3.1-8b-instruct";
const BASE_URL = process.env.NIM_BASE_URL || "https://integrate.api.nvidia.com/v1";
const ENDPOINT = `${BASE_URL.replace(/\/$/, "")}/chat/completions`;

const MAX_TOKENS = 420;
const TEMPERATURE = 0.6;
const TIMEOUT_MS = 25000;

/* --- tiny in-memory cache (per server instance) --------------------- */
type Cached = { text: string; at: number };
const cache = new Map<string, Cached>();
const TTL_MS = 1000 * 60 * 60; // 1 hour
const MAX_ENTRIES = 300;

function cacheKey(q: string, c: string) {
  return `${normalizeQuestion(q)}\u0000${c.trim()}`.slice(0, 4000);
}

function readCache(key: string): string | null {
  const hit = cache.get(key);
  if (!hit) return null;
  if (Date.now() - hit.at > TTL_MS) {
    cache.delete(key);
    return null;
  }
  cache.delete(key); // refresh recency (LRU)
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

/* --- in-flight de-duplication --------------------------------------- */
const inflight = new Map<string, Promise<string | null>>();

/* --- per-IP token-bucket rate limit --------------------------------- */
type Bucket = { tokens: number; at: number };
const buckets = new Map<string, Bucket>();
const RATE_CAPACITY = 20; // burst
const RATE_REFILL_PER_SEC = 0.5; // ~30/min sustained

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const b = buckets.get(ip) ?? { tokens: RATE_CAPACITY, at: now };
  const elapsed = (now - b.at) / 1000;
  b.tokens = Math.min(RATE_CAPACITY, b.tokens + elapsed * RATE_REFILL_PER_SEC);
  b.at = now;
  if (b.tokens < 1) {
    buckets.set(ip, b);
    return true;
  }
  b.tokens -= 1;
  buckets.set(ip, b);
  return false;
}

function clientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "local"
  );
}

/** Health/feature flag for the UI — never leaks the key itself. */
export async function GET() {
  return NextResponse.json({ enabled: KEY.trim().length > 0, model: MODEL });
}

/* --- the NIM call (non-streaming) ----------------------------------- */
async function callNim(question: string, context: string): Promise<string | null> {
  const ctrl = new AbortController();
  const timeout = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${KEY}`,
      },
      signal: ctrl.signal,
      body: JSON.stringify({
        model: MODEL,
        messages: buildMessages(question, context),
        temperature: TEMPERATURE,
        top_p: 0.95,
        max_tokens: MAX_TOKENS,
        stream: false,
      }),
    }).finally(() => clearTimeout(timeout));

    if (!res.ok) return null;
    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = data.choices?.[0]?.message?.content?.trim();
    return text || null;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  let body: { question?: unknown; context?: unknown; stream?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ text: null }, { status: 400 });
  }

  const question = String(body.question ?? "").trim().slice(0, 2000);
  const context = String(body.context ?? "").slice(0, 6000);
  const wantsStream = body.stream === true;
  if (!question) return NextResponse.json({ text: null }, { status: 400 });

  // 1) Seeded answers: instant, free, always available (even without a key).
  const seeded = seededAnswer(question);
  const key = cacheKey(question, context);

  // 2) Cache hit.
  const cached = seeded ?? readCache(key);

  if (wantsStream) {
    return streamResponse({ question, context, key, precomputed: cached, req });
  }

  if (cached) {
    if (!seeded) writeCache(key, cached);
    return NextResponse.json({ text: cached, cached: true });
  }

  if (!KEY) return NextResponse.json({ text: null });
  if (rateLimited(clientIp(req))) {
    return NextResponse.json({ text: null }, { status: 429 });
  }

  // 3) De-duplicate concurrent identical calls.
  let promise = inflight.get(key);
  if (!promise) {
    promise = callNim(question, context).finally(() => inflight.delete(key));
    inflight.set(key, promise);
  }
  const text = await promise;
  if (!text) return NextResponse.json({ text: null });
  writeCache(key, text);
  return NextResponse.json({ text });
}

/* --- streaming (Server-Sent Events) --------------------------------- */
function sse(data: object): Uint8Array {
  return new TextEncoder().encode(`data: ${JSON.stringify(data)}\n\n`);
}

function streamResponse(opts: {
  question: string;
  context: string;
  key: string;
  precomputed: string | null;
  req: NextRequest;
}): Response {
  const { question, context, key, precomputed, req } = opts;

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const finish = (full: string) => {
        controller.enqueue(sse({ done: true }));
        controller.close();
        if (full && full !== precomputed) writeCache(key, full);
      };

      // Instant path: replay a seeded/cached answer as a smooth stream.
      if (precomputed) {
        for (const tok of precomputed.split(/(\s+)/)) {
          controller.enqueue(sse({ token: tok }));
        }
        finish(precomputed);
        return;
      }

      if (!KEY || rateLimited(clientIp(req))) {
        finish("");
        return;
      }

      const ctrl = new AbortController();
      const timeout = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
      let acc = "";
      try {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${KEY}`,
          },
          signal: ctrl.signal,
          body: JSON.stringify({
            model: MODEL,
            messages: buildMessages(question, context),
            temperature: TEMPERATURE,
            top_p: 0.95,
            max_tokens: MAX_TOKENS,
            stream: true,
          }),
        });

        if (!res.ok || !res.body) {
          finish("");
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buf = "";
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += decoder.decode(value, { stream: true });
          const lines = buf.split("\n");
          buf = lines.pop() ?? "";
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const payload = trimmed.slice(5).trim();
            if (payload === "[DONE]") continue;
            try {
              const json = JSON.parse(payload) as {
                choices?: { delta?: { content?: string } }[];
              };
              const tok = json.choices?.[0]?.delta?.content;
              if (tok) {
                acc += tok;
                controller.enqueue(sse({ token: tok }));
              }
            } catch {
              /* ignore keep-alive / partial frames */
            }
          }
        }
        finish(acc);
      } catch {
        finish(acc);
      } finally {
        clearTimeout(timeout);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
