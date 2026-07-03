"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { TreeDeciduous, RotateCcw } from "lucide-react";

import { useTranslation } from "@/i18n/language-provider";
import { useRoots, type Person } from "@/lib/roots/store";
import { RootsHero } from "@/components/roots/roots-hero";
import { RootsOnboarding } from "@/components/roots/roots-onboarding";
import { FamilyTree } from "@/components/roots/family-tree";
import { MemberPanel } from "@/components/roots/member-panel";
import { HeritageEngine } from "@/components/roots/heritage-engine";
import { AncestorLetter } from "@/components/roots/ancestor-letter";
import { LegacyVault } from "@/components/roots/legacy-vault";
import { FamilyTimeline } from "@/components/roots/family-timeline";

// The map pulls in react-simple-maps — load it only when the experience opens.
const RootsMap = dynamic(
  () => import("@/components/roots/roots-map").then((m) => m.RootsMap),
  {
    ssr: false,
    loading: () => (
      <div className="glass h-72 animate-pulse rounded-3xl border" />
    ),
  },
);

function SectionHead({
  kicker,
  title,
  desc,
}: {
  kicker: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="animate-fade-up mb-6">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/80">
        {kicker}
      </p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      {desc && <p className="mt-1.5 max-w-2xl text-muted-foreground">{desc}</p>}
    </div>
  );
}

export function RootsView() {
  const { bi } = useTranslation();
  const { ready, self, people, districts, reset } = useRoots();
  const [onboardOpen, setOnboardOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const selected = React.useMemo<Person | null>(
    () => people.find((p) => p.id === selectedId) ?? null,
    [people, selectedId],
  );

  if (!ready) {
    return (
      <div className="container flex min-h-[70vh] items-center justify-center">
        <div className="flex items-center gap-3 text-muted-foreground">
          <TreeDeciduous className="h-5 w-5 animate-pulse text-primary" />
          {bi("Growing your roots…", "ನಿಮ್ಮ ಬೇರುಗಳು ಬೆಳೆಯುತ್ತಿವೆ…")}
        </div>
      </div>
    );
  }

  if (!self) {
    return (
      <>
        <RootsHero onBegin={() => setOnboardOpen(true)} />
        <RootsOnboarding
          open={onboardOpen}
          onClose={() => setOnboardOpen(false)}
          onComplete={() => setOnboardOpen(false)}
        />
      </>
    );
  }

  return (
    <div className="relative overflow-hidden">
      {/* ambient backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora-blob left-[6%] top-24 h-72 w-72 animate-float-slow bg-primary/20" />
        <div className="aurora-blob right-[6%] top-[40rem] h-80 w-80 animate-float bg-amber-400/15" />
      </div>

      {/* header */}
      <header className="container flex flex-wrap items-center justify-between gap-4 pt-10 md:pt-16">
        <div>
          <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground shadow-soft">
            <TreeDeciduous className="h-3.5 w-3.5 text-primary" />
            {bi("Roots", "ಬೇರುಗಳು")}
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {bi("The legacy of ", "ಇವರ ಪರಂಪರೆ — ")}
            <span className="gradient-text">{self.name}</span>
          </h1>
          {(self.village || self.district) && (
            <p className="mt-1.5 text-muted-foreground">
              {[self.village, self.district].filter(Boolean).join(", ")}
            </p>
          )}
        </div>
        <button
          onClick={() => {
            if (
              window.confirm(
                bi(
                  "Clear your entire family tree? This cannot be undone.",
                  "ನಿಮ್ಮ ಸಂಪೂರ್ಣ ಕುಟುಂಬ ಮರವನ್ನು ಅಳಿಸುವುದೇ? ಇದನ್ನು ಹಿಂಪಡೆಯಲಾಗದು.",
                ),
              )
            ) {
              reset();
              setSelectedId(null);
            }
          }}
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-destructive/40 hover:text-destructive"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          {bi("Start over", "ಹೊಸದಾಗಿ")}
        </button>
      </header>

      {/* family tree */}
      <section className="container mt-8">
        <SectionHead
          kicker={bi("Your living tree", "ನಿಮ್ಮ ಜೀವಂತ ಮರ")}
          title={bi("Every branch, a life remembered", "ಪ್ರತಿ ಕೊಂಬೆಯೂ ಒಂದು ನೆನಪಿನ ಬದುಕು")}
          desc={bi(
            "Tap a card to open their story. Add the elders and children who made you.",
            "ಕಥೆ ತೆರೆಯಲು ಕಾರ್ಡ್ ಒತ್ತಿ. ನಿಮ್ಮನ್ನು ರೂಪಿಸಿದ ಹಿರಿಯರು ಮತ್ತು ಮಕ್ಕಳನ್ನು ಸೇರಿಸಿ.",
          )}
        />
        <FamilyTree people={people} selectedId={selectedId} onSelect={(p) => setSelectedId(p.id)} />
      </section>

      {/* heritage engine */}
      <section className="container mt-16">
        <SectionHead
          kicker={bi("AI heritage historian", "AI ಪರಂಪರೆ ಇತಿಹಾಸಕಾರ")}
          title={bi("The soil that shaped your family", "ನಿಮ್ಮ ಕುಟುಂಬ ರೂಪಿಸಿದ ನೆಲ")}
        />
        <HeritageEngine people={people} />
      </section>

      {/* map + timeline */}
      <section className="container mt-16 grid gap-8 lg:grid-cols-2 lg:items-start">
        <div>
          <SectionHead
            kicker={bi("Migration", "ವಲಸೆ")}
            title={bi("Rooted across Karnataka", "ಕರ್ನಾಟಕದಾದ್ಯಂತ ಬೇರೂರಿದೆ")}
          />
          <RootsMap districts={districts} />
        </div>
        <div>
          <SectionHead
            kicker={bi("Through the years", "ವರ್ಷಗಳ ಮೂಲಕ")}
            title={bi("Your family, across time", "ಕಾಲದಾದ್ಯಂತ ನಿಮ್ಮ ಕುಟುಂಬ")}
          />
          <FamilyTimeline people={people} />
        </div>
      </section>

      {/* legacy vault */}
      <section className="container mt-16">
        <LegacyVault />
      </section>

      {/* ancestor letter — emotional highlight */}
      <section className="container mb-24 mt-16">
        <SectionHead
          kicker={bi("The emotional heart", "ಭಾವನಾತ್ಮಕ ಹೃದಯ")}
          title={bi("If they could speak", "ಅವರು ಮಾತಾಡಬಲ್ಲರಾದರೆ")}
        />
        <AncestorLetter people={people} />
      </section>

      {selected && (
        <MemberPanel person={selected} onClose={() => setSelectedId(null)} />
      )}

      {/* allow adding more even before onboarding closes */}
      <RootsOnboarding
        open={onboardOpen}
        onClose={() => setOnboardOpen(false)}
        onComplete={() => setOnboardOpen(false)}
      />
    </div>
  );
}
