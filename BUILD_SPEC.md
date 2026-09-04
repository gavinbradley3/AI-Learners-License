# AI Learner Licence — Claude Code Build Specification

**Status:** v1 classroom pilot  
**Audience:** Grades 7–8, approximately ages 12–14  
**Primary device:** school Chromebook  
**Target completion time:** 25–35 minutes including optional pre-check  
**Purpose:** teach students to make smart decisions about using generative AI for learning.

---

# 1. Product goal

Build a polished, responsive educational website called **AI Learner Licence**.

The core idea is:

> AI can help you learn. It should not do the learning for you.

Do not turn that sentence into a repeated slogan. The website must teach students what it means through realistic school situations and decisions.

This is a **small classroom pilot**, not a school-wide policy system, district certification, LMS, AI chatbot, or student-account platform.

The most important product outcome is that a 12–14-year-old becomes better at deciding:

- Is AI allowed here?
- What am I supposed to learn or practise?
- Am I still doing that thinking?
- Should I check what AI told me?
- Am I sharing something private?
- What could I ask AI instead that would actually help me learn?

---

# 2. Non-negotiable instructional principles

1. Teach judgment, not rule memorization.
2. Use scenarios and choices more often than lecture text.
3. The same AI action can be appropriate in one context and inappropriate in another.
4. Teacher instructions and task purpose matter.
5. AI is not automatically cheating.
6. AI is not automatically allowed.
7. Changing a few words in AI-generated work does not make the thinking the student's.
8. Productive struggle matters: some effort, confusion, and retrying are part of learning.
9. AI can act as tutor, coach, practice partner, or feedback tool.
10. AI output must be evaluated rather than automatically trusted.
11. Private or sensitive information should not be shared with AI.
12. Students remain responsible for what they submit.
13. The final licence does not override teacher instructions.

---

# 3. Student language and tone

Write/display content at approximately a Grade 6–7 reading level.

Tone:
- modern
- direct
- intelligent
- conversational
- slightly playful
- never childish

Avoid:
- “Hey kiddos”
- “superstar”
- “AI adventure”
- cheesy encouragement
- excessive emoji
- policy/legal wording
- unexplained jargon
- long paragraphs
- walls of text

If these terms appear, explain them immediately:
- **productive struggle** = working through some difficulty can help you learn
- **AI hallucination** = AI gives false or made-up information, sometimes confidently
- **bias** = a response may unfairly favour one viewpoint or group

Most feedback should be 1–3 sentences.

---

# 4. Technical architecture

Use:

- React
- TypeScript
- Vite
- standard CSS / CSS modules or a small organized CSS architecture
- no backend
- no database
- no student login
- no external AI API
- no analytics SDK
- no ad/tracking SDK
- no component library unless genuinely necessary
- no Tailwind unless there is a strong implementation reason; ordinary CSS is preferred for this small project
- no unnecessary runtime dependencies

The website must be buildable as a static site.

Use clean separation between:
- course content/data
- quiz selection/mastery logic
- persistence/state
- UI components

Suggested structure (Claude may improve names if the separation remains clear):

```text
src/
  components/
  content/
  data/
    courseContent.ts
  logic/
    quizEngine.ts
    mastery.ts
  storage/
    progressStorage.ts
  pages/
  styles/
  types/
```

Create:
- `README.md`
- `CLAUDE.md`
- tests for pure quiz/mastery logic
- a clear npm script set for dev/build/test

Do not put large banks of educational content directly inside React component files.

---

# 5. Privacy and data

Version 1 is intentionally local-only.

Do not collect:
- names
- email addresses
- student IDs
- school IDs
- location
- device identifiers
- account information

Store progress only in the current browser using localStorage.

Use one versioned localStorage root key, for example:

`aiLearnerLicence:v1`

Store only what is needed:
- pre-check completed/skipped
- pre-check answer correctness or score
- current location in course
- completed modules
- current module progress
- module quiz attempts and current correction state
- final challenge state/score
- exit survey answers if completed
- completion status

If localStorage is unavailable, the course should still work in memory for the current session. Do not crash.

Provide a small **Reset progress** control in a low-emphasis settings/menu area. It must require confirmation.

Do not expose internal state or raw JSON to students.

---

# 6. Global UX

## Visual direction

The site should feel like a modern digital permit/credential system, not a cartoon driving school.

Aim for:
- clean
- premium
- school appropriate
- modern dashboard/credential feel
- strong spacing and typography
- subtle line/grid/permit motifs
- restrained animation
- dark navy/slate/charcoal with light surfaces and a restrained success accent
- accessible contrast

Avoid:
- mascots
- coins
- XP
- fake currency
- leaderboards
- childish badges
- excessive confetti
- gaming clutter
- police/DMV parody

Use a system font stack to reduce external dependencies.

## Responsive targets

Must work well at:
- 1366×768 Chromebook
- 1024×768
- tablet widths
- 360px mobile width

No horizontal scrolling at normal zoom.

Buttons need large touch/click targets.

All interactions must be keyboard accessible.

Visible focus states are required.

Do not rely on colour alone to communicate correct/incorrect status.

## Layout

Desktop/Chromebook:
- centered main content area
- comfortable maximum reading width
- clear course progress at top
- content cards that do not feel cramped

Mobile:
- one-column layout
- no tiny text
- no side-by-side answer choices that become unreadable

---

# 7. Navigation and progress rules

Top-level flow:

`Welcome → optional Pre-check → Course Map → Module 1 → Module 2 → Module 3 → Module 4 → Final Challenge → Licence → Exit Survey`

Modules unlock sequentially.

Course Map states:
- Locked
- Available
- In progress
- Cleared

Use restrained labels such as **CLEARED** or a checkmark. Do not use “LEVEL UP”.

Course progress should show meaningful progress, not XP.

Recommended:
- `2 of 4 modules cleared`
- within a module: `Module 2 · 4 of 7`

Do not show a fake percentage if it would be misleading because quiz retries vary.

Learning screens:
- Back is allowed
- Continue/Next is explicit

Active mastery quiz:
- Back is disabled once a question has been submitted
- answers cannot be changed after submission
- the selected answer becomes locked
- feedback appears inline
- Continue appears after feedback

Practice interactions:
- do not affect mastery scores

If the student exits to the Course Map, progress is saved.

On refresh/reopen, resume safely from saved progress. Never restore a half-submitted answer into a broken state.

---

# 8. Core student decision tool

This appears throughout the course.

## The 5-Check

### Before you use AI: 5 quick checks

You do not need a giant rulebook.

Ask yourself five questions.

### 1. Allowed?
**Is AI allowed for this task — or this part of the task?**

### 2. Goal?
**What am I supposed to learn or practise?**

### 3. Still me?
**Am I still doing that thinking and making the decisions?**

### 4. Check it?
**Does anything AI told me need to be confirmed somewhere reliable?**

### 5. Private?
**Am I sharing anything I should keep private?**

Short recurring version:

**Allowed? → Goal? → Still me? → Check it? → Private?**

Supporting note:

> You will not always need all five checks. But if something feels questionable, they can help you figure out why.

---

# 9. Course map

| Item | Student title | Main goal | Target time | Mastery |
|---|---|---|---:|---|
| Optional pre-check | What Would You Do? | measure starting judgment | 2–3 min | no pass/fail |
| Module 1 | Where's the Line? | support vs replacement | 6–7 min | 4/5 + correction mastery |
| Module 2 | Make AI Coach You | tutor/coach/practice uses | 5–6 min | 4/5 + correction mastery |
| Module 3 | Sounds Right. Check It. | verification and bias | 5–6 min | 4/5 + correction mastery |
| Module 4 | Know the Boundaries | permission/privacy/responsibility | 5–6 min | 4/5 + correction mastery |
| Final | AI Learner Licence Challenge | combine all concepts | 6–8 min | 10/12 + correction mastery |

---

# 10. Optional pre-check

## Behaviour

- Offer it on the welcome flow.
- Buttons: `Take the 2-minute pre-check` and `Skip pre-check`.
- It is not for marks.
- It never blocks access.
- Do **not** reveal correct/incorrect feedback during the pre-check; that would contaminate the baseline.
- After question 5, save the score locally and show: `Starting point saved. Now let's build the skills.`
- Do not shame or rank students.
- Student may not retake the pre-check after entering Module 1 unless full course progress is reset.

## Intro wording

### Before We Start

These five questions are just a starting check.

