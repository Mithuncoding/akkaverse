"use client";

import * as React from "react";
import { Baby, Sprout, User, Milestone } from "lucide-react";

import { useTranslation } from "@/i18n/language-provider";
import { Reveal } from "@/components/ui/reveal";
import { RELATION_LABEL } from "@/components/roots/person-form";
import type { Person } from "@/lib/roots/store";

type TimelineItem = { year: number; label: string; sub: string; icon: React.ElementType };

export function FamilyTimeline({ people }: { people: Person[] }) {
  const { bi } = useTranslation();

  const milestones = React.useMemo<TimelineItem[]>(() => {
    const items: TimelineItem[] = people
      .filter((p) => p.birthYear && /^\d{3,4}$/.test(p.birthYear.trim()))
      .map((p) => ({
        year: parseInt(p.birthYear!.trim(), 10),
        label: bi(`${p.name} was born`, `${p.name} ಜನಿಸಿದರು`),
        sub: [RELATION_LABEL[p.relation](bi), p.village].filter(Boolean).join(" · "),
        icon: p.relation === "child" ? Baby : p.gen <= 1 ? Sprout : User,
      }))
      .sort((a, b) => a.year - b.year);
    return items;
  }, [people, bi]);

  if (milestones.length === 0) {
    return (
      <div className="glass rounded-3xl border p-8 text-center text-sm text-muted-foreground">
        {bi(
          "Add birth years to your family to weave their timeline.",
          "ಕಾಲರೇಖೆ ರಚಿಸಲು ಕುಟುಂಬಕ್ಕೆ ಜನ್ಮ ವರ್ಷಗಳನ್ನು ಸೇರಿಸಿ.",
        )}
      </div>
    );
  }

  return (
    <ol className="relative ml-2">
      <span
        aria-hidden="true"
        className="absolute bottom-3 left-[15px] top-2 w-px bg-gradient-to-b from-primary/50 via-primary/25 to-transparent"
      />
      {milestones.map((m, i) => (
        <Reveal as="li" key={i} delay={i * 60} className="relative mb-7 pl-12">
          <span className="glass absolute left-0 top-0 grid h-8 w-8 place-items-center rounded-full border-primary/30 text-primary shadow-glow">
            <m.icon className="h-4 w-4" />
          </span>
          <div className="text-lg font-bold gradient-text">{m.year}</div>
          <div className="font-medium">{m.label}</div>
          {m.sub && <div className="text-sm text-muted-foreground">{m.sub}</div>}
        </Reveal>
      ))}
      <Reveal as="li" delay={milestones.length * 60} className="relative pl-12">
        <span className="absolute left-0 top-0 grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow">
          <Milestone className="h-4 w-4" />
        </span>
        <div className="text-lg font-bold gradient-text">
          {bi("Today", "ಇಂದು")}
        </div>
        <div className="font-medium">
          {bi(
            "Preserving this heritage with Akkaverse",
            "ಅಕ್ಕಾವರ್ಸ್‌ನೊಂದಿಗೆ ಈ ಪರಂಪರೆ ಉಳಿಸುತ್ತಿದ್ದೇವೆ",
          )}
        </div>
      </Reveal>
    </ol>
  );
}
