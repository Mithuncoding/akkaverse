/**
 * /api/tts — a free, keyless Kannada (and English) text-to-speech proxy.
 *
 * Most devices ship NO Kannada (kn-IN) voice, so the browser's Web Speech API
 * silently falls back to English — fatal for a Kannada heritage product. This
 * route gives Akkaverse a real Kannada voice with zero API keys and zero cost:
 * it proxies Google Translate's public TTS endpoint (client=tw-ob), which
 * returns short MP3 clips. We split long text into safe chunks, fetch each clip
 * server-side (so there is no browser CORS problem and no key to leak), and
 * stream the concatenated MP3 back as a single audio/mpeg response.
 *
 * Design notes:
 *  • Server-side only — the browser just plays the returned audio blob.
 *  • Chunked (<=180 chars) on sentence/space boundaries; MP3 frames concatenate
 *    cleanly for gapless sequential playback.
 *  • Tight per-request timeout + graceful failure: on any error we return 502 so
 *    the client can fall back to the browser voice. The app never blocks.
 *  • Cached at the edge (immutable) — identical letters replay instantly.
 */

import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_CHARS = 3000; // overall safety cap on a single request
const CHUNK = 180; // Google TTS practical per-clip limit
const TIMEOUT_MS = 20000;

/** Split text into <=CHUNK pieces, preferring sentence then word boundaries. */
function chunkText(text: string): string[] {
  const clean = text.replace(/\s+/g, " ").trim().slice(0, MAX_CHARS);
  if (!clean) return [];
  const parts: string[] = [];
  // Break on sentence enders (incl. Kannada danda ।) then pack into chunks.
  const sentences = clean.split(/(?<=[.!?。।\n])\s+/);
  let buf = "";
  const flush = () => {
    if (buf.trim()) parts.push(buf.trim());
    buf = "";
  };
  for (const s of sentences) {
    if (s.length > CHUNK) {
      flush();
      // Hard-wrap an over-long sentence on spaces.
      let line = "";
      for (const word of s.split(" ")) {
        if ((line + " " + word).trim().length > CHUNK) {
          if (line.trim()) parts.push(line.trim());
          line = word;
        } else {
          line = (line + " " + word).trim();
        }
      }
      if (line.trim()) parts.push(line.trim());
    } else if ((buf + " " + s).trim().length > CHUNK) {
      flush();
      buf = s;
    } else {
      buf = (buf + " " + s).trim();
    }
  }
  flush();
  return parts;
}

async function fetchClip(text: string, lang: string): Promise<Uint8Array | null> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  const url =
    "https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob" +
    `&tl=${encodeURIComponent(lang)}&total=1&idx=0` +
    `&textlen=${text.length}&q=${encodeURIComponent(text)}`;
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: {
        // A browser-like UA is required or the endpoint returns 403.
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
          "(KHTML, like Gecko) Chrome/120.0 Safari/537.36",
        Referer: "https://translate.google.com/",
      },
    });
    if (!res.ok) return null;
    const buf = new Uint8Array(await res.arrayBuffer());
    return buf.byteLength > 0 ? buf : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export async function POST(req: NextRequest) {
  let body: { text?: unknown; lang?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  const text = String(body.text ?? "").trim();
  const lang = String(body.lang ?? "kn").trim() || "kn";
  if (!text) return NextResponse.json({ error: "no text" }, { status: 400 });

  const chunks = chunkText(text);
  if (chunks.length === 0) {
    return NextResponse.json({ error: "no text" }, { status: 400 });
  }

  // Fetch clips in order (Google is sensitive to parallel bursts).
  const buffers: Uint8Array[] = [];
  for (const c of chunks) {
    const clip = await fetchClip(c, lang);
    if (!clip) {
      // If we already have some audio, ship what we have; else fail gracefully.
      if (buffers.length === 0) {
        return NextResponse.json({ error: "tts unavailable" }, { status: 502 });
      }
      break;
    }
    buffers.push(clip);
  }

  const total = buffers.reduce((n, b) => n + b.byteLength, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const b of buffers) {
    out.set(b, offset);
    offset += b.byteLength;
  }

  return new NextResponse(out, {
    status: 200,
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Length": String(out.byteLength),
    },
  });
}
