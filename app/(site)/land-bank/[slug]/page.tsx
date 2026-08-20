import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { PageHeader } from "@/components/site/PageHeader";
import { ParcelCard } from "@/components/ui/ParcelCard";
import { RichText } from "@/components/ui/RichText";
import { SmartImage } from "@/components/ui/SmartImage";
import { MetaChip, StatusPill } from "@/components/ui/StatusPill";
import { getParcel, getParcelSlugs, getParcels, getSiteSettings } from "@/lib/data";
import { formatAcres, whatsappLink } from "@/lib/utils";
import { urlForImage } from "@/sanity/image";

export async function generateStaticParams() {
  const slugs = await getParcelSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/land-bank/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const parcel = await getParcel(slug);
  if (!parcel) return { title: "Parcel not found" };

  const title =
    parcel.seo?.metaTitle ??
    `${formatAcres(parcel.acres)} in ${parcel.location}, ${parcel.district}`;
  const description =
    parcel.seo?.metaDescription ??
    `${parcel.zoning}. ${parcel.dealType}, ${parcel.status}. ${parcel.proximity ?? ""}`.trim();
  const image = urlForImage(parcel.seo?.shareImage ?? parcel.coverImage, {
    width: 1200,
    height: 630,
  });

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
    },
  };
}

export default async function ParcelPage(props: PageProps<"/land-bank/[slug]">) {
  const { slug } = await props.params;
  const [parcel, allParcels, settings] = await Promise.all([
    getParcel(slug),
    getParcels(),
    getSiteSettings(),
  ]);

  if (!parcel) notFound();

  const related = allParcels
    .filter((p) => p._id !== parcel._id && p.zone === parcel.zone)
    .slice(0, 3);

  const facts = [
    { label: "Extent", value: formatAcres(parcel.acres) },
    { label: "District", value: parcel.district },
    { label: "Zone", value: parcel.zone },
    { label: "Zoning", value: parcel.zoning },
    { label: "Deal type", value: parcel.dealType },
    { label: "Title", value: parcel.titleStatus },
    { label: "Survey numbers", value: parcel.surveyNumbers?.join(", ") },
    { label: "Connectivity", value: parcel.proximity },
    {
      label: "Price",
      value: parcel.priceOnRequest === false ? parcel.priceLabel : "On request",
    },
  ].filter((fact) => fact.value);

  const whatsapp = whatsappLink(
    settings.whatsappNumber,
    `Hello Sudha Square. I'd like details on the ${formatAcres(parcel.acres)} parcel at ${parcel.location}, ${parcel.district}.`,
  );

  return (
    <>
      <PageHeader
        eyebrow={`${parcel.location} · ${parcel.district}`}
        heading={`${formatAcres(parcel.acres)} of ${parcel.zoning}`}
        image={parcel.coverImage}
        breadcrumb={{ label: "Land Bank", href: "/land-bank" }}
      >
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <StatusPill status={parcel.status} />
          <MetaChip>{parcel.dealType}</MetaChip>
          {parcel.titleStatus && <MetaChip>{parcel.titleStatus}</MetaChip>}
        </div>
      </PageHeader>

      <section className="bg-ivory py-20 md:py-24">
        <div className="shell grid gap-14 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          <div>
            <ScrollReveal>
              <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-panel bg-navy/10 sm:grid-cols-2">
                {facts.map((fact) => (
                  <div key={fact.label} className="bg-white p-5">
                    <dt className="label-sm text-navy/40">{fact.label}</dt>
                    <dd className="mt-1.5 text-sm text-navy">{fact.value}</dd>
                  </div>
                ))}
                {/* The 1px grid gap shows the container colour through any
                    empty cell, so an odd number of facts would leave a grey
                    box in the last slot. */}
                {facts.length % 2 === 1 && (
                  <div aria-hidden className="hidden bg-white sm:block" />
                )}
              </dl>
            </ScrollReveal>

            {parcel.body && parcel.body.length > 0 && (
              <ScrollReveal className="mt-14">
                <RichText value={parcel.body} />
              </ScrollReveal>
            )}

            {parcel.gallery && parcel.gallery.length > 0 && (
              <ScrollReveal className="mt-14">
                <h2 className="label text-navy/45">Photographs</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {parcel.gallery.map((image, i) => (
                    <div
                      key={i}
                      className="relative aspect-4/3 overflow-hidden rounded-card bg-ivory-shade"
                    >
                      <SmartImage
                        source={image}
                        alt={`The ${parcel.location} parcel, photograph ${i + 1}`}
                        fill
                        sizes="(min-width: 640px) 40vw, 92vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            )}

            {(parcel.listingLinks?.acres99 || parcel.listingLinks?.magicBricks) && (
              <ScrollReveal className="mt-14">
                <h2 className="label text-navy/45">Also listed on</h2>
                <div className="mt-4 flex flex-wrap gap-3">
                  {parcel.listingLinks.acres99 && (
                    <a
                      href={parcel.listingLinks.acres99}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label-sm rounded-full border border-navy/15 px-5 py-3 text-navy/60 transition-colors hover:border-navy/40 hover:text-navy"
                    >
                      99acres ↗
                    </a>
                  )}
                  {parcel.listingLinks.magicBricks && (
                    <a
                      href={parcel.listingLinks.magicBricks}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label-sm rounded-full border border-navy/15 px-5 py-3 text-navy/60 transition-colors hover:border-navy/40 hover:text-navy"
                    >
                      MagicBricks ↗
                    </a>
                  )}
                </div>
              </ScrollReveal>
            )}
          </div>

          <ScrollReveal delay={0.1}>
            <div className="lg:sticky lg:top-28">
              <div className="rounded-panel border border-navy/12 bg-white p-7">
                <h2 className="font-display text-subheading font-medium text-navy">
                  Enquire about this parcel
                </h2>
                <p className="mt-2 text-sm text-navy/55">
                  We respond to every parcel enquiry within one working day.
                </p>
                <div className="mt-6">
                  <EnquiryForm
                    surface="light"
                    parcel={`${parcel.location}, ${parcel.district} (${formatAcres(parcel.acres)})`}
                  />
                </div>
                {whatsapp && (
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label-sm mt-4 flex items-center justify-center gap-2 rounded-full border border-navy/15 py-3.5 text-navy/60 transition-colors hover:border-navy/40 hover:text-navy"
                  >
                    Message on WhatsApp
                  </a>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-navy/8 bg-ivory-shade py-20">
          <div className="shell">
            <h2 className="label text-navy/45">Also in {parcel.zone}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, i) => (
                <ScrollReveal key={item._id} delay={i * 0.07}>
                  <ParcelCard parcel={item} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
