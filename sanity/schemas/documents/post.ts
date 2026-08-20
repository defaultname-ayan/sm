import { defineField, defineType } from "sanity";

export const POST_CATEGORIES = [
  { title: "Legal", value: "Legal" },
  { title: "Title", value: "Title" },
  { title: "NRI", value: "NRI" },
  { title: "Market", value: "Market" },
  { title: "Infrastructure", value: "Infrastructure" },
] as const;

export const post = defineType({
  name: "post",
  title: "Insight",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Headline",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      description: 'Click "Generate" after entering the headline.',
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: [...POST_CATEGORIES] },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Summary",
      type: "text",
      rows: 3,
      description: "Shown on the insights listing. Two sentences is ideal.",
      validation: (rule) => rule.required().max(280),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
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
      name: "author",
      title: "Written by",
      type: "string",
      initialValue: "Sudha Square Advisory Desk",
    }),
    defineField({
      name: "publishedAt",
      title: "Published on",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Article",
      type: "blockContent",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      publishedAt: "publishedAt",
      media: "coverImage",
    },
    prepare({ title, category, publishedAt, media }) {
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "Unpublished";
      return { title, subtitle: `${category ?? "Uncategorised"}, ${date}`, media };
    },
  },
});
