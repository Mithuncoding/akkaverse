import type { Metadata } from "next";
import { Suspense } from "react";

import { BlessingView } from "@/components/roots/blessing-view";

export const metadata: Metadata = {
  title: "A blessing for you",
  description:
    "Someone shared an ancestor's blessing with you through Akkaverse — hear " +
    "it in Kannada, and plant your own family's roots.",
};

export default function BlessingPage() {
  return (
    <Suspense fallback={null}>
      <BlessingView />
    </Suspense>
  );
}
