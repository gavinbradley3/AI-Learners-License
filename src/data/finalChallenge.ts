import type { FinalQuestion } from "../types";

export const finalChallengeBank: readonly FinalQuestion[] = [
  {
    id: "F1",
    category: "support",
    stem: "Teacher allows AI feedback after you write your own draft.",
    context: [{ quote: "Tell me which part of my argument is least convincing and explain why. Don't rewrite it." }],
    options: [
      { text: "Appropriate because AI is giving feedback", feedback: "AI helps identify a weakness, while you remain responsible for deciding how to revise it." },
      { text: "Inappropriate because AI can never read student writing", feedback: "AI reading your writing to give feedback is exactly what the teacher allowed here." },
      { text: "Inappropriate because any AI feedback is cheating", feedback: "Feedback that leaves the revising decisions with you is not the same as AI doing your work." },
      { text: "Appropriate only if AI rewrites the weak section", feedback: "Rewriting would move the work from feedback into replacement." },
    ],
    correctIndex: 0,
    concept: "feedback_vs_rewriting",
    correction: {
      prompt: "Which stays inside AI feedback rather than AI rewriting?",
      options: ["“Point out a weak section.”", "“Rewrite my weak section.”"],
      correctIndex: 0,
    },
  },
  {
    id: "F2",
    category: "support",
    stem: "Design teacher says:",
    context: [
      { quote: "I want to see the ideas you can generate yourself. Do not use AI during brainstorming." },
      "You think of three ideas, then ask AI for ten more before choosing your favourite.",
    ],
    options: [
      {
        text: "Fine because you came up with three ideas yourself",
        feedback: "Making three ideas first doesn't erase the ten AI-generated ones still sitting in the mix — the teacher wanted to see only what you could generate.",
      },
      {
        text: "Fine because you chose the final idea yourself",
        feedback: "Choosing which idea to use isn't the same as generating it — the teacher is assessing where the ideas came from, not who picked the winner.",
      },
      {
        text: "Not appropriate because idea generation is being assessed",
        feedback: "Right — the assignment is specifically testing your own idea generation, and asking AI for more ideas hands that exact skill over.",
      },
      {
        text: "Fine as long as you change the AI idea",
        feedback: "Editing an AI-generated idea still starts from AI's idea, not yours — the teacher wanted to see your original thinking.",
      },
    ],
    correctIndex: 2,
    concept: "assessed_skill",
    correction: {
      prompt: "If original idea generation is being assessed, should AI generate additional ideas?",
      options: ["Yes", "No"],
      correctIndex: 1,
    },
  },
  {
    id: "F3",
    category: "permission",
    stem: "Teacher says:",
    context: [
      { quote: "You may use AI to brainstorm possible documentary topics, but the research and script must be your own." },
      "You ask AI for ten possible topics.",
    ],
    options: [
      { text: "Appropriate", feedback: "The teacher specifically allowed AI for that part of the process." },
      { text: "Inappropriate because AI can never brainstorm", feedback: "The teacher specifically allowed AI to help brainstorm topics here." },
      { text: "Inappropriate unless AI also writes the script", feedback: "The permission covers brainstorming only — the script must stay yours." },
      { text: "Appropriate for the entire project", feedback: "The permission covers brainstorming only, not the research or script." },
    ],
    correctIndex: 0,
    concept: "permission_context",
    correction: {
      prompt: "Permission for brainstorming automatically includes permission for script writing.",
      options: ["True", "False"],
      correctIndex: 1,
    },
  },
  {
    id: "F4",
    category: "tutor",
    stem: "You tried a math problem twice and cannot figure out your next step. AI homework help is allowed.",
    options: [
      {
        text: "“Give me the finished answer so I can move on.”",
        feedback: "A finished answer skips the exact struggle you're supposed to work through — try asking for a hint instead.",
      },
      {
        text: "“Show me exactly what I should submit for this.”",
        feedback: "Asking what to submit turns AI into the one solving the problem, not you.",
      },
      {
        text: "“Look at what I tried and give me one hint about my next step.”",
        feedback: "You've already tried twice — a hint that responds to your attempt keeps the next step yours to figure out.",
      },
      {
        text: "“Solve the whole thing, then I'll copy the process into my work.”",
        feedback: "Copying a process you didn't work out yourself is still someone else's solution, just relabeled as practice.",
      },
    ],
    correctIndex: 2,
    concept: "productive_struggle",
    correction: {
      prompt: "When stuck after trying, choose a hint before a full answer when possible.",
      options: ["True", "False"],
      correctIndex: 0,
    },
  },
  {
    id: "F5",
    category: "verification",
    stem: "AI provides:",
    context: [{ quote: "Chen, Melissa. Digital Learning in Canadian Schools. Alberta Education Research Journal, 2025." }, "It looks believable."],
    options: [
      {
        text: "Nothing — it looks like a real journal article",
        feedback: "Doing nothing means you'd submit a citation you've never actually confirmed exists.",
      },
      {
        text: "Check whether the source actually exists and supports your claim",
        feedback: "Right — a real-looking citation still needs to be found and checked before you rely on it.",
      },
      {
        text: "Ask AI to format the citation more professionally for you",
        feedback: "Better formatting makes a citation look more convincing without making it any more real.",
      },
      {
        text: "Remove the publication year to be safe",
        feedback: "Removing a detail doesn't verify the source — it just makes a fake citation harder to check.",
      },
    ],
    correctIndex: 1,
    concept: "source_verification",
    correction: {
      prompt: "A source looks realistic. Is that enough to know it is real?",
      options: ["Yes", "No"],
      correctIndex: 1,
    },
  },
  {
    id: "F6",
    category: "support",
    stem: "AI writes your full reading response. You rewrite several sentences and add your own opening sentence.",
    options: [
      {
        text: "The response counts as fully yours now",
        feedback: "Adding one sentence and editing a few others still leaves AI's original thinking underneath most of the response.",
      },
      {
        text: "It depends only on how many words you changed",
        feedback: "Word count isn't the issue — the issue is who came up with the ideas and reasoning being assessed.",
      },
      {
        text: "AI still produced most of the thinking being assessed",
        feedback: "Right — most of the understanding this response is supposed to demonstrate still came from AI, not you.",
      },
      {
        text: "It is acceptable because the final version is different",
        feedback: "A different-looking final draft can still be built on someone else's thinking underneath.",
      },
    ],
    correctIndex: 2,
    concept: "superficial_rewriting",
    correction: {
      prompt: "Who should create the main explanation when your understanding is being assessed?",
      options: ["You", "AI"],
      correctIndex: 0,
    },
  },
  {
    id: "F7",
    category: "tutor",
    stem: "You want to prepare for a science quiz.",
    options: [
      {
        text: "Ask AI to write out answers for you to read over",
        feedback: "Reading answers gives you less practice than answering yourself.",
      },
      {
        text: "Ask AI to quiz you one question at a time",
        feedback: "Answering from memory makes you practise what you will need to do later.",
      },
      { text: "Ask AI to predict what mark you'll get", feedback: "Predicting a mark does not help you study." },
      { text: "Ask AI to take the quiz for you", feedback: "That removes the practice entirely." },
    ],
    correctIndex: 1,
    concept: "retrieval_practice",
    correction: {
      prompt: "Which requires more thinking?",
      options: ["Reading an answer", "Answering a question yourself"],
      correctIndex: 1,
    },
  },
  {
    id: "F8",
    category: "verification",
    stem: "AI says:",
    context: [{ quote: "Exactly 71.4% of Canada's freshwater is located in Ontario." }, "It gives no source. You want the statistic on a slide."],
    options: [
      {
        text: "Use it because the decimal makes it precise",
        feedback: "A precise-looking decimal can be just as made up as a rounded one — precision isn't proof.",
      },
      {
        text: "Use it because AI sounded confident about it",
        feedback: "Confidence in how AI says something tells you nothing about whether it's true.",
      },
      {
        text: "Verify the statistic with a reliable source first",
        feedback: "Right — an unsourced statistic needs an independent check before it goes on a slide.",
      },
      {
        text: "Round it to 71% so it looks less specific",
        feedback: "Rounding the number doesn't touch the real problem: it still hasn't been verified.",
      },
    ],
    correctIndex: 2,
    concept: "verification",
    correction: {
      prompt: "Does a very exact number prove AI's information is correct?",
      options: ["Yes", "No"],
      correctIndex: 1,
    },
  },
  {
    id: "F9",
    category: "privacy",
    stem: "A classmate sends you a private message saying they are struggling with a friendship. You want advice.",
    options: [
      {
        text: "Paste their entire message into AI so it has the context",
        feedback: "That message is your classmate's private information, not yours to hand to an AI tool.",
      },
      {
        text: "Upload screenshots of the conversation",
        feedback: "A screenshot still exposes your classmate's private words and identity.",
      },
      {
        text: "Ask a general question without any identifying details",
        feedback: "Right — a general question can get you useful advice without exposing anyone's private situation.",
      },
      {
        text: "Include their name so AI understands better",
        feedback: "Their name isn't necessary for good advice, and including it exposes information that isn't yours to share.",
      },
    ],
    correctIndex: 2,
    concept: "privacy",
    correction: {
      prompt: "Private information about another person is yours to upload wherever you want.",
      options: ["True", "False"],
      correctIndex: 1,
    },
  },
  {
    id: "F10",
    category: "permission",
    stem: "Teacher allows AI to help organize a presentation but says all ideas and research must be yours.",
    options: [
      {
        text: "“Here are my six ideas. Suggest two possible orders for my slides.”",
        feedback: "AI is helping with organization while the required ideas and research remain yours.",
      },
      { text: "“Research my topic and send me the key facts.”", feedback: "The research must stay yours under this permission." },
      { text: "“Write the text for each of my slides.”", feedback: "Writing the slide text goes beyond organizing." },
      {
        text: "“Create the main argument and evidence for my presentation.”",
        feedback: "The main argument must stay yours under this permission.",
      },
    ],
    correctIndex: 0,
    concept: "process_support",
    correction: {
      prompt: "AI can organize ideas you already created when organization help is allowed.",
      options: ["True", "False"],
      correctIndex: 0,
    },
  },
  {
    id: "F11",
    category: "verification",
    stem: "AI gives one answer. Your teacher's textbook gives another.",
    options: [
      {
        text: "Automatically trust AI because it is newer",
        feedback: "Newer isn't the same as more accurate — AI can be out of date or simply wrong.",
      },
      {
        text: "Automatically trust whichever answer is longer and more detailed",
        feedback: "Length has nothing to do with which answer is actually correct.",
      },
      {
        text: "Check reliable sources and ask your teacher if needed",
        feedback: "Right — a disagreement between sources is exactly when it's worth checking further and asking your teacher.",
      },
      {
        text: "Pick whichever answer you prefer",
        feedback: "Picking whichever answer you like better isn't how you figure out which one is true.",
      },
    ],
    correctIndex: 2,
    concept: "conflicting_information",
    correction: {
      prompt: "When reliable-looking sources disagree, should you guess?",
      options: ["Yes", "No"],
      correctIndex: 1,
    },
  },
  {
    id: "F12",
    category: "tutor",
    stem: "Your teacher allows learning supports. You do not understand the word “consequence” in an article. You ask AI to explain the word with a simple example.",
    options: [
      { text: "This can support understanding", feedback: "Understanding a word can help you access the learning without replacing your response." },
      { text: "AI is doing the entire assignment", feedback: "Explaining one word is a small learning support, not the whole assignment." },
      { text: "You must never ask AI about vocabulary", feedback: "Asking about vocabulary can be a useful learning support when allowed." },
      { text: "AI should instead write your response", feedback: "The teacher allowed learning support, not writing your response." },
    ],
    correctIndex: 0,
    concept: "explanation",
    correction: {
      prompt: "Asking for a simpler definition can be learning support when allowed.",
      options: ["True", "False"],
      correctIndex: 0,
    },
  },
  {
    id: "F13",
    category: "support",
    stem: "The assignment is specifically assessing your ability to find and evaluate reliable sources.",
    context: [{ quote: "Find the best three sources for me and tell me which ones are reliable." }],
    options: [
      {
        text: "Strong use because AI saves you research time",
        feedback: "Saving time doesn't matter here — the point of the assignment is to practise finding and evaluating sources yourself.",
      },
      {
        text: "Questionable because AI did the research skill being assessed",
        feedback: "Right — even with real sources, AI just did the exact evaluating skill your teacher wants to see from you.",
      },
      {
        text: "Fine as long as the sources AI found turn out to be real",
        feedback: "The sources being real doesn't fix the problem — you still didn't do the evaluating.",
      },
      {
        text: "Fine as long as you read them all afterward",
        feedback: "Reading the sources afterward doesn't undo the fact that AI did the finding and evaluating for you.",
      },
    ],
    correctIndex: 1,
    concept: "assessed_skill",
    correction: {
      prompt: "If evaluating sources is the skill being assessed, who should evaluate the sources?",
      options: ["The student", "AI"],
      correctIndex: 0,
    },
  },
  {
    id: "F14",
    category: "tutor",
    stem: "Teacher has already given you five approved sources and allows AI as a reading support. You paste a difficult paragraph from one approved source and ask:",
    context: [{ quote: "Explain this paragraph in simpler language. Do not create my research notes." }],
    options: [
      { text: "Potentially appropriate within the teacher's rules", feedback: "Here AI supports comprehension while the student still performs the assigned research work." },
      { text: "Automatically cheating", feedback: "This stays within a reading-support permission the teacher already gave." },
      { text: "AI should write the research notes too", feedback: "The student explicitly asked AI not to create the research notes." },
      {
        text: "Fine, as long as you copy AI's simplified explanation into your research notes",
        feedback: "The student's own prompt already ruled that out — the point was understanding the paragraph, not letting AI's wording become the research notes.",
      },
    ],
    correctIndex: 0,
    concept: "context_dependent_support",
    correction: {
      prompt: "The same AI action can have a different answer depending on what skill the assignment is assessing.",
      options: ["True", "False"],
      correctIndex: 0,
    },
  },
  {
    id: "F15",
    category: "verification",
    stem: "AI gives you important health information that could affect a real decision.",
    options: [
      {
        text: "Treat AI as the final authority on what to do",
        feedback: "Treating AI as the final word is risky for something that could actually affect your health.",
      },
      {
        text: "Check a trustworthy health source and talk to an adult",
        feedback: "Right — real health decisions deserve a trustworthy source and, when it matters, an adult or professional.",
      },
      {
        text: "Trust it if the answer sounds detailed and medical",
        feedback: "A detailed answer can still be wrong — detail isn't the same as accuracy.",
      },
      {
        text: "Ask AI to guarantee its answer is correct",
        feedback: "AI can't actually guarantee its own answer is correct, so asking doesn't add any real certainty.",
      },
    ],
    correctIndex: 1,
    concept: "stakes_and_verification",
    correction: {
      prompt: "The more important a real-world decision is, the more important it is to verify information.",
      options: ["True", "False"],
      correctIndex: 0,
    },
  },
  {
    id: "F16",
    category: "permission",
    stem: "Teacher says:",
    context: [{ quote: "You may use your usual classroom tools." }, "You are not sure whether that includes generative AI."],
    options: [
      {
        text: "Decide that it definitely does",
        feedback: "Assuming it's included is a guess dressed up as a decision — the wording doesn't actually say that.",
      },
      {
        text: "Decide that it definitely does not",
        feedback: "Assuming it's excluded is just as much of a guess as assuming it's included.",
      },
      {
        text: "Ask the teacher",
        feedback: "Right — when the wording is genuinely unclear, asking settles it faster than guessing either way.",
      },
      {
        text: "Use AI and explain afterward",
        feedback: "Using it first and explaining later still means you guessed — asking first avoids the guess entirely.",
      },
    ],
    correctIndex: 2,
    concept: "permission_clarification",
    correction: {
      prompt: "Your teacher's instructions don't mention AI at all for a different assignment. What's the safer move?",
      options: ["Ask before using it", "Assume it's fine since it isn't banned"],
      correctIndex: 0,
    },
  },
  {
    id: "F17",
    category: "support",
    stem: "Teacher allows spellcheck and grammar feedback but says your writing must remain your own.",
    options: [
      {
        text: "“Rewrite this paragraph so it sounds professional.”",
        feedback: "That asks AI to produce new sentences, which goes past the grammar-feedback permission you were given.",
      },
      {
        text: "“Replace my sentences with stronger ones.”",
        feedback: "Replacing your sentences means AI is doing the writing, not just checking it.",
      },
      {
        text: "“Point out my grammar errors without rewriting anything.”",
        feedback: "Right — this stays inside the exact permission: AI points out errors, and you're the one who fixes them.",
      },
      {
        text: "“Change my vocabulary so I sound older than I am.”",
        feedback: "Changing your vocabulary changes your voice, which is outside a spelling-and-grammar permission.",
      },
    ],
    correctIndex: 2,
    concept: "feedback_vs_rewriting",
    correction: {
      prompt: "Which keeps the writer in control?",
      options: ["Identifying an error", "Replacing the sentence"],
      correctIndex: 0,
    },
  },
  {
    id: "F18",
    category: "verification",
    stem: "AI gives an explanation of a historical conflict that makes one side seem completely reasonable and barely mentions the other side.",
    options: [
      {
        text: "Assume the side AI defended must have been the correct one all along",
        feedback: "An answer that only shows one side isn't evidence that side is correct — it may just be missing the other one.",
      },
      {
        text: "Ask what perspectives are missing, then check reliable sources",
        feedback: "Right — a lopsided answer is exactly when it's worth asking what's missing and checking further.",
      },
      {
        text: "Ask AI to make the answer shorter and clearer",
        feedback: "A shorter answer would still be one-sided — length isn't the problem here.",
      },
      {
        text: "Submit it because AI is neutral by design",
        feedback: "AI isn't automatically neutral, and a one-sided answer is a sign it may not be here.",
      },
    ],
    correctIndex: 1,
    concept: "bias",
    correction: {
      prompt: "One-sided answers should make you look for:",
      options: ["missing perspectives and evidence", "a longer version of the same answer"],
      correctIndex: 0,
    },
  },
  {
    id: "F19",
    category: "responsibility",
    stem: "You waited until the night before a project is due. You ask AI to create the whole project because there is not enough time left.",
    options: [
      {
        text: "A tight deadline changes who is supposed to do the actual learning",
        feedback: "Running out of time doesn't change who the assignment expects to do the actual learning — that's still you.",
      },
      {
        text: "AI becomes acceptable whenever you're rushed for time",
        feedback: "Feeling rushed doesn't rewrite the rules the assignment was already built on.",
      },
      {
        text: "Being short on time doesn't change what the assignment expects",
        feedback: "Right — time pressure is real, but it doesn't change what the assignment was designed to have you learn.",
      },
      {
        text: "It's acceptable as long as the project looks good",
        feedback: "Looking good on the outside doesn't mean the required thinking actually happened.",
      },
    ],
    correctIndex: 2,
    concept: "responsibility_under_pressure",
    correction: {
      prompt: "Does being late automatically give permission to hand assessed work to AI?",
      options: ["Yes", "No"],
      correctIndex: 1,
    },
  },
  {
    id: "F20",
    category: "integrated",
    stem: "Teacher allows AI learning support. You wrote your own answer but are unsure whether your reasoning makes sense.",
    options: [
      {
        text: "Ask AI to replace your answer with a better one",
        feedback: "Replacing your answer hands over the exact thinking the assignment wanted to see from you.",
      },
      {
        text: "Ask AI to point out a weakness, then revise and fact-check it yourself",
        feedback: "Right — this uses AI for feedback and verification while you stay the one revising and deciding.",
      },
      {
        text: "Ask AI to make the whole answer sound perfect, then submit it without reading it",
        feedback: "Submitting something unread means you never actually checked whether it's accurate or right for the assignment.",
      },
      {
        text: "Ask AI to decide what you should believe",
        feedback: "Your reasoning and conclusions need to stay yours — AI shouldn't be the one deciding what you believe.",
      },
    ],
    correctIndex: 1,
    concept: "integrated_judgment",
    correction: {
      prompt: "AI can give feedback, but who should make the final decisions?",
      options: ["You", "AI"],
      correctIndex: 0,
    },
  },
];
