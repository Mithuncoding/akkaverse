"use client";

import * as React from "react";
import {
  Handshake,
  Swords,
  Ship,
  Sparkles,
  Quote,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/language-provider";
import { Reveal } from "@/components/ui/reveal";
import { JourneyFigure } from "@/components/timeline/journey-figure";
import { JourneyMap } from "@/components/timeline/journey-map";
import {
  FACET_ICON,
  type Chapter,
  type RelationKind,
} from "@/data/journey";

const RELATION_META: Record<
  RelationKind,
  { icon: LucideIcon; label: string; labelKn: string }
> = {
  alliance: { icon: Handshake, label: "Alliance", labelKn: "ಮೈತ್ರಿ" },
  rivalry: { icon: Swords, label: "Rivalry", labelKn: "ಪ್ರತಿಸ್ಪರ್ಧೆ" },
  trade: { icon: Ship, label: "Trade", labelKn: "ವ್ಯಾಪಾರ" },
  cultural: { icon: Sparkles, label: "Cultural", labelKn: "ಸಾಂಸ್ಕೃತಿಕ" },
};

/**
 * JourneyChapter — one immersive civilizational era.
 *
 * Themed entirely by the chapter's accent (set as CSS variables on the root),
 * so each era has its own visual identity while sharing one design language.
 * Built from progressive, scroll-revealed sections: cinematic cover →
 * narration + map → in-depth facets → gallery → web of powers → the people.
 */
export function JourneyChapter({
  chapter,
  index,
}: {
  chapter: Chapter;
  index: number;
}) {
  const { bi } = useTranslation();
  const coverRef = React.useRef<HTMLDivElement | null>(null);
  const [py, setPy] = React.useState(0);

  // Lightweight parallax: the cover drifts slower than the page scroll.
  React.useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const el = coverRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const progress = rect.top / window.innerHeight; // ~1 (below) → -1 (above)
        setPy(progress * 64);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      id={chapter.id}
      style={
        {
          "--accent": chapter.accent,
          "--accent2": chapter.accent2,
        } as React.CSSProperties
      }
      className="scroll-mt-20"
    >
      {/* ----------------------------- COVER ----------------------------- */}
      <div
        ref={coverRef}
        className="relative h-[82vh] min-h-[540px] w-full overflow-hidden"
      >
        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: `translate3d(0, ${py}px, 0) scale(1.12)` }}
        >
          <JourneyFigure
            wiki={chapter.cover}
            alt={chapter.name}
            rounded="none"
            kenBurns
            lazy={false}
            className="h-full w-full"
          />
        </div>

        {/* cinematic legibility gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/10" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_15%_90%,rgb(var(--accent)/0.30),transparent)]" />

        {/* giant ghost numeral */}
        <span
          aria-hidden
          className="pointer-events-none absolute right-2 top-2 select-none text-[34vw] font-black leading-none text-[rgb(var(--accent)/0.12)] md:text-[22vw]"
        >
          {chapter.numeral}
        </span>

        <div className="container relative flex h-full flex-col justify-end pb-14 md:pb-20">
          <Reveal>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgb(var(--accent)/0.4)] bg-background/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(var(--accent))] backdrop-blur">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-[rgb(var(--accent))] text-[10px] text-white">
                {chapter.numeral}
              </span>
              {bi("Chapter", "ಅಧ್ಯಾಯ")} {index + 1} · {chapter.years}
            </div>
            <h2 className="max-w-4xl text-balance text-4xl font-black tracking-tight xs:text-5xl md:text-7xl">
              {bi(chapter.name, chapter.nameKn)}
            </h2>
            <p className="mt-5 max-w-2xl text-pretty text-base text-foreground/80 sm:text-lg md:text-xl">
              {bi(chapter.essence, chapter.essenceKn)}
            </p>
          </Reveal>
        </div>
      </div>

      {/* ----------------------------- BODY ------------------------------ */}
      <div className="container space-y-20 pb-24 pt-14 md:pt-20">
        {/* Narration + at-a-glance + map */}
        <div className="grid gap-10 lg:grid-cols-[1.55fr_1fr] lg:items-start">
          <Reveal className="space-y-6">
            <p className="text-pretty text-lg leading-relaxed text-foreground/90 md:text-xl md:leading-relaxed">
              <span className="float-left mr-3 mt-1 font-serif text-6xl font-bold leading-[0.7] text-[rgb(var(--accent))]">
                {bi(chapter.lead, chapter.leadKn).charAt(0)}
              </span>
              {bi(chapter.lead, chapter.leadKn).slice(1)}
            </p>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
              {chapter.atGlance.map((g) => (
                <div
                  key={g.label}
                  className="rounded-2xl border border-[rgb(var(--accent)/0.2)] bg-[rgb(var(--accent)/0.05)] p-4"
                >
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--accent))]">
                    {bi(g.label, g.labelKn)}
                  </div>
                  <div className="mt-1 font-semibold leading-snug">
                    {bi(g.value, g.valueKn)}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {chapter.capital && (
            <Reveal delay={120}>
              <div className="overflow-hidden rounded-3xl border border-[rgb(var(--accent)/0.2)] bg-gradient-to-b from-[rgb(var(--accent)/0.08)] to-transparent p-2">
                <div className="px-4 pb-1 pt-3 text-xs font-semibold uppercase tracking-wider text-[rgb(var(--accent))]">
                  {bi("Seat of power", "ಅಧಿಕಾರ ಕೇಂದ್ರ")}
                </div>
                <JourneyMap
                  coords={chapter.capital.coords}
                  label={bi(chapter.capital.name, chapter.capital.nameKn)}
                />
              </div>
            </Reveal>
          )}
        </div>

        {/* Facets — the era in depth */}
        <div>
          <SectionLabel
            kicker={bi("In depth", "ಆಳವಾಗಿ")}
            title={bi("The era in detail", "ಯುಗದ ವಿವರ")}
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {chapter.facets.map((facet, i) => {
              const Icon = FACET_ICON[facet.kind];
              return (
                <Reveal key={facet.title} delay={(i % 2) * 90}>
                  <article className="group flex h-full gap-4 overflow-hidden rounded-2xl border border-border bg-card/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[rgb(var(--accent)/0.4)] hover:shadow-[0_24px_60px_-24px_rgb(var(--accent)/0.6)]">
                    {facet.wiki && (
                      <JourneyFigure
                        wiki={facet.wiki}
                        alt={facet.title}
                        rounded="xl"
                        className="hidden h-28 w-28 shrink-0 sm:block"
                      />
                    )}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--accent))]">
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[rgb(var(--accent)/0.12)]">
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        {bi(facet.kicker.split(" · ")[0], facet.kickerKn)}
                      </div>
                      <h4 className="mt-2 font-semibold tracking-tight">
                        {facet.title}
                      </h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {facet.body}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Gallery mosaic */}
        <div>
          <SectionLabel
            kicker={bi("Gallery", "ಚಿತ್ರಶಾಲೆ")}
            title={bi("Monuments, art & artifacts", "ಸ್ಮಾರಕ, ಕಲೆ & ಕಲಾಕೃತಿ")}
          />
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {chapter.gallery.map((item, i) => (
              <Reveal
                key={item.wiki + i}
                delay={(i % 4) * 80}
                className={cn(
                  "group/g",
                  i === 0 && "col-span-2 row-span-2 md:col-span-2 md:row-span-2",
                )}
              >
                <JourneyFigure
                  wiki={item.wiki}
                  alt={item.caption}
                  rounded="2xl"
                  className={cn(
                    "h-full min-h-[9rem] w-full",
                    i === 0 ? "aspect-square md:aspect-auto" : "aspect-[4/3]",
                  )}
                >
                  <div className="absolute inset-x-0 bottom-0 translate-y-1 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-3 opacity-0 transition-all duration-300 group-hover/g:translate-y-0 group-hover/g:opacity-100">
                    <span className="inline-block rounded-full bg-[rgb(var(--accent))] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                      {bi(item.tag, item.tagKn)}
                    </span>
                    <p className="mt-1.5 text-sm font-medium text-white">
                      {bi(item.caption, item.captionKn ?? item.caption)}
                    </p>
                  </div>
                </JourneyFigure>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Relations — a world of powers */}
        <div>
          <SectionLabel
            kicker={bi("Geopolitics", "ಭೌಗೋಳಿಕ ರಾಜಕೀಯ")}
            title={bi("A world of powers", "ಶಕ್ತಿಗಳ ಜಗತ್ತು")}
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {chapter.relations.map((rel, i) => {
              const meta = RELATION_META[rel.kind];
              const RIcon = meta.icon;
              return (
                <Reveal key={rel.with} delay={(i % 3) * 80}>
                  <div className="relative h-full overflow-hidden rounded-2xl border border-border bg-card/60 p-5">
                    <div className="flex items-center gap-2.5">
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-[rgb(var(--accent)/0.12)] text-[rgb(var(--accent))]">
                        <RIcon className="h-4 w-4" />
                      </span>
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-[rgb(var(--accent))]">
                          {bi(meta.label, meta.labelKn)}
                        </div>
                        <div className="font-semibold leading-tight">
                          {bi(rel.with, rel.withKn)}
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {rel.note}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Figures — the people */}
        <div>
          <SectionLabel
            kicker={bi("Legacy", "ಪರಂಪರೆ")}
            title={bi("Who shaped this age", "ಈ ಯುಗವನ್ನು ರೂಪಿಸಿದವರು")}
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {chapter.figures.map((fig, i) => (
              <Reveal key={fig.name} delay={(i % 2) * 100}>
                <article className="group flex h-full gap-5 overflow-hidden rounded-3xl border border-border bg-card/70 p-5 transition-all duration-300 hover:border-[rgb(var(--accent)/0.4)] hover:shadow-[0_24px_60px_-24px_rgb(var(--accent)/0.6)]">
                  <JourneyFigure
                    wiki={fig.wiki}
                    alt={fig.name}
                    rounded="2xl"
                    position="top"
                    className="h-28 w-24 shrink-0 ring-2 ring-[rgb(var(--accent)/0.25)] sm:h-32 sm:w-28"
                  />
                  <div className="min-w-0">
                    <h4 className="text-lg font-bold tracking-tight">
                      {bi(fig.name, fig.nameKn)}
                    </h4>
                    <div className="text-xs font-semibold uppercase tracking-wider text-[rgb(var(--accent))]">
                      {bi(fig.role, fig.roleKn)}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {fig.blurb}
                    </p>
                    <p className="mt-2.5 flex items-start gap-1.5 text-xs italic text-foreground/70">
                      <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[rgb(var(--accent))]" />
                      {fig.fact}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* chapter divider */}
      <div className="container">
        <div className="flex items-center justify-center gap-3 pb-6">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-[rgb(var(--accent)/0.5)]" />
          <Quote className="h-4 w-4 text-[rgb(var(--accent))]" />
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-[rgb(var(--accent)/0.5)]" />
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ kicker, title }: { kicker: string; title: string }) {
  return (
    <Reveal>
      <div className="text-xs font-semibold uppercase tracking-[0.25em] text-[rgb(var(--accent))]">
        {kicker}
      </div>
      <h3 className="mt-1.5 text-2xl font-bold tracking-tight md:text-3xl">
        {title}
      </h3>
    </Reveal>
  );
}
