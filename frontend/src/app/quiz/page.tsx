import type { Metadata } from "next";

import { QuizView } from "@/components/quiz/quiz-view";

export const metadata: Metadata = {
  title: "Karnataka Quest — Quiz Adventures",
  description:
    "Not a quiz — an adventure. Explore Karnataka through game modes, earn XP " +
    "and ranks, unlock a collectibles museum, and learn with an AI teacher. " +
    "Handcrafted questions, fully bilingual.",
};

export default function QuizPage() {
  return <QuizView />;
}
