import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { loadProgress, resetProgress, saveProgress } from "./progressStorage";
import { createInitialProgressState } from "../state/initialState";
import { STORAGE_KEY } from "../types";

describe("progressStorage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("round-trips a valid progress state through localStorage", () => {
    const state = createInitialProgressState();
    state.screen = "module2";
    state.modules.module1.status = "cleared";
    saveProgress(state);

    const loaded = loadProgress();
    expect(loaded).toEqual(state);
  });

  it("returns a fresh state when stored JSON is malformed", () => {
    window.localStorage.setItem(STORAGE_KEY, "{not valid json");
    const loaded = loadProgress();
    expect(loaded).toEqual(createInitialProgressState());
  });

  it("returns a fresh state on a storage version mismatch", () => {
    const state = { ...createInitialProgressState(), version: 2 };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    const loaded = loadProgress();
    expect(loaded).toEqual(createInitialProgressState());
    expect(loaded.version).toBe(1);
  });

  it("returns a fresh state when required shape is missing", () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1 }));
    const loaded = loadProgress();
    expect(loaded).toEqual(createInitialProgressState());
  });

  it("still loads progress saved before the licence and session fields existed", () => {
    // The v1.1 fields are additive and optional; a v1 save must survive untouched rather
    // than being thrown away and resetting a student mid-course.
    const older = createInitialProgressState();
    delete (older as { licence?: unknown }).licence;
    delete (older as { sessionId?: unknown }).sessionId;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...older, screen: "module3" }));

    const loaded = loadProgress();
    expect(loaded.screen).toBe("module3");
    expect(loaded.licence).toBeUndefined();
    expect(loaded.sessionId).toBeUndefined();
  });

  it("clears stored progress on reset", () => {
    saveProgress({ ...createInitialProgressState(), screen: "final" });
    resetProgress();
    expect(loadProgress().screen).toBe("welcome");
    expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  describe("when localStorage is unavailable", () => {
    const original = window.localStorage;

    beforeEach(() => {
      Object.defineProperty(window, "localStorage", {
        configurable: true,
        value: {
          getItem(): never {
            throw new Error("blocked");
          },
          setItem(): never {
            throw new Error("blocked");
          },
          removeItem(): never {
            throw new Error("blocked");
          },
          clear(): never {
            throw new Error("blocked");
          },
        },
      });
    });

    afterEach(() => {
      Object.defineProperty(window, "localStorage", { configurable: true, value: original });
    });

    it("does not crash and keeps working in memory for the session", () => {
      expect(() => loadProgress()).not.toThrow();
      const state = { ...createInitialProgressState(), screen: "courseMap" as const };
      expect(() => saveProgress(state)).not.toThrow();
      expect(loadProgress()).toEqual(state);
    });
  });
});
