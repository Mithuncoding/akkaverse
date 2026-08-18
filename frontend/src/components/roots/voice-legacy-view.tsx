"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  Heart,
  Home,
  LockKeyhole,
  MapPin,
  Mic,
  Quote,
  ShieldCheck,
} from "lucide-react";

import { VoiceLesson } from "@/components/roots/voice-lesson";
import { VoicePlayer } from "@/components/roots/voice-player";
import { useTranslation } from "@/i18n/language-provider";
import { decodeVoiceLegacy } from "@/lib/roots/voice-share";

export function VoiceLegacyView() {
  const { bi } = useTranslation();
  const searchParams = useSearchParams();
  const payload = decodeVoiceLegacy(searchParams.get("d") ?? "");

  if (!payload) {
    return (
      <main className="container grid min-h-[75dvh] place-items-center py-16">
        <div className="max-w-lg text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-secondary text-muted-foreground">
            <LockKeyhole className="h-6 w-6" />
          </span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight">
            {bi("This family link is incomplete", "ಈ ಕುಟುಂಬದ ಲಿಂಕ್ ಅಪೂರ್ಣವಾಗಿದೆ")}
          </h1>
          <p className="mt-3 text-muted-foreground">
            {bi(
              "Ask the sender for a new Voice Legacy link, or begin preserving your own family story.",
              "ಕಳುಹಿಸಿದವರಿಂದ ಹೊಸ ಧ್ವನಿ ಪರಂಪರೆ ಲಿಂಕ್ ಕೇಳಿ, ಅಥವಾ ನಿಮ್ಮ ಕುಟುಂಬದ ಕಥೆಯನ್ನು ಉಳಿಸಲು ಆರಂಭಿಸಿ.",
            )}
          </p>
          <Link
            href="/roots"
            className="mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
          >
            {bi("Begin with your roots", "ನಿಮ್ಮ ಬೇರುಗಳಿಂದ ಆರಂಭಿಸಿ")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
    );
  }

  const place = [payload.village, payload.district].filter(Boolean).join(", ");
  const date = new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(payload.createdAt));

  return (
    <main className="relative overflow-hidden pb-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora-blob left-[8%] top-20 h-72 w-72 animate-float-slow bg-primary/20" />
        <div className="aurora-blob right-[6%] top-[34rem] h-80 w-80 animate-float bg-amber-400/15" />
        <div className="absolute inset-0 bg-dotgrid [mask-image:radial-gradient(70%_55%_at_50%_20%,#000,transparent)]" />
      </div>

      <section className="container pt-12 text-center sm:pt-20">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary shadow-soft backdrop-blur-xl">
          <Mic className="h-3.5 w-3.5" />
          {bi("A Voice Legacy was sent to you", "ನಿಮಗೆ ಧ್ವನಿ ಪರಂಪರೆ ಬಂದಿದೆ")}
        </div>
        <h1 className="mx-auto mt-6 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
          {payload.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Heart className="h-4 w-4 text-primary" />
            {bi("Words preserved for", "ಇವರಿಗಾಗಿ ಉಳಿಸಿದ ಪದಗಳು")} {payload.personName}
          </span>
          {place && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-primary" />
              {place}
            </span>
          )}
        </div>
      </section>

      <section className="container mt-9 max-w-4xl">
        <article className="roots-paper overflow-hidden rounded-[2rem] border border-amber-900/15 shadow-soft">
          <div className="px-5 py-8 sm:px-10 sm:py-12">
            <Quote className="h-6 w-6 text-amber-800/45" />
            <p lang="kn" className="mt-4 whitespace-pre-line font-serif text-xl leading-loose text-amber-950 sm:text-2xl">
              {payload.kannada}
            </p>
            <div className="my-7 h-px bg-amber-900/15" />
            <p className="whitespace-pre-line text-base leading-relaxed text-amber-950/75 sm:text-lg">
              {payload.english}
            </p>
            <p className="mt-7 font-serif text-lg italic text-amber-900">
              — {payload.personName}
            </p>

            <div className="mt-8 rounded-2xl border border-amber-900/15 bg-amber-50/50 p-4">
              <VoicePlayer
                text={payload.kannada || payload.english}
                originalAudioUrl={payload.originalAudioUrl}
              />
              <p className="mt-2 text-xs leading-relaxed text-amber-900/65">
                {payload.originalAudioUrl
                  ? bi(
                      "Shared with family permission in the speaker's original voice.",
                      "ಕುಟುಂಬದ ಅನುಮತಿಯೊಂದಿಗೆ ಮಾತನಾಡಿದವರ ಮೂಲ ಧ್ವನಿಯಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಲಾಗಿದೆ.",
                    )
                  : bi(
                      "This link uses a temporary synthesized Kannada narrator. It does not imitate or claim to be the family member's original voice.",
                      "ಈ ಲಿಂಕ್ ತಾತ್ಕಾಲಿಕ ಸಂಶ್ಲೇಷಿತ ಕನ್ನಡ ನಿರೂಪಕವನ್ನು ಬಳಸುತ್ತದೆ. ಇದು ಕುಟುಂಬದ ಸದಸ್ಯರ ಮೂಲ ಧ್ವನಿಯನ್ನು ಅನುಕರಿಸುವುದಿಲ್ಲ ಅಥವಾ ಹಾಗೆಂದು ಹೇಳುವುದಿಲ್ಲ.",
                    )}
              </p>
            </div>
          </div>

        </article>

        <div className="mt-6 overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft">
          <VoiceLesson payload={payload} />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card/75 p-5">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
            <h2 className="mt-3 font-semibold">
              {bi("A private family artifact", "ಖಾಸಗಿ ಕುಟುಂಬದ ನೆನಪು")}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {payload.originalAudioUrl
                ? bi(
                    "This link contains this recording and the details shown here. It cannot open the sender's family tree or any other private recordings.",
                    "ಈ ಲಿಂಕ್ ಈ ಧ್ವನಿ ಮತ್ತು ಇಲ್ಲಿ ಕಾಣುವ ವಿವರಗಳನ್ನು ಮಾತ್ರ ಹೊಂದಿದೆ. ಕಳುಹಿಸಿದವರ ಕುಟುಂಬ ಮರ ಅಥವಾ ಬೇರೆ ಯಾವುದೇ ಖಾಸಗಿ ಧ್ವನಿಗಳನ್ನು ತೆರೆಯಲು ಸಾಧ್ಯವಿಲ್ಲ.",
                  )
                : bi(
                    "This link contains only the words, name, and place shown here. It cannot open the sender's family tree or private recordings.",
                    "ಈ ಲಿಂಕ್ ಇಲ್ಲಿ ಕಾಣುವ ಪದಗಳು, ಹೆಸರು ಮತ್ತು ಸ್ಥಳವನ್ನು ಮಾತ್ರ ಹೊಂದಿದೆ. ಕಳುಹಿಸಿದವರ ಕುಟುಂಬ ಮರ ಅಥವಾ ಖಾಸಗಿ ಧ್ವನಿಗಳನ್ನು ತೆರೆಯಲು ಸಾಧ್ಯವಿಲ್ಲ.",
                  )}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card/75 p-5">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="mt-3 font-semibold">
              {bi("Passed on through Akkaverse", "ಅಕ್ಕವರ್ಸ್ ಮೂಲಕ ಮುಂದಕ್ಕೆ")}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {bi(
                `Preserved on ${date}. Create a capsule for someone whose words your family should never lose.`,
                `${date} ರಂದು ಉಳಿಸಲಾಗಿದೆ. ನಿಮ್ಮ ಕುಟುಂಬ ಕಳೆದುಕೊಳ್ಳಬಾರದ ಪದಗಳಿಗಾಗಿ ಒಂದು ಸಂಪುಟ ರಚಿಸಿ.`,
              )}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/roots"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-glow"
          >
            <Home className="h-4 w-4" />
            {bi("Preserve my family voice", "ನನ್ನ ಕುಟುಂಬದ ಧ್ವನಿ ಉಳಿಸಿ")}
          </Link>
          <Link
            href="/stories"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-background/70 px-6 text-sm font-semibold"
          >
            <BookOpen className="h-4 w-4" />
            {bi("Discover Kannada stories", "ಕನ್ನಡ ಕಥೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ")}
          </Link>
        </div>
      </section>
    </main>
  );
}