They are **not for marks**.

Choose what you think is best.

Do not worry if you are unsure — that is what the course is for.

## Questions

### PRE-1
Your teacher allows AI for homework help but says you must solve the math questions yourself.

A. Ask AI for the answers  
B. Ask AI for one hint when you are stuck  
C. Ask AI to solve half  
D. Copy AI's solution

Correct: **B**  
Concept: support_vs_replacement

### PRE-2
AI gives you an exact historical fact for a presentation.

A. Trust it  
B. Confirm it using a reliable source  
C. Use it if it sounds confident  
D. Change the wording

Correct: **B**  
Concept: verification

### PRE-3
Your teacher says AI may be used for brainstorming on this assignment.

A. Automatically inappropriate  
B. Appropriate within the permission given  
C. AI can now write everything  
D. AI is now allowed on all future assignments

Correct: **B**  
Concept: permission_context

### PRE-4
Which is safest?

A. Paste your friend's private messages into AI  
B. Give AI your password  
C. Ask a general question without private identifying details  
D. Upload someone's personal photo without permission

Correct: **C**  
Concept: privacy

### PRE-5
You wrote your own paragraph. AI feedback is allowed.

A. “Rewrite this.”  
B. “Tell me one place where my explanation is unclear.”  
C. “Replace my conclusion.”  
D. “Make this sound like someone else wrote it.”

Correct: **B**  
Concept: feedback_vs_rewriting

---

# 11. Module experience pattern

Each module should feel fast.

Use a consistent pattern:

1. short hook/decision
2. very short teaching cards
3. one or more practice decisions
4. short key idea
5. mastery challenge
6. corrections/review only when needed
7. completion screen

Do not make every card a separate full-page route if a small sequence can live cleanly inside one screen.

Feedback should appear inline rather than sending the student to a separate feedback page.

---

# 12. Module 1 — Where's the Line?

## Learning goal

Students distinguish AI that supports learning from AI that replaces thinking/work they are expected to do. They recognize that teacher instructions and assignment purpose can change the answer.

## Screen flow

### M1-1 — Hook: Same tool. Different use.

Two students are writing a science explanation.

Ava asks AI:

> “Explain convection to me using a simple example.”

Noah asks AI:

> “Write my convection explanation so I can hand it in.”

Both used AI.

But did they use it in the same way?

Buttons:
- `Basically the same`
- `Definitely different`

If `Basically the same`:
> Not quite. Both students opened an AI tool, but what the AI is doing matters more than the fact that they used it.

If `Definitely different`:
> Right. Ava is using AI to understand the idea. Noah is asking AI to produce the work he is supposed to produce.

Continue button: `See the difference`

### M1-2 — Help or replacement?

A useful first question is:

> **Is AI helping me do the thinking — or doing the thinking for me?**

AI can support you by:
- explaining
- giving hints
- asking questions
- quizzing you
- giving feedback
- helping you organize a task

AI can replace your learning by:
- writing your response
- solving the problem you are meant to solve
- creating your ideas when idea-making is being assessed
- answering questions you are supposed to answer

Button: `Next`

### M1-3 — Some hard parts are supposed to be hard.

Learning often includes moments like:

> “Wait. I don't get this yet.”

That is not automatically a problem.

Sometimes your brain needs to **work through confusion, remember something, try an idea, or make a mistake**.

That useful effort is sometimes called **productive struggle**.

It just means:

> **Working through some difficulty can help you learn.**

AI can help when you are stuck.

But if AI removes **every difficult part**, it can also remove the practice you needed.

Button: `Try a situation`

### M1-4 — Math scenario

Your teacher allows AI for homework help but says you must solve each question yourself.

Which request fits best?

A. “Solve question 7 and show me what to write.”  
B. “Give me the answer, then I will figure out how it works.”  
C. “Give me one hint about what I should try next. Don't solve it.”  
D. “Rewrite the question so it looks easier and answer it.”

Correct: **C**

Correct feedback:
> Exactly. You are getting help with the next step, but the problem is still yours to solve.

A:
> That gives away the work you are supposed to practise. A hint would give you support without removing the problem-solving.

B:
> Seeing the answer first can remove much of the thinking. Ask for a hint or a question instead.

D:
> Making the wording clearer could help, but asking AI to answer it still replaces the work.

### M1-5 — Context changes the answer

Consider brainstorming.

Assignment A:
> “You may use AI to brainstorm possible presentation topics.”

Using AI to brainstorm is allowed.

Assignment B:
> “Part of your mark is based on creating your own original project idea. Do not use AI to generate ideas.”

Same AI action. Different assignment. Different answer.

> **The purpose of the task matters.**

### M1-6 — English scenario

Teacher says:
> “Write your own paragraph first. You may use AI afterward for feedback.”

You write the paragraph.

A. Ask AI to rewrite the entire paragraph so it sounds better.  
B. Ask AI to identify one place where your explanation is confusing.  
C. Ask AI to add three better examples directly into your paragraph.  
D. Ask AI to create a new paragraph and combine it with yours.

Correct: **B**

Feedback:
> Yes. AI points out a problem, but **you** still decide how to fix your writing.

For A/C/D:
> That moves AI from feedback into creating part of the writing. The teacher allowed feedback, not replacement writing.

### M1-7 — “But I changed the words.”

Suppose AI writes an entire answer for you.

You replace a few words and move two sentences around.

Did you now do the thinking?

Buttons: `Yes` / `No`

Correct: **No**

Correct feedback:
> Right. Editing AI's answer is not the same as creating your own answer when that thinking was the point of the task.

Incorrect feedback:
> Changing wording changes the surface, but AI still created the main ideas and response.

### M1-8 — Quick Sort

Show one card at a time or a compact sequential deck.

Choices:
- `Supports learning`
- `Probably replaces learning`
- `Need more information`

1. “Quiz me on these vocabulary words. One at a time.”
   - Correct: Supports learning
   - Feedback: `You are still doing the remembering.`

2. “Write my reading response about why the character changed.”
   - Correct: Probably replaces learning
   - Feedback: `If the response is supposed to show your understanding, AI is doing that thinking.`

3. “Give me five possible topics for my project.”
   - Correct: Need more information
   - Feedback: `This depends on the assignment. Is brainstorming allowed, or is creating the idea part of what you are being assessed on?`

4. “Here is my paragraph. Tell me one idea that needs more explanation. Don't rewrite it.”
   - Correct: Supports learning
   - Feedback: `AI gives feedback. You remain the writer.`

5. “Finish these ten math questions for me.”
   - Correct: Probably replaces learning
   - Feedback: `AI is doing the practice instead of you.`

6. “Explain why my answer to question 4 is wrong, but don't give me the correct answer yet.”
   - Correct: Supports learning
   - Feedback: `This helps you find your mistake while keeping the next step yours.`

Practice does not affect mastery score.

### M1-9 — Bring in the 5-Check

When the line gets blurry, start with:

**Allowed?** Is AI allowed?  
**Goal?** What am I supposed to practise?  
**Still me?** Am I still doing that?

For this module, those first three checks will solve most situations.

Button: `Module Challenge`

### M1 takeaway

> **Use AI to support the thinking — not quietly replace the thinking you were supposed to do.**

---

# 13. Module 1 quiz bank (8)

Every question has exactly four options and one clearly best answer.

### M1-Q1
Liam has to explain how a food chain works. His teacher allows AI for learning help but says the explanation must be his own.

A. Ask AI to write the explanation  
B. Ask AI to explain food chains, then write his own explanation  
C. Ask AI to write it and change several words  
D. Ask AI for the shortest possible answer to submit

Correct: **B**

Correct feedback:
> AI helps Liam understand the idea, but Liam still creates the assessed explanation.

A: `AI would be producing the explanation Liam is supposed to create.`  
C: `Changing AI's wording does not make the original thinking Liam's.`  
D: `A shorter AI answer is still an AI-created answer.`

Concept: support_vs_replacement

Correction:
Your history response must show your understanding. Which is better?
A. “Explain this event simply, then ask me to explain it back.”
B. “Write my response.”
Correct: A

### M1-Q2
Your teacher allows AI to help you understand homework, but you must solve the math yourself.

A. “Give me the answer only.”  
B. “Solve it and make the steps look like mine.”  
C. “Tell me what operation I should consider first without solving it.”  
D. “Do the first half of the question.”

Correct: **C**

