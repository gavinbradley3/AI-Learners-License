export const fiveCheck = {
  heading: "Before you use AI: 5 quick checks",
  intro: "You do not need a giant rulebook. Ask yourself five questions.",
  items: [
    { label: "Allowed?", question: "Is AI allowed for this task — or this part of the task?" },
    { label: "Goal?", question: "What am I supposed to learn or practise?" },
    { label: "Still me?", question: "Am I still doing that thinking and making the decisions?" },
    { label: "Check it?", question: "Does anything AI told me need to be confirmed somewhere reliable?" },
    { label: "Private?", question: "Am I sharing anything I should keep private?" },
  ],
  shortVersion: "Allowed? → Goal? → Still me? → Check it? → Private?",
  note: "You will not always need all five checks. But if something feels questionable, they can help you figure out why.",
} as const;

export const welcome = {
  heading: "AI Learner Licence",
  subtitle: "A short course on making smart calls about using AI for school.",
  timeNote: "About 25–35 minutes.",
  preCheckPrompt: "Want to start with a quick check of where you're at?",
  takePreCheckLabel: "Take the 2-minute pre-check",
  skipPreCheckLabel: "Skip pre-check",
} as const;

export const preCheckIntro = {
  heading: "Before We Start",
  body: [
    "These five questions are just a starting check.",
    "They are not for marks.",
    "Choose what you think is best.",
    "Do not worry if you are unsure — that is what the course is for.",
  ],
} as const;

export const preCheckComplete = {
  message: "Starting point saved. Now let's build the skills.",
  continueLabel: "Go to the Course Map",
} as const;

export const courseMap = {
  heading: "Course Map",
  clearedLabel: "CLEARED",
  moduleOrder: ["module1", "module2", "module3", "module4"] as const,
} as const;

export const finalIntro = {
  heading: "Final Challenge",
  body: [
    "You have cleared all four modules.",
    "Now you will get 12 school situations.",
    "Some are obvious.",
    "Some are not.",
    "Use what you learned:",
  ],
  reminder: fiveCheck.shortVersion,
  requirement: "You need 10 out of 12.",
  retryNote: "If you miss something, you will get another situation testing the same idea.",
  noTimer: "No timer. Think it through.",
  startLabel: "Start Challenge",
} as const;

export const finalRetry = {
  message: "A few decisions need another look. Review your missed ideas, then take a new challenge.",
} as const;

export const licence = {
  completionHeading: "AI Learner Licence Earned",
  statusLabel: "CLEARED",
  intro: "You have shown that you can make smart decisions about using AI for school.",
  meansIntro: "That means you can:",
  skills: [
    "use AI to support learning without handing over the thinking",
    "check information instead of automatically trusting it",
    "follow the rules of the task",
    "protect private information",
    "take responsibility for what you submit",
  ],
  overrideHeading: "Your licence does not mean AI is allowed on every assignment.",
  overrideBody: "Your teacher's instructions still come first.",
  quote: "Use the tool. Keep the thinking.",
  viewLicenceLabel: "View My Licence",
  cardTitle: "AI LEARNER LICENCE",
  cardStatusLabel: "Status: Cleared",
  cardSkillsHeading: "Skills demonstrated:",
  cardSkills: ["Learning Support", "AI Judgment", "Verification", "Privacy", "Responsibility"],
  cardFooter: "Classroom learning credential — not an official school or district certification",
  cardRestriction: "Valid only when AI use is permitted by your teacher",
  cardNumberLabel: "Licence no.",
  cardIssuedLabel: "Issued",
  cardSealTop: "AI Learner",
  cardSealBottom: "Licence",
  cardSealMark: "Cleared",
  printLabel: "Print or save as PDF",
  continueLabel: "Continue",
} as const;

export const exitSurvey = {
  heading: "One last thing",
  intro: ["This is not for marks.", "Help improve the course."],
  likertOptions: ["Strongly agree", "Agree", "Not sure", "Disagree"] as const,
  usefulnessOptions: ["Very useful", "Somewhat useful", "Not very useful", "Not useful"] as const,
  questions: {
    q1: "I understand better when AI is okay to use for schoolwork.",
    q2: "I know ways AI can help me learn without doing my work for me.",
    q3: "I know why information from AI sometimes needs to be checked.",
    q4: "How useful was this course?",
    q5: "What is one thing from this course you might actually use?",
  },
  q5MaxLength: 300,
  q5Placeholder: "Optional — short answer",
  finishLabel: "Finish",
  thanksMessage: "Thanks. Your feedback has been saved on this device.",
  sendingMessage: "Sending feedback\u2026",
  sentMessage: "Feedback sent. Thanks for helping improve the course.",
  sendFailedMessage: "Your feedback couldn't be sent. Your course completion is still saved.",
} as const;

export const pilotSummary = {
  heading: "Your Summary",
  preCheckScoreLabel: "Pre-check starting score",
  finalScoreLabel: "Final passing score",
  retriesLabel: "Module retries",
  licenceEarnedLabel: "Licence earned",
  note: "This summary stays on this device only.",
} as const;

export const resetProgressCopy = {
  buttonLabel: "Reset progress",
  confirmMessage: "This clears everything you've done in this course on this device. This can't be undone.",
  confirmLabel: "Reset progress",
  cancelLabel: "Cancel",
} as const;
