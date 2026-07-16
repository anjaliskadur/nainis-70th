import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { rememberOwnedMemory } from "@/lib/memory-ownership";
import {
  MAX_PHOTO_BYTES,
  MAX_VIDEO_BYTES,
  formatBytes,
} from "@/lib/upload-limits";

async function uploadOptionalMedia(
  bucket: "memory-media",
  folder: string,
  file: File | null,
  maxBytes: number,
): Promise<string | null> {
  if (!file) return null;

  if (file.size > maxBytes) {
    throw new Error(
      `"${file.name}" is too large (${formatBytes(file.size)}). Max is ${formatBytes(maxBytes)}.`,
    );
  }

  const supabase = getSupabaseBrowserClient();
  const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { cacheControl: "3600", upsert: false });

  if (error) {
    throw new Error(error.message);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(path);

  return publicUrl;
}

export async function submitMemory(input: {
  author: string;
  message: string;
  photo?: File | null;
  video?: File | null;
}): Promise<void> {
  const supabase = getSupabaseBrowserClient();
  // Generate both client-side so ownership is saved even if RETURNING fails.
  const id = crypto.randomUUID();
  const editToken = crypto.randomUUID();
  const photoUrl = await uploadOptionalMedia(
    "memory-media",
    "photos",
    input.photo ?? null,
    MAX_PHOTO_BYTES,
  );
  const videoUrl = await uploadOptionalMedia(
    "memory-media",
    "videos",
    input.video ?? null,
    MAX_VIDEO_BYTES,
  );

  const { error } = await supabase.from("memories").insert({
    id,
    author: input.author.trim() || "Guest",
    message: input.message.trim(),
    photo_url: photoUrl,
    video_url: videoUrl,
    edit_token: editToken,
  });

  if (error) {
    throw new Error(error.message);
  }

  rememberOwnedMemory({ id, token: editToken });
}

export async function updateMemory(input: {
  id: string;
  token: string;
  author: string;
  message: string;
}): Promise<void> {
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase.rpc("edit_memory", {
    p_id: input.id,
    p_token: input.token,
    p_author: input.author,
    p_message: input.message,
  });

  if (error) {
    throw new Error(error.message);
  }
  if (!data) {
    throw new Error("Could not update this message. Try again from the device that posted it.");
  }
}

export async function deleteMemory(input: {
  id: string;
  token: string;
}): Promise<void> {
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase.rpc("delete_memory", {
    p_id: input.id,
    p_token: input.token,
  });

  if (error) {
    throw new Error(error.message);
  }
  if (!data) {
    throw new Error("Could not delete this message. Try again from the device that posted it.");
  }
}
