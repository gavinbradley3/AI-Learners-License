import { AppShell } from "./components/AppShell";
import { CourseProvider } from "./state/CourseContext";
import { useCourse } from "./state/CourseContext";
import { useCourseActions } from "./state/useCourseActions";
import { courseContent } from "./data/courseContent";
import { MODULE_IDS } from "./types";
import type { AppScreen } from "./types";

const PROGRESS_SCREENS: readonly AppScreen[] = ["courseMap", ...MODULE_IDS, "final"];
import { WelcomeScreen } from "./screens/WelcomeScreen";
import { PreCheckScreen } from "./screens/PreCheckScreen";
import { CourseMapScreen } from "./screens/CourseMapScreen";
import { ModuleRunnerScreen } from "./screens/ModuleRunnerScreen";
import { FinalChallengeScreen } from "./screens/FinalChallengeScreen";
import { LicenceScreen } from "./screens/LicenceScreen";
import { ExitSurveyScreen } from "./screens/ExitSurveyScreen";
import { PilotSummaryScreen } from "./screens/PilotSummaryScreen";

function CourseRoot() {
  const { state } = useCourse();
  const actions = useCourseActions();

  const clearedCount = MODULE_IDS.filter((id) => state.modules[id].status === "cleared").length;
  const showProgress = PROGRESS_SCREENS.includes(state.screen);
  const progress = showProgress
    ? { label: `${clearedCount} of ${MODULE_IDS.length} modules cleared`, current: clearedCount, total: MODULE_IDS.length }
    : undefined;

  return (
    <AppShell progress={progress} onReset={actions.reset}>
      <Screen screen={state.screen} />
    </AppShell>
  );
}

function Screen({ screen }: { screen: ReturnType<typeof useCourse>["state"]["screen"] }) {
  switch (screen) {
    case "welcome":
      return <WelcomeScreen />;
    case "preCheck":
      return <PreCheckScreen />;
    case "courseMap":
      return <CourseMapScreen />;
    case "module1":
    case "module2":
    case "module3":
    case "module4":
      return <ModuleRunnerScreen moduleId={screen} />;
    case "final":
      return <FinalChallengeScreen />;
    case "licence":
      return <LicenceScreen />;
    case "exitSurvey":
      return <ExitSurveyScreen />;
    case "pilotSummary":
      return <PilotSummaryScreen />;
    default:
      return <WelcomeScreen />;
  }
}

export function App() {
  return (
    <CourseProvider content={courseContent}>
      <CourseRoot />
    </CourseProvider>
  );
}
