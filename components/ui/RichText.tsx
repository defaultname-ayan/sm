import { PortableText, type PortableTextComponents } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";

import { SmartImage } from "@/components/ui/SmartImage";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-6 text-lede text-navy/70 first:mt-0">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="font-display mt-14 text-heading font-medium text-balance text-navy">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display mt-10 text-subheading font-medium text-navy">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-10 border-l-2 border-gold pl-6">
        <p className="font-display text-xl leading-relaxed text-navy/80 italic">
          {children}
        </p>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-6 space-y-3 pl-0">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mt-6 list-decimal space-y-3 pl-5 marker:text-gold">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="relative flex gap-3.5 text-navy/70">
        <span
          aria-hidden
          className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold"
        />
        <span className="min-w-0 flex-1">{children}</span>
      </li>
    ),
    number: ({ children }) => <li className="text-navy/70 pl-1">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-medium text-navy">{children}</strong>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-navy underline decoration-gold decoration-2 underline-offset-4 transition-colors hover:text-gold"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <figure className="my-12">
        <div className="relative aspect-16/10 overflow-hidden rounded-panel bg-ivory-shade">
          <SmartImage
            source={value}
            alt={value?.alt ?? ""}
            fill
            sizes="(min-width: 768px) 70vw, 92vw"
            className="object-cover"
          />
        </div>
        {value?.caption && (
          <figcaption className="label-sm mt-3 text-navy/40">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
};

export function RichText({ value }: { value?: PortableTextBlock[] }) {
  if (!value || value.length === 0) return null;
  return <PortableText value={value} components={components} />;
}
