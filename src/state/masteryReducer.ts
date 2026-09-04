import type { MasteryProgressState } from "../types";
import { buildCorrectionQueue, determineOutcome, summarizeAttempt } from "../logic/mastery";
import type { MasteryEngine } from "./masteryEngine";

export type MasteryAction =
  | { kind: "advanceContent"; index: number }
  | { kind: "startQuiz" }
  | { kind: "answerQuestion"; questionId: string; correct: boolean }
  | { kind: "clearCorrection"; questionId: string };

/** Pure reducer shared by every module and the final challenge — both are a MasteryProgressState. */
export function masteryReducer(
  state: MasteryProgressState,
  action: MasteryAction,
  engine: MasteryEngine,
): MasteryProgressState {
  switch (action.kind) {
    case "advanceContent": {
      return {
        ...state,
        status: state.status === "available" ? "inProgress" : state.status,
        contentScreenIndex: action.index,
      };
    }

    case "startQuiz": {
      const questionIds = engine.select(
        state.seenQuestionIds,
        state.lastMissedConcepts,
        state.lastAttemptIds,
      );
      return {
        ...state,
        status: state.status === "available" ? "inProgress" : state.status,
        phase: "quiz",
        contentComplete: true,
        currentAttempt: { questionIds, answers: [] },
      };
    }

    case "answerQuestion": {
      if (!state.currentAttempt) return state;
      const answers = [
        ...state.currentAttempt.answers,
        { questionId: action.questionId, correct: action.correct },
      ];
      const seenQuestionIds = state.seenQuestionIds.includes(action.questionId)
        ? state.seenQuestionIds
        : [...state.seenQuestionIds, action.questionId];

      if (answers.length < state.currentAttempt.questionIds.length) {
        return { ...state, seenQuestionIds, currentAttempt: { ...state.currentAttempt, answers } };
      }

      // Attempt complete: score it and build the correction queue.
      const summary = summarizeAttempt(answers, engine.passThreshold);
      const missedConcepts = summary.missedQuestionIds
        .map((id) => engine.bank.find((q) => q.id === id)?.concept ?? "")
        .filter(Boolean);
      const correctionQueue = buildCorrectionQueue(summary.missedQuestionIds);
      const base = {
        ...state,
        seenQuestionIds,
        attemptCount: state.attemptCount + 1,
        lastAttemptIds: state.currentAttempt.questionIds,
        lastMissedConcepts: missedConcepts,
        lastScore: summary.correctCount,
        lastTotal: answers.length,
      };

      if (correctionQueue.length === 0) {
        // Perfect attempt: nothing to correct, clears immediately.
        return { ...base, phase: "cleared", status: "cleared", currentAttempt: null, correctionQueue: null };
      }

      return {
        ...base,
        phase: "corrections",
        currentAttempt: { ...state.currentAttempt, answers },
        correctionQueue,
      };
    }

    case "clearCorrection": {
      if (!state.correctionQueue) return state;
      const remaining = state.correctionQueue.filter((id) => id !== action.questionId);
      if (remaining.length > 0) {
        return { ...state, correctionQueue: remaining };
      }

      // Every correction from this attempt is cleared: finalize cleared vs. review+retry.
      const answers = state.currentAttempt?.answers ?? [];
      const summary = summarizeAttempt(answers, engine.passThreshold);
      const outcome = determineOutcome(summary.passed);

      if (outcome === "cleared") {
        return { ...state, phase: "cleared", status: "cleared", currentAttempt: null, correctionQueue: null };
      }
      return { ...state, phase: "review", currentAttempt: null, correctionQueue: null };
    }

    default:
      return state;
  }
}
