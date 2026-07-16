// Generates a static index.html per route after `vite build` so GitHub Pages
// serves each page with a 200 status and route-specific meta tags (title,
// description, canonical, OpenGraph). Also writes 404.html as an SPA fallback
// so deep links still load the app for routes without a static copy.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');
const base = readFileSync(join(dist, 'index.html'), 'utf8');

const routes = [
  {
    path: 'facility',
    title: 'Facilities & Secure Motorcycle Parking | LaDespani Guesthouse Brasov',
    description:
      'Facilities at LaDespani in Brasov: secure indoor parking for motorcycles and cars, guest kitchen, laundry, grill, trampoline, ping pong and safe lockers.',
  },
  {
    path: 'rooms',
    title: 'Rooms | LaDespani Motorcycle-Friendly Guesthouse Brasov',
    description:
      'Comfortable guest rooms at LaDespani in Brasov: budget, standard, and balcony options with private bathrooms. Bikers welcome — secure indoor motorcycle parking included.',
  },
  {
    path: 'gallery',
    title: 'Gallery | LaDespani Motorcycle-Friendly Guesthouse Brasov',
    description:
      'Browse the LaDespani Guesthouse photo gallery: cozy rooms, the garden, indoor parking and facilities of our motorcycle-friendly guesthouse in Brasov.',
  },
  {
    path: 'contact',
    title: 'Contact & Booking | LaDespani Motorcycle-Friendly Guesthouse Brasov',
    description:
      'Book a room at LaDespani Guesthouse in Brasov: call, email, or use our booking form. Motorcycle riders welcome — secure indoor parking for your bike.',
  },
  {
    path: 'about',
    title: 'About Us | LaDespani Motorcycle-Friendly Guesthouse Brasov',
    description:
      'Meet the family behind LaDespani Guesthouse in Brasov: world travellers who settled down in 2007 and have been hosting guests and motorcycle riders ever since.',
  },
  {
    path: 'card',
    title: 'Digital Card | LaDespani Guesthouse',
    description:
      'Quick contact and location details for LaDespani Guesthouse in Brasov, Romania.',
  },
];

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function renderRoute({ path, title, description }) {
  const canonical = `https://ladespani.ro/${path}`;
  const t = escapeHtml(title);
  const d = escapeHtml(description);
  return base
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${t}</title>`)
    .replace(/<meta name="description"[\s\S]*?\/>/, `<meta name="description" content="${d}" />`)
    .replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${t}" />`)
    .replace(/<meta property="og:description"[\s\S]*?\/>/, `<meta property="og:description" content="${d}" />`)
    .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${canonical}" />`);
}

for (const route of routes) {
  const dir = join(dist, route.path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), renderRoute(route));
  console.log(`prerendered /${route.path}`);
}

writeFileSync(join(dist, '404.html'), base);
console.log('wrote 404.html SPA fallback');
