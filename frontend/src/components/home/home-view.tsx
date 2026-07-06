"use client";

import Link from "next/link";
import {
  Sparkles,
  GraduationCap,
  BookOpen,
  Map,
  Milestone,
  Brain,
  PartyPopper,
  ArrowRight,
  Landmark,
  Heart,
  TreeDeciduous,
  type LucideIcon,
} from "lucide-react";

import { features } from "@/config/site";
import { Button } from "@/components/ui/button";
import { DailyHeritage } from "@/components/home/daily-heritage";
import { Reveal } from "@/components/ui/reveal";
import { CountUp } from "@/components/ui/count-up";
import { RotatingText } from "@/components/ui/rotating-text";
import { Kicker } from "@/components/ui/kicker";
import { useTranslation } from "@/i18n/language-provider";

/** Map icon names (from config strings) to lucide components in the UI layer. */
const ICONS: Record<string, LucideIcon> = {
  Sparkles,
  GraduationCap,
  BookOpen,
  Map,
  Milestone,
  Brain,
  PartyPopper,
  Heart,
  TreeDeciduous,
};

/**
 * HomeView — the bilingual landing experience.
 * Client component so all copy reacts instantly to the EN ⇄ ಕನ್ನಡ toggle.
 */
export function HomeView() {
  const { t, bi } = useTranslation();

  const stats: {
    icon: LucideIcon;
    value: number;
    format?: boolean;
    suffix?: string;
    en: string;
    kn: string;
  }[] = [
    { icon: Landmark, value: 30, en: "Districts mapped", kn: "ಜಿಲ್ಲೆಗಳು" },
    { icon: PartyPopper, value: 12, en: "Festivals", kn: "ಹಬ್ಬಗಳು" },
    { icon: BookOpen, value: 8, en: "Living stories", kn: "ಕಥೆಗಳು" },
    {
      icon: Milestone,
      value: 2000,
      format: true,
      suffix: "+",
      en: "Years of history",
      kn: "ವರ್ಷಗಳ ಇತಿಹಾಸ",
    },
  ];

  // Cultural concepts that cycle in the hero — heritage as a living thing.
  const concepts = [
    bi("stories", "ಕಥೆಗಳು"),
    bi("language", "ಭಾಷೆ"),
    bi("temples", "ದೇವಾಲಯಗಳು"),
    bi("festivals", "ಹಬ್ಬಗಳು"),
    bi("wisdom", "ಜ್ಞಾನ"),
    bi("art", "ಕಲೆ"),
  ];

  // The emotional spine: one thread from your family outward into the culture.
  const journey: {
    icon: LucideIcon;
    kn: string;
    en: string;
    dEn: string;
    dKn: string;
    href: string;
  }[] = [
    {
      icon: TreeDeciduous,
      kn: "ನಿಮ್ಮ ಬೇರುಗಳು",
      en: "Your Roots",
      dEn: "Begin with your own family — the elders who made you.",
      dKn: "ನಿಮ್ಮ ಕುಟುಂಬದಿಂದ ಆರಂಭಿಸಿ — ನಿಮ್ಮನ್ನು ರೂಪಿಸಿದ ಹಿರಿಯರು.",
      href: "/roots",
    },
    {
      icon: Map,
      kn: "ಅವರ ನೆಲ",
      en: "Their Land",
      dEn: "Walk the villages and districts they came from.",
      dKn: "ಅವರು ಬಂದ ಊರುಗಳು ಮತ್ತು ಜಿಲ್ಲೆಗಳಲ್ಲಿ ನಡೆಯಿರಿ.",
      href: "/explore",
    },
    {
      icon: BookOpen,
      kn: "ಜೀವಂತ ಕಥೆಗಳು",
      en: "Living Stories",
      dEn: "Live the legends that shaped who they were.",
      dKn: "ಅವರನ್ನು ರೂಪಿಸಿದ ದಂತಕಥೆಗಳನ್ನು ಅನುಭವಿಸಿ.",
      href: "/stories",
    },
    {
      icon: PartyPopper,
      kn: "ಹಬ್ಬಗಳು",
      en: "Festivals",
      dEn: "Celebrate what they celebrated, season after season.",
      dKn: "ಅವರು ಆಚರಿಸಿದ್ದನ್ನು ನೀವೂ ಆಚರಿಸಿ.",
      href: "/festivals",
    },
    {
      icon: GraduationCap,
      kn: "ಮಾತೃಭಾಷೆ",
      en: "The Mother Tongue",
      dEn: "Learn the Kannada words they whispered at home.",
      dKn: "ಅವರು ಮನೆಯಲ್ಲಿ ಆಡಿದ ಕನ್ನಡ ಪದಗಳನ್ನು ಕಲಿಯಿರಿ.",
      href: "/learn",
    },
    {
      icon: Heart,
      kn: "ಮುಂದಿನ ಪೀಳಿಗೆ",
      en: "Pass it on",
      dEn: "Give it all to those yet to come.",
      dKn: "ಇದೆಲ್ಲವನ್ನೂ ಮುಂದೆ ಬರುವವರಿಗೆ ದಾಟಿಸಿ.",
      href: "/memories",
    },
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
          {/* Signature Kannada glyph — culture rendered as ambient texture. */}
          <span
            aria-hidden
            className="signature-glyph animate-float-slow absolute left-1/2 top-[42%] -z-10 -translate-x-1/2 -translate-y-1/2 text-[15rem] font-bold leading-none xs:text-[20rem] sm:text-[26rem] md:text-[40rem]"
          >
            ಕ
          </span>
          <div className="absolute inset-0 bg-dotgrid [mask-image:radial-gradient(60%_50%_at_50%_30%,#000,transparent)]" />
        </div>

        <div className="container relative flex flex-col items-center py-16 text-center sm:py-24 md:py-36">
          <span className="glass animate-fade-up inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted-foreground shadow-soft sm:text-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            🪔 {t("home.badge")}
          </span>

          <h1 className="animate-fade-up mt-6 max-w-4xl text-balance text-[2rem] font-bold leading-[1.1] tracking-tight xs:text-5xl sm:mt-7 md:text-7xl">
            {t("home.heroPre")}{" "}
            <span className="gradient-text">{t("home.heroHighlight")}</span>{" "}
            {t("home.heroPost")}
          </h1>

          <p className="animate-fade-up mt-5 max-w-2xl text-pretty text-base text-muted-foreground sm:mt-6 sm:text-lg md:text-xl">
            {t("home.heroSubtitle")}
          </p>

          {/* Emotional rotating line — keeps the heritage feeling alive. */}
          <p
            className="animate-fade-up mt-4 flex items-center gap-2 text-base font-medium text-foreground/80 md:text-lg"
            style={{ animationDelay: "120ms" }}
          >
            <span className="text-muted-foreground">
              {bi("Keeping", "ಜೀವಂತವಾಗಿ")}
            </span>
            <RotatingText
              items={concepts}
              className="gradient-text font-semibold"
            />
            <span className="text-muted-foreground">
              {bi("alive.", "ಉಳಿಸುತ್ತಿದೆ.")}
            </span>
          </p>

          {/* Diaspora heart-line — the audience this is really for. */}
          <p
            className="animate-fade-up mt-5 max-w-xl text-pretty text-sm text-muted-foreground/90 sm:text-base"
            style={{ animationDelay: "200ms" }}
          >
            {bi(
              "For every Kannadiga far from home — and every child who should never forget where they came from.",
              "ಮನೆಯಿಂದ ದೂರವಿರುವ ಪ್ರತಿ ಕನ್ನಡಿಗನಿಗೆ — ಮತ್ತು ತಮ್ಮ ಬೇರುಗಳನ್ನು ಎಂದಿಗೂ ಮರೆಯಬಾರದ ಪ್ರತಿ ಮಗುವಿಗೆ.",
            )}
          </p>

          <div className="animate-fade-up mt-9 flex w-full max-w-sm flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row">
            <Button size="lg" className="w-full shadow-glow sm:w-auto" asChild>
              <Link href="/roots">
                {bi("Begin with your Roots", "ನಿಮ್ಮ ಬೇರುಗಳಿಂದ ಆರಂಭಿಸಿ")}{" "}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="glass w-full sm:w-auto" asChild>
              <Link href="/chat">{bi("Ask Akka", "ಅಕ್ಕರನ್ನು ಕೇಳಿ")}</Link>
            </Button>
          </div>

          {/* Stat strip */}
          <div className="animate-fade-up mt-12 grid w-full max-w-3xl grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-4 sm:gap-4">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.en}
                  className="glass group flex flex-col items-center rounded-2xl px-4 py-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
                >
                  <Icon className="mb-2 h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-2xl font-bold tracking-tight tabular-nums">
                    <CountUp value={s.value} format={s.format} />
                    {s.suffix}
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

      {/* ------------------------- THE JOURNEY ------------------------- */}
      <section className="container py-14 sm:py-20">
        <Reveal className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
          <Kicker en="The Journey" kn="ನಮ್ಮ ಪಯಣ" align="center" />
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            {bi(
              "One thread — from your family to the world they lived in",
              "ನಿಮ್ಮ ಕುಟುಂಬದಿಂದ ಅವರು ಬದುಕಿದ ಜಗತ್ತಿನವರೆಗೆ — ಒಂದೇ ಎಳೆ",
            )}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {bi(
              "Akkaverse isn't a set of pages. It's one story — yours.",
              "ಅಕ್ಕವರ್ಸ್ ಕೇವಲ ಪುಟಗಳಲ್ಲ. ಇದು ಒಂದು ಕಥೆ — ನಿಮ್ಮದೇ.",
            )}
          </p>
        </Reveal>

        <div className="mx-auto max-w-3xl">
          {journey.map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal key={c.href} delay={(i % 3) * 80}>
                <Link
                  href={c.href}
                  className="group relative flex items-start gap-4 rounded-2xl border border-transparent p-4 transition-all hover:border-primary/30 hover:bg-card/60 sm:gap-5 sm:p-5"
                >
                  <div className="flex flex-col items-center">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary transition-all group-hover:from-primary group-hover:to-amber-500 group-hover:text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </span>
                    {i < journey.length - 1 && (
                      <span
                        aria-hidden
                        className="mt-1 h-8 w-px bg-gradient-to-b from-primary/30 to-transparent"
                      />
                    )}
                  </div>
                  <div className="pt-1">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      <span className="text-[0.7rem] font-semibold tabular-nums text-primary/60">
                        0{i + 1}
                      </span>
                      <h3 className="text-lg font-semibold tracking-tight">
                        {c.kn}
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        {c.en}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {bi(c.dEn, c.dKn)}
                    </p>
                  </div>
                  <ArrowRight className="ml-auto mt-2 h-4 w-4 shrink-0 -translate-x-1 text-primary opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ------------------------ DAILY HERITAGE ------------------------ */}
      <section className="container pb-8">
        <DailyHeritage />
      </section>

      {/* --------------------------- FEATURES --------------------------- */}
      <section className="container py-14 sm:py-20">
        <Reveal className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            {bi("Explore", "ಅನ್ವೇಷಿಸಿ")}
          </span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            {t("home.featuresTitle")}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {t("home.featuresSubtitle")}
          </p>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = ICONS[feature.icon] ?? Sparkles;
            return (
              <Reveal key={feature.titleKey} delay={(i % 3) * 90}>
                <Link
                  href={feature.href}
                  onPointerMove={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty(
                      "--mx",
                      `${e.clientX - r.left}px`,
                    );
                    e.currentTarget.style.setProperty(
                      "--my",
                      `${e.clientY - r.top}px`,
                    );
                  }}
                  className="glow-ring spotlight group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/80 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-glow"
                >
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary shadow-inner transition-all duration-300 group-hover:from-primary group-hover:to-amber-500 group-hover:text-primary-foreground group-hover:scale-105">
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

                  <span className="relative mt-4 inline-flex -translate-x-1 items-center gap-1 text-sm font-medium text-primary opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    {bi("Open", "ತೆರೆಯಿರಿ")}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ----------------------------- CTA ------------------------------ */}
      <section className="container py-12">
        <Reveal className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-amber-500/10 px-5 py-12 text-center shadow-soft sm:px-6 sm:py-16">
          <div className="aurora-blob right-[-4rem] top-[-4rem] h-64 w-64 animate-float bg-primary/30" />
          <div className="aurora-blob left-[-4rem] bottom-[-4rem] h-64 w-64 animate-float-slow bg-amber-400/20" />
          <div className="relative mx-auto flex max-w-xl flex-col items-center gap-4">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {t("home.ctaSectionTitle")}
            </h2>
            <p className="text-muted-foreground">{t("home.ctaSectionText")}</p>
            <div className="mt-2 flex w-full max-w-sm flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row">
              <Button size="lg" className="w-full shadow-glow sm:w-auto" asChild>
                <Link href="/timeline">{t("home.ctaSectionBtn")}</Link>
              </Button>
              <Button size="lg" variant="outline" className="glass w-full sm:w-auto" asChild>
                <Link href="/festivals">
                  {bi("See festivals", "ಹಬ್ಬಗಳನ್ನು ನೋಡಿ")}
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
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
