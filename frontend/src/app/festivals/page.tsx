import type { Metadata } from "next";

import { FestivalsView } from "@/components/festivals/festivals-view";

export const metadata: Metadata = {
  title: "Festival Calendar",
  description:
    "Discover Karnataka's festivals month by month — Dasara, Hampi Utsava, " +
    "Ugadi, Karaga, Kambala and more, with live photos and read-aloud, in " +
    "English and Kannada.",
};

export default function FestivalsPage() {
  return <FestivalsView />;
}
