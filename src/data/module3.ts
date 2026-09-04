import type { ModuleContent } from "../types";

export const module3: ModuleContent = {
  id: "module3",
  title: "Sounds Right. Check It.",
  goalSummary: "verification and bias",
  targetTime: "5–6 min",
  screens: [
    {
      type: "info",
      id: "M3-1",
      heading: "Which sounds more trustworthy?",
      blocks: [
        { quote: "I think the answer might be 1867." },
        "or",
        { quote: "The correct answer is definitely 1867. This is a well-established historical fact." },
        "The second sounds more confident. But confidence is not proof. AI can sound certain and still be wrong.",
      ],
      sections: [
        {
          heading: "AI can make things up",
          blocks: [
            "You may hear AI hallucination. It means:",
            { quote: "AI gives information that is false or made up, sometimes while sounding completely confident." },
            "It can invent facts, quotations, book details, website links, sources, statistics, and names.",
          ],
          note: "That does not mean everything AI says is false. It means AI output needs judgment.",
        },
      ],
      continueLabel: "Continue",
    },
    {
      type: "choice",
      id: "M3-3",
      heading: "Convincing example",
      context: [
        { quote: "The Canadian government officially named the beaver Canada's national animal in 1973 under the Canadian Wildlife Identity Act." },
        "It sounds specific.",
        "There is a year and an official-sounding law.",
      ],
      prompt: "Should you trust it just because it sounds convincing?",
      options: [
        {
          label: "Yes",
          feedback: "Specific details can make information sound believable without proving it is true. Check an independent reliable source.",
        },
        {
          label: "No",
          feedback: "Correct. Specific details can make false information sound believable. Confirm the claim using a reliable source before using it.",
        },
      ],
      correctIndex: 1,
      continueLabel: "Continue",
    },
    {
      type: "info",
      id: "M3-4",
      heading: "Stop → Check → Confirm",
      bulletGroups: [
        { heading: "STOP", items: ["Do not automatically accept it."] },
        { heading: "CHECK", items: ["Does anything seem surprising, important, or uncertain?"] },
        { heading: "CONFIRM", items: ["Check a reliable source."] },
        {
          heading: "Examples:",
          items: ["textbook", "teacher-provided material", "trusted organization", "reliable reference source", "original source"],
        },
      ],
      continueLabel: "Continue",
    },
    {
      type: "choice",
      id: "M3-5",
      heading: "Publication date scenario",
      context: [
        { quote: "Your novel was first published in 1962." },
        "You need the date for a research presentation.",
      ],
      prompt: "What should you do?",
      options: [
        { label: "Trust it because the answer is specific", feedback: "A specific-sounding detail is not proof it's accurate." },
        {
          label: "Ask AI “Are you sure?” and trust the second answer",
          feedback: "Asking AI to double-check itself is not the same as checking an independent source.",
        },
        {
          label: "Confirm the publication date using a reliable source",
          feedback: "Confirming with an independent, reliable source is what actually verifies a claim.",
        },
        { label: "Use it because one incorrect year does not matter", feedback: "Even one wrong detail can undermine your presentation — it's worth checking." },
      ],
      correctIndex: 2,
      continueLabel: "Continue",
    },
    {
      type: "info",
      id: "M3-6",
      heading: "Sources can be fake too",
      blocks: ["AI can produce a source that:"],
      bulletGroups: [
        {
          items: [
            "does not exist",
            "exists but does not support the claim",
            "has the wrong author or title",
            "is not reliable",
          ],
        },
      ],
      note: "Do not trust a citation just because it looks professional. If you plan to use a source, open it and check it.",
      sections: [
        {
          heading: "Bias",
          blocks: [
            "Bias means a response may unfairly favour one viewpoint or group.",
            "Human-created information can contain:",
          ],
          bulletGroups: [
            { items: ["stereotypes", "missing viewpoints", "unfair assumptions", "disagreements"] },
          ],
          note: "When a topic has different perspectives, ask: “Whose viewpoint might be missing?”",
        },
      ],
      continueLabel: "Continue",
    },
    {
      type: "deck",
      id: "M3-8",
      heading: "Trust Meter practice",
      choiceLabels: ["Probably okay to use", "Check first"],
      items: [
        {
          id: "M3-8-1",
          prompt: "“Give me a made-up example of a metaphor.”",
          correctIndex: 0,
          feedback: "The request is creative, not a factual claim.",
        },
        {
          id: "M3-8-2",
          prompt: "“What year did this treaty officially take effect?”",
          correctIndex: 1,
          feedback: "Exact historical facts used in schoolwork should be confirmed.",
        },
        {
          id: "M3-8-3",
          prompt: "“Quiz me on the notes I pasted.”",
          correctIndex: 0,
          feedback: "The AI is using material you provided, although you should still watch for mistakes.",
        },
        {
          id: "M3-8-4",
          prompt: "“Give me three academic sources proving this claim.”",
          correctIndex: 1,
          feedback: "Never assume generated sources actually exist or support the claim.",
        },
        {
          id: "M3-8-5",
          prompt: "“Explain this definition from my teacher's handout in simpler words.”",
          correctIndex: 0,
          feedback: "You can compare the explanation with the original material.",
        },
      ],
      continueLabel: "Continue",
    },
    {
      type: "takeaway",
      id: "M3-takeaway",
      quote: "AI gives you information to judge — not information you automatically have to believe.",
      continueLabel: "Module Challenge",
    },
  ],
  quizBank: [
    {
      id: "M3-Q1",
      moduleId: "module3",
      stem: "AI gives an exact statistic for your presentation.",
      options: [
        { text: "Use it immediately", feedback: "Specific does not mean verified." },
        { text: "Confirm it using a reliable source", feedback: "An exact-looking number can still be wrong. Verify it independently." },
        { text: "Ask AI whether it invented it", feedback: "AI checking itself is not independent confirmation." },
        { text: "Make the number less exact", feedback: "Changing the number does not make it accurate." },
      ],
      correctIndex: 1,
      concept: "verification",
      correction: {
        prompt: "AI gives you an important fact. Before submitting it:",
        options: ["Confirm it", "Assume it is right"],
        correctIndex: 0,
      },
    },
    {
      id: "M3-Q2",
      moduleId: "module3",
      stem: "What is an AI hallucination?",
      options: [
        { text: "When the screen flashes", feedback: "That does not describe an AI hallucination." },
        {
          text: "When AI confidently gives false or made-up information",
          feedback: "The dangerous part is that made-up information can sound real.",
        },
        { text: "When a student disagrees with AI", feedback: "That does not describe an AI hallucination." },
        { text: "When AI loads slowly", feedback: "That does not describe an AI hallucination." },
      ],
      correctIndex: 1,
      concept: "hallucination",
      correction: {
        prompt: "Can AI sound confident while being wrong?",
        options: ["Yes", "No"],
        correctIndex: 0,
      },
    },
    {
      id: "M3-Q3",
      moduleId: "module3",
      stem: "AI provides a book quotation and page number. You cannot find the quotation in the book.",
      options: [
        { text: "Submit it because AI probably knows", feedback: "AI can invent quotations." },
        { text: "Change the page number", feedback: "Guessing a page number makes the problem worse." },
        {
          text: "Do not use the quotation unless you can verify it",
          feedback: "If you cannot confirm the quote exists, you should not present it as real.",
        },
        { text: "Put quotation marks around it anyway", feedback: "Quotation marks do not make something authentic." },
      ],
      correctIndex: 2,
      concept: "invented_quote",
      correction: {
        prompt: "You cannot find an AI-generated quote in the original source. Use it?",
        options: ["Yes", "No"],
        correctIndex: 1,
      },
    },
    {
      id: "M3-Q4",
      moduleId: "module3",
      stem: "AI gives you three websites for a research project.",
      options: [
        { text: "Put all three in your bibliography", feedback: "Generated citations can be wrong." },
        {
          text: "Open the sources and check whether they exist and support your information",
          feedback: "A source should actually exist and support the claim you are using.",
        },
        { text: "Trust them because they have professional titles", feedback: "Professional-looking details are not proof." },
        { text: "Ask AI to create three more", feedback: "More generated sources do not solve verification." },
      ],
      correctIndex: 1,
      concept: "source_verification",
      correction: {
        prompt: "Before citing a website AI suggests, should you actually open it?",
        options: ["Yes", "No"],
        correctIndex: 0,
      },
    },
    {
      id: "M3-Q5",
      moduleId: "module3",
      stem: "AI gives an answer that strongly supports only one side of a controversial issue.",
      options: [
        { text: "“Can you make this longer?”", feedback: "Length does not fix bias." },
        {
          text: "“What important viewpoints or evidence might be missing?”",
          feedback: "Looking for missing perspectives helps you notice possible bias.",
        },
        { text: "“Can you sound more confident?”", feedback: "Confidence does not improve fairness." },
        { text: "“Can you guarantee this is unbiased?”", feedback: "AI cannot simply guarantee that its response has no bias." },
      ],
      correctIndex: 1,
      concept: "bias",
      correction: {
        prompt: "A response gives only one viewpoint. Look for:",
        options: ["missing viewpoints or evidence", "a longer version of the same answer"],
        correctIndex: 0,
      },
    },
    {
      id: "M3-Q6",
      moduleId: "module3",
      stem: "AI answers your question differently twice.",
      options: [
        { text: "The newest answer must be correct", feedback: "None of these methods proves which answer is accurate." },
        {
          text: "AI output should be evaluated rather than automatically trusted",
          feedback: "Different answers are another reminder that AI is not an automatic authority.",
        },
        { text: "The longest answer is correct", feedback: "None of these methods proves which answer is accurate." },
        { text: "Choose the answer you like more", feedback: "None of these methods proves which answer is accurate." },
      ],
      correctIndex: 1,
      concept: "uncertainty",
      correction: {
        prompt: "If AI gives conflicting answers:",
        options: ["Verify", "Guess"],
        correctIndex: 0,
      },
    },
    {
      id: "M3-Q7",
      moduleId: "module3",
      stem: "Which information most needs independent checking?",
      options: [
        { text: "“Give me a fictional superhero name.”", feedback: "This is an intentionally creative request." },
        { text: "“Make up a practice sentence using a semicolon.”", feedback: "This is an intentionally creative request." },
        {
          text: "“What percentage of Canadians live in Alberta?”",
          feedback: "That is a factual statistic that could be used as real information.",
        },
        { text: "“Ask me a question about my notes.”", feedback: "This is a practice activity." },
      ],
      correctIndex: 2,
      concept: "verification_priority",
      correction: {
        prompt: "Which needs more checking?",
        options: ["A made-up character name", "A population statistic"],
        correctIndex: 1,
      },
    },
    {
      id: "M3-Q8",
      moduleId: "module3",
      stem: "You ask AI, “Are you sure this fact is correct?” It says, “Yes, absolutely.”",
      options: [
        { text: "It is confirmed", feedback: "Repetition or confidence does not verify a claim." },
        { text: "Use it because AI sounded certain", feedback: "Repetition or confidence does not verify a claim." },
        { text: "Check another reliable source", feedback: "AI agreeing with itself is not independent evidence." },
        { text: "Ask AI to say it one more time", feedback: "Repetition or confidence does not verify a claim." },
      ],
      correctIndex: 2,
      concept: "independent_confirmation",
      correction: {
        prompt: "Does asking the same AI twice count as checking another source?",
        options: ["Yes", "No"],
        correctIndex: 1,
      },
    },
  ],
  review: {
    heading: "AI can sound sure and still be wrong",
    bulletGroups: [
      { heading: "Stop", items: ["Do not automatically trust the answer."] },
      { heading: "Check", items: ["Look closely at important facts, claims, statistics, quotes, and sources."] },
      { heading: "Confirm", items: ["Use another reliable source."] },
    ],
    blocks: [{ quote: "Asking AI “Are you sure?” is not the same as independent verification." }],
    continueLabel: "Try Again",
  },
};
