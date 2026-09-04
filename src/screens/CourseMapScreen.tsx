import { Card } from "../components/Card";
import { ProgressIndicator } from "../components/ProgressIndicator";
import { MODULE_IDS } from "../types";
import type { MasteryProgressState } from "../types";
import { courseMap } from "../data/copy";
import { useCourse } from "../state/CourseContext";
import { useCourseActions } from "../state/useCourseActions";
import styles from "./CourseMapScreen.module.css";

function statusLabel(status: MasteryProgressState["status"]): string {
  switch (status) {
    case "cleared":
      return courseMap.clearedLabel;
    case "inProgress":
      return "In progress";
    case "available":
      return "Available";
    default:
      return "Locked";
  }
}

export function CourseMapScreen() {
  const { state, content } = useCourse();
  const actions = useCourseActions();

  const clearedCount = MODULE_IDS.filter((id) => state.modules[id].status === "cleared").length;

  return (
    <Card headingLevel="h1" heading={courseMap.heading}>
      <ProgressIndicator
        label={`${clearedCount} of ${MODULE_IDS.length} modules cleared`}
        current={clearedCount}
        total={MODULE_IDS.length}
      />
      <div className={styles.grid}>
        {MODULE_IDS.map((id) => {
          const moduleState = state.modules[id];
          const moduleContent = content.modules[id];
          const disabled = moduleState.status === "locked";
          return (
            <button
              key={id}
              type="button"
              className={[styles.moduleCard, moduleState.status === "cleared" ? styles.cleared : ""].join(" ")}
              disabled={disabled}
              onClick={() => actions.goTo(id)}
            >
              <span className={styles.moduleInfo}>
                <span className={styles.moduleTitle}>{moduleContent.title}</span>
                <span className={styles.moduleMeta}>
                  {moduleContent.goalSummary} · {moduleContent.targetTime}
                </span>
              </span>
              <span className={styles.statusTag}>{statusLabel(moduleState.status)}</span>
            </button>
          );
        })}
        <button
          type="button"
          className={[styles.moduleCard, state.final.status === "cleared" ? styles.cleared : ""].join(" ")}
          disabled={state.final.status === "locked"}
          onClick={() => actions.goTo("final")}
        >
          <span className={styles.moduleInfo}>
            <span className={styles.moduleTitle}>AI Learner Licence Challenge</span>
            <span className={styles.moduleMeta}>combine all concepts · 6–8 min</span>
          </span>
          <span className={styles.statusTag}>{statusLabel(state.final.status)}</span>
        </button>
      </div>
    </Card>
  );
}
