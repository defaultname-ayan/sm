import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "Search & Sharing",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "metaTitle",
      title: "Title shown in Google",
      type: "string",
      description:
        "Leave empty to use the page title. Around 60 characters works best.",
      validation: (rule) => rule.max(70).warning("Google usually cuts off after ~60 characters."),
    }),
    defineField({
      name: "metaDescription",
      title: "Description shown in Google",
      type: "text",
      rows: 3,
      description: "A one or two sentence summary. Around 155 characters.",
      validation: (rule) =>
        rule.max(180).warning("Google usually cuts off after ~155 characters."),
    }),
    defineField({
      name: "shareImage",
      title: "Image shown when shared",
      type: "image",
      description:
        "Used on WhatsApp, LinkedIn and X. Falls back to the page's main image.",
      options: { hotspot: true },
    }),
  ],
});
