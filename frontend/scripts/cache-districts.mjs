/**
 * Build-time district cache.
 *
 * Pulls each district's Wikipedia summary (EN + KN) and lead photo ONCE, saves
 * the image into `public/districts/` and writes `src/data/district-cache.json`.
 * The map then renders instantly from local data instead of hitting Wikipedia
 * on every click.
 *
 * Run:  node scripts/cache-districts.mjs
 * Re-run any time to refresh the cache.
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PUBLIC_DIR = join(ROOT, "public", "districts");
const DATA_FILE = join(ROOT, "src", "data", "districts.ts");
const OUT_FILE = join(ROOT, "src", "data", "district-cache.json");

/** fetch() with an abort timeout so a slow/huge image can't hang the run. */
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

/** fetchT that backs off and retries when Wikimedia rate-limits us (HTTP 429). */
async function fetchR(url, opts = {}, ms = 20000) {
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetchT(url, opts, ms);
    if (res.status !== 429) return res;
    await sleep(1500 * (attempt + 1)); // 1.5s, 3s, 4.5s, 6s
  }
  return fetchT(url, opts, ms);
}

/** Parse the minimal fields we need out of the TS data file. */
async function parseDistricts() {
  const text = await readFile(DATA_FILE, "utf8");
  const start = text.indexOf("export const districts");
  const body = text.slice(text.indexOf("[", start), text.indexOf("];", start));
  const blocks = body.split(/\},\s*\{/);
  const field = (block, name) => {
    const m = block.match(new RegExp(`${name}:\\s*"((?:[^"\\\\]|\\\\.)*)"`));
    return m ? m[1] : undefined;
  };
  return blocks
    .map((b) => ({
      id: field(b, "id"),
      nameKn: field(b, "nameKn"),
      wiki: field(b, "wiki"),
      imageTitle: field(b, "imageTitle"),
    }))
    .filter((d) => d.id && d.wiki);
}

async function fetchSummary(lang, title) {
  try {
    const res = await fetchR(
      `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
      { headers: { Accept: "application/json" } },
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function fetchPageImage(lang, title) {
  try {
    const url =
      `https://${lang}.wikipedia.org/w/api.php?action=query&format=json` +
      `&origin=*&prop=pageimages&piprop=original|thumbnail&pithumbsize=900` +
      `&titles=${encodeURIComponent(title)}`;
    const res = await fetchR(url);
    if (!res.ok) return null;
    const data = await res.json();
    const pages = data?.query?.pages ?? {};
    for (const p of Object.values(pages)) {
      // Prefer the bounded 900px thumbnail over the (potentially huge) original.
      const src = p.thumbnail?.source ?? p.original?.source;
      if (src) return src;
    }
    return null;
  } catch {
    return null;
  }
}

async function resolveImage(enTitle, knTitle, imageTitle) {
  const [en, kn] = await Promise.all([
    fetchSummary("en", enTitle),
    knTitle ? fetchSummary("kn", knTitle) : Promise.resolve(null),
  ]);
  // PageImages returns a properly-formed 900px thumbnail URL (valid to fetch),
  // so we try it first, then fall back to the summary thumbnails.
  let imageUrl =
    (await fetchPageImage("en", enTitle)) ??
    en?.thumbnail?.source ??
    kn?.thumbnail?.source ??
    null;
  if (!imageUrl && knTitle) imageUrl = await fetchPageImage("kn", knTitle);
  if (!imageUrl && imageTitle) {
    imageUrl =
      (await fetchPageImage("en", imageTitle)) ??
      (await fetchSummary("en", imageTitle).then(
        (s) => s?.thumbnail?.source ?? s?.originalimage?.source ?? null,
      ));
  }
  return {
    extractEn: en?.extract ?? "",
    extractKn: kn?.extract ?? null,
    imageUrl,
    pageUrl: en?.content_urls?.desktop?.page ?? null,
  };
}

const slug = (id) => id.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function extFromUrl(url) {
  const clean = url.split("?")[0];
  const m = clean.match(/\.(jpe?g|png|svg|webp|gif)$/i);
  return m ? m[0].toLowerCase().replace("jpeg", "jpg") : ".jpg";
}

async function downloadImage(url, dest) {
  let lastErr;
  for (let attempt = 1; attempt <= 3; attempt++) {
    const ctrl = new AbortController();
    // Keep the abort active through the *body* download, not just the headers.
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
  const districts = await parseDistricts();
  console.log(`Caching ${districts.length} districts…`);

  // Merge with any previous run so we only re-fetch the incomplete districts
  // (keeps us well under Wikimedia's rate limit on repeat runs).
  let manifest = {};
  try {
    manifest = JSON.parse(await readFile(OUT_FILE, "utf8"));
  } catch {
    manifest = {};
  }
  const isComplete = (e) =>
    e && e.extractEn && typeof e.imageUrl === "string" &&
    e.imageUrl.startsWith("/districts/");

  for (const d of districts) {
    if (isComplete(manifest[d.id])) {
      console.log(`  • ${d.id.padEnd(22)} ✓ cached`);
      continue;
    }
    process.stdout.write(`  • ${d.id.padEnd(22)} `);
    const info = await resolveImage(d.wiki, d.nameKn, d.imageTitle);
    let localImage = null;
    if (info.imageUrl) {
      try {
        const file = `${slug(d.id)}${extFromUrl(info.imageUrl)}`;
        await downloadImage(info.imageUrl, join(PUBLIC_DIR, file));
        localImage = `/districts/${file}`;
      } catch (e) {
        console.log(`(image failed: ${e.message})`);
      }
    }
    manifest[d.id] = {
      extractEn: info.extractEn || manifest[d.id]?.extractEn || "",
      extractKn: info.extractKn ?? manifest[d.id]?.extractKn ?? null,
      imageUrl: localImage ?? info.imageUrl ?? manifest[d.id]?.imageUrl ?? null,
      pageUrl: info.pageUrl ?? manifest[d.id]?.pageUrl ?? null,
    };
    console.log(localImage ? "✓" : info.imageUrl ? "↺ remote" : "no image");
    await sleep(900); // be polite to Wikimedia
  }

  await writeFile(OUT_FILE, JSON.stringify(manifest, null, 2) + "\n", "utf8");
  console.log(`\nWrote ${OUT_FILE}`);
  console.log(`Images in ${PUBLIC_DIR}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
