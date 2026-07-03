"use client";

import * as React from "react";
import {
  X,
  Pencil,
  Trash2,
  MapPin,
  Briefcase,
  CalendarDays,
  Languages as LangIcon,
  PartyPopper,
  Quote,
  Save,
  User,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/language-provider";
import { Button } from "@/components/ui/button";
import { useRoots, type Person } from "@/lib/roots/store";
import {
  PersonForm,
  RELATION_LABEL,
  type PersonDraft,
} from "@/components/roots/person-form";

export function MemberPanel({
  person,
  onClose,
}: {
  person: Person;
  onClose: () => void;
}) {
  const { bi } = useTranslation();
  const { updatePerson, removePerson } = useRoots();
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState<PersonDraft>(person);

  React.useEffect(() => {
    setEditing(false);
    setDraft(person);
  }, [person]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const facts: { icon: React.ElementType; value?: string }[] = [
    { icon: MapPin, value: [person.village, person.district].filter(Boolean).join(", ") },
    { icon: Briefcase, value: person.occupation },
    { icon: CalendarDays, value: person.birthYear },
    { icon: LangIcon, value: person.languages },
    { icon: PartyPopper, value: person.festival },
  ].filter((f) => f.value);

  return (
    <div
      className="fixed inset-0 z-40 flex justify-end bg-black/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={person.name}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <aside className="glass animate-scene-in-rev h-full w-full max-w-md overflow-y-auto border-l shadow-glow">
        {/* header image */}
        <div className="relative h-44 w-full overflow-hidden bg-gradient-to-br from-primary/30 to-amber-400/20">
          {person.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={person.photo} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="grid h-full w-full place-items-center">
              <User className="h-14 w-14 text-primary/50" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          <button
            onClick={onClose}
            className="glass absolute right-4 top-4 rounded-full p-1.5 text-foreground shadow-soft"
            aria-label={bi("Close", "ಮುಚ್ಚಿ")}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="-mt-8 px-6 pb-10">
          {editing ? (
            <div className="glass rounded-3xl border p-5 shadow-soft">
              <PersonForm
                initial={person}
                onChange={(d) => setDraft(d)}
              />
              <div className="mt-5 flex gap-2">
                <Button
                  className="h-11 flex-1 gap-2 rounded-full"
                  onClick={() => {
                    updatePerson(person.id, draft);
                    setEditing(false);
                  }}
                >
                  <Save className="h-4 w-4" />
                  {bi("Save", "ಉಳಿಸಿ")}
                </Button>
                <Button
                  variant="outline"
                  className="h-11 rounded-full"
                  onClick={() => setEditing(false)}
                >
                  {bi("Cancel", "ರದ್ದು")}
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">{person.name}</h2>
                  <p className="text-sm font-medium uppercase tracking-wide text-primary">
                    {RELATION_LABEL[person.relation](bi)}
                  </p>
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setEditing(true)}
                    className="glass grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:text-primary"
                    aria-label={bi("Edit", "ಸಂಪಾದಿಸಿ")}
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  {person.relation !== "self" && (
                    <button
                      onClick={() => {
                        removePerson(person.id);
                        onClose();
                      }}
                      className="glass grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:text-destructive"
                      aria-label={bi("Remove", "ತೆಗೆದುಹಾಕಿ")}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {facts.length > 0 && (
                <dl className="mt-5 space-y-2.5">
                  {facts.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <f.icon className="h-4 w-4 shrink-0 text-primary/70" />
                      <span>{f.value}</span>
                    </div>
                  ))}
                </dl>
              )}

              {person.memory && (
                <div className="mt-6">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {bi("A memory kept", "ಉಳಿಸಿದ ನೆನಪು")}
                  </h3>
                  <p className="mt-2 text-pretty leading-relaxed">{person.memory}</p>
                </div>
              )}

              {person.proverb && (
                <figure className="glass mt-6 rounded-2xl border p-4">
                  <Quote className="h-5 w-5 rotate-180 text-primary/60" />
                  <blockquote className="mt-1 text-pretty font-medium italic">
                    {person.proverb}
                  </blockquote>
                </figure>
              )}

              <div
                className={cn(
                  "mt-8 rounded-2xl border border-dashed border-primary/30 bg-primary/[0.04] p-4 text-center text-xs text-muted-foreground",
                )}
              >
                {bi(
                  "Voice memories & documents — coming soon.",
                  "ಧ್ವನಿ ನೆನಪುಗಳು ಮತ್ತು ದಾಖಲೆಗಳು — ಶೀಘ್ರದಲ್ಲೇ.",
                )}
              </div>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
