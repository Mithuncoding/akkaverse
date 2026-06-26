import type { Metadata } from "next";

import { MemoryWallView } from "@/components/memories/memory-wall-view";

export const metadata: Metadata = {
  title: "Memory Wall",
  description:
    "A community heritage scrapbook — add a Kannada proverb, folk song, " +
    "story, or a memory from your elders. Saved on your device, free and " +
    "open, to keep Kannada heritage alive.",
};

export default function MemoriesPage() {
  return <MemoryWallView />;
}
