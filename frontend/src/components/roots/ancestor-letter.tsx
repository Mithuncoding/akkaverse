"use client";

import * as React from "react";
import Link from "next/link";
import {
  Feather,
  Loader2,
  MapPin,
  Milestone,
  PartyPopper,
  Pause,
  Play,
  RefreshCw,
  Sparkles,
  Volume2,
  type LucideIcon,
} from "lucide-react";

import { useTranslation } from "@/i18n/language-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Person } from "@/lib/roots/store";
import {
  curatedAncestorLetter,
  streamAncestorLetter,
  type AncestorLetter as Letter,
} from "@/lib/roots/ai";
import { fetchTtsUrl, playSpeech } from "@/lib/speech";
import { HeritageCard } from "@/components/roots/heritage-card";
import { AskAkka } from "@/components/ui/ask-akka";

/** A soft amber pill link that opens Roots outward into the rest of Akkaverse. */
function JourneyLink({
  href,
  icon: Icon,
  en,
  kn,
}: {
  href: string;
  icon: LucideIcon;
  en: string;
  kn: string;
}) {
  const { bi } = useTranslation();
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 rounded-full border border-amber-900/25 bg-amber-50/50 px-3.5 py-1.5 text-sm font-medium text-amber-900 transition-all hover:-translate-y-0.5 hover:bg-amber-900/10 active:scale-95"
    >
      <Icon className="h-3.5 w-3.5" />
      {bi(en, kn)}
    </Link>
  );
}

type VoiceState = "idle" | "loading" | "playing" | "paused";

/**
 * Pick a female elder to "speak" the letter — the cloud Kannada voice is
 * female, so the writer should be a grandmother/ajji (the blessing addresses
 * "ajji" too). We infer from Kannada/Telugu name endings (…amma / …avva are
 * feminine; …appa / …anna / …gowda are masculine), falling back to the eldest.
 */
function pickFemaleElder(elders: Person[]): Person | null {
  if (elders.length === 0) return null;
  const female = /(amma|avva|akka|mma|bai|devi|lakshmi)$/i;
  const male = /(appa|anna|gowda|raya|reddy|aiah|aih|swamy|rao)$/i;
  return (
    elders.find((p) => female.test(p.name.trim())) ??
    elders.find((p) => !male.test(p.name.trim())) ??
    elders[0]
  );
}

