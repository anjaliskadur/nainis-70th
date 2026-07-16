"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  labelClass,
  inputClass,
  textareaClass,
  helpClass,
} from "@/components/ui/formStyles";
import { submitMemory } from "@/lib/memory-client";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import {
  MAX_PHOTO_BYTES,
  MAX_VIDEO_BYTES,
  formatBytes,
} from "@/lib/upload-limits";

export function MemoryForm({ videoNote }: { videoNote: string }) {
  const router = useRouter();
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    if (!isSupabaseConfigured()) {
      setError("Database is not connected yet.");
      return;
    }

    if (photo && photo.size > MAX_PHOTO_BYTES) {
      setError(`Photo must be under ${formatBytes(MAX_PHOTO_BYTES)}.`);
      return;
    }
    if (video && video.size > MAX_VIDEO_BYTES) {
      setError(`Video must be under ${formatBytes(MAX_VIDEO_BYTES)}.`);
      return;
    }

    setPending(true);
    setError(null);
    try {
      await submitMemory({ author, message, photo, video });
      setSubmitted(true);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setPending(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-sm bg-mist/60 p-8 text-center ring-1 ring-gold-soft/50">
        <p className="font-display text-2xl text-ink">
          Thank you for sharing
        </p>
        <p className="mt-2 text-sm font-light text-ink-soft">
          Your message is on the wall for everyone to see. You can edit or
          delete it later from this device.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setAuthor("");
            setMessage("");
            setPhoto(null);
            setVideo(null);
          }}
          className="mt-5 text-sm uppercase tracking-[0.14em] text-crimson underline decoration-crimson-soft/50 underline-offset-4"
        >
          Add another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="mem-author" className={labelClass}>
          Your name
        </label>
        <input
          id="mem-author"
          type="text"
          autoComplete="name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className={inputClass}
          placeholder="e.g. The Sharma Family"
        />
      </div>

      <div>
        <label htmlFor="mem-message" className={labelClass}>
          Your message or memory
        </label>
        <textarea
          id="mem-message"
          rows={5}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={textareaClass}
          placeholder="Share a favorite memory or a birthday wish for Usha..."
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="mem-photo" className={labelClass}>
            Photo{" "}
            <span className="font-light text-ink-soft">(optional)</span>
          </label>
          <input
            id="mem-photo"
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
            className="mt-2 block w-full cursor-pointer rounded-sm border border-dashed border-gold-soft/70 bg-cream px-4 py-4 text-sm text-ink file:mr-3 file:rounded-sm file:border-0 file:bg-ink file:px-3 file:py-2 file:text-xs file:uppercase file:tracking-wider file:text-cream"
          />
          <p className={helpClass}>
            {photo
              ? photo.name
              : `Max ${formatBytes(MAX_PHOTO_BYTES)}`}
          </p>
        </div>

        <div>
          <label htmlFor="mem-video" className={labelClass}>
            Video message{" "}
            <span className="font-light text-ink-soft">
              (if you can&apos;t attend)
            </span>
          </label>
          <input
            id="mem-video"
            type="file"
            accept="video/mp4,video/quicktime,video/webm"
            onChange={(e) => setVideo(e.target.files?.[0] ?? null)}
            className="mt-2 block w-full cursor-pointer rounded-sm border border-dashed border-gold-soft/70 bg-cream px-4 py-4 text-sm text-ink file:mr-3 file:rounded-sm file:border-0 file:bg-ink file:px-3 file:py-2 file:text-xs file:uppercase file:tracking-wider file:text-cream"
          />
          <p className={helpClass}>
            {video ? video.name : videoNote}
          </p>
        </div>
      </div>

      {error && (
        <p className="text-sm text-crimson" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-[48px] w-full items-center justify-center rounded-sm bg-ink px-8 text-[0.75rem] font-normal uppercase tracking-[0.14em] text-cream transition-colors hover:bg-crimson disabled:opacity-50 sm:w-auto"
      >
        {pending ? "Sending…" : "Share with Usha"}
      </button>
    </form>
  );
}
