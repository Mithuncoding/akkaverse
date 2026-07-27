/*
 * Akkaverse service worker — image & asset caching for a fast, reliable,
 * near-instant second visit (important for live demos / flaky venue Wi-Fi).
 *
 * Strategy:
 *   - Images (local + Wikimedia heritage photos): cache-first, with the
 *     network filling a capped runtime cache. Second view = instant, offline-OK.
 *   - Wikipedia REST/API lookups (used to resolve heritage photos): SWR so the
 *     app feels instant while still refreshing in the background.
 *   - Next.js static build assets: stale-while-revalidate.
 *   - HTML navigations: network-first, with the last successful visit as the
 *     offline fallback. Core routes are warmed during service-worker install.
 */

const VERSION = "akkaverse-v3";
const IMAGE_CACHE = `${VERSION}-images`;
const DATA_CACHE = `${VERSION}-data`;
const STATIC_CACHE = `${VERSION}-static`;
const PAGE_CACHE = `${VERSION}-pages`;

const CORE_ROUTES = [
  "/",
  "/roots",
  "/stories",
  "/learn",
  "/quiz",
  "/explore",
  "/festivals",
  "/memories",
];

const MAX_IMAGE_ENTRIES = 300;

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      await self.skipWaiting();
      const cache = await caches.open(PAGE_CACHE);
      await Promise.all(
        CORE_ROUTES.map(async (route) => {
          try {
            const response = await fetch(route, { cache: "reload" });
            if (response.ok) await cache.put(route, response);
          } catch {
            // One unavailable route must not prevent the worker from installing.
          }
        }),
      );
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => !k.startsWith(VERSION))
          .map((k) => caches.delete(k)),
      );
      await self.clients.claim();
    })(),
  );
});

/** Keep a cache from growing unbounded (rough LRU: drop oldest first). */
async function trimCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length <= maxEntries) return;
  const overflow = keys.length - maxEntries;
  for (let i = 0; i < overflow; i++) {
    await cache.delete(keys[i]);
  }
}

function isImageRequest(request, url) {
  if (request.destination === "image") return true;
  if (url.hostname === "upload.wikimedia.org") return true;
  return /\.(?:png|jpe?g|gif|webp|avif|svg)$/i.test(url.pathname);
}

function isWikiData(url) {
  return (
    url.hostname.endsWith("wikipedia.org") &&
    (url.pathname.includes("/api/rest_v1/") ||
      url.pathname.includes("/w/api.php"))
  );
}

function isNextStatic(url) {
  return (
    url.origin === self.location.origin &&
    (url.pathname.startsWith("/_next/static/") ||
      url.pathname === "/karnataka.geojson")
  );
}

async function cacheFirst(request, cacheName, { trim } = {}) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    // Cache successful + opaque (cross-origin image) responses.
    if (response && (response.ok || response.type === "opaque")) {
      cache.put(request, response.clone());
      if (trim) trimCache(cacheName, trim);
    }
    return response;
  } catch {
    return cached || Response.error();
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then((response) => {
      if (response && (response.ok || response.type === "opaque")) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => cached);
  return cached || network;
}

async function networkFirstPage(request) {
  const cache = await caches.open(PAGE_CACHE);
  try {
    const response = await fetch(request);
    if (response && response.ok) await cache.put(request, response.clone());
    return response;
  } catch {
    const cached = (await cache.match(request)) || (await cache.match("/"));
    if (cached) return cached;
    return new Response(
      "<!doctype html><html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width'><title>Akkaverse offline</title></head><body><main><h1>Akkaverse is offline</h1><p>Reconnect once to prepare this page for offline use.</p></main></body></html>",
      { headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  let url;
  try {
    url = new URL(request.url);
  } catch {
    return;
  }

  // Skip dev/HMR & websocket noise.
  if (url.pathname.includes("/_next/webpack-hmr")) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirstPage(request));
    return;
  }

  if (isImageRequest(request, url)) {
    event.respondWith(
      cacheFirst(request, IMAGE_CACHE, { trim: MAX_IMAGE_ENTRIES }),
    );
    return;
  }

  if (isWikiData(url)) {
    event.respondWith(staleWhileRevalidate(request, DATA_CACHE));
    return;
  }

  if (isNextStatic(url)) {
    event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
    return;
  }

  // Everything else: let the browser handle it normally.
});
