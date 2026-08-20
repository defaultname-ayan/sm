# Sudha Square — Land Advisory Website

**Date:** 2026-08-20
**Status:** Approved, in implementation

## 1. What this is

A marketing and portfolio website for **Sudha Square**, a land advisory
agency operating across Hyderabad's growth corridors in Telangana. The
agency sources, verifies, aggregates and brokers land parcels for
developers, NRIs and institutional investors.

It is **not** a plotted-venture sales site. The unit of inventory is a
*parcel* (acres), not a *plot* (square yards).

The site must let a single non-technical operator publish blog posts,
add and retire land parcels, and change page copy without a developer.

## 2. Business context (supplied by the client)

**Positioning:** Land Acquisition | Development | Investment

**Services (7):** Agricultural Land · Villa Project Land · Township Land ·
Commercial & Industrial Land · Joint Development (JDA) · Land Aggregation ·
Investor Representation

**Target clients:** Godrej Properties, Prestige Group, Aparna Constructions,
My Home Group, Rajapushpa Properties, Ashoka Builders, local Hyderabad
developers, NRIs and institutional investors.

**Marketing strategy the site must serve:**
- Parcels are cross-listed on 99acres and MagicBricks → each parcel needs
  outbound listing links.
- The website is the land-bank showcase → the land bank is the centrepiece.
- A WhatsApp Business catalogue is maintained → persistent WhatsApp CTA.
- LinkedIn outreach to land acquisition managers → LinkedIn presence and
  share-ready OG images.
- A monthly "Land Opportunities" PDF brochure → downloadable, email-gated.

## 3. Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Framework | Next.js 16.3.1, App Router | Already scaffolded |
| CMS | **Sanity** (Studio embedded at `/studio`) | No database to run or back up; free at this scale; hosting is undecided, and Sanity is the only option that survives a static export onto shared hosting |
| Styling | Tailwind v4 | Already present |
| Motion | `motion` v13 + `lenis` | Declarative, React-native, reduced-motion aware |
| Forms | Server Action → email via Resend | Sanity is not built to receive public writes; email reaches the client faster than an admin panel they must remember to check |
| Hosting | Undecided — build portable | Keep `output` mode and env-dependent code swappable |

### Why not Payload

Payload was the initial recommendation (self-hosted, owns its data) and was
rejected. It requires a running Node server plus a Postgres instance. Since
the client's Hostinger plan may be shared web hosting, Payload would rule
out a deployment target before we know whether we need it. Sanity keeps
static export, Vercel, and VPS all viable.

## 4. Content model (Sanity schemas)

**Documents**

- **parcel** — the land bank. `title`, `slug`, `location`, `district`,
  `zone`, `acreage`, `zoning`, `dealType` (Outright Sale | JDA), `status`
  (Available | Under Negotiation | Mandated), `titleStatus`, `surveyNumbers`,
  `proximity`, `priceOnRequest` / `price`, `coordinates`, `gallery`,
  `body`, `listingLinks` (99acres, MagicBricks), `featured`, `seo`.
- **post** — Insights blog. `title`, `slug`, `category`, `excerpt`,
  `coverImage`, `body` (Portable Text), `author`, `publishedAt`, `seo`.
  Read time derived from body length, not hand-entered.
- **caseStudy** — closed deals. `type`, `location`, `acreage`, `structure`,
  `narrative`, `image`.
- **service** — the 7 services. `number`, `title`, `description`, `tag`,
  `slug`, `body`.
- **client** — trusted-by strip. `name`, `logo`, `order`.
- **brochure** — monthly Land Opportunities PDF. `issueMonth`, `file`,
  `coverSummary`.

**Singletons**

- **siteSettings** — phone, email, office address, RERA number, WhatsApp
  number, social links, default SEO.
- **homePage** — hero copy and image, the 4 headline stats, the 6-point
  verification framework, the infrastructure vectors, the 4 process steps.

Nothing rendered on the homepage is hardcoded in the components.

## 5. Routes

