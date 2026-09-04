import { describe, expect, it } from "vitest";
import {
  FINAL_PASS_THRESHOLD,
  MODULE_PASS_THRESHOLD,
  buildCorrectionQueue,
  determineOutcome,
  summarizeAttempt,
} from "./mastery";
import type { ResolvedAnswer } from "../types";

function answers(pattern: boolean[]): ResolvedAnswer[] {
  return pattern.map((correct, i) => ({ questionId: `Q${i + 1}`, correct }));
}

describe("summarizeAttempt (module, 5-question)", () => {
  it("5/5 passes with no missed questions", () => {
    const summary = summarizeAttempt(answers([true, true, true, true, true]), MODULE_PASS_THRESHOLD);
    expect(summary.correctCount).toBe(5);
    expect(summary.passed).toBe(true);
    expect(summary.missedQuestionIds).toEqual([]);
  });

  it("4/5 passes and requires one correction", () => {
    const summary = summarizeAttempt(answers([true, true, true, true, false]), MODULE_PASS_THRESHOLD);
    expect(summary.correctCount).toBe(4);
    expect(summary.passed).toBe(true);
    expect(summary.missedQuestionIds).toEqual(["Q5"]);
  });

  it("3/5 never passes and triggers review + retry", () => {
    const summary = summarizeAttempt(answers([true, true, true, false, false]), MODULE_PASS_THRESHOLD);
    expect(summary.correctCount).toBe(3);
    expect(summary.passed).toBe(false);
    expect(determineOutcome(summary.passed)).toBe("reviewThenRetry");
  });
});

describe("summarizeAttempt (final, 12-question)", () => {
  it("12/12 clears", () => {
    const summary = summarizeAttempt(answers(new Array(12).fill(true)), FINAL_PASS_THRESHOLD);
    expect(summary.passed).toBe(true);
    expect(summary.missedQuestionIds).toHaveLength(0);
  });

  it("10/12 requires exactly two corrections then clears", () => {
    const pattern = new Array(12).fill(true);
    pattern[3] = false;
    pattern[9] = false;
    const summary = summarizeAttempt(answers(pattern), FINAL_PASS_THRESHOLD);
    expect(summary.correctCount).toBe(10);
    expect(summary.passed).toBe(true);
    expect(summary.missedQuestionIds).toHaveLength(2);
  });

  it("9/12 triggers a retry", () => {
    const pattern = new Array(12).fill(true);
    [1, 2, 3].forEach((i) => (pattern[i] = false));
    const summary = summarizeAttempt(answers(pattern), FINAL_PASS_THRESHOLD);
    expect(summary.correctCount).toBe(9);
    expect(summary.passed).toBe(false);
  });
});

describe("buildCorrectionQueue", () => {
  it("deduplicates by question id while preserving first-seen order", () => {
    const queue = buildCorrectionQueue(["Q3", "Q1", "Q3", "Q5"]);
    expect(queue).toEqual(["Q3", "Q1", "Q5"]);
  });

  it("corrections never change the numeric score, only gate clearing", () => {
    const summary = summarizeAttempt(answers([true, true, true, true, false]), MODULE_PASS_THRESHOLD);
    const queue = buildCorrectionQueue(summary.missedQuestionIds);
    // Clearing corrections is tracked separately from correctCount; score stays fixed.
    expect(summary.correctCount).toBe(4);
    expect(queue).toEqual(["Q5"]);
  });
});

describe("determineOutcome", () => {
  it("maps a passing attempt to cleared once corrections are done", () => {
    expect(determineOutcome(true)).toBe("cleared");
  });

  it("maps a failing attempt to reviewThenRetry", () => {
    expect(determineOutcome(false)).toBe("reviewThenRetry");
  });
});
