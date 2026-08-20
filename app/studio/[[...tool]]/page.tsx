import type { Metadata, Viewport } from "next";

import { hasSanity } from "@/sanity/env";

import { StudioSetupNotice } from "./StudioSetupNotice";
import { Studio } from "./Studio";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Sudha Square CMS",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

export default function StudioPage() {
  // Rendering the Studio without a project id throws an opaque error inside
  // Sanity. A setup screen is far more useful than a stack trace.
  return hasSanity ? <Studio /> : <StudioSetupNotice />;
}
