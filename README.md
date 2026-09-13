# Blorbmart landing page

The public marketing site for Blorbmart — food delivery, bills, event tickets,
rider and vendor sign-ups, and the team. React 19 + Vite + Tailwind v4 +
Framer Motion. It is a single static page; it talks to no backend.

```bash
npm install
npm run dev      # http://localhost:5176
npm run build    # type-checks, then writes dist/
```

## Editing content

Almost everything that is a fact rather than design lives in `src/content.ts`:

- **Links** — web app, Play Store listings, rider app, vendor web, WhatsApp, email.
- **Team** — names, roles, and each person's own social links. A network left
  empty links to Blorbmart's account instead (and says so to screen readers).
- **Campuses** — mirrors `Blorbmart-backend/services/universities.js`.
- **Legal** — `terms` and `privacy` are empty until real pages exist; the footer
  only shows those links once they are filled in.

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
served at `https://www.blorbmart.shop/`.

Food photography is from Unsplash (free under the Unsplash License).
