import { defineField, defineType } from "sanity";

/** A single menu entry. Used by the main menu and the footer columns. */
export const navLink = defineType({
  name: "navLink",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Text",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Goes to",
      type: "string",
      description:
        'A path on this site such as /land-bank, or a full address starting with https://',
      validation: (rule) =>
        rule
          .required()
          .custom((value) =>
            typeof value === "string" &&
            (value.startsWith("/") || value.startsWith("http") || value.startsWith("#"))
              ? true
              : 'Start with "/" for a page on this site, or "https://" for another site.',
          ),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
});
