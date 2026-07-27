import type { Metadata } from "next";

import { CommunityMemoryWall } from "@/components/memories/community-memory-wall";

export const metadata: Metadata = {
  title: "Memory Wall",
  description:
    "Keep private family notes or publish consented Kannada proverbs, songs, " +
    "stories, and elder memories to a realtime community wall.",
};

export default function MemoriesPage() {
  return <CommunityMemoryWall />;
}
