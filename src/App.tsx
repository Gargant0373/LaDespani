import { Route, Routes } from 'react-router-dom';
import Landing from './landing/Landing';
import Facilities from './facilities/Facilities';
import Contact from './contact/Contact';
import Rooms from './rooms/Rooms';
import About from './about/About';
import DigitalCard from './card/DigitalCard';
import Gallery from './gallery/Gallery';
import NotFound from './misc/NotFound';
import { LanguageProvider } from './i18n/LanguageContext';
import { allRoutes, PageKey } from './i18n/config';

const PAGE_COMPONENTS: Record<PageKey, () => JSX.Element> = {
  home: Landing,
  rooms: Rooms,
  facilities: Facilities,
  gallery: Gallery,
  contact: Contact,
  about: About,
  card: DigitalCard,
};

/**
 * Routes are generated from the shared URL config so the app, the sitemap and
 * the prerenderer can never disagree about which URLs exist.
 */
export default function App() {
  return (
    <Routes>
      {allRoutes().map(({ page, lang, path }) => {
        const Component = PAGE_COMPONENTS[page];
        return (
          <Route
            key={`${lang}:${path}`}
            path={path}
            element={
              <LanguageProvider lang={lang} page={page}>
                <Component />
              </LanguageProvider>
            }
          />
        );
      })}
      <Route
        path="*"
        element={
          <LanguageProvider lang="ro" page="home">
            <NotFound />
          </LanguageProvider>
        }
      />
    </Routes>
  );
}
