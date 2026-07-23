/**
 * Build-time place-photo cache (Karnataka Explorer).
 *
 * Pulls each explore place's Wikipedia lead photo ONCE, saves the image into
 * `public/places/` and writes `src/data/place-cache.json`. The Explore grid
 * then renders instantly from local, bundled images — no live Wikipedia
 * request during the demo, works offline, never a broken/slow load.
 *
 * Run:  node --use-system-ca scripts/cache-places.mjs
 * Re-run any time to refresh; complete entries are skipped.
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PUBLIC_DIR = join(ROOT, "public", "places");
const DATA_FILE = join(ROOT, "src", "data", "explorer.ts");
const OUT_FILE = join(ROOT, "src", "data", "place-cache.json");

async function fetchT(url, opts = {}, ms = 20000) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { ...opts, signal: ctrl.signal });
  } finally {
    clearTimeout(timer);
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchR(url, opts = {}, ms = 20000) {
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetchT(url, opts, ms);
    if (res.status !== 429) return res;
    await sleep(1500 * (attempt + 1));
  }
  return fetchT(url, opts, ms);
}

/** Parse id + wiki out of the explorer TS data file. */
async function parsePlaces() {
  const text = await readFile(DATA_FILE, "utf8");
  const start = text.indexOf("export const exploreItems");
  const body = text.slice(text.indexOf("[", start), text.indexOf("];", start));
  const blocks = body.split(/\},\s*\{/);
  const field = (block, name) => {
    const m = block.match(new RegExp(`${name}:\\s*"((?:[^"\\\\]|\\\\.)*)"`));
    return m ? m[1] : undefined;
  };
  return blocks
    .map((b) => ({ id: field(b, "id"), wiki: field(b, "wiki") }))
    .filter((p) => p.id && p.wiki);
}

async function fetchPageImage(title) {
  try {
    const url =
      `https://en.wikipedia.org/w/api.php?action=query&format=json` +
      `&prop=pageimages&piprop=original|thumbnail&pithumbsize=1000` +
      `&redirects=1&titles=${encodeURIComponent(title)}`;
    const res = await fetchR(url);
    if (!res.ok) return null;
    const data = await res.json();
    const pages = data?.query?.pages ?? {};
    for (const p of Object.values(pages)) {
      const src = p.thumbnail?.source ?? p.original?.source;
      if (src) return src;
    }
    return null;
  } catch {
    return null;
  }
}

async function fetchSummaryImage(title) {
  try {
    const res = await fetchR(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
      { headers: { Accept: "application/json" } },
    );
    if (!res.ok) return null;
    const s = await res.json();
    return s?.thumbnail?.source ?? s?.originalimage?.source ?? null;
  } catch {
    return null;
  }
}

const slug = (id) =>
  id.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function extFromUrl(url) {
  const clean = url.split("?")[0];
  const m = clean.match(/\.(jpe?g|png|svg|webp|gif)$/i);
  return m ? m[0].toLowerCase().replace("jpeg", "jpg") : ".jpg";
}

async function downloadImage(url, dest) {
  let lastErr;
  for (let attempt = 1; attempt <= 3; attempt++) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 30000);
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "AkkaverseCacheBot/1.0 (heritage project)" },
        signal: ctrl.signal,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length === 0) throw new Error("empty body");
      await writeFile(dest, buf);
      return;
    } catch (e) {
      lastErr = e;
    } finally {
      clearTimeout(timer);
    }
  }
  throw lastErr ?? new Error("download failed");
}

async function main() {
  await mkdir(PUBLIC_DIR, { recursive: true });
  const places = await parsePlaces();
  console.log(`Caching ${places.length} places…`);

  let manifest = {};
  try {
    manifest = JSON.parse(await readFile(OUT_FILE, "utf8"));
  } catch {
    manifest = {};
  }
  const isComplete = (e) =>
    e && typeof e.imageUrl === "string" && e.imageUrl.startsWith("/places/");

  for (const p of places) {
    if (isComplete(manifest[p.id])) {
      console.log(`  • ${p.id.padEnd(22)} ✓ cached`);
      continue;
    }
    process.stdout.write(`  • ${p.id.padEnd(22)} `);
    const remote =
      (await fetchPageImage(p.wiki)) ?? (await fetchSummaryImage(p.wiki));
    let localImage = null;
    if (remote) {
      try {
        const file = `${slug(p.id)}${extFromUrl(remote)}`;
        await downloadImage(remote, join(PUBLIC_DIR, file));
        localImage = `/places/${file}`;
      } catch (e) {
        console.log(`(image failed: ${e.message})`);
      }
    }
    manifest[p.id] = {
      imageUrl: localImage ?? manifest[p.id]?.imageUrl ?? null,
      source: remote ?? manifest[p.id]?.source ?? null,
    };
    console.log(localImage ? "✓" : remote ? "↺ remote only" : "no image");
    await sleep(900);
  }

  await writeFile(OUT_FILE, JSON.stringify(manifest, null, 2) + "\n", "utf8");
  console.log(`\nWrote ${OUT_FILE}`);
  console.log(`Images in ${PUBLIC_DIR}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
