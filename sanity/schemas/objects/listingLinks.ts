import { defineField, defineType } from "sanity";

export const listingLinks = defineType({
  name: "listingLinks",
  title: "External Listings",
  type: "object",
  description: "Links to this parcel on property portals.",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "acres99",
      title: "99acres URL",
      type: "url",
    }),
    defineField({
      name: "magicBricks",
      title: "MagicBricks URL",
      type: "url",
    }),
  ],
});
