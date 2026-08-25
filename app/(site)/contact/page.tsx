import type { Metadata } from "next";

import { ContactCTA } from "@/components/sections/ContactCTA";
import { PageHeader } from "@/components/site/PageHeader";
import { getHomePage, getPageContent, getSiteSettings } from "@/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent("page-contact");
  return {
    title: page.seo?.metaTitle ?? "Contact",
    description: page.seo?.metaDescription ?? page.intro,
  };
}

export default async function ContactPage() {
  const [settings, home, page] = await Promise.all([
    getSiteSettings(),
    getHomePage(),
    getPageContent("page-contact"),
  ]);

  return (
    <>
      <PageHeader
        eyebrow={page.eyebrow}
        heading={page.heading}
        intro={page.intro}
        image={page.image}
      />
      <ContactCTA
        settings={settings}
        heading={home.contactHeading}
        intro={home.contactIntro}
      />
    </>
  );
}
