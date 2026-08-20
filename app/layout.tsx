import type { Metadata } from "next";
import { Manrope, Newsreader } from "next/font/google";

import "./globals.css";

/**
 * Two families, doing three jobs.
 *
 * Newsreader is a screen-first editorial serif: high enough contrast to feel
 * considered at display sizes, still readable in an article.
 *
 * Manrope carries both body copy and the small uppercase labels. The labels
 * used to be set in a monospace, which gave the whole interface a terminal
 * accent that read as developer tooling rather than a land practice.
 */
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://sudhasquare.in",
  ),
  title: {
    default: "Sudha Square: Land Advisory in Hyderabad",
    template: "%s · Sudha Square",
  },
  description:
    "Land acquisition, development and investment advisory across Hyderabad's growth corridors. Verified parcels, clear title, structured deals.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${newsreader.variable} ${manrope.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
