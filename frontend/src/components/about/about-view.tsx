"use client";

import * as React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { Heart, Hourglass, MapPin, Moon, Quote, Sparkles, Sprout } from "lucide-react";

import { useTranslation } from "@/i18n/language-provider";
import { Reveal } from "@/components/ui/reveal";

/**
 * AboutView — "ನಮ್ಮ ಕಥೆ / Our Story".
 *
 * The emotional heart of Akkaverse. A cinematic, scroll-choreographed essay
 * that moves from nostalgia → loss → hope → legacy, told through alternating
 * photo scenes, an animated Karnataka memory-map, and a screenshot quote.
 * Fully bilingual via `bi()`.
 */

type Scene = {
  icon: React.ComponentType<{ className?: string }>;
  label: [string, string];
  paras: [string, string][];
  /** Optional gradient "moment" rendered large inside the scene. */
  highlight?: [string, string];
  image: { src: string; caption: [string, string] };
};

const SCENES: Scene[] = [
  {
    icon: Moon,
    label: ["The evenings we remember", "ನಾವು ನೆನಪಿಸಿಕೊಳ್ಳುವ ಸಂಜೆಗಳು"],
    paras: [
      [
        "We grew up in the golden hour after supper. Grandparents on the veranda, a lamp flickering, a tale that always began, \u2018Long, long ago\u2026\u2019",
        "ಊಟದ ನಂತರದ ಆ ಸುವರ್ಣ ಸಂಜೆಯಲ್ಲಿ ನಾವು ಬೆಳೆದೆವು. ಜಗುಲಿಯ ಮೇಲೆ ಅಜ್ಜ-ಅಜ್ಜಿ, ಮಿನುಗುವ ದೀಪ, ಮತ್ತು ಯಾವಾಗಲೂ \u2018ಒಂದಾನೊಂದು ಕಾಲದಲ್ಲಿ\u2026\u2019 ಎಂದು ಆರಂಭವಾಗುವ ಕಥೆ.",
      ],
      [
        "Festival drums. The buzz of the temple fair. The smell of the first rain on red earth. Small moments \u2014 but they made us who we are.",
        "ಹಬ್ಬದ ತಮಟೆ. ಜಾತ್ರೆಯ ಸಂಭ್ರಮ. ಕೆಂಪು ಮಣ್ಣಿನ ಮೇಲೆ ಮೊದಲ ಮಳೆಯ ಘಮ. ಚಿಕ್ಕ ಕ್ಷಣಗಳು \u2014 ಆದರೆ ಅವೇ ನಮ್ಮನ್ನು ರೂಪಿಸಿದವು.",
      ],
    ],
    image: {
      src: "/districts/kodagu.jpg",
      caption: ["Village evenings", "ಹಳ್ಳಿಯ ಸಂಜೆಗಳು"],
    },
  },
  {
    icon: Hourglass,
    label: ["And then, the world grew quiet", "ಆಮೇಲೆ, ಜಗತ್ತು ಮೌನವಾಯಿತು"],
    paras: [
      [
        "Somewhere along the way, screens replaced circles. Children grew up an ocean away from their village. Kannada was spoken a little softer each year.",
        "ದಾರಿಯಲ್ಲೆಲ್ಲೋ, ಒಟ್ಟಿಗೆ ಕುಳಿತ ವೃತ್ತಗಳ ಜಾಗವನ್ನು ಪರದೆಗಳು ಆಕ್ರಮಿಸಿದವು. ಮಕ್ಕಳು ತಮ್ಮ ಊರಿನಿಂದ ಸಮುದ್ರದಷ್ಟು ದೂರದಲ್ಲಿ ಬೆಳೆದರು. ಪ್ರತಿ ವರ್ಷವೂ ಕನ್ನಡ ಸ್ವಲ್ಪ ಮೆಲ್ಲಗಾಯಿತು.",
      ],
      [
        "And one day, the storyteller was gone \u2014 and the stories went with them. Not lost to time. Just never written down.",
        "ಒಂದು ದಿನ, ಕಥೆ ಹೇಳುತ್ತಿದ್ದವರು ಹೊರಟುಹೋದರು \u2014 ಕಥೆಗಳೂ ಅವರೊಂದಿಗೆ ಹೋದವು. ಕಾಲಕ್ಕೆ ಕಳೆದುಹೋಗಿಲ್ಲ. ಬರೀ ಯಾರೂ ಬರೆದಿಡಲಿಲ್ಲ.",
      ],
    ],
    image: {
      src: "/districts/hassan.jpg",
      caption: ["Fading echoes", "ಮರೆಯಾಗುವ ಪ್ರತಿಧ್ವನಿಗಳು"],
    },
  },
  {
    icon: Sparkles,
    label: ["So we built a bridge back home", "ಆದ್ದರಿಂದ ನಾವು ಮನೆಗೊಂದು ಸೇತುವೆ ಕಟ್ಟಿದೆವು"],
    paras: [
      [
        "What pulled us apart could also bring us home. A screen could hold a grandmother\u2019s voice forever \u2014 and hand it to a child who has never seen her village.",
        "ನಮ್ಮನ್ನು ದೂರ ಮಾಡಿದ್ದೇ ನಮ್ಮನ್ನು ಮನೆಗೂ ಕರೆತರಬಲ್ಲದು. ಪರದೆಯೊಂದು ಅಜ್ಜಿಯ ಧ್ವನಿಯನ್ನು ಶಾಶ್ವತವಾಗಿ ಹಿಡಿದಿಟ್ಟು, ಆಕೆಯ ಊರನ್ನೇ ನೋಡಿರದ ಮಗುವಿಗೆ ತಲುಪಿಸಬಲ್ಲದು.",
      ],
    ],
    highlight: ["This became Akkaverse.", "ಇದೇ ಅಕ್ಕಾವರ್ಸ್ ಆಯಿತು."],
    image: {
      src: "/districts/mysuru.jpg",
      caption: ["A living bridge", "ಜೀವಂತ ಸೇತುವೆ"],
    },
  },
  {
    icon: Sprout,
    label: ["A thread, unbroken", "ಮುರಿಯದ ಎಳೆ"],
    paras: [
      [
        "Not an app \u2014 a keeping-place. For our language, our tales, our festivals, and the memories too precious to lose.",
        "ಒಂದು ಆ್ಯಪ್ ಅಲ್ಲ \u2014 ಒಂದು ನೆಲೆ. ನಮ್ಮ ಭಾಷೆ, ಕಥೆಗಳು, ಹಬ್ಬಗಳು ಮತ್ತು ಕಳೆದುಕೊಳ್ಳಲಾಗದ ಅಮೂಲ್ಯ ನೆನಪುಗಳಿಗೊಂದು ನೆಲೆ.",
      ],
      [
        "Heritage is not a museum. It is a living thread, passed hand to hand \u2014 so a child born far from Karnataka can still find the way home, in their mother tongue.",
        "ಪರಂಪರೆ ವಸ್ತುಸಂಗ್ರಹಾಲಯವಲ್ಲ. ಅದು ಕೈಯಿಂದ ಕೈಗೆ ಸಾಗುವ ಜೀವಂತ ಎಳೆ \u2014 ಕರ್ನಾಟಕದಿಂದ ದೂರ ಹುಟ್ಟಿದ ಮಗುವೂ ತನ್ನ ಮಾತೃಭಾಷೆಯಲ್ಲಿ ಮನೆಯ ದಾರಿ ಕಂಡುಕೊಳ್ಳಲಿ.",
      ],
    ],
    image: {
      src: "/districts/ballari.jpg",
      caption: ["Roots that remain", "ಉಳಿಯುವ ಬೇರುಗಳು"],
    },
  },
];

