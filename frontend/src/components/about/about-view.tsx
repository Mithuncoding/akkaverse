"use client";

import * as React from "react";
import { Heart, Quote } from "lucide-react";

import { useTranslation } from "@/i18n/language-provider";

/**
 * AboutView — a personal note from the maker ("ನಮ್ಮ ಕಥೆ / Our Story").
 *
 * Fully bilingual via `bi()`. The long-form note lives inline here (rather than
 * in the shared dictionary) because it is a single, self-contained essay.
 */
export function AboutView() {
  const { bi } = useTranslation();
  const [photoOk, setPhotoOk] = React.useState(true);

  const paragraphs: [string, string][] = [
    [
      "My name is Mithun. I come from Lakkahalli, a village in Sidlaghatta taluk of Chikkaballapura district. Growing up in a rural setting, the stories our grandparents told, the folk songs, the festival celebrations, and the cultural heritage of Kannada were all a part of our everyday life.",
      "ನನ್ನ ಹೆಸರು ಮಿಥುನ್. ನಾನು ಚಿಕ್ಕಬಳ್ಳಾಪುರ ಜಿಲ್ಲೆಯ ಶಿಡ್ಲಘಟ್ಟ ತಾಲ್ಲೂಕಿನ ಲಕ್ಕಹಳ್ಳಿ ಗ್ರಾಮದಿಂದ ಬಂದಿದ್ದೇನೆ. ಗ್ರಾಮೀಣ ಪರಿಸರದಲ್ಲಿ ಬೆಳೆದ ನನಗೆ, ನಮ್ಮ ಅಜ್ಜಿ-ಅಜ್ಜಿಯರು ಹೇಳುವ ಕಥೆಗಳು, ಜನಪದ ಹಾಡುಗಳು, ಹಬ್ಬ-ಹರಿದಿನಗಳ ಆಚರಣೆಗಳು ಮತ್ತು ಕನ್ನಡದ ಸಾಂಸ್ಕೃತಿಕ ಪರಂಪರೆ ನಮ್ಮ ಜೀವನದ ಒಂದು ಭಾಗವಾಗಿದ್ದವು.",
    ],
    [
      "But in today's digital age, we see the younger generation — and especially Kannada children growing up abroad — drifting away from their language and roots. If the memories, life experiences, and stories of our elders are not recorded, they risk vanishing with a single generation.",
      "ಆದರೆ ಇಂದಿನ ಡಿಜಿಟಲ್ ಯುಗದಲ್ಲಿ, ವಿಶೇಷವಾಗಿ ಯುವ ಪೀಳಿಗೆ ಮತ್ತು ವಿದೇಶಗಳಲ್ಲಿ ಬೆಳೆಯುತ್ತಿರುವ ಕನ್ನಡಿಗ ಮಕ್ಕಳು ತಮ್ಮ ಭಾಷೆ ಮತ್ತು ಬೇರುಗಳಿಂದ ದೂರವಾಗುತ್ತಿರುವುದನ್ನು ನಾವು ನೋಡುತ್ತಿದ್ದೇವೆ. ಹಿರಿಯರ ನೆನಪುಗಳು, ಜೀವನಾನುಭವಗಳು ಮತ್ತು ಕಥೆಗಳು ದಾಖಲಾಗದಿದ್ದರೆ, ಅವು ಒಂದು ತಲೆಮಾರಿನೊಂದಿಗೆ ಕಣ್ಮರೆಯಾಗುವ ಅಪಾಯವಿದೆ.",
    ],
    [
      "With this concern in mind, we built a platform called 'Akkaverse'. It is not just an AI application. It is a digital bridge that carries the Kannada language, history, folk tales, travel destinations, and the precious memories of our elders to the next generation.",
      "ಈ ಸಮಸ್ಯೆಯನ್ನು ಗಮನದಲ್ಲಿಟ್ಟುಕೊಂಡು, ನಾವು 'ಅಕ್ಕಾವರ್ಸ್' ಎಂಬ ವೇದಿಕೆಯನ್ನು ನಿರ್ಮಿಸಿದ್ದೇವೆ. ಇದು ಕೇವಲ ಒಂದು AI ಅಪ್ಲಿಕೇಶನ್ ಅಲ್ಲ. ಇದು ಕನ್ನಡ ಭಾಷೆ, ಇತಿಹಾಸ, ಜನಪದ ಕಥೆಗಳು, ಪ್ರವಾಸಿ ತಾಣಗಳು ಮತ್ತು ಹಿರಿಯರ ಅಮೂಲ್ಯ ನೆನಪುಗಳನ್ನು ಮುಂದಿನ ಪೀಳಿಗೆಗೆ ತಲುಪಿಸುವ ಒಂದು ಡಿಜಿಟಲ್ ಸೇತುವೆಯಾಗಿದೆ.",
    ],
    [
      "Our goal is to use technology to preserve our heritage and to keep the soul of Kannada alive for generations to come.",
      "ತಂತ್ರಜ್ಞಾನವನ್ನು ಬಳಸಿಕೊಂಡು ನಮ್ಮ ಪರಂಪರೆಯನ್ನು ಉಳಿಸುವುದು ಮತ್ತು ಕನ್ನಡದ ಆತ್ಮವನ್ನು ಮುಂದಿನ ತಲೆಮಾರುಗಳಿಗೂ ಜೀವಂತವಾಗಿಡುವುದು ನಮ್ಮ ಉದ್ದೇಶವಾಗಿದೆ.",
    ],
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Aurora backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora-blob left-[12%] top-16 h-64 w-64 animate-float-slow bg-primary/30" />
        <div className="aurora-blob right-[10%] top-40 h-72 w-72 animate-float bg-amber-400/20" />
        <div className="absolute inset-0 bg-dotgrid [mask-image:radial-gradient(60%_45%_at_50%_20%,#000,transparent)]" />
      </div>

      <article className="container max-w-3xl py-20 md:py-28">
        {/* Eyebrow */}
        <div className="flex justify-center">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-muted-foreground shadow-soft">
            ✿ {bi("Our Story", "ನಮ್ಮ ಕಥೆ")}
          </span>
        </div>

        <h1 className="animate-fade-up mt-7 text-center text-4xl font-bold tracking-tight md:text-5xl">
          <span className="gradient-text">
            {bi("Hello, everyone", "ನಮಸ್ಕಾರ ಎಲ್ಲರಿಗೂ")}
          </span>
        </h1>

        {/* Note body */}
        <div className="animate-fade-up mt-10 space-y-6 text-pretty text-lg leading-relaxed text-muted-foreground">
          {paragraphs.map(([en, kn], i) => (
            <p key={i}>{bi(en, kn)}</p>
          ))}
        </div>

        {/* Pull quote */}
        <figure className="glass animate-fade-up relative mt-12 overflow-hidden rounded-3xl p-8 text-center shadow-soft">
          <div className="aurora-blob right-[-3rem] top-[-3rem] h-40 w-40 animate-float bg-primary/30" />
          <Quote className="mx-auto h-7 w-7 text-primary/70" />
          <blockquote className="relative mt-4 text-xl font-semibold leading-snug md:text-2xl">
            <span className="gradient-text">
              {bi(
                "Kannada is not just a language; it is our identity, our culture, and our existence.",
                "ಕನ್ನಡ ಕೇವಲ ಒಂದು ಭಾಷೆಯಲ್ಲ; ಅದು ನಮ್ಮ ಗುರುತು, ನಮ್ಮ ಸಂಸ್ಕೃತಿ ಮತ್ತು ನಮ್ಮ ಅಸ್ತಿತ್ವ.",
              )}
            </span>
          </blockquote>
        </figure>

        {/* Signature */}
        <div className="animate-fade-up mt-12 flex flex-col items-center text-center">
          <div className="relative h-28 w-28 overflow-hidden rounded-full border border-primary/30 shadow-glow">
            {photoOk ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/mithun.png"
                alt="Mithun Rajanna"
                className="h-full w-full object-cover"
                onError={() => setPhotoOk(false)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-amber-500 text-3xl font-bold text-primary-foreground">
                M
              </div>
            )}
          </div>
          <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {bi("Crafted with", "ಪ್ರೀತಿಯಿಂದ")}
            <Heart className="h-3.5 w-3.5 fill-primary text-primary" />
            {bi("by", "ರಚಿಸಿದವರು")}
          </p>
          <p className="mt-1 text-lg font-semibold tracking-tight">
            Mithun Rajanna
          </p>
          <p className="mt-0.5 text-sm text-primary">
            {bi(
              "Lakkahalli, Sidlaghatta, Chikkaballapura",
              "ಲಕ್ಕಹಳ್ಳಿ, ಶಿಡ್ಲಘಟ್ಟ, ಚಿಕ್ಕಬಳ್ಳಾಪುರ",
            )}
          </p>
        </div>
      </article>
    </div>
  );
}
