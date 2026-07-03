"use client";

import * as React from "react";
import Link from "next/link";
import {
  Landmark,
  Loader2,
  Sparkles,
  MapPin,
  BookOpen,
  Milestone,
  Brain,
  ArrowRight,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/language-provider";
import { Button } from "@/components/ui/button";
import type { Person } from "@/lib/roots/store";
import { streamHeritage } from "@/lib/roots/ai";

type Place = { village?: string; district?: string; key: string; label: string };

function placesOf(people: Person[]): Place[] {
  const seen = new Set<string>();
  const out: Place[] = [];
  for (const p of people) {
    const label = [p.village, p.district].filter(Boolean).join(", ");
    if (!label) continue;
    const key = label.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ village: p.village, district: p.district, key, label });
  }
  return out;
}

/** Render the streamed markdown-lite heritage text. */
function Heritage({ text }: { text: string }) {
  const lines = text.split("\n").filter((l) => l.trim().length > 0);
  return (
    <div className="space-y-4">
      {lines.map((line, i) => {
        if (line.startsWith("## ")) {
          return (
            <h4
              key={i}
              className="pt-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary"
            >
              {line.replace(/^##\s*/, "")}
            </h4>
          );
        }
        return (
          <p key={i} className="text-pretty leading-relaxed text-foreground/90">
            {line.replace(/^#+\s*/, "")}
          </p>
        );
      })}
    </div>
  );
}

const SUGGESTIONS = [
  { href: "/explore", icon: MapPin, en: "Explore the map", kn: "ನಕ್ಷೆ ಅನ್ವೇಷಿಸಿ" },
  { href: "/stories", icon: BookOpen, en: "Read folk stories", kn: "ಜನಪದ ಕಥೆಗಳು" },
  { href: "/timeline", icon: Milestone, en: "Walk the timeline", kn: "ಕಾಲರೇಖೆ" },
  { href: "/quiz", icon: Brain, en: "Test your roots", kn: "ರಸಪ್ರಶ್ನೆ" },
];

export function HeritageEngine({ people }: { people: Person[] }) {
  const { bi } = useTranslation();
  const places = React.useMemo(() => placesOf(people), [people]);
  const [active, setActive] = React.useState(0);
  const [text, setText] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const abortRef = React.useRef<AbortController | null>(null);

  const place = places[active];

  const reveal = React.useCallback(async () => {
    if (!place || loading) return;
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setText("");
    setDone(false);
    setLoading(true);
    const full = await streamHeritage(
      place.village ?? "",
      place.district ?? "",
      (tok) => setText((t) => t + tok),
      ctrl.signal,
    );
    if (!ctrl.signal.aborted) {
      if (full && !text) setText(full);
      setLoading(false);
      setDone(true);
    }
  }, [place, loading, text]);

  React.useEffect(() => () => abortRef.current?.abort(), []);

  if (places.length === 0) {
    return (
      <div className="glass rounded-3xl border p-8 text-center text-sm text-muted-foreground">
        {bi(
          "Add a village or district to a family member to unlock their heritage.",
          "ಪರಂಪರೆ ತೆರೆಯಲು ಕುಟುಂಬ ಸದಸ್ಯರಿಗೆ ಊರು ಅಥವಾ ಜಿಲ್ಲೆ ಸೇರಿಸಿ.",
        )}
      </div>
    );
  }

  return (
    <div className="glass overflow-hidden rounded-3xl border shadow-soft">
      <div className="border-b border-border/70 bg-primary/[0.04] p-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          <Landmark className="h-4 w-4" />
          {bi("Heritage Engine", "ಪರಂಪರೆ ಎಂಜಿನ್")}
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          {bi(
            "Let a heritage historian tell the story of your family's soil.",
            "ನಿಮ್ಮ ಕುಟುಂಬದ ನೆಲದ ಕಥೆಯನ್ನು ಪರಂಪರೆ ಇತಿಹಾಸಕಾರ ಹೇಳಲಿ.",
          )}
        </p>
        {places.length > 1 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {places.map((pl, i) => (
              <button
                key={pl.key}
                onClick={() => {
                  setActive(i);
                  setText("");
                  setDone(false);
                }}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  i === active
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/40",
                )}
              >
                <MapPin className="h-3 w-3" />
                {pl.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="p-6">
        {!text && !loading && (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <p className="text-lg font-semibold">
              {bi("The story of", "ಇದರ ಕಥೆ")}{" "}
              <span className="gradient-text">{place?.label}</span>
            </p>
            <Button onClick={reveal} className="h-11 gap-2 rounded-full">
              <Sparkles className="h-4 w-4" />
              {bi("Reveal the heritage", "ಪರಂಪರೆ ತೆರೆಯಿರಿ")}
            </Button>
          </div>
        )}

        {(text || loading) && (
          <>
            <Heritage text={text} />
            {loading && (
              <div className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                {bi("The historian is remembering…", "ಇತಿಹಾಸಕಾರ ನೆನಪಿಸಿಕೊಳ್ಳುತ್ತಿದ್ದಾರೆ…")}
              </div>
            )}
          </>
        )}

        {done && (
          <div className="animate-fade-up mt-7 border-t border-border/70 pt-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {bi("Continue the journey", "ಪ್ರಯಾಣ ಮುಂದುವರಿಸಿ")}
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {SUGGESTIONS.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="group flex items-center gap-2 rounded-xl border border-border bg-card/50 px-3 py-2.5 text-sm transition-all hover:border-primary/40 hover:bg-primary/[0.06]"
                >
                  <s.icon className="h-4 w-4 shrink-0 text-primary" />
                  <span className="truncate">{bi(s.en, s.kn)}</span>
                  <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
