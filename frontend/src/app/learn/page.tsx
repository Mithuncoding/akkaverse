import type { Metadata } from "next";

import { LearnView } from "@/components/learn/learn-view";

export const metadata: Metadata = {
  title: "Learn Kannada",
  description:
    "Learn the Kannada alphabet, practise everyday words with flashcards, and " +
    "test yourself with an interactive quiz — with audio pronunciation.",
};

export default function LearnPage() {
  return <LearnView />;
}
