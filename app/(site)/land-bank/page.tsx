import type { Metadata } from "next";

import { ContactCTA } from "@/components/sections/ContactCTA";
import { CorridorMap } from "@/components/sections/CorridorMap";
import { LandBankBrowser } from "@/components/sections/LandBankBrowser";
import { PageHeader } from "@/components/site/PageHeader";
import {
  getHomePage,
  getPageContent,
  getParcels,
  getSiteSettings,
} from "@/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent("page.landBank");
  return {
    title: page.seo?.metaTitle ?? "Land Bank",
    description: page.seo?.metaDescription ?? page.intro,
  };
}

export default async function LandBankPage() {
  const [parcels, settings, home, page] = await Promise.all([
    getParcels(),
    getSiteSettings(),
    getHomePage(),
    getPageContent("page.landBank"),
  ]);

  return (
    <>
      <PageHeader
        eyebrow={page.eyebrow}
        heading={page.heading}
        intro={page.intro}
        image={page.image}
      />
      <LandBankBrowser parcels={parcels} />
      <CorridorMap parcels={parcels} heading={home.corridorsHeading} />
      <ContactCTA
        settings={settings}
        heading="Looking for something not listed here?"
        intro="A significant share of what we hold is off-market and never published. Tell us the requirement."
      />
    </>
  );
}
