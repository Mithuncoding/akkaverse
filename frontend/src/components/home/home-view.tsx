"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Languages,
  Map,
  Mic2,
  Sparkles,
  Volume2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { PhotoMarquee } from "@/components/home/photo-marquee";
import { Reveal } from "@/components/ui/reveal";
import { Kicker } from "@/components/ui/kicker";
import { VoicePlayer } from "@/components/roots/voice-player";
import { useTranslation } from "@/i18n/language-provider";

/**
 * HomeView — the bilingual landing experience.
 * Client component so all copy reacts instantly to the EN ⇄ ಕನ್ನಡ toggle.
 */
export function HomeView() {
  const { bi, locale } = useTranslation();
  const bilingual = locale === "both";

  const voices = [
    {
      name: "Varalakshmi",
      relationEn: "A mother's introduction",
      relationKn: "ಅಮ್ಮನ ಪರಿಚಯ",
      textEn: "A voice from Lakkahalli, kept in her own words.",
      textKn: "ಲಕ್ಕಹಳ್ಳಿಯಿಂದ ಅವರದೇ ಮಾತುಗಳಲ್ಲಿ ಉಳಿಸಿದ ಧ್ವನಿ.",
      audio: "/voices/varalakshmi-introduction.mp3",
    },
    {
      name: "Rathnamma Ajji",
      relationEn: "A grandmother's recipe",
      relationKn: "ಅಜ್ಜಿಯ ಅಡುಗೆ ವಿಧಾನ",
      textEn: "Her way of making ragi mudde, preserved for the family.",
      textKn: "ಅವರ ರಾಗಿ ಮುದ್ದೆ ಮಾಡುವ ವಿಧಾನ, ಕುಟುಂಬಕ್ಕಾಗಿ ಉಳಿಸಲಾಗಿದೆ.",
      audio: "/voices/ajji-ragi-mudde.mp3",
    },
  ];

  const pathways = [
    {
      icon: Mic2,
      number: "01",
      titleEn: "Preserve a real voice",
      titleKn: "ನಿಜವಾದ ಧ್ವನಿಯನ್ನು ಉಳಿಸಿ",
      textEn: "Record a blessing, recipe, song, or story with clear family consent.",
      textKn: "ಕುಟುಂಬದ ಸ್ಪಷ್ಟ ಅನುಮತಿಯೊಂದಿಗೆ ಆಶೀರ್ವಾದ, ಅಡುಗೆ, ಹಾಡು ಅಥವಾ ಕಥೆಯನ್ನು ದಾಖಲಿಸಿ.",
      actionEn: "Open Voice Legacy",
      actionKn: "ಧ್ವನಿ ಪರಂಪರೆ ತೆರೆಯಿರಿ",
      href: "/roots",
    },
    {
      icon: Languages,
      number: "02",
      titleEn: "Turn memory into learning",
      titleKn: "ನೆನಪನ್ನು ಕಲಿಕೆಯಾಗಿ ಮಾಡಿ",
      textEn: "Listen, understand the meaning, and carry Kannada words into everyday life.",
      textKn: "ಕೇಳಿ, ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ ಮತ್ತು ಕನ್ನಡ ಪದಗಳನ್ನು ದಿನನಿತ್ಯದ ಬದುಕಿಗೆ ಕೊಂಡೊಯ್ಯಿರಿ.",
      actionEn: "Start learning",
      actionKn: "ಕಲಿಯಲು ಆರಂಭಿಸಿ",
      href: "/learn",
    },
    {
      icon: Map,
      number: "03",
      titleEn: "Discover the world behind it",
      titleKn: "ಅದರ ಹಿಂದಿನ ಜಗತ್ತನ್ನು ಅನ್ವೇಷಿಸಿ",
      textEn: "Walk through the districts, histories, festivals, and stories that shaped your family.",
      textKn: "ನಿಮ್ಮ ಕುಟುಂಬವನ್ನು ರೂಪಿಸಿದ ಜಿಲ್ಲೆಗಳು, ಇತಿಹಾಸ, ಹಬ್ಬಗಳು ಮತ್ತು ಕಥೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.",
      actionEn: "Explore Karnataka",
      actionKn: "ಕರ್ನಾಟಕ ಅನ್ವೇಷಿಸಿ",
      href: "/explore",
    },
  ];

  return (
    <>
      {/* ----------------------------- HERO ----------------------------- */}
      <section className="relative isolate h-[calc(100svh-9rem)] min-h-[500px] max-h-[620px] overflow-hidden border-b border-white/10 bg-black">
        <Image
          src="/districts/chikkaballapura.jpg"
          alt="Sunrise over Chikkaballapura"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />

        <div className="container relative flex h-full items-end pb-10 sm:pb-14 md:items-center md:pb-0">
          <div className="w-full min-w-0 max-w-3xl text-white">
            <div className="animate-fade-up flex items-center gap-3 text-xs font-semibold uppercase text-amber-200 sm:text-sm">
              <span className="h-px w-8 bg-amber-300" />
              <Mic2 className="h-4 w-4" />
              {bilingual
                ? "Voice Legacy · ಧ್ವನಿ ಪರಂಪರೆ"
                : bi("A voice-first heritage archive", "ಧ್ವನಿ ಆಧಾರಿತ ಪರಂಪರೆ ಸಂಗ್ರಹ")}
            </div>

            <h1 className={`animate-fade-up mt-5 text-balance text-4xl font-bold leading-[1.05] ${bilingual ? "sm:text-5xl lg:text-6xl" : "sm:text-6xl lg:text-7xl"}`}>
              {bilingual ? (
                <>
                  <span className="block">Your family&apos;s Kannada, kept alive.</span>
                  <span lang="kn" className="mt-2 block text-xl font-semibold leading-snug text-amber-200 sm:text-2xl lg:text-3xl">
                    ನಿಮ್ಮ ಕುಟುಂಬದ ಕನ್ನಡ, ಸದಾ ಜೀವಂತ.
                  </span>
                </>
              ) : (
                bi(
                  "Your family's Kannada, kept alive.",
                  "ನಿಮ್ಮ ಕುಟುಂಬದ ಕನ್ನಡ, ಸದಾ ಜೀವಂತ.",
                )
              )}
            </h1>

            <p className={`animate-fade-up max-w-2xl text-pretty text-base leading-relaxed text-white/80 sm:text-lg ${bilingual ? "mt-3" : "mt-5 md:text-xl"}`}>
              {bilingual ? (
                <>
                  <span className="block">
                    Record an elder&apos;s blessing, recipe, or story. Akkaverse keeps the original voice for the next generation.
                  </span>
                  <span lang="kn" className="mt-1 block text-sm text-white/70 sm:text-base">
                    ಹಿರಿಯರ ಆಶೀರ್ವಾದ, ಅಡುಗೆ ವಿಧಾನ ಅಥವಾ ಕಥೆಯನ್ನು ದಾಖಲಿಸಿ. ಅಕ್ಕವರ್ಸ್ ಮೂಲ ಧ್ವನಿಯನ್ನು ಮುಂದಿನ ಪೀಳಿಗೆಗಾಗಿ ಉಳಿಸುತ್ತದೆ.
                  </span>
                </>
              ) : (
                bi(
                  "Record the blessing, recipe, or story only your elders can tell. Akkaverse keeps the original voice and turns its meaning into a bilingual lesson for the next generation.",
                  "ನಿಮ್ಮ ಹಿರಿಯರು ಮಾತ್ರ ಹೇಳಬಲ್ಲ ಆಶೀರ್ವಾದ, ಅಡುಗೆ ವಿಧಾನ ಅಥವಾ ಕಥೆಯನ್ನು ದಾಖಲಿಸಿ. ಅಕ್ಕವರ್ಸ್ ಮೂಲ ಧ್ವನಿಯನ್ನು ಉಳಿಸಿ, ಅದರ ಅರ್ಥವನ್ನು ಮುಂದಿನ ಪೀಳಿಗೆಗೆ ದ್ವಿಭಾಷಾ ಪಾಠವನ್ನಾಗಿ ಮಾಡುತ್ತದೆ.",
                )
              )}
            </p>

            <div className={`animate-fade-up flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row ${bilingual ? "mt-5" : "mt-8"}`}>
              <Button size="lg" className="w-full bg-amber-400 text-black shadow-lg hover:bg-amber-300 sm:w-auto" asChild>
                <Link href="/roots">
                  <Volume2 className="h-4 w-4" />
                  {bilingual
                    ? "Voices · ಧ್ವನಿಗಳು"
                    : bi("Hear our family voices", "ನಮ್ಮ ಕುಟುಂಬದ ಧ್ವನಿಗಳನ್ನು ಕೇಳಿ")}
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full border-white/35 bg-black/20 text-white backdrop-blur-sm hover:bg-white hover:text-black sm:w-auto" asChild>
                <Link href="/explore">
                  {bilingual
                    ? "Explore · ಅನ್ವೇಷಿಸಿ"
                    : bi("Explore Karnataka", "ಕರ್ನಾಟಕ ಅನ್ವೇಷಿಸಿ")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className={`animate-fade-up flex flex-wrap gap-x-6 gap-y-2 border-t border-white/20 pt-4 text-xs font-medium text-white/70 sm:text-sm ${bilingual ? "mt-5" : "mt-8"}`}>
              <span>
                {bilingual ? "2 voices · 2 ಧ್ವನಿಗಳು" : bi("2 original family voices", "2 ಮೂಲ ಕುಟುಂಬ ಧ್ವನಿಗಳು")}
              </span>
              <span>{bilingual ? "EN + ಕನ್ನಡ" : bi("English + ಕನ್ನಡ", "ಇಂಗ್ಲಿಷ್ + ಕನ್ನಡ")}</span>
              <span>
                {bilingual ? "Private · ಖಾಸಗಿ" : bi("Private by default", "ಪೂರ್ವನಿಯೋಜಿತವಾಗಿ ಖಾಸಗಿ")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------- A LIVING LAND (photos) ---------------------- */}
      <section className="py-14 sm:py-20">
        <Reveal className="container mb-8 max-w-2xl text-center sm:mb-10">
          <Kicker en="A living land" kn="ಜೀವಂತ ನೆಲ" align="center" />
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            {bi("A land of a thousand stories", "ಸಾವಿರ ಕಥೆಗಳ ನಾಡು")}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {bi(
              "Temples, palaces, waterfalls and the thirty districts that hold them.",
              "ದೇವಾಲಯಗಳು, ಅರಮನೆಗಳು, ಜಲಪಾತಗಳು ಮತ್ತು ಅವನ್ನು ಒಳಗೊಂಡ ಮೂವತ್ತು ಜಿಲ್ಲೆಗಳು.",
            )}
          </p>
        </Reveal>
        <PhotoMarquee />
      </section>

      {/* ------------------------ ORIGINAL VOICES ------------------------ */}
      <section className="border-y border-border bg-secondary/25 py-16 sm:py-24">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <Kicker en="From our family" kn="ನಮ್ಮ ಕುಟುಂಬದಿಂದ" />
            <h2 className="mt-3 max-w-xl text-3xl font-semibold leading-tight md:text-5xl">
              {bi(
                "Real voices. Not recreations.",
                "ನಿಜವಾದ ಧ್ವನಿಗಳು. ಮರುಸೃಷ್ಟಿಗಳಲ್ಲ.",
              )}
            </h2>
            <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">
              {bi(
                "These are the people behind Akkaverse. Their recordings stay clearly labeled, consented, and connected to the family story they belong to.",
                "ಇವರು ಅಕ್ಕವರ್ಸ್ ಹಿಂದಿರುವವರು. ಅವರ ಧ್ವನಿಗಳನ್ನು ಸ್ಪಷ್ಟ ಗುರುತು, ಅನುಮತಿ ಮತ್ತು ಕುಟುಂಬದ ಕಥೆಯೊಂದಿಗೆ ಉಳಿಸಲಾಗಿದೆ.",
              )}
            </p>
            <Link href="/roots" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              {bi("Visit our living family archive", "ನಮ್ಮ ಜೀವಂತ ಕುಟುಂಬ ಸಂಗ್ರಹ ನೋಡಿ")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <div className="divide-y divide-border border-y border-border">
            {voices.map((voice, index) => (
              <Reveal key={voice.name} delay={index * 90} className="py-6 sm:py-7">
                <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-primary/25 bg-primary/10 text-primary">
                      <Volume2 className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-lg font-semibold">{voice.name}</p>
                      <p className="text-sm font-medium text-primary">
                        {bi(voice.relationEn, voice.relationKn)}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {bi(voice.textEn, voice.textKn)}
                      </p>
                    </div>
                  </div>
                  <div className="pl-[3.75rem] sm:pl-0">
                    <VoicePlayer
                      text={bi(voice.textEn, voice.textKn)}
                      originalAudioUrl={voice.audio}
                      compact
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------- PATHWAYS ---------------------------- */}
      <section className="container py-16 sm:py-24">
        <Reveal className="max-w-2xl">
          <Kicker en="Begin anywhere" kn="ಎಲ್ಲಿಂದಾದರೂ ಆರಂಭಿಸಿ" />
          <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-5xl">
            {bi(
              "One family memory can open an entire culture.",
              "ಒಂದು ಕುಟುಂಬದ ನೆನಪು ಇಡೀ ಸಂಸ್ಕೃತಿಯನ್ನು ತೆರೆಯಬಹುದು.",
            )}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {pathways.map((pathway, index) => {
            const Icon = pathway.icon;
            return (
              <Reveal key={pathway.number} delay={index * 90}>
                <Link href={pathway.href} className="group block border-t border-foreground/20 pt-5">
                  <div className="flex items-center justify-between text-primary">
                    <span className="text-sm font-semibold tabular-nums">{pathway.number}</span>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">
                    {bi(pathway.titleEn, pathway.titleKn)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {bi(pathway.textEn, pathway.textKn)}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    {bi(pathway.actionEn, pathway.actionKn)}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ----------------------------- CTA ------------------------------ */}
      <section className="border-y border-border bg-primary/[0.07]">
        <Reveal className="container grid gap-8 py-14 sm:py-20 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-semibold text-primary">
              {bi("Start with one conversation", "ಒಂದು ಸಂಭಾಷಣೆಯಿಂದ ಆರಂಭಿಸಿ")}
            </p>
            <h2 className="mt-2 max-w-2xl text-3xl font-semibold leading-tight md:text-4xl">
              {bi(
                "Whose voice would your family never want to lose?",
                "ನಿಮ್ಮ ಕುಟುಂಬ ಎಂದಿಗೂ ಕಳೆದುಕೊಳ್ಳಬಾರದ ಧ್ವನಿ ಯಾರದು?",
              )}
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
            <Button size="lg" asChild>
              <Link href="/roots">
                <Mic2 className="h-4 w-4" />
                {bi("Preserve a voice", "ಧ್ವನಿಯನ್ನು ಉಳಿಸಿ")}
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/chat">
                <Sparkles className="h-4 w-4" />
                {bi("Ask Akka", "ಅಕ್ಕರನ್ನು ಕೇಳಿ")}
              </Link>
            </Button>
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
          <p className="text-xs">
            {bi(
              "Private by default · bilingual · built for families",
              "ಪೂರ್ವನಿಯೋಜಿತವಾಗಿ ಖಾಸಗಿ · ದ್ವಿಭಾಷಾ · ಕುಟುಂಬಗಳಿಗಾಗಿ",
            )}
          </p>
        </div>
      </footer>
    </>
  );
}
