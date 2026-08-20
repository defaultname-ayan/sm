import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { PageHeader } from "@/components/site/PageHeader";
import { RichText } from "@/components/ui/RichText";
import { SmartImage } from "@/components/ui/SmartImage";
import { getPost, getPostSlugs, getPosts, getSiteSettings } from "@/lib/data";
import { formatDate, readingTime, whatsappLink } from "@/lib/utils";
import { urlForImage } from "@/sanity/image";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/insights/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPost(slug);
  if (!post) return { title: "Article not found" };

  const image = urlForImage(post.seo?.shareImage ?? post.coverImage, {
    width: 1200,
    height: 630,
  });

  return {
    title: post.seo?.metaTitle ?? post.title,
    description: post.seo?.metaDescription ?? post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
    },
  };
}

export default async function PostPage(props: PageProps<"/insights/[slug]">) {
  const { slug } = await props.params;
  const [post, posts, settings] = await Promise.all([
    getPost(slug),
    getPosts(),
    getSiteSettings(),
  ]);

  if (!post) notFound();

  const more = posts.filter((p) => p._id !== post._id).slice(0, 2);
  const whatsapp = whatsappLink(
    settings.whatsappNumber,
    `Hello Sudha Square. I read "${post.title}" and have a question.`,
  );

  return (
    <>
      <PageHeader
        eyebrow={`${post.category} · ${readingTime(post.body)}`}
        heading={post.title}
        image={post.coverImage}
        breadcrumb={{ label: "Insights", href: "/insights" }}
      >
        <p className="label-sm mt-8 text-ivory/40">
          {post.author} · {formatDate(post.publishedAt)}
        </p>
      </PageHeader>

      <section className="bg-ivory py-20 md:py-24">
        <div className="shell">
          <article className="mx-auto max-w-2xl">
            <p className="font-display text-xl leading-relaxed text-navy/75 italic">
              {post.excerpt}
            </p>
            <hr className="my-10 border-navy/10" />
            <RichText value={post.body} />
          </article>

          <ScrollReveal className="mx-auto mt-16 max-w-2xl">
            <div className="rounded-panel border border-navy/12 bg-white p-8">
              <h2 className="font-display text-subheading font-medium text-navy">
                Have a question about your own parcel?
              </h2>
              <p className="mt-2 text-sm text-navy/55">
                We will tell you what we would check, whether or not you buy
                through us.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="label-sm rounded-full bg-navy px-6 py-3.5 text-ivory transition-colors hover:bg-navy-raised"
                >
                  Enquire
                </Link>
                {whatsapp && (
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label-sm rounded-full border border-navy/15 px-6 py-3.5 text-navy/60 transition-colors hover:border-navy/40 hover:text-navy"
                  >
                    Message on WhatsApp
                  </a>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {more.length > 0 && (
        <section className="border-t border-navy/8 bg-ivory-shade py-20">
          <div className="shell">
            <h2 className="label text-navy/45">Keep reading</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {more.map((item, i) => (
                <ScrollReveal key={item._id} delay={i * 0.08}>
                  <Link
                    href={`/insights/${item.slug}`}
                    className="group flex h-full gap-5 overflow-hidden rounded-panel border border-navy/10 bg-white p-5 transition-all duration-500 hover:border-navy/20"
                  >
                    <div className="relative size-24 shrink-0 overflow-hidden rounded-card bg-ivory-shade">
                      <SmartImage
                        source={item.coverImage}
                        alt=""
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="label-sm text-gold">{item.category}</span>
                      <h3 className="font-display mt-2 text-base font-medium text-navy transition-colors group-hover:text-gold">
                        {item.title}
                      </h3>
                      <p className="label-sm mt-2 text-navy/30">
                        {readingTime(item.body)}
                      </p>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
