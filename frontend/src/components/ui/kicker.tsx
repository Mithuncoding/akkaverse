"use client";

import * as React from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Kicker — a Kannada-first bilingual eyebrow.
 *
 * Kannada is shown prominently (in script) and always present, regardless of
 * the active language toggle, so the Kannada identity is felt on every screen —
 * not hidden behind an English-only UI.
 */
export function Kicker({
  en,
  kn,
  icon: Icon,
  className,
  align = "start",
}: {
  en: string;
  kn: string;
  icon?: LucideIcon;
  className?: string;
  align?: "start" | "center";
}) {
  return (
    <span
      className={cn(
        "inline-flex flex-wrap items-center gap-x-2 gap-y-1",
        align === "center" && "justify-center",
        className,
      )}
    >
      {Icon && <Icon className="h-4 w-4 text-primary" />}
      <span className="text-sm font-semibold tracking-wide text-primary">
        {kn}
      </span>
      <span className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
        {en}
      </span>
    </span>
  );
}
