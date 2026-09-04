import type { ModuleContent } from "../types";

export const module2: ModuleContent = {
  id: "module2",
  title: "Make AI Coach You",
  goalSummary: "tutor/coach/practice uses",
  targetTime: "5–6 min",
  screens: [
    {
      type: "info",
      id: "M2-1",
      heading: "Same AI. Very different job.",
      blocks: [
        { quote: "Do my science questions." },
        "and",
        { quote: "Ask me one science question at a time. Don't show the answer until I respond." },
        "Same AI. Very different job.",
      ],
      sections: [
        {
          heading: "Four useful AI jobs",
          blocks: ["Instead of making AI your answer machine, try making it your:"],
          bulletGroups: [
            { heading: "Tutor", items: ["“Explain this in simpler language.”"] },
            { heading: "Coach", items: ["“Give me one hint without solving it.”"] },
            { heading: "Practice partner", items: ["“Quiz me one question at a time.”"] },
            { heading: "Feedback tool", items: ["“Tell me where my explanation is unclear. Don't rewrite it.”"] },
          ],
        },
      ],
      continueLabel: "Continue",
    },
    {
      type: "info",
      id: "M2-3",
      heading: "Improve the prompt",
      blocks: [
        "Weak:",
        { quote: "Help me with fractions." },
        "Better:",
        {
          quote:
            "I don't understand how to add fractions with different denominators. Explain it simply and give me one example. Then give me a question to try myself.",
        },
        "You do not need fancy prompt-writing skills.",
      ],
      bulletGroups: [
        {
          heading: "Tell AI:",
          items: ["what you are stuck on", "what kind of help you want", "what you still want to do yourself"],
        },
      ],
      continueLabel: "Continue",
    },
    {
      type: "choice",
      id: "M2-4",
      heading: "Writing coach scenario",
      context: [
        "You have written a social studies response and are not sure your ideas make sense.",
      ],
      prompt: "What should you ask AI?",
      options: [
        { label: "“Make this way better.”", feedback: "That asks AI to take over some of the revising. Asking for questions or feedback keeps the decisions with you." },
        { label: "“Rewrite this at a higher level.”", feedback: "That asks AI to take over some of the revising. Asking for questions or feedback keeps the decisions with you." },
        {
          label: "“Read my response and ask me two questions about ideas that need more explanation. Don't rewrite anything.”",
          feedback: "Strong choice. AI helps you notice weaknesses, but the improvements still come from you.",
        },
        { label: "“Replace anything that sounds weak.”", feedback: "That asks AI to take over some of the revising. Asking for questions or feedback keeps the decisions with you." },
      ],
      correctIndex: 2,
      continueLabel: "Continue",
    },
    {
      type: "info",
      id: "M2-5",
      heading: "Help can come in levels",
      blocks: ["When really stuck, try:"],
      bulletGroups: [
        {
          items: [
            "Question — “Ask me a question that might get me unstuck.”",
            "Hint — “Give me one small hint.”",
            "Example — “Show me a different example.”",
            "Explanation — “Explain the idea again in simpler language.”",
          ],
        },
      ],
      note: "Then try the work yourself.",
      continueLabel: "Continue",
    },
    {
      type: "info",
      id: "M2-6",
      heading: "Study mode",
      blocks: [
        "Weak:",
        { quote: "Tell me everything I need to know about ecosystems." },
        "Better:",
        {
          quote:
            "Quiz me on ecosystems one question at a time. After I answer, tell me what I got right and what I should review.",
        },
        "Why stronger? Because you have to retrieve the information from your own brain.",
      ],
      sections: [
        {
          heading: "Break down a task",
          blocks: [
            { quote: "Help me break this assignment into five small steps. Don't create the actual content for me." },
            "This can help you start without handing over the assignment.",
          ],
        },
      ],
      continueLabel: "Continue",
    },
    {
      type: "choice",
      id: "M2-8-1",
      eyebrow: "Build a Better Request",
      prompt: "I'm studying for a test on cells…",
      options: [
        { label: "…give me all the answers.", feedback: "That skips the practice you actually need before a test." },
        { label: "…write a study sheet I can memorize.", feedback: "A study sheet can help, but it doesn't ask you to retrieve anything yourself." },
        {
          label: "…quiz me with one question at a time and wait for my answer.",
          feedback: "This makes you retrieve the answer yourself, which is what studying is for.",
        },
        { label: "…do my review questions.", feedback: "AI would be doing the practice instead of you." },
      ],
      correctIndex: 2,
      continueLabel: "Continue",
    },
    {
      type: "choice",
      id: "M2-8-2",
      eyebrow: "Build a Better Request",
      prompt: "I'm stuck on this equation…",
      options: [
        { label: "…solve it.", feedback: "That hands over the exact step you're supposed to practise." },
        { label: "…tell me the answer.", feedback: "The answer removes the problem-solving you still need to do." },
        { label: "…give me one hint about what to try next.", feedback: "A hint keeps the problem-solving with you." },
        { label: "…finish the first three steps.", feedback: "AI would still be doing part of the work that's yours." },
      ],
      correctIndex: 2,
      continueLabel: "Continue",
    },
    {
      type: "choice",
      id: "M2-8-3",
      eyebrow: "Build a Better Request",
      prompt: "Here is my own project idea…",
      options: [
        { label: "…replace it with something better.", feedback: "That swaps your idea for AI's, which isn't feedback." },
        {
          label: "…ask me questions that could help me develop it.",
          feedback: "Questions push your thinking without taking over your idea.",
        },
        { label: "…create the whole project.", feedback: "That would make AI the author of your project." },
        { label: "…write the presentation.", feedback: "That hands the writing over to AI." },
      ],
      correctIndex: 1,
      continueLabel: "Continue",
    },
    {
      type: "takeaway",
      id: "M2-takeaway",
      quote: "Do not just ask AI for help. Decide what kind of help will keep you thinking.",
      continueLabel: "Module Challenge",
    },
  ],
  quizBank: [
    {
      id: "M2-Q1",
      moduleId: "module2",
      stem: "You want to practise vocabulary.",
      options: [
        { text: "“List the definitions.”", feedback: "Reading definitions can help, but it gives you less practice remembering them." },
        {
          text: "“Quiz me one word at a time and wait for my answer.”",
          feedback: "Retrieving the definitions yourself turns AI into practice instead of an answer sheet.",
        },
        { text: "“Answer my vocabulary sheet.”", feedback: "AI would complete the practice for you." },
        { text: "“Write definitions I can submit.”", feedback: "AI would create work you are supposed to produce." },
      ],
      correctIndex: 1,
      concept: "retrieval_practice",
      correction: {
        prompt: "Want to practise capitals?",
        options: ["Ask AI to quiz you", "Ask AI for a completed answer sheet"],
        correctIndex: 0,
      },
    },
    {
      id: "M2-Q2",
      moduleId: "module2",
      stem: "You do not understand a paragraph in your science textbook.",
      options: [
        {
          text: "“Explain this in simpler language and give me a new example.”",
          feedback: "AI is helping you understand the content, not creating your assessed response.",
        },
        { text: "“Write my science response.”", feedback: "That moves from explanation to replacement." },
        { text: "“Answer tomorrow's quiz questions.”", feedback: "That removes the practice." },
        { text: "“Tell me what mark I'll get.”", feedback: "Predicting a mark does not solve the learning problem." },
      ],
      correctIndex: 0,
      concept: "explanation",
      correction: {
        prompt: "If a definition is confusing, asking for a simpler explanation is:",
        options: ["A useful learning use when allowed", "The same as asking AI to write the assignment"],
        correctIndex: 0,
      },
    },
    {
      id: "M2-Q3",
      moduleId: "module2",
      stem: "You want feedback on your writing without having AI rewrite it.",
      options: [
        { text: "“Fix everything.”", feedback: "This prompt hands part or all of the revision work to AI instead of asking for feedback." },
        { text: "“Make this sound smarter.”", feedback: "This prompt hands part or all of the revision work to AI instead of asking for feedback." },
        {
          text: "“Tell me the two places where my reasoning is hardest to follow. Don't rewrite them.”",
          feedback: "This keeps the decisions and rewriting with you.",
        },
        { text: "“Write a stronger version.”", feedback: "This prompt hands part or all of the revision work to AI instead of asking for feedback." },
      ],
      correctIndex: 2,
      concept: "feedback_vs_rewriting",
      correction: {
        prompt: "Which asks for feedback instead of a rewrite?",
        options: ["“Point out one weak section.”", "“Replace my weak section.”"],
        correctIndex: 0,
      },
    },
    {
      id: "M2-Q4",
      moduleId: "module2",
      stem: "You have no idea how to start a large project. AI use is allowed for planning.",
      options: [
        { text: "“Complete the project.”", feedback: "AI would create the product." },
        {
          text: "“Break the task into six smaller steps without creating the project content.”",
          feedback: "AI can reduce the size of the problem without taking over the actual work.",
        },
        { text: "“Create everything and I'll edit it.”", feedback: "AI would create the product." },
        { text: "“Find someone else's project to copy.”", feedback: "Copying another project does not support your learning." },
      ],
      correctIndex: 1,
      concept: "task_breakdown",
      correction: {
        prompt: "AI can help you make a plan while you still make the product.",
        options: ["True", "False"],
        correctIndex: 0,
      },
    },
    {
      id: "M2-Q5",
      moduleId: "module2",
      stem: "You have tried a math problem and are stuck.",
      options: [
        { text: "“Answer it.”", feedback: "These give away much more of the problem-solving." },
        { text: "“Give me one hint about my next step.”", feedback: "Start with the smallest amount of help that gets you moving again." },
        { text: "“Show every step.”", feedback: "These give away much more of the problem-solving." },
        { text: "“Do the difficult part.”", feedback: "These give away much more of the problem-solving." },
      ],
      correctIndex: 1,
      concept: "graduated_help",
      correction: {
        prompt: "Which usually protects more thinking?",
        options: ["A hint", "A full solution"],
        correctIndex: 0,
      },
    },
    {
      id: "M2-Q6",
      moduleId: "module2",
      stem: "What makes this prompt useful? “Ask me three questions that will help me improve my project idea.”",
      options: [
        { text: "AI creates the project", feedback: "You still create and decide." },
        { text: "AI makes decisions for you", feedback: "You still create and decide." },
        { text: "AI pushes you to think about your own idea", feedback: "Questions can push your thinking without replacing it." },
        { text: "AI guarantees the idea is good", feedback: "AI cannot guarantee quality." },
      ],
      correctIndex: 2,
      concept: "coaching_questions",
      correction: {
        prompt: "Which keeps the idea yours?",
        options: ["“Give me your idea.”", "“Ask me a question about my idea.”"],
        correctIndex: 1,
      },
    },
    {
      id: "M2-Q7",
      moduleId: "module2",
      stem: "Which study prompt gives you the most active practice?",
      options: [
        { text: "“Summarize the whole unit.”", feedback: "These may support review, but they are more passive." },
        { text: "“Give me notes to read.”", feedback: "These may support review, but they are more passive." },
        {
          text: "“Ask me questions one at a time and make me answer before giving feedback.”",
          feedback: "You actually have to recall and use what you know.",
        },
        { text: "“Tell me what will be on the test.”", feedback: "AI does not necessarily know what your teacher will test." },
      ],
      correctIndex: 2,
      concept: "active_study",
      correction: {
        prompt: "Which gives your brain more practice?",
        options: ["Reading answers", "Answering questions yourself"],
        correctIndex: 1,
      },
    },
    {
      id: "M2-Q8",
      moduleId: "module2",
      stem: "Which prompt best tells AI what kind of help you want?",
      options: [
        { text: "“Help.”", feedback: "AI has to guess what useful help would look like." },
        { text: "“Do this.”", feedback: "AI has to guess what useful help would look like." },
        {
          text: "“I'm confused about why seasons happen. Explain it simply, then ask me one question to check my understanding.”",
          feedback: "It names the problem, the kind of help, and what the student will still do.",
        },
        { text: "“Make school easier.”", feedback: "AI has to guess what useful help would look like." },
      ],
      correctIndex: 2,
      concept: "clear_learning_prompt",
      correction: {
        prompt: "A useful learning prompt usually explains what you are stuck on and:",
        options: ["what kind of help you want", "your favourite colour"],
        correctIndex: 0,
      },
    },
  ],
  review: {
    heading: "Make AI coach you",
    bulletGroups: [
      {
        heading: "When you need help, try asking for:",
        items: ["a simpler explanation", "one example", "one question", "one hint", "feedback", "smaller steps"],
      },
    ],
    blocks: [
      "Instead of:",
      { quote: "Do this for me." },
      "Try:",
      { quote: "Help me do this myself." },
    ],
    continueLabel: "Try Again",
  },
};
