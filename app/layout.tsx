import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://motweb-english.motraxagency.workers.dev"),
  title: {
    default: "Mot Web Services",
    template: "%s | Mot Web Services"
  },
  description: "Location-aware sponsored offers, practical guides, and responsive support from Mot Web Services.",
  openGraph: {
    title: "Mot Web Services",
    description: "Browse sponsored CPA offers available for your location and device.",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://motweb-english.motraxagency.workers.dev",
    siteName: "Mot Web Services",
    locale: "en_US",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html dir="ltr" lang="en" data-theme="dark">
      <body>{children}</body>
    </html>
  );
}
