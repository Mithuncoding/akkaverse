"use client";

import * as React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { ExternalLink, MapPin, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/language-provider";
import { districtById, type District } from "@/data/districts";
import { getDistrictInfo, type WikiInfo } from "@/lib/wiki";
import { festivals } from "@/data/festivals";

const GEO_URL = "/karnataka.geojson";

/**
 * Interactive Karnataka map. Hover to preview a district, click to load a live
 * Wikipedia summary + photo into the side panel. Fully bilingual.
 */
export function KarnatakaMap() {
  const { t, bi, locale } = useTranslation();
  const [hovered, setHovered] = React.useState<District | null>(null);
  const [selected, setSelected] = React.useState<District | null>(null);
  const [info, setInfo] = React.useState<WikiInfo | null>(null);
  const [loading, setLoading] = React.useState(false);

  const select = React.useCallback((d: District) => {
    setSelected(d);
    setInfo(null);
    setLoading(true);
    getDistrictInfo(d.wiki, d.nameKn, d.imageTitle, d.id)
      .then(setInfo)
      .finally(() => setLoading(false));
  }, []);

  const extract = React.useMemo(() => {
    if (!info) return "";
    if (locale === "kn") return info.extractKn || info.extractEn;
    if (locale === "both") {
      return info.extractKn
        ? `${info.extractEn}\n\n${info.extractKn}`
        : info.extractEn;
    }
    return info.extractEn;
  }, [info, locale]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
      {/* ----------------------------- MAP ----------------------------- */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-2">
        <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-full border border-border bg-background/80 px-3 py-1 text-sm font-medium backdrop-blur">
          {hovered ? bi(hovered.nameEn, hovered.nameKn) : t("explore.map.hint")}
        </div>

        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ center: [76.2, 14.8], scale: 4200 }}
          width={520}
          height={560}
          style={{ width: "100%", height: "auto" }}
        >
          <ZoomableGroup minZoom={1} maxZoom={4}>
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const id = geo.properties.district as string;
                  const d = districtById.get(id);
                  const isSelected = selected?.id === id;
                  const isHovered = hovered?.id === id;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => d && setHovered(d)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => d && select(d)}
                      style={{
                        default: {
                          fill: isSelected
                            ? "hsl(var(--primary))"
                            : isHovered
                              ? "hsl(var(--primary) / 0.45)"
                              : "hsl(var(--secondary))",
                          stroke: "hsl(var(--background))",
                          strokeWidth: 0.75,
                          outline: "none",
                          transition: "fill 0.2s ease",
                          cursor: "pointer",
                        },
                        hover: {
                          fill: isSelected
                            ? "hsl(var(--primary))"
                            : "hsl(var(--primary) / 0.55)",
                          stroke: "hsl(var(--background))",
                          strokeWidth: 0.75,
                          outline: "none",
                          cursor: "pointer",
                        },
                        pressed: {
                          fill: "hsl(var(--primary))",
                          outline: "none",
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>

      {/* --------------------------- INFO PANEL --------------------------- */}
      <div className="rounded-2xl border border-border bg-card p-6">
        {!selected ? (
          <div className="flex h-full min-h-[20rem] flex-col items-center justify-center text-center text-muted-foreground">
            <MapPin className="h-10 w-10 opacity-30" />
            <p className="mt-4 max-w-xs text-sm">{t("explore.map.empty")}</p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3">
              <span className="text-4xl">{selected.emoji}</span>
              <div>
                <h3 className="text-xl font-bold leading-tight">
                  {bi(selected.nameEn, selected.nameKn)}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {t("explore.map.district")}
                </p>
              </div>
            </div>

            <p className="mt-3 text-sm text-primary">
              {bi(selected.tagEn, selected.tagKn)}
            </p>

            {/* Live image */}
            <div className="mt-4 aspect-video w-full overflow-hidden rounded-xl border border-border bg-secondary/40">
              {loading ? (
                <div className="flex h-full items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : info?.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={info.imageUrl}
                  alt={selected.nameEn}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-5xl opacity-30">
                  {selected.emoji}
                </div>
              )}
            </div>

            {/* Live summary */}
            <div className="mt-4">
              {loading ? (
                <div className="space-y-2">
                  <div className="h-3 w-full animate-pulse rounded bg-secondary" />
                  <div className="h-3 w-11/12 animate-pulse rounded bg-secondary" />
                  <div className="h-3 w-4/5 animate-pulse rounded bg-secondary" />
                </div>
              ) : (
                <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                  {extract || t("explore.map.noInfo")}
                </p>
              )}
            </div>

            {info?.pageUrl && !loading && (
              <a
                href={info.pageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline",
                )}
              >
                {t("explore.map.readMore")}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}

            {/* Festivals in this district */}
            {(() => {
              const here = festivals.filter((f) => f.district === selected.id);
              if (here.length === 0) return null;
              return (
                <div className="mt-5 border-t border-border pt-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {bi("Festivals here", "ಇಲ್ಲಿನ ಹಬ್ಬಗಳು")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {here.map((f) => (
                      <a
                        key={f.id}
                        href="/festivals"
                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-3 py-1 text-sm font-medium transition-colors hover:bg-secondary"
                      >
                        <span aria-hidden>{f.emoji}</span>
                        {bi(f.nameEn, f.nameKn)}
                      </a>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}
