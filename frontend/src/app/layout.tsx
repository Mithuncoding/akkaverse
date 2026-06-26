import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/i18n/language-provider";
import { SiteHeader } from "@/components/site-header";
import { SpeechBar } from "@/components/ui/speech-bar";
import "./globals.css";

// `variable` exposes the font as the `--font-sans` CSS var used by Tailwind.
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — The living universe of Kannada heritage`,
    template: `%s · ${siteConfig.name}`,
  },
  description:
    "An AI platform to preserve and teach Kannada language, history, culture, " +
    "literature, festivals, temples, and folklore — grounded in real sources.",
  keywords: [
    "Kannada",
    "Karnataka",
    "heritage",
    "AI",
    "language learning",
    "history",
    "culture",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning is required by next-themes (it sets `class` on <html>)
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <main className="flex-1">{children}</main>
            </div>
            <SpeechBar />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
