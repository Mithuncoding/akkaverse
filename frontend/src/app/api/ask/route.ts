/**
 * /api/ask — the secure server-side brain for Akka, powered by NVIDIA NIM.
 *
 * Why a route handler? The NVIDIA API key MUST stay on the server. Calling the
 * inference endpoint from the browser would inline the key into the client
 * bundle where anyone could steal it. Here the key never leaves the server.
 *
 * NVIDIA NIM exposes an OpenAI-compatible endpoint
 * (https://integrate.api.nvidia.com/v1/chat/completions), so a single small
 * fetch drives a configurable model pool. The defaults are verified against
 * NVIDIA Build's free-tier catalog, with a second model for failover.
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

import { buildMessages, type ReplyLang } from "@/lib/ai/prompts";
import { seededAnswer, normalizeQuestion } from "@/lib/ai/grounding";
import { retrieveContext, type WebSource } from "@/lib/ai/retrieval";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* --- configuration (server-only) ------------------------------------ */
const KEY = process.env.NVIDIA_API_KEY || "";
const GENERAL_MODEL =
  process.env.NIM_MODEL || "meta/llama-3.1-8b-instruct";
const KANNADA_MODEL = process.env.NIM_KANNADA_MODEL || GENERAL_MODEL;
const FALLBACK_MODEL =
  process.env.NIM_FALLBACK_MODEL ||
  "nvidia/llama-3.3-nemotron-super-49b-v1";
const BASE_URL = process.env.NIM_BASE_URL || "https://integrate.api.nvidia.com/v1";
const ENDPOINT = `${BASE_URL.replace(/\/$/, "")}/chat/completions`;

const MAX_TOKENS = 640;
const TIMEOUT_MS = 25000;
const KANNADA_SCRIPT = /[\u0C80-\u0CFF]/;

type ModelConfig = {
  model: string;
  temperature: number;
  topP: number;
  disableThinking: boolean;
};

function modelConfig(model: string): ModelConfig {
  if (model.startsWith("sarvamai/")) {
    return { model, temperature: 0.2, topP: 0.9, disableThinking: true };
  }
  if (model.startsWith("qwen/")) {
    return { model, temperature: 0.7, topP: 0.8, disableThinking: true };
  }
  if (model.startsWith("meta/llama")) {
    return { model, temperature: 0.4, topP: 0.9, disableThinking: false };
  }
  return { model, temperature: 0.6, topP: 0.95, disableThinking: false };
}

function modelCandidates(question: string, replyLang: ReplyLang): ModelConfig[] {
  const prefersKannada =
    replyLang === "kn" || replyLang === "both" || KANNADA_SCRIPT.test(question);
  const names = prefersKannada
    ? [KANNADA_MODEL, GENERAL_MODEL, FALLBACK_MODEL]
    : [GENERAL_MODEL, FALLBACK_MODEL];
  return [...new Set(names.filter(Boolean))].map(modelConfig);
}

function completionBody(
  config: ModelConfig,
  question: string,
  context: string,
  replyLang: ReplyLang,
  stream: boolean,
) {
  return {
    model: config.model,
    messages: buildMessages(question, context, replyLang),
    temperature: config.temperature,
    top_p: config.topP,
    max_tokens: MAX_TOKENS,
    stream,
    ...(config.disableThinking
      ? { chat_template_kwargs: { enable_thinking: false } }
      : {}),
  };
}

async function logNimFailure(model: string, response: Response) {
  if (process.env.NODE_ENV === "production") return;
  const detail = (await response.text().catch(() => "")).slice(0, 500);
  console.warn(
    `[Akka AI] ${model} returned ${response.status}${detail ? `: ${detail}` : ""}`,
  );
}

/* --- tiny in-memory cache (per server instance) --------------------- */
type Cached = { text: string; sources: WebSource[]; at: number };
const cache = new Map<string, Cached>();
const TTL_MS = 1000 * 60 * 60; // 1 hour
const MAX_ENTRIES = 300;

function cacheKey(q: string, c: string) {
  return `${normalizeQuestion(q)}\u0000${c.trim()}`.slice(0, 4000);
}

function readCache(key: string): Cached | null {
  const hit = cache.get(key);
  if (!hit) return null;
  if (Date.now() - hit.at > TTL_MS) {
    cache.delete(key);
    return null;
  }
  cache.delete(key); // refresh recency (LRU)
  cache.set(key, hit);
  return hit;
}

