import type { Metadata } from "next";

import { ExploreView } from "@/components/explore/explore-view";

export const metadata: Metadata = {
  title: "Karnataka Explorer",
  description:
    "Explore the temples, cities, heritage sites, nature, and cuisine of " +
    "Karnataka — bilingual, filterable, and rich with highlights.",
};

export default function ExplorePage() {
  return <ExploreView />;
}
