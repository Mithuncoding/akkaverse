"use client";

import * as React from "react";
import { Search, X } from "lucide-react";

import { useTranslation } from "@/i18n/language-provider";
import { searchArchive, type SearchHit } from "@/data/dasara-archive";

const SUGGESTIONS = [
  "Independence",
  "Golden Howdah",
  "Chamundeshwari",
  "Karnataka",
  "Republic",
  "Elephant",
  "Wadiyar",
];

/**
 * Archive search — query the capsules by year, king, tradition, event…
 * Results jump the Time Machine straight to the matching year.
 */
export function DasaraSearch({ onJump }: { onJump: (year: number) => void }) {
  const { bi } = useTranslation();
  const [q, setQ] = React.useState("");
  const [focus, setFocus] = React.useState(false);

  const results: SearchHit[] = React.useMemo(() => searchArchive(q), [q]);
  const showPanel = focus && (q.trim().length > 0);

  return (
    <div className="relative w-full sm:max-w-md">
      <div className="flex items-center gap-2 rounded-full border border-amber-100/20 bg-black/40 px-4 py-2.5 focus-within:border-[rgb(var(--accent)/0.6)]">
        <Search className="h-4 w-4 shrink-0 text-amber-200/60" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setTimeout(() => setFocus(false), 150)}
          placeholder={bi(
            "Search year, king, tradition…",
            "ವರ್ಷ, ರಾಜ, ಸಂಪ್ರದಾಯ ಹುಡುಕಿ…",
          )}
          className="w-full bg-transparent text-sm text-amber-50 placeholder:text-amber-100/40 focus:outline-none"
        />
        {q && (
          <button
            onClick={() => setQ("")}
            aria-label={bi("Clear", "ಅಳಿಸಿ")}
            className="text-amber-200/60 hover:text-amber-100"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Quick suggestion chips */}
      {!q && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setQ(s)}
              className="rounded-full border border-amber-100/12 bg-black/30 px-2.5 py-1 text-[11px] text-amber-100/60 transition-colors hover:border-amber-100/30 hover:text-amber-100"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {showPanel && (
        <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-amber-100/20 bg-[#120c07] shadow-2xl">
          {results.length === 0 ? (
            <p className="px-4 py-4 text-sm text-amber-100/50">
              {bi("No matches in the archive.", "ಆರ್ಕೈವ್‌ನಲ್ಲಿ ಹೊಂದಾಣಿಕೆ ಇಲ್ಲ.")}
            </p>
          ) : (
            <ul className="max-h-72 overflow-y-auto">
              {results.map((r) => (
                <li key={r.year}>
                  <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      onJump(r.year);
                      setQ("");
                    }}
                    className="flex w-full flex-col gap-0.5 border-b border-amber-100/8 px-4 py-3 text-left transition-colors last:border-0 hover:bg-[rgb(var(--accent)/0.12)]"
                  >
                    <span className="text-sm font-semibold text-amber-50">
                      {r.label}
                    </span>
                    <span className="line-clamp-1 text-xs text-amber-100/55">
                      {r.snippet}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
