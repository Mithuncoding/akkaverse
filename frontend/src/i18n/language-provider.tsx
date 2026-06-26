"use client";

import * as React from "react";

import { translations, type Locale } from "@/i18n/translations";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  /** Translate a flat dot-namespaced key with English fallback. */
  t: (key: string) => string;
  /**
   * Render a raw English/Kannada pair according to the active locale.
   * In "both" mode it shows them together — this is what makes Akkaverse a
   * genuinely bilingual interface rather than a translate-on-toggle page.
   */
  bi: (en: string, kn: string) => string;
  /** Best speech-synthesis language tag for the current locale. */
  speechLang: () => "en-IN" | "kn-IN";
};

const LanguageContext = React.createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "akkaverse.locale";

/** Separator used to weave English and Kannada together in "both" mode. */
const BI = "  ·  ";

function joinBilingual(en: string, kn: string): string {
  if (!kn || kn === en) return en;
  return `${en}${BI}${kn}`;
}

/**
 * LanguageProvider keeps the active locale in React state, persists it to
 * localStorage, and exposes a memoised `t()` translator. Mirrors how
 * `next-themes` handles light/dark — same mental model for the user.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>("both");

  // Hydrate the saved preference on mount (client-only, avoids SSR mismatch).
  React.useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved === "en" || saved === "kn" || saved === "both") {
      setLocaleState(saved);
      document.documentElement.lang = saved === "kn" ? "kn" : "en";
    }
  }, []);

  const setLocale = React.useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next === "kn" ? "kn" : "en";
  }, []);

  const toggleLocale = React.useCallback(() => {
    // Cycle EN -> ಕನ್ನಡ -> Both -> EN.
    setLocale(locale === "en" ? "kn" : locale === "kn" ? "both" : "en");
  }, [locale, setLocale]);

  const t = React.useCallback(
    (key: string): string => {
      if (locale === "both") {
        const en = translations.en[key] ?? key;
        const kn = translations.kn[key] ?? en;
        return joinBilingual(en, kn);
      }
      return translations[locale][key] ?? translations.en[key] ?? key;
    },
    [locale],
  );

  const bi = React.useCallback(
    (en: string, kn: string): string => {
      if (locale === "kn") return kn || en;
      if (locale === "both") return joinBilingual(en, kn);
      return en;
    },
    [locale],
  );

  const speechLang = React.useCallback(
    (): "en-IN" | "kn-IN" => (locale === "en" ? "en-IN" : "kn-IN"),
    [locale],
  );

  const value = React.useMemo(
    () => ({ locale, setLocale, toggleLocale, t, bi, speechLang }),
    [locale, setLocale, toggleLocale, t, bi, speechLang],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

/** Access the translator + current locale anywhere in a client component. */
export function useTranslation(): LanguageContextValue {
  const ctx = React.useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return ctx;
}
