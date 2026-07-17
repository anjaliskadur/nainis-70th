"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useReducedMotion } from "framer-motion";
import type { GalleryPhoto } from "@/lib/gallery";

type FilmTapeMarqueeProps = {
  photos: GalleryPhoto[];
  /** `left` scrolls content left; `right` scrolls the opposite way. */
  direction?: "left" | "right";
};

function Sprockets() {
  return (
    <div className="flex justify-center gap-1.5 py-[3px] sm:gap-2 sm:py-1" aria-hidden="true">
      <span className="h-[6px] w-[4px] rounded-[1px] bg-ink/35 sm:h-[7px] sm:w-[5px]" />
      <span className="h-[6px] w-[4px] rounded-[1px] bg-ink/35 sm:h-[7px] sm:w-[5px]" />
    </div>
  );
}

/**
 * Continuous film-strip marquee with sprocket holes.
 * Duplicates the strip for a seamless loop; honors prefers-reduced-motion.
 */
export function FilmTapeMarquee({
  photos,
  direction = "left",
}: FilmTapeMarqueeProps) {
  const reduce = useReducedMotion();

  if (photos.length === 0) return null;

  const strip = [...photos, ...photos];
  const durationSec = Math.max(40, photos.length * 2.4);
  const trackClass =
    direction === "right" ? "marquee-track-reverse" : "marquee-track";

  return (
    <div
      className="relative overflow-hidden border-y border-gold-soft/60 bg-cream"
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-cream to-transparent sm:w-14" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-cream to-transparent sm:w-14" />

      <div
        className={`flex w-max items-stretch ${reduce ? "" : trackClass}`}
        style={
          reduce
            ? undefined
            : ({
                ["--marquee-duration" as string]: `${durationSec}s`,
              } as CSSProperties)
        }
      >
        {strip.map((photo, i) => (
          <div
            key={`${photo.id}-${direction}-${i}`}
            className="flex w-[5.25rem] shrink-0 flex-col px-1 sm:w-[6.25rem] sm:px-1.5"
          >
            <Sprockets />
            <div className="relative mx-auto aspect-square w-full overflow-hidden bg-mist/40 ring-1 ring-ink/10">
              <Image
                src={photo.src}
                alt=""
                fill
                className="object-cover"
                sizes="100px"
              />
            </div>
            <Sprockets />
          </div>
        ))}
      </div>
    </div>
  );
}
