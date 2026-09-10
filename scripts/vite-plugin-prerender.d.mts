import type { Plugin } from 'vite';

/** Renders every route in src/i18n/config.ts to static HTML during `vite build`. */
export function prerender(): Plugin;
