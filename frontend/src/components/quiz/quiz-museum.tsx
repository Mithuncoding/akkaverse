"use client";

import * as React from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/language-provider";
import { JourneyFigure } from "@/components/timeline/journey-figure";
import {
  ACHIEVEMENTS,
  COLLECTIBLES,
  useQuizProfile,
} from "@/lib/quiz/profile";

/**
 * The Collector's Museum — a hall that fills up as the learner masters
 * Karnataka. Locked pieces are silhouettes; earned pieces bloom into colour.
 */
export function QuizMuseum({ onClose }: { onClose: () => void }) {
  const { bi } = useTranslation();
  const profile = useQuizProfile();
  const [tab, setTab] = React.useState<"gallery" | "badges">("gallery");

  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const collected = COLLECTIBLES.filter((c) => profile.collectibles.includes(c.id)).length;
  const badges = ACHIEVEMENTS.filter((a) => profile.achievements.includes(a.id)).length;

  return (
    <div className="fixed inset-0 z-[70] flex flex-col bg-[#0b0a12] text-white">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6">
        <h2 className="text-base font-bold sm:text-lg">🏛 {bi("The Collector's Museum", "ಸಂಗ್ರಾಹಕರ ವಸ್ತುಸಂಗ್ರಹಾಲಯ")}</h2>
        <button onClick={onClose} aria-label="Close" className="rounded-full border border-white/15 p-2 hover:bg-white/10">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 px-4 py-3 sm:px-6">
        <Tab on={tab === "gallery"} onClick={() => setTab("gallery")}>
          {bi("Collectibles", "ಸಂಗ್ರಹಗಳು")} {collected}/{COLLECTIBLES.length}
        </Tab>
        <Tab on={tab === "badges"} onClick={() => setTab("badges")}>
          {bi("Achievements", "ಸಾಧನೆಗಳು")} {badges}/{ACHIEVEMENTS.length}
        </Tab>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-10 sm:px-6">
        <div className="mx-auto max-w-4xl">
          {tab === "gallery" ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {COLLECTIBLES.map((c) => {
                const owned = profile.collectibles.includes(c.id);
                return (
                  <div
                    key={c.id}
                    className={cn(
                      "relative aspect-[3/4] overflow-hidden rounded-2xl ring-1 transition-all",
                      owned ? "ring-amber-300/40" : "ring-white/10",
                    )}
                  >
                    {owned ? (
                      <JourneyFigure wiki={c.wiki} alt={c.en} rounded="none" className="absolute inset-0 h-full w-full" />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center bg-white/[0.03]">
                        <span className="text-4xl opacity-20 grayscale">{c.emoji}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-3">
                      <span className="text-xl">{owned ? c.emoji : "🔒"}</span>
                      <p className={cn("mt-1 text-xs font-bold leading-tight", owned ? "text-white" : "text-white/40")}>
                        {owned ? bi(c.en, c.kn) : bi("Locked", "ಲಾಕ್")}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {ACHIEVEMENTS.map((a) => {
                const owned = profile.achievements.includes(a.id);
                return (
                  <div
                    key={a.id}
                    className={cn(
                      "flex items-center gap-4 rounded-2xl border p-4",
                      owned ? "border-amber-300/40 bg-amber-300/5" : "border-white/10 bg-white/[0.03]",
                    )}
                  >
                    <span className={cn("grid h-12 w-12 shrink-0 place-items-center rounded-full text-2xl", owned ? "bg-amber-300/15" : "bg-white/5 grayscale opacity-40")}>
                      {owned ? a.emoji : "🔒"}
                    </span>
                    <div>
                      <p className={cn("text-sm font-bold", owned ? "text-white" : "text-white/50")}>{bi(a.en, a.kn)}</p>
                      <p className="text-xs text-white/50">{bi(a.descEn, a.descKn)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Tab({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
        on ? "bg-amber-400 text-black" : "border border-white/15 text-white/70 hover:text-white",
      )}
    >
      {children}
    </button>
  );
}
