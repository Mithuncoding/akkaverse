"use client";

import * as React from "react";
import { X, Sparkles, ArrowRight, Loader2 } from "lucide-react";

import { useTranslation } from "@/i18n/language-provider";
import { Button } from "@/components/ui/button";
import { useRoots, type Person } from "@/lib/roots/store";
import { generateWelcome } from "@/lib/roots/ai";
import { PersonForm, type PersonDraft } from "@/components/roots/person-form";

export function RootsOnboarding({
  open,
  onClose,
  onComplete,
}: {
  open: boolean;
  onClose: () => void;
  onComplete: (person: Person) => void;
}) {
  const { bi } = useTranslation();
  const { addPerson } = useRoots();
  const [draft, setDraft] = React.useState<PersonDraft>({ relation: "self" });
  const [valid, setValid] = React.useState(false);
  const [phase, setPhase] = React.useState<"form" | "welcome">("form");
  const [welcome, setWelcome] = React.useState<string | null>(null);
  const [saving, setSaving] = React.useState(false);
  const savedRef = React.useRef<Person | null>(null);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const submit = async () => {
    if (!valid || saving) return;
    setSaving(true);
    const person = addPerson({ ...draft, relation: "self", parentId: null });
    savedRef.current = person;
    setPhase("welcome");
    const line = await generateWelcome({
      name: person.name,
      village: person.village,
      district: person.district,
    });
    setWelcome(line);
    setSaving(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={bi("Begin your legacy", "ನಿಮ್ಮ ಪರಂಪರೆ ಆರಂಭಿಸಿ")}
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

        {phase === "form" ? (
          <div className="max-h-[86vh] overflow-y-auto p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
              {bi("Begin with you", "ನಿಮ್ಮಿಂದ ಆರಂಭಿಸಿ")}
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight">
              {bi("Plant the first root", "ಮೊದಲ ಬೇರು ನೆಡಿ")}
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {bi(
                "Start with yourself. You can add elders and children next.",
                "ನಿಮ್ಮಿಂದಲೇ ಆರಂಭಿಸಿ. ನಂತರ ಹಿರಿಯರು ಮತ್ತು ಮಕ್ಕಳನ್ನು ಸೇರಿಸಬಹುದು.",
              )}
            </p>

            <div className="mt-6">
              <PersonForm
                lockRelation="self"
                showRelation={false}
                onChange={(d, v) => {
                  setDraft({ ...d, relation: "self" });
                  setValid(v);
                }}
              />
            </div>

            <Button
              className="mt-6 h-12 w-full gap-2 rounded-full text-base"
              disabled={!valid || saving}
              onClick={submit}
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              {bi("Create my legacy", "ನನ್ನ ಪರಂಪರೆ ರಚಿಸಿ")}
            </Button>
          </div>
        ) : (
          <div className="p-8 text-center sm:p-10">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary/12 text-primary shadow-glow">
              <Sparkles className="h-6 w-6" />
            </div>
            <h2 className="mt-5 text-2xl font-bold tracking-tight">
              {bi("Welcome home", "ಮನೆಗೆ ಸ್ವಾಗತ")}
            </h2>
            <p className="mx-auto mt-3 min-h-[3.5rem] max-w-sm text-pretty text-muted-foreground">
              {welcome ? (
                <span className="gradient-text font-medium">{welcome}</span>
              ) : (
                <span className="inline-flex items-center gap-2 text-sm">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {bi("Writing your welcome…", "ನಿಮ್ಮ ಸ್ವಾಗತ ಬರೆಯುತ್ತಿದೆ…")}
                </span>
              )}
            </p>
            <Button
              className="mt-7 h-12 w-full gap-2 rounded-full text-base"
              onClick={() => savedRef.current && onComplete(savedRef.current)}
            >
              {bi("Enter Roots", "ಬೇರುಗಳಿಗೆ ಪ್ರವೇಶಿಸಿ")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