Correct feedback:
> A small hint keeps the important problem-solving with you.

A: `The answer removes the problem you are meant to solve.`  
B: `Making AI work look like yours does not make it your work.`  
D: `AI is still doing part of the assessed thinking.`

Concept: hint_vs_solution

Correction:
A. “Give me one clue.”
B. “Show me the finished solution.”
Correct: A

### M1-Q3
A teacher says AI may be used to brainstorm a speech topic.

A. Brainstorming with AI is cheating  
B. AI can brainstorm because the teacher specifically allowed it  
C. AI can now write the entire speech  
D. AI is allowed for every assignment in that class

Correct: **B**

Correct feedback:
> Permission can apply to one specific part of a task.

A: `AI brainstorming is not automatically inappropriate when the teacher allows it.`  
C: `Permission to brainstorm is not permission to write the speech.`  
D: `Rules can change from one assignment to another.`

Concept: permission_context

Correction:
Your teacher allows AI for checking spelling only. Does that mean AI can create your conclusion?
A. Yes
B. No
Correct: B

### M1-Q4
Your teacher says project ideas must be created without AI because idea generation is being assessed.

A. Ask AI for ideas but don't tell anyone  
B. Ask AI for twenty ideas, then choose one yourself  
C. Create the idea yourself  
D. Ask AI for ideas and change them slightly

Correct: **C**

Correct feedback:
> Here, generating the idea is part of the learning being assessed.

A: `Hiding the AI use does not change the task.`  
B: `Choosing from AI's ideas still lets AI do the idea generation.`  
D: `Small changes do not fix the main problem.`

Concept: assessed_skill

Correction:
If creating your own slogan is being marked, should AI generate ten slogans for you?
A. Yes
B. No
Correct: B

### M1-Q5
Sofia wrote a paragraph. Her teacher allows AI feedback after the first draft.

A. “Rewrite this so it gets a better mark.”  
B. “Replace my weak sentences.”  
C. “Tell me one place where my explanation is unclear.”  
D. “Make this sound like a Grade 10 student wrote it.”

Correct: **C**

Correct feedback:
> The AI identifies a problem. Sofia still decides what to change and how.

A: `AI would become the writer.`  
B: `AI would be creating the revised sentences.`  
D: `AI would be changing Sofia's voice instead of coaching her.`

Concept: feedback_vs_rewriting

Correction:
A. “Tell me where I need more detail.”
B. “Add the missing details for me.”
Correct: A

### M1-Q6
Why might asking AI for an answer immediately sometimes hurt learning?

A. AI always gives wrong answers  
B. Students should never get help  
C. Some thinking and struggling through a problem is useful practice  
D. Teachers do not like technology

Correct: **C**

Correct feedback:
> Working through some difficulty can strengthen understanding.

A: `AI can be right or wrong. That is not the main issue here.`  
B: `Help is useful when it supports the learning.`  
D: `The issue is what helps you learn, not whether technology is liked.`

Concept: productive_struggle

Correction:
You are confused after trying a problem twice. Which is better?
A. Ask for one hint
B. Immediately copy the answer
Correct: A

### M1-Q7
Ethan asks AI to write his assignment, then changes several words before submitting it.

A. It is now Ethan's thinking  
B. It is fine because none of the sentences are exactly the same  
C. AI still created the main ideas and response  
D. It is always okay if AI is only used at home

Correct: **C**

Correct feedback:
> Changing wording does not change who produced the main thinking.

A: `Editing something is different from creating the thinking yourself.`  
B: `The issue is not just identical wording.`  
D: `Where AI is used does not decide whether the use fits the assignment.`

Concept: superficial_rewriting

Correction:
AI creates your entire response. You replace ten words. Who created most of the response?
A. You
B. AI
Correct: B

### M1-Q8
You want AI to help with an assignment, but your teacher has not explained whether AI is allowed.

A. Use it because AI is available online  
B. Assume it is banned  
C. Ask your teacher before using it for the assignment  
D. Use it but delete the chat later

Correct: **C**

Correct feedback:
> When permission is unclear, asking prevents you from guessing wrong.

A: `Access does not equal permission.`  
B: `You do not need to assume either way. Ask.`  
D: `Deleting evidence does not make the use appropriate.`

Concept: permission_clarification

Correction:
The AI rule for an assignment is unclear. What should you do?
A. Guess
B. Ask the teacher
Correct: B

---

# 14. Module 2 — Make AI Coach You

## Learning goal

Students learn simple ways to make AI act as a tutor, coach, practice partner, or feedback tool without handing over the assessed thinking.

## Screen flow

### M2-1 — Hook

Compare:

> “Do my science questions.”

and

> “Ask me one science question at a time. Don't show the answer until I respond.”

Same AI. Very different job.

### M2-2 — Four useful AI jobs

Instead of making AI your answer machine, try making it your:

**Tutor**
> “Explain this in simpler language.”

**Coach**
> “Give me one hint without solving it.”

**Practice partner**
> “Quiz me one question at a time.”

**Feedback tool**
> “Tell me where my explanation is unclear. Don't rewrite it.”

### M2-3 — Improve the prompt

Weak:
> “Help me with fractions.”

Better:
> “I don't understand how to add fractions with different denominators. Explain it simply and give me one example. Then give me a question to try myself.”

You do not need fancy prompt-writing skills.

Tell AI:
1. what you are stuck on
2. what kind of help you want
3. what you still want to do yourself

### M2-4 — Writing coach scenario

You have written a social studies response and are not sure your ideas make sense.

A. “Make this way better.”  
B. “Rewrite this at a higher level.”  
C. “Read my response and ask me two questions about ideas that need more explanation. Don't rewrite anything.”  
D. “Replace anything that sounds weak.”

Correct: **C**

Feedback:
> Strong choice. AI helps you notice weaknesses, but the improvements still come from you.

For A/B/D:
> That asks AI to take over some of the revising. Asking for questions or feedback keeps the decisions with you.

### M2-5 — Help can come in levels

When really stuck, try:

1. **Question** — “Ask me a question that might get me unstuck.”
2. **Hint** — “Give me one small hint.”
3. **Example** — “Show me a different example.”
4. **Explanation** — “Explain the idea again in simpler language.”

Then try the work yourself.

### M2-6 — Study mode

Weak:
> “Tell me everything I need to know about ecosystems.”

Better:
> “Quiz me on ecosystems one question at a time. After I answer, tell me what I got right and what I should review.”

Why stronger?

Because **you have to retrieve the information from your own brain**.

### M2-7 — Break down a task

> “Help me break this assignment into five small steps. Don't create the actual content for me.”

This can help you start without handing over the assignment.

### M2-8 — Build a Better Request practice

1. “I'm studying for a test on cells…”
   A. “…give me all the answers.”
   B. “…write a study sheet I can memorize.”
   C. “…quiz me with one question at a time and wait for my answer.”
   D. “…do my review questions.”
   Correct: C

2. “I'm stuck on this equation…”
   A. “…solve it.”
   B. “…tell me the answer.”
   C. “…give me one hint about what to try next.”
   D. “…finish the first three steps.”
   Correct: C

3. “Here is my own project idea…”
   A. “…replace it with something better.”
   B. “…ask me questions that could help me develop it.”
   C. “…create the whole project.”
   D. “…write the presentation.”
   Correct: B

Practice feedback should briefly explain why. Practice does not affect mastery.

### M2 takeaway

> **Do not just ask AI for help. Decide what kind of help will keep you thinking.**

---

# 15. Module 2 quiz bank

### M2-Q1
You want to practise vocabulary.

A. “List the definitions.”  
B. “Quiz me one word at a time and wait for my answer.”  
C. “Answer my vocabulary sheet.”  
D. “Write definitions I can submit.”

Correct: **B**

Correct:
> Retrieving the definitions yourself turns AI into practice instead of an answer sheet.

A: `Reading definitions can help, but it gives you less practice remembering them.`  
C: `AI would complete the practice for you.`  
D: `AI would create work you are supposed to produce.`

Concept: retrieval_practice

Correction:
Want to practise capitals?
A. Ask AI to quiz you
B. Ask AI for a completed answer sheet
Correct: A

### M2-Q2
You do not understand a paragraph in your science textbook.

A. “Explain this in simpler language and give me a new example.”  
B. “Write my science response.”  
C. “Answer tomorrow's quiz questions.”  
D. “Tell me what mark I'll get.”

Correct: **A**

