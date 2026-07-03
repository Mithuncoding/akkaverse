"use client";

import * as React from "react";
import { ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { getPageImage } from "@/lib/wiki";
import journeyImages from "@/data/journey-images.json";

/** Build-time cache: Wikipedia title → locally saved image path. */
const LOCAL_IMAGES = journeyImages as Record<string, string | null>;

type JourneyFigureProps = {
  /** Wikipedia article title to source the lead image from. */
  wiki: string;
  alt: string;
  className?: string;
  /** Image object-fit position, e.g. "center", "top". */
  position?: string;
  /** Apply a slow ken-burns zoom once loaded (for cinematic covers). */
  kenBurns?: boolean;
  /** Rounded shape for portraits. */
  rounded?: "none" | "xl" | "2xl" | "3xl" | "full";
  /** Render children (captions/overlays) above the image. */
  children?: React.ReactNode;
  /** Only fetch when scrolled near the viewport. */
  lazy?: boolean;
};

/**
 * JourneyFigure — a resilient image surface for the Heritage Journey.
 *
 * It fetches the correct lead photo for a Wikipedia article at runtime and
 * fades it in over an accent-tinted gradient placeholder. If the network
 * fails or no image exists, the designed placeholder stays — so the museum
 * never shows a broken frame. The accent is inherited from the parent chapter
 * via the `--accent` CSS variable.
 */
export function JourneyFigure({
  wiki,
  alt,
  className,
  position = "center",
  kenBurns = false,
  rounded = "2xl",
  children,
  lazy = true,
}: JourneyFigureProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [src, setSrc] = React.useState<string | null>(null);
  const [loaded, setLoaded] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const [inView, setInView] = React.useState(!lazy);

  React.useEffect(() => {
    if (!lazy || inView) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [lazy, inView]);

  React.useEffect(() => {
    if (!inView) return;
    let alive = true;

    // 1) Prefer the build-time local image — instant and always available.
    const local = LOCAL_IMAGES[wiki];
    if (local) {
      setSrc(local);
      return;
    }

    // 2) Fall back to a live Wikipedia lookup for anything not yet cached.
    getPageImage(wiki)
      .then((url) => {
        if (!alive) return;
        if (url) setSrc(url);
        else setFailed(true);
      })
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, [inView, wiki]);

  const radius =
    rounded === "full"
      ? "rounded-full"
      : rounded === "3xl"
        ? "rounded-3xl"
        : rounded === "xl"
          ? "rounded-xl"
          : rounded === "none"
            ? ""
            : "rounded-2xl";

  return (
    <div
      ref={ref}
      className={cn(
        "group/fig relative overflow-hidden",
        radius,
        "bg-[linear-gradient(135deg,rgb(var(--accent)/0.28),rgb(var(--accent2)/0.12)_60%,transparent)]",
        className,
      )}
    >
      {/* Placeholder / loading shimmer */}
      {!loaded && (
        <div className="absolute inset-0 grid place-items-center">
          {!failed && !src ? (
            <div className="h-full w-full animate-pulse bg-[radial-gradient(60%_60%_at_50%_40%,rgb(var(--accent)/0.18),transparent)]" />
          ) : (
            <ImageIcon className="h-7 w-7 text-[rgb(var(--accent))] opacity-40" />
          )}
        </div>
      )}

      {src && !failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          style={{ objectPosition: position }}
          className={cn(
            "h-full w-full object-cover [transition-duration:1200ms] transition-all ease-out",
            loaded ? "scale-100 opacity-100" : "scale-105 opacity-0",
            kenBurns && loaded && "animate-ken-burns",
          )}
        />
      )}

      {/* Grain + accent vignette for a printed-museum feel */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,transparent_55%,rgb(var(--accent2)/0.22))] mix-blend-multiply" />

      {children}
    </div>
  );
}
