"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";

export type MarqueePhoto = {
  /** Path under /public, or empty for a placeholder frame. */
  src?: string;
  alt: string;
  /** Visual height variant for rhythm in the strip. */
  size?: "sm" | "md" | "lg";
};

const sizeClass: Record<NonNullable<MarqueePhoto["size"]>, string> = {
  sm: "h-44 w-36 sm:h-52 sm:w-40",
  md: "h-56 w-44 sm:h-64 sm:w-52",
  lg: "h-64 w-48 sm:h-72 sm:w-56",
};

function Frame({ photo }: { photo: MarqueePhoto }) {
  const frame = sizeClass[photo.size ?? "md"];

  if (photo.src) {
    return (
      <div className={`relative shrink-0 overflow-hidden ${frame}`}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 180px, 220px"
        />
      </div>
    );
  }

  return (
    <div
      className={`flex shrink-0 flex-col items-center justify-center bg-gradient-to-br from-mist via-cream to-gold-soft/40 ring-1 ring-gold-soft/50 ${frame}`}
      role="img"
      aria-label={photo.alt}
    >
      <span className="ornament opacity-50" aria-hidden="true" />
      <span className="mt-3 px-3 text-center text-[0.65rem] font-normal uppercase tracking-[0.18em] text-ink-soft/70">
        Photo soon
      </span>
    </div>
  );
}

type PhotoMarqueeProps = {
  photos: MarqueePhoto[];
};

/**
 * Seamless horizontal marquee. Duplicates the strip for a continuous loop.
 * Pauses motion when the guest prefers reduced motion.
 */
export function PhotoMarquee({ photos }: PhotoMarqueeProps) {
  const reduce = useReducedMotion();
  const strip = [...photos, ...photos];

  return (
    <div className="relative overflow-hidden">
      <div
        className={`flex w-max gap-4 py-2 sm:gap-5 ${
          reduce ? "" : "marquee-track"
        }`}
      >
        {strip.map((photo, i) => (
          <Frame key={`${photo.alt}-${i}`} photo={photo} />
        ))}
      </div>
    </div>
  );
}
