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

On Vercel, `vercel.json` already sets the build command to `npm run build` and the output directory to `dist`. Leave the Root Directory at the repository root and do not override the install or build command in the dashboard.

## Collecting exit-survey results (optional, off by default)

Out of the box the course makes **no network requests**. Everything a student does — pre-check, module attempts, corrections, the licence — stays in their browser's `localStorage` and never leaves the device.

A teacher who wants the exit-survey results can turn on a single outbound path by setting one environment variable. Nothing else in the course is ever sent.

### Configuring it in Vercel

Project → Settings → Environment Variables:

| Variable | Required | Value |
| --- | --- | --- |
| `VITE_SURVEY_ENDPOINT` | yes, to enable sending | An `https://` URL that accepts a `POST` with a JSON body |
| `VITE_SURVEY_CLASS_ID` | no | A label you choose, e.g. `period-3`. Never a student identifier. |

Redeploy after setting them: Vite bakes `VITE_` variables into the bundle at build time, so a change only takes effect on the next build. Copy `.env.example` to `.env.local` to test locally. An endpoint that is not `https` is refused (except `localhost`, for testing) rather than posting feedback in the clear.

**These values are public.** Anything in a `VITE_` variable ends up readable in the JavaScript any student can view. Never put an API key, token, or password in one. The endpoint URL itself is the only secret you get, so choose a service whose collection URL is long and unguessable, and rely on that plus the fact that the payload contains nothing identifying.

### What is sent

One `POST` per student, at the moment they press **Finish** on the exit survey:

```json
{
  "schema": "ai-learner-licence.exit-survey.v1",
  "sessionId": "k3p9x2mq7rt4wz8b",
  "classId": "period-3",
  "preCheckScore": 3,
  "preCheckTotal": 5,
  "finalScore": 11,
  "finalTotal": 12,
  "responses": { "q1": "agree", "q2": "stronglyAgree", "q3": "notSure", "q4": "veryUseful" },
  "comment": "I'll ask for a hint before the answer.",
  "submittedAt": "2026-09-04T15:00:00.000Z"
}
```

`sessionId` is random, generated on the device, and exists only so two submissions can be told apart. It is not derived from anything about the student, their device, or their answers.

**Never sent:** student names, email addresses, student ids, school accounts, any IP address this code collects, device or browser fingerprints, and the question-by-question history of what anyone answered. `src/services/surveySubmission.ts` builds the payload field by field from that allowlist rather than serialising progress state, and a test asserts the shape.

A failed send can never affect a student. Completion is recorded locally before the request goes out; if the request fails the student sees "Your feedback couldn't be sent. Your course completion is still saved." and their licence is unaffected.

### Choosing where to point it

No third-party service is built in — the endpoint is a plain URL, so you can point it anywhere. Roughly, from most private to least:

- **A school-run endpoint** (a district server, or a small serverless function you deploy). Nothing leaves institutional control. Most work to set up.
- **A serverless function you own** on the same host as the site (Vercel, Cloudflare Workers) writing to storage you control. Note this repository deliberately ships no backend; adding one is a change of scope you would be making knowingly.
- **A form or automation service** (Google Forms via its response endpoint, Formspree, Tally, a Zapier/Make webhook, an Airtable or Google Sheets automation). Fastest to set up, and the trade-off is that a third party you do not control receives and stores the responses. The payload carries nothing identifying, but you are still handing a vendor a record of how a class answered, so check it against your division's privacy rules before using it. Google Forms in particular can be configured to record the responder's account — do not use a form set up that way.

If any option would require a credential that cannot safely be committed, that is a sign it is the wrong option here: there is no safe place for a secret in a static client-side build.

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
- **Option shuffling** (`src/logic/optionOrder.test.ts`, `src/components/QuestionCardShuffle.test.tsx`) — the correct answer keeps its identity and its own feedback wherever it is displayed, the same seed reproduces an order across a refresh, a retry reshuffles, and the correct answer lands in all four positions about equally.
- **Licence credential** (`src/logic/licenceCredential.test.ts`) — number format, independence from the moment of issue, local-date correctness, and issuing exactly once.
- **Exit-survey submission** (`src/services/surveySubmission.test.ts`, `src/screens/ExitSurveySubmission.test.tsx`) — the payload allowlist, refusal of non-https endpoints, no request at all when unconfigured, and completion surviving a failed send.
- **Content integrity** (`src/data/courseContent.test.ts`) — every bank has the right size, unique ids, valid corrections, and the final bank's category counts support the §22 composition targets.

## Content review notes

Per `BUILD_SPEC.md` §31, the following are documented rather than silently resolved, since they're genuine authoring gaps or ambiguities in the specification — none of them change a correct answer or the meaning of any scenario:

1. **Privacy category has only one final-challenge question (F9).** The §22 composition always needs exactly one privacy item, and the 20-question bank only has one, so F9 appears in every final-challenge attempt, including retries. There's no way to vary that slot without inventing a new question, which §31 forbids.
2. **"1 integrated responsibility/judgment item"** (§22) is treated as one merged target bucket covering both the `responsibility` (F19) and `integrated` (F20) category tags used elsewhere in the bank — the prose composition rule doesn't map 1:1 onto the explicit per-question `Category:` tags.
3. **A few practice/quiz items were authored with grouped or partial feedback rather than one line per option** — e.g. Module 2's "Build a Better Request" deck (§14 M2-8) only specifies correct answers with the instruction "Practice feedback should briefly explain why," and Module 3-Q… `M3-5`'s feedback was authored for one option rather than all four. Per-option feedback text for these was written to match the surrounding tone and reasoning already used for that scenario; the correct answers themselves were never changed.
4. **The "Module Challenge" button label** is assigned in §12 to the module's 5-Check recap screen (M1-9), immediately followed in the document by a separate "M1 takeaway" block with no button of its own. Since a quiz can only be entered once, the implementation moved that call-to-action onto the takeaway screen (the natural last stop before the mastery quiz) and used a plain "Continue" label on the recap screen instead. The same pattern was applied consistently across all four modules.
5. **Welcome-screen splash copy** (product name, one-line description, time estimate) isn't separately authored in `BUILD_SPEC.md` — §1 explicitly asks that the core sentence *not* become a repeated slogan, so it isn't used as splash copy. Short original copy was written instead, consistent with the required tone.
