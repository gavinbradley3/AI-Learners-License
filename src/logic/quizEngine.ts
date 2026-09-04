import type { FinalCategory, FinalQuestion, ModuleQuestion } from "../types";

export type RngFn = () => number;

function shuffle<T>(items: readonly T[], rng: RngFn): T[] {
  const copy = items.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

interface Taggable {
  id: string;
  concept: string;
}

/**
 * Orders candidate ids into priority tiers per BUILD_SPEC §20:
 * 1. unseen questions matching a previously-missed concept
 * 2. other unseen questions
 * 3. seen questions matching a previously-missed concept
 * 4. remaining seen questions
 * Each tier is internally shuffled so repeated calls don't always pick the same items.
 */
function tieredCandidateOrder<T extends Taggable>(
  pool: readonly T[],
  seenIds: ReadonlySet<string>,
  missedConcepts: ReadonlySet<string>,
  rng: RngFn,
): string[] {
  const unseenMissed: T[] = [];
  const unseenOther: T[] = [];
  const seenMissed: T[] = [];
  const seenOther: T[] = [];

  for (const item of pool) {
    const isSeen = seenIds.has(item.id);
    const isMissed = missedConcepts.has(item.concept);
    if (!isSeen && isMissed) unseenMissed.push(item);
    else if (!isSeen) unseenOther.push(item);
    else if (isMissed) seenMissed.push(item);
    else seenOther.push(item);
  }

  return [
    ...shuffle(unseenMissed, rng),
    ...shuffle(unseenOther, rng),
    ...shuffle(seenMissed, rng),
    ...shuffle(seenOther, rng),
  ].map((item) => item.id);
}

/** Swap the selection away from an exact repeat of the previous attempt's set, if any alternative exists. */
function avoidExactRepeat(
  selected: string[],
  previousSetIds: readonly string[] | undefined,
  fullPriorityOrder: readonly string[],
): string[] {
  if (!previousSetIds || previousSetIds.length === 0) return selected;
  const selectedSet = new Set(selected);
  const previousSet = new Set(previousSetIds);
  const isExactRepeat =
    selectedSet.size === previousSet.size &&
    [...selectedSet].every((id) => previousSet.has(id));
  if (!isExactRepeat) return selected;

  const alternative = fullPriorityOrder.find((id) => !selectedSet.has(id));
  if (!alternative) return selected; // unavoidable: no other candidate exists

  const swapped = selected.slice(0, -1);
  swapped.push(alternative);
  return swapped;
}

export interface SelectModuleQuestionsInput {
  bank: readonly ModuleQuestion[];
  seenQuestionIds: readonly string[];
  missedConcepts: readonly string[];
  previousSetIds?: readonly string[];
  size?: number;
  rng?: RngFn;
}

/** Selects the next 5-question attempt for a module's 8-question mastery bank. */
export function selectModuleQuestions({
  bank,
  seenQuestionIds,
  missedConcepts,
  previousSetIds,
  size = 5,
  rng = Math.random,
}: SelectModuleQuestionsInput): string[] {
  const seenIds = new Set(seenQuestionIds);
  const missed = new Set(missedConcepts);
  const order = tieredCandidateOrder(bank, seenIds, missed, rng);
  const selected = order.slice(0, Math.min(size, order.length));
  return avoidExactRepeat(selected, previousSetIds, order);
}

const FINAL_CATEGORY_TARGETS: Record<string, { categories: FinalCategory[]; count: number }> = {
  support: { categories: ["support"], count: 3 },
  tutor: { categories: ["tutor"], count: 2 },
  verification: { categories: ["verification"], count: 3 },
  permission: { categories: ["permission"], count: 2 },
  privacy: { categories: ["privacy"], count: 1 },
  integratedJudgment: { categories: ["responsibility", "integrated"], count: 1 },
};

export interface SelectFinalQuestionsInput {
  bank: readonly FinalQuestion[];
  seenQuestionIds: readonly string[];
  missedConcepts: readonly string[];
  previousSetIds?: readonly string[];
  size?: number;
  rng?: RngFn;
}

/**
 * Selects the next 12-question final challenge from the 20-question bank, trying to hit the
 * category composition in BUILD_SPEC §22. Degrades gracefully (never blocks) if a category
 * bucket runs short, per §20's "simple category-tag algorithm, do not hardcode one fixed exam".
 */
export function selectFinalQuestions({
  bank,
  seenQuestionIds,
  missedConcepts,
  previousSetIds,
  size = 12,
  rng = Math.random,
}: SelectFinalQuestionsInput): string[] {
  const seenIds = new Set(seenQuestionIds);
  const missed = new Set(missedConcepts);
  const byId = new Map(bank.map((q) => [q.id, q]));
  const fullOrder = tieredCandidateOrder(bank, seenIds, missed, rng);

  const selected: string[] = [];
  const selectedSet = new Set<string>();

  for (const bucket of Object.values(FINAL_CATEGORY_TARGETS)) {
    const bucketPool = bank.filter((q) => bucket.categories.includes(q.category));
    const bucketOrder = tieredCandidateOrder(bucketPool, seenIds, missed, rng);
    let taken = 0;
    for (const id of bucketOrder) {
      if (taken >= bucket.count) break;
      if (selectedSet.has(id)) continue;
      selected.push(id);
      selectedSet.add(id);
      taken += 1;
    }
  }

  if (selected.length < size) {
    for (const id of fullOrder) {
      if (selected.length >= size) break;
      if (selectedSet.has(id)) continue;
      selected.push(id);
      selectedSet.add(id);
    }
  }

  const trimmed = selected.slice(0, Math.min(size, selected.length, byId.size));
  return avoidExactRepeat(trimmed, previousSetIds, fullOrder);
}
