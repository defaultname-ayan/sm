/**
 * Seed content.
 *
 * Serves two purposes: it renders the whole site before Sanity is connected,
 * and it is the payload `npm run seed` pushes into a fresh Sanity dataset.
 * Once Sanity has content, live data replaces every value here.
 */

import { bullet, heading, para } from "./portable-text-helpers";
import type {
  Brochure,
  CaseStudy,
  ClientLogo,
  HomePage,
  PageContent,
  Parcel,
  Post,
  Service,
  SiteSettings,
} from "./types";

const IMG = {
  corridor:
    "https://images.unsplash.com/photo-1741526997954-a27031862fb7?w=2000&h=1200&fit=crop&auto=format",
  fields:
    "https://images.unsplash.com/photo-1508175688576-0c076b47b5b5?w=1200&h=900&fit=crop&auto=format",
  highway:
    "https://images.unsplash.com/photo-1488354028423-039ac1e23357?w=1200&h=900&fit=crop&auto=format",
  meadow:
    "https://images.unsplash.com/photo-1475082622110-f0e90ff503ff?w=1200&h=900&fit=crop&auto=format",
  aerial:
    "https://images.unsplash.com/photo-1741526997969-f1fe50a89e15?w=1200&h=900&fit=crop&auto=format",
  ridge:
    "https://images.unsplash.com/photo-1718696070453-8ec7a926a277?w=1200&h=900&fit=crop&auto=format",
};

