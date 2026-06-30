"use client";

import * as React from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  BookOpen,
  Map as MapIcon,
  MapPin,
  Quote,
  Sparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/language-provider";
import { ReadAloud } from "@/components/ui/read-aloud";
import { JourneyFigure } from "@/components/timeline/journey-figure";
import { JourneyMap } from "@/components/timeline/journey-map";
import { StoryParticles } from "@/components/stories/story-particles";
import type { Story } from "@/data/stories";
import { cinematicFor, MOOD_THEME } from "@/data/story-cinematic";

type Mode = "cinema" | "storybook" | "journey";

const MODES: { id: Mode; icon: typeof Clapperboard; en: string; kn: string }[] = [
  { id: "cinema", icon: Clapperboard, en: "Cinema", kn: "ಸಿನಿಮಾ" },
  { id: "storybook", icon: BookOpen, en: "Storybook", kn: "ಕಥಾ ಪುಸ್ತಕ" },
  { id: "journey", icon: MapIcon, en: "Journey", kn: "ಯಾತ್ರೆ" },
];

/**
 * StoryTheater — a full-screen, immersive way to live a single story.
 *
 * One story, three completely different stages: a scroll-free cinematic
 * sequence, an illustrated storybook with page turns, and a map-anchored
 * journey. The mood drives colour, light and ambient particles throughout.
 */
