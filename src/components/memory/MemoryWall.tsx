"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Memory } from "@/lib/memory";
import { deleteMemory, updateMemory } from "@/lib/memory-client";
import {
  forgetOwnedMemory,
  getOwnedMemoryToken,
  listOwnedMemoryIds,
} from "@/lib/memory-ownership";
import {
  inputClass,
  labelClass,
  textareaClass,
} from "@/components/ui/formStyles";

type MemoryWallProps = {
  memories: Memory[];
};

export function MemoryWall({ memories }: MemoryWallProps) {
  const [ownedIds, setOwnedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    setOwnedIds(new Set(listOwnedMemoryIds()));
  }, [memories]);

  if (memories.length === 0) {
    return (
      <div className="rounded-sm border border-dashed border-gold-soft/70 bg-mist/50 px-6 py-16 text-center">
        <span className="ornament mx-auto mb-4 block" aria-hidden="true" />
        <p className="font-display text-xl text-ink">No messages yet</p>
        <p className="mt-2 text-sm font-light text-ink-soft">
          Be the first to leave a note for Usha.
        </p>
      </div>
    );
  }

  return (
    <ul className="columns-1 gap-4 sm:columns-2">
      {memories.map((memory) => (
        <MemoryCard
          key={memory.id}
          memory={memory}
          owned={ownedIds.has(memory.id)}
          onOwnershipChange={() => setOwnedIds(new Set(listOwnedMemoryIds()))}
        />
      ))}
    </ul>
  );
}

function MemoryCard({
  memory,
  owned,
  onOwnershipChange,
}: {
  memory: Memory;
  owned: boolean;
  onOwnershipChange: () => void;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [author, setAuthor] = useState(memory.author);
  const [message, setMessage] = useState(memory.message);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!editing) {
      setAuthor(memory.author);
      setMessage(memory.message);
    }
  }, [memory.author, memory.message, editing]);

  const token = owned ? getOwnedMemoryToken(memory.id) : null;

  const handleSave = async () => {
    if (!token || !message.trim()) return;
    setPending(true);
    setError(null);
    try {
      await updateMemory({
        id: memory.id,
        token,
        author,
        message,
      });
      setEditing(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setPending(false);
    }
  };

  const handleDelete = async () => {
    if (!token) return;
    setPending(true);
    setError(null);
    try {
      await deleteMemory({ id: memory.id, token });
      forgetOwnedMemory(memory.id);
      onOwnershipChange();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete.");
      setPending(false);
    }
  };

  return (
    <li className="mb-4 break-inside-avoid rounded-sm bg-cream p-6 shadow-card ring-1 ring-gold-soft/40">
      {memory.photoUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={memory.photoUrl}
          alt={`Shared by ${memory.author}`}
          loading="lazy"
          className="mb-5 aspect-[4/3] w-full rounded-sm object-cover"
        />
      )}

      {editing ? (
        <div className="space-y-4">
          <div>
            <label htmlFor={`edit-author-${memory.id}`} className={labelClass}>
              Your name
            </label>
            <input
              id={`edit-author-${memory.id}`}
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor={`edit-message-${memory.id}`} className={labelClass}>
              Your message
            </label>
            <textarea
              id={`edit-message-${memory.id}`}
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={textareaClass}
            />
          </div>
          {error && (
            <p className="text-sm text-crimson" role="alert">
              {error}
            </p>
          )}
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              disabled={pending || !message.trim()}
              onClick={handleSave}
              className="inline-flex min-h-[44px] items-center justify-center rounded-sm bg-ink px-5 text-[0.7rem] font-normal uppercase tracking-[0.14em] text-cream transition-colors hover:bg-crimson disabled:opacity-50"
            >
              {pending ? "Saving…" : "Save"}
            </button>
            <button
              type="button"
              disabled={pending}
              onClick={() => {
                setEditing(false);
                setError(null);
                setAuthor(memory.author);
                setMessage(memory.message);
              }}
              className="inline-flex min-h-[44px] items-center justify-center rounded-sm px-5 text-[0.7rem] font-normal uppercase tracking-[0.14em] text-ink ring-1 ring-ink/15 transition-colors hover:text-crimson hover:ring-crimson/40"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="font-display text-xl leading-relaxed text-ink">
            &ldquo;{memory.message}&rdquo;
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-gold-soft/40 pt-4">
            <p className="text-sm tracking-wide text-ink">{memory.author}</p>
            <div className="flex flex-wrap items-center gap-4">
              {memory.videoUrl && (
                <a
                  href={memory.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-[0.14em] text-crimson hover:underline"
                >
                  Watch video
                </a>
              )}
              {owned && token && !confirmDelete && (
                <>
                  <button
                    type="button"
                    onClick={() => setEditing(true)}
                    className="text-xs uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-crimson"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(true)}
                    className="text-xs uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-crimson"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>

          {confirmDelete && (
            <div className="mt-4 rounded-sm bg-mist/70 p-4 ring-1 ring-gold-soft/50">
              <p className="text-sm font-light text-ink-soft">
                Delete this message? This can&apos;t be undone.
              </p>
              {error && (
                <p className="mt-2 text-sm text-crimson" role="alert">
                  {error}
                </p>
              )}
              <div className="mt-3 flex flex-wrap gap-3">
                <button
                  type="button"
                  disabled={pending}
                  onClick={handleDelete}
                  className="inline-flex min-h-[40px] items-center justify-center rounded-sm bg-ink px-4 text-[0.65rem] font-normal uppercase tracking-[0.14em] text-cream transition-colors hover:bg-crimson disabled:opacity-50"
                >
                  {pending ? "Deleting…" : "Yes, delete"}
                </button>
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => {
                    setConfirmDelete(false);
                    setError(null);
                  }}
                  className="inline-flex min-h-[40px] items-center justify-center rounded-sm px-4 text-[0.65rem] font-normal uppercase tracking-[0.14em] text-ink-soft hover:text-crimson"
                >
                  Keep it
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </li>
  );
}
