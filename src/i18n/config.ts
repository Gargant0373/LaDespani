/**
 * Single source of truth for the site's URL structure and languages.
 *
 * Romanian is the default language and lives at the root (80% of search
 * demand is Romanian); English is served under an /en prefix. This module is
 * deliberately free of JSX and browser globals so the prerender step can
 * import it in Node.
 */

export type Lang = 'ro' | 'en';

export const LANGS: Lang[] = ['ro', 'en'];
export const DEFAULT_LANG: Lang = 'ro';

/** Canonical origin. Everything redirects here, so everything must declare it. */
export const ORIGIN = 'https://www.ladespani.ro';

export type PageKey =
  | 'home'
  | 'rooms'
  | 'facilities'
  | 'gallery'
  | 'contact'
  | 'about'
  | 'card';

interface PageDef {
  /** Path per language, without the origin. Always starts with a slash. */
  path: Record<Lang, string>;
  /** Whether the page belongs in the sitemap and may be indexed. */
  indexable: boolean;
  /** Index into the primary nav, or null if the page is not in the nav. */
  navIndex: number | null;
}

export const PAGES: Record<PageKey, PageDef> = {
  home: { path: { ro: '/', en: '/en' }, indexable: true, navIndex: 0 },
  facilities: { path: { ro: '/facilitati', en: '/en/facilities' }, indexable: true, navIndex: 1 },
  rooms: { path: { ro: '/camere', en: '/en/rooms' }, indexable: true, navIndex: 2 },
  gallery: { path: { ro: '/galerie', en: '/en/gallery' }, indexable: true, navIndex: 3 },
  contact: { path: { ro: '/contact', en: '/en/contact' }, indexable: true, navIndex: 4 },
  about: { path: { ro: '/despre-noi', en: '/en/about' }, indexable: true, navIndex: 5 },
  // Digital business card: reachable by QR, deliberately kept out of the index.
  card: { path: { ro: '/card', en: '/card' }, indexable: false, navIndex: null },
};

export const PAGE_KEYS = Object.keys(PAGES) as PageKey[];

/** Pages that appear in the header navigation, in nav order. */
export const NAV_PAGES = PAGE_KEYS.filter((k) => PAGES[k].navIndex !== null).sort(
  (a, b) => (PAGES[a].navIndex as number) - (PAGES[b].navIndex as number),
);

export function pathFor(page: PageKey, lang: Lang): string {
  return PAGES[page].path[lang];
}

export function urlFor(page: PageKey, lang: Lang): string {
  const path = pathFor(page, lang);
  return path === '/' ? `${ORIGIN}/` : `${ORIGIN}${path}`;
}

/** Absolute URL for an asset under /public, e.g. asset('images/x.webp'). */
export function asset(path: string): string {
  return `${ORIGIN}/${path.replace(/^\.?\//, '')}`;
}

/**
 * Every (page, lang) pair that gets a prerendered HTML file. The card page is
 * language-neutral, so it is emitted once under the default language.
 */
export function allRoutes(): { page: PageKey; lang: Lang; path: string }[] {
  const out: { page: PageKey; lang: Lang; path: string }[] = [];
  for (const page of PAGE_KEYS) {
    const seen = new Set<string>();
    for (const lang of LANGS) {
      const path = pathFor(page, lang);
      if (seen.has(path)) continue; // card shares one path across languages
      seen.add(path);
      out.push({ page, lang, path });
    }
  }
  return out;
}

/** Resolve a pathname back to its page and language. */
export function matchRoute(pathname: string): { page: PageKey; lang: Lang } | null {
  const clean = pathname.replace(/\/+$/, '') || '/';
  for (const page of PAGE_KEYS) {
    for (const lang of LANGS) {
      if (PAGES[page].path[lang] === clean) return { page, lang };
    }
  }
  return null;
}
