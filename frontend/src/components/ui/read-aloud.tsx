"use client";

import * as React from "react";
import { Loader2, Volume2, Pause, Play } from "lucide-react";

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
  stopSpeech,
  fetchTtsUrl,
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
  /** Prefer the cloud Kannada voice, then fall back to browser speech. */
  preferCloudKannada?: boolean;
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
  preferCloudKannada = false,
}: Props) {
  const { locale } = useTranslation();
  const state = useSpeech();
  const [mounted, setMounted] = React.useState(false);
  const [cloudStatus, setCloudStatus] = React.useState<
    "idle" | "loading" | "playing" | "paused"
  >("idle");
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const urlRef = React.useRef<string | null>(null);
  const requestRef = React.useRef<AbortController | null>(null);
  const id = React.useMemo(() => `ra-${++counter}`, []);

  React.useEffect(() => setMounted(true), []);
  React.useEffect(
    () => () => {
      requestRef.current?.abort();
      audioRef.current?.pause();
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    },
    [],
  );

  if (!mounted || (!preferCloudKannada && !canSpeak())) return null;

  const isActive = state.activeId === id;
  const isPlaying =
    cloudStatus === "playing" || (isActive && state.status === "playing");
  const isPaused =
    cloudStatus === "paused" || (isActive && state.status === "paused");
  const isLoading = cloudStatus === "loading";

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

  const playBrowserSpeech = (
    resolvedText: string,
    resolvedLang: "kn-IN" | "en-IN",
  ) => {
    setCloudStatus("idle");
    if (canSpeak()) playSpeech(id, resolvedText, resolvedLang);
  };

  const onClick = async () => {
    if (cloudStatus === "playing") {
      audioRef.current?.pause();
      setCloudStatus("paused");
      return;
    }
    if (cloudStatus === "paused" && audioRef.current) {
      try {
        await audioRef.current.play();
        setCloudStatus("playing");
      } catch {
        const resolved = resolve();
        playBrowserSpeech(resolved.text, resolved.lang);
      }
      return;
    }
    if (isPlaying) {
      pauseSpeech();
    } else if (isPaused) {
      resumeSpeech();
    } else {
      const resolved = resolve();
      if (!resolved.text) return;
      if (!preferCloudKannada || resolved.lang !== "kn-IN") {
        playBrowserSpeech(resolved.text, resolved.lang);
        return;
      }

      setCloudStatus("loading");
      const controller = new AbortController();
      requestRef.current = controller;
      const url = await fetchTtsUrl(resolved.text, "kn", controller.signal);
      if (controller.signal.aborted) return;
      requestRef.current = null;

      if (!url) {
        playBrowserSpeech(resolved.text, resolved.lang);
        return;
      }

      stopSpeech();
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
      urlRef.current = url;
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => setCloudStatus("idle");
      audio.onerror = () => playBrowserSpeech(resolved.text, resolved.lang);
      try {
        await audio.play();
        setCloudStatus("playing");
      } catch {
        playBrowserSpeech(resolved.text, resolved.lang);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors disabled:cursor-wait disabled:opacity-70",
        isActive || cloudStatus !== "idle"
          ? "border-primary bg-primary/10 text-primary"
          : "border-border bg-background text-muted-foreground hover:text-foreground",
        className,
      )}
      aria-label={
        isLoading ? "Loading audio" : isPlaying ? "Pause" : isPaused ? "Resume" : "Play"
      }
    >
      {isLoading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : isPlaying ? (
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
