"use client";

import * as React from "react";
import {
  Plus,
  Utensils,
  Quote,
  Music,
  Flame,
  Lightbulb,
  BookOpen,
  Trash2,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/language-provider";
import { Button } from "@/components/ui/button";
import { useRoots, type LegacyKind } from "@/lib/roots/store";

const KINDS: {
  id: LegacyKind;
  icon: React.ElementType;
  en: string;
  kn: string;
}[] = [
  { id: "recipe", icon: Utensils, en: "Recipe", kn: "ಪಾಕವಿಧಾನ" },
  { id: "proverb", icon: Quote, en: "Proverb", kn: "ಗಾದೆ" },
  { id: "song", icon: Music, en: "Song", kn: "ಹಾಡು" },
  { id: "ritual", icon: Flame, en: "Ritual", kn: "ಆಚರಣೆ" },
  { id: "advice", icon: Lightbulb, en: "Advice", kn: "ಸಲಹೆ" },
  { id: "story", icon: BookOpen, en: "Story", kn: "ಕಥೆ" },
];

const kindMeta = (k: LegacyKind) => KINDS.find((x) => x.id === k) ?? KINDS[0];

const inputClass =
  "w-full rounded-xl border border-border bg-background/60 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary/60 focus:ring-2 focus:ring-primary/20";

export function LegacyVault() {
  const { bi } = useTranslation();
  const { legacy, addLegacy, removeLegacy } = useRoots();
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold tracking-tight">
            {bi("Our Legacy", "ನಮ್ಮ ಪರಂಪರೆ")}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {bi(
              "The recipes, songs and words too precious to lose.",
              "ಕಳೆದುಕೊಳ್ಳಲಾಗದ ಪಾಕವಿಧಾನ, ಹಾಡು ಮತ್ತು ನುಡಿಗಳು.",
            )}
          </p>
        </div>
        <Button size="sm" onClick={() => setOpen(true)} className="gap-1.5 rounded-full">
          <Plus className="h-4 w-4" />
          {bi("Add", "ಸೇರಿಸಿ")}
        </Button>
      </div>

      {legacy.length === 0 ? (
        <div className="mt-5 rounded-3xl border border-dashed border-primary/30 bg-primary/[0.04] p-10 text-center">
          <p className="text-muted-foreground">
            {bi(
              "Nothing saved yet. Preserve your first family treasure.",
              "ಇನ್ನೂ ಏನೂ ಉಳಿಸಿಲ್ಲ. ನಿಮ್ಮ ಮೊದಲ ಕುಟುಂಬ ನಿಧಿಯನ್ನು ಉಳಿಸಿ.",
            )}
          </p>
        </div>
      ) : (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {legacy.map((item) => {
            const meta = kindMeta(item.kind);
            return (
              <article
                key={item.id}
                className="glass group relative flex flex-col rounded-2xl border p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                  <meta.icon className="h-4 w-4" />
                  {bi(meta.en, meta.kn)}
                </div>
                <h4 className="mt-2 font-semibold tracking-tight">{item.title}</h4>
                <p className="mt-1.5 flex-1 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
                {item.from && (
                  <p className="mt-3 text-xs italic text-primary/80">
                    — {item.from}
                  </p>
                )}
                <button
                  onClick={() => removeLegacy(item.id)}
                  className="absolute right-3 top-3 rounded-full p-1.5 text-muted-foreground opacity-0 transition-all hover:bg-muted hover:text-destructive group-hover:opacity-100"
                  aria-label={bi("Remove", "ತೆಗೆದುಹಾಕಿ")}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </article>
            );
          })}
        </div>
      )}

      {open && (
        <LegacyDialog
          onClose={() => setOpen(false)}
          onSave={(v) => {
            addLegacy(v);
            setOpen(false);
          }}
        />
      )}
    </div>
  );
}

function LegacyDialog({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (v: {
    kind: LegacyKind;
    title: string;
    body: string;
    from?: string;
  }) => void;
}) {
  const { bi } = useTranslation();
  const [kind, setKind] = React.useState<LegacyKind>("recipe");
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [from, setFrom] = React.useState("");

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-black/50 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={bi("Add to legacy", "ಪರಂಪರೆಗೆ ಸೇರಿಸಿ")}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="glass animate-fade-up relative w-full max-w-lg rounded-t-3xl border shadow-glow sm:rounded-3xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted"
          aria-label={bi("Close", "ಮುಚ್ಚಿ")}
        >
          <X className="h-4 w-4" />
        </button>
        <div className="max-h-[86vh] overflow-y-auto p-6 sm:p-8">
          <h2 className="text-2xl font-bold tracking-tight">
            {bi("Preserve a treasure", "ಒಂದು ನಿಧಿ ಉಳಿಸಿ")}
          </h2>

          <div className="mt-5 flex flex-wrap gap-2">
            {KINDS.map((k) => (
              <button
                key={k.id}
                onClick={() => setKind(k.id)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                  kind === k.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/40",
                )}
              >
                <k.icon className="h-3.5 w-3.5" />
                {bi(k.en, k.kn)}
              </button>
            ))}
          </div>

          <div className="mt-5 space-y-4">
            <input
              className={inputClass}
              placeholder={bi("Title (e.g. Ajji's Ragi Mudde)", "ಶೀರ್ಷಿಕೆ")}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
            <textarea
              className={cn(inputClass, "min-h-[130px] resize-y")}
              placeholder={bi(
                "Write it down, exactly as you remember it…",
                "ನೀವು ನೆನಪಿಟ್ಟಂತೆ ಬರೆಯಿರಿ…",
              )}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            <input
              className={inputClass}
              placeholder={bi("Passed down by… (optional)", "ಯಾರಿಂದ… (ಐಚ್ಛಿಕ)")}
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>

          <Button
            className="mt-6 h-12 w-full gap-2 rounded-full text-base"
            disabled={!title.trim() || !body.trim()}
            onClick={() =>
              onSave({ kind, title: title.trim(), body: body.trim(), from: from.trim() || undefined })
            }
          >
            <Plus className="h-4 w-4" />
            {bi("Save forever", "ಶಾಶ್ವತವಾಗಿ ಉಳಿಸಿ")}
          </Button>
        </div>
      </div>
    </div>
  );
}
