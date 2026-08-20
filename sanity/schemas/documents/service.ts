import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Service name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tag",
      title: "Short label",
      type: "string",
      description: "The small tag on the card, e.g. Land Acquisition.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Card description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Full page content",
      type: "blockContent",
    }),
    defineField({
      name: "image",
      title: "Header image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Description for screen readers",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower numbers appear first. Shown as 01, 02, 03…",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  orderings: [
    { title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "tag", order: "order" },
    prepare({ title, subtitle, order }) {
      return {
        title: `${String(order ?? 0).padStart(2, "0")} · ${title}`,
        subtitle,
      };
    },
  },
});