export function StoryTheater({
  story,
  onClose,
}: {
  story: Story;
  onClose: () => void;
}) {
  const { bi, locale } = useTranslation();
  const cine = cinematicFor(story.id);
  const mood = MOOD_THEME[cine.mood];

  const total = story.bodyEn.length;
  const [mode, setMode] = React.useState<Mode>("cinema");
  const [scene, setScene] = React.useState(0);
  const [dir, setDir] = React.useState<1 | -1>(1);

  const sceneTitle = (i: number) =>
    cine.scenes[i] ? bi(cine.scenes[i].en, cine.scenes[i].kn) : `Scene ${i + 1}`;
  const image = (i: number) =>
    cine.gallery.length ? cine.gallery[i % cine.gallery.length] : story.wiki;
  const isLast = scene === total - 1;

  const go = React.useCallback(
    (next: number) => {
      if (next < 0 || next > total - 1) return;
      setDir(next > scene ? 1 : -1);
      setScene(next);
    },
    [scene, total],
  );

  // Keyboard + body scroll lock.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(scene + 1);
      else if (e.key === "ArrowLeft") go(scene - 1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [go, scene, onClose]);

  return (
    <div
      style={
        {
          "--accent": mood.accent,
          "--accent2": mood.accent2,
        } as React.CSSProperties
      }
      className="fixed inset-x-0 top-0 z-50 flex h-[100dvh] flex-col bg-[#0b0b10] text-white animate-fade-up"
    >
      {/* mood vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,rgb(var(--accent)/0.22),transparent_55%)]" />

      {/* ============================ TOP BAR ============================ */}
      <header
        className="relative z-20 flex items-center justify-between gap-2 px-3 py-3 sm:gap-3 sm:px-4 md:px-6"
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 0.75rem)" }}
      >
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm font-medium backdrop-blur transition-colors hover:bg-white/10"
        >
          <X className="h-4 w-4" />
          <span className="hidden sm:inline">{bi("Close", "ಮುಚ್ಚಿ")}</span>
        </button>

        <div className="min-w-0 text-center">
          <div className="truncate text-sm font-semibold md:text-base">
            {bi(story.titleEn, story.titleKn)}
          </div>
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-white/55">
            <MapPin className="h-3 w-3" />
            <span className="truncate">{bi(story.placeEn, story.placeKn)}</span>
          </div>
        </div>

        {/* Mode switcher */}
        <div className="flex items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur">
          {MODES.map((m) => {
            const Icon = m.icon;
            const on = mode === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setMode(m.id)}
                title={bi(m.en, m.kn)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium transition-all",
                  on
                    ? "bg-[rgb(var(--accent))] text-black shadow-[0_4px_16px_-4px_rgb(var(--accent))]"
                    : "text-white/65 hover:text-white",
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden md:inline">{bi(m.en, m.kn)}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* ============================= STAGE ============================= */}
      <div className="relative z-10 min-h-0 flex-1">
        {mode === "cinema" && (
          <CinemaStage
            story={story}
            scene={scene}
            dir={dir}
            isLast={isLast}
            locale={locale}
            sceneTitle={sceneTitle(scene)}
            image={image(scene)}
            particle={mood.particle}
            motif={cine.motif}
          />
        )}
        {mode === "storybook" && (
          <StorybookStage
            story={story}
            scene={scene}
            dir={dir}
            isLast={isLast}
            locale={locale}
            sceneTitle={sceneTitle(scene)}
            image={image(scene)}
            total={total}
          />
        )}
        {mode === "journey" && (
          <JourneyStage
            story={story}
            cineCoords={cine.coords}
            scene={scene}
            locale={locale}
            sceneTitle={sceneTitle(scene)}
            moodLabel={bi(mood.label, mood.labelKn)}
            themeLabel={bi(story.placeEn, story.placeKn)}
          />
        )}
      </div>

      {/* =========================== CONTROLS =========================== */}
      <footer
        className="relative z-20 flex items-center justify-between gap-2 px-3 py-4 sm:gap-4 sm:px-4 md:px-6"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 1rem)" }}
      >
        <button
          type="button"
          onClick={() => go(scene - 1)}
          disabled={scene === 0}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur transition-all hover:bg-white/10 disabled:opacity-30"
          aria-label={bi("Previous scene", "ಹಿಂದಿನ ದೃಶ್ಯ")}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex flex-1 items-center justify-center gap-2 sm:gap-3">
          <div className="hidden text-xs font-medium text-white/50 sm:block">
            {bi("Scene", "ದೃಶ್ಯ")} {scene + 1}/{total}
          </div>
          {/* Compact counter on phones (dots would overflow) */}
          <div className="text-xs font-semibold tabular-nums text-white/55 sm:hidden">
            {scene + 1}
            <span className="text-white/30">/{total}</span>
          </div>
          <div className="hidden items-center gap-1.5 sm:flex">
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`${bi("Scene", "ದೃಶ್ಯ")} ${i + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === scene
                    ? "w-8 bg-[rgb(var(--accent))]"
                    : "w-2.5 bg-white/25 hover:bg-white/40",
                )}
              />
            ))}
          </div>
          <ReadAloud
            textEn={story.bodyEn[scene]}
            textKn={story.bodyKn[scene]}
            label={bi("Listen", "ಕೇಳಿ")}
            className="border-white/15 bg-white/5 text-white hover:bg-white/10"
          />
        </div>

        {scene < total - 1 ? (
          <button
            type="button"
            onClick={() => go(scene + 1)}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-[rgb(var(--accent))] px-5 font-semibold text-black transition-all hover:gap-3 hover:shadow-[0_8px_24px_-6px_rgb(var(--accent))]"
          >
            <span className="hidden sm:inline">{bi("Next", "ಮುಂದೆ")}</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 font-semibold backdrop-blur transition-all hover:bg-white/10"
          >
            <Sparkles className="h-4 w-4 text-[rgb(var(--accent))]" />
            <span className="hidden sm:inline">{bi("The End", "ಮುಕ್ತಾಯ")}</span>
          </button>
        )}
      </footer>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Bilingual paragraph renderer (kept readable in "both" mode)               */
/* -------------------------------------------------------------------------- */
function BiText({
  en,
  kn,
  locale,
  className,
  knClassName,
}: {
  en: string;
  kn: string;
  locale: string;
  className?: string;
  knClassName?: string;
}) {
  if (locale === "kn") return <p className={className}>{kn}</p>;
  if (locale === "en") return <p className={className}>{en}</p>;
  return (
    <>
      <p className={className}>{en}</p>
      <p className={cn(className, "mt-2 opacity-70", knClassName)}>{kn}</p>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  CINEMA — full-bleed, scene-by-scene, dramatic                             */
/* -------------------------------------------------------------------------- */
function CinemaStage({
  story,
  scene,
  dir,
  isLast,
  locale,
  sceneTitle,
  image,
  particle,
  motif,
}: {
  story: Story;
  scene: number;
  dir: 1 | -1;
  isLast: boolean;
  locale: string;
  sceneTitle: string;
  image: string;
  particle: import("@/data/story-cinematic").ParticleKind;
  motif: string;
}) {
  return (
    <section className="relative h-full w-full overflow-hidden">
      {/* layered background image (re-mounts per scene for ken-burns) */}
      <div key={scene} className="absolute inset-0">
        <JourneyFigure
          wiki={image}
          alt={sceneTitle}
          rounded="none"
          kenBurns
          lazy={false}
          className="h-full w-full"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b10] via-[#0b0b10]/70 to-[#0b0b10]/30" />
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_100%,rgb(var(--accent)/0.25),transparent)]" />
      <StoryParticles kind={particle} />

      {/* giant motif watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-4 top-2 select-none text-[28vw] leading-none opacity-[0.07] md:text-[18vw]"
      >
        {motif}
      </span>

      {/* content */}
      <div
        key={`c-${scene}`}
        className={cn(
          "absolute inset-x-0 bottom-0 mx-auto max-w-3xl px-6 pb-10 md:pb-16",
          dir === 1 ? "animate-scene-in" : "animate-scene-in-rev",
        )}
      >
        <div className="mb-3 flex items-center gap-3">
          <span className="text-5xl font-black text-[rgb(var(--accent))] md:text-6xl">
            {String(scene + 1).padStart(2, "0")}
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-[rgb(var(--accent)/0.6)] to-transparent" />
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
            {sceneTitle}
          </span>
        </div>
        <BiText
          en={story.bodyEn[scene]}
          kn={story.bodyKn[scene]}
          locale={locale}
          className="text-pretty font-serif text-xl leading-relaxed text-white/95 md:text-3xl md:leading-snug"
          knClassName="text-base md:text-xl"
        />

        {isLast && (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[rgb(var(--accent)/0.35)] bg-[rgb(var(--accent)/0.08)] p-4 backdrop-blur">
            <Quote className="mt-0.5 h-5 w-5 shrink-0 text-[rgb(var(--accent))]" />
            <BiText
              en={story.moralEn}
              kn={story.moralKn}
              locale={locale}
              className="text-sm font-medium italic text-white/90 md:text-base"
            />
          </div>
        )}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  STORYBOOK — illustrated two-page spread with paper + page turns           */
/* -------------------------------------------------------------------------- */
function StorybookStage({
  story,
  scene,
  dir,
  isLast,
  locale,
  sceneTitle,
  image,
  total,
}: {
  story: Story;
  scene: number;
  dir: 1 | -1;
  isLast: boolean;
  locale: string;
  sceneTitle: string;
  image: string;
  total: number;
}) {
  return (
    <section className="flex h-full w-full items-center justify-center overflow-y-auto px-4 py-6 [perspective:2000px]">
      <div
        key={scene}
        className={cn(
          "story-book grid w-full max-w-5xl overflow-hidden rounded-[1.25rem] shadow-2xl md:grid-cols-2",
          dir === 1 ? "animate-page-turn" : "animate-page-turn-rev",
        )}
      >
        {/* LEFT — illustration plate */}
        <div className="relative min-h-[240px] bg-[#1a1410] p-3 md:p-4">
          <div className="relative h-full overflow-hidden rounded-lg ring-1 ring-amber-200/20">
            <JourneyFigure
              wiki={image}
              alt={sceneTitle}
              rounded="none"
              kenBurns
              lazy={false}
              className="h-full min-h-[220px] w-full"
            />
            <div className="pointer-events-none absolute inset-0 rounded-lg shadow-[inset_0_0_60px_rgba(0,0,0,0.5)]" />
          </div>
          {/* ornate corner flourishes */}
          <span className="pointer-events-none absolute left-2 top-2 text-amber-200/40">❧</span>
          <span className="pointer-events-none absolute bottom-2 right-2 rotate-180 text-amber-200/40">
            ❧
          </span>
        </div>

        {/* RIGHT — parchment page */}
        <div className="story-paper relative flex flex-col px-7 py-8 text-stone-800 md:px-10 md:py-12">
          <div className="mb-2 text-center text-[11px] font-semibold uppercase tracking-[0.35em] text-amber-800/80">
            {sceneTitle}
          </div>
          <div className="mb-5 flex items-center justify-center gap-2 text-amber-800/50">
            <span className="h-px w-10 bg-amber-800/30" />
            <span>✦</span>
            <span className="h-px w-10 bg-amber-800/30" />
          </div>

          {locale !== "kn" && (
            <p className="font-serif text-[1.05rem] leading-8 text-stone-800 first-letter:float-left first-letter:mr-2 first-letter:font-bold first-letter:text-[3.2rem] first-letter:leading-[0.8] first-letter:text-amber-800">
              {story.bodyEn[scene]}
            </p>
          )}
          {locale === "both" && (
            <p className="mt-4 font-serif text-[0.95rem] leading-7 text-stone-600">
              {story.bodyKn[scene]}
            </p>
          )}
          {locale === "kn" && (
            <p className="font-serif text-[1.05rem] leading-8 text-stone-800">
              {story.bodyKn[scene]}
            </p>
          )}

          {isLast && (
            <div className="story-hand mt-6 border-t border-amber-800/20 pt-4 text-center text-[1.05rem] text-amber-900">
              {locale === "kn" ? story.moralKn : story.moralEn}
              {locale === "both" && (
                <div className="mt-1 text-sm text-amber-900/70">{story.moralKn}</div>
              )}
            </div>
          )}

          <div className="mt-auto pt-6 text-center text-xs text-stone-500">
            ~ {scene + 1} / {total} ~
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  JOURNEY — anchored to the real place on the map                           */
/* -------------------------------------------------------------------------- */
function JourneyStage({
  story,
  cineCoords,
  scene,
  locale,
  sceneTitle,
  moodLabel,
  themeLabel,
}: {
  story: Story;
  cineCoords: [number, number];
  scene: number;
  locale: string;
  sceneTitle: string;
  moodLabel: string;
  themeLabel: string;
}) {
  const { bi } = useTranslation();
  return (
    <section className="grid h-full w-full gap-6 overflow-y-auto px-5 py-6 md:grid-cols-2 md:items-center md:px-10">
      {/* MAP */}
      <div className="relative mx-auto w-full max-w-md">
        <div className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.3em] text-[rgb(var(--accent))]">
          {bi("Where it happened", "ಎಲ್ಲಿ ನಡೆಯಿತು")}
        </div>
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-2">
          <JourneyMap coords={cineCoords} label={bi(story.placeEn, story.placeKn)} />
        </div>
        <div className="mt-3 flex flex-wrap justify-center gap-2 text-xs">
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-white/70">
            📍 {themeLabel}
          </span>
          <span className="rounded-full border border-[rgb(var(--accent)/0.4)] bg-[rgb(var(--accent)/0.1)] px-3 py-1 text-[rgb(var(--accent))]">
            {moodLabel}
          </span>
        </div>
      </div>

      {/* SCENE TEXT */}
      <div key={scene} className="animate-scene-in mx-auto w-full max-w-lg">
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[rgb(var(--accent))] text-black">
            {scene + 1}
          </span>
          {sceneTitle}
        </div>
        <BiText
          en={story.bodyEn[scene]}
          kn={story.bodyKn[scene]}
          locale={locale}
          className="text-pretty text-lg leading-relaxed text-white/90 md:text-xl md:leading-relaxed"
          knClassName="text-base text-white/65"
        />
      </div>
    </section>
  );
}
