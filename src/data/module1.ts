import type { ModuleContent } from "../types";

export const module1: ModuleContent = {
  id: "module1",
  title: "Where's the Line?",
  goalSummary: "support vs replacement",
  targetTime: "6–7 min",
  screens: [
    {
      type: "choice",
      id: "M1-1",
      heading: "Same tool. Different use.",
      context: [
        "Two students are writing a science explanation.",
        "Ava asks AI:",
        { quote: "Explain convection to me using a simple example." },
        "Noah asks AI:",
        { quote: "Write my convection explanation so I can hand it in." },
        "Both used AI.",
      ],
      prompt: "But did they use it in the same way?",
      options: [
        {
          label: "Basically the same",
          feedback:
            "Not quite. Both students opened an AI tool, but what the AI is doing matters more than the fact that they used it.",
        },
        {
          label: "Definitely different",
          feedback:
            "Right. Ava is using AI to understand the idea. Noah is asking AI to produce the work he is supposed to produce.",
        },
      ],
      correctIndex: 1,
      continueLabel: "See the difference",
    },
    {
      type: "info",
      id: "M1-2",
      heading: "Help or replacement?",
      blocks: [
        "A useful first question is:",
        { quote: "Is AI helping me do the thinking — or doing the thinking for me?" },
      ],
      bulletGroups: [
        {
          heading: "AI can support you by:",
          items: ["explaining", "giving hints", "asking questions", "quizzing you", "giving feedback", "helping you organize a task"],
        },
        {
          heading: "AI can replace your learning by:",
          items: [
            "writing your response",
            "solving the problem you are meant to solve",
            "creating your ideas when idea-making is being assessed",
            "answering questions you are supposed to answer",
          ],
        },
      ],
      continueLabel: "Next",
    },
    {
      type: "info",
      id: "M1-3",
      heading: "Some hard parts are supposed to be hard.",
      blocks: [
        "Learning often includes moments like:",
        { quote: "Wait. I don't get this yet." },
        "That is not automatically a problem. Sometimes your brain needs to work through confusion, remember something, try an idea, or make a mistake — that useful effort is sometimes called productive struggle.",
        { quote: "Working through some difficulty can help you learn." },
        "AI can help when you are stuck. But if AI removes every difficult part, it can also remove the practice you needed.",
      ],
      continueLabel: "Try a situation",
    },
    {
      type: "choice",
      id: "M1-4",
      heading: "Math scenario",
      context: [
        "Your teacher allows AI for homework help but says you must solve each question yourself.",
      ],
      prompt: "Which request fits best?",
      options: [
        {
          label: "“Solve question 7 and show me what to write.”",
          feedback:
            "That gives away the work you are supposed to practise. A hint would give you support without removing the problem-solving.",
        },
        {
          label: "“Give me the answer, then I will figure out how it works.”",
          feedback: "Seeing the answer first can remove much of the thinking. Ask for a hint or a question instead.",
        },
        {
          label: "“Give me one hint about what I should try next. Don't solve it.”",
          feedback: "Exactly. You are getting help with the next step, but the problem is still yours to solve.",
        },
        {
          label: "“Rewrite the question so it looks easier and answer it.”",
          feedback: "Making the wording clearer could help, but asking AI to answer it still replaces the work.",
        },
      ],
      correctIndex: 2,
      continueLabel: "Continue",
    },
    {
      type: "info",
      id: "M1-5",
      heading: "Context changes the answer",
      blocks: [
        "Consider brainstorming.",
        "Assignment A:",
        { quote: "You may use AI to brainstorm possible presentation topics." },
        "Using AI to brainstorm is allowed.",
        "Assignment B:",
        {
          quote:
            "Part of your mark is based on creating your own original project idea. Do not use AI to generate ideas.",
        },
        "Same AI action. Different assignment. Different answer.",
        { quote: "The purpose of the task matters." },
      ],
      continueLabel: "Continue",
    },
    {
      type: "choice",
      id: "M1-6",
      heading: "English scenario",
      context: [
        "Teacher says:",
        { quote: "Write your own paragraph first. You may use AI afterward for feedback." },
        "You write the paragraph.",
      ],
      prompt: "What should you ask AI for?",
      options: [
        {
          label: "Ask AI to rewrite the entire paragraph so it sounds better.",
          feedback: "A full rewrite means AI is doing the writing, not just pointing out a problem.",
        },
        {
          label: "Ask AI to identify one place where your explanation is confusing.",
          feedback: "Yes. AI points out a problem, but you still decide how to fix your writing.",
        },
        {
          label: "Ask AI to add three better examples directly into your paragraph.",
          feedback: "Adding new examples means AI is contributing content, not just giving feedback.",
        },
        {
          label: "Ask AI to create a new paragraph and combine it with yours.",
          feedback: "Combining AI's paragraph with yours still means part of the writing came from AI, not you.",
        },
      ],
      correctIndex: 1,
      continueLabel: "Continue",
    },
    {
      type: "choice",
      id: "M1-7",
      heading: "“But I changed the words.”",
      context: [
        "Suppose AI writes an entire answer for you.",
        "You replace a few words and move two sentences around.",
      ],
      prompt: "Did you now do the thinking?",
      options: [
        {
          label: "Yes",
          feedback: "Changing wording changes the surface, but AI still created the main ideas and response.",
        },
        {
          label: "No",
          feedback: "Right. Editing AI's answer is not the same as creating your own answer when that thinking was the point of the task.",
        },
      ],
      correctIndex: 1,
      continueLabel: "Continue",
    },
    {
      type: "deck",
      id: "M1-8",
      heading: "Quick Sort",
      choiceLabels: ["Supports learning", "Probably replaces learning", "Need more information"],
      items: [
        {
          id: "M1-8-1",
          prompt: "“Quiz me on these vocabulary words. One at a time.”",
          correctIndex: 0,
          feedback: "You are still doing the remembering.",
        },
        {
          id: "M1-8-2",
          prompt: "“Write my reading response about why the character changed.”",
          correctIndex: 1,
          feedback: "If the response is supposed to show your understanding, AI is doing that thinking.",
        },
        {
          id: "M1-8-3",
          prompt: "“Give me five possible topics for my project.”",
          correctIndex: 2,
          feedback:
            "This depends on the assignment. Is brainstorming allowed, or is creating the idea part of what you are being assessed on?",
        },
        {
          id: "M1-8-4",
          prompt: "“Here is my paragraph. Tell me one idea that needs more explanation. Don't rewrite it.”",
          correctIndex: 0,
          feedback: "AI gives feedback. You remain the writer.",
        },
        {
          id: "M1-8-5",
          prompt: "“Finish these ten math questions for me.”",
          correctIndex: 1,
          feedback: "AI is doing the practice instead of you.",
        },
        {
          id: "M1-8-6",
          prompt: "“Explain why my answer to question 4 is wrong, but don't give me the correct answer yet.”",
          correctIndex: 0,
          feedback: "This helps you find your mistake while keeping the next step yours.",
        },
      ],
      continueLabel: "Continue",
    },
    {
      type: "info",
      id: "M1-9",
      heading: "Bring in the 5-Check",
      blocks: ["When the line gets blurry, start with:"],
      bulletGroups: [
        {
          items: [
            "Allowed? Is AI allowed?",
            "Goal? What am I supposed to practise?",
            "Still me? Am I still doing that?",
          ],
        },
      ],
      note: "For this module, those first three checks will solve most situations.",
      continueLabel: "Continue",
    },
    {
      type: "takeaway",
      id: "M1-takeaway",
      quote: "Use AI to support the thinking — not quietly replace the thinking you were supposed to do.",
      continueLabel: "Module Challenge",
    },
  ],
  quizBank: [
    {
      id: "M1-Q1",
      moduleId: "module1",
      stem:
        "Liam has to explain how a food chain works. His teacher allows AI for learning help but says the explanation must be his own.",
      options: [
        { text: "Ask AI to write the explanation", feedback: "AI would be producing the explanation Liam is supposed to create." },
        {
          text: "Ask AI to explain food chains, then write his own explanation",
          feedback: "AI helps Liam understand the idea, but Liam still creates the assessed explanation.",
        },
        { text: "Ask AI to write the explanation and change a few words", feedback: "Changing AI's wording does not make the original thinking Liam's." },
        { text: "Ask AI for the shortest possible answer to submit", feedback: "A shorter AI answer is still an AI-created answer." },
      ],
      correctIndex: 1,
      concept: "support_vs_replacement",
      correction: {
        prompt: "Your history response must show your understanding. Which is better?",
        options: ["“Explain this event simply, then ask me to explain it back.”", "“Write my response.”"],
        correctIndex: 0,
      },
    },
    {
      id: "M1-Q2",
      moduleId: "module1",
      stem: "Your teacher allows AI to help you understand homework, but you must solve the math yourself.",
      options: [
        { text: "“Just give me the final answer so I can write it down.”", feedback: "The answer removes the problem you are meant to solve." },
        { text: "“Solve it and write the steps the way I would write them.”", feedback: "Making AI work look like yours does not make it your work." },
        {
          text: "“Tell me which operation to try first, without solving it.”",
          feedback: "A small hint keeps the important problem-solving with you.",
        },
        { text: "“Work through the first half and I'll finish the rest.”", feedback: "AI is still doing part of the assessed thinking." },
      ],
      correctIndex: 2,
      concept: "hint_vs_solution",
      correction: {
        prompt: "Which is safer to ask for?",
        options: ["“Give me one clue.”", "“Show me the finished solution.”"],
        correctIndex: 0,
      },
    },
    {
      id: "M1-Q3",
      moduleId: "module1",
      stem: "A teacher says AI may be used to brainstorm a speech topic.",
      options: [
        { text: "Brainstorming with AI is always cheating", feedback: "AI brainstorming is not automatically inappropriate when the teacher allows it." },
        {
          text: "AI can brainstorm because the teacher specifically allowed it",
          feedback: "Permission can apply to one specific part of a task.",
        },
        { text: "AI can now write the entire speech", feedback: "Permission to brainstorm is not permission to write the speech." },
        { text: "AI is now allowed for every assignment in that class this term", feedback: "Rules can change from one assignment to another." },
      ],
      correctIndex: 1,
      concept: "permission_context",
      correction: {
        prompt: "Your teacher allows AI for checking spelling only. Does that mean AI can create your conclusion?",
        options: ["Yes", "No"],
        correctIndex: 1,
      },
    },
    {
      id: "M1-Q4",
      moduleId: "module1",
      stem: "Your teacher says project ideas must be created without AI because idea generation is being assessed.",
      options: [
        { text: "Ask AI for ideas but don't tell anyone", feedback: "Hiding the AI use does not change the task." },
        {
          text: "Ask AI for twenty ideas, then choose one yourself",
          feedback: "Choosing from AI's ideas still lets AI do the idea generation.",
        },
        { text: "Create the idea yourself", feedback: "Here, generating the idea is part of the learning being assessed." },
        { text: "Ask AI for ideas and change them slightly", feedback: "Small changes do not fix the main problem." },
      ],
      correctIndex: 2,
      concept: "assessed_skill",
      correction: {
        prompt: "If creating your own slogan is being marked, should AI generate ten slogans for you?",
        options: ["Yes", "No"],
        correctIndex: 1,
      },
    },
    {
      id: "M1-Q5",
      moduleId: "module1",
      stem: "Sofia wrote a paragraph. Her teacher allows AI feedback after the first draft.",
      options: [
        { text: "“Rewrite this so it gets a better mark.”", feedback: "AI would become the writer." },
        { text: "“Replace my weak sentences.”", feedback: "AI would be creating the revised sentences." },
        {
          text: "“Tell me one place where my explanation is unclear.”",
          feedback: "The AI identifies a problem. Sofia still decides what to change and how.",
        },
        { text: "“Make this sound like a Grade 10 student wrote it.”", feedback: "AI would be changing Sofia's voice instead of coaching her." },
      ],
      correctIndex: 2,
      concept: "feedback_vs_rewriting",
      correction: {
        prompt: "Which keeps the writer in control?",
        options: ["“Tell me where I need more detail.”", "“Add the missing details for me.”"],
        correctIndex: 0,
      },
    },
    {
      id: "M1-Q6",
      moduleId: "module1",
      stem: "Why might asking AI for an answer immediately sometimes hurt learning?",
      options: [
        {
          text: "AI's answers are sometimes inaccurate, so they're risky to rely on",
          feedback: "That's a real concern about AI, but it's not the reason immediate answers hurt learning here — the issue is the practice you'd skip, not accuracy.",
        },
        {
          text: "Getting the answer quickly leaves more time to check your other work",
          feedback: "Saving time doesn't replace the practice you skip by not working through the problem yourself.",
        },
        {
          text: "Some thinking and struggling through a problem is useful practice",
          feedback: "Working through some difficulty can strengthen understanding.",
        },
        {
          text: "A teacher might think you cheated even if you solved it honestly",
          feedback: "That's a fair worry, but it's not why skipping the struggle actually hurts your learning.",
        },
      ],
      correctIndex: 2,
      concept: "productive_struggle",
      correction: {
        prompt: "You are confused after trying a problem twice. Which is better?",
        options: ["Ask for one hint", "Immediately copy the answer"],
        correctIndex: 0,
      },
    },
    {
      id: "M1-Q7",
      moduleId: "module1",
      stem: "Ethan asks AI to write his assignment, then changes several words before submitting it.",
      options: [
        { text: "It is now Ethan's thinking", feedback: "Editing something is different from creating the thinking yourself." },
        {
          text: "It is fine because none of the sentences are exactly the same",
          feedback: "The issue is not just identical wording.",
        },
        {
          text: "AI still created the main ideas and response",
          feedback: "Changing wording does not change who produced the main thinking.",
        },
        { text: "It is okay because AI was only used at home, not at school", feedback: "Where AI is used does not decide whether the use fits the assignment." },
      ],
      correctIndex: 2,
      concept: "superficial_rewriting",
      correction: {
        prompt: "AI creates your entire response. You replace ten words. Who created most of the response?",
        options: ["You", "AI"],
        correctIndex: 1,
      },
    },
    {
      id: "M1-Q8",
      moduleId: "module1",
      stem: "You want AI to help with an assignment, but your teacher has not explained whether AI is allowed.",
      options: [
        {
          text: "Use it because the site isn't blocked on your Chromebook",
          feedback: "A site being unblocked is not the same as your teacher allowing it.",
        },
        { text: "Assume it's banned and say nothing", feedback: "You do not need to assume either way. Ask." },
        {
          text: "Ask your teacher before using it for the assignment",
          feedback: "When permission is unclear, asking prevents you from guessing wrong.",
        },
        { text: "Use it, then delete the chat afterwards", feedback: "Deleting evidence does not make the use appropriate." },
      ],
      correctIndex: 2,
      concept: "permission_clarification",
      correction: {
        prompt: "Your class starts using a new app, and you're not sure if its built-in AI features are allowed. What's the safer move?",
        options: ["Try it and see what happens", "Ask before using it"],
        correctIndex: 1,
      },
    },
  ],
  review: {
    heading: "The line in 60 seconds",
    bulletGroups: [
      { heading: "AI can support your thinking:", items: ["explain", "hint", "quiz", "question", "give feedback"] },
      {
        heading: "AI can also replace thinking you were supposed to do:",
        items: ["write", "answer", "solve", "create assessed ideas"],
      },
    ],
    blocks: [
      "Ask:",
      { quote: "What am I supposed to practise — and am I still doing it?" },
      "Remember:",
      { quote: "A tool that is allowed on one assignment may not be allowed on another." },
    ],
    continueLabel: "Try Again",
  },
};
