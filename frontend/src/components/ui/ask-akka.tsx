"use client";

import * as React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/language-provider";

/**
 * AskAkka — the connective tissue between every feature and the AI guides.
 *
 * Any place in Akkaverse (a district, a festival, a story, an ancestor's
 * village) can offer a one-tap "Ask Akka" that deep-links into the Assistant
 * with a specific guide pre-selected and a question pre-filled. This makes the
 * whole product feel like one connected world rather than separate pages.
 *
 * `q` should be the English canonical question (matches the seeded/curated
 * answers, so the jump is instant and reliable on a demo stage).
 */
export function AskAkka({
  q,
  guide = "akka",
  labelEn,
  labelKn,
  className,
}: {
  q: string;
  guide?: string;
  labelEn?: string;
  labelKn?: string;
  className?: string;
}) {
  const { bi } = useTranslation();
  const href = `/chat?guide=${guide}&q=${encodeURIComponent(q)}`;
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/5 px-3.5 py-1.5 text-sm font-medium text-primary transition-all hover:-translate-y-0.5 hover:bg-primary/10 hover:shadow-soft active:scale-95",
        className,
      )}
    >
      <Sparkles className="h-3.5 w-3.5" />
      {bi(labelEn ?? "Ask Akka", labelKn ?? "ಅಕ್ಕರನ್ನು ಕೇಳಿ")}
    </Link>
  );
}
