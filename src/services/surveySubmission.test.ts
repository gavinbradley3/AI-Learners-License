import { describe, expect, it, vi } from "vitest";
import {
  SURVEY_SCHEMA,
  buildSurveyPayload,
  createSessionId,
  isAcceptableEndpoint,
  readSurveyConfig,
  submitSurvey,
} from "./surveySubmission";
import { createInitialProgressState } from "../state/initialState";
import type { ExitSurveyState } from "../types";

const survey: ExitSurveyState = {
  completed: true,
  q1: "agree",
  q2: "stronglyAgree",
  q3: "notSure",
  q4: "veryUseful",
  q5: "  I'll ask for a hint before the answer.  ",
};

function payloadFrom(overrides: Partial<Parameters<typeof buildSurveyPayload>[0]> = {}) {
  const base = createInitialProgressState();
  return buildSurveyPayload({
    sessionId: "abc123",
    classId: "period-3",
    preCheck: { status: "completed", answers: [], score: 3 },
    preCheckTotal: 5,
    final: { ...base.final, lastScore: 11, lastTotal: 12 },
    survey,
    now: new Date("2026-09-04T15:00:00Z"),
    ...overrides,
  });
}

describe("buildSurveyPayload", () => {
  it("sends exactly the allowed fields and nothing else", () => {
    const payload = payloadFrom();
    expect(Object.keys(payload).sort()).toEqual([
      "classId",
      "comment",
      "finalScore",
      "finalTotal",
      "preCheckScore",
      "preCheckTotal",
      "responses",
      "schema",
      "sessionId",
      "submittedAt",
    ]);
    expect(Object.keys(payload.responses).sort()).toEqual(["q1", "q2", "q3", "q4"]);
    expect(payload.schema).toBe(SURVEY_SCHEMA);
  });

  it("carries no name, id, device detail or question-by-question history", () => {
    const serialized = JSON.stringify(payloadFrom()).toLowerCase();
    for (const forbidden of [
      "name",
      "email",
      "studentid",
      "student_id",
      "account",
      "useragent",
      "user_agent",
      "fingerprint",
      "ipaddress",
      "ip_address",
      "questionid",
      "answers",
      "seenquestion",
    ]) {
      expect(serialized, `payload leaks "${forbidden}"`).not.toContain(forbidden);
    }
  });

  it("keeps the comment optional and bounded", () => {
    expect(payloadFrom().comment).toBe("I'll ask for a hint before the answer.");
    expect(payloadFrom({ survey: { ...survey, q5: "   " } }).comment).toBeNull();
    const long = payloadFrom({ survey: { ...survey, q5: "x".repeat(500) } });
    expect(long.comment).toHaveLength(300);
  });

  it("reports scores as null rather than guessing when they are not known", () => {
    const base = createInitialProgressState();
    const payload = payloadFrom({
      preCheck: { status: "skipped", answers: [], score: null },
      final: base.final,
    });
    expect(payload.preCheckScore).toBeNull();
    expect(payload.finalScore).toBeNull();
    expect(payload.finalTotal).toBeNull();
  });
});

describe("readSurveyConfig", () => {
  it("returns null when no endpoint is configured, so no request is ever made", () => {
    expect(readSurveyConfig({})).toBeNull();
    expect(readSurveyConfig({ VITE_SURVEY_ENDPOINT: "   " })).toBeNull();
  });

  it("refuses a plaintext endpoint rather than posting feedback in the clear", () => {
    expect(readSurveyConfig({ VITE_SURVEY_ENDPOINT: "http://example.com/hook" })).toBeNull();
    expect(isAcceptableEndpoint("http://example.com/hook")).toBe(false);
    expect(isAcceptableEndpoint("https://example.com/hook")).toBe(true);
    expect(isAcceptableEndpoint("http://localhost:8787/hook")).toBe(true);
    expect(isAcceptableEndpoint("not a url")).toBe(false);
  });

  it("passes through the teacher's optional class label", () => {
    expect(
      readSurveyConfig({ VITE_SURVEY_ENDPOINT: "https://example.com/h", VITE_SURVEY_CLASS_ID: " period-3 " }),
    ).toEqual({ endpoint: "https://example.com/h", classId: "period-3" });
    expect(readSurveyConfig({ VITE_SURVEY_ENDPOINT: "https://example.com/h" })?.classId).toBeNull();
  });
});

describe("createSessionId", () => {
  it("is random and carries nothing about the student", () => {
    const ids = new Set(Array.from({ length: 300 }, () => createSessionId()));
    expect(ids.size).toBeGreaterThan(290);
    for (const id of ids) expect(id).toMatch(/^[a-z0-9]{16}$/);
  });
});

describe("submitSurvey", () => {
  it("reports success on a 2xx", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    await expect(submitSurvey(payloadFrom(), "https://example.com/h", fetchImpl as never)).resolves.toEqual({
      ok: true,
    });
    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe("https://example.com/h");
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body).schema).toBe(SURVEY_SCHEMA);
  });

  it("resolves rather than throwing when the network fails", async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new Error("offline"));
    await expect(
      submitSurvey(payloadFrom(), "https://example.com/h", fetchImpl as never),
    ).resolves.toEqual({ ok: false, reason: "offline" });
  });

  it("resolves rather than throwing on a server error", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: false, status: 500 });
    await expect(
      submitSurvey(payloadFrom(), "https://example.com/h", fetchImpl as never),
    ).resolves.toEqual({ ok: false, reason: "status 500" });
  });
});
