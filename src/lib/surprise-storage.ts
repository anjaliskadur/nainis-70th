/**
 * Tracks whether the guest has acknowledged the surprise reminder.
 * Persisted in localStorage so the modal doesn't reappear once dismissed
 * with "Got it". "Tell me again" leaves this unset so it reopens.
 */

const STORAGE_KEY = "usha70-surprise-acknowledged";

export function hasAcknowledgedSurprise(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function acknowledgeSurprise(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, "true");
  } catch {
    /* ignore storage errors (private mode, etc.) */
  }
}
