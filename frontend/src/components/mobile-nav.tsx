"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Sparkles,
  GraduationCap,
  Map as MapIcon,
  Menu,
  X,
  BookOpen,
  Milestone,
  Brain,
  PartyPopper,
  Heart,
  ScanText,
  Landmark,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { translations } from "@/i18n/translations";
import { useTranslation } from "@/i18n/language-provider";

/**
 * Mobile-first navigation.
 *
 * Desktop keeps the inline header nav. On phones/tablets we deliver a true
 * native-app feel: a thumb-reachable bottom tab bar for the primary
 * destinations plus a "More" button that opens a full bottom sheet with every
 * destination, the language toggle, theme switch and the primary CTA.
 *
 * Rendered once in the root layout; it self-hides on `md+` via `md:hidden`.
 */

type Dest = { href: string; labelKey: string; icon: LucideIcon };

const PRIMARY: Dest[] = [
  { href: "/", labelKey: "nav.home", icon: Home },
  { href: "/learn", labelKey: "nav.learn", icon: GraduationCap },
  { href: "/chat", labelKey: "nav.assistant", icon: Sparkles },
  { href: "/explore", labelKey: "nav.explore", icon: MapIcon },
];

const ALL: Dest[] = [
  { href: "/", labelKey: "nav.home", icon: Home },
  { href: "/chat", labelKey: "nav.assistant", icon: Sparkles },
  { href: "/learn", labelKey: "nav.learn", icon: GraduationCap },
  { href: "/explore", labelKey: "nav.explore", icon: MapIcon },
  { href: "/festivals", labelKey: "nav.festivals", icon: PartyPopper },
  { href: "/stories", labelKey: "nav.stories", icon: BookOpen },
  { href: "/timeline", labelKey: "nav.timeline", icon: Milestone },
  { href: "/quiz", labelKey: "nav.quiz", icon: Brain },
  { href: "/tools", labelKey: "nav.tools", icon: ScanText },
  { href: "/memories", labelKey: "nav.memories", icon: Heart },
  { href: "/about", labelKey: "nav.about", icon: Landmark },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

/** Bilingual label that adapts to the active locale. */
function NavLabel({ labelKey }: { labelKey: string }) {
  const { locale, t } = useTranslation();
  if (locale === "both") {
    return (
      <span className="flex flex-col items-center leading-none">
        <span>{translations.en[labelKey]}</span>
        <span className="text-[9px] font-normal text-muted-foreground">
          {translations.kn[labelKey]}
        </span>
      </span>
    );
  }
  return <>{t(labelKey)}</>;
}

export function MobileNav() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);

  // Lock body scroll + close on Escape while the sheet is open.
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Close the sheet whenever the route changes.
  React.useEffect(() => setOpen(false), [pathname]);

  // Let the header hamburger toggle the sheet.
  React.useEffect(() => {
    const toggle = () => setOpen((v) => !v);
    window.addEventListener("akkaverse:toggle-nav", toggle);
    return () => window.removeEventListener("akkaverse:toggle-nav", toggle);
  }, []);

  return (
    <>
      {/* ------------------------- Bottom tab bar ------------------------- */}
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-40 md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="mx-auto flex max-w-md items-stretch justify-around border-t border-border/60 bg-background/85 px-1 backdrop-blur-xl">
          {PRIMARY.map((d) => {
            const active = isActive(pathname, d.href);
            const Icon = d.icon;
            const center = d.href === "/chat";
            return (
              <Link
                key={d.href}
                href={d.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <span
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300",
                    center &&
                      "bg-gradient-to-br from-primary to-amber-500 text-primary-foreground shadow-glow",
                    !center && active && "bg-primary/10",
                    !center &&
                      "group-active:scale-90",
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <NavLabel labelKey={d.labelKey} />
              </Link>
            );
          })}

          {/* More → opens the full sheet */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={open}
            className={cn(
              "group flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors",
              open ? "text-primary" : "text-muted-foreground",
            )}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 group-active:scale-90">
              <Menu className="h-5 w-5" />
            </span>
            {t("nav.more")}
          </button>
        </div>
      </nav>

      {/* --------------------------- Full sheet --------------------------- */}
      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden
      />

      {/* Sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t("nav.menu")}
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 max-h-[88vh] overflow-y-auto rounded-t-3xl border-t border-border bg-card shadow-2xl transition-transform duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] md:hidden",
          open ? "translate-y-0" : "translate-y-full",
        )}
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 1rem)" }}
      >
        {/* Drag handle */}
        <div className="sticky top-0 z-10 flex flex-col items-center bg-card/95 pb-2 pt-3 backdrop-blur">
          <span className="h-1.5 w-12 rounded-full bg-border" />
          <div className="mt-2 flex w-full items-center justify-between px-5">
            <span className="text-sm font-semibold tracking-tight">
              Akka<span className="gradient-text">verse</span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t("common.close")}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground active:scale-90"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Destinations grid */}
        <div className="grid grid-cols-2 gap-2.5 px-5 pt-3 xs:grid-cols-3">
          {ALL.map((d) => {
            const active = isActive(pathname, d.href);
            const Icon = d.icon;
            return (
              <Link
                key={d.href}
                href={d.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-all active:scale-95",
                  active
                    ? "border-primary/50 bg-primary/10"
                    : "border-border bg-background/60 hover:border-primary/30",
                )}
              >
                <span
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-xl",
                    active
                      ? "bg-gradient-to-br from-primary to-amber-500 text-primary-foreground"
                      : "bg-secondary text-primary",
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-xs font-medium leading-tight">
                  <NavLabel labelKey={d.labelKey} />
                </span>
              </Link>
            );
          })}
        </div>

        {/* Controls */}
        <div className="mt-5 flex items-center justify-between gap-3 px-5">
          <LanguageToggle />
          <ModeToggle />
        </div>

        <div className="mt-4 px-5">
          <Button size="lg" className="w-full shadow-glow" asChild>
            <Link href="/chat" onClick={() => setOpen(false)}>
              {t("common.getStarted")} <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
