import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { prerender } from './scripts/vite-plugin-prerender.mjs'

// The site is served from the domain root, so assets must use absolute paths.
// A relative base ('./') breaks any nested route such as /en/rooms, where
// './assets/x.js' resolves to '/en/assets/x.js'.
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    // Skipped during the SSR pass the plugin itself kicks off.
    ...(process.env.LD_SSR ? [] : [prerender()]),
  ],
})
