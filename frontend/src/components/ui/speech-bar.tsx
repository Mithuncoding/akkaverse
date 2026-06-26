"use client";

import { Pause, Play, Square, Gauge, Volume2 } from "lucide-react";

import {
  pauseSpeech,
  resumeSpeech,
  stopSpeech,
  setSpeechRate,
  SPEECH_RATES,
} from "@/lib/speech";
import { useSpeech } from "@/components/ui/read-aloud";

/**
 * Global floating audio control. Appears whenever anything is being read aloud,
 * giving a single, always-reachable place to pause / resume / stop and change
 * speed — so every "speak" button in the app gains full playback controls.
 */
export function SpeechBar() {
  const state = useSpeech();
  if (state.status === "idle") return null;

  const playing = state.status === "playing";

  const cycleRate = () => {
    const i = SPEECH_RATES.indexOf(
      state.rate as (typeof SPEECH_RATES)[number],
    );
    setSpeechRate(SPEECH_RATES[(i + 1) % SPEECH_RATES.length]);
  };

  return (
    <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 animate-fade-up">
      <div className="flex items-center gap-1.5 rounded-full border border-border bg-card/95 p-1.5 pl-3 shadow-lg backdrop-blur">
        <span className="mr-1 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Volume2 className="h-3.5 w-3.5 text-primary" />
          {playing ? "Reading…" : "Paused"}
        </span>

        <button
          type="button"
          onClick={playing ? pauseSpeech : resumeSpeech}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
          aria-label={playing ? "Pause" : "Resume"}
        >
          {playing ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </button>

        <button
          type="button"
          onClick={stopSpeech}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Stop"
        >
          <Square className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          onClick={cycleRate}
          className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-1.5 text-xs font-semibold tabular-nums text-foreground transition-colors hover:border-primary/50"
          aria-label="Playback speed"
          title="Playback speed"
        >
          <Gauge className="h-3.5 w-3.5" />
          {state.rate}x
        </button>
      </div>
    </div>
  );
}
