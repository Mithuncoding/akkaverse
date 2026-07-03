"use client";

import * as React from "react";
import { Sparkles, TreeDeciduous, ArrowRight } from "lucide-react";

import { useTranslation } from "@/i18n/language-provider";
import { Button } from "@/components/ui/button";

/** Deterministic particle field (no randomness → no hydration mismatch). */
const PARTICLES = [
  { l: 8, s: 6, d: 9, delay: 0, drift: 10 },
  { l: 18, s: 4, d: 11, delay: 1.5, drift: -8 },
  { l: 27, s: 8, d: 8, delay: 3, drift: 14 },
  { l: 36, s: 5, d: 12, delay: 0.8, drift: -12 },
  { l: 45, s: 7, d: 10, delay: 2.2, drift: 6 },
  { l: 54, s: 4, d: 13, delay: 4, drift: -6 },
  { l: 63, s: 9, d: 9, delay: 1.2, drift: 12 },
  { l: 72, s: 5, d: 11, delay: 3.4, drift: -10 },
  { l: 81, s: 7, d: 8, delay: 0.4, drift: 8 },
  { l: 90, s: 5, d: 12, delay: 2.8, drift: -14 },
  { l: 14, s: 4, d: 14, delay: 5, drift: 10 },
  { l: 50, s: 6, d: 10, delay: 5.5, drift: -8 },
  { l: 68, s: 4, d: 13, delay: 6, drift: 12 },
  { l: 33, s: 5, d: 12, delay: 6.5, drift: -6 },
];

export function RootsHero({ onBegin }: { onBegin: () => void }) {
  const { bi } = useTranslation();

  return (
    <section className="roots-sky relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
      {/* ambient light */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora-blob left-[12%] top-[18%] h-72 w-72 animate-float-slow bg-primary/25" />
        <div className="aurora-blob right-[10%] top-[28%] h-80 w-80 animate-float bg-amber-400/20" />
        <div className="absolute inset-0 bg-dotgrid [mask-image:radial-gradient(70%_60%_at_50%_30%,#000,transparent)]" />
      </div>

      {/* rising particles */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="roots-particle bottom-24"
            style={
              {
                left: `${p.l}%`,
                width: `${p.s}px`,
                height: `${p.s}px`,
                "--dur": `${p.d}s`,
                "--delay": `${p.delay}s`,
                "--drift": `${p.drift}px`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* animated tree silhouette */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 flex justify-center">
        <svg
          viewBox="0 0 400 300"
          className="roots-sway h-[46vh] w-auto opacity-[0.22] dark:opacity-30"
          aria-hidden="true"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="3"
          strokeLinecap="round"
        >
          {/* trunk */}
          <path className="roots-branch" style={{ "--len": 160 } as React.CSSProperties} d="M200 300 L200 150" />
          {/* main limbs */}
          <path className="roots-branch" style={{ "--len": 130, "--delay": "0.5s" } as React.CSSProperties} d="M200 175 C170 150 140 140 120 110" />
          <path className="roots-branch" style={{ "--len": 130, "--delay": "0.5s" } as React.CSSProperties} d="M200 175 C230 150 260 140 280 110" />
          <path className="roots-branch" style={{ "--len": 110, "--delay": "0.9s" } as React.CSSProperties} d="M200 150 C185 120 175 100 165 70" />
          <path className="roots-branch" style={{ "--len": 110, "--delay": "0.9s" } as React.CSSProperties} d="M200 150 C215 120 225 100 235 70" />
          {/* twigs */}
          <path className="roots-branch" style={{ "--len": 70, "--delay": "1.3s" } as React.CSSProperties} d="M120 110 C104 96 96 84 92 66" />
          <path className="roots-branch" style={{ "--len": 70, "--delay": "1.3s" } as React.CSSProperties} d="M280 110 C296 96 304 84 308 66" />
          <path className="roots-branch" style={{ "--len": 60, "--delay": "1.5s" } as React.CSSProperties} d="M165 70 C158 56 150 48 140 40" />
          <path className="roots-branch" style={{ "--len": 60, "--delay": "1.5s" } as React.CSSProperties} d="M235 70 C242 56 250 48 260 40" />
          {/* roots */}
          <path className="roots-branch" style={{ "--len": 70, "--delay": "0.2s" } as React.CSSProperties} d="M200 300 C176 300 156 306 132 300" opacity="0.6" />
          <path className="roots-branch" style={{ "--len": 70, "--delay": "0.2s" } as React.CSSProperties} d="M200 300 C224 300 244 306 268 300" opacity="0.6" />
        </svg>
      </div>

      <div className="animate-fade-up">
        <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground shadow-soft">
          <TreeDeciduous className="h-3.5 w-3.5 text-primary" />
          {bi("Roots", "ಬೇರುಗಳು")}
          <span className="text-primary/60">·</span>
          {bi("Every Family Has a Story", "ಪ್ರತಿ ಕುಟುಂಬಕ್ಕೂ ಒಂದು ಕಥೆ")}
        </span>
      </div>

      <div className="animate-fade-up" style={{ animationDelay: "0.12s" }}>
        <h1 className="mx-auto mt-8 max-w-4xl text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          {bi("Every family carries a story.", "ಪ್ರತಿ ಕುಟುಂಬವೂ ಒಂದು ಕಥೆಯನ್ನು ಹೊತ್ತಿದೆ.")}
          <span className="mt-2 block gradient-text">
            {bi(
              "Every story carries a piece of Karnataka.",
              "ಪ್ರತಿ ಕಥೆಯೂ ಕರ್ನಾಟಕದ ಒಂದು ತುಣುಕನ್ನು ಹೊತ್ತಿದೆ.",
            )}
          </span>
        </h1>
      </div>

      <div className="animate-fade-up" style={{ animationDelay: "0.24s" }}>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-muted-foreground sm:text-xl">
          {bi(
            "Weave your family into the living history of your village, your district, your land.",
            "ನಿಮ್ಮ ಕುಟುಂಬವನ್ನು ನಿಮ್ಮ ಊರು, ಜಿಲ್ಲೆ ಮತ್ತು ನಾಡಿನ ಜೀವಂತ ಇತಿಹಾಸದೊಂದಿಗೆ ಬೆಸೆಯಿರಿ.",
          )}
        </p>
      </div>

      <div className="animate-fade-up" style={{ animationDelay: "0.36s" }}>
        <div className="mt-10 flex flex-col items-center gap-4">
          <Button
            size="lg"
            onClick={onBegin}
            className="group h-12 gap-2 rounded-full px-8 text-base shadow-glow"
          >
            <Sparkles className="h-4 w-4" />
            {bi("Begin Your Legacy", "ನಿಮ್ಮ ಪರಂಪರೆ ಆರಂಭಿಸಿ")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <p className="text-xs text-muted-foreground">
            {bi(
              "Saved privately on your device — offline, forever yours.",
              "ನಿಮ್ಮ ಸಾಧನದಲ್ಲೇ ಖಾಸಗಿಯಾಗಿ ಉಳಿಯುತ್ತದೆ — ಆಫ್‌ಲೈನ್, ಸದಾ ನಿಮ್ಮದು.",
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
