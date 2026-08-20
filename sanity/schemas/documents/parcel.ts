import { defineField, defineType } from "sanity";

export const DEAL_TYPES = [
  { title: "Outright Sale", value: "Outright Sale" },
  { title: "Joint Development (JDA)", value: "JDA" },
] as const;

export const PARCEL_STATUSES = [
  { title: "Available", value: "Available" },
  { title: "Under Negotiation", value: "Under Negotiation" },
  { title: "Mandated", value: "Mandated" },
] as const;

export const ZONES = [
  { title: "North Hyderabad", value: "North Hyderabad" },
  { title: "South Hyderabad", value: "South Hyderabad" },
  { title: "East Hyderabad", value: "East Hyderabad" },
  { title: "West Hyderabad", value: "West Hyderabad" },
] as const;

export const parcel = defineType({
  name: "parcel",
  title: "Land Parcel",
  type: "document",
  groups: [
    { name: "overview", title: "Overview", default: true },
    { name: "diligence", title: "Title & Diligence" },
    { name: "media", title: "Photos" },
    { name: "listings", title: "Listings & SEO" },
  ],
  fields: [
    defineField({
      name: "location",
      title: "Location name",
      type: "string",
      group: "overview",
      description: "The village or locality, e.g. Nandigama.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      group: "overview",
      description: 'Click "Generate" after entering the location.',
      options: {
        source: (doc: Record<string, unknown>) =>
          [doc.location, doc.district].filter(Boolean).join(" ") || "parcel",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "district",
      title: "District",
      type: "string",
      group: "overview",
      description: "e.g. Rangareddy, Sangareddy, Vikarabad.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "zone",
      title: "Zone",
      type: "string",
      group: "overview",
      options: { list: [...ZONES], layout: "radio" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "acres",
      title: "Extent in acres",
      type: "number",
      group: "overview",
      description: "Just the number, e.g. 12.18. Displayed as “12.18 ACRES”.",
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: "zoning",
      title: "Zoning / intended use",
      type: "string",
      group: "overview",
      description: "e.g. Agricultural / Residential Conversion.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "dealType",
      title: "Deal type",
      type: "string",
      group: "overview",
      options: { list: [...DEAL_TYPES], layout: "radio" },
      initialValue: "Outright Sale",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "overview",
      options: { list: [...PARCEL_STATUSES], layout: "radio" },
      initialValue: "Available",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "priceOnRequest",
      title: "Price on request",
      type: "boolean",
      group: "overview",
      description: "Leave on to hide the price and show “Price on request”.",
      initialValue: true,
    }),
    defineField({
      name: "priceLabel",
      title: "Price",
      type: "string",
      group: "overview",
      description: 'Free text, e.g. "₹95 L per acre". Only shown if the toggle above is off.',
      hidden: ({ parent }) => parent?.priceOnRequest !== false,
    }),
    defineField({
      name: "featured",
      title: "Feature on the homepage",
      type: "boolean",
      group: "overview",
      initialValue: false,
    }),

    defineField({
      name: "titleStatus",
      title: "Title status",
      type: "string",
      group: "diligence",
      description: "e.g. Patta · EC Clear · 22-A Clear.",
    }),
    defineField({
      name: "surveyNumbers",
      title: "Survey numbers",
      type: "array",
      of: [{ type: "string" }],
      group: "diligence",
      options: { layout: "tags" },
    }),
    defineField({
      name: "proximity",
      title: "Connectivity",
      type: "string",
      group: "diligence",
      description: "e.g. Off NH-44 · 6.2 km from Shadnagar.",
    }),
    defineField({
      name: "coordinates",
      title: "Map location",
      type: "geopoint",
      group: "diligence",
      description: "Optional. Used to plot the parcel on the corridor map.",
    }),
    defineField({
      name: "body",
      title: "Full description",
      type: "blockContent",
      group: "diligence",
    }),

    defineField({
      name: "coverImage",
      title: "Main photo",
      type: "image",
      group: "media",
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
      name: "gallery",
      title: "More photos",
      type: "array",
      group: "media",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Description for screen readers",
              type: "string",
            }),
          ],
        },
      ],
      options: { layout: "grid" },
    }),

    defineField({
      name: "listingLinks",
      type: "listingLinks",
      group: "listings",
    }),
    defineField({ name: "seo", type: "seo", group: "listings" }),
  ],
  orderings: [
    {
      title: "Largest first",
      name: "acresDesc",
      by: [{ field: "acres", direction: "desc" }],
    },
    {
      title: "Location A-Z",
      name: "locationAsc",
      by: [{ field: "location", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "location",
      district: "district",
      acres: "acres",
      status: "status",
      media: "coverImage",
    },
    prepare({ title, district, acres, status, media }) {
      return {
        title: `${title}${district ? ` · ${district}` : ""}`,
        subtitle: `${acres ?? "?"} acres, ${status ?? "unset"}`,
        media,
      };
    },
  },
});
