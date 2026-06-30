"use client";

import * as React from "react";

type CountUpProps = {
  /** Numeric target. Non-digits in `suffix`/`prefix` are kept separate. */
  value: number;
  /** Optional thousands formatting (e.g. 2,000). */
  format?: boolean;
  durationMs?: number;
  className?: string;
};

/**
 * CountUp — animates a number from 0 to `value` the first time it scrolls into
 * view. Uses requestAnimationFrame with an ease-out curve so the stat strip
 * feels alive without a heavy animation dependency.
 */
export function CountUp({
  value,
  format = false,
  durationMs = 1400,
  className,
}: CountUpProps) {
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = React.useState(0);
  const started = React.useRef(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const run = () => {
      if (started.current) return;
      started.current = true;

      const reduce = window.matchMedia?.(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce) {
        setDisplay(value);
        return;
      }

      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / durationMs);
        const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
        setDisplay(Math.round(eased * value));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (typeof IntersectionObserver === "undefined") {
      run();
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, durationMs]);

  return (
    <span ref={ref} className={className}>
      {format ? display.toLocaleString("en-US") : display}
    </span>
  );
}
