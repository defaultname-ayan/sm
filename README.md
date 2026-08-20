# Sudha Square

Website for **Sudha Square**, a land advisory practice operating across
Hyderabad's growth corridors. Land acquisition, development and investment
for developers, NRIs and institutional investors.

Built with Next.js 16 (App Router), React 19, Tailwind v4, Sanity CMS,
Motion and Lenis.

---

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
```

The site runs with **no configuration at all**. Until Sanity is connected it
serves built-in starter content, so every page renders correctly out of the
box. The CMS replaces that content once you connect it.

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |
| `npm run seed` | Push starter content into Sanity (see below) |

---

## Connecting the CMS

Content is managed in Sanity. The Studio is built into this app at
**`/studio`** - there is no separate deploy. The free tier covers this site
comfortably.

1. Sign in at [sanity.io/manage](https://sanity.io/manage) (Google sign-in is
   fine) and create a project. Keep the default dataset name, `production`.
2. Copy the **project ID** from the project dashboard. It is a short
   alphanumeric string, something like `7fk2p9xa`.
3. Create `.env.local` (copy `.env.example`) and set:

   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   ```

4. Create an API token at **Manage > API > Tokens** with **Editor**
   permissions, and add it as `SANITY_API_WRITE_TOKEN`.
5. Restart the dev server, then load the starter content:

   ```bash
   npm run seed
   ```

   This uploads the images and writes every document. It is safe to re-run
   (documents have fixed ids and are replaced, not duplicated), but that also
   means it overwrites edits made in the Studio to those same documents. Do
   not run it casually once the client has started working.

6. Open `/studio` and edit.

Visiting `/studio` before step 3 shows a setup screen rather than an error.

### What the client can edit

| Section in the Studio | Controls |
| --- | --- |
| **Site Settings** | Phone, email, address, RERA number, WhatsApp number, social links, **the top menu**, and **the footer columns and paragraph** |
| **Home Page** | Hero copy and image, the four headline figures, the verification checklist, infrastructure drivers, process steps, and **the heading above every homepage section** (under "Section Headings") |
| **Pages** | The label, heading, intro and SEO for Land Bank, Services, Insights, Case Studies, About and Contact |
| **Land Bank** | Every parcel: extent, district, zone, zoning, deal type, status, title status, survey numbers, photos, map location, 99acres and MagicBricks links |
| **Insights** | Blog posts with rich text, cover image, category and SEO |
| **Case Studies** | Closed mandates |
| **Services** | The seven advisory services |
| **Clients** | The "Trusted by" strip |
| **Land Opportunities Briefs** | The monthly PDF |

**No copy on the site is trapped in the code.** Menus, footer links, every
section heading, every page header and all listing content are edited in the
Studio. The only strings left in the source are form field labels, button
text and the 404 page.

Read time on articles is derived from the article body, so it can never drift
out of sync with an edited post.

Menu and footer links are validated: they must start with `/` for a page on
this site or `https://` for another, which stops dead links being saved.

---

## Enquiry email

The contact form and the brief request are delivered by email through
[Resend](https://resend.com) (free tier). Set:

```
RESEND_API_KEY=...
ENQUIRY_TO_EMAIL=desk@sudhasquare.in
ENQUIRY_FROM_EMAIL="Sudha Square <noreply@your-verified-domain.com>"
```

`ENQUIRY_FROM_EMAIL` must use a domain verified in Resend.

Without these, submissions are logged to the server console and the form
succeeds **in development only**. In production an unconfigured form fails
visibly and tells the visitor to call or use WhatsApp, rather than silently
swallowing an enquiry.

---

## Deploying

Nothing in the app is host-specific.

**Vercel (recommended).** Push to GitHub, import the repo, add the
environment variables above. Point the domain's DNS at Vercel; if the domain
is registered with Hostinger it can keep serving email there.

**A VPS.** `npm run build && npm start` behind a reverse proxy. Node 20.9+.

Note that Hostinger's *shared* web hosting cannot run this app: it needs a
Node server. Hostinger **VPS** plans can. If the plan turns out to be shared
hosting, use it for the domain and mailboxes and deploy the app to Vercel.

---

## Layout of the code

```
app/
  (site)/            public site: home, land-bank, services, insights,
                     case-studies, about, contact
  studio/            Sanity Studio, mounted at /studio
  actions.ts         server actions for the enquiry and brief forms
components/
  motion/            ScrollReveal, TextReveal, AnimatedNumber, Marquee,
                     SmoothScroll
  sections/          page sections
  site/              header, footer, page header, WhatsApp button
  ui/                buttons, labels, cards, rich text
lib/
  data.ts            every read goes through here (Sanity, else seed content)
  queries.ts         GROQ
  seed-data.ts       starter content, also the payload for `npm run seed`
sanity/
  schemas/           the content model
docs/superpowers/specs/   the approved design spec
```

### Two conventions worth knowing

**All reads go through `lib/data.ts`.** That is the only place that knows
whether Sanity is configured. Pages never touch the Sanity client directly.

**Lenis owns scrolling.** Do not add `scroll-behavior: smooth` in CSS; the
two fight each other. Anchor links are routed through Lenis in
`components/motion/SmoothScroll.tsx`. Smooth scrolling is disabled entirely
under `prefers-reduced-motion`.

---

## Design notes

Three surfaces and one accent: ivory `#F7F5F2` is paper, navy `#0B132B` is
the ground, and stone `#211D18` is a warm dark that sits at roughly navy's
value on the other side of neutral. Sections alternate by temperature rather
than by two shades of one hue, which is what keeps the interior pages from
reading as a stack of blue slabs. Gold `#C9A227` is an accent only: it marks,
it never fills.

Parcel status is encoded by **contrast, not hue**. The parcel you can buy is
a solid ivory chip, one under negotiation is solid gold, and a mandated
parcel recedes to an outline. That survives being placed over any photograph
and stays readable for a colour-blind viewer, which a green/amber/grey
traffic-light does not.

Shape scale, applied everywhere: chips 4px, cards 12px, panels 20px, and
anything interactive is a full pill.

Two typefaces: **Newsreader** for display and article text, **Manrope** for
body copy and the small uppercase labels. Labels are separated by case,
tracking and weight rather than by a third family. Tokens live in
`app/globals.css`.

Motion is deliberately quiet: one entrance animation used everywhere, a slow
hero pan, figures that count once, a header that morphs on scroll. Everything
respects `prefers-reduced-motion`.
