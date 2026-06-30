"use client";

import * as React from "react";
import {
  X,
  Sparkles,
  Crown,
  Soup,
  Drama,
  MapPin,
  Images,
  Baby,
  ChevronDown,
  Lightbulb,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/language-provider";
import { ReadAloud } from "@/components/ui/read-aloud";
import { JourneyFigure } from "@/components/timeline/journey-figure";
import type { Festival } from "@/data/festivals";
import {
  experienceFor,
  type Ambient,
  type FestivalExperience,
} from "@/data/festival-experience";

/* ------------------------------------------------------------------ *
 * Festival World — a full-screen, colour-shifting immersive room.
 * Seven adaptive "modes" let you attend, study, taste, watch and play.
 * ------------------------------------------------------------------ */

type ModeId =
  | "celebration"
  | "heritage"
  | "food"
  | "culture"
  | "journey"
  | "gallery"
  | "kids";

const MODES: {
  id: ModeId;
  icon: React.ComponentType<{ className?: string }>;
  en: string;
  kn: string;
}[] = [
  { id: "celebration", icon: Sparkles, en: "Celebration", kn: "ಸಂಭ್ರಮ" },
  { id: "heritage", icon: Crown, en: "Heritage", kn: "ಪರಂಪರೆ" },
  { id: "food", icon: Soup, en: "Food", kn: "ಆಹಾರ" },
  { id: "culture", icon: Drama, en: "Culture", kn: "ಸಂಸ್ಕೃತಿ" },
  { id: "journey", icon: MapPin, en: "Journey", kn: "ಪಯಣ" },
  { id: "gallery", icon: Images, en: "Gallery", kn: "ಚಿತ್ರ" },
  { id: "kids", icon: Baby, en: "Kids", kn: "ಮಕ್ಕಳು" },
];

export function FestivalWorld({
  festival,
  onClose,
}: {
  festival: Festival;
  onClose: () => void;
}) {
  const { bi } = useTranslation();
  const exp = React.useMemo(() => experienceFor(festival.id), [festival.id]);
  const [mode, setMode] = React.useState<ModeId>("celebration");
  const scrollRef = React.useRef<HTMLDivElement | null>(null);

  // Lock the body scroll while the world is open.
  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Reset scroll to top whenever the mode changes.
  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [mode]);

  const cssVars = {
    ["--accent" as string]: exp.accent,
    ["--accent2" as string]: exp.accent2,
    ["--sky-top" as string]: exp.skyTop,
    ["--sky-bottom" as string]: exp.skyBottom,
  } as React.CSSProperties;

  return (
    <div
      className="fixed inset-0 z-[60] text-white"
      role="dialog"
      aria-modal="true"
      aria-label={festival.nameEn}
      style={cssVars}
    >
      {/* Colour wash + ambient particle field */}
      <div className="fest-sky absolute inset-0" />
      <AmbientField ambient={exp.ambient} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_-10%,transparent_50%,rgb(0_0_0/0.55))]" />

      {/* Scroll surface */}
      <div
        ref={scrollRef}
        className="scroll-touch relative h-full w-full overflow-y-auto overscroll-contain"
      >
        {/* Top bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between gap-3 bg-gradient-to-b from-black/55 to-transparent px-4 pb-6 pt-[calc(env(safe-area-inset-top)+0.75rem)] sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl drop-shadow sm:text-3xl">
              {festival.emoji}
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-tight sm:text-base">
                {bi(festival.nameEn, festival.nameKn)}
              </p>
              <p className="text-[11px] text-white/70 sm:text-xs">
                {bi(festival.placeEn, festival.placeKn)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 active:scale-90"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Mode switcher */}
        <div className="scroll-touch no-scrollbar sticky top-[3.75rem] z-20 -mt-2 flex gap-2 overflow-x-auto bg-gradient-to-b from-black/30 to-transparent px-4 pb-3 sm:justify-center sm:px-6">
          {MODES.map((m) => {
            const Icon = m.icon;
            const active = mode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-medium backdrop-blur transition-all active:scale-95",
                  active
                    ? "border-white/0 bg-[rgb(var(--accent))] text-black shadow-lg"
                    : "border-white/20 bg-white/5 text-white/80 hover:bg-white/10",
                )}
                aria-pressed={active}
              >
                <Icon className="h-3.5 w-3.5" />
                {bi(m.en, m.kn)}
              </button>
            );
          })}
        </div>

        {/* Mode content */}
        <div key={mode} className="fest-mode-in px-4 pb-24 sm:px-6">
          {mode === "celebration" && (
            <CelebrationMode festival={festival} exp={exp} />
          )}
          {mode === "heritage" && <HeritageMode exp={exp} />}
          {mode === "food" && <FoodMode exp={exp} />}
          {mode === "culture" && <CultureMode exp={exp} />}
          {mode === "journey" && <JourneyMode festival={festival} exp={exp} />}
          {mode === "gallery" && <GalleryMode festival={festival} exp={exp} />}
          {mode === "kids" && <KidsMode festival={festival} exp={exp} />}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Ambient particle field
 * ------------------------------------------------------------------ */
