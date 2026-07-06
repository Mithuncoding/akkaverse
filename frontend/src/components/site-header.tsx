"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { primaryNav, moreNav } from "@/config/site";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { translations } from "@/i18n/translations";
import { useTranslation } from "@/i18n/language-provider";

/** Bilingual nav label, stacked in "both" mode to stay compact. */
function NavText({ labelKey }: { labelKey: string }) {
  const { t, locale } = useTranslation();
  if (locale === "both") {
    return (
      <span className="flex flex-col items-center leading-tight">
        <span>{translations.en[labelKey]}</span>
        <span className="text-[10px] text-muted-foreground">
          {translations.kn[labelKey]}
        </span>
      </span>
    );
  }
  return <>{t(labelKey)}</>;
}

/**
 * Sticky, translucent top navigation (Apple/Linear-style).
 * Client component so it can react to the active language and render
 * bilingual nav labels. Desktop shows a focused primary nav + a "More" menu.
 */
export function SiteHeader() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = React.useState(false);
  const moreRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => setMoreOpen(false), [pathname]);

  React.useEffect(() => {
    if (!moreOpen) return;
    const onDown = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [moreOpen]);

  const moreActive = moreNav.some((m) => pathname.startsWith(m.href));

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      {/* hairline saffron accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="container flex h-14 items-center justify-between md:h-16">
        <Link href="/" className="group flex items-center gap-2">
          <span className="text-xl transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
            🪔
          </span>
          <span className="text-base font-semibold tracking-tight sm:text-lg">
            Akka<span className="gradient-text">verse</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          {primaryNav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Button
                key={item.href}
                variant="ghost"
                size="sm"
                asChild
                className={cn("relative", active && "text-primary")}
              >
                <Link href={item.href}>
                  <NavText labelKey={item.labelKey} />
                  {active && (
                    <span className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-primary" />
                  )}
                </Link>
              </Button>
            );
          })}

          {/* More menu */}
          <div className="relative" ref={moreRef}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMoreOpen((o) => !o)}
              aria-haspopup="menu"
              aria-expanded={moreOpen}
              className={cn("relative gap-1", moreActive && "text-primary")}
            >
              {t("nav.more")}
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform",
                  moreOpen && "rotate-180",
                )}
              />
            </Button>
            {moreOpen && (
              <div
                role="menu"
                className="glass animate-fade-up absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-xl border border-border/60 p-1.5 shadow-glow"
              >
                {moreNav.map((item) => {
                  const active = pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      className={cn(
                        "flex items-center rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent",
                        active && "text-primary",
                      )}
                    >
                      <NavText labelKey={item.labelKey} />
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <LanguageToggle />
          <ModeToggle />
          <Button size="sm" className="hidden shadow-glow lg:inline-flex" asChild>
            <Link href="/chat">{t("common.getStarted")}</Link>
          </Button>
          {/* Mobile hamburger — opens the full navigation sheet */}
          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("akkaverse:toggle-nav"))
            }
            aria-label={translations.en["nav.menu"]}
            aria-haspopup="dialog"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/70 bg-background/60 text-foreground transition-all hover:border-primary/40 hover:text-primary active:scale-90 md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
