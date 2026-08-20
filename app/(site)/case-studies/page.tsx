import type { Metadata } from "next";

import { CaseStudies } from "@/components/sections/CaseStudies";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { PageHeader } from "@/components/site/PageHeader";
import {
  getCaseStudies,
  getHomePage,
  getPageContent,
  getSiteSettings,
} from "@/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent("page.caseStudies");
  return {
    title: page.seo?.metaTitle ?? "Case Studies",
    description: page.seo?.metaDescription ?? page.intro,
  };
}

export default async function CaseStudiesPage() {
  const [caseStudies, settings, home, page] = await Promise.all([
    getCaseStudies(),
    getSiteSettings(),
    getHomePage(),
    getPageContent("page.caseStudies"),
  ]);

  return (
    <>
      <PageHeader
        eyebrow={page.eyebrow}
        heading={page.heading}
        intro={page.intro}
        image={page.image}
      />
      <CaseStudies
        caseStudies={caseStudies}
        eyebrow={home.caseStudiesEyebrow}
        heading={home.caseStudiesHeading}
      />
      <ContactCTA
        settings={settings}
        heading={home.contactHeading}
        intro={home.contactIntro}
      />
    </>
  );
}
