import { STORAGE_KEY } from "../types";
import type { ProgressState } from "../types";
import { createInitialProgressState } from "../state/initialState";

let memoryFallback: ProgressState | null = null;

function getLocalStorage(): Storage | null {
  try {
    if (typeof window === "undefined" || !window.localStorage) return null;
    const probeKey = "__aiLearnerLicence_probe__";
    window.localStorage.setItem(probeKey, "1");
    window.localStorage.removeItem(probeKey);
    return window.localStorage;
  } catch {
    return null;
  }
}

/** Loose structural check: enough to catch malformed JSON, wrong version, and missing top-level shape. */
function isPlausibleProgressState(value: unknown): value is ProgressState {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;
  if (candidate.version !== 1) return false;
  if (typeof candidate.screen !== "string") return false;
  if (typeof candidate.preCheck !== "object" || candidate.preCheck === null) return false;
  if (typeof candidate.modules !== "object" || candidate.modules === null) return false;
  if (typeof candidate.final !== "object" || candidate.final === null) return false;
  if (typeof candidate.exitSurvey !== "object" || candidate.exitSurvey === null) return false;
  if (typeof candidate.licenceEarned !== "boolean") return false;
  const modules = candidate.modules as Record<string, unknown>;
  for (const id of ["module1", "module2", "module3", "module4"]) {
    if (typeof modules[id] !== "object" || modules[id] === null) return false;
  }
  return true;
}

export function loadProgress(): ProgressState {
  const storage = getLocalStorage();
  if (!storage) {
    return memoryFallback ?? createInitialProgressState();
  }

  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return createInitialProgressState();
    const parsed: unknown = JSON.parse(raw);
    if (!isPlausibleProgressState(parsed)) {
      return createInitialProgressState();
    }
    return parsed;
  } catch {
    return createInitialProgressState();
  }
}

export function saveProgress(state: ProgressState): void {
  const storage = getLocalStorage();
  if (!storage) {
    memoryFallback = state;
    return;
  }

  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Quota exceeded or storage blocked mid-session: keep going in memory rather than crash.
    memoryFallback = state;
  }
}

export function resetProgress(): ProgressState {
  const fresh = createInitialProgressState();
  const storage = getLocalStorage();
  if (storage) {
    try {
      storage.removeItem(STORAGE_KEY);
    } catch {
      // ignore; fall through to memory fallback below
    }
  }
  memoryFallback = fresh;
  return fresh;
}
