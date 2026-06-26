"use client";

import * as React from "react";
import { MapPin, User } from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/language-provider";
import {
  ERAS,
  ERA_META,
  timelineEvents,
  type Era,
  type TimelineEvent,
} from "@/data/timeline";

/**
 * HeritageTimeline — interactive, filterable vertical timeline.
 *
 * Client component because it owns UI state (the active era filter) and uses
 * an IntersectionObserver to reveal cards as they scroll into view.
 * Data is imported from a typed source so this component stays purely
 * presentational and easy to test.
 */
export function HeritageTimeline() {
  const { t } = useTranslation();
  const [activeEra, setActiveEra] = React.useState<Era | "All">("All");

  const events = React.useMemo(() => {
    const list =
      activeEra === "All"
        ? timelineEvents
        : timelineEvents.filter((e) => e.era === activeEra);
    return [...list].sort((a, b) => a.sortYear - b.sortYear);
  }, [activeEra]);

  return (
    <div>
      {/* ---- Era filter chips ---- */}
      <div className="mb-12 flex flex-wrap justify-center gap-2">
        <FilterChip
          label={t("timeline.allEras")}
          active={activeEra === "All"}
          onClick={() => setActiveEra("All")}
        />
        {ERAS.map((era) => (
          <FilterChip
            key={era}
            label={t(`era.${era}`)}
            active={activeEra === era}
            dotClass={ERA_META[era].dot}
            onClick={() => setActiveEra(era)}
          />
        ))}
      </div>

      {/* ---- Timeline track ---- */}
      <div className="relative mx-auto max-w-4xl">
        {/* Center spine (left on mobile, centered on desktop) */}
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary/60 via-border to-transparent md:left-1/2 md:-translate-x-1/2" />

        <ul className="space-y-10">
          {events.map((event, index) => (
            <TimelineRow key={event.id} event={event} index={index} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function FilterChip({
  label,
  active,
  dotClass,
  onClick,
}: {
  label: string;
  active: boolean;
  dotClass?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
        active
          ? "border-primary bg-primary text-primary-foreground shadow-sm"
          : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground",
      )}
    >
      {dotClass && (
        <span className={cn("h-2 w-2 rounded-full", dotClass)} aria-hidden />
      )}
      {label}
    </button>
  );
}

function TimelineRow({ event, index }: { event: TimelineEvent; index: number }) {
  const { t, locale } = useTranslation();
  const ref = React.useRef<HTMLLIElement>(null);
  const [visible, setVisible] = React.useState(false);
  // Alternate sides on desktop for a classic timeline rhythm.
  const isLeft = index % 2 === 0;

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const meta = ERA_META[event.era];
  const title = locale === "kn" && event.titleKn ? event.titleKn : event.title;
  const description =
    locale === "kn" && event.descriptionKn
      ? event.descriptionKn
      : event.description;

  return (
    <li
      ref={ref}
      className={cn(
        "relative pl-12 transition-all duration-700 ease-out md:pl-0",
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        "md:flex md:items-center md:gap-8",
        isLeft ? "md:flex-row" : "md:flex-row-reverse",
      )}
    >
      {/* Node dot on the spine */}
      <span
        className={cn(
          "absolute left-4 top-2 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full ring-4 ring-background md:left-1/2",
          meta.dot,
        )}
        aria-hidden
      />

      {/* Card */}
      <div className="md:w-1/2">
        <article
          className={cn(
            "group rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md",
            isLeft ? "md:text-right" : "md:text-left",
          )}
        >
          <div
            className={cn(
              "mb-2 flex items-center gap-2",
              isLeft ? "md:justify-end" : "md:justify-start",
            )}
          >
            <span
              className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                meta.chip,
              )}
            >
              {t(`era.${event.era}`)}
            </span>
            <span className="font-mono text-sm font-semibold text-primary">
              {event.year}
            </span>
          </div>

          <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {description}
          </p>

          {(event.place || event.figure) && (
            <div
              className={cn(
                "mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground",
                isLeft ? "md:justify-end" : "md:justify-start",
              )}
            >
              {event.figure && (
                <span className="inline-flex items-center gap-1">
                  <User className="h-3.5 w-3.5" /> {event.figure}
                </span>
              )}
              {event.place && (
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> {event.place}
                </span>
              )}
            </div>
          )}
        </article>
      </div>

      {/* Spacer for the empty half on desktop */}
      <div className="hidden md:block md:w-1/2" aria-hidden />
    </li>
  );
}
