"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { translations } from "@/i18n/translations";
import { useTranslation } from "@/i18n/language-provider";

/**
 * Sticky, translucent top navigation (Apple/Linear-style).
 * Client component so it can react to the active language and render
 * bilingual nav labels via `t()`.
 */
export function SiteHeader() {
  const { t, locale } = useTranslation();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-xl">
      {/* hairline saffron accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center gap-2">
          <span className="text-xl transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
            🪔
          </span>
          <span className="text-lg font-semibold tracking-tight">
            Akka<span className="gradient-text">verse</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          {siteConfig.nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Button
                key={item.href}
                variant="ghost"
                size="sm"
                asChild
                className={cn(
                  "relative",
                  active && "text-primary",
                )}
              >
                <Link href={item.href}>
                  {locale === "both" ? (
                    // Stack the two scripts so the nav stays compact.
                    <span className="flex flex-col items-center leading-tight">
                      <span>{translations.en[item.labelKey]}</span>
                      <span className="text-[10px] text-muted-foreground">
                        {translations.kn[item.labelKey]}
                      </span>
                    </span>
                  ) : (
                    t(item.labelKey)
                  )}
                  {active && (
                    <span className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-primary" />
                  )}
                </Link>
              </Button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ModeToggle />
          <Button size="sm" className="hidden shadow-glow sm:inline-flex" asChild>
            <Link href="/chat">{t("common.getStarted")}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