```
/                     home
/land-bank            filterable parcel index (zone, status, deal type)
/land-bank/[slug]     parcel detail
/services             service index
/services/[slug]      service detail
/insights             blog index
/insights/[slug]      blog post
/case-studies/[slug]  case study detail
/about
/contact
/studio               Sanity Studio (CMS)
```

## 6. Design language

Carried over from the client's reference implementation, then tightened.

**Palette** — navy `#0B132B` (ground), ivory `#F7F5F2` (paper), gold
`#D4AF37` (accent only, never a large fill), forest `#1E3A2F` (support).

**Type** — Lora (display, serif), Outfit (body), Space Mono (labels and
data). Labels are uppercase, letter-spaced, and small; they carry the
"land record" texture that makes the site feel like a professional
instrument rather than a template.

**Corrections to the reference:** replace ad-hoc `clamp()` values with one
typographic scale; snap all spacing to a 4px grid; normalise border radii
(the reference mixes `rounded-full`, `rounded-3xl`, `rounded-2xl` and a
malformed `rounded-2xl.5` on the same page); and remove invalid Tailwind
opacity suffixes (`/08`, `/06`, `/12` are not valid Tailwind steps and
silently render as fully opaque).

**Motion** — restrained. Lenis smooth scroll; staggered fade-and-rise on
section entry; a slow ken-burns hero; stats that count up once on first
view; a header that morphs on scroll; cards with subtle hover physics.
No parallax spectacle, no bounce easing, no scroll-jacking. Every motion
respects `prefers-reduced-motion`.

## 7. Next.js 16 constraints

- `params` and `searchParams` are Promises — always `await` them.
- Use generated `PageProps<'/route'>` / `LayoutProps<'/'>` type helpers.
- Turbopack is the default for both `dev` and `build`.
- `images.remotePatterns` must allow `cdn.sanity.io`; `images.domains` is
  deprecated.
- Next no longer overrides `scroll-behavior` on navigation. Since Lenis
  owns scrolling, CSS `scroll-behavior: smooth` must NOT be set, or the
  two will fight.

## 8. Design revision (taste-skill pass)

After the first build, the `taste-skill` rule set was applied as a redesign
audit. Six mechanical failures were found and fixed:

- **Em-dashes.** 76 occurrences removed; prose restructured with periods,
  commas and colons rather than swapped for hyphens. En-dashes in ranges
  became plain hyphens.
- **Eyebrow inflation.** 23 uppercase micro-labels across a 12-section
  homepage, against a budget of one per three sections. Reduced to four
  (hero, Land Bank, Case Studies, Insights); `SectionHeading` now treats the
  eyebrow as optional.
- **Layout repetition.** Four sections shared a three-column card grid. Case
  Studies became an asymmetric feature-plus-stack, and the homepage Insights
  section became a hairline-separated editorial index.
- **Hero overload.** The metrics strip moved out of the hero into its own
  band, bringing the hero to four text elements with the calls to action
  above the fold. `min-h-screen` became `min-h-[100dvh]`, top padding capped.
- **Scroll listeners.** Two `window.addEventListener("scroll")` handlers
  replaced with Motion's `useScroll`.
- **Duplicate CTA intent.** One label per intent: "Enquire" for contact,
  "View the land bank" for browsing, "Message on WhatsApp" for that channel.

A fixed film-grain overlay was added for surface texture.

**Deliberate deviations from the rule set:**

- *Page Theme Lock* (one theme, no section inversion) was not applied. The
  alternating ivory and navy bands are the brand's core expression, carried
  over from the client's reference design and approved above. Flattening the
  page to a single surface would lose it.
- *No pills overlaid on images* was not applied to parcel cards. Status on
  the photograph is the established convention in property listings and
  conveys real availability state, which is the rule's own carve-out. It was
  applied to case study cards, where the label was only a category.
- *Logo walls must use real SVG logos* was not applied. The named clients are
  third-party trademarks we cannot ship, and fabricating them would be worse
  than a text wordmark.

## 9. Out of scope

User accounts, saved searches, online payments, multi-language, a plot-level
inventory system, and any 99acres/MagicBricks API integration (outbound
links only).
