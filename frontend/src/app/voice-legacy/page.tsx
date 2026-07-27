import { Suspense } from "react";
import type { Metadata } from "next";

import { VoiceLegacyView } from "@/components/roots/voice-legacy-view";

export const metadata: Metadata = {
  title: "A Family Voice — Voice Legacy",
  description:
    "Receive a private bilingual family message, hear it narrated in Kannada, and carry its words to the next generation.",
};

export default function VoiceLegacyPage() {
  return (
    <Suspense
      fallback={
        <div className="container grid min-h-[70dvh] place-items-center text-muted-foreground">
          Opening your family voice…
        </div>
      }
    >
      <VoiceLegacyView />
    </Suspense>
  );
}