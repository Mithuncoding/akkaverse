"use client";

import * as React from "react";
import { ImagePlus, User } from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/language-provider";
import type { Person, Relation } from "@/lib/roots/store";

export type PersonDraft = Partial<Omit<Person, "id" | "gen">>;

/** Downscale an uploaded image to a small data-URL so localStorage stays lean. */
async function toThumbDataUrl(file: File, max = 384): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("no canvas ctx");
  ctx.drawImage(bitmap, 0, 0, w, h);
  return canvas.toDataURL("image/jpeg", 0.82);
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-border bg-background/60 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary/60 focus:ring-2 focus:ring-primary/20";

const RELATION_OPTS: Relation[] = [
  "grandparent",
  "parent",
  "sibling",
  "spouse",
  "child",
  "relative",
];

export function PersonForm({
  initial,
  lockRelation,
  showRelation = true,
  onChange,
}: {
  initial?: PersonDraft;
  lockRelation?: Relation;
  showRelation?: boolean;
  onChange: (draft: PersonDraft, valid: boolean) => void;
}) {
  const { bi } = useTranslation();
  const [draft, setDraft] = React.useState<PersonDraft>({
    relation: lockRelation ?? initial?.relation ?? "grandparent",
    ...initial,
  });

  const set = (patch: PersonDraft) => {
    const next = { ...draft, ...patch };
    setDraft(next);
    onChange(next, Boolean(next.name && next.name.trim()));
  };

  const onPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await toThumbDataUrl(file);
      set({ photo: url });
    } catch {
      /* ignore unreadable images */
    }
  };

  return (
    <div className="space-y-4">
      {/* photo + name */}
      <div className="flex items-center gap-4">
        <label className="group relative h-20 w-20 shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-border bg-muted">
          {draft.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={draft.photo} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-muted-foreground">
              <User className="h-7 w-7" />
            </span>
          )}
          <span className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 transition-opacity group-hover:opacity-100">
            <ImagePlus className="h-5 w-5 text-white" />
          </span>
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={onPhoto}
            aria-label={bi("Add a photo", "ಫೋಟೋ ಸೇರಿಸಿ")}
          />
        </label>
        <div className="flex-1 space-y-3">
          <Field label={bi("Name", "ಹೆಸರು")}>
            <input
              className={inputClass}
              value={draft.name ?? ""}
              onChange={(e) => set({ name: e.target.value })}
              placeholder={bi("e.g. Kempamma", "ಉದಾ. ಕೆಂಪಮ್ಮ")}
              autoFocus
            />
          </Field>
          {showRelation && !lockRelation && (
            <Field label={bi("Relationship", "ಸಂಬಂಧ")}>
              <select
                className={cn(inputClass, "appearance-none")}
                value={draft.relation}
                onChange={(e) => set({ relation: e.target.value as Relation })}
              >
                {RELATION_OPTS.map((r) => (
                  <option key={r} value={r}>
                    {RELATION_LABEL[r](bi)}
                  </option>
                ))}
              </select>
            </Field>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field label={bi("Home village", "ಊರು")}>
          <input
            className={inputClass}
            value={draft.village ?? ""}
            onChange={(e) => set({ village: e.target.value })}
            placeholder={bi("e.g. Lakkahalli", "ಉದಾ. ಲಕ್ಕಹಳ್ಳಿ")}
          />
        </Field>
        <Field label={bi("District", "ಜಿಲ್ಲೆ")}>
          <input
            className={inputClass}
            value={draft.district ?? ""}
            onChange={(e) => set({ district: e.target.value })}
            placeholder={bi("e.g. Chikkaballapura", "ಉದಾ. ಚಿಕ್ಕಬಳ್ಳಾಪುರ")}
          />
        </Field>
        <Field label={bi("Occupation", "ವೃತ್ತಿ")}>
          <input
            className={inputClass}
            value={draft.occupation ?? ""}
            onChange={(e) => set({ occupation: e.target.value })}
            placeholder={bi("e.g. Farmer", "ಉದಾ. ರೈತ")}
          />
        </Field>
        <Field label={bi("Birth year", "ಜನ್ಮ ವರ್ಷ")}>
          <input
            className={inputClass}
            value={draft.birthYear ?? ""}
            onChange={(e) => set({ birthYear: e.target.value })}
            placeholder="1948"
            inputMode="numeric"
          />
        </Field>
        <Field label={bi("Favourite festival", "ನೆಚ್ಚಿನ ಹಬ್ಬ")}>
          <input
            className={inputClass}
            value={draft.festival ?? ""}
            onChange={(e) => set({ festival: e.target.value })}
            placeholder={bi("e.g. Ugadi", "ಉದಾ. ಯುಗಾದಿ")}
          />
        </Field>
        <Field label={bi("Languages", "ಭಾಷೆಗಳು")}>
          <input
            className={inputClass}
            value={draft.languages ?? ""}
            onChange={(e) => set({ languages: e.target.value })}
            placeholder={bi("Kannada, Telugu", "ಕನ್ನಡ, ತೆಲುಗು")}
          />
        </Field>
      </div>

      <Field label={bi("A family proverb they loved", "ಅವರು ಮೆಚ್ಚಿದ ಗಾದೆ")}>
        <input
          className={inputClass}
          value={draft.proverb ?? ""}
          onChange={(e) => set({ proverb: e.target.value })}
          placeholder={bi("A saying passed down…", "ತಲೆಮಾರಿನಿಂದ ಬಂದ ನುಡಿ…")}
        />
      </Field>

      <Field label={bi("A memory to keep forever", "ಶಾಶ್ವತವಾಗಿ ಉಳಿಸುವ ನೆನಪು")}>
        <textarea
          className={cn(inputClass, "min-h-[84px] resize-y")}
          value={draft.memory ?? ""}
          onChange={(e) => set({ memory: e.target.value })}
          placeholder={bi(
            "Something you never want the family to forget…",
            "ಕುಟುಂಬ ಎಂದೂ ಮರೆಯಬಾರದ ಒಂದು ವಿಷಯ…",
          )}
        />
      </Field>
    </div>
  );
}

export const RELATION_LABEL: Record<
  Relation,
  (bi: (en: string, kn: string) => string) => string
> = {
  self: (bi) => bi("You", "ನೀವು"),
  spouse: (bi) => bi("Spouse", "ಸಂಗಾತಿ"),
  parent: (bi) => bi("Parent", "ತಂದೆ/ತಾಯಿ"),
  grandparent: (bi) => bi("Grandparent", "ಅಜ್ಜ/ಅಜ್ಜಿ"),
  sibling: (bi) => bi("Sibling", "ಒಡಹುಟ್ಟಿದವರು"),
  child: (bi) => bi("Child", "ಮಗು"),
  relative: (bi) => bi("Relative", "ಸಂಬಂಧಿ"),
};