export const siteSettings: SiteSettings = {
  companyName: "Sudha Square",
  tagline: "Land Advisory",
  descriptor: "Land acquisition, development and investment",
  reraNumber: "TG/AGT/000000",
  phone: "+91 90000 00000",
  email: "desk@sudhasquare.in",
  whatsappNumber: "919000000000",
  addressLines: ["Banjara Hills", "Hyderabad 500034", "Telangana, India"],
  linkedin: "https://www.linkedin.com/company/sudhasquare",
  navigation: [
    { label: "Land Bank", href: "/land-bank" },
    { label: "Services", href: "/services" },
    { label: "Insights", href: "/insights" },
    { label: "About", href: "/about" },
  ],
  footerBlurb:
    "Land acquisition, development and investment advisory across Hyderabad's growth corridors.",
  footerColumns: [
    {
      title: "Advisory",
      links: [
        { label: "Land Bank", href: "/land-bank" },
        { label: "Services", href: "/services" },
        { label: "Case Studies", href: "/case-studies" },
        { label: "About", href: "/about" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Insights", href: "/insights" },
        { label: "Land Opportunities", href: "/#brief" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ],
};

export const homePage: HomePage = {
  heroEyebrow: "Hyderabad · Telangana",
  heroHeading: "Land, held to the standard of clear title.",
  heroSubheading:
    "We source, verify and aggregate land for developers and investors across Hyderabad's growth corridors.",
  heroImage: IMG.corridor,
  stats: [
    { value: "1,240+", label: "Acres transacted & advised" },
    { value: "₹560 Cr", label: "Aggregate deal value" },
    { value: "18", label: "Live mandates" },
    { value: "6", label: "Districts covered" },
  ],
  positioningHeading: "Most land deals fail on paper, not on price.",
  positioningBody: [
    "Title irregularities, prohibited-land entries, pahani mismatches and GPA chains that don't hold. These are the risks that destroy deals after negotiation is complete.",
    "We apply a systematic six-point verification framework to every parcel before it is presented to a buyer. Land we list is land we have examined.",
  ],
  verifications: [
    { label: "Revenue record & pahani verification", detail: "Dharani / Bhu Bharati" },
    { label: "Encumbrance certificate search", detail: "13-year period" },
    { label: "Section 22-A prohibited check", detail: "Mandatory clearance" },
    { label: "Physical boundary & extent survey", detail: "On-site verification" },
    { label: "Master plan & land-use confirmation", detail: "HMDA / DTCP" },
    { label: "Written mandate from owner", detail: "Before listing" },
  ],
  infrastructureHeading:
    "Land is only valuable when you understand what is coming next.",
  infrastructureIntro:
    "Every parcel we source is evaluated against six infrastructure vectors that determine five-year appreciation potential, not just current market rates.",
  infrastructureImage: IMG.aerial,
  infrastructureVectors: [
    {
      label: "ORR Expansion",
      description:
        "Outer Ring Road integration zones driving residential demand within 5 km.",
    },
    {
      label: "Regional Ring Road",
      description:
        "New 340 km corridor unlocking Sangareddy, Vikarabad and Nalgonda.",
    },
    {
      label: "Airport Connectivity",
      description: "RGIA second runway and the new elevated access road from ORR.",
    },
    {
      label: "Industrial Corridors",
      description: "Hyderabad-Pune and Hyderabad-Bangalore NIMZ designations.",
    },
    {
      label: "Metro & Transit Growth",
      description: "Metro Phase II extensions to Shamshabad and HITEC City North.",
    },
    {
      label: "Employment Nodes",
      description: "Genome Valley, Fab City and IDA Jeedimetla expansions.",
    },
  ],
  trustedByLabel: "Trusted by",
  servicesHeading: "Structured for every stage of acquisition.",
  landBankEyebrow: "Land Bank",
  landBankHeading: "Currently mandated.",
  corridorsHeading: "Hyderabad's emerging land belts.",
  caseStudiesEyebrow: "Case Studies",
  caseStudiesHeading: "Deals structured. Capital deployed.",
  briefHeading: "The intelligence layer behind our mandates.",
  briefIntro:
    "A monthly dispatch of newly mandated land, closed transactions, corridor pricing and market observations, written for buyers, not search engines.",
  insightsEyebrow: "Insights",
  insightsHeading: "Written for buyers, not search engines.",
  contactHeading: "Tell us the requirement. We'll tell you honestly if it exists.",
  contactIntro:
    "Extent, budget, preferred corridor and intended use. That's enough for a first conversation.",
  processHeading: "Four stages. No surprises.",
  processSteps: [
    {
      title: "Brief & Mandate",
      description:
        "Requirement, budget, target micro-market and timeline. We confirm viability before accepting a mandate.",
    },
    {
      title: "Sourcing & Shortlist",
      description:
        "Off-market sourcing and curated parcel selection. We present a shortlist with title observations before any site visit.",
    },
    {
      title: "Due Diligence",
      description:
        "Revenue records, EC, Section 22-A, physical boundary survey and master-plan confirmation. Written report issued.",
    },
    {
      title: "Structure & Close",
      description:
        "Outright purchase, JDA or phased aggregation. SPA review and registration coordination.",
    },
  ],
};

/** Header copy for the six standard pages, keyed by their fixed document id. */
export const pages: Record<string, PageContent> = {
  "page-landBank": {
    image: IMG.corridor,
    eyebrow: "Land Bank",
    heading: "Currently mandated parcels.",
    intro:
      "Every parcel listed here has been through our six-point verification framework. Where something is unresolved, we say so on the parcel itself.",
  },
  "page-services": {
    image: IMG.fields,
    eyebrow: "Advisory Services",
    heading: "Structured for every stage of acquisition.",
    intro:
      "From a single agricultural parcel to a five-hundred-acre township assembly. The work changes, the standard of verification does not.",
  },
  "page-insights": {
    image: IMG.meadow,
    eyebrow: "Insights",
    heading: "Written for buyers, not search engines.",
    intro:
      "What we have learned examining land in Telangana: the failure modes, the regulations that catch people out, and what the corridors are actually doing.",
  },
  "page-caseStudies": {
    image: IMG.highway,
    eyebrow: "Case Studies",
    heading: "Deals structured. Capital deployed.",
    intro:
      "A selection of mandates we have closed, including the problems found during diligence. Those are the part worth reading.",
  },
  "page-about": {
    image: IMG.aerial,
    eyebrow: "About",
    heading: "We are paid by the buyer, so we can afford to be honest.",
    intro:
      "Sudha Square is a land advisory practice working across Hyderabad's growth corridors. We represent buyers: developers, NRIs and institutional investors. That means our incentive is to talk you out of a bad parcel rather than into one.",
  },
  "page-contact": {
    image: IMG.ridge,
    eyebrow: "Contact",
    heading: "Brief us on a requirement.",
    intro:
      "Extent, budget, preferred corridor and intended use. That's enough for a first conversation, and we reply within one working day.",
  },
};

export const services: Service[] = [
  {
    _id: "service-agricultural",
    slug: "agricultural-land",
    order: 1,
    title: "Agricultural Land",
    tag: "Land Acquisition",
    description:
      "Patta-titled agricultural parcels across Rangareddy, Sangareddy, Vikarabad and Nalgonda districts. Full pahani and Dharani verification before listing.",
    image: IMG.fields,
    body: [
      para(
        "Agricultural land is the widest and least transparent segment of the Telangana market. Ownership is fragmented, records are inconsistent between the physical pahani and the Dharani portal, and a large share of parcels carry entries that only surface once a buyer has already committed to a price.",
      ),
      heading("What we verify before listing"),
      bullet("Pahani and Dharani record agreement across the last thirteen years."),
      bullet("Encumbrance certificate covering the full statutory search period."),
      bullet("Section 22-A prohibited property register status."),
      bullet("Physical extent against recorded extent, surveyed on site."),
      para(
        "Where a discrepancy exists, we say so in writing before the parcel is shown. We would rather lose a listing than present a parcel we cannot stand behind.",
      ),
    ],
  },
  {
    _id: "service-villa",
    slug: "villa-project-land",
    order: 2,
    title: "Villa Project Land",
    tag: "Residential Development",
    description:
      "Residential villa development sites with HMDA or DTCP layout approval potential. 3-50 acre parcels within ORR influence zones.",
    image: IMG.meadow,
    body: [
      para(
        "Villa development demands a narrower parcel profile than most buyers expect: contiguous extent, road access wide enough for layout approval, and a land-use designation that will survive the approval process rather than requiring conversion mid-project.",
      ),
      para(
        "We shortlist against approval feasibility first and price second, because a cheap parcel that cannot be approved is not cheap.",
      ),
    ],
  },
  {
    _id: "service-township",
    slug: "township-land",
    order: 3,
    title: "Township Land",
    tag: "Large Scale",
    description:
      "Large-scale contiguous assemblies of 100-500+ acres for integrated township development, negotiated in structured phases.",
    image: IMG.corridor,
    body: [
      para(
        "Township-scale assembly is rarely a single transaction. It is a sequence of negotiations across many owners, each of whom becomes aware of the assembly as it progresses, which is precisely what drives prices up mid-process.",
      ),
      para(
        "We structure these in phases with staggered commitments, so that pricing is secured before the assembly becomes visible to the remaining owners.",
      ),
    ],
  },
  {
    _id: "service-commercial",
    slug: "commercial-industrial-land",
    order: 4,
    title: "Commercial & Industrial Land",
    tag: "Commercial",
    description:
      "Industrial corridor adjacencies along the Hyderabad-Bangalore and Hyderabad-Pune national highway routes. Suitable for logistics parks, data centres and manufacturing.",
    image: IMG.highway,
    body: [
      para(
        "Industrial buyers evaluate land on constraints most residential buyers never consider: power availability and sanctioned load, effluent and discharge permissions, highway frontage and turning radius, and distance to the nearest freight node.",
      ),
      para(
        "We assess these alongside title, because an industrially unusable parcel with perfect title is still unusable.",
      ),
    ],
  },
  {
    _id: "service-jda",
    slug: "joint-development",
    order: 5,
    title: "Joint Development (JDA)",
    tag: "JDA",
    description:
      "Land assemblies structured for joint development with fixed revenue share or area allotment. Owner-developer agreements drafted and mandated.",
    image: IMG.meadow,
    body: [
      para(
        "A joint development agreement aligns a landowner who cannot fund development with a developer who would rather not lock up capital in land. It works when the split, the milestones and the exit conditions are written precisely, and fails expensively when they are not.",
      ),
      para(
        "We structure both sides: revenue share or area allotment, performance milestones tied to approvals rather than dates alone, and defined remedies if the project stalls.",
      ),
    ],
  },
  {
    _id: "service-aggregation",
    slug: "land-aggregation",
    order: 6,
    title: "Land Aggregation",
    tag: "Aggregation",
    description:
      "Multi-owner parcel consolidation across adjacent survey numbers. We manage owner relationships, document harmonisation and pricing normalisation.",
    image: IMG.aerial,
    body: [
      para(
        "Adjacent survey numbers rarely share a common documentation standard. One owner holds a registered sale deed, the next a decades-old partition record, the third an unresolved succession. Aggregation is mostly the work of bringing these to a common standard before anything can be transacted.",
      ),
      para(
        "We hold the owner relationships through that process, which is typically measured in months rather than weeks.",
      ),
    ],
  },
  {
    _id: "service-investor",
    slug: "investor-representation",
    order: 7,
    title: "Investor Representation",
    tag: "Advisory",
    description:
      "End-to-end acquisition management for NRI and institutional investors, from market intelligence and shortlisting to title verification and close.",
    image: IMG.ridge,
    body: [
      para(
        "Buying land in Telangana from outside India introduces a second layer of complexity on top of the usual title risk: FEMA eligibility, permissible land categories, repatriation of eventual sale proceeds, and the practical question of who signs on your behalf.",
      ),
      para(
        "We act as the buyer's representative through the whole sequence, and we are paid by the buyer, not by the seller, so our incentive is to talk you out of a bad parcel.",
      ),
    ],
  },
];

export const parcels: Parcel[] = [
  {
    _id: "parcel-nandigama",
    slug: "nandigama-rangareddy",
    location: "Nandigama",
    district: "Rangareddy",
    zone: "South Hyderabad",
    acres: 12.18,
    zoning: "Agricultural / Residential Conversion",
    dealType: "Outright Sale",
    status: "Available",
    titleStatus: "Patta, EC clear",
    surveyNumbers: ["114/2", "114/3", "115/1"],
    proximity: "Off NH-44 · 6.2 km from Shadnagar",
    priceOnRequest: true,
    featured: true,
    coverImage: IMG.fields,
    gallery: [IMG.corridor, IMG.aerial],
    coordinates: { lat: 17.0895, lng: 78.2103 },
    body: [
      para(
        "A contiguous 12.18-acre holding off the NH-44 service road, positioned within the Shadnagar residential conversion belt. The parcel sits behind an existing approved layout, which establishes both the conversion precedent and the road access.",
      ),
      para(
        "Records are consistent across pahani and Dharani for the full search period, and the encumbrance certificate is clear. Boundary survey has been completed and matches the recorded extent.",
      ),
    ],
  },
  {
    _id: "parcel-kandi",
    slug: "kandi-junction-sangareddy",
    location: "Kandi Junction",
    district: "Sangareddy",
    zone: "West Hyderabad",
    acres: 28.4,
    zoning: "Industrial / Logistics",
    dealType: "Outright Sale",
    status: "Under Negotiation",
    titleStatus: "Patta, EC verified",
    surveyNumbers: ["302", "303/1"],
    proximity: "NH-65 frontage · 12 km from BHEL Hyderabad",
    priceOnRequest: true,
    featured: true,
    coverImage: IMG.highway,
    gallery: [IMG.corridor],
    coordinates: { lat: 17.6042, lng: 78.0021 },
    body: [
      para(
        "Direct NH-65 frontage with a turning radius suitable for container movement, making this one of the few parcels in the Kandi belt genuinely usable as a logistics park rather than simply adjacent to the highway.",
      ),
    ],
  },
  {
    _id: "parcel-maheshwaram",
    slug: "maheshwaram-rangareddy",
    location: "Maheshwaram",
    district: "Rangareddy",
    zone: "South Hyderabad",
    acres: 6.75,
    zoning: "Villa / Residential",
    dealType: "JDA",
    status: "Mandated",
    titleStatus: "Patta, survey complete",
    proximity: "TSPA Road · 4 km from Pharmaceutical City",
    priceOnRequest: true,
    coverImage: IMG.meadow,
    coordinates: { lat: 17.1926, lng: 78.4471 },
    body: [
      para(
        "Mandated for joint development on a 40/60 revenue share. The parcel adjoins the Pharma City influence corridor, where villa absorption has tracked employment growth closely over the last three years.",
      ),
    ],
  },
  {
    _id: "parcel-shadnagar",
    slug: "shadnagar-north-rangareddy",
    location: "Shadnagar North",
    district: "Rangareddy",
    zone: "South Hyderabad",
    acres: 44,
    zoning: "Residential Township",
    dealType: "Outright Sale",
    status: "Available",
    titleStatus: "Patta, EC clear, 22-A clear",
    surveyNumbers: ["87", "88", "89/1", "89/2"],
    proximity: "ORR Exit 4 · 3 km from Shadnagar town",
    priceOnRequest: true,
    featured: true,
    coverImage: IMG.corridor,
    gallery: [IMG.aerial, IMG.fields],
    coordinates: { lat: 17.0725, lng: 78.2045 },
    body: [
      para(
        "Forty-four contiguous acres cleared against the Section 22-A prohibited register: the check most buyers skip, and the one most likely to void a completed transaction.",
      ),
      para(
        "Extent is sufficient for an integrated township with internal road hierarchy, and the ORR Exit 4 approach puts the parcel within a forty-minute drive of the financial district outside peak hours.",
      ),
    ],
  },
  {
    _id: "parcel-vikarabad",
    slug: "vikarabad",
    location: "Vikarabad",
    district: "Vikarabad",
    zone: "West Hyderabad",
    acres: 18.5,
    zoning: "Agricultural / Resort / Farmland",
    dealType: "Outright Sale",
    status: "Available",
    titleStatus: "Patta, EC clear",
    proximity: "NH-163 frontage · 58 km from Hyderabad",
    priceOnRequest: true,
    coverImage: IMG.ridge,
    coordinates: { lat: 17.3376, lng: 77.9048 },
    body: [
      para(
        "Undulating terrain with mature tree cover on the Vikarabad ridge, suited to farmland plotting or a low-density resort development. The Anantagiri forest belt sits within a short drive.",
      ),
    ],
  },
  {
    _id: "parcel-yadadri",
    slug: "yadadri-bhongir",
    location: "Yadadri",
    district: "Bhongir",
    zone: "East Hyderabad",
    acres: 9.2,
    zoning: "Residential / Pilgrimage Corridor",
    dealType: "JDA",
    status: "Mandated",
    titleStatus: "Patta, survey pending",
    proximity: "State Highway 2 · 2 km from Yadadri Temple",
    priceOnRequest: true,
    coverImage: IMG.ridge,
    coordinates: { lat: 17.5906, lng: 78.9503 },
    body: [
      para(
        "Positioned on the Yadadri pilgrimage corridor, where sustained state investment in temple infrastructure has driven a steady rise in both footfall and residential demand. Boundary survey is pending and will be completed before any transaction proceeds.",
      ),
    ],
  },
];

export const caseStudies: CaseStudy[] = [
  {
    _id: "case-shadnagar",
    slug: "shadnagar-township-assembly",
    order: 1,
    type: "Township Assembly",
    location: "Shadnagar Corridor · Rangareddy",
    acreage: "112 Acres",
    structure: "Phased Aggregation · Outright",
    image: IMG.corridor,
    narrative:
      "Consolidation of 14 survey numbers across three owners for a residential township developer. Title inconsistencies resolved across a 9-month structured process.",
    body: [
      para(
        "The developer had identified the corridor independently but had stalled twice on assembly, both times because pricing moved once owners understood the scale of what was being put together.",
      ),
      heading("What we did"),
      para(
        "We ran the assembly in three phases with staggered commitments, securing pricing on the anchor parcels before approaching the remaining owners. Two of the fourteen survey numbers carried succession disputes that had to be resolved before they could be transacted at all.",
      ),
      heading("Outcome"),
      para(
        "All fourteen survey numbers transacted within the original budget envelope, across nine months.",
      ),
    ],
  },
  {
    _id: "case-maheshwaram",
    slug: "maheshwaram-villa-jda",
    order: 2,
    type: "Villa Development",
    location: "Maheshwaram · Rangareddy",
    acreage: "22 Acres",
    structure: "JDA · 40/60 Revenue Share",
    image: IMG.meadow,
    narrative:
      "Owner-developer JDA for a premium villa project adjacent to the Pharma City influence corridor. Mandate structured with performance milestones.",
    body: [
      para(
        "The landowning family had held the parcel for two generations and were unwilling to sell outright, but equally unable to fund development themselves. That is the standard precondition for a joint development structure.",
      ),
      para(
        "We tied the developer's milestones to approval stages rather than calendar dates, which protected the owner against a stalled project without penalising the developer for approval delays outside their control.",
      ),
    ],
  },
  {
    _id: "case-kandi",
    slug: "kandi-industrial-corridor",
    order: 3,
    type: "Industrial Corridor",
    location: "Kandi · Sangareddy",
    acreage: "34 Acres",
    structure: "Outright Sale · Industrial",
    image: IMG.highway,
    narrative:
      "NH-65 frontage acquisition for a logistics park operator. Pahani discrepancy identified and resolved prior to SPA execution.",
    body: [
      para(
        "During verification we found the recorded extent in the pahani exceeded the surveyed physical extent by just over an acre, a discrepancy that would have surfaced at registration and collapsed the transaction.",
      ),
      para(
        "It was resolved through a corrected revenue entry before the sale agreement was executed, and the price was adjusted to the true extent.",
      ),
    ],
  },
];

export const posts: Post[] = [
  {
    _id: "post-22a",
    slug: "section-22a-the-register-most-buyers-never-check",
    title: "Section 22-A: The Register Most Buyers Never Check",
    category: "Legal",
    excerpt:
      "Why a single government notification can void an otherwise clean transaction, and how to verify it before negotiating price.",
    coverImage: IMG.fields,
    author: "Sudha Square Advisory Desk",
    publishedAt: "2026-07-14T09:00:00.000Z",
    body: [
      para(
        "A buyer can verify the pahani, pull a thirteen-year encumbrance certificate, walk the boundary with a surveyor, and still end up with land that cannot be registered. The reason is usually Section 22-A.",
      ),
      heading("What the register actually is"),
      para(
        "Section 22-A of the Registration Act, as it applies in Telangana, empowers the government to notify categories of land as prohibited from registration. Assigned land, government land, endowment and wakf property, land under acquisition, and land subject to specific court orders can all appear on it.",
      ),
      para(
        "The critical point is that a Section 22-A entry does not appear on the encumbrance certificate. The EC records transactions. The 22-A register records a prohibition. A parcel can therefore show a completely clean EC and still be unregisterable.",
      ),
      heading("How the failure typically unfolds"),
      para(
        "The pattern is consistent. Price is agreed, an advance changes hands, the sale deed is drafted, and the parties arrive at the sub-registrar's office. Registration is refused. The advance is now the subject of a recovery dispute with a seller who may or may not have known.",
      ),
      heading("How to check it"),
      bullet("Search the prohibited property register for the specific survey number, not the village."),
      bullet("Check every survey number in the parcel. Assemblies fail on one bad entry."),
      bullet("Re-check immediately before registration; the register is updated continuously."),
      para(
        "This check costs nothing and takes very little time. It is skipped remarkably often, usually because the EC came back clean and the buyer assumed that settled the question.",
      ),
    ],
  },
  {
    _id: "post-gpa",
    slug: "gpa-sales-after-suraj-lamp",
    title: "GPA Sales After Suraj Lamp: What Actually Transfers",
    category: "Title",
    excerpt:
      "The Supreme Court ruling changed what General Power of Attorney transactions can and cannot convey. Most buyers still don't understand the distinction.",
    coverImage: IMG.meadow,
    author: "Sudha Square Advisory Desk",
    publishedAt: "2026-06-02T09:00:00.000Z",
    body: [
      para(
        "General Power of Attorney sales were, for a long stretch, the default method of transferring land in parts of Telangana and Andhra Pradesh. They avoided stamp duty, they were quick, and everyone involved treated them as equivalent to a sale.",
      ),
      heading("What the Court held"),
      para(
        "In Suraj Lamp & Industries v. State of Haryana, the Supreme Court held that a transaction structured as a GPA, an agreement of sale, and a will does not convey title. Immovable property is transferred by a registered deed of conveyance and by nothing else.",
      ),
      para(
        "A GPA remains perfectly valid as what it actually is: an instrument of agency. It authorises someone to act on the owner's behalf, including to execute a sale deed. What it does not do is make the holder the owner.",
      ),
      heading("Why this still matters in 2026"),
      para(
        "Because a great deal of land in the region changed hands this way before the ruling, and those chains did not retroactively repair themselves. A parcel offered today may sit on a GPA link three or four transactions back.",
      ),
      para(
        "The practical consequence is that the person offering to sell may genuinely believe they own the land while holding nothing that conveys title. This is rarely fraud. It is far more often a seller who inherited a defective chain and never had reason to examine it.",
      ),
      heading("What to ask for"),
      bullet("The registered conveyance deed, not the GPA, at every link in the chain."),
      bullet("Whether the original principal was alive when the GPA was exercised. An unregistered GPA lapses on death."),
      bullet("Mutation records showing the revenue department recognised each transfer."),
    ],
  },
  {
    _id: "post-nri",
    slug: "buying-land-in-telangana-from-abroad",
    title: "Buying Land in Telangana From Abroad",
    category: "NRI",
    excerpt:
      "FEMA compliance, permissible categories, repatriation rules, and the role of a local attorney. A structured guide for non-resident investors.",
    coverImage: IMG.aerial,
    author: "Sudha Square Advisory Desk",
    publishedAt: "2026-05-09T09:00:00.000Z",
    body: [
      para(
        "Non-resident buyers face the same title risks as everyone else, plus a regulatory layer that determines whether the purchase is permissible at all.",
      ),
      heading("What you may and may not buy"),
      para(
        "Under FEMA, a non-resident Indian or person of Indian origin may acquire residential and commercial immovable property in India without prior approval. Agricultural land, plantation property and farmhouses may not be purchased. They can only be acquired by inheritance.",
      ),
      para(
        "This single restriction disqualifies a large share of what is marketed to overseas buyers as an investment opportunity in Telangana, because a great deal of the available land is classified agricultural regardless of what is planned for it.",
      ),
      heading("Paying for it"),
      bullet("Funds must move through normal banking channels, or from an NRE, NRO or FCNR account."),
      bullet("Traveller's cheques and foreign currency notes are not permissible."),
      heading("Getting the money out again"),
      para(
        "Sale proceeds from residential property are repatriable, subject to limits: the amount repatriated cannot exceed the foreign exchange brought in for the purchase, and the concession applies to no more than two residential properties.",
      ),
      heading("Signing from abroad"),
      para(
        "Most non-resident buyers execute a Power of Attorney in favour of someone in India to handle registration. It must be executed before the Indian consulate in your country of residence, or notarised locally and apostilled, and then registered in India. A POA that has not been properly attested will be refused at the sub-registrar's office.",
      ),
    ],
  },
];

export const clientLogos: ClientLogo[] = [
  { _id: "client-godrej", name: "Godrej Properties", order: 1 },
  { _id: "client-prestige", name: "Prestige Group", order: 2 },
  { _id: "client-aparna", name: "Aparna Constructions", order: 3 },
  { _id: "client-myhome", name: "My Home Group", order: 4 },
  { _id: "client-rajapushpa", name: "Rajapushpa Properties", order: 5 },
  { _id: "client-ashoka", name: "Ashoka Builders", order: 6 },
];

export const brochure: Brochure = {
  _id: "brochure-current",
  issueMonth: "2026-08-01",
  coverSummary: [
    "Newly mandated parcels",
    "Corridor pricing observations",
    "Closed transactions",
    "Market intelligence",
  ],
};
