# LaDespani Guesthouse — ladespani.ro

Marketing site for a family guesthouse in Brașov, Romania. React + TypeScript +
Vite, served from a VPS behind Cloudflare at `https://www.ladespani.ro`.

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

The plugin also writes `dist/sitemap.xml` and a real `dist/404.html`. The
server must serve each route's own `index.html` and answer unknown URLs with
`404.html` and a 404 status — see "Hosting and deployment" for how a
single-page-app fallback silently undid all of this once.

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

## Hosting and deployment

The site runs on a VPS in Docker: the `Dockerfile` builds it and serves
`dist/` with [`serve`](https://github.com/vercel/serve), and Cloudflare proxies
to it. **Pushing to `master` deploys.** `.github/workflows/deploy.yml` SSHes
into the VPS, where `deploy/deploy.sh` pulls `master`, builds a new image,
swaps the container, and rolls back to the previous image if the new one fails
its health check. The workflow then checks the live site through Cloudflare.
It can also be run by hand from the Actions tab.

`serve.json` holds the redirects and headers. The redirects send the old
English-only URLs (`/rooms`, `/facility`, …) to their `/en` pages and the
legacy `/home` to `/`; `/contact` keeps its path and now serves the Romanian
page. **Never start `serve` with `-s`.** Single-page mode rewrites every
extensionless URL to the root `index.html`, so every route serves the homepage
with the homepage's canonical and unknown URLs return 200. The old Dockerfile
did exactly that, so from 10 September 2026 until this fix the prerendered
pages, redirects and 404s never reached production; Google only indexed the
routes correctly because it runs the JavaScript. The deploy health check and
the workflow's live check both fail on it now.

The VPS address is kept in the `DEPLOY_HOST` secret rather than the workflow
because this repo is public and the origin is otherwise hidden behind
Cloudflare. The other secrets are `DEPLOY_SSH_KEY` (a key used only for
deploys) and `DEPLOY_KNOWN_HOSTS` (the VPS host keys).

The VPS also hosts other projects, so the script only ever removes this
site's own images (it keeps the three newest, for rollback) and build cache
unused for a week. nginx proxies `ladespani.ro` to `localhost:3000`.

### One-time server setup

Already done on the current VPS; repeat it on a new one. As root, with `git`,
`curl` and Docker installed:

1. `git clone https://github.com/Gargant0373/LaDespani.git /root/LaDespani`,
   then put the production `.env` in it. Deploys use `git reset --hard`,
   which leaves untracked files such as `.env` alone.
2. Add the deploy key's public half to `/root/.ssh/authorized_keys`, pinned to
   the deploy script:

   ```
   command="/root/LaDespani/deploy/deploy.sh",restrict ssh-ed25519 AAAA… github-actions-deploy@ladespani
   ```

   `restrict` blocks shells, forwarding and PTYs, so the key can only run
   deploys. The defaults (container `ladespani` on port `3000`) match the
   nginx config; to change them, prefix the command with `LD_CONTAINER=…`,
   `LD_PUBLISH=…` or `LD_REPO_DIR=…`.
3. Run `/root/LaDespani/deploy/deploy.sh` once by hand, or trigger the
   workflow from the Actions tab.

## Environment

Copy `.env.example` to `.env` and fill in the EmailJS and reCAPTCHA keys. The
booking form degrades gracefully without them: it warns and allows manual
review rather than breaking.
