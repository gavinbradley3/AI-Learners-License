import type { ResolvedAnswer } from "../types";

export const MODULE_QUIZ_SIZE = 5;
export const MODULE_PASS_THRESHOLD = 4;
export const FINAL_QUIZ_SIZE = 12;
export const FINAL_PASS_THRESHOLD = 10;

export interface AttemptSummary {
  correctCount: number;
  total: number;
  /** Question ids missed, in the order they were answered. Already unique: an attempt never repeats a question. */
  missedQuestionIds: string[];
  passed: boolean;
}

export function summarizeAttempt(
  answers: readonly ResolvedAnswer[],
  passThreshold: number,
): AttemptSummary {
  const correctCount = answers.filter((a) => a.correct).length;
  const missedQuestionIds = answers.filter((a) => !a.correct).map((a) => a.questionId);
  return {
    correctCount,
    total: answers.length,
    missedQuestionIds,
    passed: correctCount >= passThreshold,
  };
}

/** Deduplicates missed questions into a correction queue, preserving first-seen order. */
export function buildCorrectionQueue(missedQuestionIds: readonly string[]): string[] {
  return Array.from(new Set(missedQuestionIds));
}

export type MasteryOutcome = "cleared" | "reviewThenRetry";

/**
 * Per BUILD_SPEC §20: a module/final challenge clears only when a single attempt scores at
 * or above the pass threshold AND every correction from that same attempt has been cleared.
 * Call this once the correction queue for the attempt is empty.
 */
export function determineOutcome(passed: boolean): MasteryOutcome {
  return passed ? "cleared" : "reviewThenRetry";
}
