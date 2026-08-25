import type { Metadata } from "next";
import Link from "next/link";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { PageHeader } from "@/components/site/PageHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { getPageContent, getPosts } from "@/lib/data";
import { formatDate, readingTime } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent("page-insights");
  return {
    title: page.seo?.metaTitle ?? "Insights",
    description: page.seo?.metaDescription ?? page.intro,
  };
}

export default async function InsightsPage() {
  const [posts, page] = await Promise.all([
    getPosts(),
    getPageContent("page-insights"),
  ]);
  const [lead, ...rest] = posts;

  return (
    <>
      <PageHeader
        eyebrow={page.eyebrow}
        heading={page.heading}
        intro={page.intro}
        image={page.image}
      />

      <section className="bg-ivory py-20 md:py-24">
        <div className="shell">
          {posts.length === 0 ? (
            <p className="text-lede text-navy/55">
              The first insight is being written. Check back shortly.
            </p>
          ) : (
            <>
              {lead && (
                <ScrollReveal>
                  <Link
                    href={`/insights/${lead.slug}`}
                    className="group grid gap-8 overflow-hidden rounded-panel border border-navy/10 bg-white transition-all duration-500 hover:border-navy/20 hover:shadow-[0_18px_40px_-24px_rgba(11,19,43,0.35)] md:grid-cols-2"
                  >
                    <div className="relative aspect-16/10 overflow-hidden bg-ivory-shade md:aspect-auto md:h-full">
                      <SmartImage
                        source={lead.coverImage}
                        alt=""
                        fill
                        priority
                        sizes="(min-width: 768px) 50vw, 92vw"
                        className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="flex flex-col justify-center p-8 md:py-12 md:pr-12 md:pl-0">
                      <div className="flex items-center gap-4">
                        <span className="label-sm text-gold">{lead.category}</span>
                        <span className="label-sm text-navy/30">
                          {readingTime(lead.body)}
                        </span>
                      </div>
                      <h2 className="font-display mt-5 text-heading font-medium text-balance text-navy">
                        {lead.title}
                      </h2>
                      <p className="mt-4 text-lede text-navy/60">{lead.excerpt}</p>
                      <span className="label-sm mt-8 flex items-center gap-2 text-navy transition-colors group-hover:text-gold">
                        Read the article
                        <span
                          aria-hidden
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              )}

              {rest.length > 0 && (
                <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post, i) => (
                    <ScrollReveal key={post._id} delay={i * 0.07}>
                      <Link
                        href={`/insights/${post.slug}`}
                        className="group flex h-full flex-col overflow-hidden rounded-panel border border-navy/10 bg-white transition-all duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-navy/20 hover:shadow-[0_18px_40px_-24px_rgba(11,19,43,0.35)]"
                      >
                        <div className="relative aspect-16/10 overflow-hidden bg-ivory-shade">
                          <SmartImage
                            source={post.coverImage}
                            alt=""
                            fill
                            sizes="(min-width: 768px) 33vw, 92vw"
                            className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
                          />
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                          <div className="flex items-center gap-4">
                            <span className="label-sm text-gold">{post.category}</span>
                            <span className="label-sm text-navy/30">
                              {readingTime(post.body)}
                            </span>
                          </div>
                          <h2 className="font-display mt-4 text-subheading font-medium text-balance text-navy">
                            {post.title}
                          </h2>
                          <p className="mt-3 text-sm leading-relaxed text-navy/55">
                            {post.excerpt}
                          </p>
                          <p className="label-sm mt-auto pt-6 text-navy/30">
                            {formatDate(post.publishedAt)}
                          </p>
                        </div>
                      </Link>
                    </ScrollReveal>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
