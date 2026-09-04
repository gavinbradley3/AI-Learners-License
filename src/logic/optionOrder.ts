/**
 * Deterministic, seeded shuffling of answer options.
 *
 * Answer order is randomised at presentation time so students can't pass by spotting
 * a positional pattern. Two properties matter and are covered by tests:
 *
 * 1. The correct answer's *identity* survives the shuffle — whole option objects move
 *    together, so each option's feedback stays attached to it. Scoring never uses a
 *    letter or a fixed position.
 * 2. The order is a pure function of the seed, so refreshing the browser mid-question
 *    reproduces exactly the same order without persisting anything. Seeds are built
 *    from values already stored in progress (question id + attempt count), which also
 *    means a retry of the same question gets a fresh order.
 */

/** FNV-1a style 32-bit string hash — small, stable, and good enough to seed a PRNG. */
function hashSeed(seed: string): number {
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/** mulberry32 — tiny deterministic PRNG. */
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface PresentedOptions<T> {
  /** Options in the order they should be displayed. */
  options: T[];
  /** Index of the correct answer *within the displayed order*. */
  correctIndex: number;
  /** sourceIndex[displayedPosition] = the option's authored index. */
  sourceIndex: number[];
}

/**
 * Returns the options reordered for display, with the correct answer's new position.
 * Passing the same seed always produces the same order.
 */
export function presentOptions<T>(
  options: readonly T[],
  correctIndex: number,
  seed: string,
): PresentedOptions<T> {
  const rng = mulberry32(hashSeed(seed));
  const order = options.map((_, i) => i);

  for (let i = order.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }

  return {
    options: order.map((sourceIdx) => options[sourceIdx]),
    correctIndex: order.indexOf(correctIndex),
    sourceIndex: order,
  };
}

/**
 * Options whose order carries meaning and must never be shuffled: reversing
 * "Yes / No" or "True / False" reads as a mistake rather than as randomisation.
 */
const FIXED_ORDER_TOKENS = new Set(["yes", "no", "true", "false"]);

export function hasFixedOrder(options: readonly string[]): boolean {
  return options.some((option) =>
    FIXED_ORDER_TOKENS.has(option.trim().toLowerCase().replace(/[.!?]+$/, "")),
  );
}
