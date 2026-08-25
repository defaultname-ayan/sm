import type { Metadata } from "next";

import { ContactCTA } from "@/components/sections/ContactCTA";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { PageHeader } from "@/components/site/PageHeader";
import {
  getHomePage,
  getPageContent,
  getServices,
  getSiteSettings,
} from "@/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent("page-services");
  return {
    title: page.seo?.metaTitle ?? "Services",
    description: page.seo?.metaDescription ?? page.intro,
  };
}

export default async function ServicesPage() {
  const [services, settings, home, page] = await Promise.all([
    getServices(),
    getSiteSettings(),
    getHomePage(),
    getPageContent("page-services"),
  ]);

  return (
    <>
      <PageHeader
        eyebrow={page.eyebrow}
        heading={page.heading}
        intro={page.intro}
        image={page.image}
      />
      <Services services={services} heading={home.servicesHeading} />
      <Process home={home} />
      <ContactCTA
        settings={settings}
        heading={home.contactHeading}
        intro={home.contactIntro}
      />
    </>
  );
}
