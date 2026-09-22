import manifest from '../data/images.generated.json';

interface ManifestEntry {
  width: number;
  height: number;
  /** Resized variants that exist beside the full-size file, e.g. [480, 960]. */
  widths: number[];
}

const MANIFEST = manifest as Record<string, ManifestEntry>;

export interface ImageAttrs {
  src: string;
  srcSet?: string;
  width?: number;
  height?: number;
}

/**
 * `src`, `srcSet`, `width` and `height` for an image under /public/images,
 * built from the manifest that `npm run convert-images` writes.
 *
 * `name` is the path relative to /images, e.g. "parking.webp" or
 * "gallery/12.webp". Pair the result with a `sizes` attribute that describes
 * how wide the image renders, and the browser picks the smallest file that
 * is sharp enough for the screen. Images missing from the manifest fall back
 * to the plain full-size file.
 */
export function imageAttrs(name: string): ImageAttrs {
  const src = `/images/${name}`;
  const entry = MANIFEST[name];
  if (!entry) return { src };

  const stem = name.replace(/\.webp$/, '');
  const candidates = entry.widths.map((w) => `/images/${stem}-w${w}.webp ${w}w`);
  candidates.push(`${src} ${entry.width}w`);

  return {
    src,
    srcSet: candidates.join(', '),
    width: entry.width,
    height: entry.height,
  };
}
