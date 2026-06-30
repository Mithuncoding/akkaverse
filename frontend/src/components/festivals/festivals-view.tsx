"use client";

import * as React from "react";
import { Compass, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/language-provider";
import { JourneyFigure } from "@/components/timeline/journey-figure";
import { FestivalWorld } from "@/components/festivals/festival-world";
import { festivals, MONTHS_EN, MONTHS_KN, type Festival } from "@/data/festivals";
import {
  EMOTIONS,
  experienceFor,
  type Emotion,
} from "@/data/festival-experience";

/**
 * Festivals — Karnataka's digital cultural museum.
 *
 * Discovery happens two ways: by *feeling* (emotion chips) and by *time* (a
 * living wheel of the Kannada year). Choosing a festival opens an immersive,
 * colour-shifting full-screen "world" (see FestivalWorld).
 */
export function FestivalsView() {
  const { t, bi } = useTranslation();
  const [emotion, setEmotion] = React.useState<Emotion | null>(null);
  const [active, setActive] = React.useState<Festival | null>(null);

  const matches = React.useCallback(
    (f: Festival) => !emotion || experienceFor(f.id).emotions.includes(emotion),
    [emotion],
  );

  const ordered = React.useMemo(
    () => [...festivals].sort((a, b) => a.month - b.month),
    [],
  );

  return (
    <div className="relative overflow-hidden">
      {/* Soft ambient backdrop */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(70%_60%_at_50%_0%,hsl(var(--primary)/0.12),transparent)]" />

      <div className="container relative py-12 md:py-20">
        {/* Header */}
        <header className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" /> {t("festival.badge")}
          </span>
          <h1 className="mt-5 text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {bi(
              "Step inside Karnataka's festivals",
              "ಕರ್ನಾಟಕದ ಹಬ್ಬಗಳ ಒಳಗೆ ಹೆಜ್ಜೆ ಇಡಿ",
            )}
          </h1>
          <p className="mt-4 text-pretty text-base text-muted-foreground sm:text-lg">
            {bi(
              "Don't read about them — attend them. Choose a feeling, or travel the year, and step into a world of light, colour and sound.",
              "ಓದಬೇಡಿ — ಅನುಭವಿಸಿ. ಒಂದು ಭಾವವನ್ನು ಆರಿಸಿ, ಅಥವಾ ವರ್ಷವನ್ನು ಸುತ್ತಿ, ಬೆಳಕು-ಬಣ್ಣ-ನಾದದ ಲೋಕಕ್ಕೆ ಪ್ರವೇಶಿಸಿ.",
            )}
          </p>
        </header>

        {/* Discover by feeling */}
        <section className="mx-auto mt-12 max-w-3xl">
          <h2 className="mb-4 flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            <Compass className="h-4 w-4 text-primary" />
            {bi("How do you want to feel?", "ನಿಮಗೆ ಹೇಗೆ ಅನಿಸಬೇಕು?")}
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {EMOTIONS.map((e) => {
              const on = emotion === e.id;
              return (
                <button
                  key={e.id}
                  onClick={() => setEmotion(on ? null : e.id)}
                  aria-pressed={on}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-all active:scale-95",
                    on
                      ? "border-primary bg-primary text-primary-foreground shadow-md"
                      : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
                  )}
                >
                  <span>{e.emoji}</span>
                  {bi(e.labelEn, e.labelKn)}
                </button>
              );
            })}
          </div>
        </section>

        {/* Living wheel of the year */}
        <section className="mt-14">
          <WheelOfYear matches={matches} onPick={(f) => setActive(f)} />
        </section>

        {/* Festival portals — image-led, not text cards */}
        <section className="mt-16">
          <h2 className="mb-6 text-center text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {emotion
              ? bi("Festivals for that feeling", "ಆ ಭಾವದ ಹಬ್ಬಗಳು")
              : bi("Enter a festival", "ಒಂದು ಹಬ್ಬವನ್ನು ಪ್ರವೇಶಿಸಿ")}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {ordered.map((f) => (
              <Portal
                key={f.id}
                festival={f}
                dim={!matches(f)}
                onOpen={() => setActive(f)}
              />
            ))}
          </div>
        </section>
      </div>

      {active && (
        <FestivalWorld festival={active} onClose={() => setActive(null)} />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Festival portal — an image doorway into the world
 * ------------------------------------------------------------------ */
function Portal({
  festival,
  dim,
  onOpen,
}: {
  festival: Festival;
  dim: boolean;
  onOpen: () => void;
}) {
  const { bi } = useTranslation();
  const exp = experienceFor(festival.id);
  return (
    <button
      onClick={onOpen}
      aria-label={festival.nameEn}
      style={
        {
          ["--accent" as string]: exp.accent,
          ["--accent2" as string]: exp.accent2,
        } as React.CSSProperties
      }
      className={cn(
        "group relative aspect-[3/4] overflow-hidden rounded-3xl text-left ring-1 ring-border transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl active:scale-[0.98] sm:aspect-[4/5]",
        dim ? "opacity-40 saturate-50" : "opacity-100",
      )}
    >
      <JourneyFigure
        wiki={exp.heroImageTitle ?? exp.hero}
        alt={festival.nameEn}
        rounded="none"
        kenBurns
        className="absolute inset-0 h-full w-full"
      />
      {/* themed gradient + readability scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_120%,rgb(var(--accent)/0.45),transparent_60%)] opacity-70 transition-opacity group-hover:opacity-100" />

      {/* content */}
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <span className="text-3xl drop-shadow-lg sm:text-4xl">
          {festival.emoji}
        </span>
        <h3 className="mt-2 text-balance text-base font-bold leading-tight text-white drop-shadow sm:text-xl">
          {bi(festival.nameEn, festival.nameKn)}
        </h3>
        <p className="mt-1 text-[11px] font-medium text-white/75 sm:text-xs">
          {bi(festival.whenEn, festival.whenKn)}
        </p>
        <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-[rgb(var(--accent))] px-3 py-1 text-[11px] font-semibold text-black opacity-0 transition-all duration-300 group-hover:opacity-100 sm:text-xs">
          {bi("Enter", "ಪ್ರವೇಶಿಸಿ")} →
        </span>
      </div>
    </button>
  );
}

/* ------------------------------------------------------------------ *
 * Wheel of the year — a living seasonal dial
 * ------------------------------------------------------------------ */
function WheelOfYear({
  matches,
  onPick,
}: {
  matches: (f: Festival) => boolean;
  onPick: (f: Festival) => void;
}) {
  const { bi, locale } = useTranslation();
  const now = new Date().getMonth() + 1;
  const [hover, setHover] = React.useState<Festival | null>(null);

  // Group festivals by month, then fan out collisions around the dial.
  const nodes = React.useMemo(() => {
    const byMonth = new Map<number, Festival[]>();
    for (const f of festivals) {
      byMonth.set(f.month, [...(byMonth.get(f.month) ?? []), f]);
    }
    const out: { f: Festival; angle: number }[] = [];
    for (const [month, list] of byMonth) {
      const base = ((month - 1) / 12) * 360;
      const spread = 18;
      list.forEach((f, i) => {
        const offset =
          list.length === 1 ? 0 : (i - (list.length - 1) / 2) * spread;
        out.push({ f, angle: base + offset });
      });
    }
    return out;
  }, []);

  const seasonEn =
    now <= 2 || now === 12
      ? "Winter harvest"
      : now <= 5
        ? "Spring renewal"
        : now <= 9
          ? "Monsoon & devotion"
          : "Festival autumn";
  const seasonKn =
    now <= 2 || now === 12
      ? "ಚಳಿಗಾಲದ ಸುಗ್ಗಿ"
      : now <= 5
        ? "ವಸಂತದ ನವೀಕರಣ"
        : now <= 9
          ? "ಮಳೆ ಮತ್ತು ಭಕ್ತಿ"
          : "ಹಬ್ಬಗಳ ಶರತ್ಕಾಲ";

  const current = hover;

  return (
    <div className="mx-auto max-w-md">
      <div className="relative mx-auto aspect-square w-full">
        {/* slowly rotating decorative ring */}
        <div className="absolute inset-0 animate-[spin_90s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,hsl(var(--primary)/0.35),transparent_25%,hsl(var(--primary)/0.25)_50%,transparent_75%,hsl(var(--primary)/0.35))] opacity-60 [mask:radial-gradient(circle,transparent_61%,black_62%,black_70%,transparent_71%)]" />
        {/* static dial ring */}
        <div className="absolute inset-[10%] rounded-full border border-dashed border-border" />

        {/* current-month pointer at top */}
        <div className="absolute left-1/2 top-[3%] -translate-x-1/2 text-primary">
          ▼
        </div>

        {/* center hub */}
        <div className="absolute inset-[26%] grid place-items-center rounded-full border border-border bg-card/80 p-4 text-center shadow-inner backdrop-blur">
          {current ? (
            <div className="fest-mode-in">
              <div className="text-4xl">{current.emoji}</div>
              <p className="mt-1 text-sm font-bold leading-tight">
                {bi(current.nameEn, current.nameKn)}
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {bi(current.whenEn, current.whenKn)}
              </p>
            </div>
          ) : (
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-primary">
                {bi("Right now", "ಈಗ")}
              </p>
              <p className="mt-1 text-sm font-bold leading-tight">
                {bi(seasonEn, seasonKn)}
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                {locale === "kn" ? MONTHS_KN[now - 1] : MONTHS_EN[now - 1]}
              </p>
            </div>
          )}
        </div>

        {/* festival nodes */}
        {nodes.map(({ f, angle }) => {
          const rad = (angle * Math.PI) / 180;
          const r = 43; // % from center
          const x = (50 + r * Math.sin(rad)).toFixed(3);
          const y = (50 - r * Math.cos(rad)).toFixed(3);
          const dim = !matches(f);
          const soon = (f.month - now + 12) % 12 <= 1;
          return (
            <button
              key={f.id}
              onClick={() => onPick(f)}
              onMouseEnter={() => setHover(f)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(f)}
              onBlur={() => setHover(null)}
              aria-label={f.nameEn}
              className={cn(
                "absolute z-10 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border bg-card text-xl shadow-md transition-all duration-300 hover:scale-125 hover:border-primary active:scale-110 sm:h-12 sm:w-12 sm:text-2xl",
                dim ? "opacity-30 saturate-0" : "opacity-100",
                soon && !dim ? "border-primary" : "border-border",
              )}
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {soon && !dim && (
                <span className="journey-pin-ping absolute inline-flex h-full w-full rounded-full border border-primary" />
              )}
              {f.emoji}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        {bi(
          "Tap any festival on the wheel to step inside · the ring turns through Karnataka's year",
          "ಒಳಗೆ ಹೋಗಲು ಚಕ್ರದ ಯಾವುದೇ ಹಬ್ಬವನ್ನು ಮುಟ್ಟಿ · ಚಕ್ರ ಕರ್ನಾಟಕದ ವರ್ಷವನ್ನು ಸುತ್ತುತ್ತದೆ",
        )}
      </p>
    </div>
  );
}
