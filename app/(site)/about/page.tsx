import type { Metadata } from "next";

import { ContactCTA } from "@/components/sections/ContactCTA";
import { Infrastructure } from "@/components/sections/Infrastructure";
import { Positioning } from "@/components/sections/Positioning";
import { Process } from "@/components/sections/Process";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { PageHeader } from "@/components/site/PageHeader";
import {
  getClientLogos,
  getHomePage,
  getPageContent,
  getSiteSettings,
} from "@/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent("page.about");
  return {
    title: page.seo?.metaTitle ?? "About",
    description: page.seo?.metaDescription ?? page.intro,
  };
}

export default async function AboutPage() {
  const [home, settings, clients, page] = await Promise.all([
    getHomePage(),
    getSiteSettings(),
    getClientLogos(),
    getPageContent("page.about"),
  ]);

  return (
    <>
      <PageHeader
        eyebrow={page.eyebrow}
        heading={page.heading}
        intro={page.intro}
        image={page.image}
      />
      <TrustStrip
        clients={clients}
        settings={settings}
        label={home.trustedByLabel}
      />
      <Positioning home={home} />
      <Infrastructure home={home} />
      <Process home={home} />
      <ContactCTA
        settings={settings}
        heading={home.contactHeading}
        intro={home.contactIntro}
      />
    </>
  );
}
