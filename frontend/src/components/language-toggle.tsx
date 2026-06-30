"use client";

import { Languages } from "lucide-react";

import { cn } from "@/lib/utils";
import { LOCALES } from "@/i18n/translations";
import { useTranslation } from "@/i18n/language-provider";

/**
 * EN / ಕನ್ನಡ / Both segmented control.
 *
 * The "Both" segment is the differentiator: it renders the whole interface
 * bilingually (English · ಕನ್ನಡ side by side) instead of swapping one language
 * out for the other — a deliberate heritage-preservation choice, not a
 * machine-translation toggle.
 */
export function LanguageToggle() {
  const { locale, setLocale } = useTranslation();

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-border bg-secondary/50 p-0.5">
      <Languages
        className="ml-1.5 mr-0.5 hidden h-3.5 w-3.5 text-muted-foreground sm:block"
        aria-hidden
      />
      {LOCALES.map((l) => (
        <button
          key={l.code}
          onClick={() => setLocale(l.code)}
          aria-pressed={locale === l.code}
          title={l.label}
          className={cn(
            "rounded-full px-2 py-1 text-xs font-semibold transition-colors sm:px-2.5",
            locale === l.code
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {l.short}
        </button>
      ))}
    </div>
  );
}
