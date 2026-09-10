/**
 * Generates the web-ready images that actually ship.
 *
 * Full-resolution originals live in assets-src/images and are NOT published:
 * Vite copies everything under public/ verbatim, and shipping the originals
 * alongside the WebP versions added ~140MB of unreferenced files to every
 * deploy. Originals in, WebP out.
 *
 * Also produces the 1200x630 social share image as JPEG, which every scraper
 * handles reliably.
 */
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sourceDir = path.resolve(__dirname, '../assets-src/images');
const outputDir = path.resolve(__dirname, '../public/images');

/** Source for the social card. */
const OG_SOURCE = 'landing1.jpg';
const OG_OUTPUT = 'og-image.jpg';

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const res = path.resolve(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(res)));
    else files.push(res);
  }
  return files;
}

const isImage = (file) => /\.(jpe?g|png)$/i.test(file);

async function convert(file) {
  const rel = path.relative(sourceDir, file);
  const out = path.resolve(outputDir, rel.replace(/\.(jpe?g|png)$/i, '.webp'));
  await fs.mkdir(path.dirname(out), { recursive: true });
  try {
    await sharp(file).webp({ quality: 80 }).toFile(out);
    console.log('converted', rel, '->', path.relative(outputDir, out));
  } catch (err) {
    console.error('failed', rel, err.message);
  }
}

async function buildOgImage() {
  const src = path.resolve(sourceDir, OG_SOURCE);
  const out = path.resolve(outputDir, OG_OUTPUT);
  try {
    await sharp(src)
      .resize(1200, 630, { fit: 'cover', position: 'centre' })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(out);
    const { size } = await fs.stat(out);
    console.log(`og image ${OG_OUTPUT} (${Math.round(size / 1024)} kB)`);
  } catch (err) {
    console.error('failed to build og image:', err.message);
  }
}

(async () => {
  const files = await walk(sourceDir);
  const images = files.filter(isImage);
  console.log(`Found ${images.length} source images.`);
  for (const f of images) await convert(f);
  await buildOgImage();
  console.log('Done.');
})();