Correct:
> AI is helping you understand the content, not creating your assessed response.

B: `That moves from explanation to replacement.`  
C: `That removes the practice.`  
D: `Predicting a mark does not solve the learning problem.`

Concept: explanation

Correction:
If a definition is confusing, asking for a simpler explanation is:
A. A useful learning use when allowed
B. The same as asking AI to write the assignment
Correct: A

### M2-Q3
You want feedback on your writing without having AI rewrite it.

A. “Fix everything.”  
B. “Make this sound smarter.”  
C. “Tell me the two places where my reasoning is hardest to follow. Don't rewrite them.”  
D. “Write a stronger version.”

Correct: **C**

Correct:
> This keeps the decisions and rewriting with you.

A/B/D:
> These prompts hand part or all of the revision work to AI instead of asking for feedback.

Concept: feedback_vs_rewriting

Correction:
A. “Point out one weak section.”
B. “Replace my weak section.”
Correct: A

### M2-Q4
You have no idea how to start a large project. AI use is allowed for planning.

A. “Complete the project.”  
B. “Break the task into six smaller steps without creating the project content.”  
C. “Create everything and I'll edit it.”  
D. “Find someone else's project to copy.”

Correct: **B**

Correct:
> AI can reduce the size of the problem without taking over the actual work.

A/C: `AI would create the product.`  
D: `Copying another project does not support your learning.`

Concept: task_breakdown

Correction:
AI can help you make a plan while you still make the product.
A. True
B. False
Correct: A

### M2-Q5
You have tried a math problem and are stuck.

A. “Answer it.”  
B. “Give me one hint about my next step.”  
C. “Show every step.”  
D. “Do the difficult part.”

Correct: **B**

Correct:
> Start with the smallest amount of help that gets you moving again.

A/C/D:
> These give away much more of the problem-solving.

Concept: graduated_help

Correction:
Which usually protects more thinking?
A. A hint
B. A full solution
Correct: A

### M2-Q6
What makes this prompt useful?

> “Ask me three questions that will help me improve my project idea.”

A. AI creates the project  
B. AI makes decisions for you  
C. AI pushes you to think about your own idea  
D. AI guarantees the idea is good

Correct: **C**

Correct:
> Questions can push your thinking without replacing it.

A/B: `You still create and decide.`  
D: `AI cannot guarantee quality.`

Concept: coaching_questions

Correction:
A. “Give me your idea.”
B. “Ask me a question about my idea.”
Correct: B

### M2-Q7
Which study prompt gives you the most active practice?

A. “Summarize the whole unit.”  
B. “Give me notes to read.”  
C. “Ask me questions one at a time and make me answer before giving feedback.”  
D. “Tell me what will be on the test.”

Correct: **C**

Correct:
> You actually have to recall and use what you know.

A/B: `These may support review, but they are more passive.`  
D: `AI does not necessarily know what your teacher will test.`

Concept: active_study

Correction:
Which gives your brain more practice?
A. Reading answers
B. Answering questions yourself
Correct: B

### M2-Q8
Which prompt best tells AI what kind of help you want?

A. “Help.”  
B. “Do this.”  
C. “I'm confused about why seasons happen. Explain it simply, then ask me one question to check my understanding.”  
D. “Make school easier.”

Correct: **C**

Correct:
> It names the problem, the kind of help, and what the student will still do.

A/B/D:
> AI has to guess what useful help would look like.

Concept: clear_learning_prompt

Correction:
A useful learning prompt usually explains what you are stuck on and:
A. what kind of help you want
B. your favourite colour
Correct: A

---

# 16. Module 3 — Sounds Right. Check It.

## Learning goal

Students recognize that AI can confidently provide inaccurate, invented, incomplete, or biased information and use a simple verification habit.

## Screen flow

### M3-1 — Hook

Which sounds more trustworthy?

> “I think the answer might be 1867.”

or

> “The correct answer is definitely 1867. This is a well-established historical fact.”

The second sounds more confident.

But confidence is not proof.

AI can sound certain and still be wrong.

### M3-2 — AI can make things up

You may hear **AI hallucination**.

It means:

> **AI gives information that is false or made up, sometimes while sounding completely confident.**

It can invent:
- facts
- quotations
- book details
- website links
- sources
- statistics
- names

That does not mean everything AI says is false.

It means:

> **AI output needs judgment.**

### M3-3 — Convincing example

AI says:

> “The Canadian government officially named the beaver Canada's national animal in 1973 under the Canadian Wildlife Identity Act.”

It sounds specific.

There is a year and an official-sounding law.

Should you trust it just because it sounds convincing?

Buttons: `Yes` / `No`

Correct: **No**

Feedback:
> Correct. Specific details can make false information sound believable. Confirm the claim using a reliable source before using it.

If Yes:
> Specific details can make information sound believable without proving it is true. Check an independent reliable source.

### M3-4 — Stop → Check → Confirm

### STOP
Do not automatically accept it.

### CHECK
Does anything seem surprising, important, or uncertain?

### CONFIRM
Check a reliable source.

Examples:
- textbook
- teacher-provided material
- trusted organization
- reliable reference source
- original source

### M3-5 — Publication date scenario

AI tells you:
> “Your novel was first published in 1962.”

You need the date for a research presentation.

A. Trust it because the answer is specific  
B. Ask AI “Are you sure?” and trust the second answer  
C. Confirm the publication date using a reliable source  
D. Use it because one incorrect year does not matter

Correct: **C**

Feedback:
> Asking AI to double-check itself is not the same as checking an independent source.

### M3-6 — Sources can be fake too

AI can produce a source that:
- does not exist
- exists but does not support the claim
- has the wrong author or title
- is not reliable

> **Do not trust a citation just because it looks professional.**

If you plan to use a source, open it and check it.

### M3-7 — Bias

**Bias** means a response may unfairly favour one viewpoint or group.

Human-created information can contain:
- stereotypes
- missing viewpoints
- unfair assumptions
- disagreements

When a topic has different perspectives, ask:

> **“Whose viewpoint might be missing?”**

### M3-8 — Trust Meter practice

Choices:
- `Probably okay to use`
- `Check first`

1. “Give me a made-up example of a metaphor.”
   - Probably okay to use
   - `The request is creative, not a factual claim.`

2. “What year did this treaty officially take effect?”
   - Check first
   - `Exact historical facts used in schoolwork should be confirmed.`

3. “Quiz me on the notes I pasted.”
   - Probably okay to use
   - `The AI is using material you provided, although you should still watch for mistakes.`

4. “Give me three academic sources proving this claim.”
   - Check first
   - `Never assume generated sources actually exist or support the claim.`

5. “Explain this definition from my teacher's handout in simpler words.”
   - Probably okay to use
   - `You can compare the explanation with the original material.`

### M3 takeaway

> **AI gives you information to judge — not information you automatically have to believe.**

---

# 17. Module 3 quiz bank

### M3-Q1
AI gives an exact statistic for your presentation.

A. Use it immediately  
B. Confirm it using a reliable source  
C. Ask AI whether it invented it  
D. Make the number less exact

Correct: **B**

Correct:
> An exact-looking number can still be wrong. Verify it independently.

A: `Specific does not mean verified.`  
C: `AI checking itself is not independent confirmation.`  
D: `Changing the number does not make it accurate.`

Concept: verification

Correction:
AI gives you an important fact. Before submitting it:
A. Confirm it
B. Assume it is right
Correct: A

### M3-Q2
What is an AI hallucination?

A. When the screen flashes  
B. When AI confidently gives false or made-up information  
C. When a student disagrees with AI  
D. When AI loads slowly

Correct: **B**

Correct:
> The dangerous part is that made-up information can sound real.

A/C/D:
> Those do not describe an AI hallucination.

Concept: hallucination

Correction:
Can AI sound confident while being wrong?
A. Yes
B. No
Correct: A

### M3-Q3
AI provides a book quotation and page number. You cannot find the quotation in the book.

A. Submit it because AI probably knows  
B. Change the page number  
C. Do not use the quotation unless you can verify it  
D. Put quotation marks around it anyway

Correct: **C**

Correct:
> If you cannot confirm the quote exists, you should not present it as real.

A: `AI can invent quotations.`  
B: `Guessing a page number makes the problem worse.`  
D: `Quotation marks do not make something authentic.`

Concept: invented_quote

Correction:
You cannot find an AI-generated quote in the original source. Use it?
A. Yes
B. No
Correct: B

