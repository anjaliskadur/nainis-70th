"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const UNDER_CONSTRUCTION_PATHS = new Set([
  "/itinerary",
  "/menu",
  "/hotel-venue",
]);

/**
 * Soft gate for pages that aren't ready yet. Shown each time a guest
 * lands on one of those routes; dismissible with a single action.
 */
export function UnderConstructionModal() {
  const pathname = usePathname();
  const isUnderConstruction = UNDER_CONSTRUCTION_PATHS.has(pathname);
  const [dismissedPath, setDismissedPath] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const open = isUnderConstruction && dismissedPath !== pathname;

  useEffect(() => {
    if (!isUnderConstruction) {
      setDismissedPath(null);
    }
  }, [isUnderConstruction]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDismissedPath(pathname);
    };
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open, pathname]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="under-construction-title"
      className="fixed inset-0 z-[55] flex items-center justify-center bg-ink/25 p-4 backdrop-blur-md"
      onClick={() => setDismissedPath(pathname)}
    >
      <div
        className="w-full max-w-md rounded-sm bg-cream p-8 text-center shadow-luxe ring-1 ring-gold-soft/70 sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="mx-auto mb-6 flex items-center justify-center gap-3"
          aria-hidden="true"
        >
          <span className="h-px w-8 bg-gold-soft" />
          <span className="ornament" />
          <span className="h-px w-8 bg-gold-soft" />
        </div>
        <h2
          id="under-construction-title"
          className="text-3xl font-normal text-ink"
        >
          Coming soon
        </h2>
        <p className="mt-4 text-base font-light leading-relaxed text-ink-soft">
          This section is still under construction, check back soon.
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={() => setDismissedPath(pathname)}
          className="mt-8 inline-flex min-h-[48px] w-full items-center justify-center rounded-sm bg-ink px-8 text-[0.75rem] font-normal uppercase tracking-[0.14em] text-cream transition-colors hover:bg-crimson"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
