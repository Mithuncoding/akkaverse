"use client";

import * as React from "react";

export type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  systemTheme: ResolvedTheme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
};

const STORAGE_KEY = "theme";
const SYSTEM_QUERY = "(prefers-color-scheme: dark)";
const ThemeContext = React.createContext<ThemeContextValue | null>(null);

function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark" || value === "system";
}

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia(SYSTEM_QUERY).matches ? "dark" : "light";
}

function getStoredTheme(fallback: Theme): Theme {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isTheme(stored) ? stored : fallback;
  } catch {
    return fallback;
  }
}

function applyTheme(theme: ResolvedTheme, disableTransitions: boolean) {
  const root = document.documentElement;
  let transitionBlocker: HTMLStyleElement | null = null;

  if (disableTransitions) {
    transitionBlocker = document.createElement("style");
    transitionBlocker.textContent =
      "*,*::before,*::after{transition:none!important}";
    document.head.appendChild(transitionBlocker);
  }

  root.classList.remove("light", "dark");
  root.classList.add(theme);
  root.style.colorScheme = theme;

  if (transitionBlocker) {
    void window.getComputedStyle(document.body).opacity;
    window.setTimeout(() => transitionBlocker?.remove(), 1);
  }
}

/**
 * Script-free theme state. The root layout owns the pre-hydration bootstrap;
 * this provider handles live changes, system preferences, and tab sync.
 */
export function ThemeProvider({
  children,
  defaultTheme = "dark",
  enableSystem = true,
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const fallbackTheme =
    !enableSystem && defaultTheme === "system" ? "light" : defaultTheme;
  const [theme, setTheme] = React.useState<Theme>(() =>
    getStoredTheme(fallbackTheme),
  );
  const [systemTheme, setSystemTheme] = React.useState<ResolvedTheme>(() =>
    getSystemTheme(),
  );
  const resolvedTheme =
    theme === "system" && enableSystem ? systemTheme : theme === "light" ? "light" : "dark";

  React.useEffect(() => {
    applyTheme(resolvedTheme, disableTransitionOnChange);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Theme changes still work when storage is unavailable.
    }
  }, [disableTransitionOnChange, resolvedTheme, theme]);

  React.useEffect(() => {
    if (!enableSystem) return;
    const media = window.matchMedia(SYSTEM_QUERY);
    const updateSystemTheme = () =>
      setSystemTheme(media.matches ? "dark" : "light");
    updateSystemTheme();
    media.addEventListener("change", updateSystemTheme);
    return () => media.removeEventListener("change", updateSystemTheme);
  }, [enableSystem]);

  React.useEffect(() => {
    const syncTheme = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY && isTheme(event.newValue)) {
        setTheme(event.newValue);
      }
    };
    window.addEventListener("storage", syncTheme);
    return () => window.removeEventListener("storage", syncTheme);
  }, []);

  const value = React.useMemo(
    () => ({ theme, resolvedTheme, systemTheme, setTheme }),
    [resolvedTheme, systemTheme, theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
