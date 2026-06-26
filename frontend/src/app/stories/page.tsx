import type { Metadata } from "next";

import { StoriesView } from "@/components/stories/stories-view";

export const metadata: Metadata = {
  title: "Story Weaver",
  description:
    "Karnataka's living stories — folktales, legends, valour and Vachana " +
    "wisdom like Punyakoti, Rani Chennamma, Bahubali and Hampi — read aloud " +
    "in English and Kannada.",
};

export default function StoriesPage() {
  return <StoriesView />;
}
