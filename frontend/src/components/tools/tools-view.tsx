"use client";

import * as React from "react";
import { Upload, Volume2, Trash2, ScanText, Languages } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n/language-provider";
import { canSpeak, speak } from "@/lib/speech";

/**
 * Kannada OCR — demo surface.
 *
 * Real OCR (Tesseract / a cloud vision API) is wired through the FastAPI
 * backend in Phase 3. For a reliable, zero-dependency live demo, this UI lets
 * users pick a curated sample inscription (with verified Kannada text +
 * translation) or upload their own image to preview the full UX flow:
 * extract → translate → listen.
 */

type Sample = {
  id: string;
  emoji: string;
  kannada: string;
  translit: string;
  english: string;
};

const SAMPLES: Sample[] = [
  {
    id: "welcome",
    emoji: "🙏",
    kannada: "ಕರ್ನಾಟಕಕ್ಕೆ ಸ್ವಾಗತ",
    translit: "Karnatakakke Swagata",
    english: "Welcome to Karnataka",
  },
  {
    id: "kannada",
    emoji: "🪔",
    kannada: "ಕನ್ನಡವೇ ಸತ್ಯ, ಕನ್ನಡವೇ ನಿತ್ಯ",
    translit: "Kannadave Satya, Kannadave Nitya",
    english: "Kannada is truth, Kannada is eternal",
  },
  {
    id: "temple",
    emoji: "🛕",
    kannada: "ಶ್ರೀ ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯ, ಹಂಪಿ",
    translit: "Shri Virupaksha Devalaya, Hampi",
    english: "Shri Virupaksha Temple, Hampi",
  },
];

export function ToolsView() {
  const { t } = useTranslation();
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<Sample | null>(null);
  const [busy, setBusy] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const runSample = (s: Sample) => {
    setResult(null);
    setBusy(true);
    setImageUrl(null);
    window.setTimeout(() => {
      setResult(s);
      setBusy(false);
    }, 800);
  };

  const onFile = (file: File | undefined) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setResult(null);
    setBusy(true);
    // Demo extraction: show a representative result for uploaded images.
    window.setTimeout(() => {
      setResult(SAMPLES[1]);
      setBusy(false);
    }, 1100);
  };

  const clear = () => {
    setResult(null);
    setImageUrl(null);
    setBusy(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="container py-12 md:py-24">
      <header className="mx-auto mb-8 max-w-2xl text-center md:mb-10">
        <span className="rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-sm text-muted-foreground">
          🔍 {t("tools.badge")}
        </span>
        <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
          {t("tools.title")}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">{t("tools.subtitle")}</p>
      </header>

      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        {/* Upload / input */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <label
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              onFile(e.dataTransfer.files?.[0]);
            }}
            className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-background/60 px-6 py-10 text-center transition-colors hover:border-primary/50"
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/png,image/jpeg"
              className="hidden"
              onChange={(e) => onFile(e.target.files?.[0] ?? undefined)}
            />
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt="upload preview"
                className="max-h-40 rounded-lg object-contain"
              />
            ) : (
              <>
                <Upload className="h-8 w-8 text-muted-foreground" />
                <p className="mt-3 text-sm font-medium">{t("tools.upload")}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t("tools.dropHint")}
                </p>
              </>
            )}
          </label>

          <p className="mb-2 mt-6 text-sm font-medium">{t("tools.tryImage")}</p>
          <div className="flex flex-wrap gap-2">
            {SAMPLES.map((s) => (
              <button
                key={s.id}
                onClick={() => runSample(s)}
                className="rounded-lg border border-border bg-background px-3 py-2 text-lg transition-colors hover:border-primary/40 hover:bg-accent"
                aria-label={s.english}
                title={s.english}
              >
                {s.emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Result */}
        <div className="rounded-2xl border border-border bg-card p-6">
          {busy ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
              <ScanText className="h-8 w-8 animate-pulse text-primary" />
              <p className="text-sm">{t("tools.extracting")}</p>
            </div>
          ) : result ? (
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {t("tools.extracted")}
                </span>
                <button
                  onClick={clear}
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  <Trash2 className="h-3.5 w-3.5" /> {t("tools.clear")}
                </button>
              </div>

              <p className="mt-2 text-2xl font-semibold leading-relaxed">
                {result.kannada}
              </p>
              <p className="mt-1 text-sm italic text-muted-foreground">
                {result.translit}
              </p>

              <div className="mt-4 flex items-start gap-2 rounded-lg bg-secondary/60 p-3 text-sm">
                <Languages className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{result.english}</span>
              </div>

              {canSpeak() && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => speak(result.kannada, "kn-IN")}
                >
                  <Volume2 className="h-4 w-4" /> {t("common.listen")}
                </Button>
              )}
            </div>
          ) : (
            <div className="flex h-full min-h-40 flex-col items-center justify-center text-center text-sm text-muted-foreground">
              <ScanText className="h-8 w-8 opacity-40" />
              <p className="mt-3">{t("tools.dropHint")}</p>
            </div>
          )}
        </div>
      </div>

      <p
        className={cn(
          "mx-auto mt-6 max-w-4xl text-center text-xs text-muted-foreground",
        )}
      >
        {t("tools.note")}
      </p>
    </div>
  );
}
