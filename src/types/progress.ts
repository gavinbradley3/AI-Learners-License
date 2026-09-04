import type { ModuleId } from "./content";

export type AppScreen =
  | "welcome"
  | "preCheck"
  | "courseMap"
  | ModuleId
  | "final"
  | "licence"
  | "exitSurvey"
  | "pilotSummary";

export interface ResolvedAnswer {
  questionId: string;
  correct: boolean;
}

export interface QuizAttemptState {
  questionIds: readonly string[];
  answers: readonly ResolvedAnswer[];
}

export type MasteryPhase = "content" | "quiz" | "corrections" | "review" | "cleared";

export interface MasteryProgressState {
  status: "locked" | "available" | "inProgress" | "cleared";
  phase: MasteryPhase;
  contentScreenIndex: number;
  contentComplete: boolean;
  seenQuestionIds: readonly string[];
  lastAttemptIds: readonly string[];
  lastMissedConcepts: readonly string[];
  attemptCount: number;
  currentAttempt: QuizAttemptState | null;
  /**
   * Score of the most recently finished attempt. Additive and optional: progress saved
   * before this field existed loads with it undefined.
   */
  lastScore?: number;
  lastTotal?: number;
  /** Question IDs still needing a correct correction answer for the current passing/failing attempt. */
  correctionQueue: readonly string[] | null;
}

export interface PreCheckState {
  status: "notStarted" | "skipped" | "completed";
  answers: readonly ResolvedAnswer[];
  score: number | null;
}

export type LikertAnswer = "stronglyAgree" | "agree" | "notSure" | "disagree";
export type UsefulnessAnswer = "veryUseful" | "somewhatUseful" | "notVeryUseful" | "notUseful";

export interface ExitSurveyState {
  completed: boolean;
  q1: LikertAnswer | null;
  q2: LikertAnswer | null;
  q3: LikertAnswer | null;
  q4: UsefulnessAnswer | null;
  q5: string;
}

/**
 * Generated on this device the moment the final challenge clears. The number is random
 * and carries no information about the student — it exists so a licence looks like a
 * real credential and so a teacher can tell two printouts apart, nothing more.
 */
export interface LicenceRecord {
  number: string;
  /** ISO date (YYYY-MM-DD) in the device's own timezone. */
  issuedOn: string;
}

export interface ProgressState {
  version: 1;
  screen: AppScreen;
  preCheck: PreCheckState;
  modules: Record<ModuleId, MasteryProgressState>;
  final: MasteryProgressState;
  exitSurvey: ExitSurveyState;
  licenceEarned: boolean;
  /**
   * Additive optional fields. Progress saved before these existed parses fine and simply
   * has them undefined, so no storage migration and no version bump.
   */
  licence?: LicenceRecord | null;
  /** Random local id, used only if a teacher configures exit-survey submission. */
  sessionId?: string;
}

export const STORAGE_KEY = "aiLearnerLicence:v1";
