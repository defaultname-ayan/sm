import Link from "next/link";

import { TextReveal } from "@/components/motion/TextReveal";
import { Label } from "@/components/ui/Label";
import { SmartImage } from "@/components/ui/SmartImage";
import type { ImageSource } from "@/lib/types";

/**
 * The band every page opens with. Its existence is what lets the site header
 * start transparent with light type on every route, not just the homepage.
 *
 * With a photograph it behaves like the hero. Without one it is not left as
 * flat navy: a warm off-axis glow and a fade toward stone give it depth, so
 * the interior pages stop reading as a stack of identical blue slabs.
 */
export function PageHeader({
  eyebrow,
  heading,
  intro,
  image,
  breadcrumb,
  children,
}: {
  eyebrow?: string;
  heading: string;
  intro?: string;
  image?: ImageSource | null;
  breadcrumb?: { label: string; href: string };
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy pt-36 pb-16 md:pt-44 md:pb-20">
      {image ? (
        <div className="absolute inset-0">
          <SmartImage
            source={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/75 to-transparent" />
        </div>
      ) : (
        <div aria-hidden className="absolute inset-0">
          {/* Warm glow off the top-left, and a fade into stone at the base.
              Both are very low contrast: the job is to stop the surface
              reading as one flat fill, not to be noticed. */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 90% at 12% 0%, rgba(201,162,39,0.13) 0%, rgba(201,162,39,0) 55%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, rgba(33,29,24,0) 35%, rgba(33,29,24,0.55) 100%)",
            }}
          />
        </div>
      )}

      <div className="shell relative">
        {breadcrumb && (
          <Link
            href={breadcrumb.href}
            className="label-sm mb-6 inline-flex items-center gap-2 text-ivory/40 transition-colors hover:text-ivory"
          >
            <span aria-hidden>←</span>
            {breadcrumb.label}
          </Link>
        )}

        {eyebrow && <Label tone="gold">{eyebrow}</Label>}
        <TextReveal
          text={heading}
          as="h1"
          className={`font-display max-w-4xl text-title font-medium text-balance text-ivory ${
            eyebrow ? "mt-4" : ""
          }`}
        />
        {intro && (
          <p className="mt-6 max-w-2xl text-lede text-ivory/60">{intro}</p>
        )}
        {children}
      </div>
    </section>
  );
}
