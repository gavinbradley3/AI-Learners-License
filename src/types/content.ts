export type ModuleId = "module1" | "module2" | "module3" | "module4";

export const MODULE_IDS: readonly ModuleId[] = [
  "module1",
  "module2",
  "module3",
  "module4",
];

export type FinalCategory =
  | "support"
  | "tutor"
  | "verification"
  | "permission"
  | "privacy"
  | "responsibility"
  | "integrated";

export interface QuizOption {
  text: string;
  feedback: string;
}

export type FourOptions = readonly [QuizOption, QuizOption, QuizOption, QuizOption];

/** A plain paragraph, or a quoted line (e.g. what a student typed to AI) rendered as a blockquote. */
export type ContextBlock = string | { quote: string };

export interface CorrectionScenario {
  prompt: string;
  options: readonly [string, string];
  correctIndex: 0 | 1;
}

interface MasteryQuestionBase {
  id: string;
  stem: string;
  context?: readonly ContextBlock[];
  options: FourOptions;
  correctIndex: 0 | 1 | 2 | 3;
  concept: string;
  correction: CorrectionScenario;
}

export interface ModuleQuestion extends MasteryQuestionBase {
  moduleId: ModuleId;
}

export interface FinalQuestion extends MasteryQuestionBase {
  category: FinalCategory;
}

export interface PreCheckQuestion {
  id: string;
  stem: string;
  options: readonly [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  concept: string;
}

/** A single answer choice inside an ungraded practice/hook interaction. */
export interface ChoiceOption {
  label: string;
  feedback: string;
}

export interface InfoScreen {
  type: "info";
  id: string;
  eyebrow?: string;
  heading?: string;
  blocks?: readonly ContextBlock[];
  bulletGroups?: readonly { heading?: string; items: readonly string[] }[];
  note?: string;
  continueLabel: string;
}

/** An ungraded scenario with 2-4 choices, immediate inline feedback. Never affects mastery score. */
export interface ChoiceScreen {
  type: "choice";
  id: string;
  eyebrow?: string;
  heading?: string;
  context?: readonly ContextBlock[];
  prompt: string;
  options: readonly ChoiceOption[];
  correctIndex: number;
  continueLabel: string;
}

/** A sequential deck of small scenarios sharing one fixed label set (e.g. Quick Sort, Trust Meter). */
export interface DeckScreen {
  type: "deck";
  id: string;
  heading?: string;
  intro?: string;
  choiceLabels: readonly string[];
  items: readonly {
    id: string;
    prompt: string;
    correctIndex: number;
    feedback: string;
  }[];
  continueLabel: string;
}

export interface TakeawayScreen {
  type: "takeaway";
  id: string;
  heading?: string;
  quote: string;
  continueLabel: string;
}

export type ModuleScreen = InfoScreen | ChoiceScreen | DeckScreen | TakeawayScreen;

export interface ReviewContent {
  heading: string;
  bulletGroups?: readonly { heading?: string; items: readonly string[] }[];
  blocks?: readonly ContextBlock[];
  note?: string;
  continueLabel: string;
}

export interface ModuleContent {
  id: ModuleId;
  title: string;
  goalSummary: string;
  targetTime: string;
  screens: readonly ModuleScreen[];
  quizBank: readonly ModuleQuestion[];
  review: ReviewContent;
}

export interface CourseContent {
  preCheck: readonly PreCheckQuestion[];
  modules: Record<ModuleId, ModuleContent>;
  finalBank: readonly FinalQuestion[];
}
