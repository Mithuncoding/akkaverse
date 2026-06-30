"use client";

import * as React from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const GEO_URL = "/karnataka.geojson";

type JourneyMapProps = {
  /** Capital marker: [lng, lat]. */
  coords: [number, number];
  label: string;
};

/**
 * JourneyMap — a compact, accent-themed map of Karnataka that drops a pulsing
 * pin on the era's capital. It reuses the same GeoJSON as the Explore map, so
 * every dynasty is anchored to real geography. The accent is inherited from the
 * parent chapter via the `--accent` CSS variable.
 */
export function JourneyMap({ coords, label }: JourneyMapProps) {
  return (
    <div className="relative">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: [76.5, 14.9], scale: 3200 }}
        width={420}
        height={460}
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
                    fill: "rgb(var(--accent) / 0.10)",
                    stroke: "rgb(var(--accent) / 0.30)",
                    strokeWidth: 0.5,
                    outline: "none",
                  },
                  hover: {
                    fill: "rgb(var(--accent) / 0.16)",
                    stroke: "rgb(var(--accent) / 0.30)",
                    strokeWidth: 0.5,
                    outline: "none",
                  },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        <Marker coordinates={coords}>
          {/* expanding sonar rings */}
          <circle r={6} className="journey-pin-ping" fill="rgb(var(--accent) / 0.35)" />
          <circle
            r={11}
            className="journey-pin-ping"
            style={{ animationDelay: "1.1s" }}
            fill="rgb(var(--accent) / 0.18)"
          />
          {/* solid pin */}
          <circle r={4} fill="rgb(var(--accent))" stroke="white" strokeWidth={1.2} />
        </Marker>
      </ComposableMap>

      <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[rgb(var(--accent)/0.3)] bg-background/80 px-3 py-1 text-xs font-medium text-[rgb(var(--accent))] backdrop-blur">
        ⚲ {label}
      </div>
    </div>
  );
}
