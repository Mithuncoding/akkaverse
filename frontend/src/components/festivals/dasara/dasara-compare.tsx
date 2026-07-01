"use client";

import * as React from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/language-provider";
import { JourneyFigure } from "@/components/timeline/journey-figure";
import { ConfidenceBadge } from "./dasara-archive-view";
import { eraForYear, type DasaraYear } from "@/data/dasara-archive";

/**
 * Year Comparison Mode — a full-screen split that holds two capsules against
 * each other. Each side is tinted by its own era, so 1947 vs 2025 literally
 * looks like two different worlds meeting down the centre seam.
 */
export function DasaraCompare({
  years,
  initialLeft,
  initialRight,
  onClose,
}: {
  years: DasaraYear[];
  initialLeft: number;
  initialRight: number;
  onClose: () => void;
}) {
  const { bi } = useTranslation();
  const [left, setLeft] = React.useState(initialLeft);
  const [right, setRight] = React.useState(initialRight);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const a = years.find((y) => y.year === left)!;
  const b = years.find((y) => y.year === right)!;

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-[#0b0805]/95 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-amber-100/12 px-4 py-3 sm:px-6">
        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-amber-100/80 sm:text-base">
          ⇄ {bi("Compare Two Years", "ಎರಡು ವರ್ಷ ಹೋಲಿಕೆ")}
        </h2>
        <button
          onClick={onClose}
          aria-label={bi("Close", "ಮುಚ್ಚಿ")}
          className="rounded-full border border-amber-100/20 p-2 text-amber-100/80 transition-colors hover:bg-amber-100/10"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Two panes */}
      <div className="grid flex-1 grid-cols-1 overflow-y-auto md:grid-cols-2">
        <ComparePane
          capsule={a}
          years={years}
          onPick={setLeft}
          side="left"
        />
        <ComparePane
          capsule={b}
          years={years}
          onPick={setRight}
          side="right"
        />
      </div>
    </div>
  );
}

function ComparePane({
  capsule,
  years,
  onPick,
  side,
}: {
  capsule: DasaraYear;
  years: DasaraYear[];
  onPick: (y: number) => void;
  side: "left" | "right";
}) {
  const { bi } = useTranslation();
  const era = eraForYear(capsule.year);

  return (
    <div
      style={
        {
          ["--accent" as string]: era.accent,
          ["--accent2" as string]: era.accent2,
        } as React.CSSProperties
      }
      className={cn(
        "relative flex flex-col p-4 sm:p-6",
        side === "left" && "md:border-r border-amber-100/12",
      )}
    >
      {/* Year picker */}
      <select
        value={capsule.year}
        onChange={(e) => onPick(Number(e.target.value))}
        className="mb-4 w-full rounded-xl border border-amber-100/20 bg-black/40 px-3 py-2 text-lg font-bold text-[rgb(var(--accent))] focus:border-[rgb(var(--accent)/0.6)] focus:outline-none"
      >
        {years.map((y) => (
          <option key={y.year} value={y.year} className="bg-[#120c07]">
            {y.year} — {y.titleEn}
          </option>
        ))}
      </select>

      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl ring-1 ring-amber-100/15">
        <JourneyFigure
          wiki={capsule.wiki[0]}
          alt={capsule.titleEn}
          rounded="none"
          kenBurns
          lazy={false}
          className={cn(
            "absolute inset-0 h-full w-full",
            capsule.confidence === "reconstructed" && "dasara-sepia",
          )}
        />
      </div>

      <h3 className="mt-4 text-lg font-bold text-amber-50">
        {bi(capsule.titleEn, capsule.titleKn)}
      </h3>
      <div className="mt-2">
        <ConfidenceBadge level={capsule.confidence} />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-amber-100/80">
        {bi(capsule.summaryEn, capsule.summaryKn)}
      </p>

      <dl className="mt-4 space-y-2 text-sm">
        <Row
          label={bi("Royal head", "ರಾಜ ಮುಖ್ಯಸ್ಥ")}
          value={capsule.ruler ? bi(capsule.ruler.en, capsule.ruler.kn) : "—"}
        />
        <Row
          label={bi("In the howdah", "ಅಂಬಾರಿಯಲ್ಲಿ")}
          value={
            capsule.year >= 1971
              ? bi("Goddess Chamundeshwari", "ಚಾಮುಂಡೇಶ್ವರಿ ದೇವಿ")
              : bi("The reigning ruler", "ಆಳುವ ರಾಜ")
          }
        />
        <Row
          label={bi("Governance", "ಆಡಳಿತ")}
          value={
            capsule.government
              ? bi(capsule.government.en, capsule.government.kn)
              : bi(era.headEn, era.headKn)
          }
        />
        <Row
          label={bi("Visual era", "ದೃಶ್ಯ ಯುಗ")}
          value={bi(era.filmEn, era.filmKn)}
        />
      </dl>
    </div>
  );
}

function Row({
  label,
  value,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-amber-100/10 bg-black/20 px-3 py-2">
      <dt className="text-[11px] font-semibold uppercase tracking-wide text-amber-200/60">
        {label}
      </dt>
      <dd className="mt-0.5 text-amber-100/85">{value}</dd>
    </div>
  );
}
