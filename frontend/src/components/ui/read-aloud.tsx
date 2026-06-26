"use client";

import * as React from "react";
import { Volume2, Pause, Play } from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/language-provider";
import {
  canSpeak,
  hasVoice,
  getSpeechState,
  subscribeSpeech,
  playSpeech,
  pauseSpeech,
  resumeSpeech,
} from "@/lib/speech";

/** Subscribe to the global speech controller. */
export function useSpeech() {
  return React.useSyncExternalStore(
    subscribeSpeech,
    getSpeechState,
    getSpeechState,
  );
}

let counter = 0;

type Props = {
  /** Single-text mode (e.g. chat) — read exactly this in `lang`. */
  text?: string;
  lang?: "kn-IN" | "en-IN";
  /** Bilingual mode — provide both and we pick the one we can actually speak. */
  textEn?: string;
  textKn?: string;
  /** Optional visible label for the button (e.g. "Listen"). */
  label?: string;
  className?: string;
};

/**
 * Inline read-aloud trigger. Toggles play/pause for its own snippet; the global
 * SpeechBar provides stop + speed while anything plays, so a single shared
 * control surface drives every "speak" button in the app.
 *
 * In bilingual mode it prefers Kannada audio, but falls back to English when the
 * device has no Kannada voice — so the user always hears clear narration.
 */
export function ReadAloud({
  text,
  lang = "kn-IN",
  textEn,
  textKn,
  label,
  className,
}: Props) {
  const { locale } = useTranslation();
  const state = useSpeech();
  const [mounted, setMounted] = React.useState(false);
  const id = React.useMemo(() => `ra-${++counter}`, []);

  React.useEffect(() => setMounted(true), []);
  if (!mounted || !canSpeak()) return null;

  const isActive = state.activeId === id;
  const isPlaying = isActive && state.status === "playing";
  const isPaused = isActive && state.status === "paused";

  // Decide what to actually speak.
  const resolve = (): { text: string; lang: "kn-IN" | "en-IN" } => {
    if (textEn !== undefined || textKn !== undefined) {
      const preferKn = locale !== "en";
      if (preferKn && textKn && hasVoice("kn-IN")) {
        return { text: textKn, lang: "kn-IN" };
      }
      if (textEn) return { text: textEn, lang: "en-IN" };
      return { text: textKn ?? "", lang: "kn-IN" };
    }
    return { text: text ?? "", lang };
  };

  const onClick = () => {
    if (isPlaying) {
      pauseSpeech();
    } else if (isPaused) {
      resumeSpeech();
    } else {
      const r = resolve();
      if (r.text) playSpeech(id, r.text, r.lang);
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
        isActive
          ? "border-primary bg-primary/10 text-primary"
          : "border-border bg-background text-muted-foreground hover:text-foreground",
        className,
      )}
      aria-label={isPlaying ? "Pause" : isPaused ? "Resume" : "Play"}
    >
      {isPlaying ? (
        <Pause className="h-3.5 w-3.5" />
      ) : isPaused ? (
        <Play className="h-3.5 w-3.5" />
      ) : (
        <Volume2 className="h-3.5 w-3.5" />
      )}
      {label && <span>{label}</span>}
    </button>
  );
}
