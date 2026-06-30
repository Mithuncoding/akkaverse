"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type RotatingTextProps = {
  /** Pre-resolved strings to cycle through. */
  items: string[];
  intervalMs?: number;
  className?: string;
};

/**
 * RotatingText — swaps through a list of words with a soft blur+lift
 * transition. Used in the hero to let the heritage "come alive" through a
 * cycle of cultural concepts (stories, language, temples, festivals…).
 */
export function RotatingText({
  items,
  intervalMs = 2200,
  className,
}: RotatingTextProps) {
  const [index, setIndex] = React.useState(0);
  const key = items.join("|");

  React.useEffect(() => {
    if (items.length <= 1) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % items.length),
      intervalMs,
    );
    return () => window.clearInterval(id);
  }, [items.length, intervalMs]);

  // Reset when the source list identity changes (e.g. language switch).
  React.useEffect(() => setIndex(0), [key]);

  return (
    <span
      className={cn(
        "relative inline-grid overflow-hidden align-bottom",
        className,
      )}
    >
      {items.map((word, i) => (
        <span
          key={word + i}
          aria-hidden={i !== index}
          className={cn(
            "col-start-1 row-start-1 whitespace-nowrap transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
            i === index
              ? "translate-y-0 opacity-100 blur-0"
              : "pointer-events-none translate-y-[0.5em] opacity-0 blur-[6px]",
          )}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
