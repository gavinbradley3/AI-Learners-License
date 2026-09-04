import { MODULE_IDS } from "../types";
import type { MasteryProgressState, ModuleId, ProgressState } from "../types";

export function createInitialMasteryState(status: MasteryProgressState["status"]): MasteryProgressState {
  return {
    status,
    phase: "content",
    contentScreenIndex: 0,
    contentComplete: false,
    seenQuestionIds: [],
    lastAttemptIds: [],
    lastMissedConcepts: [],
    attemptCount: 0,
    currentAttempt: null,
    correctionQueue: null,
  };
}

export function createInitialProgressState(): ProgressState {
  const modules = MODULE_IDS.reduce(
    (acc, id, index) => {
      acc[id] = createInitialMasteryState(index === 0 ? "available" : "locked");
      return acc;
    },
    {} as Record<ModuleId, MasteryProgressState>,
  );

  return {
    version: 1,
    screen: "welcome",
    preCheck: { status: "notStarted", answers: [], score: null },
    modules,
    final: createInitialMasteryState("locked"),
    exitSurvey: { completed: false, q1: null, q2: null, q3: null, q4: null, q5: "" },
    licenceEarned: false,
  };
}
