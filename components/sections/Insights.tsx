import Link from "next/link";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Post } from "@/lib/types";
import { readingTime } from "@/lib/utils";

/**
 * An editorial index rather than a card row.
 *
 * Writing is read as a list of titles, not browsed as tiles, and this page
 * already spends a card grid on the land bank and an asymmetric grid on the
 * case studies. A hairline-separated index gives the section its own layout
 * family and lets the headlines carry it.
 */
export function Insights({
  posts,
  eyebrow,
  heading,
}: {
  posts: Post[];
  eyebrow?: string;
  heading?: string;
}) {
  if (posts.length === 0) return null;

  return (
    <section id="insights" className="bg-navy py-24 md:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow={eyebrow ?? "Insights"}
          heading={heading ?? "Written for buyers, not search engines."}
          surface="dark"
          align="between"
        >
          <Button href="/insights" variant="outline" className="text-ivory">
            All insights
            <span aria-hidden>→</span>
          </Button>
        </SectionHeading>

        <ul className="border-t border-ivory/10">
          {posts.slice(0, 3).map((post, i) => (
            <ScrollReveal key={post._id} delay={i * 0.07} as="li">
              <Link
                href={`/insights/${post.slug}`}
                className="group grid items-baseline gap-x-8 gap-y-3 border-b border-ivory/10 py-8 transition-colors duration-300 hover:bg-ivory/3 md:grid-cols-12 md:px-4"
              >
                <span className="label-sm text-gold md:col-span-2">
                  {post.category}
                </span>

                <div className="md:col-span-7">
                  <h3 className="font-display text-subheading font-medium text-balance text-ivory transition-colors duration-300 group-hover:text-gold-bright">
                    {post.title}
                  </h3>
                  <p className="mt-2 max-w-prose text-sm leading-relaxed text-ivory/45">
                    {post.excerpt}
                  </p>
                </div>

                <span className="label-sm text-ivory/30 md:col-span-2">
                  {readingTime(post.body)}
                </span>

                <span
                  aria-hidden
                  className="label-sm text-ivory/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold-bright md:col-span-1 md:text-right"
                >
                  →
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
