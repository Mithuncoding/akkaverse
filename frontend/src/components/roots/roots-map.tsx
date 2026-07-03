"use client";

import * as React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { MapPin } from "lucide-react";

import { useTranslation } from "@/i18n/language-provider";

const GEO_URL = "/karnataka.geojson";

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z]/g, "")
    .replace(/district$/, "");

export function RootsMap({ districts }: { districts: string[] }) {
  const { bi } = useTranslation();
  const wanted = React.useMemo(
    () => new Set(districts.map(norm).filter(Boolean)),
    [districts],
  );

  const isFamily = React.useCallback(
    (name: string) => {
      const n = norm(name);
      for (const w of wanted) if (n === w || n.includes(w) || w.includes(n)) return true;
      return false;
    },
    [wanted],
  );

  return (
    <div className="glass overflow-hidden rounded-3xl border shadow-soft">
      <div className="border-b border-border/70 bg-primary/[0.04] p-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          <MapPin className="h-4 w-4" />
          {bi("Your family across Karnataka", "ಕರ್ನಾಟಕದಾದ್ಯಂತ ನಿಮ್ಮ ಕುಟುಂಬ")}
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          {bi(
            "Every district your roots reach, lit across the land.",
            "ನಿಮ್ಮ ಬೇರುಗಳು ತಲುಪುವ ಪ್ರತಿ ಜಿಲ್ಲೆ ನಾಡಿನಲ್ಲಿ ಬೆಳಗುತ್ತದೆ.",
          )}
        </p>
      </div>

      <div className="grid gap-4 p-5 sm:grid-cols-[1.4fr_1fr] sm:items-center">
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 -z-10 blur-3xl">
            <div className="aurora-blob left-1/4 top-1/3 h-40 w-40 bg-primary/20" />
          </div>
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ center: [76.6, 14.9], scale: 3200 }}
            width={520}
            height={540}
            style={{ width: "100%", height: "auto" }}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const fam = isFamily(geo.properties.district as string);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: {
                          fill: fam
                            ? "hsl(var(--primary) / 0.55)"
                            : "hsl(var(--primary) / 0.08)",
                          stroke: fam
                            ? "hsl(var(--primary))"
                            : "hsl(var(--primary) / 0.25)",
                          strokeWidth: fam ? 1.1 : 0.5,
                          outline: "none",
                          filter: fam
                            ? "drop-shadow(0 0 8px hsl(var(--primary) / 0.5))"
                            : "none",
                        },
                        hover: {
                          fill: fam
                            ? "hsl(var(--primary) / 0.65)"
                            : "hsl(var(--primary) / 0.16)",
                          outline: "none",
                        },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {bi("Ancestral districts", "ಪೂರ್ವಜರ ಜಿಲ್ಲೆಗಳು")}
          </p>
          {districts.length ? (
            <ul className="mt-3 flex flex-wrap gap-2">
              {districts.map((d) => (
                <li
                  key={d}
                  className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                >
                  <MapPin className="h-3 w-3" />
                  {d}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              {bi(
                "Add districts to your family to light up the map.",
                "ನಕ್ಷೆ ಬೆಳಗಿಸಲು ಕುಟುಂಬಕ್ಕೆ ಜಿಲ್ಲೆಗಳನ್ನು ಸೇರಿಸಿ.",
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
