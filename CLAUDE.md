# CLAUDE.md — AI Learner Licence

## Project purpose

This repository contains **AI Learner Licence**, a short Grade 7–8 classroom pilot that teaches students to make smart decisions about using generative AI for learning.

The site teaches AI literacy; it does **not** need to call an AI API.

## Non-negotiables

- Audience is 12–14 years old.
- Target completion time is 25–35 minutes.
- Teach judgment through realistic scenarios.
- Never imply AI is always allowed.
- Never imply AI is always cheating.
- Teacher instructions and assignment purpose matter.
- AI should support learning rather than replace assessed thinking.
- Verification, privacy, and student responsibility are core concepts.
- The final licence is a classroom learning credential, not official school/district certification.
- No student accounts or backend in v1.
- No collection of names, emails, student IDs, or device identifiers.
- No external AI API.
- Progress is local-only.
- No timers, XP, coins, leaderboards, mascots, or childish gamification.
- Do not silently rewrite authored assessment content or change correct answers.

## Stack

Preferred:
- React
- TypeScript
- Vite
- ordinary CSS
- minimal dependencies

The site must be statically deployable.

## Architecture

Keep course content separate from components.

Keep:
- content/data
- quiz/mastery logic
- persistence
- UI components

as distinct concerns.

Do not embed the large question banks across page components.

## Commands

Keep these accurate as the project evolves:

- install: `npm install`
- dev: `npm run dev`
- build: `npm run build`
- test: `npm test`
- typecheck: add/use a project script if available

Update this section if command names change.

## Testing

Changes to quiz selection, mastery, correction logic, or persistence require automated tests.

Before declaring work complete:
1. run relevant tests
2. run TypeScript checks
3. run production build
4. fix failures rather than hiding them

Never hardcode a quiz set merely to make tests pass.

## Accessibility

Required:
- keyboard access
- visible focus
- semantic headings/controls
- colour is never the only feedback signal
- reduced-motion support
- no timers
- usable at 200% zoom
- Chromebook and 360px layouts

## Content

`BUILD_SPEC.md` is the source of truth for student-facing educational content and behaviour.

If implementation details conflict with `BUILD_SPEC.md`, follow `BUILD_SPEC.md` unless the user explicitly changes the requirement.

If you identify a real content ambiguity, do not invent a school policy. Preserve the content and flag the issue to the user.

## Scope discipline

Do not add:
- login
- backend
- database
- cloud analytics
- teacher dashboard
- chatbot
- AI API calls
- LMS integration
- social sharing
- official district/school claims

unless explicitly requested later.

## Git

Do not force-push or rewrite published history.

Make clear, meaningful commits when the user asks you to commit.

Never commit secrets or `.env` files containing credentials.
