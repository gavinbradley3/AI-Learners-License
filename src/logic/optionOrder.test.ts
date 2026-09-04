import { describe, expect, it } from "vitest";
import { hasFixedOrder, presentOptions } from "./optionOrder";

const options = [
  { text: "A-authored", feedback: "feedback-for-A" },
  { text: "B-authored", feedback: "feedback-for-B" },
  { text: "C-authored", feedback: "feedback-for-C" },
  { text: "D-authored", feedback: "feedback-for-D" },
];

describe("presentOptions", () => {
  it("keeps the correct answer's identity and its own feedback after shuffling", () => {
    for (let i = 0; i < 200; i += 1) {
      const authoredCorrect = i % 4;
      const result = presentOptions(options, authoredCorrect, `question-${i}`);

      // The option now sitting at the reported correct position is the same object
      // that was authored as correct — text and feedback travelled together.
      expect(result.options[result.correctIndex]).toBe(options[authoredCorrect]);
      expect(result.options[result.correctIndex].feedback).toBe(options[authoredCorrect].feedback);
      expect(result.sourceIndex[result.correctIndex]).toBe(authoredCorrect);
    }
  });

  it("is a permutation — every option appears exactly once", () => {
    const result = presentOptions(options, 1, "seed");
    expect(result.options).toHaveLength(options.length);
    expect(new Set(result.options)).toEqual(new Set(options));
    expect([...result.sourceIndex].sort()).toEqual([0, 1, 2, 3]);
  });

  it("every displayed option keeps its own feedback, not a neighbour's", () => {
    const result = presentOptions(options, 2, "seed-xyz");
    result.options.forEach((option, displayed) => {
      expect(option).toBe(options[result.sourceIndex[displayed]]);
    });
  });

  it("returns the identical order for the same seed (survives a browser refresh)", () => {
    const first = presentOptions(options, 0, "M1-Q3:0");
    const second = presentOptions(options, 0, "M1-Q3:0");
    expect(second.sourceIndex).toEqual(first.sourceIndex);
    expect(second.correctIndex).toBe(first.correctIndex);
  });

  it("gives a different order on a retry, since the attempt number is part of the seed", () => {
    const attempt0 = presentOptions(options, 0, "M1-Q3:0");
    const laterAttempts = [1, 2, 3, 4].map((n) => presentOptions(options, 0, `M1-Q3:${n}`));
    expect(laterAttempts.some((r) => r.sourceIndex.join() !== attempt0.sourceIndex.join())).toBe(true);
  });

  it("spreads the correct answer across all four positions instead of favouring B and C", () => {
    const counts = [0, 0, 0, 0];
    const samples = 4000;
    for (let i = 0; i < samples; i += 1) {
      // Authored correct answer is always index 2 — the pre-shuffle bias this fixes.
      counts[presentOptions(options, 2, `q-${i}`).correctIndex] += 1;
    }
    const expected = samples / 4;
    counts.forEach((count) => {
      expect(count).toBeGreaterThan(expected * 0.85);
      expect(count).toBeLessThan(expected * 1.15);
    });
  });
});

describe("hasFixedOrder", () => {
  it("protects option pairs whose order carries meaning", () => {
    expect(hasFixedOrder(["Yes", "No"])).toBe(true);
    expect(hasFixedOrder(["True", "False"])).toBe(true);
    expect(hasFixedOrder(["no", "yes"])).toBe(true);
  });

  it("allows phrase pairs to be shuffled", () => {
    expect(hasFixedOrder(["Ask before using it", "Assume it's fine since it isn't banned"])).toBe(false);
    expect(hasFixedOrder(["Outside the boundary", "Fine — the teacher already said AI is allowed"])).toBe(false);
  });
});
