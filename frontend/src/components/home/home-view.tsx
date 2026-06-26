"use client";

import Link from "next/link";
import {
  Sparkles,
  GraduationCap,
  BookOpen,
  Map,
  Milestone,
  ScanText,
  Brain,
  PartyPopper,
  ArrowRight,
  Landmark,
  Heart,
  type LucideIcon,
} from "lucide-react";

import { features } from "@/config/site";
import { Button } from "@/components/ui/button";
import { DailyHeritage } from "@/components/home/daily-heritage";
import { useTranslation } from "@/i18n/language-provider";

/** Map icon names (from config strings) to lucide components in the UI layer. */
const ICONS: Record<string, LucideIcon> = {
  Sparkles,
  GraduationCap,
  BookOpen,
  Map,
  Milestone,
  ScanText,
  Brain,
  PartyPopper,
};

/**
 * HomeView — the bilingual landing experience.
 * Client component so all copy reacts instantly to the EN ⇄ ಕನ್ನಡ toggle.
 */
export function HomeView() {
  const { t, bi } = useTranslation();

  const stats: { icon: LucideIcon; value: string; en: string; kn: string }[] = [
    { icon: Landmark, value: "30", en: "Districts mapped", kn: "ಜಿಲ್ಲೆಗಳು" },
    { icon: PartyPopper, value: "12", en: "Festivals", kn: "ಹಬ್ಬಗಳು" },
    { icon: BookOpen, value: "8", en: "Living stories", kn: "ಕಥೆಗಳು" },
    { icon: Milestone, value: "2,000", en: "Years of history", kn: "ವರ್ಷಗಳ ಇತಿಹಾಸ" },
  ];

  return (
    <>
      {/* ----------------------------- HERO ----------------------------- */}
      <section className="relative overflow-hidden">
        {/* Aurora backdrop */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="heritage-glow absolute inset-0 animate-glow-pulse" />
          <div className="aurora-blob left-[8%] top-10 h-64 w-64 animate-float-slow bg-primary/40" />
          <div className="aurora-blob right-[10%] top-24 h-72 w-72 animate-float bg-amber-400/30" />
          <div className="aurora-blob left-1/2 top-44 h-80 w-80 -translate-x-1/2 animate-float-slow bg-orange-500/20" />
          <div className="absolute inset-0 bg-dotgrid [mask-image:radial-gradient(60%_50%_at_50%_30%,#000,transparent)]" />
        </div>

        <div className="container relative flex flex-col items-center py-24 text-center md:py-36">
          <span className="glass animate-fade-up inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-muted-foreground shadow-soft">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            🪔 {t("home.badge")}
          </span>

          <h1 className="animate-fade-up mt-7 max-w-4xl text-balance text-5xl font-bold tracking-tight md:text-7xl">
            {t("home.heroPre")}{" "}
            <span className="gradient-text">{t("home.heroHighlight")}</span>{" "}
            {t("home.heroPost")}
          </h1>

          <p className="animate-fade-up mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
            {t("home.heroSubtitle")}
          </p>

          <div className="animate-fade-up mt-10 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="shadow-glow" asChild>
              <Link href="/chat">
                {t("home.ctaAsk")} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="glass" asChild>
              <Link href="/learn">{t("home.ctaLearn")}</Link>
            </Button>
          </div>

          {/* Stat strip */}
          <div className="animate-fade-up mt-16 grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.en}
                  className="glass flex flex-col items-center rounded-2xl px-4 py-5 transition-transform hover:-translate-y-1"
                >
                  <Icon className="mb-2 h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold tracking-tight">
                    {s.value}
                  </span>
                  <span className="mt-0.5 text-center text-xs text-muted-foreground">
                    {bi(s.en, s.kn)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------ DAILY HERITAGE ------------------------ */}
      <section className="container pb-8">
        <DailyHeritage />
      </section>

      {/* --------------------------- FEATURES --------------------------- */}
      <section className="container py-20">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            {bi("Explore", "ಅನ್ವೇಷಿಸಿ")}
          </span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            {t("home.featuresTitle")}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {t("home.featuresSubtitle")}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = ICONS[feature.icon] ?? Sparkles;
            return (
              <Link
                key={feature.titleKey}
                href={feature.href}
                style={{ animationDelay: `${i * 70}ms` }}
                className="glow-ring animate-fade-up group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card/80 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-glow"
              >
                {/* hover wash */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.06] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary shadow-inner transition-all duration-300 group-hover:from-primary group-hover:to-amber-500 group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>

                <div className="relative mt-4 flex items-center gap-2">
                  <h3 className="font-semibold">{t(feature.titleKey)}</h3>
                  {!feature.available && (
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                      {t("common.soon")}
                    </span>
                  )}
                </div>

                <p className="relative mt-2 text-sm text-muted-foreground">
                  {t(feature.descKey)}
                </p>

                <span className="relative mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 -translate-x-1">
                  {bi("Open", "ತೆರೆಯಿರಿ")}
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ----------------------------- CTA ------------------------------ */}
      <section className="container py-12">
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-amber-500/10 px-6 py-16 text-center shadow-soft">
          <div className="aurora-blob right-[-4rem] top-[-4rem] h-64 w-64 animate-float bg-primary/30" />
          <div className="aurora-blob left-[-4rem] bottom-[-4rem] h-64 w-64 animate-float-slow bg-amber-400/20" />
          <div className="relative mx-auto flex max-w-xl flex-col items-center gap-4">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {t("home.ctaSectionTitle")}
            </h2>
            <p className="text-muted-foreground">{t("home.ctaSectionText")}</p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="shadow-glow" asChild>
                <Link href="/timeline">{t("home.ctaSectionBtn")}</Link>
              </Button>
              <Button size="lg" variant="outline" className="glass" asChild>
                <Link href="/festivals">
                  {bi("See festivals", "ಹಬ್ಬಗಳನ್ನು ನೋಡಿ")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------- FOOTER ---------------------------- */}
      <footer className="mt-8 border-t border-border/60">
        <div className="container flex flex-col items-center justify-between gap-3 py-10 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-lg">🪔</span>
            <p>
              © {new Date().getFullYear()} Akkaverse.{" "}
              <span className="inline-flex items-center gap-1">
                {bi("Built with", "ಪ್ರೀತಿಯಿಂದ")}
                <Heart className="h-3.5 w-3.5 fill-primary text-primary" />
                {bi("for Karnataka.", "ಕರ್ನಾಟಕಕ್ಕಾಗಿ.")}
              </span>
            </p>
          </div>
          <p className="text-xs">100% free · no API keys · open heritage</p>
        </div>
      </footer>
    </>
  );
}
