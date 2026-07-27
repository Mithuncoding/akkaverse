"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Clock3,
  Compass,
  HeartHandshake,
  MapPin,
  Navigation,
  PartyPopper,
  Search,
  Shuffle,
  Sparkles,
  Utensils,
} from "lucide-react";

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
import { guideFor } from "@/data/explore-guides";

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
        <Image
          src={src}
          alt={item.nameEn}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
  const [query, setQuery] = React.useState("");
  const deferredQuery = React.useDeferredValue(query.trim().toLowerCase());

  const items = React.useMemo(
    () => {
      const byCategory = category === "All"
        ? exploreItems
        : exploreItems.filter((item) => item.category === category);
      if (!deferredQuery) return byCategory;
      return byCategory.filter((item) => {
        const guide = guideFor(item.id);
        return [
          item.nameEn,
          item.nameKn,
          item.locationEn,
          item.locationKn,
          item.descEn,
          item.descKn,
          guide?.why.en,
          guide?.why.kn,
          guide?.taste.en,
          guide?.taste.kn,
          guide?.best.en,
          guide?.best.kn,
        ]
          .join(" ")
          .toLowerCase()
          .includes(deferredQuery);
      });
    },
    [category, deferredQuery],
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
          <div className="mx-auto mb-6 max-w-xl">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={bi(
                  "Search a place, district, food, or experience…",
                  "ಸ್ಥಳ, ಜಿಲ್ಲೆ, ಆಹಾರ ಅಥವಾ ಅನುಭವ ಹುಡುಕಿ…",
                )}
                className="h-12 w-full rounded-2xl border border-border bg-card pl-11 pr-4 text-base outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </label>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              {bi(
                `${items.length} curated field guides across Karnataka`,
                `ಕರ್ನಾಟಕದಾದ್ಯಂತ ${items.length} ಆಯ್ದ ಕ್ಷೇತ್ರ ಮಾರ್ಗದರ್ಶಿಗಳು`,
              )}
            </p>
          </div>

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
              const guide = guideFor(item.id);
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
                    {guide && (
                      <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-3 text-[11px] text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Clock3 className="h-3 w-3 text-primary" />
                          {bi(guide.duration.en, guide.duration.kn)}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays className="h-3 w-3 text-primary" />
                          {bi(guide.best.en, guide.best.kn)}
                        </span>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {items.length === 0 && (
            <div className="rounded-3xl border border-dashed border-border py-16 text-center">
              <Compass className="mx-auto h-7 w-7 text-primary" />
              <p className="mt-3 font-semibold">
                {bi("No place matches that search", "ಆ ಹುಡುಕಾಟಕ್ಕೆ ಸ್ಥಳ ಸಿಗಲಿಲ್ಲ")}
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                }}
                className="mt-3 text-sm font-medium text-primary"
              >
                {bi("Clear filters", "ಫಿಲ್ಟರ್ ತೆರವುಗೊಳಿಸಿ")}
              </button>
            </div>
          )}
        </>
      )}

      {active && (
        <DetailModal
          item={active}
          onSelect={setActive}
          onClose={() => setActive(null)}
        />
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
  onSelect,
  onClose,
}: {
  item: ExploreItem;
  onSelect: (item: ExploreItem) => void;
  onClose: () => void;
}) {
  const { t, bi } = useTranslation();
  const name = bi(item.nameEn, item.nameKn);
  const desc = bi(item.descEn, item.descKn);
  const location = bi(item.locationEn, item.locationKn);
  const facts = item.factsEn.map((en, i) =>
    bi(en, item.factsKn[i] ?? en),
  );
  const guide = guideFor(item.id);
  const nearby = (guide?.nearby ?? [])
    .map((id) => exploreItems.find((candidate) => candidate.id === id))
    .filter((candidate): candidate is ExploreItem => Boolean(candidate));
  const mapsQuery = guide?.mapQuery ?? `${item.nameEn}, Karnataka`;

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
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="max-h-[92vh] w-full overflow-y-auto overscroll-contain rounded-t-3xl border border-border bg-card shadow-2xl animate-fade-up sm:max-w-3xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom))" }}
      >
        {/* Hero photo */}
        <div className="relative">
          <PlacePhoto item={item} className="h-56 w-full sm:h-72 sm:rounded-t-2xl" />
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

        <div className="p-5 sm:p-8">
          <span className="inline-block rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            {t(`cat.${item.category}`)}
          </span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">{name}</h2>
          <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" /> {location}
          </p>
          <p className="mt-4 text-pretty text-muted-foreground">{desc}</p>

          {guide && (
            <>
              <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
                <GuideStat
                  icon={CalendarDays}
                  label={bi("Best window", "ಉತ್ತಮ ಸಮಯ")}
                  value={bi(guide.best.en, guide.best.kn)}
                />
                <GuideStat
                  icon={Clock3}
                  label={bi("Plan for", "ಯೋಜಿಸಬೇಕಾದ ಸಮಯ")}
                  value={bi(guide.duration.en, guide.duration.kn)}
                />
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-24 items-start gap-3 bg-background p-4 transition-colors hover:bg-primary/[0.05]"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Navigation className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {bi("Directions", "ದಿಕ್ಕುಗಳು")}
                    </span>
                    <span className="mt-1 block text-sm font-semibold text-primary">
                      {bi("Open in Maps ↗", "ನಕ್ಷೆಯಲ್ಲಿ ತೆರೆಯಿರಿ ↗")}
                    </span>
                  </span>
                </a>
              </div>

              <section className="mt-7">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  <Compass className="h-4 w-4" />
                  {bi("Why it matters", "ಇದು ಏಕೆ ಮುಖ್ಯ")}
                </p>
                <p className="mt-3 text-pretty text-base leading-relaxed">
                  {bi(guide.why.en, guide.why.kn)}
                </p>
              </section>
            </>
          )}

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

          {guide && (
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <GuideNote
                icon={Utensils}
                title={bi("Taste the region", "ಪ್ರದೇಶದ ರುಚಿ")}
                text={bi(guide.taste.en, guide.taste.kn)}
              />
              <GuideNote
                icon={HeartHandshake}
                title={bi("Visit with respect", "ಗೌರವದಿಂದ ಭೇಟಿ")}
                text={bi(guide.etiquette.en, guide.etiquette.kn)}
              />
            </div>
          )}

          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            {bi(
              "Opening hours, fees, access, weather, and local rules can change. Verify current details with the official site or local authorities before travelling.",
              "ತೆರೆಯುವ ಸಮಯ, ಶುಲ್ಕ, ಪ್ರವೇಶ, ಹವಾಮಾನ ಮತ್ತು ಸ್ಥಳೀಯ ನಿಯಮಗಳು ಬದಲಾಗಬಹುದು. ಪ್ರಯಾಣಕ್ಕೂ ಮೊದಲು ಅಧಿಕೃತ ತಾಣ ಅಥವಾ ಸ್ಥಳೀಯ ಅಧಿಕಾರಿಗಳಿಂದ ಪ್ರಸ್ತುತ ಮಾಹಿತಿ ಪರಿಶೀಲಿಸಿ.",
            )}
          </p>

          {nearby.length > 0 && (
            <section className="mt-8 border-t border-border pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {bi("Continue nearby", "ಸಮೀಪದಲ್ಲಿ ಮುಂದುವರಿಸಿ")}
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {nearby.map((place) => (
                  <button
                    key={place.id}
                    type="button"
                    onClick={() => {
                      onSelect(place);
                      const modal = document.querySelector('[role="dialog"] > div');
                      modal?.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="group overflow-hidden rounded-xl border border-border bg-background text-left transition-colors hover:border-primary/40"
                  >
                    <PlacePhoto item={place} className="h-24 w-full" />
                    <span className="block p-3 text-sm font-semibold">
                      {bi(place.nameEn, place.nameKn)}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          )}

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

function GuideStat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-h-24 items-start gap-3 bg-background p-4">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <span>
        <span className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <span className="mt-1 block text-sm font-semibold leading-snug">
          {value}
        </span>
      </span>
    </div>
  );
}

function GuideNote({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ElementType;
  title: string;
  text: string;
}) {
  return (
    <section className="rounded-2xl border border-border bg-secondary/25 p-4">
      <div className="flex items-center gap-2 font-semibold">
        <Icon className="h-4 w-4 text-primary" />
        {title}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {text}
      </p>
    </section>
  );
}
