"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/language-provider";
import { exploreItems } from "@/data/explorer";
import { districts } from "@/data/districts";
import placeCache from "@/data/place-cache.json";
import districtCache from "@/data/district-cache.json";

type Tile = { src: string; en: string; kn: string };

const PLACE_IMAGES = placeCache as Record<string, { imageUrl: string | null }>;
const DISTRICT_IMAGES = districtCache as Record<
  string,
  { imageUrl: string | null }
>;

/** Only keep locally-bundled images (start with "/") so nothing loads live. */
function localSrc(url: string | null | undefined): string | null {
  return url && url.startsWith("/") ? url : null;
}

/** Curated place tiles (temples, palaces, nature, food) — all cached locally. */
const placeTiles: Tile[] = exploreItems
  .map((i) => {
    const src = localSrc(PLACE_IMAGES[i.id]?.imageUrl);
    return src ? { src, en: i.nameEn, kn: i.nameKn } : null;
  })
  .filter((t): t is Tile => t !== null);

/** Scenic district tiles for a second, contrasting row. */
const districtTiles: Tile[] = districts
  .map((d) => {
    const src = localSrc(DISTRICT_IMAGES[d.id]?.imageUrl);
    return src ? { src, en: d.nameEn, kn: d.nameKn } : null;
  })
  .filter((t): t is Tile => t !== null);

function TileCard({ tile }: { tile: Tile }) {
  const { bi } = useTranslation();
  return (
    <Link
      href="/explore"
      className="group relative block h-40 w-60 shrink-0 overflow-hidden rounded-2xl border border-border shadow-soft sm:h-48 sm:w-72"
      aria-label={tile.en}
    >
      <img
        src={tile.src}
        alt={tile.en}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
      <figcaption className="absolute inset-x-0 bottom-0 p-3.5">
        <span className="text-sm font-semibold text-white drop-shadow sm:text-base">
          {bi(tile.en, tile.kn)}
        </span>
      </figcaption>
    </Link>
  );
}

function Row({
  tiles,
  reverse,
  duration,
}: {
  tiles: Tile[];
  reverse?: boolean;
  duration: string;
}) {
  if (tiles.length === 0) return null;
  // Duplicate the tiles so the -50% translate loops seamlessly.
  const doubled = [...tiles, ...tiles];
  return (
    <div className="marquee-pause overflow-hidden">
      <div
        className={cn("marquee-track flex w-max gap-4", reverse && "is-reverse")}
        style={{ ["--marquee-duration" as string]: duration } as React.CSSProperties}
      >
        {doubled.map((tile, i) => (
          <TileCard key={`${tile.en}-${i}`} tile={tile} />
        ))}
      </div>
    </div>
  );
}

/**
 * PhotoMarquee — a full-bleed, infinitely scrolling band of real Karnataka
 * imagery (all cached locally, no runtime fetch). Two rows drift in opposite
 * directions; hovering pauses them; reduced-motion users see them static.
 */
export function PhotoMarquee() {
  return (
    <div className="marquee-mask flex flex-col gap-4">
      <Row tiles={placeTiles} duration="70s" />
      <Row tiles={districtTiles} reverse duration="95s" />
    </div>
  );
}
