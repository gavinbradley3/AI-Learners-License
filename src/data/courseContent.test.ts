import { describe, expect, it } from "vitest";
import { courseContent } from "./courseContent";
import { selectFinalQuestions, selectModuleQuestions } from "../logic/quizEngine";
import { MODULE_IDS } from "../types";

/** Every question whose answer is scored: 5 pre-check, 4 x 8 module, 20 final. */
function allScoredQuestions(): { id: string; optionTexts: string[]; correctIndex: number }[] {
  return [
    // Pre-check options are plain strings; quiz options carry their own feedback.
    ...courseContent.preCheck.map((q) => ({ id: q.id, optionTexts: [...q.options], correctIndex: q.correctIndex })),
    ...MODULE_IDS.flatMap((id) =>
      courseContent.modules[id].quizBank.map((q) => ({
        id: q.id,
        optionTexts: q.options.map((o) => o.text),
        correctIndex: q.correctIndex,
      })),
    ),
    ...courseContent.finalBank.map((q) => ({
      id: q.id,
      optionTexts: q.options.map((o) => o.text),
      correctIndex: q.correctIndex,
    })),
  ];
}

describe("courseContent shape", () => {
  it("has exactly 5 pre-check questions with 4 options each", () => {
    expect(courseContent.preCheck).toHaveLength(5);
    for (const q of courseContent.preCheck) {
      expect(q.options).toHaveLength(4);
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(4);
    }
  });

  it("gives every module an 8-question bank with unique ids and valid corrections", () => {
    for (const id of MODULE_IDS) {
      const module = courseContent.modules[id];
      expect(module.quizBank).toHaveLength(8);
      const ids = module.quizBank.map((q) => q.id);
      expect(new Set(ids).size).toBe(8);
      for (const q of module.quizBank) {
        expect(q.options).toHaveLength(4);
        expect(q.correctIndex).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex).toBeLessThan(4);
        for (const option of q.options) {
          expect(option.feedback.length).toBeGreaterThan(0);
        }
        expect(q.correction.options).toHaveLength(2);
        expect([0, 1]).toContain(q.correction.correctIndex);
        expect(q.concept.length).toBeGreaterThan(0);
      }
    }
  });

  it("has a 20-question final bank matching the §22 category composition", () => {
    expect(courseContent.finalBank).toHaveLength(20);
    const ids = courseContent.finalBank.map((q) => q.id);
    expect(new Set(ids).size).toBe(20);

    const counts: Record<string, number> = {};
    for (const q of courseContent.finalBank) {
      counts[q.category] = (counts[q.category] ?? 0) + 1;
      expect(q.options).toHaveLength(4);
      expect(q.correction.options).toHaveLength(2);
    }

    expect(counts.support).toBeGreaterThanOrEqual(3);
    expect(counts.tutor).toBeGreaterThanOrEqual(2);
    expect(counts.verification).toBeGreaterThanOrEqual(3);
    expect(counts.permission).toBeGreaterThanOrEqual(2);
    expect(counts.privacy).toBeGreaterThanOrEqual(1);
    expect((counts.responsibility ?? 0) + (counts.integrated ?? 0)).toBeGreaterThanOrEqual(1);
  });

  it("never gives two options in the same final-challenge question identical feedback", () => {
    for (const q of courseContent.finalBank) {
      const feedbackTexts = q.options.map((o) => o.feedback);
      expect(new Set(feedbackTexts).size, `${q.id} has duplicate option feedback`).toBe(feedbackTexts.length);
    }
  });

  it("never gives two options in the same module quiz question identical feedback", () => {
    for (const id of MODULE_IDS) {
      for (const q of courseContent.modules[id].quizBank) {
        const feedbackTexts = q.options.map((o) => o.feedback);
        expect(new Set(feedbackTexts).size, `${q.id} has duplicate option feedback`).toBe(feedbackTexts.length);
      }
    }
  });

  it("never gives two options in a module practice (choice) screen identical feedback", () => {
    for (const id of MODULE_IDS) {
      for (const screen of courseContent.modules[id].screens) {
        if (screen.type !== "choice") continue;
        const feedbackTexts = screen.options.map((o) => o.feedback);
        expect(new Set(feedbackTexts).size, `${screen.id} has duplicate option feedback`).toBe(feedbackTexts.length);
      }
    }
  });

  it("never lets answer length give the correct option away", () => {
    // Two length tells were measured in the v1 banks: a correct answer averaging up to
    // 8.8x the distractors, and "pick the longest" working on three questions in four.
    // Shuffling fixes position; only content fixes length, so these bounds are enforced.
    let longest = 0;
    let pickTheLongestWorks = 0;

    for (const q of allScoredQuestions()) {
      const lengths = q.optionTexts.map((text) => text.length);
      const correct = lengths[q.correctIndex];
      const distractors = lengths.filter((_, i) => i !== q.correctIndex);
      const meanDistractor = distractors.reduce((a, b) => a + b, 0) / distractors.length;
      const runnerUp = Math.max(...distractors);

      expect(
        correct / meanDistractor,
        `${q.id}: correct answer is ${(correct / meanDistractor).toFixed(1)}x the mean distractor length`,
      ).toBeLessThan(1.6);

      if (correct > runnerUp) longest += 1;
      if (correct / runnerUp >= 1.15) pickTheLongestWorks += 1;
    }

    const total = allScoredQuestions().length;
    // "Longest by a visible margin" is the tell a student can actually act on.
    expect(pickTheLongestWorks / total, `${pickTheLongestWorks}/${total} questions`).toBeLessThan(0.15);
    // Some correct answers are legitimately more qualified, so this stays a ceiling, not parity.
    expect(longest / total, `${longest}/${total} questions`).toBeLessThan(0.6);
  });

  it("selects a real module attempt and a real final challenge without error", () => {
    const moduleSelection = selectModuleQuestions({
      bank: courseContent.modules.module1.quizBank,
      seenQuestionIds: [],
      missedConcepts: [],
    });
    expect(moduleSelection).toHaveLength(5);

    const finalSelection = selectFinalQuestions({
      bank: courseContent.finalBank,
      seenQuestionIds: [],
      missedConcepts: [],
    });
    expect(finalSelection).toHaveLength(12);
  });
});
