import type { ModuleId } from "../types";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { ProgressIndicator } from "../components/ProgressIndicator";
import { ModuleScreenView } from "../components/ModuleScreenView";
import { QuestionCard } from "../components/QuestionCard";
import { CorrectionCard } from "../components/CorrectionCard";
import { ContextBlocks } from "../components/ContextBlocks";
import { useCourse } from "../state/CourseContext";
import { useCourseActions } from "../state/useCourseActions";
import moduleScreenStyles from "../components/ModuleScreenView.module.css";

export interface ModuleRunnerScreenProps {
  moduleId: ModuleId;
}

export function ModuleRunnerScreen({ moduleId }: ModuleRunnerScreenProps) {
  const { state, content } = useCourse();
  const actions = useCourseActions();
  const moduleState = state.modules[moduleId];
  const moduleContent = content.modules[moduleId];

  if (moduleState.phase === "content") {
    const index = Math.min(moduleState.contentScreenIndex, moduleContent.screens.length - 1);
    const screen = moduleContent.screens[index];
    return (
      <ModuleScreenView
        key={screen.id}
        screen={screen}
        onDone={() => {
          const next = index + 1;
          if (next < moduleContent.screens.length) {
            actions.advanceContent(moduleId, next);
          } else {
            actions.startQuiz(moduleId);
          }
        }}
      />
    );
  }

  if (moduleState.phase === "quiz" && moduleState.currentAttempt) {
    const attempt = moduleState.currentAttempt;
    const questionIndex = attempt.answers.length;
    const questionId = attempt.questionIds[questionIndex];
    const question = moduleContent.quizBank.find((q) => q.id === questionId)!;
    return (
      <Card headingLevel="h1" heading={moduleContent.title} eyebrow="Module challenge">
        <ProgressIndicator
          label={`Question ${questionIndex + 1} of ${attempt.questionIds.length}`}
          current={questionIndex + 1}
          total={attempt.questionIds.length}
        />
        <div className="spaced-top">
          <QuestionCard
            key={question.id}
            context={question.context}
            prompt={question.stem}
            options={question.options.map((o) => ({ text: o.text, feedback: o.feedback }))}
            correctIndex={question.correctIndex}
            shuffleSeed={`${question.id}:${moduleState.attemptCount}`}
            onContinue={({ correct }) => actions.answerQuestion(moduleId, question.id, correct)}
          />
        </div>
      </Card>
    );
  }

  if (moduleState.phase === "corrections" && moduleState.correctionQueue?.length) {
    const questionId = moduleState.correctionQueue[0];
    const question = moduleContent.quizBank.find((q) => q.id === questionId)!;
    const wrongExplanation = question.options[question.correctIndex].feedback;
    return (
      <Card headingLevel="h1" heading={moduleContent.title} eyebrow="Quick correction">
        <p>Let's take another look at one idea before moving on.</p>
        <div className="spaced-top">
          <CorrectionCard
            key={question.id}
            prompt={question.correction.prompt}
            options={question.correction.options}
            correctIndex={question.correction.correctIndex}
            explanation={wrongExplanation}
            shuffleSeed={`${question.id}:correction:${moduleState.attemptCount}`}
            onCleared={() => actions.clearCorrection(moduleId, questionId)}
          />
        </div>
      </Card>
    );
  }

  if (moduleState.phase === "review") {
    const review = moduleContent.review;
    return (
      <Card headingLevel="h1" heading={review.heading}>
        {review.bulletGroups?.map((group, i) => (
          <div key={i} className={`${moduleScreenStyles.bulletGroup} spaced-top`}>
            {group.heading && <p className={moduleScreenStyles.bulletHeading}>{group.heading}</p>}
            <ul>
              {group.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
        <ContextBlocks blocks={review.blocks} />
        {review.note && <p>{review.note}</p>}
        <div className="actions-row">
          <Button onClick={() => actions.startQuiz(moduleId)}>{review.continueLabel}</Button>
        </div>
      </Card>
    );
  }

  // cleared
  return (
    <Card headingLevel="h1" heading={`${moduleContent.title} — Cleared`} eyebrow="Module complete">
      <p>Nice work. You've cleared this module.</p>
      <div className="actions-row">
        <Button onClick={() => actions.goTo("courseMap")}>Back to Course Map</Button>
      </div>
    </Card>
  );
}
