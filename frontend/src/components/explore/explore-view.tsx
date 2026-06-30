"use client";

import * as React from "react";
import { MapPin, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/language-provider";
import { KarnatakaMap } from "@/components/explore/karnataka-map";
import {
  EXPLORE_CATEGORIES,
  exploreItems,
  type ExploreCategory,
  type ExploreItem,
} from "@/data/explorer";

type Tab = "map" | "places";

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
                  className="group flex flex-col rounded-2xl border border-border bg-card p-6 text-left transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-4xl">{item.emoji}</span>
                    <span className="rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                      {t(`cat.${item.category}`)}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight">
                    {name}
                  </h3>
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" /> {location}
                  </p>
                  <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
                    {desc}
                  </p>
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
        className="max-h-[88vh] w-full overflow-y-auto overscroll-contain rounded-t-3xl border border-border bg-card p-6 shadow-2xl animate-fade-up sm:max-w-lg sm:rounded-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 1.5rem)" }}
      >
        <div className="mb-2 flex justify-center sm:hidden">
          <span className="h-1.5 w-12 rounded-full bg-border" />
        </div>
        <div className="flex items-start justify-between">
          <span className="text-5xl">{item.emoji}</span>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground active:scale-90"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <span className="mt-4 inline-block rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
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
      </div>
    </div>
  );
}
