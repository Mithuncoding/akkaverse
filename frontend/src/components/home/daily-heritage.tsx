"use client";

import * as React from "react";
import { CalendarDays, Crown, MessageSquareQuote, Landmark, Languages } from "lucide-react";

import { getDailyHeritage, type DailyItem } from "@/data/daily";
import { useTranslation } from "@/i18n/language-provider";

/**
 * DailyHeritage — a five-card "today in Karnataka" strip.
 * Reads the active locale to show each item in English or Kannada, and the
 * selection is deterministic per day (see getDailyHeritage).
 */
export function DailyHeritage() {
  const { bi } = useTranslation();
  // Compute once on mount to avoid SSR/client date drift.
  const [data, setData] = React.useState(() => getDailyHeritage());
  React.useEffect(() => setData(getDailyHeritage()), []);

  const pick = (item: DailyItem) => bi(item.en, item.kn);
  const pickMeta = (item: DailyItem) =>
    item.metaEn ? bi(item.metaEn, item.metaKn ?? item.metaEn) : "";

  const cards = [
    { icon: CalendarDays, label: bi("On this theme", "ಈ ದಿನ"), item: data.event },
    { icon: Crown, label: bi("Famous person", "ವ್ಯಕ್ತಿ"), item: data.person },
    { icon: MessageSquareQuote, label: bi("Proverb", "ಗಾದೆ"), item: data.proverb },
    { icon: Landmark, label: bi("Temple", "ದೇವಾಲಯ"), item: data.temple },
    { icon: Languages, label: bi("Word of the day", "ಪದ"), item: data.word },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {cards.map(({ icon: Icon, label, item }) => (
        <div
          key={label}
          className="rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
        >
          <div className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <Icon className="h-3.5 w-3.5 text-primary" />
            {label}
          </div>
          <p className="text-sm font-semibold leading-snug">{pick(item)}</p>
          {pickMeta(item) && (
            <p className="mt-1 text-xs italic text-muted-foreground">
              {pickMeta(item)}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