/** Photos for the opening triptych. */
const TRIPTYCH: { src: string; caption: [string, string] }[] = [
  { src: "/districts/chikkaballapura.jpg", caption: ["Home", "ಊರು"] },
  { src: "/districts/mysuru.jpg", caption: ["Festivals", "ಹಬ್ಬಗಳು"] },
  { src: "/districts/udupi.jpg", caption: ["Traditions", "ಸಂಪ್ರದಾಯಗಳು"] },
];

/** Pins that pulse across the Karnataka memory-map. */
const MEMORY_PINS: {
  name: [string, string];
  coordinates: [number, number];
  home?: boolean;
}[] = [
  { name: ["Belagavi", "ಬೆಳಗಾವಿ"], coordinates: [74.5, 15.85] },
  { name: ["Kalaburagi", "ಕಲಬುರಗಿ"], coordinates: [76.83, 17.33] },
  { name: ["Hampi", "ಹಂಪೆ"], coordinates: [76.47, 15.33] },
  { name: ["Udupi", "ಉಡುಪಿ"], coordinates: [74.74, 13.34] },
  { name: ["Bengaluru", "ಬೆಂಗಳೂರು"], coordinates: [77.59, 12.97] },
  { name: ["Mysuru", "ಮೈಸೂರು"], coordinates: [76.65, 12.3] },
  { name: ["Lakkahalli", "ಲಕ್ಕಹಳ್ಳಿ"], coordinates: [77.73, 13.43], home: true },
];

