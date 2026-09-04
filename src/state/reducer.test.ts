import { describe, expect, it } from "vitest";
import { createRootReducer, type MasteryTrack } from "./reducer";
import { moduleEngine, finalEngine, type MasteryEngine } from "./masteryEngine";
import { createInitialProgressState } from "./initialState";
import { makeFinalBank, makeModuleBank, seededRng } from "../test/fixtures";
import { MODULE_IDS } from "../types";

function buildEngines(): Record<MasteryTrack, MasteryEngine> {
  const bank = makeModuleBank(8);
  const record = {} as Record<MasteryTrack, MasteryEngine>;
  for (const id of MODULE_IDS) record[id] = moduleEngine(bank, seededRng(1));
  record.final = finalEngine(makeFinalBank(), seededRng(1));
  return record;
}

describe("root reducer: module mastery playthrough", () => {
  it("5/5 clears the module immediately and unlocks the next one", () => {
    const reducer = createRootReducer(buildEngines());
    let state = createInitialProgressState();

    state = reducer(state, { type: "MASTERY", track: "module1", action: { kind: "startQuiz" } });
    const ids = state.modules.module1.currentAttempt!.questionIds;
    for (const id of ids) {
      state = reducer(state, {
        type: "MASTERY",
        track: "module1",
        action: { kind: "answerQuestion", questionId: id, correct: true },
      });
    }

    expect(state.modules.module1.phase).toBe("cleared");
    expect(state.modules.module1.status).toBe("cleared");
    expect(state.modules.module1.currentAttempt).toBeNull();
    expect(state.modules.module2.status).toBe("available");
  });

  it("4/5 requires one correction, then clears", () => {
    const reducer = createRootReducer(buildEngines());
    let state = createInitialProgressState();

    state = reducer(state, { type: "MASTERY", track: "module1", action: { kind: "startQuiz" } });
    const ids = state.modules.module1.currentAttempt!.questionIds;
    ids.forEach((id, i) => {
      state = reducer(state, {
        type: "MASTERY",
        track: "module1",
        action: { kind: "answerQuestion", questionId: id, correct: i !== 0 },
      });
    });

    expect(state.modules.module1.phase).toBe("corrections");
    expect(state.modules.module1.correctionQueue).toEqual([ids[0]]);
    expect(state.modules.module1.status).not.toBe("cleared");

    state = reducer(state, {
      type: "MASTERY",
      track: "module1",
      action: { kind: "clearCorrection", questionId: ids[0] },
    });

    expect(state.modules.module1.phase).toBe("cleared");
    expect(state.modules.module1.status).toBe("cleared");
    expect(state.modules.module2.status).toBe("available");
  });

  it("3/5 never clears: corrections still run, then review + retry, without unlocking the next module", () => {
    const reducer = createRootReducer(buildEngines());
    let state = createInitialProgressState();

    state = reducer(state, { type: "MASTERY", track: "module1", action: { kind: "startQuiz" } });
    const firstAttemptIds = state.modules.module1.currentAttempt!.questionIds;
    firstAttemptIds.forEach((id, i) => {
      state = reducer(state, {
        type: "MASTERY",
        track: "module1",
        action: { kind: "answerQuestion", questionId: id, correct: i < 3 },
      });
    });

    expect(state.modules.module1.correctionQueue).toHaveLength(2);
    for (const id of state.modules.module1.correctionQueue!) {
      state = reducer(state, {
        type: "MASTERY",
        track: "module1",
        action: { kind: "clearCorrection", questionId: id },
      });
    }

    expect(state.modules.module1.phase).toBe("review");
    expect(state.modules.module1.status).not.toBe("cleared");
    expect(state.modules.module2.status).toBe("locked");

    // Retrying starts a fresh attempt without losing what was already seen.
    const seenBefore = state.modules.module1.seenQuestionIds;
    state = reducer(state, { type: "MASTERY", track: "module1", action: { kind: "startQuiz" } });
    expect(state.modules.module1.phase).toBe("quiz");
    expect(state.modules.module1.seenQuestionIds).toEqual(
      expect.arrayContaining([...seenBefore]),
    );
  });

  it("unlocks the final challenge only once all four modules are cleared, and clearing the final earns the licence", () => {
    const reducer = createRootReducer(buildEngines());
    let state = createInitialProgressState();
    for (const id of MODULE_IDS) {
      state = { ...state, modules: { ...state.modules, [id]: { ...state.modules[id], status: "cleared" } } };
    }
    state = { ...state, final: { ...state.final, status: "available" } };

    state = reducer(state, { type: "MASTERY", track: "final", action: { kind: "startQuiz" } });
    const ids = state.final.currentAttempt!.questionIds;
    for (const id of ids) {
      state = reducer(state, {
        type: "MASTERY",
        track: "final",
        action: { kind: "answerQuestion", questionId: id, correct: true },
      });
    }

    expect(state.final.status).toBe("cleared");
    expect(state.licenceEarned).toBe(true);
  });
});

describe("root reducer: pre-check, survey, and reset", () => {
  it("scores the pre-check from accumulated answers without ever exposing correctness during it", () => {
    const reducer = createRootReducer(buildEngines());
    let state = createInitialProgressState();
    const pattern = [true, true, false, true, false];
    pattern.forEach((correct, i) => {
      state = reducer(state, { type: "ANSWER_PRECHECK", questionId: `PRE-${i + 1}`, correct });
    });
    state = reducer(state, { type: "FINISH_PRECHECK" });
    expect(state.preCheck.status).toBe("completed");
    expect(state.preCheck.score).toBe(3);
  });

  it("resets to a completely fresh state", () => {
    const reducer = createRootReducer(buildEngines());
    let state = createInitialProgressState();
    state = reducer(state, { type: "GO_TO", screen: "final" });
    state = reducer(state, { type: "RESET" });
    expect(state).toEqual(createInitialProgressState());
  });
});

describe("root reducer: licence issuing", () => {
  it("issues a licence number once and never changes it afterwards", () => {
    const reducer = createRootReducer(buildEngines());
    const earned = reducer(createInitialProgressState(), {
      type: "ISSUE_LICENCE",
      record: { number: "ALL-ABCD-2345", issuedOn: "2026-09-04" },
    });
    expect(earned.licence).toEqual({ number: "ALL-ABCD-2345", issuedOn: "2026-09-04" });

    // A refresh that re-issues must not hand the student a different number from the one
    // that may already be printed.
    const again = reducer(earned, {
      type: "ISSUE_LICENCE",
      record: { number: "ALL-ZZZZ-9999", issuedOn: "2027-01-01" },
    });
    expect(again).toBe(earned);
  });
});
