"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/language-provider";
import { JourneyFigure } from "@/components/timeline/journey-figure";
import { ReadAloud } from "@/components/ui/read-aloud";
import {
  DASARA_TIMELINE,
  DASARA_TREASURES,
  eraForYear,
  type DasaraYear,
  type Confidence,
} from "@/data/dasara-archive";
import { DasaraTimeMachine } from "./dasara-time-machine";
import { DasaraCompare } from "./dasara-compare";
import { DasaraHistorian } from "./dasara-historian";
import { DasaraSearch } from "./dasara-search";
import { DasaraTreasures } from "./dasara-treasures";

/**
 * The Living Archive of Mysuru Dasara.
 *
 * A cinematic, decade-travelling digital museum. The visitor scrubs a Time
 * Machine slider; the whole page re-tints, re-grains and re-types itself to the
 * chosen year's era. Every capsule is a historically-honest "time capsule"
 * (see data/dasara-archive.ts and its confidence flags).
 */
export function DasaraArchiveView() {
  const { bi } = useTranslation();

  // The year currently framed by the Time Machine.
  const [year, setYear] = React.useState<number>(1947);
  const [compareOpen, setCompareOpen] = React.useState(false);

  const capsule = React.useMemo(() => activeCapsule(year), [year]);
  const era = React.useMemo(() => eraForYear(capsule.year), [capsule.year]);

  // Palette + film grammar flow from the era onto the whole archive via CSS vars.
  const styleVars = {
    ["--accent" as string]: era.accent,
    ["--accent2" as string]: era.accent2,
  } as React.CSSProperties;

  const jump = React.useCallback((y: number) => {
    setYear(y);
    if (typeof document !== "undefined") {
      document
        .getElementById("dasara-capsule")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div
      style={styleVars}
      className="dasara-archive relative min-h-dvh overflow-hidden bg-[#0b0805] text-amber-50"
    >
      {/* Film grain + vignette that sit above the whole archive */}
      <div className="dasara-grain pointer-events-none fixed inset-0 z-[1] opacity-[0.09]" />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(120%_90%_at_50%_-10%,transparent_55%,rgba(0,0,0,0.65))]" />

      <Hero />

      {/* THE TIME MACHINE */}
      <section className="relative z-[2] mx-auto max-w-6xl px-4 sm:px-6">
        <DasaraTimeMachine
          years={DASARA_TIMELINE}
          value={year}
          onChange={setYear}
        />
      </section>

      {/* SEARCH + COMPARE controls */}
      <section className="relative z-[2] mx-auto mt-8 flex max-w-6xl flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <DasaraSearch onJump={jump} />
        <button
          onClick={() => setCompareOpen(true)}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-[rgb(var(--accent)/0.5)] bg-[rgb(var(--accent)/0.12)] px-4 py-2 text-sm font-semibold text-amber-100 transition-all hover:bg-[rgb(var(--accent)/0.22)] active:scale-95"
        >
          ⇄ {bi("Compare two years", "ಎರಡು ವರ್ಷ ಹೋಲಿಸಿ")}
        </button>
      </section>

      {/* THE YEAR CAPSULE */}
      <section
        id="dasara-capsule"
        className="relative z-[2] mx-auto mt-10 max-w-6xl scroll-mt-24 px-4 pb-8 sm:px-6"
      >
        <YearCapsule key={capsule.year} capsule={capsule} />
      </section>

      {/* HIDDEN TREASURES */}
      <section className="relative z-[2] mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <DasaraTreasures treasures={DASARA_TREASURES} onJump={jump} />
      </section>

      {/* AI HISTORIAN */}
      <section className="relative z-[2] mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <DasaraHistorian onJump={jump} />
      </section>

      {/* Closing marquee */}
      <footer className="relative z-[2] border-t border-amber-100/10 py-14 text-center">
        <p className="mx-auto max-w-2xl px-6 text-pretty text-sm text-amber-100/60">
          {bi(
            "An honest archive: capsules marked “documented” rest on well-attested history; “partial” lean on verified context; imagery is sourced live or is a labelled impression of the period. Nothing here is invented.",
            "ಪ್ರಾಮಾಣಿಕ ಆರ್ಕೈವ್: “ದಾಖಲಿತ” ಕ್ಯಾಪ್ಸೂಲ್‌ಗಳು ದೃಢ ಇತಿಹಾಸದ ಮೇಲೆ; “ಭಾಗಶಃ” ಪರಿಶೀಲಿತ ಸಂದರ್ಭದ ಮೇಲೆ; ಇಲ್ಲಿ ಯಾವುದೂ ಕಲ್ಪಿತವಲ್ಲ.",
          )}
        </p>
      </footer>

      {compareOpen && (
        <DasaraCompare
          years={DASARA_TIMELINE}
          initialLeft={1947}
          initialRight={2025}
          onClose={() => setCompareOpen(false)}
        />
      )}
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────── */
function Hero() {
  const { bi } = useTranslation();
  return (
    <header className="relative z-[2] flex min-h-[78vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* The palace, illuminating bulb-by-bulb behind the title */}
      <div className="pointer-events-none absolute inset-0">
        <JourneyFigure
          wiki="Mysore Palace"
          alt="The illuminated Mysore Palace"
          rounded="none"
          kenBurns
          lazy={false}
          className="absolute inset-0 h-full w-full opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0805]/60 via-[#0b0805]/30 to-[#0b0805]" />
        <div className="dasara-bulbs absolute inset-0" />
      </div>

      <span className="relative inline-flex items-center gap-2 rounded-full border border-amber-200/30 bg-amber-100/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-amber-200/80 backdrop-blur">
        🏛 {bi("The Living Archive", "ಜೀವಂತ ಆರ್ಕೈವ್")}
      </span>

      <h1 className="dasara-title relative mt-6 text-balance text-4xl font-black leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
        <span className="block bg-gradient-to-b from-amber-100 to-amber-400 bg-clip-text text-transparent">
          {bi("Mysuru Dasara", "ಮೈಸೂರು ದಸರಾ")}
        </span>
        <span className="mt-2 block text-lg font-medium tracking-[0.2em] text-amber-200/70 sm:text-2xl">
          {bi("A Century in Golden Light", "ಚಿನ್ನದ ಬೆಳಕಿನ ಒಂದು ಶತಮಾನ")}
        </span>
      </h1>

      <p className="relative mt-6 max-w-2xl text-pretty text-sm text-amber-100/70 sm:text-base">
        {bi(
          "Don't read history — travel through it. Scrub the Time Machine below and watch the palace, the procession and the world itself change, decade by decade.",
          "ಇತಿಹಾಸ ಓದಬೇಡಿ — ಅದರಲ್ಲಿ ಪ್ರಯಾಣಿಸಿ. ಕೆಳಗಿನ ಟೈಮ್ ಮೆಶೀನ್ ಸರಿಸಿ; ಅರಮನೆ, ಮೆರವಣಿಗೆ, ಜಗತ್ತು ದಶಕದಿಂದ ದಶಕಕ್ಕೆ ಬದಲಾಗುವುದನ್ನು ನೋಡಿ.",
        )}
      </p>

      <div className="relative mt-10 animate-bounce text-2xl text-amber-200/60">↓</div>
    </header>
  );
}

/* ── Year Capsule ─────────────────────────────────────────────────── */
function YearCapsule({ capsule }: { capsule: DasaraYear }) {
  const { bi } = useTranslation();
  const era = eraForYear(capsule.year);

  return (
    <article className="dasara-capsule-in">
      {/* Era ribbon */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="text-6xl font-black tabular-nums text-[rgb(var(--accent))] drop-shadow sm:text-8xl">
          {capsule.year}
        </span>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200/70">
            {bi(era.labelEn, era.labelKn)}
          </span>
          <ConfidenceBadge level={capsule.confidence} />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
        {/* Left: narrative */}
        <div>
          <h2 className="text-balance text-2xl font-bold text-amber-50 sm:text-4xl">
            {bi(capsule.titleEn, capsule.titleKn)}
          </h2>
          <div className="mt-2">
            <ReadAloud
              textEn={`${capsule.titleEn}. ${capsule.summaryEn}`}
              textKn={`${capsule.titleKn}. ${capsule.summaryKn}`}
            />
          </div>
          <p className="mt-4 text-pretty leading-relaxed text-amber-100/85">
            {bi(capsule.summaryEn, capsule.summaryKn)}
          </p>

          {capsule.ruler && (
            <FactRow
              label={bi("Royal head", "ರಾಜ ಮುಖ್ಯಸ್ಥ")}
              value={bi(capsule.ruler.en, capsule.ruler.kn)}
            />
          )}
          {capsule.changed && (
            <FactRow
              accent
              label={bi("What changed", "ಏನು ಬದಲಾಯಿತು")}
              value={bi(capsule.changed.en, capsule.changed.kn)}
            />
          )}
          {capsule.historicMoment && (
            <FactRow
              accent
              label={bi("Historic moment", "ಐತಿಹಾಸಿಕ ಕ್ಷಣ")}
              value={bi(capsule.historicMoment.en, capsule.historicMoment.kn)}
            />
          )}

          {/* Highlights */}
          <h3 className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200/70">
            {bi("Major highlights", "ಪ್ರಮುಖ ಆಕರ್ಷಣೆಗಳು")}
          </h3>
          <ul className="mt-3 space-y-2.5">
            {capsule.highlights.map((h, i) => (
              <li
                key={i}
                className="flex gap-3 text-sm leading-relaxed text-amber-100/85"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[rgb(var(--accent))]" />
                {bi(h.en, h.kn)}
              </li>
            ))}
          </ul>

          {/* Optional structured facts */}
          <div className="mt-6 space-y-3">
            {capsule.newTradition && (
              <MiniFact
                icon="✨"
                label={bi("New tradition", "ಹೊಸ ಸಂಪ್ರದಾಯ")}
                value={bi(capsule.newTradition.en, capsule.newTradition.kn)}
              />
            )}
            {capsule.discontinued && (
              <MiniFact
                icon="🕯"
                label={bi("Discontinued", "ನಿಲ್ಲಿಸಲಾಯಿತು")}
                value={bi(capsule.discontinued.en, capsule.discontinued.kn)}
              />
            )}
            {capsule.government && (
              <MiniFact
                icon="🏛"
                label={bi("Government", "ಸರ್ಕಾರ")}
                value={bi(capsule.government.en, capsule.government.kn)}
              />
            )}
            {capsule.royal && (
              <MiniFact
                icon="👑"
                label={bi("Royal family", "ರಾಜಮನೆತನ")}
                value={bi(capsule.royal.en, capsule.royal.kn)}
              />
            )}
            {capsule.cultural?.map((c, i) => (
              <MiniFact
                key={i}
                icon="🎭"
                label={bi("Culture", "ಸಂಸ್ಕೃತಿ")}
                value={bi(c.en, c.kn)}
              />
            ))}
            {capsule.stories?.map((s, i) => (
              <MiniFact
                key={i}
                icon="📜"
                label={bi("Rare fact", "ಅಪರೂಪ ಸಂಗತಿ")}
                value={bi(s.en, s.kn)}
              />
            ))}
          </div>
        </div>

        {/* Right: gallery + world context */}
        <div>
          <div className="grid grid-cols-2 gap-3">
            {capsule.wiki.map((w, i) => (
              <figure
                key={w + i}
                className={cn(
                  "group relative overflow-hidden rounded-2xl ring-1 ring-amber-100/15",
                  i === 0 ? "col-span-2 aspect-[16/10]" : "aspect-square",
                )}
              >
                <JourneyFigure
                  wiki={w}
                  alt={capsule.captions?.[i]?.en ?? w}
                  rounded="none"
                  kenBurns={i === 0}
                  className={cn(
                    "absolute inset-0 h-full w-full",
                    capsule.confidence === "reconstructed" && "dasara-sepia",
                  )}
                />
                {capsule.captions?.[i] && (
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2.5 text-[11px] leading-snug text-amber-50/90 opacity-0 transition-opacity group-hover:opacity-100">
                    {bi(capsule.captions[i].en, capsule.captions[i].kn)}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>

          {/* Meanwhile, in the world */}
          {(capsule.india || capsule.karnataka || capsule.world) && (
            <div className="mt-4 rounded-2xl border border-amber-100/12 bg-black/30 p-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200/70">
                {bi("Meanwhile…", "ಅದೇ ವೇಳೆ…")}
              </h3>
              <dl className="mt-3 space-y-2.5 text-sm">
                {capsule.india && (
                  <ContextLine
                    tag="🇮🇳"
                    label={bi("India", "ಭಾರತ")}
                    value={bi(capsule.india.en, capsule.india.kn)}
                  />
                )}
                {capsule.karnataka && (
                  <ContextLine
                    tag="◈"
                    label={bi("Karnataka", "ಕರ್ನಾಟಕ")}
                    value={bi(capsule.karnataka.en, capsule.karnataka.kn)}
                  />
                )}
                {capsule.world && (
                  <ContextLine
                    tag="🌍"
                    label={bi("World", "ಜಗತ್ತು")}
                    value={bi(capsule.world.en, capsule.world.kn)}
                  />
                )}
              </dl>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

/* ── Small presentational helpers ─────────────────────────────────── */
function FactRow({
  label,
  value,
  accent,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "mt-4 rounded-xl border p-3.5",
        accent
          ? "border-[rgb(var(--accent)/0.4)] bg-[rgb(var(--accent)/0.1)]"
          : "border-amber-100/12 bg-black/20",
      )}
    >
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-200/70">
        {label}
      </span>
      <p className="mt-1 text-sm leading-relaxed text-amber-50/90">{value}</p>
    </div>
  );
}

function MiniFact({
  icon,
  label,
  value,
}: {
  icon: string;
  label: React.ReactNode;
  value: React.ReactNode;
}) {
  return (
    <div className="flex gap-3 rounded-xl border border-amber-100/10 bg-black/20 p-3">
      <span className="text-lg leading-none">{icon}</span>
      <div>
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-200/60">
          {label}
        </span>
        <p className="mt-0.5 text-sm leading-relaxed text-amber-100/85">
          {value}
        </p>
      </div>
    </div>
  );
}

function ContextLine({
  tag,
  label,
  value,
}: {
  tag: string;
  label: React.ReactNode;
  value: React.ReactNode;
}) {
  return (
    <div className="flex gap-2.5">
      <span className="shrink-0" aria-hidden>
        {tag}
      </span>
      <p className="text-amber-100/80">
        <span className="font-semibold text-amber-100">{label}: </span>
        {value}
      </p>
    </div>
  );
}

const CONF_META: Record<
  Confidence,
  { en: string; kn: string; cls: string }
> = {
  documented: {
    en: "Documented history",
    kn: "ದಾಖಲಿತ ಇತಿಹಾಸ",
    cls: "border-emerald-400/40 bg-emerald-400/10 text-emerald-200",
  },
  partial: {
    en: "Partial record · verified context",
    kn: "ಭಾಗಶಃ ದಾಖಲೆ · ಪರಿಶೀಲಿತ ಸಂದರ್ಭ",
    cls: "border-amber-400/40 bg-amber-400/10 text-amber-200",
  },
  reconstructed: {
    en: "Artistic reconstruction — not a photograph",
    kn: "ಕಲಾತ್ಮಕ ಪುನರ್ರಚನೆ — ಛಾಯಾಚಿತ್ರವಲ್ಲ",
    cls: "border-rose-400/40 bg-rose-400/10 text-rose-200",
  },
};

export function ConfidenceBadge({ level }: { level: Confidence }) {
  const { bi } = useTranslation();
  const m = CONF_META[level];
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide",
        m.cls,
      )}
    >
      ● {bi(m.en, m.kn)}
    </span>
  );
}

/** Nearest capsule at or before the scrubbed year (the spine is sparse). */
function activeCapsule(year: number): DasaraYear {
  const exact = DASARA_TIMELINE.find((y) => y.year === year);
  if (exact) return exact;
  let best = DASARA_TIMELINE[0];
  for (const y of DASARA_TIMELINE) {
    if (y.year <= year) best = y;
  }
  return best;
}
