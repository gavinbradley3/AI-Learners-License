import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { ProgressIndicator } from "../components/ProgressIndicator";
import { QuestionCard } from "../components/QuestionCard";
import { CorrectionCard } from "../components/CorrectionCard";
import { finalIntro, finalRetry } from "../data/copy";
import { useCourse } from "../state/CourseContext";
import { useCourseActions } from "../state/useCourseActions";
import { PATTERN_LABELS, type FinalQuestion } from "../types";

function topMissedCategories(missedConcepts: readonly string[], bank: readonly FinalQuestion[]): string[] {
  const conceptToCategory = new Map(bank.map((q) => [q.concept, q.category] as const));
  const counts = new Map<string, number>();
  for (const concept of missedConcepts) {
    const category = conceptToCategory.get(concept);
    if (!category) continue;
    counts.set(category, (counts.get(category) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 2).map(([category]) => category);
}

export function FinalChallengeScreen() {
  const { state, content } = useCourse();
  const actions = useCourseActions();
  const finalState = state.final;

  if (finalState.phase === "content") {
    return (
      <Card headingLevel="h1" heading={finalIntro.heading}>
        <div className="stack">
          {finalIntro.body.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
        <p style={{ fontWeight: 600 }}>{finalIntro.reminder}</p>
        <p>{finalIntro.requirement}</p>
        <p>{finalIntro.retryNote}</p>
        <p>{finalIntro.noTimer}</p>
        <div className="actions-row">
          <Button onClick={() => actions.startQuiz("final")}>{finalIntro.startLabel}</Button>
        </div>
      </Card>
    );
  }

  if (finalState.phase === "quiz" && finalState.currentAttempt) {
    const attempt = finalState.currentAttempt;
    const questionIndex = attempt.answers.length;
    const questionId = attempt.questionIds[questionIndex];
    const question = content.finalBank.find((q) => q.id === questionId)!;
    return (
      <Card headingLevel="h1" heading="Final Challenge" eyebrow="Licence challenge">
        <ProgressIndicator
          label={`Situation ${questionIndex + 1} of ${attempt.questionIds.length}`}
          current={questionIndex + 1}
          total={attempt.questionIds.length}
        />
        <div className="spaced-top">
          <QuestionCard
            key={question.id}
            eyebrow={PATTERN_LABELS[question.pattern]}
            context={question.context}
            prompt={question.stem}
            options={question.options.map((o) => ({ text: o.text, feedback: o.feedback }))}
            correctIndex={question.correctIndex}
            shuffleSeed={`${question.id}:${finalState.attemptCount}`}
            onContinue={({ correct }) => actions.answerQuestion("final", question.id, correct)}
          />
        </div>
      </Card>
    );
  }

  if (finalState.phase === "corrections" && finalState.correctionQueue?.length) {
    const questionId = finalState.correctionQueue[0];
    const question = content.finalBank.find((q) => q.id === questionId)!;
    const wrongExplanation = question.options[question.correctIndex].feedback;
    return (
      <Card headingLevel="h1" heading="Final Challenge" eyebrow="Quick correction">
        <p>Let's take another look at one idea before moving on.</p>
        <div className="spaced-top">
          <CorrectionCard
            key={question.id}
            prompt={question.correction.prompt}
            options={question.correction.options}
            correctIndex={question.correction.correctIndex}
            explanation={wrongExplanation}
            shuffleSeed={`${question.id}:correction:${finalState.attemptCount}`}
            onCleared={() => actions.clearCorrection("final", questionId)}
          />
        </div>
      </Card>
    );
  }

  if (finalState.phase === "review") {
    const topCategories = topMissedCategories(finalState.lastMissedConcepts, content.finalBank);
    return (
      <Card headingLevel="h1" heading="Almost there">
        <p>{finalRetry.message}</p>
        {topCategories.length > 0 && <p>Areas to revisit: {topCategories.join(", ")}.</p>}
        <div className="actions-row">
          <Button onClick={() => actions.startQuiz("final")}>Take a new challenge</Button>
        </div>
      </Card>
    );
  }

  // cleared
  return (
    <Card headingLevel="h1" heading="Final Challenge — Cleared">
      <p>You've combined everything from the course. Your licence is ready.</p>
      <div className="actions-row">
        <Button onClick={() => actions.goTo("licence")}>Continue</Button>
      </div>
    </Card>
  );
}
