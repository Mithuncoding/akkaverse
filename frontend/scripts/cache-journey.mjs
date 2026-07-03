/**
 * Build-time Heritage Journey image cache.
 *
 * Scans `src/data/journey.ts` for every Wikipedia title referenced by a
 * `cover:` or `wiki:` field (covers, facets, gallery, figures, luminaries),
 * resolves each one's lead photo ONCE, downloads it into `public/journey/`,
 * and writes `src/data/journey-images.json` (title → local path).
 *
 * The Journey then renders instantly from local images that ALWAYS load —
 * instead of hitting Wikipedia on every scroll (which left many frames blank).
 *
 * Run:  node scripts/cache-journey.mjs
 * Re-run any time to refresh; already-downloaded titles are skipped.
 */

import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PUBLIC_DIR = join(ROOT, "public", "journey");
const DATA_FILE = join(ROOT, "src", "data", "journey.ts");
const OUT_FILE = join(ROOT, "src", "data", "journey-images.json");

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
  for (let attempt = 0; attempt < 6; attempt++) {
    const res = await fetchT(url, opts, ms);
    if (res.status !== 429) return res;
    await sleep(3000 * (attempt + 1));
  }
  return fetchT(url, opts, ms);
}

/** Pull every unique `cover:`/`wiki:` string literal from the data file. */
async function parseTitles() {
  const text = await readFile(DATA_FILE, "utf8");
  const titles = new Set();
  const re = /\b(?:cover|wiki):\s*"((?:[^"\\]|\\.)*)"/g;
  let m;
  while ((m = re.exec(text))) titles.add(m[1]);
  return [...titles];
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
      `&origin=*&prop=pageimages&piprop=original|thumbnail&pithumbsize=1000` +
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

async function resolveImage(title) {
  let url = await fetchPageImage("en", title);
  if (!url) {
    const s = await fetchSummary("en", title);
    url = s?.thumbnail?.source ?? s?.originalimage?.source ?? null;
  }
  return url;
}

const slug = (t) =>
  t
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function extFromUrl(url) {
  const clean = url.split("?")[0];
  const m = clean.match(/\.(jpe?g|png|svg|webp|gif)$/i);
  return m ? m[0].toLowerCase().replace("jpeg", "jpg") : ".jpg";
}

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

const KNOWN_EXTS = [".jpg", ".png", ".webp", ".svg", ".gif"];

/** If an image for this slug already sits on disk, return its public path. */
async function findOnDisk(title) {
  const base = slug(title);
  for (const ext of KNOWN_EXTS) {
    if (await exists(join(PUBLIC_DIR, base + ext))) return `/journey/${base}${ext}`;
  }
  return null;
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
  const titles = await parseTitles();
  console.log(`Caching ${titles.length} Journey images…\n`);

  let manifest = {};
  try {
    manifest = JSON.parse(await readFile(OUT_FILE, "utf8"));
  } catch {
    manifest = {};
  }

  const failures = [];

  for (const title of titles) {
    // Resume: if the image already exists on disk, record it and move on.
    const onDisk = (await findOnDisk(title)) ?? null;
    if (onDisk) {
      if (manifest[title] !== onDisk) {
        manifest[title] = onDisk;
        await writeFile(OUT_FILE, JSON.stringify(manifest, null, 2) + "\n", "utf8");
      }
      console.log(`  • ${title.padEnd(40)} ✓ cached`);
      continue;
    }

    process.stdout.write(`  • ${title.padEnd(40)} `);
    const url = await resolveImage(title);
    if (!url) {
      console.log("✗ no image");
      failures.push(title);
      manifest[title] = null;
      await writeFile(OUT_FILE, JSON.stringify(manifest, null, 2) + "\n", "utf8");
      await sleep(500);
      continue;
    }
    try {
      const file = `${slug(title)}${extFromUrl(url)}`;
      await downloadImage(url, join(PUBLIC_DIR, file));
      manifest[title] = `/journey/${file}`;
      console.log("✓");
    } catch (e) {
      console.log(`✗ download failed: ${e.message}`);
      failures.push(title);
      manifest[title] = null;
    }
    await writeFile(OUT_FILE, JSON.stringify(manifest, null, 2) + "\n", "utf8");
    await sleep(1500);
  }

  await writeFile(OUT_FILE, JSON.stringify(manifest, null, 2) + "\n", "utf8");
  console.log(`\nWrote ${OUT_FILE}`);
  console.log(`Images in ${PUBLIC_DIR}`);
  if (failures.length) {
    console.log(`\n⚠ ${failures.length} titles had NO image (fix these titles):`);
    for (const f of failures) console.log(`   - ${f}`);
  } else {
    console.log("\nAll titles resolved an image. 🎉");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