### M3-Q4
AI gives you three websites for a research project.

A. Put all three in your bibliography  
B. Open the sources and check whether they exist and support your information  
C. Trust them because they have professional titles  
D. Ask AI to create three more

Correct: **B**

Correct:
> A source should actually exist and support the claim you are using.

A: `Generated citations can be wrong.`  
C: `Professional-looking details are not proof.`  
D: `More generated sources do not solve verification.`

Concept: source_verification

Correction:
Before citing a website AI suggests, should you actually open it?
A. Yes
B. No
Correct: A

### M3-Q5
AI gives an answer that strongly supports only one side of a controversial issue.

A. “Can you make this longer?”  
B. “What important viewpoints or evidence might be missing?”  
C. “Can you sound more confident?”  
D. “Can you guarantee this is unbiased?”

Correct: **B**

Correct:
> Looking for missing perspectives helps you notice possible bias.

A: `Length does not fix bias.`  
C: `Confidence does not improve fairness.`  
D: `AI cannot simply guarantee that its response has no bias.`

Concept: bias

Correction:
A response gives only one viewpoint. Look for:
A. missing viewpoints or evidence
B. a longer version of the same answer
Correct: A

### M3-Q6
AI answers your question differently twice.

A. The newest answer must be correct  
B. AI output should be evaluated rather than automatically trusted  
C. The longest answer is correct  
D. Choose the answer you like more

Correct: **B**

Correct:
> Different answers are another reminder that AI is not an automatic authority.

A/C/D:
> None of these methods proves which answer is accurate.

Concept: uncertainty

Correction:
If AI gives conflicting answers:
A. Verify
B. Guess
Correct: A

### M3-Q7
Which information most needs independent checking?

A. “Give me a fictional superhero name.”  
B. “Make up a practice sentence using a semicolon.”  
C. “What percentage of Canadians live in Alberta?”  
D. “Ask me a question about my notes.”

Correct: **C**

Correct:
> That is a factual statistic that could be used as real information.

A/B: `These are intentionally creative requests.`  
D: `This is a practice activity.`

Concept: verification_priority

Correction:
Which needs more checking?
A. A made-up character name
B. A population statistic
Correct: B

### M3-Q8
You ask AI, “Are you sure this fact is correct?” It says, “Yes, absolutely.”

A. It is confirmed  
B. Use it because AI sounded certain  
C. Check another reliable source  
D. Ask AI to say it one more time

Correct: **C**

Correct:
> AI agreeing with itself is not independent evidence.

A/B/D:
> Repetition or confidence does not verify a claim.

Concept: independent_confirmation

Correction:
Does asking the same AI twice count as checking another source?
A. Yes
B. No
Correct: B

---

# 18. Module 4 — Know the Boundaries

## Learning goal

Students apply teacher instructions, privacy limits, and responsibility when deciding how to use AI.

## Screen flow

### M4-1 — Hook

# “But AI can do it.”

So can a calculator.

So can a search engine.

That does not mean every tool is allowed for every task.

School assignments are designed to practise different skills.

> **The teacher decides what tools are allowed for a particular task.**

### M4-2 — Permission can have limits

Teacher might say:

> “AI is allowed for studying, but not during the test.”

or

> “AI can give feedback on your draft, but it cannot rewrite it.”

or

> “Do not use AI for this assignment.”

Do not turn:

> “AI is allowed for this part”

into:

> “AI is allowed for everything.”

### M4-3 — Permission scenario

Teacher says:

> “AI may be used to help plan the order of your presentation slides. The research and writing must be your own.”

A. AI writes the research  
B. AI writes each slide  
C. AI helps organize your existing ideas into a possible slide order  
D. AI creates the entire presentation

Correct: **C**

Feedback:
> Use the permission you were actually given — not a bigger version of it.

### M4-4 — Privacy

Do not enter things like:
- passwords
- home address
- phone number
- private information about another student
- private school information
- someone else's personal photos or work without permission

> **If it is private, personal, or not yours to share, do not paste it into AI.**

### M4-5 — Friend scenario

A friend sends you a personal message about a family problem.

You want AI to tell you what advice to give.

Should you paste your friend's whole message into AI?

Buttons: `Yes` / `No`

Correct: **No**

Correct feedback:
> Your friend's private message is not yours to share with an AI tool. You could ask a general question without including names or private details.

Incorrect feedback:
> The message belongs to your friend too. Ask a general question without exposing their private details.

### M4-6 — Responsibility

# AI said it. You submitted it.

Who is responsible?

**You are.**

If AI gives you:
- a false fact
- a fake source
- inappropriate wording
- something that breaks the assignment rules

“I got it from AI” does not remove your responsibility.

> **Read it. Understand it. Check it. Make sure it follows the rules.**

### M4-7 — Full 5-Check

**Allowed?** Is AI allowed here?  
**Goal?** What am I supposed to learn?  
**Still me?** Am I doing that thinking?  
**Check it?** Does the information need confirmation?  
**Private?** Am I sharing something I shouldn't?

If you cannot answer the first one:

> **Ask your teacher.**

### M4-8 — Boundary practice

1. Teacher says AI is allowed to explain difficult vocabulary. Student asks AI to write the assignment conclusion.
   - Answer: Outside the boundary.
   - Feedback: `Permission for one use is not permission for every use.`

2. Student removes names and asks:
   > “What are some respectful ways to support a friend who is having a difficult week?”
   - Answer: Safer use.
   - Feedback: `A general question can avoid exposing someone else's private details.`

3. AI provides a false fact that the student submits without reading.
   - Answer: Student is still responsible.
   - Feedback: `You are responsible for what you submit under your name.`

4. Teacher instructions do not mention AI. Student wants AI to generate ideas.
   - Answer: Ask first.
   - Feedback: `When permission is unclear, do not guess.`

### M4 takeaway

> **You are responsible for how you use AI, what you share with it, and what you submit.**

---

# 19. Module 4 quiz bank

### M4-Q1
Your teacher allows AI for studying but not for completing the assignment.

A. AI can answer the assignment at home  
B. AI can help you practise before you complete the work yourself  
C. AI can write half the assignment  
D. AI can be used anywhere because studying was allowed

Correct: **B**

Correct:
> Permission for studying does not automatically extend to the assignment.

A/C/D:
> These expand the permission beyond what the teacher gave.

Concept: permission_boundary

Correction:
“AI allowed for study practice” means “AI allowed to write the assignment.”
A. True
B. False
Correct: B

### M4-Q2
The instructions do not say whether AI may be used for brainstorming.

A. Guess  
B. Ask the teacher  
C. Use it secretly  
D. Assume every AI use is allowed

Correct: **B**

Correct:
> When the rule is unclear, asking is faster than guessing wrong.

A/C/D:
> These all make assumptions instead of checking.

Concept: permission_clarification

Correction:
Not sure whether AI is allowed?
A. Ask
B. Guess
Correct: A

### M4-Q3
Which should NOT be entered into an AI tool?

A. “Explain gravity simply.”  
B. A made-up practice paragraph  
C. Your school account password  
D. “Quiz me on fractions.”

Correct: **C**

Correct:
> Passwords are private security information.

A/B/D:
> These do not require private personal information.

Concept: privacy

Correction:
Should you paste your password into a chatbot for help?
A. Yes
B. No
Correct: B

### M4-Q4
A classmate sends you a private photo.

A. Upload it to AI if it helps your assignment  
B. Upload it if you remove the classmate's name  
C. Do not upload someone else's personal photo without permission  
D. AI tools are automatically private

Correct: **C**

Correct:
> Other people's information deserves protection too.

A/B: `Removing a name does not automatically give you permission to share a personal photo.`  
D: `You should not assume that.`

Concept: others_privacy

Correction:
Do you automatically have permission to upload someone else's personal work or photo?
A. Yes
B. No
Correct: B

### M4-Q5
AI gives you incorrect information that you submit.

Who is responsible for what you submitted?

A. Only the AI company  
B. Nobody  
C. You  
D. Your classmate

Correct: **C**

Correct:
> You are responsible for checking and understanding the work you submit.

A/B/D:
> The work was submitted under your name.

Concept: responsibility

Correction:
Does “AI told me” remove your responsibility for submitted work?
A. Yes
B. No
Correct: B

### M4-Q6
Your teacher allows AI to check spelling but not rewrite sentences.

