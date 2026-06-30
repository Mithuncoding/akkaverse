"use client";

import * as React from "react";
import { ChevronDown, Compass, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/language-provider";
import { Reveal } from "@/components/ui/reveal";
import { JourneyChapter } from "@/components/timeline/journey-chapter";
import { Luminaries } from "@/components/timeline/luminaries";
import { chapters } from "@/data/journey";

/**
 * JourneyView — the signature "Heritage Journey" experience.
 *
 * A cinematic intro, a sticky era-rail that tracks your scroll through 25
 * centuries, eight immersive chapters, a Hall of Fame, and a closing call to
 * keep the story alive. Each chapter carries its own accent identity while the
 * whole journey shares one design language.
 */
export function JourneyView() {
  const { bi } = useTranslation();
  const [active, setActive] = React.useState(0);

  // Scroll-spy: highlight the era currently in view.
  React.useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = chapters.findIndex((c) => c.id === entry.target.id);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    chapters.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="relative">
      {/* ============================= INTRO ============================= */}
      <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden bg-dotgrid px-4 text-center">
        <div className="aurora-blob absolute -left-32 top-10 h-96 w-96 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="aurora-blob absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-rose-500/20 blur-3xl [animation-delay:1.5s]" />

        {/* faint Kannada watermark */}
        <span
          aria-hidden
          className="signature-glyph pointer-events-none absolute select-none text-[52vw] font-black leading-none opacity-[0.06] md:text-[40vw]"
        >
          ಕ
        </span>

        <Reveal className="relative">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground backdrop-blur">
            <Compass className="h-3.5 w-3.5 text-amber-500" />
            {bi("An immersive journey", "ಒಂದು ಅನುಭವ ಯಾತ್ರೆ")}
          </div>
          <h1 className="mx-auto max-w-4xl text-balance text-4xl font-black leading-[1.05] tracking-tight xs:text-5xl md:text-7xl lg:text-8xl">
            {bi("2,500 years of", "2,500 ವರ್ಷಗಳ")}{" "}
            <span className="gradient-text">{bi("Karnataka", "ಕರ್ನಾಟಕ")}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-muted-foreground sm:mt-6 sm:text-lg md:text-xl">
            {bi(
              "Not a timeline — a living museum. Scroll through empires, temples, revolutions and rockets, and meet the people who turned red earth into a civilization.",
              "ಇದು ಕಾಲರೇಖೆಯಲ್ಲ — ಒಂದು ಜೀವಂತ ವಸ್ತುಸಂಗ್ರಹಾಲಯ. ಸಾಮ್ರಾಜ್ಯ, ದೇವಾಲಯ, ಕ್ರಾಂತಿ ಮತ್ತು ರಾಕೆಟ್‌ಗಳ ಮೂಲಕ ಸಾಗಿ, ಕೆಂಪು ಮಣ್ಣನ್ನು ನಾಗರಿಕತೆಯಾಗಿಸಿದವರನ್ನು ಭೇಟಿಯಾಗಿ.",
            )}
          </p>

          <button
            type="button"
            onClick={() => go(chapters[0].id)}
            className="group mx-auto mt-10 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-all duration-200 hover:gap-3 hover:shadow-glow active:scale-[0.97]"
          >
            {bi("Begin the journey", "ಯಾತ್ರೆ ಆರಂಭಿಸಿ")}
            <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </button>
        </Reveal>

        {/* era preview dots */}
        <Reveal delay={150} className="relative mt-14 hidden md:block">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {chapters.map((c, i) => (
              <React.Fragment key={c.id}>
                {i > 0 && <span className="h-px w-6 bg-border" />}
                <button
                  type="button"
                  onClick={() => go(c.id)}
                  className="rounded-full px-2 py-1 font-medium transition-colors hover:text-foreground"
                  style={{ color: `rgb(${c.accent})` }}
                >
                  {c.years}
                </button>
              </React.Fragment>
            ))}
          </div>
        </Reveal>
      </section>

      {/* =========================== ERA RAIL =========================== */}
      <nav className="pointer-events-none fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
        <ul className="flex flex-col gap-1">
          {chapters.map((c, i) => (
            <li key={c.id} className="pointer-events-auto">
              <button
                type="button"
                onClick={() => go(c.id)}
                className="group flex items-center gap-3"
                aria-label={c.name}
              >
                <span
                  className={cn(
                    "grid h-8 w-8 place-items-center rounded-full border text-xs font-bold transition-all duration-300",
                    active === i
                      ? "scale-110 border-transparent text-white"
                      : "border-border bg-background/70 text-muted-foreground backdrop-blur",
                  )}
                  style={
                    active === i
                      ? { backgroundColor: `rgb(${c.accent})` }
                      : undefined
                  }
                >
                  {c.numeral}
                </span>
                <span
                  className={cn(
                    "max-w-0 overflow-hidden whitespace-nowrap rounded-full bg-background/90 text-sm font-medium opacity-0 backdrop-blur transition-all duration-300 group-hover:max-w-[14rem] group-hover:px-3 group-hover:py-1 group-hover:opacity-100",
                  )}
                  style={{ color: `rgb(${c.accent})` }}
                >
                  {bi(c.name, c.nameKn)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* =========================== CHAPTERS =========================== */}
      {chapters.map((chapter, i) => (
        <JourneyChapter key={chapter.id} chapter={chapter} index={i} />
      ))}

      {/* ========================== LUMINARIES ========================== */}
      <Luminaries />

      {/* ============================= OUTRO ============================ */}
      <section className="relative overflow-hidden bg-foreground px-4 py-20 text-center text-background md:py-32">
        <div className="aurora-blob absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-amber-500/30 blur-3xl" />
        <Reveal className="relative mx-auto max-w-2xl">
          <Sparkles className="mx-auto h-8 w-8 text-amber-400" />
          <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
            {bi("The story is still being written", "ಕಥೆ ಇನ್ನೂ ಬರೆಯಲ್ಪಡುತ್ತಿದೆ")}
          </h2>
          <p className="mx-auto mt-4 text-pretty text-background/70">
            {bi(
              "Every Kannadiga is a new chapter. Carry the language, the music and the memory forward — and add your own line to the epic.",
              "ಪ್ರತಿ ಕನ್ನಡಿಗನೂ ಒಂದು ಹೊಸ ಅಧ್ಯಾಯ. ಭಾಷೆ, ಸಂಗೀತ ಮತ್ತು ನೆನಪನ್ನು ಮುಂದೆ ಸಾಗಿಸಿ — ಮಹಾಕಾವ್ಯಕ್ಕೆ ನಿಮ್ಮದೇ ಸಾಲನ್ನು ಸೇರಿಸಿ.",
            )}
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground transition-all duration-200 hover:shadow-glow active:scale-[0.97]"
          >
            {bi("Return to the beginning", "ಆರಂಭಕ್ಕೆ ಹಿಂತಿರುಗಿ")}
          </button>
        </Reveal>
      </section>
    </div>
  );
}
