"use client";

import * as React from "react";
import { BookOpen, MapPin, Sparkles, Shuffle, Quote } from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/language-provider";
import { ReadAloud } from "@/components/ui/read-aloud";
import { getDistrictInfo, type WikiInfo } from "@/lib/wiki";
import {
  stories,
  STORY_THEMES,
  type Story,
  type StoryTheme,
} from "@/data/stories";

/** Story Weaver — Karnataka's folktales and legends, read aloud, bilingual. */
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

  const themeLabel = (id: StoryTheme) => {
    const th = STORY_THEMES.find((x) => x.id === id)!;
    return bi(th.en, th.kn);
  };

  return (
    <div className="container py-16 md:py-24">
      <header className="mx-auto mb-10 max-w-2xl text-center">
        <span className="rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-sm text-muted-foreground">
          📖 {t("story.badge")}
        </span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
          {t("story.title")}
        </h1>
        <p className="mt-4 text-pretty text-lg text-muted-foreground">
          {t("story.subtitle")}
        </p>
        <button
          onClick={surprise}
          className="heritage-glow mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
        >
          <Shuffle className="h-4 w-4" />
          {t("story.surprise")}
        </button>
      </header>

      {/* Theme filter */}
      <div className="mb-10 flex flex-wrap justify-center gap-2">
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

      {/* Story grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((s) => (
          <button
            key={s.id}
            onClick={() => setActive(s)}
            className="group flex flex-col rounded-2xl border border-border bg-card p-6 text-left transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="text-4xl">{s.emoji}</span>
              <span className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                {themeLabel(s.theme)}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-semibold tracking-tight">
              {bi(s.titleEn, s.titleKn)}
            </h3>
            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" /> {bi(s.placeEn, s.placeKn)}
            </p>
            <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
              {bi(s.summaryEn, s.summaryKn)}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
              <BookOpen className="h-4 w-4" /> {t("story.read")}
            </span>
          </button>
        ))}
      </div>

      {active && <StoryReader story={active} onClose={() => setActive(null)} />}
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

function StoryReader({
  story,
  onClose,
}: {
  story: Story;
  onClose: () => void;
}) {
  const { t, bi } = useTranslation();
  const [info, setInfo] = React.useState<WikiInfo | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let alive = true;
    setLoading(true);
    getDistrictInfo(story.wiki, undefined, story.wiki)
      .then((i) => alive && setInfo(i))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [story]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Paragraph pairs for display.
  const paras = story.bodyEn.map((en, i) => ({
    en,
    kn: story.bodyKn[i] ?? en,
  }));

  // Full text for read-aloud, in both languages — ReadAloud picks the one it
  // can actually speak on this device.
  const readEn = [...story.bodyEn, story.moralEn].join(" ");
  const readKn = [...story.bodyKn, story.moralKn].join(" ");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Live image header */}
        <div className="relative h-48 w-full overflow-hidden rounded-t-2xl bg-secondary/40">
          {loading ? (
            <div className="h-full w-full animate-pulse bg-secondary" />
          ) : info?.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={info.imageUrl}
              alt={story.titleEn}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-6xl opacity-30">
              {story.emoji}
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

        <div className="p-6 md:p-8">
          <div className="flex items-start gap-3">
            <span className="text-4xl">{story.emoji}</span>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                {bi(story.titleEn, story.titleKn)}
              </h2>
              <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                {bi(story.placeEn, story.placeKn)}
              </p>
            </div>
          </div>

          {/* Read aloud the whole story */}
          <div className="mt-4">
            <ReadAloud
              textEn={readEn}
              textKn={readKn}
              label={t("story.listen")}
            />
          </div>

          {/* Story body */}
          <div className="mt-6 space-y-4">
            {paras.map((p, i) => (
              <p
                key={i}
                className="text-pretty leading-relaxed text-foreground/90"
              >
                {bi(p.en, p.kn)}
              </p>
            ))}
          </div>

          {/* Moral */}
          <div className="mt-8 rounded-2xl border border-primary/30 bg-primary/5 p-5">
            <p className="flex items-center gap-1.5 text-sm font-semibold text-primary">
              <Sparkles className="h-4 w-4" /> {t("story.moral")}
            </p>
            <p className="mt-2 flex gap-2 text-pretty leading-relaxed">
              <Quote className="mt-1 h-4 w-4 shrink-0 text-primary/60" />
              {bi(story.moralEn, story.moralKn)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
