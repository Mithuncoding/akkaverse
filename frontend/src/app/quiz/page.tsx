import type { Metadata } from "next";

import { QuizView } from "@/components/quiz/quiz-view";

export const metadata: Metadata = {
  title: "AI Quiz Generator",
  description:
    "Generate Karnataka heritage quizzes by topic and difficulty, track your " +
    "score, and climb the leaderboard — fully bilingual.",
};

export default function QuizPage() {
  return <QuizView />;
}
