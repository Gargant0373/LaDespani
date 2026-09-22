/**
 * Renders every route to static HTML at build time.
 *
 * This runs as a Vite plugin rather than an npm `postbuild` script on purpose:
 * the production host invokes `vite build` directly, so a postbuild hook never
 * fires and the site shipped an empty, identical shell for every URL. Living
 * inside the build means it cannot be bypassed.
 */
import { mkdirSync, writeFileSync, readFileSync, rmSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const SSR_OUT = 'dist-ssr';

const escapeHtml = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** JSON-LD is injected into a <script> body, so only the closing tag matters. */
const escapeJsonLd = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c');

function renderHead(meta) {
  const lines = [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="robots" content="${escapeHtml(meta.robots)}" />`,
    `<link rel="canonical" href="${escapeHtml(meta.canonical)}" />`,
  ];

  for (const alt of meta.alternates) {
    lines.push(
      `<link rel="alternate" hreflang="${escapeHtml(alt.hreflang)}" href="${escapeHtml(alt.href)}" />`,
    );
  }

  lines.push(
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="LaDespani" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(meta.canonical)}" />`,
    `<meta property="og:image" content="${escapeHtml(meta.ogImage)}" />`,
    `<meta property="og:image:width" content="${meta.ogImageWidth}" />`,
    `<meta property="og:image:height" content="${meta.ogImageHeight}" />`,
    `<meta property="og:locale" content="${escapeHtml(meta.ogLocale)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(meta.ogImage)}" />`,
  );

  for (const block of meta.schema) {
    lines.push(`<script type="application/ld+json">${escapeJsonLd(block)}</script>`);
  }

  // The hero photo is the largest thing on the first screen of every page
  // that has one; start fetching it before the JS bundle has even parsed.
  // imagesrcset/imagesizes let the browser pick the same variant the <img>
  // will use, so a phone preloads the 480px file, not the 2048px one.
  if (meta.heroPreload) {
    const { href, srcSet, sizes } = meta.heroPreload;
    const responsive = srcSet
      ? ` imagesrcset="${escapeHtml(srcSet)}" imagesizes="${escapeHtml(sizes)}"`
      : '';
    lines.push(`<link rel="preload" as="image" href="${escapeHtml(href)}"${responsive} fetchpriority="high" />`);
  }

  // Content is revealed on scroll by an IntersectionObserver. Without
  // JavaScript that never fires, so make it visible instead of invisible.
  lines.push(
    `<noscript><style>.reveal{opacity:1 !important;transform:none !important}</style></noscript>`,
  );

  return lines.map((l) => `  ${l}`).join('\n');
}

function sitemap(mod, lastmod) {
  const priority = { home: '1.0', rooms: '0.9', facilities: '0.9', contact: '0.8', gallery: '0.7', about: '0.6' };
  const entries = [];

  for (const { page, lang, path } of mod.allRoutes()) {
    if (!mod.PAGES[page].indexable) continue;
    const alternates = mod.LANGS.map(
      (l) =>
        `    <xhtml:link rel="alternate" hreflang="${l}" href="${mod.urlFor(page, l)}"/>`,
    ).join('\n');
    entries.push(
      [
        '  <url>',
        `    <loc>${mod.urlFor(page, lang)}</loc>`,
        alternates,
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${mod.urlFor(page, 'ro')}"/>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <priority>${priority[page] ?? '0.5'}</priority>`,
        '  </url>',
      ].join('\n'),
    );
    void path;
  }

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entries,
    '</urlset>',
    '',
  ].join('\n');
}

export function prerender() {
  return {
    name: 'ladespani-prerender',
    apply: 'build',
    enforce: 'post',

    async closeBundle() {
      const { build } = await import('vite');
      const outDir = join(process.cwd(), 'dist');
      const ssrDir = join(process.cwd(), SSR_OUT);

      // Build a Node-targeted bundle of the same app. LD_SSR keeps this
      // plugin out of that build so it cannot recurse.
      process.env.LD_SSR = '1';
      try {
        await build({
          logLevel: 'warn',
          // Bundle dependencies rather than leaving them external: several
          // (notably @mui/icons-material) publish extensionless ESM imports
          // that bare Node cannot resolve.
          ssr: { noExternal: true },
          build: {
            ssr: 'src/entry-server.tsx',
            outDir: SSR_OUT,
            emptyOutDir: true,
          },
        });
      } finally {
        delete process.env.LD_SSR;
      }

      const entry = join(ssrDir, 'entry-server.js');
      if (!existsSync(entry)) {
        throw new Error(`prerender: SSR bundle missing at ${entry}`);
      }
      const mod = await import(pathToFileURL(entry).href);

      const template = readFileSync(join(outDir, 'index.html'), 'utf8');
      if (!template.includes('<!--app-html-->') || !template.includes('<!--app-head-->')) {
        throw new Error('prerender: index.html is missing the <!--app-html--> / <!--app-head--> placeholders');
      }

      let rendered = 0;
      const failures = [];

      for (const { page, lang, path } of mod.allRoutes()) {
        const meta = mod.buildMeta(page, lang);

        let body = '';
        try {
          body = mod.render(path);
        } catch (err) {
          // A route that cannot render in Node still gets correct metadata;
          // it just falls back to client-side rendering for its content.
          failures.push(`${path}: ${err.message}`);
        }

        const html = template
          .replace('<html lang="ro">', `<html lang="${meta.htmlLang}">`)
          .replace('<!--app-head-->', renderHead(meta))
          .replace('<!--app-html-->', body);

        const file =
          path === '/' ? join(outDir, 'index.html') : join(outDir, path.slice(1), 'index.html');
        mkdirSync(dirname(file), { recursive: true });
        writeFileSync(file, html);
        rendered += 1;
      }

      // Real 404 page. Hosts serve dist/404.html with a 404 status, which
      // stops unknown URLs from looking like copies of the homepage.
      const notFoundMeta = mod.buildMeta('home', 'ro');
      const notFoundHtml = template
        .replace('<!--app-head-->', [
          '  <title>404 — Pagina nu a fost găsită | LaDespani</title>',
          '  <meta name="robots" content="noindex,follow" />',
        ].join('\n'))
        .replace('<!--app-html-->', (() => {
          try {
            return mod.render('/__not-found__');
          } catch {
            return '';
          }
        })());
      writeFileSync(join(outDir, '404.html'), notFoundHtml);
      void notFoundMeta;

      const lastmod = new Date().toISOString().slice(0, 10);
      writeFileSync(join(outDir, 'sitemap.xml'), sitemap(mod, lastmod));

      rmSync(ssrDir, { recursive: true, force: true });

      this.info?.(`prerendered ${rendered} routes + 404.html + sitemap.xml`);
      if (failures.length) {
        this.warn?.(`prerender fell back to client rendering for:\n  ${failures.join('\n  ')}`);
      }
    },
  };
}
