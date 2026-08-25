# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev        # dev server on :3000
npm run build      # production build — the real check; it prerenders every route
npm start          # serve the production build
npm run lint       # eslint (flat config, eslint-config-next)
npm run typecheck  # tsc --noEmit
npm run seed       # push lib/seed-data.ts into the Sanity dataset
```

There is no test framework in this repo. Verification is `npm run typecheck && npm run lint && npm run build` — the build is the meaningful one, because every page is prerendered and a data-layer regression shows up as a missing route or a blank section rather than as a type error.

To check what actually rendered, build then `npx next start -p <port>` and grep the HTML for section headings. A section that silently disappeared is the failure mode this codebase is most prone to (see below).

`npm run seed` needs `SANITY_API_WRITE_TOKEN` in `.env.local` (Editor role, from sanity.io/manage → API → Tokens). It is `createOrReplace` against fixed `_id`s, so it is safe to re-run but **overwrites Studio edits to those same documents**.

## Architecture

Next.js 16 App Router, React 19, Tailwind v4 (CSS-first `@theme`, no config file), Sanity v6 Studio mounted in-app at `/studio`, Motion + Lenis, Resend for email.

### All reads go through `lib/data.ts`

Pages never import the Sanity client. `lib/data.ts` is the only module that knows whether Sanity is configured, and it encodes a three-state rule that is easy to break:

1. **Not configured** (`hasSanity` false, from `sanity/env.ts`) — serve `lib/seed-data.ts`, so the site runs with zero setup.
2. **Configured but unseeded** — the project exists but `npm run seed` has not run. Empty lists fall back to seed content. Without this, connecting a fresh project makes most of the homepage vanish, because ~10 section components `return null` on an empty array.
3. **Configured and seeded** — the dataset is real. Empty now means the client emptied it, and the site shows that honestly.

"Seeded" is probed by `datasetSeededQuery` (does the `siteSettings` singleton exist), memoised with React `cache()`.

A **failed** query falls back to seed content in every state: a Sanity outage should cost freshness, never structure.

Three helpers enforce this — use them rather than calling `query()` directly:

- `list(query, fallback)` — list reads
- `single(query, fallback, params)` — singletons
- `bySlug(query, slug, fallback)` — detail pages

`bySlug` must mirror `list`. While the dataset is unseeded the listing pages render seed cards, so the detail page behind each card has to resolve too, or every link 404s.

### Sections delete themselves when their data is empty

`components/sections/*` mostly early-return `null` when handed an empty array (`CaseStudies`, `Insights`, `TrustStrip`, `LandBankPreview`, `Stats`, `Process`). `CorridorMap` additionally returns `null` when no parcel has a `coordinates` geopoint — a parcel created in the Studio without a map location is invisible there. When a section goes missing from a page, look at the data layer first, not the component.

### Two Sanity rules that will silently break the site

**Never put a `.` in a document `_id`.** Sanity reads a dot as a path separator, and only root-path documents are readable without a token. The public site reads anonymously. An id like `page.about` writes fine, shows up in the Studio, publishes fine — and is invisible to the website forever, so the page silently keeps rendering its seed fallback and the client's edits never appear. The six page-header docs use `page-about`, `page-landBank`, … for exactly this reason. Same applies to any singleton or fixed-id document added later.

**`useCdn` stays `false` in `sanity/client.ts`.** Every read happens during a prerender and `lib/data.ts` already caches through Next (`revalidate: 3600`), so the API CDN adds no caching this site benefits from — but its post-mutation purge is not instant, so a build started shortly after an edit gets served the old value and bakes stale copy into the deploy.

### Content model

`sanity/schemas/` — singletons (`siteSettings`, `homePage`), a `pageContent` type with fixed ids (`page.about`, `page.landBank`, …) for the six standard page headers, and document types `parcel`, `post`, `caseStudy`, `service`, `clientLogo`, `brochure`.

`sanity/structure.ts` shapes the Studio sidebar and defines which types are singletons; `sanity.config.ts` reads `SINGLETON_IDS` from it to strip create/delete/duplicate actions from singletons and `pageContent`. Adding a singleton means touching both files.

**No copy on the site should be trapped in the code.** Menus, footer links, every section heading and every page header are Studio-edited. The only literal strings left in components are form labels, button text and the 404 page. Keep it that way — new copy belongs in a schema field with a seed-data default.

`lib/seed-data.ts` is both the no-CMS fallback *and* the payload for `npm run seed`, so its shape must stay assignable to `lib/types.ts`. Seed images are plain URL strings; Sanity images are objects. `urlForImage()` in `sanity/image.ts` accepts either, so components never branch on it.

### Conventions

- **Lenis owns scrolling.** Never add `scroll-behavior: smooth` in CSS; the two fight. Anchor links route through `components/motion/SmoothScroll.tsx`. Disabled under `prefers-reduced-motion`.
- **Design tokens live in `app/globals.css`** under `@theme` — three surfaces (ivory paper, navy ground, warm stone) and gold as an accent that marks but never fills. Parcel status is encoded by contrast, not hue. Shape scale: chips 4px, cards 12px, panels 20px, interactive elements full pill.
- Remote images are allow-listed in `next.config.ts` (`cdn.sanity.io`, `images.unsplash.com`); `images.domains` is removed in Next 16.
- `@/*` maps to the repo root.

### Enquiry forms

`app/actions.ts` — server actions for the contact form and brief request, delivered via Resend. Unconfigured, they log to the server console and succeed **in development only**; in production they fail visibly and tell the visitor to call, rather than swallowing an enquiry.
