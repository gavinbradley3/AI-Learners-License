# AI Learner Licence

A short Grade 7–8 classroom pilot that teaches students to make smart decisions about using generative AI for learning. Built with React, TypeScript, and Vite. No backend, no login, no external AI API — progress lives only in the browser's `localStorage`.

See `BUILD_SPEC.md` for the full instructional specification and `CLAUDE.md` for project rules and non-negotiables.

## Commands

```bash
npm install     # install dependencies
npm run dev     # start the dev server (http://localhost:5173)
npm run build   # typecheck + production build to dist/
npm run preview # preview the production build locally
npm test        # run the automated test suite once
npm run test:watch  # run tests in watch mode
npm run typecheck   # TypeScript project check, no emit
```

## Deployment

`npm run build` produces a fully static `dist/` folder (HTML/CSS/JS only). Deploy it to any static host (GitHub Pages, Netlify, Cloudflare Pages, a school web server, etc.) — no server-side runtime is required.

## Architecture

```text
src/
  types/       content and progress-state type definitions
  data/        authored course content (transcribed from BUILD_SPEC.md)
  logic/       pure quiz-selection and mastery functions (no React, no DOM)
  storage/     versioned localStorage wrapper with an in-memory fallback
  state/       the course reducer/state machine + React context
  components/  generic, content-agnostic UI building blocks
  screens/     one component per top-level screen, composed from the above
```

Content, mastery logic, persistence, and UI are kept as separate concerns per `CLAUDE.md`. The quiz-selection and mastery engine (`src/logic/`) and the persistence layer (`src/storage/`) are pure/testable and have no dependency on React.

## Testing

`npm test` runs Vitest across:

- **Quiz selection** (`src/logic/quizEngine.test.ts`) — uniqueness, unseen-first priority, exhausted-bank handling, avoiding an exact repeat of the previous attempt, and the final challenge's category composition.
- **Mastery scoring** (`src/logic/mastery.test.ts`) — pass thresholds, correction-queue building, and outcome determination for both the 5-question module quizzes and the 12-question final challenge.
- **Persistence** (`src/storage/progressStorage.test.ts`) — round-tripping valid state, malformed JSON, version mismatches, and a `localStorage`-unavailable fallback.
- **Course reducer** (`src/state/reducer.test.ts`) — full scripted playthroughs (5/5, 4/5, 3/5, final clear → licence earned, pre-check scoring, reset).
- **Components** (`src/components/QuestionCard.test.tsx`) — answer locking, the double-click guard, and correction retry-until-correct behaviour.
- **Content integrity** (`src/data/courseContent.test.ts`) — every bank has the right size, unique ids, valid corrections, and the final bank's category counts support the §22 composition targets.

## Content review notes

Per `BUILD_SPEC.md` §31, the following are documented rather than silently resolved, since they're genuine authoring gaps or ambiguities in the specification — none of them change a correct answer or the meaning of any scenario:

1. **Privacy category has only one final-challenge question (F9).** The §22 composition always needs exactly one privacy item, and the 20-question bank only has one, so F9 appears in every final-challenge attempt, including retries. There's no way to vary that slot without inventing a new question, which §31 forbids.
2. **"1 integrated responsibility/judgment item"** (§22) is treated as one merged target bucket covering both the `responsibility` (F19) and `integrated` (F20) category tags used elsewhere in the bank — the prose composition rule doesn't map 1:1 onto the explicit per-question `Category:` tags.
3. **A few practice/quiz items were authored with grouped or partial feedback rather than one line per option** — e.g. Module 2's "Build a Better Request" deck (§14 M2-8) only specifies correct answers with the instruction "Practice feedback should briefly explain why," and Module 3-Q… `M3-5`'s feedback was authored for one option rather than all four. Per-option feedback text for these was written to match the surrounding tone and reasoning already used for that scenario; the correct answers themselves were never changed.
4. **The "Module Challenge" button label** is assigned in §12 to the module's 5-Check recap screen (M1-9), immediately followed in the document by a separate "M1 takeaway" block with no button of its own. Since a quiz can only be entered once, the implementation moved that call-to-action onto the takeaway screen (the natural last stop before the mastery quiz) and used a plain "Continue" label on the recap screen instead. The same pattern was applied consistently across all four modules.
5. **Welcome-screen splash copy** (product name, one-line description, time estimate) isn't separately authored in `BUILD_SPEC.md` — §1 explicitly asks that the core sentence *not* become a repeated slogan, so it isn't used as splash copy. Short original copy was written instead, consistent with the required tone.
