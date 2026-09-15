# Blorbmart landing page

The public marketing site for Blorbmart — food delivery, bills, event tickets,
rider and vendor sign-ups, and the team. React 19 + Vite + Tailwind v4 +
Framer Motion. It is a static site — the landing page plus three legal pages —
and talks to no backend.

```bash
npm install
npm run dev      # http://localhost:5176
npm run build    # type-checks, builds, then pre-renders every page into dist/
npm run indexnow # after a deploy: asks Bing & co. to recrawl all four sites
```

## SEO

- **Pre-rendering.** `npm run build` also builds `src/entry-server.tsx` for
  Node and runs `scripts/prerender.mjs`, which writes each page's markup into
  its `#root`. Crawlers and link previews that run no JavaScript (Bing, AI
  crawlers, WhatsApp) read the whole page; the browser hydrates it.
  Anything a component reads from `window` or `document` must stay inside an
  effect or an event handler, or the build fails.
- **Structured data.** `index.html` holds the company graph (Organization,
  WebSite, the apps). Its `@id`s (`https://www.blorbmart.com.ng/#organization`)
  are referenced by the shop, rider and vendor apps, so keep them stable. The
  FAQ section renders its own `FAQPage`.
- **Crawl files.** `public/robots.txt`, `public/sitemap.xml` (bump `lastmod`
  when a page changes) and `public/llms.txt`, a plain summary for AI search.
- **IndexNow.** `public/4c1f8e2b9a7d4e3f8b6a5c2d1e0f9a7b.txt` is the key file;
  the shop, rider and vendor apps serve the same one.

## Editing content

Almost everything that is a fact rather than design lives in `src/content.ts`:

- **Links** — web app, Play Store listings, rider app, vendor web, WhatsApp, email.
- **Team** — names, roles, and each person's own social links. A network left
  empty links to Blorbmart's account instead (and says so to screen readers).
- **Campuses** — mirrors `Blorbmart-backend/services/universities.js`.
- **Legal** — `LEGAL` holds the company name, registration number and address
  (printed only once filled in), the "last updated" date, and the deletion and
  record-keeping periods the legal pages quote.

## Legal pages

`/terms`, `/privacy` and `/delete-account` are separate HTML files
(`terms.html`, `privacy.html`, `delete-account.html`) that share one React
entry, `src/legal/main.tsx`. Vercel serves them without the `.html` because of
`cleanUrls` in `vercel.json` — keep that file if you move the project. The
wording lives in `src/legal/terms.tsx`, `privacy.tsx` and `deleteAccount.tsx`.

The text is a draft written from what the apps actually do — which data each
one collects, and which providers receive it. Have a lawyer review it before
relying on it, and update the privacy policy whenever an app starts
collecting something new or changes provider. `/delete-account` is the URL to
give Google Play as the "Delete account URL".

## Drop-in images

No code change needed — add a file with the right name and rebuild:

- `src/assets/screens/` — real app screenshots replace the coded phone mockups
  (`home`, `food`, `bills`, `rider`, `vendor`). See the README in that folder.
- `src/assets/team/` — a photo named after a member's slug replaces the monogram
  on their badge (e.g. `badmus-qudus.jpg`).

## Newsletter

The Blorbmart backend has no newsletter endpoint yet. Set
`VITE_NEWSLETTER_ENDPOINT` (any URL that accepts `POST { email, source }` as
JSON — a Mailchimp/Brevo/Formspree form endpoint works) at build time and the
form posts there. Without it, the form opens a pre-filled email to support so
no sign-up is silently lost.

## Deploying

Import the repo into Vercel as a Vite project (build `npm run build`, output
`dist`). The share card (`public/og.png`) and canonical URL assume the site is
served at `https://www.blorbmart.com.ng/` — Blorbmart's only domain. The bare
`blorbmart.com.ng` redirects there.

Food photography is from Unsplash (free under the Unsplash License).