function writeCache(key: string, text: string, sources: WebSource[] = []) {
  cache.set(key, { text, sources, at: Date.now() });
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

/** Coerce the requested reply language to a known value. */
function normalizeReplyLang(v: unknown): ReplyLang {
  return v === "en" || v === "kn" || v === "both" ? v : "auto";
}

/** Health/feature flag for the UI — never leaks the key itself. */
export async function GET() {
  return NextResponse.json({
    enabled: KEY.trim().length > 0,
    model: GENERAL_MODEL,
    kannadaModel: KANNADA_MODEL,
    fallbackModel: FALLBACK_MODEL,
  });
}

/* --- the NIM call (non-streaming) ----------------------------------- */
async function callNim(
  question: string,
  context: string,
  replyLang: ReplyLang,
): Promise<string | null> {
  for (const config of modelCandidates(question, replyLang)) {
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
        body: JSON.stringify(
          completionBody(config, question, context, replyLang, false),
        ),
      });

      if (res.status === 401 || res.status === 403) return null;
      if (!res.ok) {
        await logNimFailure(config.model, res);
        continue;
      }
      const data = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const text = data.choices?.[0]?.message?.content?.trim();
      if (text) return text;
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        const message = error instanceof Error ? error.message : String(error);
        console.warn(`[Akka AI] ${config.model} request failed: ${message}`);
      }
      continue;
    } finally {
      clearTimeout(timeout);
    }
  }
  return null;
}

export async function POST(req: NextRequest) {
  let body: {
    question?: unknown;
    context?: unknown;
    stream?: unknown;
    replyLang?: unknown;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ text: null }, { status: 400 });
  }

  const question = String(body.question ?? "").trim().slice(0, 2000);
  const baseContext = String(body.context ?? "").slice(0, 6000);
  const replyLang = normalizeReplyLang(body.replyLang);
  const wantsStream = body.stream === true;
  if (!question) return NextResponse.json({ text: null }, { status: 400 });

  // 1) Seeded answers: instant, free, always available (even without a key).
  const seeded = seededAnswer(question);
  const key = cacheKey(question, `${baseContext}\u0001${replyLang}`);

  // 2) Cache hit.
  const cacheHit = readCache(key);
  const cached = seeded ?? cacheHit?.text ?? null;

  // Charge the rate limiter at most once per request (only when we'd hit the
  // model), then use web grounding to answer factual questions accurately.
  let limited = false;
  let context = baseContext;
  let sources: WebSource[] = cacheHit?.sources ?? [];
  if (!cached && KEY) {
    limited = rateLimited(clientIp(req));
    if (!limited) {
      const g = await retrieveContext(question);
      if (g.context) {
        context = [baseContext, g.context].filter(Boolean).join("\n\n");
        sources = g.sources;
      }
    }
  }

  if (wantsStream) {
    return streamResponse({
      question,
      context,
      key,
      precomputed: cached,
      sources,
      replyLang,
      blocked: limited,
      req,
    });
  }

  if (cached) {
    return NextResponse.json({ text: cached, sources, cached: true });
  }

  if (!KEY) return NextResponse.json({ text: null });
  if (limited) return NextResponse.json({ text: null }, { status: 429 });

  // 3) De-duplicate concurrent identical calls.
  let promise = inflight.get(key);
  if (!promise) {
    promise = callNim(question, context, replyLang).finally(() =>
      inflight.delete(key),
    );
    inflight.set(key, promise);
  }
  const text = await promise;
  if (!text) return NextResponse.json({ text: null });
  writeCache(key, text, sources);
  return NextResponse.json({ text, sources });
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
  sources: WebSource[];
  replyLang: ReplyLang;
  blocked: boolean;
  req: NextRequest;
}): Response {
  const { question, context, key, precomputed, sources, replyLang, blocked } =
    opts;

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const finish = (full: string) => {
        if (sources.length) controller.enqueue(sse({ sources }));
        controller.enqueue(sse({ done: true }));
        controller.close();
        if (full && full !== precomputed) writeCache(key, full, sources);
      };

      // Instant path: replay a seeded/cached answer as a smooth stream.
      if (precomputed) {
        for (const tok of precomputed.split(/(\s+)/)) {
          controller.enqueue(sse({ token: tok }));
        }
        finish(precomputed);
        return;
      }

      if (!KEY || blocked) {
        finish("");
        return;
      }

      let acc = "";
      for (const config of modelCandidates(question, replyLang)) {
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
            body: JSON.stringify(
              completionBody(config, question, context, replyLang, true),
            ),
          });

          if (res.status === 401 || res.status === 403) {
            finish("");
            return;
          }
          if (!res.ok || !res.body) continue;

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
          if (acc) {
            finish(acc);
            return;
          }
        } catch {
          if (acc) {
            finish(acc);
            return;
          }
          finish("");
          return;
        } finally {
          clearTimeout(timeout);
        }
      }
      finish("");
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
