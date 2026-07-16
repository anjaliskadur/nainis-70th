/** Shared upload limits for Memory Wall media. */
export const MAX_PHOTO_BYTES = 10 * 1024 * 1024; // 10 MB per image
export const MAX_VIDEO_BYTES = 50 * 1024 * 1024; // 50 MB (Supabase free max)

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
