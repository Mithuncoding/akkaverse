import type { Metadata } from "next";

import { LearnView } from "@/components/learn/learn-view";

export const metadata: Metadata = {
  title: "Kannada Academy",
  description:
    "Follow a guided Kannada learning path with script and pronunciation labs, " +
    "contextual vocabulary, daily missions, mastery tracking, and recall challenges.",
};

export default function LearnPage() {
  return <LearnView />;
}
