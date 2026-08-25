import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { PageHeader } from "@/components/site/PageHeader";
import { RichText } from "@/components/ui/RichText";
import { getService, getServices, getSiteSettings } from "@/lib/data";
import { urlForImage } from "@/sanity/image";

export async function generateMetadata(
  props: PageProps<"/services/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const service = await getService(slug);
  if (!service) return { title: "Service not found" };

  const image = urlForImage(service.seo?.shareImage ?? service.image, {
    width: 1200,
    height: 630,
  });

  return {
    title: service.seo?.metaTitle ?? service.title,
    description: service.seo?.metaDescription ?? service.description,
    openGraph: {
      title: service.title,
      description: service.description,
      images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
    },
  };
}

export default async function ServicePage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const [service, services, settings] = await Promise.all([
    getService(slug),
    getServices(),
    getSiteSettings(),
  ]);

  if (!service) notFound();

  const others = services.filter((s) => s._id !== service._id);

  return (
    <>
      <PageHeader
        eyebrow={service.tag}
        heading={service.title}
        intro={service.description}
        image={service.image}
        breadcrumb={{ label: "Services", href: "/services" }}
      />

      <section className="bg-ivory py-20 md:py-24">
        <div className="shell grid gap-14 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
          <ScrollReveal>
            <article className="max-w-2xl">
              <RichText value={service.body} />
            </article>
          </ScrollReveal>

          {others.length > 0 && (
            <ScrollReveal delay={0.1}>
              <aside className="lg:sticky lg:top-28">
                <h2 className="label text-navy/45">Other services</h2>
                <ul className="mt-5 border-t border-navy/10">
                  {others.map((other) => (
                    <li key={other._id}>
                      <Link
                        href={`/services/${other.slug}`}
                        className="group flex items-center justify-between gap-4 border-b border-navy/8 py-4 transition-colors hover:text-gold"
                      >
                        <span className="text-sm text-navy transition-colors group-hover:text-gold">
                          {other.title}
                        </span>
                        <span
                          aria-hidden
                          className="label-sm text-navy/25 transition-transform duration-300 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            </ScrollReveal>
          )}
        </div>
      </section>

      <ContactCTA
        settings={settings}
        heading={`Have a ${service.title.toLowerCase()} requirement?`}
      />
    </>
  );
}
