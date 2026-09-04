import { QUESTION_PATTERNS, type FinalCategory, type FinalQuestion, type ModuleQuestion } from "../types";

/** Deterministic PRNG (mulberry32) so selection tests are reproducible. */
export function seededRng(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeOption(text: string) {
  return { text, feedback: `Feedback for ${text}` };
}

export function makeModuleBank(count = 8): ModuleQuestion[] {
  const concepts = ["support_vs_replacement", "verification", "privacy", "permission_context"];
  return Array.from({ length: count }, (_, i) => ({
    id: `M1-Q${i + 1}`,
    moduleId: "module1" as const,
    pattern: QUESTION_PATTERNS[i % QUESTION_PATTERNS.length],
    stem: `Question stem ${i + 1}`,
    options: [
      makeOption("A"),
      makeOption("B"),
      makeOption("C"),
      makeOption("D"),
    ] as const,
    correctIndex: (i % 4) as 0 | 1 | 2 | 3,
    concept: concepts[i % concepts.length],
    correction: {
      prompt: `Correction prompt ${i + 1}`,
      options: ["A", "B"] as const,
      correctIndex: 0 as const,
    },
  }));
}

export function makeFinalBank(): FinalQuestion[] {
  const layout: FinalCategory[] = [
    "support",
    "support",
    "support",
    "support",
    "support",
    "tutor",
    "tutor",
    "tutor",
    "tutor",
    "verification",
    "verification",
    "verification",
    "verification",
    "verification",
    "permission",
    "permission",
    "permission",
    "privacy",
    "responsibility",
    "integrated",
  ];
  return layout.map((category, i) => ({
    id: `F${i + 1}`,
    pattern: QUESTION_PATTERNS[i % QUESTION_PATTERNS.length],
    stem: `Final stem ${i + 1}`,
    options: [
      makeOption("A"),
      makeOption("B"),
      makeOption("C"),
      makeOption("D"),
    ] as const,
    correctIndex: (i % 4) as 0 | 1 | 2 | 3,
    concept: `concept_${i + 1}`,
    category,
    correction: {
      prompt: `Final correction ${i + 1}`,
      options: ["A", "B"] as const,
      correctIndex: 0 as const,
    },
  }));
}
