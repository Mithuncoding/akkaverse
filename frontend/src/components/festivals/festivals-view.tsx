"use client";

import * as React from "react";
import { CalendarDays, MapPin, Sparkles, Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/language-provider";
import { ReadAloud } from "@/components/ui/read-aloud";
import { getDistrictInfo, type WikiInfo } from "@/lib/wiki";
import {
  festivals,
  MONTHS_EN,
  MONTHS_KN,
  type Festival,
} from "@/data/festivals";

/** Festival Calendar — the cultural heartbeat of Karnataka, month by month. */
export function FestivalsView() {
  const { t, bi, locale } = useTranslation();
  const [month, setMonth] = React.useState<number | "all">("all");
  const [active, setActive] = React.useState<Festival | null>(null);

  const monthName = (m: number) =>
    locale === "kn"
      ? MONTHS_KN[m - 1]
      : locale === "both"
        ? `${MONTHS_EN[m - 1]} · ${MONTHS_KN[m - 1]}`
        : MONTHS_EN[m - 1];

  // Months that actually have festivals, for the filter row.
  const activeMonths = React.useMemo(
    () =>
      Array.from(new Set(festivals.map((f) => f.month))).sort((a, b) => a - b),
    [],
  );

  // "Coming up" — the festivals nearest in the calendar from today.
  const upcoming = React.useMemo(() => {
    const now = new Date().getMonth() + 1;
    return [...festivals]
      .map((f) => ({ f, away: (f.month - now + 12) % 12 }))
      .sort((a, b) => a.away - b.away)
      .slice(0, 3)
      .map((x) => x.f);
  }, []);

  const list = React.useMemo(
    () =>
      month === "all"
        ? [...festivals].sort((a, b) => a.month - b.month)
        : festivals.filter((f) => f.month === month),
    [month],
  );

  return (
    <div className="container py-16 md:py-24">
      <header className="mx-auto mb-10 max-w-2xl text-center">
        <span className="rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-sm text-muted-foreground">
          🎉 {t("festival.badge")}
        </span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
          {t("festival.title")}
        </h1>
        <p className="mt-4 text-pretty text-lg text-muted-foreground">
          {t("festival.subtitle")}
        </p>
      </header>

      {/* Coming up */}
      <section className="mb-12">
        <h2 className="mb-4 flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          <Clock className="h-4 w-4 text-primary" /> {t("festival.upcoming")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {upcoming.map((f) => (
            <button
              key={f.id}
              onClick={() => setActive(f)}
              className="heritage-glow flex items-center gap-3 rounded-2xl border border-primary/30 bg-primary/5 p-4 text-left transition-all hover:-translate-y-0.5"
            >
              <span className="text-3xl">{f.emoji}</span>
              <div>
                <p className="font-semibold leading-tight">
                  {bi(f.nameEn, f.nameKn)}
                </p>
                <p className="mt-0.5 text-xs text-primary">
                  {bi(f.whenEn, f.whenKn)}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Month filter */}
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        <Chip
          label={t("festival.all")}
          active={month === "all"}
          onClick={() => setMonth("all")}
        />
        {activeMonths.map((m) => (
          <Chip
            key={m}
            label={monthName(m)}
            active={month === m}
            onClick={() => setMonth(m)}
          />
        ))}
      </div>

      {/* Festival grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((f) => (
          <button
            key={f.id}
            onClick={() => setActive(f)}
            className="group flex flex-col rounded-2xl border border-border bg-card p-6 text-left transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="text-4xl">{f.emoji}</span>
              <span className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                <CalendarDays className="h-3 w-3" /> {bi(f.whenEn, f.whenKn)}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-semibold tracking-tight">
              {bi(f.nameEn, f.nameKn)}
            </h3>
            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" /> {bi(f.placeEn, f.placeKn)}
            </p>
            <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
              {bi(f.descEn, f.descKn)}
            </p>
          </button>
        ))}
      </div>

      {active && <FestivalModal festival={active} onClose={() => setActive(null)} />}
    </div>
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
        "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
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

function FestivalModal({
  festival,
  onClose,
}: {
  festival: Festival;
  onClose: () => void;
}) {
  const { t, bi } = useTranslation();
  const [info, setInfo] = React.useState<WikiInfo | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let alive = true;
    setLoading(true);
    getDistrictInfo(festival.wiki, undefined, festival.imageTitle)
      .then((i) => alive && setInfo(i))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [festival]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const highlights = festival.highlightsEn.map((en, i) =>
    bi(en, festival.highlightsKn[i] ?? en),
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Live image header */}
        <div className="relative h-44 w-full overflow-hidden rounded-t-2xl bg-secondary/40">
          {loading ? (
            <div className="h-full w-full animate-pulse bg-secondary" />
          ) : info?.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={info.imageUrl}
              alt={festival.nameEn}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-6xl opacity-30">
              {festival.emoji}
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute right-3 top-3 rounded-full bg-background/80 p-1.5 text-muted-foreground backdrop-blur hover:text-foreground"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-start gap-3">
            <span className="text-4xl">{festival.emoji}</span>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                {bi(festival.nameEn, festival.nameKn)}
              </h2>
              <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {bi(festival.whenEn, festival.whenKn)}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {bi(festival.placeEn, festival.placeKn)}
                </span>
              </p>
            </div>
          </div>

          <p className="mt-4 text-pretty text-muted-foreground">
            {bi(festival.descEn, festival.descKn)}
          </p>

          <div className="mt-4">
            <ReadAloud
              textEn={festival.descEn}
              textKn={festival.descKn}
              label={t("common.listen")}
            />
          </div>

          <div className="mt-6">
            <p className="flex items-center gap-1.5 text-sm font-semibold">
              <Sparkles className="h-4 w-4 text-primary" />{" "}
              {t("festival.whatHappens")}
            </p>
            <ul className="mt-3 space-y-2">
              {highlights.map((h) => (
                <li key={h} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
