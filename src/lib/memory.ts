import {
  getSupabaseServerClient,
  isSupabaseConfigured,
} from "@/lib/supabase/client";

export type Memory = {
  id: string;
  author: string;
  message: string;
  photoUrl?: string;
  videoUrl?: string;
  date: string;
};

const MOCK_MEMORIES: Memory[] = [
  {
    id: "m1",
    author: "The Family",
    message:
      "Seventy years of love, laughter, and the best home-cooked meals. We can't wait to celebrate you, Usha!",
    date: "2026-01-01",
  },
  {
    id: "m2",
    author: "A Longtime Friend",
    message:
      "Your kindness has touched so many people. Here's to many more years of joy together.",
    date: "2026-01-02",
  },
];

/** Server-side fetch of approved memories. Falls back to mocks if env is missing. */
export async function getMemories(): Promise<Memory[]> {
  if (!isSupabaseConfigured()) {
    return MOCK_MEMORIES;
  }

  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("memories")
    .select("id, author, message, photo_url, video_url, created_at")
    .eq("approved", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load memories:", error.message);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    author: row.author || "Guest",
    message: row.message,
    photoUrl: row.photo_url ?? undefined,
    videoUrl: row.video_url ?? undefined,
    date: row.created_at,
  }));
}
