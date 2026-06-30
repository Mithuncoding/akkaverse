"use client";

import * as React from "react";
import { CalendarDays, Crown, MessageSquareQuote, Landmark, Languages, Sun } from "lucide-react";

import { getDailyHeritage, type DailyItem } from "@/data/daily";
import { Reveal } from "@/components/ui/reveal";
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
  const [today, setToday] = React.useState("");
  React.useEffect(() => {
    setData(getDailyHeritage());
    setToday(
      new Date().toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
      }),
    );
  }, []);

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
    <div>
      <Reveal className="mb-5 flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-amber-500/10 text-primary">
          <Sun className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-primary">
            {bi("Today in Karnataka", "ಇಂದು ಕರ್ನಾಟಕದಲ್ಲಿ")}
          </h2>
          <p className="text-xs text-muted-foreground">{today}</p>
        </div>
      </Reveal>

      <div className="edge-carousel scroll-touch no-scrollbar -mx-[1.15rem] flex gap-3 overflow-x-auto px-[1.15rem] pb-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-5">
        {cards.map(({ icon: Icon, label, item }, i) => (
          <Reveal key={label} delay={i * 70} className="w-[72%] shrink-0 snap-start xs:w-[56%] sm:w-auto sm:shrink">
            <div className="group relative h-full overflow-hidden rounded-xl border border-border bg-card/70 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow">
              {/* top accent that lights up on hover */}
              <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-primary to-amber-500 transition-transform duration-300 group-hover:scale-x-100" />
              <div className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <Icon className="h-3.5 w-3.5 text-primary transition-transform duration-300 group-hover:scale-110" />
                {label}
              </div>
              <p className="text-sm font-semibold leading-snug">{pick(item)}</p>
              {pickMeta(item) && (
                <p className="mt-1 text-xs italic text-muted-foreground">
                  {pickMeta(item)}
                </p>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
