"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { site } from "@/content/site";
import {
  acknowledgeSurprise,
  hasAcknowledgedSurprise,
} from "@/lib/surprise-storage";

const ACK_EVENT = "usha70-surprise-ack";

function subscribeAck(callback: () => void) {
  window.addEventListener(ACK_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(ACK_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

/**
 * Surprise reminder shown on first visit. Two large actions:
 * - "Got it" persists acknowledgement and closes for good.
 * - "Tell me again" briefly closes then reopens, so it keeps showing until
 *   the guest confirms with "Got it".
 */
export function SurpriseModal() {
  // Acknowledgement lives in localStorage; treat it as an external store.
  const acknowledged = useSyncExternalStore(
    subscribeAck,
    hasAcknowledgedSurprise,
    () => true,
  );
  const [flashing, setFlashing] = useState(false);
  const gotItRef = useRef<HTMLButtonElement>(null);

  const open = !acknowledged && !flashing;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      gotItRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleGotIt = () => {
    acknowledgeSurprise();
    window.dispatchEvent(new Event(ACK_EVENT));
  };

  const handleRemind = () => {
    setFlashing(true);
    window.setTimeout(() => setFlashing(false), 400);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="surprise-title"
      aria-describedby="surprise-body"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/25 p-4 backdrop-blur-md"
    >
      <div className="w-full max-w-md rounded-sm bg-cream p-8 text-center shadow-luxe ring-1 ring-gold-soft/70 sm:p-10">
        <div
          className="mx-auto mb-6 flex items-center justify-center gap-3"
          aria-hidden="true"
        >
          <span className="h-px w-8 bg-gold-soft" />
          <span className="ornament" />
          <span className="h-px w-8 bg-gold-soft" />
        </div>
        <h2 id="surprise-title" className="text-3xl font-normal">
          {site.surprise.modalTitle}
        </h2>
        <p id="surprise-body" className="mt-4 text-base font-light leading-relaxed text-ink-soft">
          {site.surprise.modalBody}
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <button
            ref={gotItRef}
            type="button"
            onClick={handleGotIt}
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-sm bg-ink px-8 text-[0.75rem] font-normal uppercase tracking-[0.14em] text-cream transition-colors hover:bg-crimson"
          >
            {site.surprise.confirmLabel}
          </button>
          <button
            type="button"
            onClick={handleRemind}
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-sm bg-transparent px-8 text-[0.75rem] font-normal uppercase tracking-[0.14em] text-ink ring-1 ring-ink/20 transition-colors hover:text-crimson hover:ring-crimson/40"
          >
            {site.surprise.remindLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
