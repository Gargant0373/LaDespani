import { createContext, ReactNode, useContext } from 'react';
import { CONTENT, Copy } from './content';
import { DEFAULT_LANG, Lang, PageKey, pathFor, urlFor } from './config';

interface I18nValue {
  lang: Lang;
  /** The other language, for the language switcher. */
  otherLang: Lang;
  /** Copy for the current language. */
  c: Copy;
  /** Path to a page in the current language. */
  path: (page: PageKey) => string;
  /** Absolute URL for a page in the current language. */
  url: (page: PageKey) => string;
  /** The page currently being rendered. */
  page: PageKey;
}

const I18nContext = createContext<I18nValue | null>(null);

export function LanguageProvider({
  lang,
  page,
  children,
}: {
  lang: Lang;
  page: PageKey;
  children: ReactNode;
}) {
  const value: I18nValue = {
    lang,
    otherLang: lang === 'ro' ? 'en' : 'ro',
    c: CONTENT[lang],
    path: (p) => pathFor(p, lang),
    url: (p) => urlFor(p, lang),
    page,
  };
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const value = useContext(I18nContext);
  if (!value) {
    // Should not happen: every page is wrapped by LanguageProvider.
    return {
      lang: DEFAULT_LANG,
      otherLang: 'en',
      c: CONTENT[DEFAULT_LANG],
      path: (p) => pathFor(p, DEFAULT_LANG),
      url: (p) => urlFor(p, DEFAULT_LANG),
      page: 'home',
    };
  }
  return value;
}
