/**
 * Generates the web-ready images that actually ship.
 *
 * Full-resolution originals live in assets-src/images and are NOT published:
 * Vite copies everything under public/ verbatim, and shipping the originals
 * alongside the WebP versions added ~140MB of unreferenced files to every
 * deploy. Originals in, WebP out.
 *
 * Every image is written at its full size (`name.webp`) plus one file per
 * width in VARIANT_WIDTHS that is smaller than the source (`name-w480.webp`,
 * …). A phone then downloads a 480px or 960px file instead of a 2048px one,
 * which is the difference between a 16MB gallery and a 2MB one.
 *
 * The manifest at src/data/images.generated.json records each image's
 * intrinsic size and the variant widths that exist, so components can emit
 * exact `srcset`, `width` and `height` attributes (no layout shift while the
 * image loads). Commit the manifest together with the images.
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
const manifestPath = path.resolve(__dirname, '../src/data/images.generated.json');

/** Widths to emit beside the full-size file, when the source is wider. */
const VARIANT_WIDTHS = [480, 960, 1440];
const QUALITY = 80;

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

/** Manifest key: path relative to public/images, forward slashes, .webp. */
const keyFor = (rel) => rel.split(path.sep).join('/').replace(/\.(jpe?g|png)$/i, '.webp');

async function convert(file, manifest) {
  const rel = path.relative(sourceDir, file);
  const key = keyFor(rel);
  const out = path.resolve(outputDir, key);
  await fs.mkdir(path.dirname(out), { recursive: true });

  try {
    // .rotate() applies the EXIF orientation so portrait phone photos are not
    // written sideways with a stale orientation tag.
    const base = sharp(file).rotate();
    const meta = await base.metadata();
    // metadata() reports the stored pixel size; orientations 5-8 are rotated
    // a quarter turn, so the delivered image has the axes swapped.
    const swapped = (meta.orientation || 1) >= 5;
    const width = swapped ? meta.height : meta.width;
    const height = swapped ? meta.width : meta.height;

    await base.clone().webp({ quality: QUALITY }).toFile(out);

    const widths = [];
    for (const w of VARIANT_WIDTHS) {
      if (w >= width) continue;
      const variant = out.replace(/\.webp$/, `-w${w}.webp`);
      await base.clone().resize({ width: w }).webp({ quality: QUALITY }).toFile(variant);
      widths.push(w);
    }

    manifest[key] = { width, height, widths };
    console.log('converted', rel, '->', key, `${width}x${height}`, widths.length ? `+${widths.join('/')}` : '');
  } catch (err) {
    console.error('failed', rel, err.message);
  }
}

async function buildOgImage() {
  const src = path.resolve(sourceDir, OG_SOURCE);
  const out = path.resolve(outputDir, OG_OUTPUT);
  try {
    await sharp(src)
      .rotate()
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
  const manifest = {};
  for (const f of images) await convert(f, manifest);

  const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
  await fs.mkdir(path.dirname(manifestPath), { recursive: true });
  await fs.writeFile(manifestPath, JSON.stringify(sorted, null, 2) + '\n');
  console.log(`manifest: ${Object.keys(sorted).length} images -> ${path.relative(process.cwd(), manifestPath)}`);

  await buildOgImage();
  console.log('Done.');
})();
