import { useState } from "react";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { QuestionCard } from "../components/QuestionCard";
import { ProgressIndicator } from "../components/ProgressIndicator";
import { preCheckIntro, preCheckComplete } from "../data/copy";
import { useCourse } from "../state/CourseContext";
import { useCourseActions } from "../state/useCourseActions";

export function PreCheckScreen() {
  const { state, content } = useCourse();
  const actions = useCourseActions();
  const [introDismissed, setIntroDismissed] = useState(false);

  const answeredCount = state.preCheck.answers.length;
  const isComplete = state.preCheck.status === "completed";

  if (isComplete) {
    return (
      <Card headingLevel="h1" variant="success" eyebrow="Pre-check" heading="Pre-check complete">
        <p>{preCheckComplete.message}</p>
        <div className="actions-row">
          <Button onClick={() => actions.goTo("courseMap")}>{preCheckComplete.continueLabel}</Button>
        </div>
      </Card>
    );
  }

  if (!introDismissed && answeredCount === 0) {
    return (
      <Card headingLevel="h1" variant="teaching" eyebrow="Before you start" heading={preCheckIntro.heading}>
        <div className="stack">
          {preCheckIntro.body.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
        <div className="actions-row">
          <Button onClick={() => setIntroDismissed(true)}>Start</Button>
        </div>
      </Card>
    );
  }

  const question = content.preCheck[answeredCount];

  return (
    <Card headingLevel="h1" variant="practice" eyebrow="Pre-check · not marked" heading="What Would You Do?">
      <ProgressIndicator label={`Question ${answeredCount + 1} of ${content.preCheck.length}`} current={answeredCount + 1} total={content.preCheck.length} />
      <div className="spaced-top">
        <QuestionCard
          key={question.id}
          prompt={question.stem}
          options={question.options.map((text) => ({ text }))}
          correctIndex={question.correctIndex}
          revealCorrectness={false}
          shuffleSeed={question.id}
          onContinue={({ correct }) => {
            actions.answerPreCheck(question.id, correct);
            if (answeredCount + 1 === content.preCheck.length) {
              actions.finishPreCheck();
            }
          }}
        />
      </div>
    </Card>
  );
}
