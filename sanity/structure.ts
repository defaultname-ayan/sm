import type { StructureResolver } from "sanity/structure";

/** Documents that should appear as a single editable item, not a list. */
const SINGLETONS = [
  { id: "siteSettings", title: "Site Settings", icon: "⚙" },
  { id: "homePage", title: "Home Page", icon: "⌂" },
];

const SINGLETON_IDS = SINGLETONS.map((s) => s.id);

/**
 * Header copy for the standard pages. Fixed document ids so these behave as
 * one editable item each, rather than a list the client can add to or empty.
 */
const PAGES = [
  { id: "page.landBank", title: "Land Bank" },
  { id: "page.services", title: "Services" },
  { id: "page.insights", title: "Insights" },
  { id: "page.caseStudies", title: "Case Studies" },
  { id: "page.about", title: "About" },
  { id: "page.contact", title: "Contact" },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      ...SINGLETONS.map((singleton) =>
        S.listItem()
          .title(singleton.title)
          .id(singleton.id)
          .child(
            S.document()
              .schemaType(singleton.id)
              .documentId(singleton.id)
              .title(singleton.title),
          ),
      ),
      S.listItem()
        .title("Pages")
        .id("pages")
        .child(
          S.list()
            .title("Pages")
            .items(
              PAGES.map((page) =>
                S.listItem()
                  .title(page.title)
                  .id(page.id)
                  .child(
                    S.document()
                      .schemaType("pageContent")
                      .documentId(page.id)
                      .title(page.title),
                  ),
              ),
            ),
        ),
      S.divider(),
      S.documentTypeListItem("parcel").title("Land Bank"),
      S.documentTypeListItem("post").title("Insights"),
      S.documentTypeListItem("caseStudy").title("Case Studies"),
      S.divider(),
      S.documentTypeListItem("service").title("Services"),
      S.documentTypeListItem("clientLogo").title("Clients"),
      S.documentTypeListItem("brochure").title("Land Opportunities Briefs"),
    ]);

export { SINGLETON_IDS };
