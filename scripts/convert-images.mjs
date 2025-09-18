import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.resolve(__dirname, '../public/images');

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const res = path.resolve(dir, e.name);
    if (e.isDirectory()) files.push(...await walk(res));
    else files.push(res);
  }
  return files;
}

function isImage(file) {
  return /\.(jpe?g|png)$/i.test(file);
}

async function convert(file) {
  const rel = path.relative(imagesDir, file);
  const out = path.resolve(imagesDir, rel.replace(/\.(jpe?g|png)$/i, '.webp'));
  await fs.mkdir(path.dirname(out), { recursive: true });
  try {
    await sharp(file)
      .webp({ quality: 80 })
      .toFile(out);
    console.log('converted', rel, '->', path.relative(imagesDir, out));
  } catch (err) {
    console.error('failed', rel, err.message);
  }
}

(async () => {
  const files = await walk(imagesDir);
  const images = files.filter(isImage);
  console.log(`Found ${images.length} images to convert.`);
  for (const f of images) await convert(f);
  console.log('Done.');
})();
