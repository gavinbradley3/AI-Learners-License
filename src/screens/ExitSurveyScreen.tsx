import { useState } from "react";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { exitSurvey } from "../data/copy";
import { courseContent } from "../data/courseContent";
import {
  buildSurveyPayload,
  createSessionId,
  readSurveyConfig,
  submitSurvey,
} from "../services/surveySubmission";
import { useCourse } from "../state/CourseContext";
import { useCourseActions } from "../state/useCourseActions";
import type { LikertAnswer, UsefulnessAnswer } from "../types";
import styles from "./ExitSurveyScreen.module.css";

/** "off" when no endpoint is configured — the course then makes no network request at all. */
type SendState = "off" | "sending" | "sent" | "failed";

const LIKERT_VALUES: LikertAnswer[] = ["stronglyAgree", "agree", "notSure", "disagree"];
const USEFULNESS_VALUES: UsefulnessAnswer[] = ["veryUseful", "somewhatUseful", "notVeryUseful", "notUseful"];

export function ExitSurveyScreen() {
  const { state } = useCourse();
  const actions = useCourseActions();
  const survey = state.exitSurvey;
  const [sendState, setSendState] = useState<SendState>("off");

  /**
   * Completion is recorded locally first and never waits on the network. The request is
   * fire-and-forget from the course's point of view: whatever it returns, the student has
   * already finished and their licence is already theirs.
   */
  const finish = () => {
    actions.completeSurvey();

    const config = readSurveyConfig();
    if (!config) return;

    const sessionId = state.sessionId ?? createSessionId();
    if (!state.sessionId) actions.setSessionId(sessionId);

    setSendState("sending");
    void submitSurvey(
      buildSurveyPayload({
        sessionId,
        classId: config.classId,
        preCheck: state.preCheck,
        preCheckTotal: courseContent.preCheck.length,
        final: state.final,
        survey,
      }),
      config.endpoint,
    ).then((result) => setSendState(result.ok ? "sent" : "failed"));
  };

  if (survey.completed) {
    return (
      <Card headingLevel="h1" variant="success" eyebrow="Feedback" heading="Thanks">
        <p>{exitSurvey.thanksMessage}</p>
        {sendState !== "off" && (
          <p className={styles.sendStatus} role="status" aria-live="polite">
            {sendState === "sending" && exitSurvey.sendingMessage}
            {sendState === "sent" && exitSurvey.sentMessage}
            {sendState === "failed" && exitSurvey.sendFailedMessage}
          </p>
        )}
        <div className="actions-row">
          <Button onClick={() => actions.goTo("pilotSummary")}>Continue</Button>
        </div>
      </Card>
    );
  }

  const canFinish = survey.q1 && survey.q2 && survey.q3 && survey.q4;

  return (
    <Card headingLevel="h1" variant="teaching" eyebrow="Feedback" heading={exitSurvey.heading}>
      <div className="stack">
        {exitSurvey.intro.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>

      <LikertQuestion
        label={exitSurvey.questions.q1}
        value={survey.q1}
        onChange={(v) => actions.answerSurvey({ q1: v })}
      />
      <LikertQuestion
        label={exitSurvey.questions.q2}
        value={survey.q2}
        onChange={(v) => actions.answerSurvey({ q2: v })}
      />
      <LikertQuestion
        label={exitSurvey.questions.q3}
        value={survey.q3}
        onChange={(v) => actions.answerSurvey({ q3: v })}
      />

      <fieldset className={styles.question}>
        <legend>{exitSurvey.questions.q4}</legend>
        <div className={styles.options}>
          {USEFULNESS_VALUES.map((value, i) => (
            <label className={styles.option} key={value}>
              <input
                type="radio"
                name="q4"
                checked={survey.q4 === value}
                onChange={() => actions.answerSurvey({ q4: value })}
              />
              {exitSurvey.usefulnessOptions[i]}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className={styles.question}>
        <legend>{exitSurvey.questions.q5}</legend>
        <textarea
          id="q5"
          className={styles.textarea}
          maxLength={exitSurvey.q5MaxLength}
          placeholder={exitSurvey.q5Placeholder}
          value={survey.q5}
          onChange={(e) => actions.answerSurvey({ q5: e.target.value })}
        />
      </fieldset>

      <div className="actions-row">
        <Button disabled={!canFinish} onClick={finish}>
          {exitSurvey.finishLabel}
        </Button>
      </div>
    </Card>
  );
}

function LikertQuestion({
  label,
  value,
  onChange,
}: {
  label: string;
  value: LikertAnswer | null;
  onChange: (value: LikertAnswer) => void;
}) {
  return (
    <fieldset className={styles.question}>
      <legend>{label}</legend>
      <div className={styles.options}>
        {LIKERT_VALUES.map((v, i) => (
          <label className={styles.option} key={v}>
            <input type="radio" checked={value === v} onChange={() => onChange(v)} />
            {exitSurvey.likertOptions[i]}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