function AmbientField({ ambient }: { ambient: Ambient }) {
  const bits = React.useMemo(() => {
    const count = ambient === "rain" ? 60 : ambient === "dust" ? 26 : 38;
    return Array.from({ length: count }).map((_, i) => {
      const dur =
        ambient === "rain"
          ? 0.6 + Math.random() * 0.7
          : ambient === "royal"
            ? 3 + Math.random() * 4
            : 6 + Math.random() * 7;
      return {
        i,
        left: Math.random() * 100,
        delay: -Math.random() * dur,
        dur,
        drift: `${(Math.random() - 0.5) * 160}px`,
        scale: 0.6 + Math.random() * 0.9,
      };
    });
  }, [ambient]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {bits.map((b) => (
        <span
          key={b.i}
          className={`fest-bit fest-bit--${ambient}`}
          style={
            {
              left: `${b.left}%`,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.dur}s`,
              ["--drift" as string]: b.drift,
              transform: `scale(${b.scale})`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * CELEBRATION — cinematic scenes + the signature wow moment
 * ------------------------------------------------------------------ */
function CelebrationMode({
  festival,
  exp,
}: {
  festival: Festival;
  exp: FestivalExperience;
}) {
  const { bi } = useTranslation();
  return (
    <div className="mx-auto max-w-4xl">
      {/* Opening title card */}
      <div className="mx-auto mt-2 max-w-2xl pt-6 text-center sm:pt-10">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[rgb(var(--accent))]">
          {bi("An immersive experience", "ಒಂದು ಅನುಭವ")}
        </p>
        <h2 className="mt-3 text-pretty text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
          {bi(exp.taglineEn, exp.taglineKn)}
        </h2>
        <div className="mt-5 flex justify-center">
          <ReadAloud
            textEn={exp.taglineEn}
            textKn={exp.taglineKn}
            label={bi("Listen", "ಕೇಳಿ")}
          />
        </div>
        <div className="mt-8 flex flex-col items-center gap-1 text-white/50">
          <span className="text-[11px] uppercase tracking-widest">
            {bi("Scroll to begin", "ಆರಂಭಿಸಲು ಸ್ಕ್ರಾಲ್ ಮಾಡಿ")}
          </span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </div>
      </div>

      {/* The wow moment */}
      <div className="mt-16">
        <WowMoment festival={festival} exp={exp} />
      </div>

      {/* Cinematic scenes, revealed one by one */}
      <div className="mt-20 space-y-16 sm:space-y-28">
        {exp.scenes.map((s, i) => (
          <SceneBlock key={i} scene={s} />
        ))}
      </div>

      {/* Did you know */}
      {exp.facts.length > 0 && (
        <div className="mt-24">
          <FactReveals exp={exp} />
        </div>
      )}
    </div>
  );
}

function SceneBlock({
  scene,
}: {
  scene: FestivalExperience["scenes"][number];
}) {
  const { bi } = useTranslation();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setShown(true), io.disconnect()),
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const full = scene.side === "full" || !scene.side;
  const right = scene.side === "right";

  return (
    <div
      ref={ref}
      className={cn(
        "grid items-center gap-6 transition-all duration-700 ease-out sm:gap-10",
        full ? "grid-cols-1" : "sm:grid-cols-2",
        shown ? "translate-y-0 opacity-100 blur-0" : "translate-y-8 opacity-0 blur-sm",
      )}
    >
      <JourneyFigure
        wiki={scene.imageTitle ?? scene.wiki}
        alt={scene.en}
        kenBurns
        rounded="3xl"
        className={cn(
          "aspect-[16/10] w-full shadow-2xl ring-1 ring-white/10",
          full && "aspect-[16/9] sm:aspect-[2/1]",
          right && "sm:order-2",
        )}
      />
      <div className={cn(full && "mx-auto max-w-2xl text-center")}>
        {scene.kickerEn && (
          <p className="mb-2 text-[11px] uppercase tracking-[0.25em] text-[rgb(var(--accent))]">
            {bi(scene.kickerEn, scene.kickerKn ?? scene.kickerEn)}
          </p>
        )}
        <p className="text-pretty text-xl font-medium leading-snug sm:text-3xl">
          {bi(scene.en, scene.kn)}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * WOW MOMENTS
 * ------------------------------------------------------------------ */
function WowMoment({
  festival,
  exp,
}: {
  festival: Festival;
  exp: FestivalExperience;
}) {
  if (exp.wow === "rangoli") return <RangoliWow />;
  if (exp.wow === "ruins") return <ReconstructWow festival={festival} exp={exp} />;
  if (exp.wow === "buffalo") return <BuffaloWow />;
  return <IgniteWow festival={festival} exp={exp} />;
}

/** Lights / palace / torch / bloom — ignite a field of points of light. */
function IgniteWow({
  festival,
  exp,
}: {
  festival: Festival;
  exp: FestivalExperience;
}) {
  const { bi } = useTranslation();
  const total = 48;
  const [lit, setLit] = React.useState<boolean[]>(() =>
    Array(total).fill(false),
  );
  const litCount = lit.filter(Boolean).length;
  const ratio = litCount / total;
  const done = litCount === total;

  const icon =
    exp.wow === "palace" || exp.ambient === "royal"
      ? "💡"
      : exp.ambient === "torch"
        ? "🔥"
        : exp.ambient === "kite"
          ? "🪁"
          : exp.wow === "bloom"
            ? "🌸"
            : "🪔";

  const ignite = React.useCallback((i: number) => {
    setLit((p) => {
      if (p[i]) return p;
      const n = [...p];
      n[i] = true;
      return n;
    });
  }, []);

  const lightAll = React.useCallback(() => {
    let i = 0;
    const id = setInterval(() => {
      setLit((p) => {
        const n = [...p];
        for (let k = 0; k < 3 && i < total; k++, i++) n[i] = true;
        return n;
      });
      if (i >= total) clearInterval(id);
    }, 45);
  }, []);

  const titles: Record<string, [string, string]> = {
    palace: ["Light the palace", "ಅರಮನೆಯನ್ನು ಬೆಳಗಿಸಿ"],
    lamps: ["Light a thousand lamps", "ಸಾವಿರ ದೀಪಗಳನ್ನು ಹಚ್ಚಿ"],
    bloom: ["Make the flowers bloom", "ಹೂವುಗಳನ್ನು ಅರಳಿಸಿ"],
    crown: ["Light the celebration", "ಆಚರಣೆಯನ್ನು ಬೆಳಗಿಸಿ"],
    chariot: ["Light the way", "ದಾರಿಯನ್ನು ಬೆಳಗಿಸಿ"],
  };
  const [tEn, tKn] = titles[exp.wow] ?? titles.lamps;

  return (
    <div className="mx-auto max-w-4xl">
      <WowHeader
        en={tEn}
        kn={tKn}
        hintEn="Tap the lights — or light them all"
        hintKn="ದೀಪಗಳನ್ನು ಮುಟ್ಟಿ — ಅಥವಾ ಎಲ್ಲವನ್ನೂ ಬೆಳಗಿಸಿ"
      />

      <div className="relative mt-6 overflow-hidden rounded-3xl ring-1 ring-white/10">
        {/* The festival photo behind the lights */}
        <JourneyFigure
          wiki={exp.heroImageTitle ?? exp.hero}
          alt={festival.nameEn}
          rounded="none"
          kenBurns
          className="aspect-[16/10] w-full sm:aspect-[2/1]"
        />
        {/* darkening that lifts as more lights ignite */}
        <div
          className="pointer-events-none absolute inset-0 bg-black transition-opacity duration-700"
          style={{ opacity: 0.7 - ratio * 0.62 }}
        />
        {/* warm glow that grows from the base */}
        <div
          className="fest-glow-veil pointer-events-none absolute inset-0"
          style={{ opacity: ratio }}
        />

        {/* Lamp grid */}
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 place-items-center p-3 sm:p-6">
          {lit.map((on, i) => (
            <button
              key={i}
              onMouseEnter={() => ignite(i)}
              onClick={() => ignite(i)}
              aria-label="Light"
              className={cn(
                "fest-lamp select-none text-base leading-none sm:text-2xl",
                on && "is-lit",
              )}
            >
              {icon}
            </button>
          ))}
        </div>

        {/* Counter */}
        <div className="absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1 text-xs font-medium backdrop-blur">
          {litCount} / {total}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-3">
        {!done ? (
          <button
            onClick={lightAll}
            className="fest-invite inline-flex items-center gap-2 rounded-full bg-[rgb(var(--accent))] px-5 py-2.5 text-sm font-semibold text-black transition-transform active:scale-95"
          >
            <Lightbulb className="h-4 w-4" />
            {bi("Light them all", "ಎಲ್ಲವನ್ನೂ ಬೆಳಗಿಸಿ")}
          </button>
        ) : (
          <p className="animate-pulse text-sm font-medium text-[rgb(var(--accent))]">
            ✨ {bi("Beautiful. Now scroll on.", "ಸುಂದರ. ಈಗ ಮುಂದೆ ಸಾಗಿ.")}
          </p>
        )}
      </div>
    </div>
  );
}

/** A rangoli that draws itself. */
function RangoliWow() {
  const { bi } = useTranslation();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [drawn, setDrawn] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setDrawn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setDrawn(true), 250);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const petals = Array.from({ length: 12 });

  return (
    <div ref={ref} className="mx-auto max-w-3xl">
      <WowHeader
        en="A rangoli draws itself"
        kn="ರಂಗೋಲಿ ತಾನೇ ಬಿಡಿಸಿಕೊಳ್ಳುತ್ತದೆ"
        hintEn="Watch the courtyard art appear"
        hintKn="ಅಂಗಳದ ಕಲೆ ಮೂಡುವುದನ್ನು ನೋಡಿ"
      />
      <div className="mt-6 grid place-items-center">
        <svg
          viewBox="-110 -110 220 220"
          className={cn("fest-draw h-72 w-72 sm:h-96 sm:w-96", drawn && "is-drawn")}
          fill="none"
          stroke="rgb(var(--accent))"
          strokeWidth={1.6}
        >
          {[90, 70, 50, 30].map((r, i) => (
            <circle
              key={i}
              cx={0}
              cy={0}
              r={r}
              style={{ ["--len" as string]: 2 * Math.PI * r, transitionDelay: `${i * 0.2}s` }}
            />
          ))}
          {petals.map((_, i) => {
            const a = (i / petals.length) * Math.PI * 2;
            const x = Math.cos(a) * 70;
            const y = Math.sin(a) * 70;
            return (
              <circle
                key={`p${i}`}
                cx={x}
                cy={y}
                r={16}
                stroke="rgb(var(--accent2))"
                style={{ ["--len" as string]: 2 * Math.PI * 16, transitionDelay: `${0.8 + i * 0.05}s` }}
              />
            );
          })}
          {petals.map((_, i) => {
            const a = (i / petals.length) * Math.PI * 2;
            const x = Math.cos(a) * 95;
            const y = Math.sin(a) * 95;
            return (
              <line
                key={`l${i}`}
                x1={0}
                y1={0}
                x2={x}
                y2={y}
                style={{ ["--len" as string]: 135, transitionDelay: `${0.4 + i * 0.04}s` }}
              />
            );
          })}
        </svg>
      </div>
      <p className="mt-4 text-center text-sm text-white/70">
        {bi(
          "Every morning, fresh rice-flour rangoli welcomes the day.",
          "ಪ್ರತಿ ಬೆಳಗ್ಗೆ, ತಾಜಾ ಅಕ್ಕಿ ಹಿಟ್ಟಿನ ರಂಗೋಲಿ ದಿನವನ್ನು ಸ್ವಾಗತಿಸುತ್ತದೆ.",
        )}
      </p>
    </div>
  );
}

/** Hampi reconstructs — drag/scrub from ruin to glory. */
function ReconstructWow({
  festival,
  exp,
}: {
  festival: Festival;
  exp: FestivalExperience;
}) {
  const { bi } = useTranslation();
  const [v, setV] = React.useState(0); // 0 = ruin, 100 = reconstructed

  return (
    <div className="mx-auto max-w-4xl">
      <WowHeader
        en="Rebuild the empire, stone by stone"
        kn="ಕಲ್ಲಿನಿಂದ ಕಲ್ಲಿಗೆ ಸಾಮ್ರಾಜ್ಯವನ್ನು ಮರುಕಟ್ಟಿ"
        hintEn="Drag the slider to raise Hampi from the dust"
        hintKn="ಸ್ಲೈಡರ್ ಎಳೆದು ಹಂಪಿಯನ್ನು ಎಬ್ಬಿಸಿ"
      />
      <div className="relative mt-6 overflow-hidden rounded-3xl ring-1 ring-white/10">
        <JourneyFigure
          wiki={exp.heroImageTitle ?? exp.hero}
          alt={festival.nameEn}
          rounded="none"
          className="aspect-[16/10] w-full sm:aspect-[2/1]"
        />
        {/* Ruin veil: desaturate + darken, lifting as v rises */}
        <div
          className="pointer-events-none absolute inset-0 backdrop-grayscale transition-opacity duration-300"
          style={{ opacity: 1 - v / 100 }}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-black transition-opacity duration-300"
          style={{ opacity: 0.55 - (v / 100) * 0.5 }}
        />
        <div
          className="fest-glow-veil pointer-events-none absolute inset-0"
          style={{ opacity: (v / 100) * 0.9 }}
        />
        <div className="absolute right-4 top-4 rounded-full bg-black/40 px-3 py-1 text-xs font-medium backdrop-blur">
          {v < 15
            ? bi("Ruins", "ಅವಶೇಷ")
            : v > 85
              ? bi("Restored", "ಪುನರುಜ್ಜೀವನ")
              : bi("Rising…", "ಏಳುತ್ತಿದೆ…")}
        </div>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={v}
        onChange={(e) => setV(Number(e.target.value))}
        aria-label="Reconstruct"
        className="mt-5 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-[rgb(var(--accent))]"
      />
    </div>
  );
}

/** Kambala — a buffalo race that follows your press. */
function BuffaloWow() {
  const { bi } = useTranslation();
  const [progress, setProgress] = React.useState(0);
  const [racing, setRacing] = React.useState(false);
  const [finished, setFinished] = React.useState(false);
  const raf = React.useRef<number | null>(null);

  const start = React.useCallback(() => {
    if (racing || finished) return;
    setRacing(true);
    const begun = performance.now();
    const dur = 3200;
    const tick = (now: number) => {
      const p = Math.min(1, (now - begun) / dur);
      setProgress(p * 100);
      if (p < 1) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setRacing(false);
        setFinished(true);
      }
    };
    raf.current = requestAnimationFrame(tick);
  }, [racing, finished]);

  React.useEffect(
    () => () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    },
    [],
  );

  return (
    <div className="mx-auto max-w-4xl">
      <WowHeader
        en="Run the Kambala"
        kn="ಕಂಬಳ ಓಡಿಸಿ"
        hintEn="Start the race through the paddy slush"
        hintKn="ಗದ್ದೆಯ ಕೆಸರಿನಲ್ಲಿ ಓಟ ಆರಂಭಿಸಿ"
      />
      <div className="relative mt-6 h-44 overflow-hidden rounded-3xl bg-gradient-to-b from-[rgb(var(--accent)/0.18)] to-[rgb(var(--accent2)/0.25)] ring-1 ring-white/10 sm:h-52">
        {/* water track */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,rgb(var(--accent)/0.35),rgb(var(--accent2)/0.45))]" />
        {/* lane markers */}
        <div className="absolute inset-0 opacity-40 [background:repeating-linear-gradient(90deg,transparent,transparent_56px,rgba(255,255,255,0.25)_56px,rgba(255,255,255,0.25)_58px)]" />
        {/* finish line */}
        <div className="absolute bottom-0 right-6 top-0 w-1 bg-white/70" />
        {/* the runner */}
        <div
          className="absolute bottom-8 text-4xl transition-none sm:text-5xl"
          style={{
            left: `calc(${progress}% * 0.86 + 4px)`,
            transform: `scaleX(-1) ${racing ? "translateY(-2px)" : ""}`,
          }}
        >
          🐃
        </div>
        {/* splash */}
        {racing && (
          <div
            className="absolute bottom-6 text-2xl"
            style={{ left: `calc(${progress}% * 0.86 - 18px)` }}
          >
            💦
          </div>
        )}
      </div>
      <div className="mt-5 flex justify-center">
        {finished ? (
          <p className="animate-pulse text-sm font-semibold text-[rgb(var(--accent))]">
            🏁 {bi("What a run! The village roars.", "ಎಂಥಾ ಓಟ! ಹಳ್ಳಿ ಗರ್ಜಿಸುತ್ತದೆ.")}
          </p>
        ) : (
          <button
            onClick={start}
            disabled={racing}
            className="fest-invite inline-flex items-center gap-2 rounded-full bg-[rgb(var(--accent))] px-5 py-2.5 text-sm font-semibold text-black transition-transform active:scale-95 disabled:opacity-70"
          >
            {racing ? bi("Racing…", "ಓಡುತ್ತಿದೆ…") : bi("Start the race", "ಓಟ ಆರಂಭಿಸಿ")}
          </button>
        )}
      </div>
    </div>
  );
}

function WowHeader({
  en,
  kn,
  hintEn,
  hintKn,
}: {
  en: string;
  kn: string;
  hintEn: string;
  hintKn: string;
}) {
  const { bi } = useTranslation();
  return (
    <div className="text-center">
      <p className="text-[11px] uppercase tracking-[0.3em] text-[rgb(var(--accent))]">
        {bi("Wow moment", "ಅದ್ಭುತ ಕ್ಷಣ")}
      </p>
      <h3 className="mt-2 text-2xl font-bold tracking-tight sm:text-4xl">
        {bi(en, kn)}
      </h3>
      <p className="mt-2 text-sm text-white/60">{bi(hintEn, hintKn)}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * HERITAGE
 * ------------------------------------------------------------------ */
function HeritageMode({ exp }: { exp: FestivalExperience }) {
  const { bi } = useTranslation();
  return (
    <div className="mx-auto max-w-3xl pt-8">
      <SectionTitle en="History & evolution" kn="ಇತಿಹಾಸ ಮತ್ತು ವಿಕಾಸ" />
      <ol className="relative mt-8 space-y-8 border-l border-white/15 pl-6">
        {exp.heritageEn.map((p, i) => (
          <li key={i} className="relative">
            <span className="absolute -left-[1.65rem] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[rgb(var(--accent))] text-[10px] font-bold text-black">
              {i + 1}
            </span>
            <p className="text-pretty text-base leading-relaxed text-white/85 sm:text-lg">
              {bi(p, exp.heritageKn[i] ?? p)}
            </p>
          </li>
        ))}
      </ol>

      {exp.legendEn && (
        <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[rgb(var(--accent))]">
            {bi("The legend", "ದಂತಕಥೆ")}
          </p>
          <p className="mt-3 text-pretty text-lg font-medium italic leading-relaxed sm:text-xl">
            “{bi(exp.legendEn, exp.legendKn)}”
          </p>
          <div className="mt-4">
            <ReadAloud
              textEn={exp.legendEn}
              textKn={exp.legendKn}
              label={bi("Listen", "ಕೇಳಿ")}
            />
          </div>
        </div>
      )}

      {exp.kingsEn && (
        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-5">
          <Crown className="mt-0.5 h-5 w-5 shrink-0 text-[rgb(var(--accent))]" />
          <div>
            <p className="text-xs uppercase tracking-wider text-white/50">
              {bi("Patrons & kings", "ಪೋಷಕರು ಮತ್ತು ಅರಸರು")}
            </p>
            <p className="mt-1 font-medium">{bi(exp.kingsEn, exp.kingsKn)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * FOOD
 * ------------------------------------------------------------------ */
function FoodMode({ exp }: { exp: FestivalExperience }) {
  const { bi } = useTranslation();
  if (exp.foods.length === 0) return <EmptyMode />;
  return (
    <div className="mx-auto max-w-4xl pt-8">
      <SectionTitle en="Taste the festival" kn="ಹಬ್ಬವನ್ನು ಸವಿಯಿರಿ" />
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {exp.foods.map((f, i) => (
          <div
            key={i}
            className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur transition-transform hover:-translate-y-1"
          >
            <JourneyFigure
              wiki={f.imageTitle ?? f.wiki}
              alt={f.nameEn}
              rounded="none"
              className="aspect-[4/3] w-full"
            />
            <div className="p-5">
              <h4 className="text-lg font-semibold tracking-tight">
                {bi(f.nameEn, f.nameKn)}
              </h4>
              <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                {bi(f.noteEn, f.noteKn)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * CULTURE
 * ------------------------------------------------------------------ */
function CultureMode({ exp }: { exp: FestivalExperience }) {
  const { bi } = useTranslation();
  if (exp.culture.length === 0) return <EmptyMode />;
  return (
    <div className="mx-auto max-w-3xl pt-8">
      <SectionTitle en="Clothing, dance, music & craft" kn="ಉಡುಗೆ, ನೃತ್ಯ, ಸಂಗೀತ, ಕಲೆ" />
      <div className="mt-8 space-y-5">
        {exp.culture.map((c, i) => (
          <div
            key={i}
            className="flex items-start gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur sm:p-6"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[rgb(var(--accent)/0.18)] text-2xl">
              {c.icon}
            </span>
            <div>
              <h4 className="font-semibold tracking-tight text-[rgb(var(--accent))]">
                {bi(c.labelEn, c.labelKn)}
              </h4>
              <p className="mt-1 text-pretty leading-relaxed text-white/85">
                {bi(c.en, c.kn)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * JOURNEY — where it's celebrated
 * ------------------------------------------------------------------ */
function JourneyMode({
  festival,
  exp,
}: {
  festival: Festival;
  exp: FestivalExperience;
}) {
  const { bi } = useTranslation();
  const statewide = festival.district === "Statewide";
  return (
    <div className="mx-auto max-w-3xl pt-8">
      <SectionTitle en="Where it lives" kn="ಎಲ್ಲಿ ಆಚರಿಸಲಾಗುತ್ತದೆ" />
      <div className="mt-8 overflow-hidden rounded-3xl ring-1 ring-white/10">
        <div className="relative">
          <JourneyFigure
            wiki={exp.heroImageTitle ?? exp.hero}
            alt={festival.placeEn}
            rounded="none"
            className="aspect-[16/9] w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-4 left-5 flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="journey-pin-ping absolute inline-flex h-full w-full rounded-full bg-[rgb(var(--accent))]" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-[rgb(var(--accent))]" />
            </span>
            <p className="text-lg font-semibold drop-shadow">
              {bi(festival.placeEn, festival.placeKn)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <InfoCard
          icon={<MapPin className="h-5 w-5" />}
          labelEn="Heartland"
          labelKn="ಮೂಲ ಸ್ಥಳ"
          valueEn={festival.placeEn}
          valueKn={festival.placeKn}
        />
        <InfoCard
          icon={<Sparkles className="h-5 w-5" />}
          labelEn="Reach"
          labelKn="ವ್ಯಾಪ್ತಿ"
          valueEn={statewide ? "Across all of Karnataka" : `${festival.district} & beyond`}
          valueKn={statewide ? "ಕರ್ನಾಟಕದಾದ್ಯಂತ" : `${festival.placeKn} ಮತ್ತು ಸುತ್ತಲೂ`}
        />
      </div>

      <p className="mt-6 text-pretty leading-relaxed text-white/75">
        {bi(festival.descEn, festival.descKn)}
      </p>
    </div>
  );
}

function InfoCard({
  icon,
  labelEn,
  labelKn,
  valueEn,
  valueKn,
}: {
  icon: React.ReactNode;
  labelEn: string;
  labelKn: string;
  valueEn: string;
  valueKn: string;
}) {
  const { bi } = useTranslation();
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <span className="mt-0.5 text-[rgb(var(--accent))]">{icon}</span>
      <div>
        <p className="text-xs uppercase tracking-wider text-white/50">
          {bi(labelEn, labelKn)}
        </p>
        <p className="mt-0.5 font-medium">{bi(valueEn, valueKn)}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * GALLERY — fullscreen cinematic image wall
 * ------------------------------------------------------------------ */
function GalleryMode({
  festival,
  exp,
}: {
  festival: Festival;
  exp: FestivalExperience;
}) {
  const { bi } = useTranslation();
  const images = exp.gallery.length ? exp.gallery : [exp.heroImageTitle ?? exp.hero];
  return (
    <div className="mx-auto max-w-5xl pt-8">
      <SectionTitle en="A cinematic gallery" kn="ಚಿತ್ರ ವೈಭವ" />
      <p className="mt-2 text-center text-sm text-white/60">
        {bi("Minimal words. Just Karnataka, in light.", "ಕಡಿಮೆ ಪದಗಳು. ಬೆಳಕಿನಲ್ಲಿ ಕರ್ನಾಟಕ.")}
      </p>
      <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {images.map((g, i) => (
          <JourneyFigure
            key={i}
            wiki={g}
            alt={`${festival.nameEn} ${i + 1}`}
            rounded="2xl"
            kenBurns={i % 3 === 0}
            className={cn(
              "w-full ring-1 ring-white/10",
              i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/3]",
            )}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * KIDS
 * ------------------------------------------------------------------ */
function KidsMode({
  festival,
  exp,
}: {
  festival: Festival;
  exp: FestivalExperience;
}) {
  const { bi } = useTranslation();
  if (!exp.kidsEn) return <EmptyMode />;
  return (
    <div className="mx-auto max-w-2xl pt-10 text-center">
      <div className="text-7xl sm:text-8xl">{festival.emoji}</div>
      <SectionTitle en="A little story" kn="ಪುಟ್ಟ ಕಥೆ" />
      <p className="mt-6 text-pretty text-xl font-medium leading-relaxed text-white/90 sm:text-2xl">
        {bi(exp.kidsEn, exp.kidsKn)}
      </p>
      <div className="mt-6 flex justify-center">
        <ReadAloud
          textEn={exp.kidsEn}
          textKn={exp.kidsKn}
          label={bi("Read it to me", "ನನಗೆ ಓದಿ")}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Shared bits
 * ------------------------------------------------------------------ */
function SectionTitle({ en, kn }: { en: string; kn: string }) {
  const { bi } = useTranslation();
  return (
    <div className="text-center">
      <span className="mx-auto block h-px w-12 bg-[rgb(var(--accent))]" />
      <h3 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
        {bi(en, kn)}
      </h3>
    </div>
  );
}

function FactReveals({ exp }: { exp: FestivalExperience }) {
  const { bi } = useTranslation();
  const [open, setOpen] = React.useState<number | null>(0);
  return (
    <div className="mx-auto max-w-2xl">
      <SectionTitle en="Did you know?" kn="ನಿಮಗೆ ಗೊತ್ತೇ?" />
      <div className="mt-6 space-y-3">
        {exp.facts.map((f, i) => {
          const isOpen = open === i;
          return (
            <button
              key={i}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-left backdrop-blur transition-colors hover:bg-white/10"
            >
              <span className="mt-0.5 text-[rgb(var(--accent))]">✦</span>
              <span
                className={cn(
                  "text-pretty leading-relaxed transition-all",
                  isOpen ? "text-white/90" : "line-clamp-1 text-white/55",
                )}
              >
                {bi(f.en, f.kn)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function EmptyMode() {
  const { bi } = useTranslation();
  return (
    <div className="mx-auto max-w-md py-24 text-center text-white/50">
      <Sparkles className="mx-auto h-8 w-8 text-[rgb(var(--accent))]" />
      <p className="mt-4">
        {bi(
          "This chapter is being written. Explore the other modes meanwhile.",
          "ಈ ಅಧ್ಯಾಯ ಬರೆಯಲ್ಪಡುತ್ತಿದೆ. ಅಲ್ಲಿಯವರೆಗೆ ಇತರ ವಿಧಾನಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.",
        )}
      </p>
    </div>
  );
}
