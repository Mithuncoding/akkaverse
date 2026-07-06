"use client";

import * as React from "react";
import { Download, Loader2, Share2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/language-provider";

/**
 * HeritageCard — a downloadable, shareable "blessing card" carrying an
 * ancestor's Kannada blessing. The signature take-away artifact of Roots:
 * something a diaspora family screenshots and forwards to their children.
 *
 * The visual card is a fixed-size DOM node captured to a crisp PNG with
 * html-to-image (no server round-trip). Everything degrades gracefully.
 */
export function HeritageCard({
  from,
  village,
  blessingKn,
  blessingEn,
}: {
  from: string;
  village: string;
  blessingKn: string;
  blessingEn: string;
}) {
  const { bi } = useTranslation();
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [busy, setBusy] = React.useState(false);

  const render = React.useCallback(async (): Promise<string | null> => {
    const node = cardRef.current;
    if (!node) return null;
    // Import lazily so the heavy capture lib only loads on demand.
    const { toPng } = await import("html-to-image");
    return toPng(node, {
      pixelRatio: 3,
      cacheBust: true,
      backgroundColor: "#f7ecd6",
    });
  }, []);

  const download = React.useCallback(async () => {
    if (busy) return;
    setBusy(true);
    try {
      const dataUrl = await render();
      if (!dataUrl) return;
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "akkaverse-heritage-card.png";
      a.click();
    } finally {
      setBusy(false);
    }
  }, [busy, render]);

  const share = React.useCallback(async () => {
    if (busy) return;
    setBusy(true);
    try {
      const dataUrl = await render();
      if (!dataUrl) return;
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], "akkaverse-heritage-card.png", {
        type: "image/png",
      });
      const nav = navigator as Navigator & {
        canShare?: (d: { files: File[] }) => boolean;
        share?: (d: { files: File[]; title?: string; text?: string }) => Promise<void>;
      };
      if (nav.canShare?.({ files: [file] }) && nav.share) {
        await nav.share({
          files: [file],
          title: "Akkaverse — A blessing from my ancestor",
          text: blessingEn,
        });
      } else {
        // No Web Share (desktop) — fall back to a download.
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = "akkaverse-heritage-card.png";
        a.click();
      }
    } catch {
      /* user cancelled share — ignore */
    } finally {
      setBusy(false);
    }
  }, [busy, render, blessingEn]);

  return (
    <div className="flex flex-col items-center gap-5">
      {/* The captured card */}
      <div
        ref={cardRef}
        className="relative w-[340px] overflow-hidden rounded-[1.5rem] border border-amber-900/30 px-8 py-10 text-center shadow-xl sm:w-[380px]"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, #fbf3df 0%, #f4e6c8 55%, #eddab0 100%)",
        }}
      >
        {/* corner flourishes */}
        <span className="pointer-events-none absolute left-4 top-4 text-2xl text-amber-800/40">
          ❧
        </span>
        <span className="pointer-events-none absolute right-4 top-4 scale-x-[-1] text-2xl text-amber-800/40">
          ❧
        </span>

        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-amber-800/80">
          ಆಶೀರ್ವಾದ · A BLESSING
        </p>

        <div className="mx-auto mt-5 h-px w-16 bg-amber-800/30" />

        <p
          className="mt-6 text-2xl leading-relaxed text-amber-950 sm:text-[1.7rem]"
          style={{ fontFamily: "var(--font-kn-serif), Georgia, serif" }}
        >
          {blessingKn}
        </p>

        <p className="mt-4 font-serif text-sm italic leading-relaxed text-amber-900/85">
          “{blessingEn}”
        </p>

        <div className="mx-auto mt-7 h-px w-16 bg-amber-800/30" />

        <p className="mt-5 font-serif text-base text-amber-950">— {from}</p>
        {village && (
          <p className="mt-0.5 text-xs uppercase tracking-[0.2em] text-amber-800/70">
            {village}
          </p>
        )}

        <p className="mt-8 text-[0.6rem] uppercase tracking-[0.3em] text-amber-800/60">
          Akkaverse · ನಮ್ಮ ಬೇರುಗಳು · Roots
        </p>
      </div>

      {/* actions */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={share}
          disabled={busy}
          className={cn(
            "inline-flex h-11 items-center gap-2 rounded-full bg-amber-900 px-6 text-sm font-medium text-amber-50",
            "transition-transform hover:bg-amber-950 active:scale-95 disabled:opacity-60",
          )}
        >
          {busy ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Share2 className="h-4 w-4" />
          )}
          {bi("Share this blessing", "ಈ ಆಶೀರ್ವಾದ ಹಂಚಿ")}
        </button>
        <button
          onClick={download}
          disabled={busy}
          className={cn(
            "inline-flex h-11 items-center gap-2 rounded-full border border-amber-900/30 px-5 text-sm font-medium text-amber-900",
            "transition-colors hover:bg-amber-900/10 active:scale-95 disabled:opacity-60",
          )}
        >
          <Download className="h-4 w-4" />
          {bi("Save card", "ಕಾರ್ಡ್ ಉಳಿಸಿ")}
        </button>
      </div>
    </div>
  );
}
