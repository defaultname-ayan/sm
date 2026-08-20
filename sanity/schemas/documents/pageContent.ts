import { defineField, defineType } from "sanity";

/**
 * The header copy for one of the standard pages.
 *
 * These are edited as a fixed set (one per page) rather than created freely,
 * so the Studio lists them individually and the `name` field is display-only.
 */
export const pageContent = defineType({
  name: "pageContent",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Which page",
      type: "string",
      readOnly: true,
      description: "Set automatically. This tells you which page you are editing.",
    }),
    defineField({
      name: "eyebrow",
      title: "Small label above the heading",
      type: "string",
      description: "Optional. Leave empty for a cleaner header.",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Intro paragraph",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      title: "Header photograph",
      type: "image",
      description:
        "Optional. Sits behind the heading, darkened. Leave empty for a plain header.",
      options: { hotspot: true },
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: {
    select: { title: "name", subtitle: "heading" },
  },
});