A. “Rewrite this paragraph.”  
B. “Tell me which words are misspelled without rewriting anything.”  
C. “Make my sentences stronger.”  
D. “Change my writing style.”

Correct: **B**

Correct:
> It stays inside the exact permission the teacher gave.

A/C/D:
> These go beyond spelling.

Concept: limited_permission

Correction:
Permission for spelling means permission for rewriting.
A. True
B. False
Correct: B

### M4-Q7
Which is the safest way to ask AI about a friend's situation?

A. Paste their entire private conversation  
B. Include their full name and school  
C. Ask a general question without identifying private details  
D. Upload screenshots of the conversation

Correct: **C**

Correct:
> You can often ask for general information without exposing another person's private details.

A/B/D:
> These share information that is not yours to expose.

Concept: privacy_preserving_question

Correction:
Remove private details before asking a general question.
A. Yes
B. No
Correct: A

### M4-Q8
Which statement is best?

A. If AI exists, students have the right to use it on any assignment  
B. AI is always cheating  
C. Whether AI is appropriate depends on the task, the learning goal, and the teacher's instructions  
D. AI is fine if nobody notices

Correct: **C**

Correct:
> Context changes the answer.

A: `Availability does not equal permission.`  
B: `Many AI uses can support learning when allowed.`  
D: `Hiding a choice does not make it appropriate.`

Concept: overall_judgment

Correction:
Can the same AI use be allowed on one assignment and not another?
A. Yes
B. No
Correct: A

---

# 20. Module mastery engine

Each module has an 8-question bank.

## Initial attempt

- Randomly choose 5 unique questions.
- No duplicates in the same attempt.
- Questions may be shuffled.
- Answer order may be shuffled only if the implementation keeps answer identity and feedback correct. If there is any risk, keep authored order.
- Practice activity performance never affects quiz score.

## Immediate feedback

On answer:
1. lock all choices
2. visually identify the selected choice
3. show correct/incorrect status with text/icon, not colour alone
4. show the authored feedback
5. show `Continue`

Do not allow answer changes after feedback is shown.

## Score rule

Pass threshold: **4/5**

However, score alone does not clear the module.

Every missed quiz question creates a correction requirement.

## Correction queue

After the 5-question attempt:
- gather each missed question's paired correction scenario
- deduplicate by original question ID
- present corrections one at a time
- correction answers are not part of the numeric score
- student must clear all corrections

If a correction is wrong:
- show a short explanation
- keep the same concept active
- allow the student to retry the correction after reading the explanation
- do not shame
- do not decrement points
- repeat until correct

For v1, do **not** generate new correction questions dynamically. Use the authored correction scenario. Deterministic content is required.

## If score is 4/5 or 5/5

- finish queued corrections
- then mark module CLEARED
- unlock next module

## If score is 3/5 or lower

After corrections:
- show the module's 60-second review
- then start a new 5-question attempt

New attempt selection:
1. prioritize questions the student has not yet seen
2. prioritize concepts they missed previously
3. fill remaining slots from the bank
4. never duplicate a question inside an attempt
5. avoid presenting the exact same five-question set as the immediately previous attempt unless mathematically unavoidable
6. allow unlimited attempts
7. do not display an attempt count as a failure metric

A module clears only when:
- a single attempt scores at least 4/5
- AND all corrections from that passing attempt are cleared

Previously failed attempts remain only in local state for the session summary; they do not permanently penalize the student.

---

# 21. 60-second reviews

## Module 1

### The line in 60 seconds

AI can **support** your thinking:
- explain
- hint
- quiz
- question
- give feedback

AI can also **replace** thinking you were supposed to do:
- write
- answer
- solve
- create assessed ideas

Ask:

> **What am I supposed to practise — and am I still doing it?**

Remember:

> A tool that is allowed on one assignment may not be allowed on another.

Button: `Try Again`

## Module 2

### Make AI coach you

When you need help, try asking for:
- a simpler explanation
- one example
- one question
- one hint
- feedback
- smaller steps

Instead of:
> “Do this for me.”

Try:
> **“Help me do this myself.”**

Button: `Try Again`

## Module 3

### AI can sound sure and still be wrong

### Stop
Do not automatically trust the answer.

### Check
Look closely at important facts, claims, statistics, quotes, and sources.

### Confirm
Use another reliable source.

> Asking AI “Are you sure?” is **not** the same as independent verification.

Button: `Try Again`

## Module 4

### Know the boundaries

**Allowed?** What did my teacher say?  
**Private?** Am I sharing anything personal or not mine to share?  
**Responsible?** Have I read, understood, and checked what I am submitting?

When permission is unclear:

> **Ask.**

Button: `Try Again`

---

# 22. Final AI Learner Licence Challenge

## Intro screen

# Final Challenge

You have cleared all four modules.

Now you will get **12 school situations**.

Some are obvious.

Some are not.

Use what you learned:

> **Allowed? → Goal? → Still me? → Check it? → Private?**

You need **10 out of 12**.

If you miss something, you will get another situation testing the same idea.

No timer.

Think it through.

Button: `Start Challenge`

## Selection rules

Select 12 unique questions from the 20-question bank.

Try to maintain this composition:
- 3 support/replacement or assessed-thinking items
- 2 tutor/learning-support items
- 3 verification/bias/source items
- 2 permission/context items
- 1 privacy item
- 1 integrated responsibility/judgment item

If category balancing code becomes brittle, use a simple category-tag selection algorithm with tests. Do not hardcode one fixed 12-question exam.

Passing score: **10/12**

Every missed question queues its authored correction.

Licence is earned only when:
- score >= 10/12
- AND all missed-question corrections are answered correctly

If score <= 9:
- do not say “failed”
- show: `A few decisions need another look. Review your missed ideas, then take a new challenge.`
- show a concise summary of the two most-missed concept categories
- present corrections
- then generate a new 12-question challenge
- prioritize unseen final questions
- no penalty for retries

---

# 23. Final challenge bank (20)

### F1 — English feedback
Teacher allows AI feedback after you write your own draft.

> “Tell me which part of my argument is least convincing and explain why. Don't rewrite it.”

A. Appropriate because AI is giving feedback  
B. Inappropriate because AI can never read student writing  
C. Inappropriate because any AI feedback is cheating  
D. Appropriate only if AI rewrites the weak section

Correct: **A**

Feedback:
> AI helps identify a weakness, while you remain responsible for deciding how to revise it.

Concept: feedback_vs_rewriting  
Category: support

Correction:
A. “Point out a weak section.”
B. “Rewrite my weak section.”
Correct: A

### F2 — Original brainstorming
Design teacher says:
> “I want to see the ideas you can generate yourself. Do not use AI during brainstorming.”

You think of three ideas, then ask AI for ten more before choosing your favourite.

A. Fine because you made three yourself  
B. Fine because you chose the final idea  
C. Not appropriate because idea generation is being assessed  
D. Fine if you change the AI idea

Correct: **C**

Feedback:
> The issue is not who selected the idea. The teacher is assessing who **generated** the ideas.

Concept: assessed_skill  
Category: support

Correction:
If original idea generation is being assessed, should AI generate additional ideas?
A. Yes
B. No
Correct: B

### F3 — Allowed brainstorming
Teacher says:
> “You may use AI to brainstorm possible documentary topics, but the research and script must be your own.”

You ask AI for ten possible topics.

A. Appropriate  
B. Inappropriate because AI can never brainstorm  
C. Inappropriate unless AI also writes the script  
D. Appropriate for the entire project

Correct: **A**

Feedback:
> The teacher specifically allowed AI for that part of the process.

Concept: permission_context  
Category: permission

Correction:
Permission for brainstorming automatically includes permission for script writing.
A. True
B. False
Correct: B

### F4 — Math help
You tried a math problem twice and cannot figure out your next step. AI homework help is allowed.

A. “Give me the finished answer.”  
B. “Show me exactly what to submit.”  
C. “Look at what I tried and give me one hint about my next step.”  
D. “Solve it, then I'll copy the process.”

Correct: **C**

Feedback:
> You have already attempted the problem. A hint gives useful support without taking over the solution.

Concept: productive_struggle  
Category: tutor

Correction:
When stuck after trying, choose a hint before a full answer when possible.
A. True
B. False
Correct: A

### F5 — Fake citation
AI provides:
> Chen, Melissa. *Digital Learning in Canadian Schools*. Alberta Education Research Journal, 2025.

It looks believable.

