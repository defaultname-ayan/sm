import { defineField, defineType } from "sanity";

export const brochure = defineType({
  name: "brochure",
  title: "Land Opportunities Brief",
  type: "document",
  description: "The monthly PDF brief offered on the homepage.",
  fields: [
    defineField({
      name: "issueMonth",
      title: "Issue month",
      type: "date",
      options: { dateFormat: "MMMM YYYY" },
      description: "Any day in the month works. Only month and year are shown.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coverSummary",
      title: "What's inside",
      type: "array",
      of: [{ type: "string" }],
      description: "Four short lines listed on the brief's cover.",
      validation: (rule) => rule.max(6),
      initialValue: [
        "Newly mandated parcels",
        "Corridor pricing observations",
        "Closed transactions",
        "Market intelligence",
      ],
    }),
    defineField({
      name: "file",
      title: "PDF",
      type: "file",
      options: { accept: ".pdf" },
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    { title: "Newest first", name: "issueDesc", by: [{ field: "issueMonth", direction: "desc" }] },
  ],
  preview: {
    select: { issueMonth: "issueMonth" },
    prepare({ issueMonth }) {
      const label = issueMonth
        ? new Date(issueMonth).toLocaleDateString("en-IN", {
            month: "long",
            year: "numeric",
          })
        : "No date";
      return { title: `Land Opportunities, ${label}` };
    },
  },
});
