"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/language-provider";
import { eraForYear, type DasaraYear } from "@/data/dasara-archive";

/**
 * The Time Machine — a cinematic year slider.
 *
 * Dragging it re-tints the whole archive (the parent reads the era from the
 * value). The track is a film strip; documented years are lit sprocket marks
 * the visitor can snap to. Keyboard: ←/→ step years, Home/End jump the century.
 */
export function DasaraTimeMachine({
  years,
  value,
  onChange,
}: {
  years: DasaraYear[];
  value: number;
  onChange: (year: number) => void;
}) {
  const { bi } = useTranslation();

  const min = years[0].year;
  const max = years[years.length - 1].year;
  const era = eraForYear(value);
  const pct = ((value - min) / (max - min)) * 100;

  // Snap a free-dragged value to the nearest capsule year for a satisfying click.
  const nearest = React.useCallback(
    (y: number) =>
      years.reduce((a, b) =>
        Math.abs(b.year - y) < Math.abs(a.year - y) ? b : a,
      ).year,
    [years],
  );

  return (
    <div className="dasara-machine rounded-3xl border border-amber-100/15 bg-gradient-to-b from-black/50 to-black/20 p-5 sm:p-7">
      <div className="flex items-end justify-between">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-200/60">
            {bi("The Time Machine", "ಟೈಮ್ ಮೆಶೀನ್")}
          </span>
          <p className="mt-1 text-sm text-amber-100/70">
            {bi(
              "Drag to travel through the decades",
              "ದಶಕಗಳಲ್ಲಿ ಪ್ರಯಾಣಿಸಲು ಎಳೆಯಿರಿ",
            )}
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-black tabular-nums text-[rgb(var(--accent))] sm:text-5xl">
            {value}
          </div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-amber-200/60">
            {bi(era.labelEn, era.labelKn)}
          </div>
        </div>
      </div>

      {/* Slider track */}
      <div className="relative mt-7 pb-2">
        {/* Filled progress */}
        <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-amber-100/10" />
        <div
          className="pointer-events-none absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-[rgb(var(--accent))] shadow-[0_0_20px_rgb(var(--accent)/0.6)] [transition:width_.35s_ease]"
          style={{ width: `${pct}%` }}
        />

        {/* Capsule sprocket marks */}
        {years.map((y) => {
          const p = ((y.year - min) / (max - min)) * 100;
          const on = y.year === value;
          return (
            <button
              key={y.year}
              onClick={() => onChange(y.year)}
              aria-label={`${y.year}`}
              style={{ left: `${p}%` }}
              className={cn(
                "group absolute top-1/2 z-[2] -translate-x-1/2 -translate-y-1/2 rounded-full transition-all",
                on
                  ? "h-5 w-5 bg-[rgb(var(--accent))] ring-4 ring-[rgb(var(--accent)/0.3)]"
                  : "h-3 w-3 bg-amber-100/40 hover:h-4 hover:w-4 hover:bg-amber-100/80",
              )}
            >
              <span
                className={cn(
                  "pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold tabular-nums transition-opacity",
                  on
                    ? "text-[rgb(var(--accent))] opacity-100"
                    : "text-amber-100/50 opacity-0 group-hover:opacity-100",
                )}
              >
                {y.year}
              </span>
            </button>
          );
        })}

        {/* Native range for drag + keyboard, visually transparent over the track */}
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          step={1}
          onChange={(e) => onChange(nearest(Number(e.target.value)))}
          aria-label={bi("Year", "ವರ್ಷ")}
          className="dasara-range relative z-[3] h-6 w-full cursor-grab appearance-none bg-transparent active:cursor-grabbing"
        />
      </div>

      {/* Decade rail */}
      <div className="mt-8 flex flex-wrap gap-1.5">
        {["1930s", "1940s", "1950s", "1960s", "1970s", "1980s", "1990s", "2000s", "2010s", "2020s"].map(
          (d) => {
            const decadeStart = Number(d.slice(0, 4));
            const active = value >= decadeStart && value < decadeStart + 10;
            const target = nearest(decadeStart + 5);
            return (
              <button
                key={d}
                onClick={() => onChange(target)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition-all active:scale-95",
                  active
                    ? "border-[rgb(var(--accent))] bg-[rgb(var(--accent)/0.18)] text-amber-50"
                    : "border-amber-100/15 text-amber-100/60 hover:border-amber-100/40 hover:text-amber-100",
                )}
              >
                {d}
              </button>
            );
          },
        )}
      </div>
    </div>
  );
}
