import type { ExitSurveyState, PreCheckState, MasteryProgressState } from "../types";

/**
 * The one place in this course that talks to a network.
 *
 * Everything a student does stays on their device. The exit survey is the exception, and
 * only when a teacher deliberately configures an endpoint: with no endpoint set, nothing
 * here makes a request at all. The payload is assembled field by field from an explicit
 * allowlist — never by spreading progress state — so a future field added to storage
 * cannot start travelling by accident.
 *
 * Never sent: names, email addresses, student or school account ids, free-text beyond the
 * one optional comment, per-question answer history, device or browser fingerprints, and
 * anything the application collects about the network it is on.
 */
export const SURVEY_SCHEMA = "ai-learner-licence.exit-survey.v1";

export interface SurveyConfig {
  endpoint: string;
  /** A label the teacher chooses, e.g. "period-3". Optional and never derived from the student. */
  classId: string | null;
}

export interface SurveySubmission {
  schema: typeof SURVEY_SCHEMA;
  sessionId: string;
  classId: string | null;
  preCheckScore: number | null;
  preCheckTotal: number;
  finalScore: number | null;
  finalTotal: number | null;
  responses: {
    q1: string | null;
    q2: string | null;
    q3: string | null;
    q4: string | null;
  };
  comment: string | null;
  submittedAt: string;
}

export type SubmissionResult = { ok: true } | { ok: false; reason: string };

const TIMEOUT_MS = 8000;

/**
 * An endpoint must be https, or localhost while a teacher is testing. Anything else is a
 * misconfiguration, and refusing it here is better than quietly posting student feedback
 * in the clear.
 */
export function isAcceptableEndpoint(raw: string): boolean {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return false;
  }
  if (url.protocol === "https:") return true;
  return url.protocol === "http:" && (url.hostname === "localhost" || url.hostname === "127.0.0.1");
}

/** Reads the build-time configuration. No endpoint configured means no network call, ever. */
export function readSurveyConfig(env: Record<string, unknown> = import.meta.env): SurveyConfig | null {
  const endpoint = typeof env.VITE_SURVEY_ENDPOINT === "string" ? env.VITE_SURVEY_ENDPOINT.trim() : "";
  if (!endpoint || !isAcceptableEndpoint(endpoint)) return null;

  const rawClassId = typeof env.VITE_SURVEY_CLASS_ID === "string" ? env.VITE_SURVEY_CLASS_ID.trim() : "";
  return { endpoint, classId: rawClassId ? rawClassId.slice(0, 64) : null };
}

/**
 * A random id for this device's run through the course. It exists so a teacher can tell
 * two submissions apart without either of them naming a student, and it is generated the
 * same way as the licence number: from randomness and nothing else.
 */
export function createSessionId(random: () => number = Math.random): string {
  const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
  let out = "";
  for (let i = 0; i < 16; i += 1) out += alphabet[Math.floor(random() * alphabet.length)];
  return out;
}

export interface PayloadInput {
  sessionId: string;
  classId: string | null;
  preCheck: PreCheckState;
  preCheckTotal: number;
  final: MasteryProgressState;
  survey: ExitSurveyState;
  now?: Date;
}

export function buildSurveyPayload({
  sessionId,
  classId,
  preCheck,
  preCheckTotal,
  final,
  survey,
  now = new Date(),
}: PayloadInput): SurveySubmission {
  const comment = survey.q5.trim();
  return {
    schema: SURVEY_SCHEMA,
    sessionId,
    classId,
    preCheckScore: preCheck.status === "completed" ? preCheck.score : null,
    preCheckTotal,
    finalScore: final.lastScore ?? null,
    finalTotal: final.lastTotal ?? null,
    responses: {
      q1: survey.q1,
      q2: survey.q2,
      q3: survey.q3,
      q4: survey.q4,
    },
    comment: comment ? comment.slice(0, 300) : null,
    submittedAt: now.toISOString(),
  };
}

/**
 * Posts the payload. Resolves either way and never throws: the caller has already saved the
 * student's completion locally, and a failed request must not be able to disturb it.
 */
export async function submitSurvey(
  payload: SurveySubmission,
  endpoint: string,
  fetchImpl: typeof fetch = fetch,
): Promise<SubmissionResult> {
  const controller = typeof AbortController === "function" ? new AbortController() : null;
  const timer = controller ? setTimeout(() => controller.abort(), TIMEOUT_MS) : null;

  try {
    const response = await fetchImpl(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      ...(controller ? { signal: controller.signal } : {}),
    });
    if (!response.ok) return { ok: false, reason: `status ${response.status}` };
    return { ok: true };
  } catch (error) {
    return { ok: false, reason: error instanceof Error ? error.message : "request failed" };
  } finally {
    if (timer) clearTimeout(timer);
  }
}
