import type { FinalQuestion, ModuleQuestion } from "../types";
import {
  FINAL_PASS_THRESHOLD,
  FINAL_QUIZ_SIZE,
  MODULE_PASS_THRESHOLD,
  MODULE_QUIZ_SIZE,
} from "../logic/mastery";
import { selectFinalQuestions, selectModuleQuestions, type RngFn } from "../logic/quizEngine";

export interface MasteryEngine {
  bank: readonly (ModuleQuestion | FinalQuestion)[];
  passThreshold: number;
  select(
    seenIds: readonly string[],
    missedConcepts: readonly string[],
    previousSetIds: readonly string[],
  ): string[];
}

export function moduleEngine(bank: readonly ModuleQuestion[], rng?: RngFn): MasteryEngine {
  return {
    bank,
    passThreshold: MODULE_PASS_THRESHOLD,
    select: (seenIds, missedConcepts, previousSetIds) =>
      selectModuleQuestions({
        bank,
        seenQuestionIds: seenIds,
        missedConcepts,
        previousSetIds,
        size: MODULE_QUIZ_SIZE,
        rng,
      }),
  };
}

export function finalEngine(bank: readonly FinalQuestion[], rng?: RngFn): MasteryEngine {
  return {
    bank,
    passThreshold: FINAL_PASS_THRESHOLD,
    select: (seenIds, missedConcepts, previousSetIds) =>
      selectFinalQuestions({
        bank,
        seenQuestionIds: seenIds,
        missedConcepts,
        previousSetIds,
        size: FINAL_QUIZ_SIZE,
        rng,
      }),
  };
}
