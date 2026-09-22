# LaDespani Guesthouse — ladespani.ro

Marketing site for a family guesthouse in Brașov, Romania. React + TypeScript +
Vite, deployed to **Cloudflare Pages** at `https://www.ladespani.ro`.

## Commands

```bash
npm run dev              # dev server
npm run build            # typecheck, bundle, prerender every route
npm run preview          # serve the built output
npm run lint
npm run convert-images   # regenerate public/images/*.webp from assets-src/images
```

## How the site is structured

### Languages and URLs

Romanian is the default language and lives at the **root**, because roughly 80%
of search demand for this property is Romanian. English lives under `/en`.

| Page       | Romanian       | English           |
| ---------- | -------------- | ----------------- |
| Home       | `/`            | `/en`             |
| Facilities | `/facilitati`  | `/en/facilities`  |
| Rooms      | `/camere`      | `/en/rooms`       |
| Gallery    | `/galerie`     | `/en/gallery`     |
| Contact    | `/contact`     | `/en/contact`     |
| About      | `/despre-noi`  | `/en/about`       |
| Card       | `/card`        | (shared, noindex) |

`src/i18n/config.ts` is the single source of truth for this table. The router,
the sitemap, the `hreflang` tags and the prerenderer are all generated from it,
so adding a page means editing one file.

Copy lives in `src/i18n/content.ts` (both languages) and `src/i18n/legal.ts`
(terms and conditions). Language-independent facts — prices, room inventory,
contact details — live in `src/data/site.ts`.

### Prerendering

`npm run build` renders every route to static HTML, including `<title>`,
meta description, canonical, `hreflang` and JSON-LD. This runs as a **Vite
plugin** (`scripts/vite-plugin-prerender.mjs`), not as an npm `postbuild`
script, because the production host invokes `vite build` directly — a
`postbuild` hook never fires there, and the site previously shipped an empty,
identical shell for every URL.

The plugin also writes `dist/sitemap.xml` and a real `dist/404.html`. There is
deliberately **no SPA catch-all** in `public/_redirects`: without one,
Cloudflare Pages serves `404.html` with a genuine 404 status, so unknown URLs
are not indexable duplicates of the homepage.

Page metadata is built by `src/misc/seoData.ts`, which is imported by both the
prerenderer and the runtime `<Seo>` component, so the static HTML and the
client cannot drift apart.

### Images

Full-resolution originals live in `assets-src/images` and are **not**
published. `npm run convert-images` turns them into the WebP files under
`public/images` that the site actually serves, plus the 1200×630
`og-image.jpg` social card. Keeping the originals out of `public/` cut the
deployed output from ~190 MB to ~26 MB.

Each image is written at full size plus 480, 960 and 1440px variants
(`name-w960.webp`), and the script records every image's size and available
widths in `src/data/images.generated.json`. `imageAttrs()` in
`src/misc/images.ts` turns that manifest into `src`/`srcSet`/`width`/`height`
so a phone downloads a 480px file instead of a 2048px one and nothing shifts
while it loads. Re-run the script and commit the manifest whenever an image
is added or replaced.

### Mobile layout

Every page shares the same `Header`: a fixed navbar that gains a solid
background once scrolled (so the menu, booking and call actions never need a
scroll back up), and a hero that is full-screen on the homepage and a shorter
banner carrying the page's `<h1>` on subpages. Phone-specific rules live in
`@media (max-width: 991px)` blocks at the bottom of each component
stylesheet; the desktop layout is the default. Tap targets are 48px
(`--tap`), form inputs are 16px so iOS does not zoom on focus, and the
gallery lightbox and room sliders respond to touch.

### Host configuration

`public/_redirects` and `public/_headers` are Cloudflare Pages config. The
redirects carry the old English-only URLs (`/rooms`, `/facility`, …) and the
legacy `/home` over to their current locations.

## Environment

Copy `.env.example` to `.env` and fill in the EmailJS and reCAPTCHA keys. The
booking form degrades gracefully without them: it warns and allows manual
review rather than breaking.
