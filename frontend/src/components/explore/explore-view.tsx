"use client";

import * as React from "react";
import Link from "next/link";
import { MapPin, PartyPopper, Shuffle, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/language-provider";
import { KarnatakaMap } from "@/components/explore/karnataka-map";
import { AskAkka } from "@/components/ui/ask-akka";
import { festivals } from "@/data/festivals";
import { districtById } from "@/data/districts";
import {
  EXPLORE_CATEGORIES,
  exploreItems,
  type ExploreCategory,
  type ExploreItem,
} from "@/data/explorer";
import placeCache from "@/data/place-cache.json";

type Tab = "map" | "places";

/** Locally cached lead photos, baked in at build time (scripts/cache-places.mjs). */
const PLACE_IMAGES = placeCache as Record<string, { imageUrl: string | null }>;

function placeImage(id: string): string | null {
  return PLACE_IMAGES[id]?.imageUrl ?? null;
}

/**
 * A place's cached photo with a graceful emoji-gradient fallback — never shows
 * a broken image, and needs no network at runtime (bundled locally).
 */
function PlacePhoto({
  item,
  className,
}: {
  item: ExploreItem;
  className?: string;
}) {
  const src = placeImage(item.id);
  const [failed, setFailed] = React.useState(false);
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-primary/20 via-secondary to-amber-400/20",
        className,
      )}
    >
      {src && !failed ? (
        <img
          src={src}
          alt={item.nameEn}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-5xl">
          {item.emoji}
        </div>
      )}
    </div>
  );
}

