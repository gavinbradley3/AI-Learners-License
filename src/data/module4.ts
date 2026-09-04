import type { ModuleContent } from "../types";

export const module4: ModuleContent = {
  id: "module4",
  title: "Know the Boundaries",
  goalSummary: "permission/privacy/responsibility",
  targetTime: "5–6 min",
  screens: [
    {
      type: "info",
      id: "M4-1",
      heading: "“But AI can do it.”",
      blocks: [
        "So can a calculator. So can a search engine.",
        "That does not mean every tool is allowed for every task. School assignments are designed to practise different skills.",
        { quote: "The teacher decides what tools are allowed for a particular task." },
      ],
      sections: [
        {
          heading: "Permission can have limits",
          blocks: [
            "Teacher might say:",
            { quote: "AI is allowed for studying, but not during the test." },
            "or",
            { quote: "AI can give feedback on your draft, but it cannot rewrite it." },
            "or",
            { quote: "Do not use AI for this assignment." },
            "Do not turn:",
            { quote: "AI is allowed for this part" },
            "into:",
            { quote: "AI is allowed for everything." },
          ],
        },
      ],
      continueLabel: "Continue",
    },
    {
      type: "choice",
      id: "M4-3",
      heading: "Permission scenario",
      context: [
        {
          quote:
            "AI may be used to help plan the order of your presentation slides. The research and writing must be your own.",
        },
      ],
      prompt: "What can AI do here?",
      options: [
        { label: "AI writes the research", feedback: "That goes beyond organizing — the research was supposed to stay yours." },
        { label: "AI writes each slide", feedback: "That goes beyond organizing — the slide content was supposed to stay yours." },
        {
          label: "AI helps organize your existing ideas into a possible slide order",
          feedback: "Use the permission you were actually given — not a bigger version of it.",
        },
        { label: "AI creates the entire presentation", feedback: "That goes far beyond the organizing help your teacher allowed." },
      ],
      correctIndex: 2,
      continueLabel: "Continue",
    },
    {
      type: "info",
      id: "M4-4",
      heading: "Privacy",
      blocks: ["Do not enter things like:"],
      bulletGroups: [
        {
          items: [
            "passwords",
            "home address",
            "phone number",
            "private information about another student",
            "private school information",
            "someone else's personal photos or work without permission",
          ],
        },
      ],
      note: "If it is private, personal, or not yours to share, do not paste it into AI.",
      continueLabel: "Continue",
    },
    {
      type: "choice",
      id: "M4-5",
      heading: "Friend scenario",
      context: [
        "A friend sends you a personal message about a family problem.",
        "You want AI to tell you what advice to give.",
      ],
      prompt: "Should you paste your friend's whole message into AI?",
      options: [
        {
          label: "Yes",
          feedback: "The message belongs to your friend too. Ask a general question without exposing their private details.",
        },
        {
          label: "No",
          feedback:
            "Your friend's private message is not yours to share with an AI tool. You could ask a general question without including names or private details.",
        },
      ],
      correctIndex: 1,
      continueLabel: "Continue",
    },
    {
      type: "info",
      id: "M4-6",
      heading: "AI said it. You submitted it.",
      blocks: ["Who is responsible?", { quote: "You are." }, "If AI gives you:"],
      bulletGroups: [
        { items: ["a false fact", "a fake source", "inappropriate wording", "something that breaks the assignment rules"] },
      ],
      note: "“I got it from AI” does not remove your responsibility.",
      continueLabel: "Continue",
    },
    {
      type: "info",
      id: "M4-7",
      heading: "Full 5-Check",
      bulletGroups: [
        {
          items: [
            "Allowed? Is AI allowed here?",
            "Goal? What am I supposed to learn?",
            "Still me? Am I doing that thinking?",
            "Check it? Does the information need confirmation?",
            "Private? Am I sharing something I shouldn't?",
          ],
        },
      ],
      note: "If you cannot answer the first one: Ask your teacher.",
      continueLabel: "Continue",
    },
    {
      type: "deck",
      id: "M4-8",
      heading: "Boundary practice",
      items: [
        {
          id: "M4-8-1",
          prompt:
            "Teacher says AI is allowed to explain difficult vocabulary. Student asks AI to write the assignment conclusion.",
          choiceLabels: ["Outside the boundary", "Fine — the teacher already said AI is allowed"],
          correctIndex: 0,
          feedback: "Permission for one specific use (vocabulary) isn't permission for every use — writing the conclusion goes beyond it.",
        },
        {
          id: "M4-8-2",
          prompt:
            "Student removes names and asks: “What are some respectful ways to support a friend who is having a difficult week?”",
          choiceLabels: ["Safer use", "Still risky — any AI question about a friend is unsafe"],
          correctIndex: 0,
          feedback: "A general question with no identifying details can avoid exposing someone else's private situation.",
        },
        {
          id: "M4-8-3",
          prompt: "AI provides a false fact that the student submits without reading.",
          choiceLabels: ["Student is still responsible", "AI is responsible, since it gave the wrong fact"],
          correctIndex: 0,
          feedback: "You are responsible for what you submit under your name, whether or not you read it first.",
        },
        {
          id: "M4-8-4",
          prompt: "Teacher instructions do not mention AI. Student wants AI to generate ideas.",
          choiceLabels: ["Ask first", "Go ahead — it isn't banned"],
          correctIndex: 0,
          feedback: "Not being banned isn't the same as being allowed. When permission is unclear, ask instead of guessing.",
        },
      ],
      continueLabel: "Continue",
    },
    {
      type: "takeaway",
      id: "M4-takeaway",
      quote: "You are responsible for how you use AI, what you share with it, and what you submit.",
      continueLabel: "Module Challenge",
    },
  ],
  quizBank: [
    {
      id: "M4-Q1",
      moduleId: "module4",
      pattern: "boundary_check",
      stem: "Your teacher allows AI for studying but not for completing the assignment.",
      options: [
        {
          text: "AI can answer the assignment at home",
          feedback: "Doing it at home doesn't change what was actually permitted — only studying was allowed, not the assignment itself.",
        },
        {
          text: "AI can help you practise before you complete the work yourself",
          feedback: "Permission for studying does not automatically extend to the assignment.",
        },
        {
          text: "AI can write half the assignment",
          feedback: "Even half the assignment is still the assignment, which permission for studying doesn't cover.",
        },
        {
          text: "AI can be used anywhere in the course because studying was allowed",
          feedback: "Where you use it doesn't matter — the permission was for studying, not for completing the assignment.",
        },
      ],
      correctIndex: 1,
      concept: "permission_boundary",
      correction: {
        prompt: "Your teacher allows AI to help you review for a quiz, but says nothing about using it during homework that counts for marks. Can you assume homework is covered too?",
        options: ["Yes, review permission covers it", "No, ask before using it there too"],
        correctIndex: 1,
      },
    },
    {
      id: "M4-Q2",
      moduleId: "module4",
      pattern: "need_more_info",
      stem: "The instructions do not say whether AI may be used for brainstorming.",
      options: [
        { text: "Guess", feedback: "Guessing risks getting it wrong when you could have just asked." },
        { text: "Ask the teacher", feedback: "When the rule is unclear, asking is faster than guessing wrong." },
        {
          text: "Use it secretly",
          feedback: "Using it quietly doesn't make it allowed — it just avoids finding out the real answer.",
        },
        {
          text: "Assume every AI use is allowed",
          feedback: "Assuming the widest possible permission is still a guess, not a confirmed answer.",
        },
      ],
      correctIndex: 1,
      concept: "permission_clarification",
      correction: {
        prompt: "A group-work rubric doesn't mention AI at all. A friend says that means it must be fine. Should you go along with that?",
        options: ["No, check with the teacher first", "Yes, no mention means no rule"],
        correctIndex: 0,
      },
    },
    {
      id: "M4-Q3",
      moduleId: "module4",
      pattern: "compare",
      stem: "Which should NOT be entered into an AI tool?",
      options: [
        { text: "“Explain gravity simply.”", feedback: "That's a general science question — nothing private about it." },
        { text: "A made-up practice paragraph", feedback: "A made-up paragraph doesn't involve any real personal information." },
        { text: "Your school account password", feedback: "Passwords are private security information." },
        { text: "“Quiz me on fractions.”", feedback: "That's a practice request, not anything private or identifying." },
      ],
      correctIndex: 2,
      concept: "privacy",
      correction: {
        prompt: "Should you paste your password into a chatbot for help?",
        options: ["Yes", "No"],
        correctIndex: 1,
      },
    },
    {
      id: "M4-Q4",
      moduleId: "module4",
      pattern: "best_next_move",
      stem: "A classmate sends you a private photo.",
      options: [
        {
          text: "Upload it to AI if it helps your assignment",
          feedback: "Helping your assignment doesn't give you permission to share someone else's personal photo.",
        },
        {
          text: "Upload it as long as you remove the classmate's name first",
          feedback: "Removing the name doesn't fix it — it's still their personal photo, shared without asking.",
        },
        {
          text: "Do not upload someone else's personal photo without permission",
          feedback: "Other people's information deserves protection too.",
        },
        { text: "AI tools are automatically private", feedback: "You should not assume that." },
      ],
      correctIndex: 2,
      concept: "others_privacy",
      correction: {
        prompt: "Do you automatically have permission to upload someone else's personal work or photo?",
        options: ["Yes", "No"],
        correctIndex: 1,
      },
    },
    {
      id: "M4-Q5",
      moduleId: "module4",
      pattern: "find_the_problem",
      stem: "AI gives you incorrect information that you submit. Who is responsible for what you submitted?",
      options: [
        { text: "Only the AI company", feedback: "The AI company didn't submit anything under your name — you did." },
        {
          text: "Nobody",
          feedback: "Someone is always responsible for submitted work, and that's the student who turned it in.",
        },
        { text: "You", feedback: "You are responsible for checking and understanding the work you submit." },
        { text: "Your classmate", feedback: "Your classmate had nothing to do with what you submitted." },
      ],
      correctIndex: 2,
      concept: "responsibility",
      correction: {
        prompt: "Does “AI told me” remove your responsibility for submitted work?",
        options: ["Yes", "No"],
        correctIndex: 1,
      },
    },
    {
      id: "M4-Q6",
      moduleId: "module4",
      pattern: "boundary_check",
      stem: "Your teacher allows AI to check spelling but not rewrite sentences.",
      options: [
        { text: "“Rewrite this paragraph so it reads better than it does now.”", feedback: "A full rewrite is far more than checking spelling." },
        {
          text: "“Tell me which words are misspelled without rewriting anything.”",
          feedback: "It stays inside the exact permission the teacher gave.",
        },
        {
          text: "“Make my sentences stronger and clearer.”",
          feedback: "Strengthening sentences is a writing change, not a spelling check.",
        },
        {
          text: "“Change my writing style to sound more formal.”",
          feedback: "Changing your style has nothing to do with spelling — that's outside the permission.",
        },
      ],
      correctIndex: 1,
      concept: "limited_permission",
      correction: {
        prompt: "Your teacher allows AI to suggest better vocabulary words, but says nothing about sentence structure. Can AI reorganize your sentences too?",
        options: ["No, that goes beyond vocabulary", "Yes, it's a similar kind of help"],
        correctIndex: 0,
      },
    },
    {
      id: "M4-Q7",
      moduleId: "module4",
      pattern: "compare",
      stem: "Which is the safest way to ask AI about a friend's situation?",
      options: [
        {
          text: "Paste their entire private conversation into the chat",
          feedback: "The whole conversation includes details that are your friend's to share, not yours.",
        },
        {
          text: "Include their full name and school",
          feedback: "Their name and school identify them — exactly the details a general question can leave out.",
        },
        {
          text: "Ask a general question without identifying private details",
          feedback: "You can often ask for general information without exposing another person's private details.",
        },
        {
          text: "Upload screenshots of the conversation",
          feedback: "A screenshot exposes the same private details as pasting the text, just as an image.",
        },
      ],
      correctIndex: 2,
      concept: "privacy_preserving_question",
      correction: {
        prompt: "Remove private details before asking a general question.",
        options: ["Yes", "No"],
        correctIndex: 0,
      },
    },
    {
      id: "M4-Q8",
      moduleId: "module4",
      pattern: "compare",
      stem: "Which statement is best?",
      options: [
        { text: "If the tool exists, students have the right to use it on any assignment they get", feedback: "Availability does not equal permission." },
        { text: "Using AI on schoolwork is always a form of cheating", feedback: "Many AI uses can support learning when allowed." },
        {
          text: "Whether AI fits depends on the task, the goal, and the teacher's instructions",
          feedback: "Context changes the answer.",
        },
        { text: "AI is fine as long as nobody notices", feedback: "Hiding a choice does not make it appropriate." },
      ],
      correctIndex: 2,
      concept: "overall_judgment",
      correction: {
        prompt: "Can the same AI use be allowed on one assignment and not another?",
        options: ["Yes", "No"],
        correctIndex: 0,
      },
    },
  ],
  review: {
    heading: "Know the boundaries",
    bulletGroups: [
      {
        items: [
          "Allowed? What did my teacher say?",
          "Private? Am I sharing anything personal or not mine to share?",
          "Responsible? Have I read, understood, and checked what I am submitting?",
        ],
      },
    ],
    blocks: ["When permission is unclear:", { quote: "Ask." }],
    continueLabel: "Try Again",
  },
};
