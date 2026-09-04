import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { pilotSummary } from "../data/copy";
import { MODULE_IDS } from "../types";
import { useCourse } from "../state/CourseContext";
import { useCourseActions } from "../state/useCourseActions";

export function PilotSummaryScreen() {
  const { state } = useCourse();
  const actions = useCourseActions();

  const totalRetries = MODULE_IDS.reduce(
    (sum, id) => sum + Math.max(0, state.modules[id].attemptCount - 1),
    0,
  );

  return (
    <Card headingLevel="h1" variant="success" eyebrow="Course complete" heading={pilotSummary.heading}>
      <dl className="stack">
        {state.preCheck.status === "completed" && (
          <div>
            <dt style={{ fontWeight: 600 }}>{pilotSummary.preCheckScoreLabel}</dt>
            <dd style={{ margin: 0 }}>{state.preCheck.score} of 5</dd>
          </div>
        )}
        <div>
          <dt style={{ fontWeight: 600 }}>{pilotSummary.finalScoreLabel}</dt>
          <dd style={{ margin: 0 }}>{state.final.status === "cleared" ? "10 or more of 12" : "Not yet earned"}</dd>
        </div>
        <div>
          <dt style={{ fontWeight: 600 }}>{pilotSummary.retriesLabel}</dt>
          <dd style={{ margin: 0 }}>{totalRetries}</dd>
        </div>
        <div>
          <dt style={{ fontWeight: 600 }}>{pilotSummary.licenceEarnedLabel}</dt>
          <dd style={{ margin: 0 }}>{state.licenceEarned ? "Yes" : "Not yet"}</dd>
        </div>
      </dl>
      <p>{pilotSummary.note}</p>
      <div className="actions-row">
        <Button onClick={() => actions.goTo("licence")}>View My Licence</Button>
      </div>
    </Card>
  );
}
