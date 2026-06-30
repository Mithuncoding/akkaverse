"use client";

import * as React from "react";

/**
 * Registers the image/asset caching service worker.
 *
 * Only runs in production (dev would fight Next.js HMR). The worker makes the
 * second visit feel near-instant by serving heritage photos & static assets
 * from cache — critical for reliable live demos.
 */
export function ServiceWorker() {
  React.useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }
    const register = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        /* registration is best-effort; the app works fine without it */
      });
    };
    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });
  }, []);

  return null;
}
