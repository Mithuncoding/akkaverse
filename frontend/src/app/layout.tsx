import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/i18n/language-provider";
import { SiteHeader } from "@/components/site-header";
import { MobileNav } from "@/components/mobile-nav";
import { SpeechBar } from "@/components/ui/speech-bar";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { ServiceWorker } from "@/components/service-worker";
import "./globals.css";

// `variable` exposes the font as the `--font-sans` CSS var used by Tailwind.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://akkaverse.vercel.app"),
  applicationName: siteConfig.name,
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
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — The living universe of Kannada heritage`,
    description:
      "Step inside Karnataka's culture: immersive festivals, a heritage journey, " +
      "an AI guide, and living maps — grounded in real sources.",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — The living universe of Kannada heritage`,
    description:
      "Step inside Karnataka's culture: immersive festivals, a heritage journey, " +
      "an AI guide, and living maps.",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteConfig.name,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf8f3" },
    { media: "(prefers-color-scheme: dark)", color: "#141210" },
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
            <ScrollProgress />
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <main className="flex-1 pb-[calc(4.25rem+env(safe-area-inset-bottom))] md:pb-0">
                {children}
              </main>
            </div>
            <MobileNav />
            <SpeechBar />
            <ServiceWorker />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
