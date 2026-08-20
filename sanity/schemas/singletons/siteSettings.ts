import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "identity", title: "Identity", default: true },
    { name: "contact", title: "Contact" },
    { name: "menus", title: "Menus" },
    { name: "social", title: "Social" },
    { name: "seo", title: "Search & Sharing" },
  ],
  fields: [
    defineField({
      name: "companyName",
      title: "Company name",
      type: "string",
      group: "identity",
      initialValue: "Sudha Square",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "identity",
      description: "Sits beside the logo, e.g. Land Advisory.",
      initialValue: "Land Advisory",
    }),
    defineField({
      name: "descriptor",
      title: "Descriptor",
      type: "string",
      group: "identity",
      description: "The longer line used in the footer.",
      initialValue: "Land acquisition, development and investment",
    }),
    defineField({
      name: "reraNumber",
      title: "RERA registration number",
      type: "string",
      group: "identity",
    }),

    defineField({
      name: "phone",
      title: "Telephone",
      type: "string",
      group: "contact",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      group: "contact",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp number",
      type: "string",
      group: "contact",
      description:
        "Digits only, including country code, e.g. 919000000000. Used for the WhatsApp button.",
      validation: (rule) =>
        rule
          .regex(/^\d{10,15}$/, { name: "digits only" })
          .warning("Use digits only, including the country code."),
    }),
    defineField({
      name: "addressLines",
      title: "Office address",
      type: "array",
      of: [{ type: "string" }],
      group: "contact",
      description: "One line per row.",
    }),

    defineField({
      name: "linkedin",
      title: "LinkedIn URL",
      type: "url",
      group: "social",
    }),
    defineField({
      name: "acres99Profile",
      title: "99acres profile URL",
      type: "url",
      group: "social",
    }),
    defineField({
      name: "magicBricksProfile",
      title: "MagicBricks profile URL",
      type: "url",
      group: "social",
    }),

    defineField({
      name: "navigation",
      title: "Main menu",
      type: "array",
      of: [{ type: "navLink" }],
      group: "menus",
      description:
        "The links across the top of every page. Drag to reorder. Four or five reads best.",
      validation: (rule) => rule.max(6).warning("More than six items crowds the menu."),
    }),
    defineField({
      name: "footerBlurb",
      title: "Footer paragraph",
      type: "text",
      rows: 3,
      group: "menus",
      description: "The short sentence under the logo in the footer.",
    }),
    defineField({
      name: "footerColumns",
      title: "Footer link columns",
      type: "array",
      group: "menus",
      validation: (rule) => rule.max(3).warning("Three columns is the maximum that fits."),
      of: [
        {
          type: "object",
          name: "footerColumn",
          title: "Column",
          fields: [
            defineField({
              name: "title",
              title: "Column heading",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "links",
              title: "Links",
              type: "array",
              of: [{ type: "navLink" }],
            }),
          ],
          preview: {
            select: { title: "title", links: "links" },
            prepare({ title, links }) {
              const count = Array.isArray(links) ? links.length : 0;
              return { title, subtitle: `${count} link${count === 1 ? "" : "s"}` };
            },
          },
        },
      ],
    }),

    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
