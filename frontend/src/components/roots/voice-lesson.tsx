"use client";

import * as React from "react";
import { CheckCircle2, Languages, RotateCcw, XCircle } from "lucide-react";

import { useTranslation } from "@/i18n/language-provider";
import { cn } from "@/lib/utils";
import type { VoiceLegacyPayload } from "@/lib/roots/voice-share";
import { VoicePlayer } from "@/components/roots/voice-player";

const VOCABULARY = [
  ["ಕನ್ನಡ", "Kannada"],
  ["ಬೇರು", "root"],
  ["ಕುಟುಂಬ", "family"],
  ["ಪ್ರೀತಿ", "love"],
  ["ನೆನಪು", "memory"],
  ["ಮನೆ", "home"],
  ["ಮಣ್ಣು", "soil"],
  ["ಆಶೀರ್ವಾದ", "blessing"],
  ["ಹಬ್ಬ", "festival"],
  ["ಅಜ್ಜಿ", "grandmother"],
  ["ಅಜ್ಜ", "grandfather"],
  ["ಮಗು", "child"],
] as const;

function firstSentence(text: string, max = 220): string {
  return (text.split(/[.!?।\n]/)[0] || text).trim().slice(0, max);
}

export function VoiceLesson({ payload }: { payload: VoiceLegacyPayload }) {
  const { bi } = useTranslation();
  const [answer, setAnswer] = React.useState<number | null>(null);
  const words = VOCABULARY.filter(([kannada]) =>
    payload.kannada.includes(kannada),
  ).slice(0, 4);
  const correct = firstSentence(payload.english) || payload.english;
  const options = [
    correct,
    bi(
      "It is an invitation to forget old family traditions.",
      "ಇದು ಹಳೆಯ ಕುಟುಂಬ ಸಂಪ್ರದಾಯಗಳನ್ನು ಮರೆಯುವ ಆಹ್ವಾನ.",
    ),
    bi(
      "It only describes the weather in Karnataka.",
      "ಇದು ಕರ್ನಾಟಕದ ಹವಾಮಾನವನ್ನು ಮಾತ್ರ ವಿವರಿಸುತ್ತದೆ.",
    ),
  ];

  return (
    <section className="border-t border-border/70 bg-secondary/20 px-5 py-7 text-foreground sm:px-8">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        <Languages className="h-4 w-4" />
        {bi("Learn from this voice", "ಈ ಧ್ವನಿಯಿಂದ ಕಲಿಯಿರಿ")}
      </div>

      <div className="mt-5 rounded-2xl border border-border bg-card/80 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {bi("Listen and repeat", "ಕೇಳಿ ಮತ್ತು ಪುನರಾವರ್ತಿಸಿ")}
        </p>
        <p lang="kn" className="mt-2 font-serif text-lg leading-relaxed">
          {firstSentence(payload.kannada) || payload.kannada}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">{correct}</p>
        <div className="mt-4">
          <VoicePlayer text={payload.kannada || payload.english} compact />
        </div>
      </div>

      {words.length > 0 && (
        <div className="mt-5">
          <p className="text-sm font-semibold">
            {bi("Words to carry forward", "ಮುಂದಕ್ಕೆ ಕೊಂಡೊಯ್ಯುವ ಪದಗಳು")}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {words.map(([kannada, english]) => (
              <span
                key={kannada}
                className="rounded-full border border-primary/20 bg-primary/[0.06] px-3 py-1.5 text-sm"
              >
                <span lang="kn" className="font-semibold text-primary">
                  {kannada}
                </span>{" "}
                · {english}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6">
        <p className="font-semibold">
          {bi(
            `What is ${payload.personName}'s message?`,
            `${payload.personName} ಅವರ ಸಂದೇಶವೇನು?`,
          )}
        </p>
        <div className="mt-3 grid gap-2">
          {options.map((option, index) => {
            const selected = answer === index;
            const correctOption = answer !== null && index === 0;
            return (
              <button
                key={`${index}-${option}`}
                type="button"
                disabled={answer !== null}
                onClick={() => setAnswer(index)}
                className={cn(
                  "flex min-h-12 items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                  answer === null && "hover:border-primary/50 hover:bg-primary/[0.04]",
                  correctOption && "border-emerald-500/50 bg-emerald-500/10",
                  selected && index !== 0 && "border-destructive/50 bg-destructive/10",
                )}
              >
                {correctOption ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                ) : selected ? (
                  <XCircle className="h-4 w-4 shrink-0 text-destructive" />
                ) : (
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[11px]">
                    {index + 1}
                  </span>
                )}
                {option}
              </button>
            );
          })}
        </div>
        {answer !== null && (
          <div className="mt-3 flex items-center justify-between gap-3 text-sm">
            <p className={answer === 0 ? "text-emerald-700" : "text-destructive"}>
              {answer === 0
                ? bi("You carried it forward.", "ನೀವು ಅದನ್ನು ಮುಂದಕ್ಕೆ ಕೊಂಡೊಯ್ದಿರಿ.")
                : bi("Read the meaning once more.", "ಅರ್ಥವನ್ನು ಮತ್ತೊಮ್ಮೆ ಓದಿ.")}
            </p>
            <button
              type="button"
              onClick={() => setAnswer(null)}
              className="inline-flex items-center gap-1 text-xs font-medium text-primary"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              {bi("Try again", "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ")}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}