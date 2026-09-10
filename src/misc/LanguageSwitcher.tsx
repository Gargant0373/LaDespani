import './LanguageSwitcher.css';
import { useI18n } from '../i18n/LanguageContext';
import { LANGS, pathFor } from '../i18n/config';

/**
 * Segmented RO | EN control.
 *
 * Both languages are always visible with the current one marked, so there is
 * no ambiguity about whether the label names the current language or the one
 * you would switch to. Each inactive segment is a real link to the same page
 * in the other language, mirroring the hreflang tags.
 */
export default function LanguageSwitcher({ onNavigate }: { onNavigate?: () => void }) {
  const { lang, page, c } = useI18n();

  return (
    <div className="lang-switch" role="group" aria-label={c.common.languageLabel}>
      {LANGS.map((code) =>
        code === lang ? (
          <span key={code} className="lang-switch__option is-active" aria-current="true">
            {code.toUpperCase()}
          </span>
        ) : (
          <a
            key={code}
            className="lang-switch__option"
            href={pathFor(page, code)}
            hrefLang={code}
            lang={code}
            onClick={onNavigate}
          >
            {code.toUpperCase()}
          </a>
        ),
      )}
    </div>
  );
}
