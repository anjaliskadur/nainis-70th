import fs from "fs";
import path from "path";

export type GalleryPhoto = {
  id: string;
  src: string;
  alt: string;
};

const GALLERY_DIR = path.join(process.cwd(), "public", "gallery");
const IMAGE_EXT = /\.(jpe?g|png|webp|gif|avif)$/i;

/**
 * Reads every image in public/gallery. Drop new files there and they
 * appear on the home marquee and gallery page after the next deploy/refresh.
 */
export function getGalleryPhotos(): GalleryPhoto[] {
  if (!fs.existsSync(GALLERY_DIR)) return [];

  return fs
    .readdirSync(GALLERY_DIR)
    .filter((name) => IMAGE_EXT.test(name) && !name.startsWith("."))
    .sort((a, b) => a.localeCompare(b))
    .map((filename) => ({
      id: filename,
      src: `/gallery/${encodeURIComponent(filename)}`,
      alt: "A moment with Usha",
    }));
}

/** Fisher–Yates shuffle — new order on every call. */
export function shufflePhotos<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