A. Nothing  
B. Check whether the source actually exists and supports your claim  
C. Ask AI to format it more professionally  
D. Remove the publication year

Correct: **B**

Feedback:
> A professional-looking citation can still be invented or inaccurate.

Concept: source_verification  
Category: verification

Correction:
A source looks realistic. Is that enough to know it is real?
A. Yes
B. No
Correct: B

### F6 — Changing AI writing
AI writes your full reading response. You rewrite several sentences and add your own opening sentence.

A. The response is now fully yours  
B. It depends only on how many words you changed  
C. AI still produced much of the thinking you were supposed to demonstrate  
D. It is acceptable because the final version is different

Correct: **C**

Feedback:
> Changing wording does not automatically move the thinking back to you.

Concept: superficial_rewriting  
Category: support

Correction:
Who should create the main explanation when your understanding is being assessed?
A. You
B. AI
Correct: A

### F7 — Studying
You want to prepare for a science quiz.

A. Ask AI to create answers to read  
B. Ask AI to quiz you one question at a time and wait for your response  
C. Ask AI to predict your mark  
D. Ask AI to take the quiz

Correct: **B**

Feedback:
> Answering from memory makes you practise what you will need to do later.

Concept: retrieval_practice  
Category: tutor

Correction:
Which requires more thinking?
A. Reading an answer
B. Answering a question yourself
Correct: B

### F8 — Confident fact
AI says:
> “Exactly 71.4% of Canada's freshwater is located in Ontario.”

It gives no source. You want the statistic on a slide.

A. Use it because the decimal makes it precise  
B. Use it because AI sounds confident  
C. Verify the statistic with a reliable source first  
D. Round it to 71%

Correct: **C**

Feedback:
> Precision can make a claim look convincing without making it accurate.

Concept: verification  
Category: verification

Correction:
Does a very exact number prove AI's information is correct?
A. Yes
B. No
Correct: B

### F9 — Private conversation
A classmate sends you a private message saying they are struggling with a friendship. You want advice.

A. Paste their entire message into AI  
B. Upload screenshots  
C. Ask a general question without sharing identifying or private details  
D. Include their name so AI understands better

Correct: **C**

Feedback:
> You can ask for general help without exposing someone else's private information.

Concept: privacy  
Category: privacy

Correction:
Private information about another person is yours to upload wherever you want.
A. True
B. False
Correct: B

### F10 — Presentation planning
Teacher allows AI to help **organize** a presentation but says all ideas and research must be yours.

A. “Here are my six ideas. Suggest two possible orders for my slides.”  
B. “Research my topic.”  
C. “Write my slide text.”  
D. “Create my main argument.”

Correct: **A**

Feedback:
> AI is helping with organization while the required ideas and research remain yours.

Concept: process_support  
Category: permission

Correction:
AI can organize ideas you already created when organization help is allowed.
A. True
B. False
Correct: A

### F11 — AI disagrees with textbook
AI gives one answer. Your teacher's textbook gives another.

A. Automatically trust AI because it is newer  
B. Automatically trust whichever answer is longer  
C. Investigate using reliable sources and ask your teacher if needed  
D. Pick the answer you prefer

Correct: **C**

Feedback:
> A disagreement is a reason to investigate, not guess.

Concept: conflicting_information  
Category: verification

Correction:
When reliable-looking sources disagree, should you guess?
A. Yes
B. No
Correct: B

### F12 — Vocabulary support
Your teacher allows learning supports. You do not understand the word “consequence” in an article.

You ask AI to explain the word with a simple example.

A. This can support understanding  
B. AI is doing the entire assignment  
C. You must never ask AI about vocabulary  
D. AI should instead write your response

Correct: **A**

Feedback:
> Understanding a word can help you access the learning without replacing your response.

Concept: explanation  
Category: tutor

Correction:
Asking for a simpler definition can be learning support when allowed.
A. True
B. False
Correct: A

### F13 — Research shortcut
The assignment is specifically assessing your ability to **find and evaluate reliable sources**.

You ask AI:
> “Find the best three sources for me and tell me which ones are reliable.”

A. Strong use because AI saves time  
B. Questionable because AI is doing the research skill being assessed  
C. Fine if the sources are real  
D. Fine if you read them afterward

Correct: **B**

Feedback:
> Even if the sources exist, AI is performing the exact source-finding and evaluating skill your teacher wants to see from you.

Concept: assessed_skill  
Category: support

Correction:
If evaluating sources is the skill being assessed, who should evaluate the sources?
A. The student
B. AI
Correct: A

### F14 — Research support
Teacher has already given you five approved sources and allows AI as a reading support.

You paste a difficult paragraph from one approved source and ask:
> “Explain this paragraph in simpler language. Do not create my research notes.”

A. Potentially appropriate within the teacher's rules  
B. Automatically cheating  
C. AI should write the research notes too  
D. Impossible because AI cannot explain text

Correct: **A**

Feedback:
> Here AI supports comprehension while the student still performs the assigned research work.

Concept: context_dependent_support  
Category: tutor

Correction:
The same AI action can have a different answer depending on what skill the assignment is assessing.
A. True
B. False
Correct: A

### F15 — Important health information
AI gives you important health information that could affect a real decision.

A. Treat AI as the final authority  
B. Check trustworthy health information and speak with an appropriate adult or professional when needed  
C. Trust it if the answer is detailed  
D. Ask AI to guarantee its answer

Correct: **B**

Feedback:
> Important real-world information deserves stronger checking than an ordinary practice question.

Concept: stakes_and_verification  
Category: verification

Correction:
The more important a real-world decision is, the more important it is to verify information.
A. True
B. False
Correct: A

### F16 — Permission unclear
Teacher says:
> “You may use your usual classroom tools.”

You are not sure whether that includes generative AI.

A. Decide that it definitely does  
B. Decide that it definitely does not  
C. Ask the teacher  
D. Use AI and explain afterward

Correct: **C**

Feedback:
> You do not need to guess what an unclear instruction means.

Concept: permission_clarification  
Category: permission

Correction:
When permission is unclear:
A. Ask
B. Guess
Correct: A

### F17 — Editing support
Teacher allows spellcheck and grammar feedback but says your writing must remain your own.

A. “Rewrite this professionally.”  
B. “Replace my sentences with stronger ones.”  
C. “Point out grammar errors and explain them without rewriting my sentences.”  
D. “Change my vocabulary so I sound older.”

Correct: **C**

Feedback:
> AI identifies problems while you make the actual changes.

Concept: feedback_vs_rewriting  
Category: support

Correction:
Which keeps the writer in control?
A. Identifying an error
B. Replacing the sentence
Correct: A

### F18 — Missing viewpoint
AI gives an explanation of a historical conflict that makes one side seem completely reasonable and barely mentions the other side.

A. Assume the first side was correct  
B. Ask what perspectives and evidence may be missing, then investigate reliable sources  
C. Ask AI to make the answer shorter  
D. Submit it because AI is neutral

Correct: **B**

Feedback:
> AI output can leave out viewpoints or reflect bias. Look for missing evidence.

Concept: bias  
Category: verification

Correction:
One-sided answers should make you look for:
A. missing perspectives and evidence
B. a longer version of the same answer
Correct: A

### F19 — Project deadline
You waited until the night before a project is due. You ask AI to create the whole project because there is not enough time left.

A. A deadline changes who is supposed to do the learning  
B. AI becomes acceptable whenever you are rushed  
C. Being short on time does not automatically change the assignment expectations  
D. It is acceptable if the project looks good

Correct: **C**

Feedback:
> Time pressure is real, but it does not automatically change the purpose or rules of the assignment.

Concept: responsibility_under_pressure  
Category: responsibility

Correction:
Does being late automatically give permission to hand assessed work to AI?
A. Yes
B. No
Correct: B

### F20 — Integrated judgment
Teacher allows AI learning support. You wrote your own answer but are unsure whether your reasoning makes sense.

A. Ask AI to replace the answer  
B. Ask AI to point out a possible weakness, revise it yourself, and check any factual claims  
C. Ask AI to make the answer sound perfect and submit it unread  
D. Ask AI to decide what you believe

Correct: **B**

Feedback:
> This combines the major skills: permission, student thinking, feedback, verification, and responsibility.

Concept: integrated_judgment  
Category: integrated

Correction:
AI can give feedback, but who should make the final decisions?
A. You
B. AI
Correct: A

---

# 24. Licence completion

