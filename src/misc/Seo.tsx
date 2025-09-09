import { useEffect } from 'react';

interface SeoProps {
  title: string;
  description: string;
  canonical: string;
  schema?: Record<string, any> | Record<string, any>[];
  image?: string; // absolute or relative path
  noIndex?: boolean; // when true set robots noindex
  robots?: string; // custom robots directive overrides noIndex
}

// Lightweight SEO component: sets document title, meta description, canonical link, OG tags, optional JSON-LD, robots.
export function Seo({ title, description, canonical, schema, image, noIndex, robots }: SeoProps) {
  useEffect(() => {
    if (typeof document === 'undefined') return; // SSR safety

    document.title = title;

    setMetaName('description', description);

    const linkCanonical = ensureTag('link[rel="canonical"]', 'link') as HTMLLinkElement;
    linkCanonical.setAttribute('rel', 'canonical');
    linkCanonical.setAttribute('href', canonical);

    // Robots
    if (robots || noIndex) {
      const robotsContent = robots || (noIndex ? 'noindex,follow' : 'index,follow');
      setMetaName('robots', robotsContent);
    }

    // OpenGraph basic
    setMetaProperty('og:title', title);
    setMetaProperty('og:description', description);
    setMetaProperty('og:url', canonical);
    if (image) setMetaProperty('og:image', absolutize(image));
    setMetaProperty('og:type', 'website');

    // Twitter basic
    setMetaName('twitter:card', 'summary_large_image');
    setMetaName('twitter:title', title);
    setMetaName('twitter:description', description);
    if (image) setMetaName('twitter:image', absolutize(image));

    // JSON-LD
    const existing = document.getElementById('ld-json');
    if (schema) {
      const script = (existing as HTMLScriptElement | null) || document.createElement('script');
      (script as HTMLScriptElement).type = 'application/ld+json';
      script.id = 'ld-json';
      (script as HTMLScriptElement).text = JSON.stringify(schema, null, 2);
      if (!existing) document.head.appendChild(script);
    } else if (existing) {
      existing.remove();
    }
  }, [title, description, canonical, schema, image, noIndex, robots]);

  return null;
}

function ensureTag(selector: string, tag: string = 'meta') {
  let el = document.head.querySelector(selector) as HTMLElement | null;
  if (!el) {
    el = document.createElement(tag);
    document.head.appendChild(el);
  }
  return el as HTMLElement;
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

function absolutize(url: string) {
  if (/^https?:\/\//i.test(url)) return url;
  const base = (typeof window !== 'undefined' ? window.location.origin : '').replace(/\/$/, '');
  return `${base}/${url.replace(/^\//, '')}`;
}
