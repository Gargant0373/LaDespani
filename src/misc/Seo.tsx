import { useEffect } from 'react';
import { buildMeta } from './seoData';
import { Lang, PageKey } from '../i18n/config';

/**
 * Keeps the document head in sync with the page being shown.
 *
 * The prerenderer writes these same tags into the static HTML at build time
 * (from the same buildMeta source), so this component is mostly a safety net
 * for client-side navigation. Both paths agree by construction.
 */
export function Seo({ page, lang }: { page: PageKey; lang: Lang }) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const meta = buildMeta(page, lang);

    document.documentElement.setAttribute('lang', meta.htmlLang);
    document.title = meta.title;

    setMetaName('description', meta.description);
    setMetaName('robots', meta.robots);
    setLink('canonical', meta.canonical);

    setMetaProperty('og:title', meta.title);
    setMetaProperty('og:description', meta.description);
    setMetaProperty('og:url', meta.canonical);
    setMetaProperty('og:image', meta.ogImage);
    setMetaProperty('og:type', 'website');
    setMetaProperty('og:locale', meta.ogLocale);

    setMetaName('twitter:card', 'summary_large_image');
    setMetaName('twitter:title', meta.title);
    setMetaName('twitter:description', meta.description);
    setMetaName('twitter:image', meta.ogImage);

    // Replace the full set of hreflang links so stale ones cannot linger.
    document.head
      .querySelectorAll('link[rel="alternate"][hreflang]')
      .forEach((el) => el.remove());
    for (const alt of meta.alternates) {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', alt.hreflang);
      link.setAttribute('href', alt.href);
      document.head.appendChild(link);
    }

    document.head.querySelectorAll('script[data-ld]').forEach((el) => el.remove());
    for (const block of meta.schema) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-ld', '');
      script.text = JSON.stringify(block);
      document.head.appendChild(script);
    }
  }, [page, lang]);

  return null;
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function setMetaProperty(property: string, content: string) {
  let el = document.head.querySelector(`meta[property='${property}']`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setMetaName(name: string, content: string) {
  let el = document.head.querySelector(`meta[name='${name}']`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}
