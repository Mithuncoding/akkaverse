"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/language-provider";
import { ConfidenceBadge } from "./dasara-archive-view";
import type { Treasure } from "@/data/dasara-archive";

const KIND_ICON: Record<Treasure["kind"], string> = {
  photograph: "🖼",
  headline: "📰",
  anecdote: "💬",
  tradition: "🪔",
  document: "📜",
};

/**
 * Hidden Treasures — sealed cards the visitor uncovers.
 *
 * Each treasure starts wax-sealed; clicking "unseals" it with a flip and
 * reveals a rare fact, then offers to jump the Time Machine to its year.
 */
export function DasaraTreasures({
  treasures,
  onJump,
}: {
  treasures: Treasure[];
  onJump: (year: number) => void;
}) {
  const { bi } = useTranslation();
  const [open, setOpen] = React.useState<Record<string, boolean>>({});

  return (
    <div>
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-amber-50 sm:text-3xl">
          {bi("Hidden Treasures", "ಗುಪ್ತ ನಿಧಿಗಳು")}
        </h2>
        <p className="mt-2 text-sm text-amber-100/60">
          {bi(
            "Tap a sealed card to uncover a rare fact",
            "ಅಪರೂಪ ಸಂಗತಿಯನ್ನು ಬಹಿರಂಗಪಡಿಸಲು ಮುದ್ರೆಯ ಕಾರ್ಡ್ ಒತ್ತಿ",
          )}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {treasures.map((t) => {
          const isOpen = open[t.id];
          return (
            <button
              key={t.id}
              onClick={() => setOpen((s) => ({ ...s, [t.id]: !s[t.id] }))}
              className={cn(
                "group relative min-h-[180px] overflow-hidden rounded-2xl border p-5 text-left transition-all duration-500 active:scale-[0.98]",
                isOpen
                  ? "border-[rgb(var(--accent)/0.5)] bg-gradient-to-br from-[rgb(var(--accent)/0.16)] to-black/40"
                  : "border-amber-100/15 bg-black/40 hover:border-amber-100/30",
              )}
            >
              {!isOpen ? (
                <div className="flex h-full min-h-[140px] flex-col items-center justify-center text-center">
                  <span className="text-4xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    {KIND_ICON[t.kind]}
                  </span>
                  <span className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200/70">
                    {bi("Sealed", "ಮುದ್ರಿತ")} · {t.year}
                  </span>
                  <span className="mt-1 text-sm text-amber-100/50">
                    {bi("Tap to unseal", "ತೆರೆಯಲು ಒತ್ತಿ")}
                  </span>
                </div>
              ) : (
                <div className="dasara-capsule-in">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{KIND_ICON[t.kind]}</span>
                    <span className="text-xs font-semibold tabular-nums text-[rgb(var(--accent))]">
                      {t.year}
                    </span>
                  </div>
                  <h3 className="mt-3 text-base font-bold text-amber-50">
                    {bi(t.titleEn, t.titleKn)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-amber-100/80">
                    {bi(t.bodyEn, t.bodyKn)}
                  </p>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <ConfidenceBadge level={t.confidence} />
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        onJump(t.year);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.stopPropagation();
                          onJump(t.year);
                        }
                      }}
                      className="shrink-0 rounded-full bg-[rgb(var(--accent)/0.2)] px-3 py-1 text-[11px] font-semibold text-amber-100 hover:bg-[rgb(var(--accent)/0.35)]"
                    >
                      {bi("Visit year", "ವರ್ಷಕ್ಕೆ ಹೋಗಿ")} →
                    </span>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
