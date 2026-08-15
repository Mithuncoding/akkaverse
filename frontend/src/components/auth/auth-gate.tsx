"use client";

import * as React from "react";

// Auth is disabled for the hackathon: the app is fully open, no login required.
export function AuthGate({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}