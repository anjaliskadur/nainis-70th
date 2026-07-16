const STORAGE_KEY = "usha70-owned-memories";

export type OwnedMemory = {
  id: string;
  token: string;
};

function readAll(): OwnedMemory[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as OwnedMemory[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAll(items: OwnedMemory[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function rememberOwnedMemory(entry: OwnedMemory) {
  const next = readAll().filter((item) => item.id !== entry.id);
  next.push(entry);
  writeAll(next);
}

export function forgetOwnedMemory(id: string) {
  writeAll(readAll().filter((item) => item.id !== id));
}

export function getOwnedMemoryToken(id: string): string | null {
  return readAll().find((item) => item.id === id)?.token ?? null;
}

export function listOwnedMemoryIds(): string[] {
  return readAll().map((item) => item.id);
}
