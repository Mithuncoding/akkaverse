import type { Metadata } from "next";

import { DasaraArchiveView } from "@/components/festivals/dasara/dasara-archive-view";

export const metadata: Metadata = {
  title: "The Living Archive of Mysuru Dasara",
  description:
    "Travel a century of Mysuru Dasara year by year — an immersive, honest " +
    "digital archive with a Time Machine slider, year comparison, hidden " +
    "treasures and an AI historian. Bilingual English ⇄ Kannada.",
};

export default function DasaraArchivePage() {
  return <DasaraArchiveView />;
}
