import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { PageHeader } from "@/components/site/PageHeader";
import { RichText } from "@/components/ui/RichText";
import {
  getCaseStudy,
  getCaseStudySlugs,
  getSiteSettings,
} from "@/lib/data";
import { urlForImage } from "@/sanity/image";

export async function generateStaticParams() {
  const slugs = await getCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/case-studies/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const study = await getCaseStudy(slug);
  if (!study) return { title: "Case study not found" };

  const image = urlForImage(study.seo?.shareImage ?? study.image, {
    width: 1200,
    height: 630,
  });

  return {
    title: study.seo?.metaTitle ?? `${study.type} in ${study.location}`,
    description: study.seo?.metaDescription ?? study.narrative,
    openGraph: {
      title: `${study.type} in ${study.location}`,
      description: study.narrative,
      images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
    },
  };
}

export default async function CaseStudyPage(
  props: PageProps<"/case-studies/[slug]">,
) {
  const { slug } = await props.params;
  const [study, settings] = await Promise.all([
    getCaseStudy(slug),
    getSiteSettings(),
  ]);

  if (!study) notFound();

  return (
    <>
      <PageHeader
        eyebrow={study.type}
        heading={study.location}
        intro={study.narrative}
        image={study.image}
        breadcrumb={{ label: "Case Studies", href: "/case-studies" }}
      >
        <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6 border-t border-ivory/12 pt-8">
          <div>
            <dt className="label-sm text-ivory/30">Extent</dt>
            <dd className="font-display mt-1.5 text-2xl font-medium text-ivory">
              {study.acreage}
            </dd>
          </div>
          <div>
            <dt className="label-sm text-ivory/30">Structure</dt>
            <dd className="font-display mt-1.5 text-2xl font-medium text-ivory">
              {study.structure}
            </dd>
          </div>
        </dl>
      </PageHeader>

      <section className="bg-ivory py-20 md:py-24">
        <div className="shell">
          <ScrollReveal className="mx-auto max-w-2xl">
            <RichText value={study.body} />
          </ScrollReveal>
        </div>
      </section>

      <ContactCTA settings={settings} />
    </>
  );
}