## Completion screen

# AI Learner Licence Earned

**CLEARED**

You have shown that you can make smart decisions about using AI for school.

That means you can:
- use AI to support learning without handing over the thinking
- check information instead of automatically trusting it
- follow the rules of the task
- protect private information
- take responsibility for what you submit

### Your licence does **not** mean AI is allowed on every assignment.

Your teacher's instructions still come first.

> **Use the tool. Keep the thinking.**

Button: `View My Licence`

## Licence card

**AI LEARNER LICENCE**

**Status:** Cleared

**Skills demonstrated:**
- Learning Support
- AI Judgment
- Verification
- Privacy
- Responsibility

Footer:
**Classroom learning credential — not an official school or district certification**

Do not make the licence look like a government-issued identity document.

A student may print or use the browser print function if desired, but do not require printing.

---

# 25. Exit survey

Time target: under 2 minutes.

Intro:

# One last thing

This is not for marks.

Help improve the course.

### 1. I understand better when AI is okay to use for schoolwork.

- Strongly agree
- Agree
- Not sure
- Disagree

### 2. I know ways AI can help me learn without doing my work for me.

- Strongly agree
- Agree
- Not sure
- Disagree

### 3. I know why information from AI sometimes needs to be checked.

- Strongly agree
- Agree
- Not sure
- Disagree

### 4. How useful was this course?

- Very useful
- Somewhat useful
- Not very useful
- Not useful

### 5. What is one thing from this course you might actually use?

Short optional written response. Limit to a sensible short length (for example 300 characters). Keep local only.

Button: `Finish`

After submit:
> Thanks. Your feedback has been saved on this device.

Do not send survey data anywhere in v1.

---

# 26. Local pilot summary

Because v1 has no backend, provide a low-key student-facing completion summary accessible after the licence is earned.

It may show:
- pre-check score, if taken
- final passing score
- number of module retries (optional, but do not frame negatively)
- licence earned status

Do not show internal question IDs or raw analytics.

Do not build a teacher dashboard in v1.

Centralized analytics are explicitly out of scope until privacy and school requirements are reviewed.

---

# 27. Accessibility requirements

Required:
- semantic HTML
- labels for controls
- keyboard-operable answer selection
- visible focus rings
- correct heading hierarchy
- sufficient contrast
- status text in addition to colour
- `aria-live` or equivalent for dynamically revealed answer feedback where appropriate
- respect `prefers-reduced-motion`
- no flashing effects
- no timed interactions
- no speed rewards
- no audio required
- content remains usable at 200% browser zoom

---

# 28. Animation rules

Use restrained animation only:
- module unlock
- checkmark/CLEARED state
- progress changes
- licence reveal

No:
- heavy confetti
- bouncing mascots
- repeated motion
- animations that delay navigation
- motion that blocks reading

Respect reduced-motion settings.

---

# 29. Error/edge-case requirements

Handle all of these without breaking:

1. Refresh during a learning screen.
2. Refresh after answering a quiz question but before pressing Continue.
3. Close browser and reopen later.
4. Student exits to Course Map mid-module.
5. Student gets 0/5.
6. Student gets 3/5.
7. Student gets 4/5 with one correction.
8. Student gets 5/5.
9. Student gets a correction wrong multiple times.
10. Retry when only three unseen questions remain in an 8-question bank.
11. Final challenge retry after most of the 20-question bank has already been seen.
12. localStorage contains malformed or old-version data.
13. localStorage is unavailable.
14. Student double-clicks an answer or Continue button.
15. Narrow viewport.
16. Browser back button.
17. Student resets progress.

Preferred behaviour:
- fail safely
- never lose completed-module state because one optional field is corrupt
- if storage schema is incompatible, offer/reset cleanly rather than crash
- no infinite loops in random question selection
- no impossible “need unseen questions” constraint
- no duplicate question in a single attempt

---

# 30. Testing requirements

At minimum, write automated tests for pure logic covering:

## Module question selection
- selects exactly 5 unique questions
- prioritizes unseen questions where possible
- handles exhausted unseen bank
- avoids identical consecutive set where possible

## Module mastery
- 5/5 clears after corrections (none)
- 4/5 requires one correction then clears
- 3/5 never clears and triggers review/retry
- correction must be correct before clear
- unlimited retry state does not corrupt progress

## Final selection
- selects 12 unique questions
- category balancing works or degrades safely
- no infinite selection loops

## Final mastery
- 12/12 clears
- 10/12 requires two corrections then clears
- 9/12 triggers retry
- corrections do not change numeric score

## Persistence
- serialize/deserialize valid progress
- handles malformed persisted data
- version mismatch has safe behaviour

Also run:
- TypeScript typecheck
- production build
- tests
- lint if lint is configured

Before declaring the build complete, fix all failures.

Do not “solve” tests by hardcoding fixed quiz sets.

---

# 31. Content integrity rules

The authored question stems, answer options, correct answers, and feedback in this specification are the source of truth.

Claude may:
- fix obvious typos
- normalize apostrophes/quotation marks
- make tiny punctuation corrections
- structure content into typed objects

Claude must NOT silently:
- change which answer is correct
- rewrite scenario meaning
- add school/district policy claims
- add legal claims
- imply AI is universally allowed
- imply AI is universally cheating
- remove the “teacher instructions matter” idea
- convert the course into prompt-engineering training
- generate new mastery questions at runtime

If a genuine ambiguity is discovered, preserve the current content and note it in `README.md` under a small “Content review notes” section rather than inventing a new policy.

---

# 32. Out of scope for v1

Do not build:
- student accounts
- teacher accounts
- login
- database
- cloud analytics
- leaderboard
- LMS integration
- Google Classroom integration
- AI chatbot
- OpenAI/Anthropic API calls
- school/district branding
- official certification language
- administrator dashboard
- email
- social sharing
- payment
- complex CMS
- multilingual support
- elaborate achievement system
- timers
- speed scoring

---

# 33. Definition of done

The first-pass build is complete only when all are true:

1. App launches locally with one documented command.
2. Production build succeeds.
3. Automated logic tests pass.
4. No TypeScript errors.
5. Welcome → pre-check/skip → all four modules → final → licence → exit survey works.
6. Sequential locking/unlocking works.
7. Module quiz uses 5 of 8.
8. Module pass threshold is 4/5.
9. Missed mastery questions require corrections.
10. 3/5 or lower triggers review + another attempt.
11. Final challenge uses 12 of 20.
12. Final pass threshold is 10/12.
13. Final missed items require corrections.
14. Progress survives refresh.
15. No backend/network API is required after site assets load.
16. No personal student data is requested.
17. App is usable on Chromebook and 360px mobile.
18. Keyboard navigation works.
19. Reduced-motion preference is respected.
20. Licence explicitly says it does not override teacher instructions.
21. All authored course content exists in data/content files rather than hardcoded throughout UI.
22. README explains run/build/test/deployment basics.
23. CLAUDE.md records architecture, commands, non-negotiables, and content-integrity rules for future Claude Code sessions.

---

# 34. Implementation workflow for Claude Code

When implementing this specification:

1. Read this entire file before changing code.
2. Inspect the current repository and environment.
3. Create/update `CLAUDE.md` so the non-negotiables persist across future sessions.
4. If the repo is empty, scaffold a React + TypeScript + Vite app.
5. Design typed content models before copying all content into UI.
6. Build/test the quiz and mastery engine as pure logic.
7. Build persistence.
8. Build reusable interaction components.
9. Build the course flow.
10. Add the authored content.
11. Add responsive visual polish and accessibility.
12. Run tests/typecheck/build.
13. Fix actual errors rather than bypassing tests.
14. Review the app against the Definition of Done.
15. Give the user a concise completion report containing:
    - what was built
    - commands to run it
    - tests/build status
    - any genuine unresolved issue
    - suggested next step

Do not broaden scope while implementing.

If a small technical decision is not specified, make a sensible simple choice and continue. Do not block on cosmetic questions.

---

# 35. Product quality check before completion

Manually inspect the implementation for:

- giant text walls
- childish tone
- confusing navigation
- excessive clicks
- answer choices that shift after selection
- feedback hidden below the fold
- weak contrast
- mobile overflow
- progress that implies speed is rewarded
- incorrect locking
- quiz questions repeated unnecessarily
- a licence that looks like blanket permission to use AI
- any external API/data collection accidentally added

Fix these issues before calling the build complete.
