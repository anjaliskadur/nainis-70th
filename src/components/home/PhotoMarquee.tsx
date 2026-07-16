"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useReducedMotion } from "framer-motion";
import type { GalleryPhoto } from "@/lib/gallery";

const SIZES = ["sm", "md", "lg"] as const;

const sizeClass: Record<(typeof SIZES)[number], string> = {
  sm: "h-44 w-36 sm:h-52 sm:w-40",
  md: "h-56 w-44 sm:h-64 sm:w-52",
  lg: "h-64 w-48 sm:h-72 sm:w-56",
};

type PhotoMarqueeProps = {
  photos: GalleryPhoto[];
};

/**
 * Seamless horizontal marquee. Duplicates the strip for a continuous loop.
 * Honors prefers-reduced-motion.
 */
export function PhotoMarquee({ photos }: PhotoMarqueeProps) {
  const reduce = useReducedMotion();

  if (photos.length === 0) {
    return (
      <p className="px-5 text-center text-sm font-light text-ink-soft">
        Photos will appear here soon.
      </p>
    );
  }

  const strip = [...photos, ...photos];
  // Keep the loop pace roughly steady as the gallery grows.
  const durationSec = Math.max(48, photos.length * 2.2);

  return (
    <div className="relative overflow-hidden">
      <div
        className={`flex w-max gap-4 py-2 sm:gap-5 ${
          reduce ? "" : "marquee-track"
        }`}
        style={
          reduce
            ? undefined
            : ({
                ["--marquee-duration" as string]: `${durationSec}s`,
              } as CSSProperties)
        }
      >
        {strip.map((photo, i) => {
          const size = SIZES[i % SIZES.length];
          return (
            <div
              key={`${photo.id}-${i}`}
              className={`relative shrink-0 overflow-hidden ${sizeClass[size]}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 180px, 220px"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
