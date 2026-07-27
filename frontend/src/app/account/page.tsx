import { Suspense } from "react";
import type { Metadata } from "next";

import { AccountView } from "@/components/auth/account-view";

export const metadata: Metadata = {
  title: "Your account",
  description: "Manage your private Akkaverse identity and cloud archive.",
};

export default function AccountPage() {
  return (
    <Suspense>
      <AccountView />
    </Suspense>
  );
}