"use client";

import * as React from "react";
import { Check, Download, Link2, Loader2, Share2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/language-provider";
import { BlessingCard } from "@/components/roots/blessing-card";
import { buildBlessingUrl } from "@/lib/roots/share";

/**
 * HeritageCard — a downloadable, shareable "blessing card" carrying an
 * ancestor's Kannada blessing. The signature take-away artifact of Roots:
 * something a diaspora family screenshots, forwards, or sends as a link to
 * their children.
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
  const [linkCopied, setLinkCopied] = React.useState(false);
  const copyTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(
    () => () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    },
    [],
  );

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

  /**
   * Send this blessing as a *link* — the whole blessing is encoded into the
   * URL, so the receiver opens a public /blessing page and sees the card with
   * no account, database, or app install. Uses the Web Share sheet on mobile,
   * falls back to copying the link on desktop.
   */
  const sendLink = React.useCallback(async () => {
    const url = buildBlessingUrl({
      from,
      village,
      kn: blessingKn,
      en: blessingEn,
    });
    const nav = navigator as Navigator & {
      share?: (d: { title?: string; text?: string; url?: string }) => Promise<void>;
    };
    const message = bi(
      `A blessing from ${from} — passed on through Akkaverse.`,
      `${from} ಅವರಿಂದ ಒಂದು ಆಶೀರ್ವಾದ — Akkaverse ಮೂಲಕ.`,
    );
    if (nav.share) {
      try {
        await nav.share({
          title: "Akkaverse — A blessing for you",
          text: message,
          url,
        });
        return;
      } catch {
        /* user cancelled — fall through to copy */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setLinkCopied(true);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setLinkCopied(false), 2200);
    } catch {
      /* clipboard blocked — nothing more we can do gracefully */
    }
  }, [from, village, blessingKn, blessingEn, bi]);

  return (
    <div className="flex flex-col items-center gap-5">
      {/* The captured card */}
      <BlessingCard
        ref={cardRef}
        from={from}
        village={village}
        blessingKn={blessingKn}
        blessingEn={blessingEn}
      />

      {/* actions */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={sendLink}
          className={cn(
            "inline-flex h-11 items-center gap-2 rounded-full bg-amber-900 px-6 text-sm font-medium text-amber-50",
            "transition-transform hover:bg-amber-950 active:scale-95",
          )}
        >
          {linkCopied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Link2 className="h-4 w-4" />
          )}
          {linkCopied
            ? bi("Link copied!", "ಲಿಂಕ್ ನಕಲಿಸಲಾಗಿದೆ!")
            : bi("Send this blessing", "ಈ ಆಶೀರ್ವಾದ ಕಳುಹಿಸಿ")}
        </button>
        <button
          onClick={share}
          disabled={busy}
          className={cn(
            "inline-flex h-11 items-center gap-2 rounded-full border border-amber-900/30 px-5 text-sm font-medium text-amber-900",
            "transition-colors hover:bg-amber-900/10 active:scale-95 disabled:opacity-60",
          )}
        >
          {busy ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Share2 className="h-4 w-4" />
          )}
          {bi("Share image", "ಚಿತ್ರ ಹಂಚಿ")}
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
