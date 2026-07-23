"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Feather, Loader2, Pause, Play, Sparkles, Volume2 } from "lucide-react";

import { useTranslation } from "@/i18n/language-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BlessingCard } from "@/components/roots/blessing-card";
import { decodeBlessing, type BlessingPayload } from "@/lib/roots/share";
import { fetchTtsUrl, playSpeech } from "@/lib/speech";

type VoiceState = "idle" | "loading" | "playing" | "paused";

/**
 * BlessingView — the public page a family member lands on when they open a
 * shared blessing link. It decodes the blessing from the URL, shows the card,
 * lets them hear it in Kannada, and gently invites them to plant their own
 * roots. This is the "pass it on" moment: no account, no install.
 */
export function BlessingView() {
  const { bi } = useTranslation();
  const params = useSearchParams();

  const blessing = React.useMemo<BlessingPayload | null>(() => {
    const token = params.get("d");
    return token ? decodeBlessing(token) : null;
  }, [params]);

  /* ----- Kannada voice (cloud, with browser fallback) ----- */
  const [voice, setVoice] = React.useState<VoiceState>("idle");
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const urlRef = React.useRef<string | null>(null);

  const stopVoice = React.useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setVoice("idle");
  }, []);

  const hearVoice = React.useCallback(async () => {
    if (!blessing) return;
    if (voice === "playing") {
      audioRef.current?.pause();
      setVoice("paused");
      return;
    }
    if (voice === "paused" && audioRef.current) {
      await audioRef.current.play().catch(() => {});
      setVoice("playing");
      return;
    }
    setVoice("loading");
    if (!urlRef.current) {
      urlRef.current = await fetchTtsUrl(blessing.kn, "kn");
    }
    if (urlRef.current) {
      const audio = audioRef.current ?? new Audio();
      audioRef.current = audio;
      audio.src = urlRef.current;
      audio.onended = () => setVoice("idle");
      audio.onerror = () => setVoice("idle");
      try {
        await audio.play();
        setVoice("playing");
        return;
      } catch {
        /* fall through to browser voice */
      }
    }
    playSpeech("shared-blessing", blessing.kn, "kn-IN");
    setVoice("idle");
  }, [voice, blessing]);

  React.useEffect(
    () => () => {
      audioRef.current?.pause();
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    },
    [],
  );

  return (
    <main className="relative min-h-dvh overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora-blob left-[12%] top-16 h-56 w-56 animate-float-slow bg-primary/20" />
        <div className="aurora-blob right-[10%] bottom-16 h-64 w-64 animate-float bg-amber-400/20" />
      </div>

      <div className="container flex flex-col items-center py-16 md:py-24">
        {blessing ? (
          <div className="flex w-full flex-col items-center">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-amber-700 dark:text-amber-500">
              <Feather className="h-4 w-4" />
              {bi("A blessing for you", "ನಿಮಗಾಗಿ ಒಂದು ಆಶೀರ್ವಾದ")}
            </div>

            <h1 className="mt-5 max-w-2xl text-center font-serif text-3xl leading-snug text-foreground sm:text-4xl">
              {blessing.from
                ? bi(
                    `${blessing.from} left these words for you.`,
                    `${blessing.from} ಈ ಮಾತುಗಳನ್ನು ನಿಮಗಾಗಿ ಬಿಟ್ಟಿದ್ದಾರೆ.`,
                  )
                : bi(
                    "Someone left these words for you.",
                    "ಯಾರೋ ಈ ಮಾತುಗಳನ್ನು ನಿಮಗಾಗಿ ಬಿಟ್ಟಿದ್ದಾರೆ.",
                  )}
            </h1>

            {/* Hear it in Kannada — the signature moment, for the receiver too */}
            <div className="mt-8 flex flex-col items-center">
              <button
                onClick={hearVoice}
                className={cn(
                  "group inline-flex items-center gap-2.5 rounded-full bg-amber-900 px-6 py-3 text-sm font-medium text-amber-50",
                  "shadow-lg transition-transform hover:bg-amber-950 active:scale-95",
                )}
              >
                {voice === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : voice === "playing" ? (
                  <Pause className="h-4 w-4" />
                ) : voice === "paused" ? (
                  <Play className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
                {voice === "playing"
                  ? bi("Pause", "ವಿರಾಮ")
                  : bi("Hear it in Kannada", "ಕನ್ನಡದಲ್ಲಿ ಕೇಳಿ")}
              </button>
              {voice !== "idle" && voice !== "loading" && (
                <button
                  onClick={stopVoice}
                  className="mt-2 text-xs text-amber-800/70 underline-offset-2 hover:underline dark:text-amber-500/70"
                >
                  {bi("Stop", "ನಿಲ್ಲಿಸಿ")}
                </button>
              )}
            </div>

            <div className="mt-10">
              <BlessingCard
                from={blessing.from || bi("Your family", "ನಿಮ್ಮ ಕುಟುಂಬ")}
                village={blessing.village}
                blessingKn={blessing.kn}
                blessingEn={blessing.en}
              />
            </div>

            {/* Invitation to pass it on */}
            <div className="mt-14 max-w-xl border-t border-amber-900/15 pt-10 text-center dark:border-amber-500/15">
              <p className="font-serif text-xl leading-relaxed text-foreground sm:text-2xl">
                {bi(
                  "Every family has a blessing worth keeping.",
                  "ಪ್ರತಿ ಕುಟುಂಬಕ್ಕೂ ಉಳಿಸಿಕೊಳ್ಳಬೇಕಾದ ಒಂದು ಆಶೀರ್ವಾದವಿದೆ.",
                )}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                {bi(
                  "Plant your roots and hear your own ancestors speak — in Kannada.",
                  "ನಿಮ್ಮ ಬೇರುಗಳನ್ನು ನೆಡಿ, ನಿಮ್ಮ ಪೂರ್ವಜರ ಧ್ವನಿಯನ್ನು ಕನ್ನಡದಲ್ಲಿ ಕೇಳಿ.",
                )}
              </p>
              <Button
                asChild
                className="mt-7 h-12 gap-2 rounded-full bg-amber-900 px-7 text-base text-amber-50 hover:bg-amber-950"
              >
                <Link href="/roots">
                  <Sparkles className="h-4 w-4" />
                  {bi("Begin with your Roots", "ನಿಮ್ಮ ಬೇರುಗಳಿಂದ ಆರಂಭಿಸಿ")}
                </Link>
              </Button>
              <p className="mt-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Akkaverse · ನಮ್ಮ ಕಥೆ ಮುಂದುವರಿಯಲಿ
              </p>
            </div>
          </div>
        ) : (
          /* No / invalid token */
          <div className="flex max-w-md flex-col items-center text-center">
            <Feather className="h-8 w-8 text-amber-700 dark:text-amber-500" />
            <h1 className="mt-5 font-serif text-2xl text-foreground sm:text-3xl">
              {bi("This blessing couldn't be opened", "ಈ ಆಶೀರ್ವಾದ ತೆರೆಯಲಾಗಲಿಲ್ಲ")}
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              {bi(
                "The link may be incomplete. But your own family's blessing is waiting.",
                "ಲಿಂಕ್ ಅಪೂರ್ಣವಾಗಿರಬಹುದು. ಆದರೆ ನಿಮ್ಮ ಕುಟುಂಬದ ಆಶೀರ್ವಾದ ಕಾಯುತ್ತಿದೆ.",
              )}
            </p>
            <Button
              asChild
              className="mt-7 h-12 gap-2 rounded-full bg-amber-900 px-7 text-base text-amber-50 hover:bg-amber-950"
            >
              <Link href="/roots">
                <Sparkles className="h-4 w-4" />
                {bi("Begin with your Roots", "ನಿಮ್ಮ ಬೇರುಗಳಿಂದ ಆರಂಭಿಸಿ")}
              </Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
