import { defineQuery } from "next-sanity";

const PARCEL_FIELDS = /* groq */ `
  _id,
  "slug": slug.current,
  location, district, zone, acres, zoning, dealType, status,
  titleStatus, surveyNumbers, proximity, priceOnRequest, priceLabel, featured,
  "coordinates": select(defined(coordinates) => { "lat": coordinates.lat, "lng": coordinates.lng }),
  coverImage, gallery, body, listingLinks, seo
`;

const POST_FIELDS = /* groq */ `
  _id,
  "slug": slug.current,
  title, category, excerpt, coverImage, author, publishedAt, body, seo
`;

const CASE_STUDY_FIELDS = /* groq */ `
  _id,
  "slug": slug.current,
  type, location, acreage, structure, narrative, image, body, order, seo
`;

const SERVICE_FIELDS = /* groq */ `
  _id,
  "slug": slug.current,
  title, tag, description, body, image, order, seo
`;

export const siteSettingsQuery = defineQuery(
  `*[_type == "siteSettings"][0]`,
);

export const homePageQuery = defineQuery(`*[_type == "homePage"][0]`);

export const parcelsQuery = defineQuery(
  `*[_type == "parcel"] | order(featured desc, acres desc) { ${PARCEL_FIELDS} }`,
);

export const featuredParcelsQuery = defineQuery(
  `*[_type == "parcel" && featured == true] | order(acres desc)[0...6] { ${PARCEL_FIELDS} }`,
);

export const parcelBySlugQuery = defineQuery(
  `*[_type == "parcel" && slug.current == $slug][0] { ${PARCEL_FIELDS} }`,
);

export const parcelSlugsQuery = defineQuery(
  `*[_type == "parcel" && defined(slug.current)].slug.current`,
);

export const postsQuery = defineQuery(
  `*[_type == "post"] | order(publishedAt desc) { ${POST_FIELDS} }`,
);

export const postBySlugQuery = defineQuery(
  `*[_type == "post" && slug.current == $slug][0] { ${POST_FIELDS} }`,
);

export const postSlugsQuery = defineQuery(
  `*[_type == "post" && defined(slug.current)].slug.current`,
);

export const caseStudiesQuery = defineQuery(
  `*[_type == "caseStudy"] | order(order asc) { ${CASE_STUDY_FIELDS} }`,
);

export const caseStudyBySlugQuery = defineQuery(
  `*[_type == "caseStudy" && slug.current == $slug][0] { ${CASE_STUDY_FIELDS} }`,
);

export const caseStudySlugsQuery = defineQuery(
  `*[_type == "caseStudy" && defined(slug.current)].slug.current`,
);

export const servicesQuery = defineQuery(
  `*[_type == "service"] | order(order asc) { ${SERVICE_FIELDS} }`,
);

export const serviceBySlugQuery = defineQuery(
  `*[_type == "service" && slug.current == $slug][0] { ${SERVICE_FIELDS} }`,
);

export const serviceSlugsQuery = defineQuery(
  `*[_type == "service" && defined(slug.current)].slug.current`,
);

export const clientLogosQuery = defineQuery(
  `*[_type == "clientLogo"] | order(order asc) { _id, name, logo, order }`,
);

export const pageContentQuery = defineQuery(
  `*[_type == "pageContent" && _id == $id][0] { eyebrow, heading, intro, image, seo }`,
);

export const latestBrochureQuery = defineQuery(
  `*[_type == "brochure"] | order(issueMonth desc)[0] {
    _id, issueMonth, coverSummary, "fileUrl": file.asset->url
  }`,
);
