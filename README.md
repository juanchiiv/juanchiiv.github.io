# juanchiiv.github.io

Portfolio for Juan Diego Vidal Peirano — Full Stack Developer, backend-oriented.

Concept: **from idea to system**. The site is organised the way the work is —
interface, application, business rules, data — and the navigation, the hero
visualisation and the per-project diagrams all restate that same stack.

## Stack

React 18 · TypeScript · Vite. No animation library, no UI kit, no template.
Roughly 198 kB of JavaScript and 25 kB of CSS, one request for fonts.

```bash
npm install
npm run dev      # local
npm run build    # tsc --noEmit && vite build
npm run og      # regenerate the social preview card (needs: npm i --no-save sharp)
```

## Where the content comes from

Every claim on the page is traceable to source material rather than written to
sound impressive:

| Case study | Source |
| --- | --- |
| Arenas Verdes | PPS report (UNICEN, March 2026), `campamento_municipaldb` schema dumps |
| Fixture 2026 | `conejoRojo/Fixture2026` — git history, migrations, `app/Services` |
| Scooter Sharing | `microservicios.yaml` (OpenAPI 3.0), service-decomposition notes, Postman collection |
| Rift Legacy | `juanchiiv/rift-legacy` — engine, `scripts/`, commit history |
| Business Management System | CV, professional experience at DIXER |
| Clinical Records + Appointments API | `RedDixer/SimpleHC` — legacy dump, Docker setup, staging screens |
| Castellano Power Team | `castellano-page` — source and hero asset |

No metric on this site is estimated. Commit counts, migration counts and script
counts were read off the repositories; anything that could not be verified was
left out rather than approximated.

## Structure

```
src/
  data/        content as data — projects, toolkit matrix, profile
  components/  one file per section, plus the two visualisations
  hooks/       reveal observer, active section, motion preference, viewport proximity
  styles/      one stylesheet, tokens first
```

Architecture diagrams are generated from the same objects that describe the
systems (`data/projects.ts`), so a diagram cannot drift from the prose beside it.

## Behaviour notes

- The hero canvas pauses when scrolled away or when the tab is hidden, and caps
  device pixel ratio at 2.
- `prefers-reduced-motion` renders the hero as a single static frame and disables
  every transition and reveal.
- Cursor interaction is skipped entirely on coarse pointers; the desktop rail is
  replaced below 1100px by a single section indicator rather than a menu.
- Semantic sectioning, a skip link, labelled navigation and `Person` JSON-LD.

## Deployment

Pushing to `main` builds the site and publishes it to GitHub Pages, via
`.github/workflows/deploy.yml`. The build runs `tsc --noEmit` first, so a type
error fails the deploy instead of shipping a broken page.

Live at **https://juanchiiv.github.io**.

The absolute URLs in `index.html` — `canonical`, `og:url` and `og:image` — are
hardcoded to that host. If the site ever moves to its own domain, those three are
what need updating.

## Social preview

`public/og.png` is the 1200×630 card shown when the link is shared on LinkedIn,
WhatsApp or Slack. It is generated, not drawn by hand:

```bash
npm i --no-save sharp && npm run og
```

`scripts/build-og.mjs` composes it as an SVG using the site's own palette and the
hero diagram, then rasterises it. Edit the script rather than the PNG.

`npm run banner` builds the LinkedIn cover photo the same way — 1584×396, in
`public/linkedin-banner.png`, with `npm run banner en` producing the English
variant. Its layout leaves the bottom-left clear, because the profile picture
sits there, and keeps everything away from the edges, because LinkedIn crops the
sides on narrow screens.

## Replacing the CV

`public/juan-diego-vidal-cv.pdf` — overwrite the file; the path comes from
`src/data/profile.ts`. Anything in that file is public once deployed.

## Languages

The site ships in English and Spanish, switched by the EN/ES control in the top bar.
The choice affects everything a visitor reads — hero, case studies, architecture
diagram labels, the toolkit matrix, the hero canvas tier labels — and persists in
`localStorage`. With no stored choice, the browser's `navigator.language` decides;
`<html lang>` is updated on every switch so screen readers and crawlers follow.

Content is bilingual at the data layer rather than in a separate translation file:

```ts
tagline: {
  en: 'A municipal campground, from paper to platform',
  es: 'Un camping municipal, del papel a la plataforma',
}
```

`LText` is `Record<'en' | 'es', string>` with no fallback, so a missing translation is
a type error at build time instead of an English string leaking into the Spanish page.
Interface chrome lives in `src/i18n/ui.ts`; technology names are left untranslated
because they are proper nouns in both languages.
