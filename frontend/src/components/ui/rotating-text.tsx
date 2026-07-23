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
 * transition. Only ONE word is ever rendered on top of an invisible sizer
 * (the longest item), so the words can never overlap into a garble and the
 * line width never jumps. Used in the hero to let the heritage "come alive"
 * through a cycle of cultural concepts (stories, language, temples…).
 */
export function RotatingText({
  items,
  intervalMs = 2200,
  className,
}: RotatingTextProps) {
  const [index, setIndex] = React.useState(0);
  const key = items.join("|");

  // The widest item reserves the layout box so nothing shifts as words swap.
  const longest = React.useMemo(
    () =>
      items.reduce((a, b) => (b.length > a.length ? b : a), items[0] ?? ""),
    [items],
  );

  React.useEffect(() => {
    if (items.length <= 1) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % items.length),
      intervalMs,
    );
    return () => window.clearInterval(id);
  }, [items.length, intervalMs, key]);

  // Reset when the source list identity changes (e.g. language switch).
  React.useEffect(() => setIndex(0), [key]);

  const word = items[index] ?? "";

  return (
    <span
      className={cn(
        "relative inline-grid justify-items-center align-bottom",
        className,
      )}
    >
      {/* Invisible sizer — reserves width + height of the longest word. */}
      <span
        aria-hidden
        className="invisible col-start-1 row-start-1 whitespace-nowrap"
      >
        {longest}
      </span>
      {/* The single visible word; remounts on each swap to replay the anim. */}
      <span
        key={index}
        className="rotating-word col-start-1 row-start-1 whitespace-nowrap"
      >
        {word}
      </span>
    </span>
  );
}