const GEO_URL = "/karnataka.geojson";

/** A photo card with a graceful gradient fallback if the image is missing. */
function PhotoCard({
  src,
  alt,
  caption,
  className,
}: {
  src: string;
  alt: string;
  caption: string;
  className?: string;
}) {
  const [ok, setOk] = React.useState(true);
  return (
    <div
      className={
        "group/photo relative overflow-hidden rounded-3xl border border-border/70 shadow-soft " +
        (className ?? "")
      }
    >
      {ok ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setOk(false)}
          className="h-full w-full object-cover transition-transform [transition-duration:1.4s] ease-out group-hover/photo:scale-110"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/30 via-amber-400/20 to-orange-500/25">
          <MapPin className="h-8 w-8 text-primary/70" />
        </div>
      )}
      {/* warm wash + caption */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
      <span className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1 text-xs font-medium text-white backdrop-blur">
        <MapPin className="h-3 w-3" />
        {caption}
      </span>
    </div>
  );
}

/** Non-interactive, decorative Karnataka map with pulsing memory pins. */
function MemoryMap({ label }: { label: (en: string, kn: string) => string }) {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: [76.6, 14.9], scale: 3600 }}
        width={520}
        height={560}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: "hsl(var(--primary) / 0.10)",
                    stroke: "hsl(var(--primary) / 0.40)",
                    strokeWidth: 0.5,
                    outline: "none",
                  },
                  hover: {
                    fill: "hsl(var(--primary) / 0.22)",
                    stroke: "hsl(var(--primary) / 0.6)",
                    strokeWidth: 0.7,
                    outline: "none",
                  },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {MEMORY_PINS.map((pin, i) => (
          <Marker key={pin.name[0]} coordinates={pin.coordinates}>
            {/* pulsing halo */}
            <circle
              r={pin.home ? 9 : 7}
              className="journey-pin-ping fill-primary/40"
              style={{ animationDelay: `${i * 0.35}s` }}
            />
            {/* solid dot */}
            <circle
              r={pin.home ? 4.5 : 3}
              className="fill-primary"
              stroke="hsl(var(--background))"
              strokeWidth={1}
            />
            {pin.home && (
              <text
                textAnchor="middle"
                y={-12}
                className="fill-primary text-[10px] font-semibold"
                style={{ fontFamily: "inherit" }}
              >
                {label("Lakkahalli", "ಲಕ್ಕಹಳ್ಳಿ")}
              </text>
            )}
          </Marker>
        ))}
      </ComposableMap>

      {/* soft glow under the map */}
      <div className="pointer-events-none absolute inset-0 -z-10 blur-3xl">
        <div className="aurora-blob left-1/4 top-1/3 h-56 w-56 bg-primary/20" />
        <div className="aurora-blob right-1/4 bottom-1/4 h-56 w-56 bg-amber-400/20" />
      </div>
    </div>
  );
}

