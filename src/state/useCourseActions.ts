import { useMemo } from "react";
import type { AppScreen, ExitSurveyState, LicenceRecord } from "../types";
import { useCourse } from "./CourseContext";
import type { MasteryTrack } from "./reducer";

export function useCourseActions() {
  const { dispatch } = useCourse();

  return useMemo(
    () => ({
      goTo: (screen: AppScreen) => dispatch({ type: "GO_TO", screen }),
      skipPreCheck: () => dispatch({ type: "SKIP_PRECHECK" }),
      answerPreCheck: (questionId: string, correct: boolean) =>
        dispatch({ type: "ANSWER_PRECHECK", questionId, correct }),
      finishPreCheck: () => dispatch({ type: "FINISH_PRECHECK" }),
      advanceContent: (track: MasteryTrack, index: number) =>
        dispatch({ type: "MASTERY", track, action: { kind: "advanceContent", index } }),
      startQuiz: (track: MasteryTrack) =>
        dispatch({ type: "MASTERY", track, action: { kind: "startQuiz" } }),
      answerQuestion: (track: MasteryTrack, questionId: string, correct: boolean) =>
        dispatch({
          type: "MASTERY",
          track,
          action: { kind: "answerQuestion", questionId, correct },
        }),
      clearCorrection: (track: MasteryTrack, questionId: string) =>
        dispatch({ type: "MASTERY", track, action: { kind: "clearCorrection", questionId } }),
      answerSurvey: (patch: Partial<ExitSurveyState>) => dispatch({ type: "ANSWER_SURVEY", patch }),
      completeSurvey: () => dispatch({ type: "COMPLETE_SURVEY" }),
      issueLicence: (record: LicenceRecord) => dispatch({ type: "ISSUE_LICENCE", record }),
      setSessionId: (sessionId: string) => dispatch({ type: "SET_SESSION_ID", sessionId }),
      reset: () => dispatch({ type: "RESET" }),
    }),
    [dispatch],
  );
}
