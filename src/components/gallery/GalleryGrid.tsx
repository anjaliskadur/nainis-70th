"use client";

import Image from "next/image";
import { useState } from "react";
import type { GalleryPhoto } from "@/lib/gallery";

type GalleryGridProps = {
  photos: GalleryPhoto[];
};

export function GalleryGrid({ photos }: GalleryGridProps) {
  const [active, setActive] = useState<GalleryPhoto | null>(null);

  if (photos.length === 0) {
    return (
      <div className="rounded-sm border border-dashed border-gold-soft/70 bg-mist/50 px-6 py-16 text-center">
        <span className="ornament mx-auto mb-4 block" aria-hidden="true" />
        <p className="font-display text-xl text-ink">No photos yet</p>
        <p className="mt-2 text-sm font-light text-ink-soft">
          Add images to the gallery folder to show them here.
        </p>
      </div>
    );
  }

  return (
    <>
      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {photos.map((photo) => (
          <li key={photo.id} className="mb-4 break-inside-avoid">
            <button
              type="button"
              onClick={() => setActive(photo)}
              className="group relative block w-full overflow-hidden focus-visible:outline-none"
              aria-label="View photo larger"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="w-full object-cover transition-opacity duration-300 group-hover:opacity-90"
              />
            </button>
          </li>
        ))}
      </ul>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged photo"
          className="fixed inset-0 z-[55] flex items-center justify-center bg-ink/50 p-4 backdrop-blur-md"
          onClick={() => setActive(null)}
        >
          <div
            className="relative max-h-[85vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-mist sm:aspect-auto sm:h-[min(80vh,48rem)]">
              <Image
                src={active.src}
                alt={active.alt}
                fill
                className="object-contain"
                sizes="(max-width: 896px) 100vw, 896px"
                priority
              />
            </div>
            <button
              type="button"
              onClick={() => setActive(null)}
              className="mt-4 inline-flex min-h-[44px] w-full items-center justify-center rounded-sm bg-cream px-6 text-[0.7rem] font-normal uppercase tracking-[0.14em] text-ink ring-1 ring-gold-soft/60 transition-colors hover:text-crimson sm:w-auto"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
