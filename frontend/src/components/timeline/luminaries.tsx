"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/language-provider";
import { Reveal } from "@/components/ui/reveal";
import { JourneyFigure } from "@/components/timeline/journey-figure";
import {
  LUMINARY_CATEGORIES,
  luminaries,
  type LuminaryCategory,
} from "@/data/journey";

type Filter = "All" | LuminaryCategory;

/**
 * Luminaries — a filterable "Hall of Fame" of the people who made Karnataka.
 * Portraits stream in from Wikipedia with graceful fallbacks, and a category
 * rail lets visitors move between rulers, saints, poets, scientists and icons.
 */
export function Luminaries() {
  const { bi } = useTranslation();
  const [filter, setFilter] = React.useState<Filter>("All");

  const shown = React.useMemo(
    () =>
      filter === "All"
        ? luminaries
        : luminaries.filter((l) => l.category === filter),
    [filter],
  );

  return (
    <section
      id="luminaries"
      style={
        {
          "--accent": "245 158 11",
          "--accent2": "234 88 12",
        } as React.CSSProperties
      }
      className="border-t border-border bg-gradient-to-b from-[rgb(var(--accent)/0.04)] to-transparent py-20 md:py-28"
    >
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[rgb(var(--accent))]">
            {bi("Hall of Fame", "ಕೀರ್ತಿ ಮಂದಿರ")}
          </div>
          <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
            {bi("The faces of a civilization", "ನಾಗರಿಕತೆಯ ಮುಖಗಳು")}
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            {bi(
              "Across twenty-five centuries, these lives turned a land into a legend — kings and rebels, mystics and poets, scientists and champions.",
              "ಇಪ್ಪತ್ತೈದು ಶತಮಾನಗಳಲ್ಲಿ ಈ ಜೀವಗಳು ಒಂದು ನಾಡನ್ನು ದಂತಕಥೆಯಾಗಿಸಿದವು — ಅರಸರು, ಬಂಡಾಯಗಾರರು, ಶರಣರು, ಕವಿಗಳು, ವಿಜ್ಞಾನಿಗಳು ಮತ್ತು ಚಾಂಪಿಯನ್‌ಗಳು.",
            )}
          </p>
        </Reveal>

        {/* Filter rail */}
        <Reveal delay={80}>
          <div className="scroll-touch no-scrollbar -mx-[1.15rem] mt-8 flex gap-2 overflow-x-auto px-[1.15rem] pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0">
            <FilterChip
              active={filter === "All"}
              onClick={() => setFilter("All")}
            >
              {bi("All", "ಎಲ್ಲಾ")}
            </FilterChip>
            {LUMINARY_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <FilterChip
                  key={cat.id}
                  active={filter === cat.id}
                  onClick={() => setFilter(cat.id)}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {bi(cat.label, cat.labelKn)}
                </FilterChip>
              );
            })}
          </div>
        </Reveal>

        {/* Portrait grid */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {shown.map((lum, i) => (
            <Reveal key={lum.name} delay={(i % 4) * 70}>
              <article className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card/70 transition-all duration-300 hover:-translate-y-1.5 hover:border-[rgb(var(--accent)/0.4)] hover:shadow-[0_30px_70px_-30px_rgb(var(--accent)/0.7)]">
                <JourneyFigure
                  wiki={lum.wiki}
                  alt={lum.name}
                  rounded="none"
                  position="top"
                  className="aspect-[4/5] w-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full bg-[rgb(var(--accent))] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                    {lum.era}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h3 className="text-lg font-bold leading-tight text-white">
                      {bi(lum.name, lum.nameKn)}
                    </h3>
                    <p className="mt-1 text-xs text-white/80">{lum.blurb}</p>
                    <p className="mt-2 max-h-0 overflow-hidden text-xs font-medium text-[rgb(var(--accent))] opacity-0 transition-all duration-300 group-hover:max-h-24 group-hover:opacity-100">
                      ★ {lum.achievement}
                    </p>
                  </div>
                </JourneyFigure>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 py-2 text-sm font-medium transition-all duration-200 active:scale-95 sm:py-1.5",
        active
          ? "border-transparent bg-[rgb(var(--accent))] text-white shadow-[0_8px_24px_-8px_rgb(var(--accent))]"
          : "border-border bg-card/60 text-muted-foreground hover:border-[rgb(var(--accent)/0.4)] hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
