import type { Metadata } from "next";

import { ToolsView } from "@/components/tools/tools-view";

export const metadata: Metadata = {
  title: "Kannada OCR",
  description:
    "Extract Kannada text from images, translate it to English, and listen — " +
    "a demo of Akkaverse's OCR and voice tools.",
};

export default function ToolsPage() {
  return <ToolsView />;
}
