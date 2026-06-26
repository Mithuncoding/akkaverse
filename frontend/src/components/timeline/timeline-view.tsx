"use client";

import { HeritageTimeline } from "@/components/timeline/heritage-timeline";
import { useTranslation } from "@/i18n/language-provider";

/** Bilingual wrapper for the Heritage Timeline page. */
export function TimelineView() {
  const { t } = useTranslation();

  return (
    <div className="container py-16 md:py-24">
      <header className="mx-auto mb-14 max-w-2xl text-center">
        <span className="rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-sm text-muted-foreground">
          🏛️ {t("timeline.badge")}
        </span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
          {t("timeline.title")}
        </h1>
        <p className="mt-4 text-pretty text-lg text-muted-foreground">
          {t("timeline.subtitle")}
        </p>
      </header>

      <HeritageTimeline />
    </div>
  );
}