export function AboutView() {
  const { bi } = useTranslation();
  const [photoOk, setPhotoOk] = React.useState(true);

  return (
    <div className="relative overflow-hidden">
      {/* Ambient backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora-blob left-[10%] top-24 h-72 w-72 animate-float-slow bg-primary/25" />
        <div className="aurora-blob right-[8%] top-[38rem] h-80 w-80 animate-float bg-amber-400/20" />
        <div className="absolute inset-0 bg-dotgrid [mask-image:radial-gradient(70%_55%_at_50%_10%,#000,transparent)]" />
      </div>

      {/* ===================== HERO / HOOK ===================== */}
      <header className="container relative max-w-4xl pt-16 text-center md:pt-28">
        <Reveal>
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground shadow-soft">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            {bi("Our Story", "ನಮ್ಮ ಕಥೆ")}
          </span>
        </Reveal>

        <Reveal delay={80}>
          <Quote className="mx-auto mt-8 h-10 w-10 rotate-180 text-primary/40 md:h-12 md:w-12" />
        </Reveal>

        <Reveal delay={140}>
          <h1 className="mt-4 text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {bi("Every family carries", "ಪ್ರತಿ ಕುಟುಂಬದಲ್ಲೂ ಇರುವುದು")}{" "}
            <span className="gradient-text">
              {bi("a voice that remembers.", "ನೆನಪಿಡುವ ಒಂದು ಧ್ವನಿ.")}
            </span>
          </h1>
        </Reveal>

        <Reveal delay={220}>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-muted-foreground sm:text-xl">
            {bi(
              "A grandmother\u2019s song. A grandfather\u2019s tale. The quiet sound of home.",
              "ಅಜ್ಜಿಯ ಹಾಡು. ತಾತನ ಕಥೆ. ಮನೆಯ ಮೆಲ್ಲನೆಯ ಧ್ವನಿ.",
            )}
          </p>
        </Reveal>
      </header>

      {/* ===================== OPENING TRIPTYCH ===================== */}
      <div className="container mt-14 max-w-5xl md:mt-20">
        <div className="grid grid-cols-3 gap-3 sm:gap-5">
          {TRIPTYCH.map((photo, i) => (
            <Reveal
              key={photo.src}
              delay={i * 110}
              className={
                i === 1
                  ? "translate-y-0"
                  : "sm:translate-y-6" /* gentle staggered heights */
              }
            >
              <PhotoCard
                src={photo.src}
                alt={bi(photo.caption[0], photo.caption[1])}
                caption={bi(photo.caption[0], photo.caption[1])}
                className="aspect-[3/4] animate-ken-burns"
              />
            </Reveal>
          ))}
        </div>
      </div>

      {/* ===================== STORY SCENES ===================== */}
      <div className="container max-w-5xl space-y-20 py-20 md:space-y-28 md:py-28">
        {SCENES.map((scene, i) => {
          const Icon = scene.icon;
          const flip = i % 2 === 1; // alternate sides
          return (
            <Reveal key={i}>
              <div className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
                {/* Text column */}
                <div className={flip ? "md:order-2" : ""}>
                  <div className="flex items-center gap-3">
                    <span className="glass grid h-11 w-11 place-items-center rounded-full border-primary/30 text-primary shadow-glow">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-5xl font-bold leading-none text-primary/15">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
                    {bi(scene.label[0], scene.label[1])}
                  </p>

                  <div className="mt-4 space-y-4">
                    {scene.paras.map(([en, kn], j) => (
                      <p
                        key={j}
                        className={
                          j === 0
                            ? "text-pretty text-xl font-medium leading-snug text-foreground sm:text-2xl"
                            : "text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
                        }
                      >
                        {bi(en, kn)}
                      </p>
                    ))}

                    {scene.highlight && (
                      <p className="pt-1 text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
                        <span className="gradient-text">
                          {bi(scene.highlight[0], scene.highlight[1])}
                        </span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Image column */}
                <div className={flip ? "md:order-1" : ""}>
                  <div className="relative">
                    <div className="pointer-events-none absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-tr from-primary/25 to-amber-400/20 opacity-70 blur-2xl" />
                    <PhotoCard
                      src={scene.image.src}
                      alt={bi(scene.label[0], scene.label[1])}
                      caption={bi(scene.image.caption[0], scene.image.caption[1])}
                      className="aspect-[4/3]"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* ===================== MEMORY MAP ===================== */}
      <div className="container max-w-5xl pb-8">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/80">
            {bi("One land, countless stories", "ಒಂದು ನಾಡು, ಅಸಂಖ್ಯ ಕಥೆಗಳು")}
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {bi("A memory in every corner of ", "ಪ್ರತಿ ಮೂಲೆಯಲ್ಲೂ ಒಂದು ನೆನಪು — ")}
            <span className="gradient-text">{bi("Karnataka", "ಕರ್ನಾಟಕ")}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-pretty text-base text-muted-foreground sm:text-lg">
            {bi(
              "From the coast to the Deccan, every village holds a song, a recipe, a legend. Akkaverse gives each of them a home.",
              "ಕರಾವಳಿಯಿಂದ ಬಯಲುಸೀಮೆಯವರೆಗೆ, ಪ್ರತಿ ಹಳ್ಳಿಯಲ್ಲೂ ಒಂದು ಹಾಡು, ಒಂದು ರುಚಿ, ಒಂದು ದಂತಕಥೆ. ಅಕ್ಕಾವರ್ಸ್ ಪ್ರತಿಯೊಂದಕ್ಕೂ ಒಂದು ನೆಲೆ ನೀಡುತ್ತದೆ.",
            )}
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-8">
          <MemoryMap label={bi} />
        </Reveal>
      </div>

      {/* ===================== SCREENSHOT QUOTE ===================== */}
      <div className="container max-w-3xl pb-16 md:pb-24">
        <Reveal>
          <figure className="group relative">
            <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-r from-primary/25 via-amber-400/20 to-orange-500/25 opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-90" />

            <div className="glass relative overflow-hidden rounded-[2rem] px-7 py-12 text-center shadow-soft sm:px-14 sm:py-16">
              <div className="aurora-blob right-[-4rem] top-[-4rem] h-48 w-48 animate-float bg-primary/30" />
              <div className="aurora-blob bottom-[-4rem] left-[-4rem] h-48 w-48 animate-float-slow bg-amber-400/25" />

              <Quote className="mx-auto h-8 w-8 rotate-180 text-primary/60" />
              <blockquote className="relative mx-auto mt-6 max-w-2xl text-2xl font-bold leading-[1.25] tracking-tight sm:text-3xl md:text-4xl">
                {bi("The stories we save today become the", "ಇಂದು ನಾವು ಉಳಿಸುವ ಕಥೆಗಳೇ ನಾಳೆ")}{" "}
                <span className="gradient-text">
                  {bi(
                    "roots our grandchildren will stand on.",
                    "ನಮ್ಮ ಮೊಮ್ಮಕ್ಕಳು ನಿಲ್ಲುವ ಬೇರುಗಳಾಗುತ್ತವೆ.",
                  )}
                </span>
              </blockquote>
              <figcaption className="mt-7 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                {bi("Akkaverse", "ಅಕ್ಕಾವರ್ಸ್")}
              </figcaption>
            </div>
          </figure>
        </Reveal>

        {/* ===================== SIGNATURE ===================== */}
        <Reveal delay={100}>
          <div className="mt-16 flex flex-col items-center text-center">
            <div className="relative h-24 w-24 overflow-hidden rounded-full border border-primary/30 shadow-glow">
              {photoOk ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/mithun.png"
                  alt="Mithun Rajanna"
                  className="h-full w-full object-cover"
                  onError={() => setPhotoOk(false)}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-amber-500 text-2xl font-bold text-primary-foreground">
                  M
                </div>
              )}
            </div>
            <p className="mt-4 inline-flex items-center gap-1.5 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {bi("Crafted with", "ಪ್ರೀತಿಯಿಂದ")}
              <Heart className="h-3.5 w-3.5 fill-primary text-primary" />
              {bi("from a Karnataka village", "ಕರ್ನಾಟಕದ ಹಳ್ಳಿಯಿಂದ")}
            </p>
            <p className="mt-2 text-lg font-semibold tracking-tight">
              Mithun Rajanna
            </p>
            <p className="mt-0.5 text-sm text-primary">
              {bi(
                "Lakkahalli, Sidlaghatta, Chikkaballapura",
                "ಲಕ್ಕಹಳ್ಳಿ, ಶಿಡ್ಲಘಟ್ಟ, ಚಿಕ್ಕಬಳ್ಳಾಪುರ",
              )}
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
