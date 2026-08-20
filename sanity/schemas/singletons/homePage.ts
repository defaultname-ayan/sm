import { defineArrayMember, defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "positioning", title: "Due Diligence" },
    { name: "infrastructure", title: "Infrastructure" },
    { name: "process", title: "Process" },
    { name: "sections", title: "Section Headings" },
  ],
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Small label above the headline",
      type: "string",
      group: "hero",
      initialValue: "Hyderabad · Telangana",
    }),
    defineField({
      name: "heroHeading",
      title: "Headline",
      type: "string",
      group: "hero",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroSubheading",
      title: "Supporting sentence",
      type: "text",
      rows: 3,
      group: "hero",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Background photo",
      type: "image",
      group: "hero",
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
      name: "stats",
      title: "Headline figures",
      type: "array",
      group: "hero",
      description: "Four figures shown beneath the hero.",
      validation: (rule) => rule.max(4),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "value",
              title: "Figure",
              type: "string",
              description: "e.g. 1,240+ or ₹560 Cr. Numbers count up on screen.",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "label",
              title: "Caption",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),

    defineField({
      name: "positioningHeading",
      title: "Headline",
      type: "string",
      group: "positioning",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "positioningBody",
      title: "Paragraphs",
      type: "array",
      of: [{ type: "text", rows: 4 }],
      group: "positioning",
      description: "One paragraph per row.",
    }),
    defineField({
      name: "verifications",
      title: "Verification checklist",
      type: "array",
      group: "positioning",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Check",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "detail",
              title: "Detail",
              type: "string",
              description: "e.g. Dharani / Bhu Bharati.",
            }),
          ],
          preview: { select: { title: "label", subtitle: "detail" } },
        }),
      ],
    }),

    defineField({
      name: "infrastructureHeading",
      title: "Headline",
      type: "string",
      group: "infrastructure",
    }),
    defineField({
      name: "infrastructureIntro",
      title: "Intro paragraph",
      type: "text",
      rows: 3,
      group: "infrastructure",
    }),
    defineField({
      name: "infrastructureImage",
      title: "Photo",
      type: "image",
      group: "infrastructure",
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
      name: "infrastructureVectors",
      title: "Infrastructure drivers",
      type: "array",
      group: "infrastructure",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Driver",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
            }),
          ],
          preview: { select: { title: "label", subtitle: "description" } },
        }),
      ],
    }),

    defineField({
      name: "processHeading",
      title: "Headline",
      type: "string",
      group: "process",
    }),
    defineField({
      name: "processSteps",
      title: "Steps",
      type: "array",
      group: "process",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Step name",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        }),
      ],
    }),

    defineField({
      name: "trustedByLabel",
      title: "Client strip label",
      type: "string",
      group: "sections",
      initialValue: "Trusted by",
    }),
    defineField({
      name: "servicesHeading",
      title: "Services heading",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "landBankEyebrow",
      title: "Land bank label",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "landBankHeading",
      title: "Land bank heading",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "corridorsHeading",
      title: "Corridor map heading",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "caseStudiesEyebrow",
      title: "Case studies label",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "caseStudiesHeading",
      title: "Case studies heading",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "briefHeading",
      title: "Monthly brief heading",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "briefIntro",
      title: "Monthly brief paragraph",
      type: "text",
      rows: 3,
      group: "sections",
    }),
    defineField({
      name: "insightsEyebrow",
      title: "Insights label",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "insightsHeading",
      title: "Insights heading",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "contactHeading",
      title: "Contact heading",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "contactIntro",
      title: "Contact paragraph",
      type: "text",
      rows: 3,
      group: "sections",
    }),
  ],
  preview: { prepare: () => ({ title: "Home Page" }) },
});