/** Karnataka Explorer — an interactive district map plus a curated card grid. */
export function ExploreView() {
  const { t, bi } = useTranslation();
  const [tab, setTab] = React.useState<Tab>("map");
  const [category, setCategory] = React.useState<ExploreCategory | "All">("All");
  const [active, setActive] = React.useState<ExploreItem | null>(null);

  const items = React.useMemo(
    () =>
      category === "All"
        ? exploreItems
        : exploreItems.filter((i) => i.category === category),
    [category],
  );

  return (
    <div className="container py-12 md:py-24">
      <header className="mx-auto mb-8 max-w-2xl text-center">
        <span className="rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-sm text-muted-foreground">
          🗺️ {t("explore.badge")}
        </span>
        <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {t("explore.title")}
        </h1>
        <p className="mt-4 text-pretty text-base text-muted-foreground sm:text-lg">
          {t("explore.subtitle")}
        </p>
      </header>

      {/* Map / Places tabs */}
      <div className="mb-10 flex justify-center">
        <div className="inline-flex rounded-full border border-border bg-card p-1">
          <TabButton
            label={t("explore.tab.map")}
            active={tab === "map"}
            onClick={() => setTab("map")}
          />
          <TabButton
            label={t("explore.tab.places")}
            active={tab === "places"}
            onClick={() => setTab("places")}
          />
        </div>
      </div>

      {tab === "map" && <KarnatakaMap />}

      {tab === "places" && (
        <>
          {/* Category filters — scroll rail on mobile, wraps on larger */}
          <div className="scroll-touch no-scrollbar -mx-[1.15rem] mb-10 flex gap-2 overflow-x-auto px-[1.15rem] pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0">
            <Chip
              label={t("explore.all")}
              active={category === "All"}
              onClick={() => setCategory("All")}
            />
            {EXPLORE_CATEGORIES.map((c) => (
              <Chip
                key={c}
                label={t(`cat.${c}`)}
                active={category === c}
                onClick={() => setCategory(c)}
              />
            ))}
          </div>

          {/* Take me somewhere — a random spotlight (great for a demo). */}
          <div className="mb-10 flex justify-center">
            <button
              onClick={() => {
                const pool =
                  items.length > 0 ? items : exploreItems;
                setActive(pool[Math.floor(Math.random() * pool.length)]);
              }}
              className="group inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/5 px-5 py-2.5 text-sm font-medium text-primary transition-all hover:-translate-y-0.5 hover:bg-primary/10 active:scale-95"
            >
              <Shuffle className="h-4 w-4 transition-transform group-hover:rotate-12" />
              {bi("Take me somewhere", "ಎಲ್ಲಾದರೂ ಕರೆದೊಯ್ಯಿರಿ")}
            </button>
          </div>

          {/* Card grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
              const name = bi(item.nameEn, item.nameKn);
              const desc = bi(item.descEn, item.descKn);
              const location = bi(item.locationEn, item.locationKn);
              return (
                <button
                  key={item.id}
                  onClick={() => setActive(item)}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-left transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  <div className="relative h-40 w-full">
                    <PlacePhoto item={item} className="h-full w-full" />
                    <span className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/45 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur">
                      {t(`cat.${item.category}`)}
                    </span>
                    <span className="absolute left-3 top-3 text-3xl drop-shadow-md">
                      {item.emoji}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6 pt-4">
                    <h3 className="text-lg font-semibold tracking-tight">
                      {name}
                    </h3>
                    <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" /> {location}
                    </p>
                    <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
                      {desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}

      {active && (
        <DetailModal item={active} onClose={() => setActive(null)} />
      )}
    </div>
  );
}

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full px-5 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:text-foreground",
      )}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors active:scale-95 sm:py-1.5",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:text-foreground",
      )}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}

function DetailModal({
  item,
  onClose,
}: {
  item: ExploreItem;
  onClose: () => void;
}) {
  const { t, bi } = useTranslation();
  const name = bi(item.nameEn, item.nameKn);
  const desc = bi(item.descEn, item.descKn);
  const location = bi(item.locationEn, item.locationKn);
  const facts = item.factsEn.map((en, i) =>
    bi(en, item.factsKn[i] ?? en),
  );

  // Cross-links — what else happened here (festivals in the same district).
  const relatedFestivals = React.useMemo(
    () =>
      item.district
        ? festivals.filter((f) => f.district === item.district).slice(0, 3)
        : [],
    [item.district],
  );
  const districtName = item.district
    ? districtById.get(item.district)
    : undefined;

  // Close on Escape for accessibility.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="max-h-[88vh] w-full overflow-y-auto overscroll-contain rounded-t-3xl border border-border bg-card shadow-2xl animate-fade-up sm:max-w-lg sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom))" }}
      >
        {/* Hero photo */}
        <div className="relative">
          <PlacePhoto item={item} className="h-48 w-full sm:rounded-t-2xl" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent sm:rounded-t-2xl" />
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
            <div className="mx-auto -mb-1 h-1.5 w-12 rounded-full bg-white/70 sm:hidden" />
          </div>
          <button
            onClick={onClose}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition-transform hover:bg-black/60 active:scale-90"
            aria-label="Close"
          >
            ✕
          </button>
          <div className="absolute bottom-3 left-4 flex items-center gap-2">
            <span className="text-4xl drop-shadow-lg">{item.emoji}</span>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <span className="inline-block rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            {t(`cat.${item.category}`)}
          </span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">{name}</h2>
          <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" /> {location}
          </p>
          <p className="mt-4 text-pretty text-muted-foreground">{desc}</p>

          <div className="mt-6">
            <p className="flex items-center gap-1.5 text-sm font-semibold">
              <Sparkles className="h-4 w-4 text-primary" /> {t("explore.facts")}
            </p>
            <ul className="mt-3 space-y-2">
              {facts.map((f) => (
                <li
                  key={f}
                  className="flex gap-2 text-sm text-muted-foreground"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Discover more — turn each place into a hub into the rest of Akkaverse. */}
          <div className="mt-7 border-t border-border pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {bi("Discover more", "ಇನ್ನಷ್ಟು ಅನ್ವೇಷಿಸಿ")}
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <AskAkka
                guide="historian"
                q={`Tell me about ${item.nameEn} in Karnataka`}
                labelEn={`Ask Akka about ${item.nameEn}`}
                labelKn={`${item.nameKn} ಬಗ್ಗೆ ಕೇಳಿ`}
              />
              {relatedFestivals.map((f) => (
                <Link
                  key={f.id}
                  href="/festivals"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 active:scale-95"
                >
                  <span>{f.emoji}</span>
                  {bi(f.nameEn, f.nameKn)}
                </Link>
              ))}
              {districtName && (
                <Link
                  href="/festivals"
                  className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3.5 py-1.5 text-sm font-medium text-primary transition-all hover:-translate-y-0.5 hover:bg-primary/10 active:scale-95"
                >
                  <PartyPopper className="h-3.5 w-3.5" />
                  {bi(
                    `Festivals of ${districtName.nameEn}`,
                    `${districtName.nameKn} ಹಬ್ಬಗಳು`,
                  )}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
