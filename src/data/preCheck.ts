import type { PreCheckQuestion } from "../types";

export const preCheckQuestions: readonly PreCheckQuestion[] = [
  {
    id: "PRE-1",
    stem: "Your teacher allows AI for homework help but says you must solve the math questions yourself.",
    options: [
      "Ask AI for the answers",
      "Ask AI for one hint when you are stuck",
      "Ask AI to solve half",
      "Copy AI's solution",
    ],
    correctIndex: 1,
    concept: "support_vs_replacement",
  },
  {
    id: "PRE-2",
    stem: "AI gives you an exact historical fact for a presentation.",
    options: ["Trust it", "Confirm it using a reliable source", "Use it if it sounds confident", "Change the wording"],
    correctIndex: 1,
    concept: "verification",
  },
  {
    id: "PRE-3",
    stem: "Your teacher says AI may be used for brainstorming on this assignment.",
    options: [
      "Automatically inappropriate",
      "Appropriate within the permission given",
      "AI can now write everything",
      "AI is now allowed on all future assignments",
    ],
    correctIndex: 1,
    concept: "permission_context",
  },
  {
    id: "PRE-4",
    stem: "Which is safest?",
    options: [
      "Paste your friend's private messages into AI",
      "Give AI your password",
      "Ask a general question without private identifying details",
      "Upload someone's personal photo without permission",
    ],
    correctIndex: 2,
    concept: "privacy",
  },
  {
    id: "PRE-5",
    stem: "You wrote your own paragraph. AI feedback is allowed.",
    options: [
      "“Rewrite this.”",
      "“Tell me one place where my explanation is unclear.”",
      "“Replace my conclusion.”",
      "“Make this sound like someone else wrote it.”",
    ],
    correctIndex: 1,
    concept: "feedback_vs_rewriting",
  },
];
