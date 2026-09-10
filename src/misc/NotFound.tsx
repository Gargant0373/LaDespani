import { useI18n } from '../i18n/LanguageContext';
import { CONTENT } from '../i18n/content';
import { NAV_PAGES, pathFor } from '../i18n/config';
import './NotFound.css';

/**
 * Shown for URLs that do not exist. The static 404.html built from this page
 * is served by the host with a real 404 status, so unknown paths stop looking
 * like duplicates of the homepage.
 */
export default function NotFound() {
  const { path } = useI18n();

  return (
    <div className="notfound">
      <div className="notfound-inner">
        <a className="logo" href={path('home')}>
          <div className="title">LADESPANI</div>
          <div className="subtitle">GUESTHOUSE</div>
        </a>

        <p className="code">404</p>

        <h1 lang="ro">Pagina nu a fost găsită</h1>
        <p lang="ro">
          Adresa pe care ați accesat-o nu există sau a fost mutată. Încercați una dintre
          paginile de mai jos.
        </p>

        <h2 lang="en">Page not found</h2>
        <p lang="en">
          The address you followed does not exist or has moved. Try one of the pages below.
        </p>

        <nav className="links" aria-label="Site">
          {NAV_PAGES.map((page) => (
            <a key={page} href={pathFor(page, 'ro')} lang="ro">
              {CONTENT.ro.nav[page as Exclude<typeof page, 'card'>]}
            </a>
          ))}
        </nav>
        <nav className="links" aria-label="Site (English)">
          {NAV_PAGES.map((page) => (
            <a key={page} href={pathFor(page, 'en')} lang="en" hrefLang="en">
              {CONTENT.en.nav[page as Exclude<typeof page, 'card'>]}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
