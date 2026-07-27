"use client";

import * as React from "react";
import { Loader2, Pause, Play, Volume2 } from "lucide-react";

import { useTranslation } from "@/i18n/language-provider";
import { cn } from "@/lib/utils";
import { fetchTtsUrl, playSpeech } from "@/lib/speech";
import { getVoiceAudio } from "@/lib/roots/voice-audio";
import { signedVoiceUrl } from "@/lib/roots/voice-cloud";

type PlayerState = "idle" | "loading" | "playing" | "paused" | "error";

export function VoicePlayer({
  text,
  audioId,
  cloudAudioPath,
  compact = false,
}: {
  text: string;
  audioId?: string;
  cloudAudioPath?: string;
  compact?: boolean;
}) {
  const { bi } = useTranslation();
  const [state, setState] = React.useState<PlayerState>("idle");
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const urlRef = React.useRef<string | null>(null);
  const objectUrlRef = React.useRef(false);
  const hasOriginal = Boolean(audioId || cloudAudioPath);

  React.useEffect(
    () => () => {
      audioRef.current?.pause();
      if (urlRef.current && objectUrlRef.current) {
        URL.revokeObjectURL(urlRef.current);
      }
    },
    [],
  );

  const play = async () => {
    if (state === "playing") {
      audioRef.current?.pause();
      setState("paused");
      return;
    }
    if (state === "paused" && audioRef.current) {
      await audioRef.current.play();
      setState("playing");
      return;
    }

    setState("loading");
    if (!urlRef.current) {
      try {
        if (audioId) {
          const blob = await getVoiceAudio(audioId);
          if (blob) {
            urlRef.current = URL.createObjectURL(blob);
            objectUrlRef.current = true;
          }
        }
        if (!urlRef.current && cloudAudioPath) {
          urlRef.current = await signedVoiceUrl(cloudAudioPath);
          objectUrlRef.current = false;
        }
        if (!urlRef.current && !hasOriginal) {
          urlRef.current = await fetchTtsUrl(text, "kn");
          objectUrlRef.current = true;
        }
      } catch {
        urlRef.current = null;
      }
    }

    if (!urlRef.current) {
      if (!hasOriginal) {
        playSpeech(`voice-legacy-${text.slice(0, 24)}`, text, "kn-IN");
        setState("idle");
      } else {
        setState("error");
      }
      return;
    }

    const audio = audioRef.current ?? new Audio();
    audioRef.current = audio;
    audio.src = urlRef.current;
    audio.onended = () => setState("idle");
    audio.onerror = () => setState("error");
    try {
      await audio.play();
      setState("playing");
    } catch {
      setState("error");
    }
  };

  const Icon =
    state === "loading"
      ? Loader2
      : state === "playing"
        ? Pause
        : state === "paused"
          ? Play
          : Volume2;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={play}
        disabled={!text.trim() || state === "loading"}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all active:scale-95 disabled:opacity-50",
          compact
            ? "h-9 px-3 text-xs"
            : "h-11 bg-primary px-5 text-sm text-primary-foreground shadow-glow",
          compact && "border border-primary/25 bg-primary/10 text-primary",
        )}
      >
        <Icon className={cn("h-4 w-4", state === "loading" && "animate-spin")} />
        {state === "playing"
          ? bi("Pause", "ವಿರಾಮ")
          : hasOriginal
            ? bi("Play original voice", "ಮೂಲ ಧ್ವನಿ ಕೇಳಿ")
            : bi("Play AI narration", "AI ನಿರೂಪಣೆ ಕೇಳಿ")}
      </button>
      {!hasOriginal && (
        <span className="text-[11px] text-muted-foreground">
          {bi("Temporary synthesized voice", "ತಾತ್ಕಾಲಿಕ ಸಂಶ್ಲೇಷಿತ ಧ್ವನಿ")}
        </span>
      )}
      {state === "error" && (
        <span className="text-xs text-destructive">
          {bi("Audio unavailable on this device", "ಈ ಸಾಧನದಲ್ಲಿ ಧ್ವನಿ ಲಭ್ಯವಿಲ್ಲ")}
        </span>
      )}
    </div>
  );
}