export function AncestorLetter({ people }: { people: Person[] }) {
  const { bi, locale } = useTranslation();

  const self = React.useMemo(
    () => people.find((p) => p.relation === "self") ?? null,
    [people],
  );
  const elders = React.useMemo(
    () => people.filter((p) => p.gen < 2).sort((a, b) => a.gen - b.gen),
    [people],
  );

  // Put the female elder first so both the curated letter and the AI variant
  // are written in her voice (matching the female Kannada narration).
  const orderedElders = React.useMemo(() => {
    const she = pickFemaleElder(elders);
    if (!she) return elders;
    return [she, ...elders.filter((p) => p.id !== she.id)];
  }, [elders]);

  const letter = React.useMemo<Letter>(() => {
    const elder = orderedElders[0];
    return curatedAncestorLetter({
      from: elder?.name,
      to: self?.name,
      village: elder?.village || self?.village,
      district: elder?.district || self?.district,
    });
  }, [orderedElders, self]);

  const [opened, setOpened] = React.useState(false);
  // AI-authored variant (English prose); when present it replaces the shown body.
  const [aiText, setAiText] = React.useState("");
  const [aiLoading, setAiLoading] = React.useState(false);
  const aiAbort = React.useRef<AbortController | null>(null);

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
    // Reuse an already-fetched clip if we have one.
    if (!urlRef.current) {
      urlRef.current = await fetchTtsUrl(letter.kn, "kn");
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
    // Fallback: browser speech (may be English if no kn voice exists).
    playSpeech("ancestor-letter", letter.kn, "kn-IN");
    setVoice("idle");
  }, [voice, letter.kn]);

  React.useEffect(
    () => () => {
      aiAbort.current?.abort();
      audioRef.current?.pause();
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    },
    [],
  );

  const writeWithAi = React.useCallback(async () => {
    if (aiLoading) return;
    aiAbort.current?.abort();
    const ctrl = new AbortController();
    aiAbort.current = ctrl;
    setAiText("");
    setAiLoading(true);
    const full = await streamAncestorLetter(
      self,
      orderedElders,
      (tok) => setAiText((t) => t + tok),
      ctrl.signal,
    );
    if (!ctrl.signal.aborted) {
      if (full) setAiText((t) => (t.length < full.length ? full : t));
      setAiLoading(false);
    }
  }, [aiLoading, self, orderedElders]);

  // What prose to show: the AI variant if present, else the curated letter in
  // the reader's language (both = English body, Kannada is spoken aloud).
  const body = aiText || (locale === "kn" ? letter.kn : letter.en);

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-primary/20 p-1">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora-blob left-[15%] top-6 h-48 w-48 animate-float-slow bg-primary/25" />
        <div className="aurora-blob right-[12%] bottom-6 h-56 w-56 animate-float bg-amber-400/20" />
      </div>

      <div className="roots-paper relative rounded-[1.85rem] px-6 py-10 sm:px-14 sm:py-14">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-800">
            <Feather className="h-4 w-4" />
            {bi("If They Could Speak", "ಅವರು ಮಾತಾಡಬಲ್ಲರಾದರೆ")}
          </div>

          {!opened && (
            <div className="mt-8 text-center">
              <p className="font-serif text-2xl leading-snug text-amber-950 sm:text-3xl">
                {bi(
                  "A letter from those who came before — to those yet to come.",
                  "ಹಿಂದೆ ಬಂದವರಿಂದ ಮುಂದೆ ಬರುವವರಿಗೆ ಒಂದು ಪತ್ರ.",
                )}
              </p>
              <Button
                onClick={() => setOpened(true)}
                className="mt-8 h-12 gap-2 rounded-full bg-amber-900 px-7 text-base text-amber-50 hover:bg-amber-950"
              >
                <Feather className="h-4 w-4" />
                {bi("Open the letter", "ಪತ್ರ ತೆರೆಯಿರಿ")}
              </Button>
            </div>
          )}

          {opened && (
            <article className="mt-8 animate-fade-up">
              {/* Hear-in-Kannada CTA — the signature moment */}
              <div className="mb-7 flex flex-col items-center">
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
                    : bi(
                        `Hear ${letter.from} in Kannada`,
                        `${letter.from} ಅವರ ಧ್ವನಿ ಕೇಳಿ`,
                      )}
                </button>
                {voice !== "idle" && voice !== "loading" && (
                  <button
                    onClick={stopVoice}
                    className="mt-2 text-xs text-amber-800/70 underline-offset-2 hover:underline"
                  >
                    {bi("Stop", "ನಿಲ್ಲಿಸಿ")}
                  </button>
                )}
              </div>

              <p className="font-serif text-lg text-amber-900">
                {bi("My dear ones,", "ನನ್ನ ಪ್ರೀತಿಯವರೇ,")}
              </p>
              <div className="mt-4 whitespace-pre-wrap font-serif text-lg leading-loose text-amber-950 sm:text-xl">
                {body}
                {aiLoading && <span className="type-caret" />}
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                <p className="font-serif text-lg italic text-amber-900">
                  — {letter.from}
                </p>
                <button
                  onClick={writeWithAi}
                  disabled={aiLoading}
                  className="inline-flex items-center gap-1.5 rounded-full border border-amber-900/30 px-3 py-1.5 text-xs font-medium text-amber-900 transition-colors hover:bg-amber-900/10 disabled:opacity-60"
                >
                  {aiLoading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : aiText ? (
                    <RefreshCw className="h-3.5 w-3.5" />
                  ) : (
                    <Sparkles className="h-3.5 w-3.5" />
                  )}
                  {aiText
                    ? bi("Write another", "ಮತ್ತೊಂದು ಬರೆಯಿರಿ")
                    : bi("Reimagine with AI", "AI ಜೊತೆ ಮರುಕಲ್ಪಿಸಿ")}
                </button>
              </div>

              {/* The take-away artifact */}
              <div className="mt-12">
                <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.25em] text-amber-800">
                  {bi("Keep their blessing", "ಅವರ ಆಶೀರ್ವಾದ ಇಟ್ಟುಕೊಳ್ಳಿ")}
                </p>
                <HeritageCard
                  from={letter.from}
                  village={letter.village}
                  blessingKn={letter.blessingKn}
                  blessingEn={letter.blessingEn}
                />
              </div>

              {/* Continue their story — Roots opens outward into the culture. */}
              <div className="mt-12 border-t border-amber-900/15 pt-8">
                <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-amber-800">
                  {bi("Continue their story", "ಅವರ ಕಥೆ ಮುಂದುವರಿಸಿ")}
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
                  <AskAkka
                    guide="historian"
                    q={`Tell me about ${letter.village} in Karnataka`}
                    labelEn={`Ask about ${orderedElders[0]?.village || "their village"}`}
                    labelKn={`${orderedElders[0]?.village || "ಅವರ ಊರು"} ಬಗ್ಗೆ ಕೇಳಿ`}
                  />
                  <JourneyLink
                    href="/explore"
                    icon={MapPin}
                    en="Explore their Karnataka"
                    kn="ಅವರ ಕರ್ನಾಟಕ ಅನ್ವೇಷಿಸಿ"
                  />
                  <JourneyLink
                    href="/festivals"
                    icon={PartyPopper}
                    en="Their festivals"
                    kn="ಅವರ ಹಬ್ಬಗಳು"
                  />
                  <JourneyLink
                    href="/timeline"
                    icon={Milestone}
                    en="Walk their era"
                    kn="ಅವರ ಯುಗದಲ್ಲಿ ನಡೆಯಿರಿ"
                  />
                </div>
              </div>
            </article>
          )}
        </div>
      </div>
    </div>
  );
}
