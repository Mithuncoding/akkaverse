import type { Metadata } from "next";

import { TimelineView } from "@/components/timeline/timeline-view";

export const metadata: Metadata = {
  title: "Heritage Timeline",
  description:
    "Walk through 1,700+ years of Karnataka history — from the Kadambas and " +
    "Chalukyas to Vijayanagara, Mysore, and the birth of modern Karnataka.",
};

/**
 * Heritage Timeline page (Server Component shell).
 * Exposes SEO metadata, then renders the bilingual client view.
 */
export default function TimelinePage() {
  return <TimelineView />;
}
