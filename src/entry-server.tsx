import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import './index.css';

/** Renders one route to static HTML for the build-time prerender step. */
export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}

export { buildMeta } from './misc/seoData';
export { allRoutes, PAGES, LANGS, ORIGIN, pathFor, urlFor } from './i18n/config';
