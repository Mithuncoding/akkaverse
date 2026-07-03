import type { Metadata } from "next";

import { RootsProvider } from "@/lib/roots/store";
import { RootsView } from "@/components/roots/roots-view";

export const metadata: Metadata = {
  title: "Roots — Every Family Has a Story",
  description:
    "Weave your family's names, villages and memories into the living heritage " +
    "of Karnataka. A private, offline family-legacy museum inside Akkaverse.",
};

/**
 * Roots page (Server Component shell).
 * The whole experience is client-rendered (localStorage, canvas, AI streaming),
 * so this stays a thin metadata + mount point wrapped in the shared store.
 */
export default function RootsPage() {
  return (
    <RootsProvider>
      <RootsView />
    </RootsProvider>
  );
}
