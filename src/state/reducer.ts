import { MODULE_IDS } from "../types";
import type {
  AppScreen,
  ExitSurveyState,
  LicenceRecord,
  MasteryProgressState,
  ModuleId,
  ProgressState,
} from "../types";
import { masteryReducer, type MasteryAction } from "./masteryReducer";
import type { MasteryEngine } from "./masteryEngine";
import { createInitialProgressState } from "./initialState";

export type MasteryTrack = ModuleId | "final";

export type RootAction =
  | { type: "HYDRATE"; state: ProgressState }
  | { type: "GO_TO"; screen: AppScreen }
  | { type: "SKIP_PRECHECK" }
  | { type: "ANSWER_PRECHECK"; questionId: string; correct: boolean }
  | { type: "FINISH_PRECHECK" }
  | { type: "MASTERY"; track: MasteryTrack; action: MasteryAction }
  | { type: "ANSWER_SURVEY"; patch: Partial<ExitSurveyState> }
  | { type: "COMPLETE_SURVEY" }
  | { type: "ISSUE_LICENCE"; record: LicenceRecord }
  | { type: "RESET" };

function getMasteryState(state: ProgressState, track: MasteryTrack): MasteryProgressState {
  return track === "final" ? state.final : state.modules[track];
}

function setMasteryState(
  state: ProgressState,
  track: MasteryTrack,
  next: MasteryProgressState,
): ProgressState {
  if (track === "final") return { ...state, final: next };
  return { ...state, modules: { ...state.modules, [track]: next } };
}

/** Unlocks the next module in sequence, and the final challenge once all four modules clear. */
function applyUnlocks(state: ProgressState, track: MasteryTrack): ProgressState {
  let next = state;

  if (track !== "final") {
    const idx = MODULE_IDS.indexOf(track);
    const nextModuleId = MODULE_IDS[idx + 1];
    if (nextModuleId && next.modules[nextModuleId].status === "locked") {
      next = {
        ...next,
        modules: {
          ...next.modules,
          [nextModuleId]: { ...next.modules[nextModuleId], status: "available" },
        },
      };
    }
    const allCleared = MODULE_IDS.every((id) => next.modules[id].status === "cleared");
    if (allCleared && next.final.status === "locked") {
      next = { ...next, final: { ...next.final, status: "available" } };
    }
    return next;
  }

  return { ...next, licenceEarned: true };
}

export function createRootReducer(engines: Record<MasteryTrack, MasteryEngine>) {
  return function rootReducer(state: ProgressState, action: RootAction): ProgressState {
    switch (action.type) {
      case "HYDRATE":
        return action.state;

      case "GO_TO":
        return { ...state, screen: action.screen };

      case "SKIP_PRECHECK":
        return { ...state, preCheck: { ...state.preCheck, status: "skipped" } };

      case "ANSWER_PRECHECK": {
        const answers = [
          ...state.preCheck.answers,
          { questionId: action.questionId, correct: action.correct },
        ];
        return { ...state, preCheck: { ...state.preCheck, answers } };
      }

      case "FINISH_PRECHECK": {
        const score = state.preCheck.answers.filter((a) => a.correct).length;
        return { ...state, preCheck: { ...state.preCheck, status: "completed", score } };
      }

      case "MASTERY": {
        const prev = getMasteryState(state, action.track);
        const engine = engines[action.track];
        const next = masteryReducer(prev, action.action, engine);
        const updated = setMasteryState(state, action.track, next);

        if (next.status === "cleared" && prev.status !== "cleared") {
          return applyUnlocks(updated, action.track);
        }
        return updated;
      }

      case "ANSWER_SURVEY":
        return { ...state, exitSurvey: { ...state.exitSurvey, ...action.patch } };

      // The record is built outside the reducer so this stays pure and testable; the
      // licence screen issues it once, and re-issuing is a no-op so a refresh cannot
      // change a number the student may already have printed.
      case "ISSUE_LICENCE":
        return state.licence ? state : { ...state, licence: action.record };

      case "COMPLETE_SURVEY":
        return { ...state, exitSurvey: { ...state.exitSurvey, completed: true } };

      case "RESET":
        return createInitialProgressState();

      default:
        return state;
    }
  };
}
