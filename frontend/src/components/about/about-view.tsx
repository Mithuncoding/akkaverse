"use client";

import * as React from "react";
import {
  Annotation,
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { Heart, Quote } from "lucide-react";

import { useTranslation } from "@/i18n/language-provider";
import { Reveal } from "@/components/ui/reveal";

/**
 * AboutView — "ನನ್ನ ಕಥೆ / My Story".
 *
 * A single, quiet, two-column section: on the left an elegant animated map of
 * Karnataka with Chikkaballapura lit up and a glowing pin on the village of
 * Lakkahalli; on the right a personal remembrance and one glass-card quote.
 * Fully bilingual via `bi()`.
 */

const GEO_URL = "/karnataka.geojson";
const HOME_DISTRICT = "Chikkaballapura";
/** Lakkahalli, near Sidlaghatta — [lng, lat]. */
const LAKKAHALLI: [number, number] = [77.86, 13.39];

/** The animated Karnataka map that anchors the story to a real place. */
function HomeMap({ bi }: { bi: (en: string, kn: string) => string }) {
  return (
    <div className="glass relative overflow-hidden rounded-[2rem] border border-border/70 shadow-soft">
      {/* warm gradient wash */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-amber-400/10" />
      <div className="pointer-events-none absolute -left-10 -top-10 h-52 w-52 animate-float-slow rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -right-8 h-56 w-56 animate-float rounded-full bg-amber-400/20 blur-3xl" />

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: [76.6, 14.9], scale: 3550 }}
        width={520}
        height={560}
        style={{ width: "100%", height: "auto", position: "relative" }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isHome = geo.properties.district === HOME_DISTRICT;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: isHome
                        ? "hsl(var(--primary) / 0.55)"
                        : "hsl(var(--primary) / 0.13)",
                      stroke: isHome
                        ? "hsl(var(--primary))"
                        : "hsl(var(--primary) / 0.4)",
                      strokeWidth: isHome ? 1.4 : 0.6,
                      outline: "none",
                      transition: "fill 0.4s ease",
                      filter: isHome
                        ? "drop-shadow(0 0 10px hsl(var(--primary) / 0.6))"
                        : "none",
                    },
                    hover: {
                      fill: isHome
                        ? "hsl(var(--primary) / 0.7)"
                        : "hsl(var(--primary) / 0.24)",
                      stroke: "hsl(var(--primary) / 0.7)",
                      strokeWidth: isHome ? 1.5 : 0.8,
                      outline: "none",
                    },
                    pressed: { outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>

        {/* Glowing pin on the village */}
        <Marker coordinates={LAKKAHALLI}>
          <circle r={16} className="journey-pin-ping fill-primary/30" />
          <circle r={9} className="journey-pin-ping fill-primary/40" style={{ animationDelay: "0.6s" }} />
          <circle
            r={4.5}
            className="fill-primary"
            stroke="hsl(var(--background))"
            strokeWidth={1.4}
          />
        </Marker>

        {/* Subtle line connecting the village to its name */}
        <Annotation
          subject={LAKKAHALLI}
          dx={-16}
          dy={-118}
          connectorProps={{
            stroke: "hsl(var(--primary) / 0.7)",
            strokeWidth: 1,
            strokeLinecap: "round",
            strokeDasharray: "1 4",
          }}
        >
          <g transform="translate(-6, 0)">
            <text
              textAnchor="end"
              y={-14}
              className="fill-primary text-[13px] font-semibold"
              style={{ fontFamily: "inherit" }}
            >
              {bi("Lakkahalli", "ಲಕ್ಕಹಳ್ಳಿ")}
            </text>
            <text
              textAnchor="end"
              y={2}
              className="fill-muted-foreground text-[10px]"
              style={{ fontFamily: "inherit" }}
            >
              {bi("Chikkaballapura", "ಚಿಕ್ಕಬಳ್ಳಾಪುರ")}
            </text>
          </g>
        </Annotation>
      </ComposableMap>

      {/* corner caption */}
      <span className="pointer-events-none absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
        {bi("Where it all began", "ಇದೆಲ್ಲವೂ ಆರಂಭವಾದ ಸ್ಥಳ")}
      </span>
    </div>
  );
}

const STORY: [string, string][] = [
  [
    "I grew up in Lakkahalli, a small village near Sidlaghatta. My evenings belonged to my grandparents \u2014 to their stories, their songs, and the festivals that turned ordinary nights into something magical.",
    "ನಾನು ಶಿಡ್ಲಘಟ್ಟದ ಬಳಿಯ ಪುಟ್ಟ ಹಳ್ಳಿ ಲಕ್ಕಹಳ್ಳಿಯಲ್ಲಿ ಬೆಳೆದೆ. ನನ್ನ ಸಂಜೆಗಳು ಅಜ್ಜ-ಅಜ್ಜಿಗೆ ಸೇರಿದ್ದವು \u2014 ಅವರ ಕಥೆಗಳಿಗೆ, ಹಾಡುಗಳಿಗೆ, ಮತ್ತು ಸಾಮಾನ್ಯ ರಾತ್ರಿಗಳನ್ನೂ ಮಾಯಾಲೋಕವಾಗಿಸುತ್ತಿದ್ದ ಹಬ್ಬಗಳಿಗೆ.",
  ],
  [
    "Back then, I didn\u2019t know those stories were a kind of inheritance. They were simply the sound of home.",
    "ಆಗ, ಆ ಕಥೆಗಳೇ ಒಂದು ಬಳುವಳಿ ಎಂದು ನನಗೆ ಗೊತ್ತಿರಲಿಲ್ಲ. ಅವು ಬರೀ ಮನೆಯ ಧ್ವನಿಯಾಗಿದ್ದವು.",
  ],
  [
    "Years later, when I left to study, I began to notice the silence. Each time an elder passed away, an entire world went with them \u2014 recipes, memories, a whole way of living that no book had ever written down.",
    "ವರ್ಷಗಳ ನಂತರ, ಓದಲು ಊರು ಬಿಟ್ಟಾಗ, ನಾನು ಆ ಮೌನವನ್ನು ಗಮನಿಸಲಾರಂಭಿಸಿದೆ. ಪ್ರತಿ ಬಾರಿ ಒಬ್ಬ ಹಿರಿಯರು ಅಗಲಿದಾಗ, ಒಂದಿಡೀ ಲೋಕವೇ ಅವರೊಂದಿಗೆ ಹೋಗುತ್ತಿತ್ತು \u2014 ಅಡುಗೆಗಳು, ನೆನಪುಗಳು, ಯಾವ ಪುಸ್ತಕವೂ ದಾಖಲಿಸದ ಬದುಕಿನ ರೀತಿ.",
  ],
  [
    "Akkaverse grew out of that quiet ache. Not to replace those voices, but to hold them \u2014 so that one day my children, and theirs, can still hear where they came from.",
    "ಆ ಮೌನವಾದ ನೋವಿನಿಂದಲೇ ಅಕ್ಕಾವರ್ಸ್ ಹುಟ್ಟಿತು. ಆ ಧ್ವನಿಗಳನ್ನು ಬದಲಿಸಲು ಅಲ್ಲ, ಬದಲಿಗೆ ಅವುಗಳನ್ನು ಹಿಡಿದಿಡಲು \u2014 ಒಂದು ದಿನ ನನ್ನ ಮಕ್ಕಳು, ಅವರ ಮಕ್ಕಳು ತಾವು ಎಲ್ಲಿಂದ ಬಂದೆವು ಎಂಬುದನ್ನು ಕೇಳಿಸಿಕೊಳ್ಳಲಿ ಎಂದು.",
  ],
];

export function AboutView() {
  const { bi } = useTranslation();
  const [photoOk, setPhotoOk] = React.useState(true);

  return (
    <div className="relative overflow-hidden">
      {/* Ambient backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora-blob left-[8%] top-24 h-72 w-72 animate-float-slow bg-primary/20" />
        <div className="aurora-blob right-[6%] top-[26rem] h-80 w-80 animate-float bg-amber-400/15" />
        <div className="absolute inset-0 bg-dotgrid [mask-image:radial-gradient(70%_60%_at_50%_20%,#000,transparent)]" />
      </div>

      <section className="container max-w-6xl py-16 md:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* ===================== LEFT — MAP ===================== */}
          <Reveal className="order-2 lg:order-1">
            <HomeMap bi={bi} />
          </Reveal>

          {/* ===================== RIGHT — STORY ===================== */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground shadow-soft">
                {bi("My Story", "ನನ್ನ ಕಥೆ")}
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-6 text-balance text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
                {bi("It all began in a village called ", "ಇದೆಲ್ಲವೂ ಆರಂಭವಾದದ್ದು ")}
                <span className="gradient-text">
                  {bi("Lakkahalli.", "ಲಕ್ಕಹಳ್ಳಿ ಎಂಬ ಹಳ್ಳಿಯಲ್ಲಿ.")}
                </span>
              </h1>
            </Reveal>

            <div className="mt-7 space-y-5">
              {STORY.map(([en, kn], i) => (
                <Reveal key={i} delay={120 + i * 70}>
                  <p
                    className={
                      i === 0
                        ? "text-pretty text-lg font-medium leading-relaxed text-foreground sm:text-xl"
                        : "text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
                    }
                  >
                    {bi(en, kn)}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* Quote — premium glass card */}
            <Reveal delay={420}>
              <figure className="group relative mt-9">
                <div className="pointer-events-none absolute -inset-3 -z-10 rounded-[1.75rem] bg-gradient-to-r from-primary/25 via-amber-400/20 to-orange-500/25 opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-90" />
                <blockquote className="glass relative overflow-hidden rounded-[1.75rem] p-7 shadow-soft sm:p-9">
                  <div className="aurora-blob right-[-3rem] top-[-3rem] h-36 w-36 animate-float bg-primary/25" />
                  <Quote className="h-7 w-7 rotate-180 text-primary/60" />
                  <p className="relative mt-4 text-xl font-bold leading-snug tracking-tight sm:text-2xl md:text-[1.7rem]">
                    <span className="gradient-text">
                      {bi(
                        "When the last voice that remembers falls silent, a little of home goes quiet forever.",
                        "ನೆನಪಿಡುವ ಕೊನೆಯ ಧ್ವನಿ ಮೌನವಾದಾಗ, ಮನೆಯ ಒಂದು ತುಣುಕೂ ಶಾಶ್ವತವಾಗಿ ಮೌನವಾಗುತ್ತದೆ.",
                      )}
                    </span>
                  </p>
                </blockquote>
              </figure>
            </Reveal>

            {/* Signature */}
            <Reveal delay={500}>
              <div className="mt-8 flex items-center gap-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-primary/30 shadow-glow">
                  {photoOk ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src="/mithun.png"
                      alt="Mithun Rajanna"
                      className="h-full w-full object-cover"
                      onError={() => setPhotoOk(false)}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-amber-500 text-lg font-bold text-primary-foreground">
                      M
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-base font-semibold tracking-tight">
                    Mithun Rajanna
                  </p>
                  <p className="inline-flex items-center gap-1.5 text-sm text-primary">
                    {bi("Lakkahalli, Chikkaballapura", "ಲಕ್ಕಹಳ್ಳಿ, ಚಿಕ್ಕಬಳ್ಳಾಪುರ")}
                    <Heart className="h-3.5 w-3.5 fill-primary text-primary" />
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
