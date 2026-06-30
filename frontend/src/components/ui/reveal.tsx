"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  /** Stagger delay in ms — lets a grid cascade into view. */
  delay?: number;
  /** Render element. Defaults to a div. */
  as?: "div" | "section" | "li" | "span";
  className?: string;
  /** Only animate the first time it enters (default true). */
  once?: boolean;
};

/**
 * Reveal — a tiny IntersectionObserver wrapper that fades + lifts its children
 * into view as the user scrolls. This is the motion signature that makes every
 * page feel choreographed rather than dumped on load. Honors
 * prefers-reduced-motion via the `.reveal` CSS (see globals.css).
 */
export function Reveal({
  children,
  delay = 0,
  as = "div",
  className,
  once = true,
}: RevealProps) {
  const ref = React.useRef<HTMLElement | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Fallback: if IO is unavailable, just show.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) io.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={cn("reveal", visible && "is-visible", className)}
    >
      {children}
    </Tag>
  );
}
