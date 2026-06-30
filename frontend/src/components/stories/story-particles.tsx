"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import type { ParticleKind } from "@/data/story-cinematic";

type Bit = {
  left: number;
  delay: number;
  duration: number;
  size: number;
  drift: number;
  opacity: number;
};

/**
 * StoryParticles — a mood-driven ambient layer.
 *
 * Each mood breathes differently: fireflies hover, embers and sparks rise,
 * lotus petals drift up, dust floats sideways. Positions are generated once
 * after mount (client-only) so they never cause a hydration mismatch, and the
 * whole layer is purely decorative / pointer-events-none.
 */
export function StoryParticles({
  kind,
  count = 28,
  className,
}: {
  kind: ParticleKind;
  count?: number;
  className?: string;
}) {
  const [bits, setBits] = React.useState<Bit[]>([]);

  React.useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const n = reduce ? Math.min(8, count) : count;
    setBits(
      Array.from({ length: n }, () => ({
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 7 + Math.random() * 10,
        size: 4 + Math.random() * 8,
        drift: (Math.random() - 0.5) * 80,
        opacity: 0.25 + Math.random() * 0.5,
      })),
    );
  }, [count, kind]);

  const rising = kind === "ember" || kind === "spark" || kind === "lotus";

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {bits.map((b, i) => (
        <span
          key={i}
          className={cn("story-bit", `story-bit--${kind}`)}
          style={
            {
              left: `${b.left}%`,
              bottom: rising ? "-8%" : undefined,
              top: rising ? undefined : `${b.left}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
              opacity: b.opacity,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.duration}s`,
              "--drift": `${b.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
