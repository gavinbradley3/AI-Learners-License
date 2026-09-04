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

export interface ProgressState {
  version: 1;
  screen: AppScreen;
  preCheck: PreCheckState;
  modules: Record<ModuleId, MasteryProgressState>;
  final: MasteryProgressState;
  exitSurvey: ExitSurveyState;
  licenceEarned: boolean;
}

export const STORAGE_KEY = "aiLearnerLicence:v1";
