import type { Metadata } from "next";

import { AboutView } from "@/components/about/about-view";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "A personal note from the maker of Akkaverse — why we built a digital " +
    "bridge to carry Kannada language, history, folklore and the memories of " +
    "our elders to the next generation.",
};

export default function AboutPage() {
  return <AboutView />;
}
