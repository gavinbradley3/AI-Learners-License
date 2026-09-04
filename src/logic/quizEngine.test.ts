import { describe, expect, it } from "vitest";
import { selectFinalQuestions, selectModuleQuestions } from "./quizEngine";
import { makeFinalBank, makeModuleBank, seededRng } from "../test/fixtures";

describe("selectModuleQuestions", () => {
  const bank = makeModuleBank(8);

  it("selects exactly 5 unique questions from an 8-question bank", () => {
    const selected = selectModuleQuestions({
      bank,
      seenQuestionIds: [],
      missedConcepts: [],
      rng: seededRng(1),
    });
    expect(selected).toHaveLength(5);
    expect(new Set(selected).size).toBe(5);
    for (const id of selected) {
      expect(bank.some((q) => q.id === id)).toBe(true);
    }
  });

  it("prioritizes unseen questions when some have already been seen", () => {
    const seen = bank.slice(0, 5).map((q) => q.id); // 5 seen, 3 unseen remain
    const unseenIds = bank.slice(5).map((q) => q.id);
    const selected = selectModuleQuestions({
      bank,
      seenQuestionIds: seen,
      missedConcepts: [],
      rng: seededRng(2),
    });
    for (const id of unseenIds) {
      expect(selected).toContain(id);
    }
  });

  it("handles an exhausted unseen bank by reusing seen questions without duplicating within the attempt", () => {
    const allIds = bank.map((q) => q.id);
    const selected = selectModuleQuestions({
      bank,
      seenQuestionIds: allIds,
      missedConcepts: [],
      rng: seededRng(3),
    });
    expect(selected).toHaveLength(5);
    expect(new Set(selected).size).toBe(5);
  });

  it("avoids repeating the immediately previous 5-question set when an alternative exists", () => {
    const first = selectModuleQuestions({
      bank,
      seenQuestionIds: [],
      missedConcepts: [],
      rng: seededRng(42),
    });
    const second = selectModuleQuestions({
      bank,
      seenQuestionIds: [],
      missedConcepts: [],
      previousSetIds: first,
      rng: seededRng(42), // same seed would otherwise reproduce an identical set
    });
    expect(new Set(second)).not.toEqual(new Set(first));
  });

  it("never duplicates a question inside a single attempt across many seeds", () => {
    for (let seed = 0; seed < 25; seed += 1) {
      const selected = selectModuleQuestions({
        bank,
        seenQuestionIds: [],
        missedConcepts: [],
        rng: seededRng(seed),
      });
      expect(new Set(selected).size).toBe(selected.length);
    }
  });
});

describe("selectFinalQuestions", () => {
  const bank = makeFinalBank();

  it("selects exactly 12 unique questions from a 20-question bank", () => {
    const selected = selectFinalQuestions({
      bank,
      seenQuestionIds: [],
      missedConcepts: [],
      rng: seededRng(7),
    });
    expect(selected).toHaveLength(12);
    expect(new Set(selected).size).toBe(12);
  });

  it("hits the category composition targets when enough candidates exist", () => {
    const selected = selectFinalQuestions({
      bank,
      seenQuestionIds: [],
      missedConcepts: [],
      rng: seededRng(8),
    });
    const byId = new Map(bank.map((q) => [q.id, q]));
    const counts: Record<string, number> = {};
    for (const id of selected) {
      const category = byId.get(id)!.category;
      counts[category] = (counts[category] ?? 0) + 1;
    }
    expect(counts.support).toBe(3);
    expect(counts.tutor).toBe(2);
    expect(counts.verification).toBe(3);
    expect(counts.permission).toBe(2);
    expect(counts.privacy).toBe(1);
    expect((counts.responsibility ?? 0) + (counts.integrated ?? 0)).toBe(1);
  });

  it("never loops indefinitely and always returns a bounded result even with a tiny bank", () => {
    const tinyBank = bank.slice(0, 3);
    const selected = selectFinalQuestions({
      bank: tinyBank,
      seenQuestionIds: [],
      missedConcepts: [],
      rng: seededRng(9),
    });
    expect(selected.length).toBeLessThanOrEqual(3);
    expect(new Set(selected).size).toBe(selected.length);
  });
});
