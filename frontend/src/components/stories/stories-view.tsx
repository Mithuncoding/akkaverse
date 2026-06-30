"use client";

import * as React from "react";
import { MapPin, Shuffle, Play, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/language-provider";
import { Reveal } from "@/components/ui/reveal";
import { JourneyFigure } from "@/components/timeline/journey-figure";
import { StoryTheater } from "@/components/stories/story-theater";
import {
  stories,
  STORY_THEMES,
  type Story,
  type StoryTheme,
} from "@/data/stories";
import { cinematicFor, MOOD_THEME } from "@/data/story-cinematic";

/**
 * Story Weaver — an immersive museum of Karnataka's living stories.
 *
 * The library is an atmospheric gallery; opening any story launches the
 * full-screen Story Theater, where the same tale can be lived three ways —
 * Cinema, Storybook and Journey — each driven by the story's emotional mood.
 */
export function StoriesView() {
  const { t, bi } = useTranslation();
  const [theme, setTheme] = React.useState<StoryTheme | "all">("all");
  const [active, setActive] = React.useState<Story | null>(null);

  const list = React.useMemo(
    () => (theme === "all" ? stories : stories.filter((s) => s.theme === theme)),
    [theme],
  );

  const surprise = React.useCallback(() => {
    const pool = theme === "all" ? stories : list;
    setActive(pool[Math.floor(Math.random() * pool.length)]);
  }, [theme, list]);

  const featured = stories[0];

  return (
    <div className="relative">
      {/* ============================== HERO ============================== */}
      <section className="relative overflow-hidden bg-dotgrid pb-12 pt-16 md:pb-16 md:pt-24">
        <div className="aurora-blob absolute -left-24 top-0 h-80 w-80 rounded-full bg-amber-500/15 blur-3xl" />
        <div className="aurora-blob absolute -right-20 top-20 h-80 w-80 rounded-full bg-rose-500/15 blur-3xl [animation-delay:1.4s]" />

        <div className="container relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-sm text-muted-foreground">
              📖 {t("story.badge")}
            </span>
            <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl md:text-6xl">
              {t("story.title")}
            </h1>
            <p className="mt-4 text-pretty text-base text-muted-foreground sm:text-lg">
              {bi(
                "Step inside Karnataka's legends. Live each story as a cinematic film, an illustrated storybook, or a journey across the land.",
                "ಕರ್ನಾಟಕದ ದಂತಕಥೆಗಳೊಳಗೆ ಹೆಜ್ಜೆಯಿಡಿ. ಪ್ರತಿ ಕಥೆಯನ್ನು ಸಿನಿಮಾ, ಚಿತ್ರಿತ ಕಥಾ ಪುಸ್ತಕ ಅಥವಾ ನಾಡಿನ ಯಾತ್ರೆಯಾಗಿ ಅನುಭವಿಸಿ.",
              )}
            </p>
            <button
              onClick={surprise}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5 active:scale-[0.97]"
            >
              <Shuffle className="h-4 w-4" />
              {t("story.surprise")}
            </button>
          </Reveal>

          {/* Featured story banner */}
          <Reveal delay={120}>
            <FeaturedCard story={featured} onOpen={() => setActive(featured)} />
          </Reveal>
        </div>
      </section>

      {/* ============================ LIBRARY ============================ */}
      <section className="container pb-20 md:pb-24">
        {/* Theme filter — scroll rail on mobile, wraps on larger */}
        <div className="scroll-touch no-scrollbar -mx-[1.15rem] mb-10 flex gap-2 overflow-x-auto px-[1.15rem] pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0">
          <Chip
            label={t("story.all")}
            active={theme === "all"}
            onClick={() => setTheme("all")}
          />
          {STORY_THEMES.map((th) => (
            <Chip
              key={th.id}
              label={`${th.emoji} ${bi(th.en, th.kn)}`}
              active={theme === th.id}
              onClick={() => setTheme(th.id)}
            />
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 80}>
              <StoryCard story={s} onOpen={() => setActive(s)} />
            </Reveal>
          ))}
        </div>
      </section>

      {active && <StoryTheater story={active} onClose={() => setActive(null)} />}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Featured hero card                                                         */
/* -------------------------------------------------------------------------- */
function FeaturedCard({ story, onOpen }: { story: Story; onOpen: () => void }) {
  const { bi } = useTranslation();
  const cine = cinematicFor(story.id);
  const mood = MOOD_THEME[cine.mood];

  return (
    <button
      onClick={onOpen}
      style={
        {
          "--accent": mood.accent,
          "--accent2": mood.accent2,
        } as React.CSSProperties
      }
      className="group relative mx-auto mt-8 block w-full max-w-4xl overflow-hidden rounded-3xl border border-[rgb(var(--accent)/0.3)] text-left shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_-30px_rgb(var(--accent)/0.7)] sm:mt-12"
    >
      <div className="relative h-56 w-full sm:h-64 md:h-80">
        <JourneyFigure
          wiki={cine.gallery[0] ?? story.wiki}
          alt={story.titleEn}
          rounded="none"
          kenBurns
          lazy={false}
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_20%_100%,rgb(var(--accent)/0.3),transparent)]" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 md:p-8">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full bg-[rgb(var(--accent))] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-black">
            {bi("Featured", "ವಿಶೇಷ")}
          </span>
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-medium text-white/80 backdrop-blur">
            {bi(mood.label, mood.labelKn)}
          </span>
        </div>
        <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl md:text-4xl">
          {bi(story.titleEn, story.titleKn)}
        </h2>
        <p className="mt-2 max-w-xl text-pretty text-sm text-white/80 md:text-base">
          {bi(story.summaryEn, story.summaryKn)}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-all group-hover:gap-3">
          <Play className="h-4 w-4 fill-black" />
          {bi("Enter the story", "ಕಥೆಯೊಳಗೆ ಪ್ರವೇಶಿಸಿ")}
        </span>
      </div>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Atmospheric story card                                                     */
/* -------------------------------------------------------------------------- */
function StoryCard({ story, onOpen }: { story: Story; onOpen: () => void }) {
  const { bi } = useTranslation();
  const cine = cinematicFor(story.id);
  const mood = MOOD_THEME[cine.mood];

  return (
    <button
      onClick={onOpen}
      style={
        {
          "--accent": mood.accent,
          "--accent2": mood.accent2,
        } as React.CSSProperties
      }
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-border bg-card text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-[rgb(var(--accent)/0.45)] hover:shadow-[0_28px_70px_-30px_rgb(var(--accent)/0.7)]"
    >
      <div className="relative h-44 w-full overflow-hidden">
        <JourneyFigure
          wiki={cine.gallery[0] ?? story.wiki}
          alt={story.titleEn}
          rounded="none"
          className="h-full w-full transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
        <span className="absolute right-3 top-3 text-3xl drop-shadow-lg">
          {cine.motif}
        </span>
        <span className="absolute left-3 top-3 rounded-full border border-[rgb(var(--accent)/0.5)] bg-black/40 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur">
          {bi(mood.label, mood.labelKn)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold tracking-tight">
          {bi(story.titleEn, story.titleKn)}
        </h3>
        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" /> {bi(story.placeEn, story.placeKn)}
        </p>
        <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
          {bi(story.summaryEn, story.summaryKn)}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[rgb(var(--accent))]">
          <Sparkles className="h-4 w-4" />
          {bi("Experience it", "ಅನುಭವಿಸಿ")}
        </span>
      </div>
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
