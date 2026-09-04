import type { CourseContent } from "../types";
import { preCheckQuestions } from "./preCheck";
import { module1 } from "./module1";
import { module2 } from "./module2";
import { module3 } from "./module3";
import { module4 } from "./module4";
import { finalChallengeBank } from "./finalChallenge";

export const courseContent: CourseContent = {
  preCheck: preCheckQuestions,
  modules: { module1, module2, module3, module4 },
  finalBank: finalChallengeBank,
};
