import { defineField, defineType } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({
      name: "type",
      title: "Deal type",
      type: "string",
      description: "e.g. Township Assembly, Villa Development.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      options: {
        source: (doc: Record<string, unknown>) =>
          [doc.type, doc.location].filter(Boolean).join(" ") || "case-study",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "e.g. Shadnagar Corridor · Rangareddy.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "acreage",
      title: "Extent",
      type: "string",
      description: "e.g. 112 Acres.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "structure",
      title: "Deal structure",
      type: "string",
      description: "e.g. Phased Aggregation · Outright.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "narrative",
      title: "Summary",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Description for screen readers",
          type: "string",
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Full write-up",
      type: "blockContent",
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower numbers appear first.",
      initialValue: 0,
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  orderings: [
    { title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "type", subtitle: "location", media: "image" },
  },
});
