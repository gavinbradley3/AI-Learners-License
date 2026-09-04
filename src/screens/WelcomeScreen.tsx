import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { welcome } from "../data/copy";
import { useCourseActions } from "../state/useCourseActions";

export function WelcomeScreen() {
  const actions = useCourseActions();

  return (
    <Card headingLevel="h1" variant="teaching" eyebrow="Start here" heading={welcome.heading}>
      <p>{welcome.subtitle}</p>
      <p>{welcome.timeNote}</p>
      <p>{welcome.preCheckPrompt}</p>
      <div className="actions-row">
        <Button onClick={() => actions.goTo("preCheck")}>{welcome.takePreCheckLabel}</Button>
        <Button
          variant="secondary"
          onClick={() => {
            actions.skipPreCheck();
            actions.goTo("courseMap");
          }}
        >
          {welcome.skipPreCheckLabel}
        </Button>
      </div>
    </Card>
  );
}
