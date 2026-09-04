import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ExitSurveyScreen } from "./ExitSurveyScreen";
import { CourseProvider } from "../state/CourseContext";
import { exitSurvey } from "../data/copy";
import { courseContent } from "../data/courseContent";
import { STORAGE_KEY } from "../types";

function renderSurvey() {
  return render(
    <CourseProvider content={courseContent}>
      <ExitSurveyScreen />
    </CourseProvider>,
  );
}

async function completeTheSurvey(user: ReturnType<typeof userEvent.setup>) {
  // First radio of each of the four scored questions, then Finish.
  for (const group of await screen.findAllByRole("group")) {
    const radios = group.querySelectorAll<HTMLInputElement>('input[type="radio"]');
    if (radios.length) await user.click(radios[0]);
  }
  await user.click(screen.getByRole("button", { name: exitSurvey.finishLabel }));
}

afterEach(() => {
  window.localStorage.clear();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("exit survey submission", () => {
  it("makes no network request at all when no endpoint is configured", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const user = userEvent.setup();
    renderSurvey();

    await completeTheSurvey(user);

    expect(await screen.findByText(exitSurvey.thanksMessage)).toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(screen.queryByText(exitSurvey.sendingMessage)).not.toBeInTheDocument();
  });

  it("still records completion when the submission fails", async () => {
    vi.stubEnv("VITE_SURVEY_ENDPOINT", "https://example.com/hook");
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("offline"));
    const user = userEvent.setup();
    renderSurvey();

    await completeTheSurvey(user);

    // The student sees the failure said plainly, and their completion is untouched.
    expect(await screen.findByText(exitSurvey.sendFailedMessage)).toBeInTheDocument();
    expect(screen.getByText(exitSurvey.thanksMessage)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Continue" })).toBeEnabled();

    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}");
    expect(stored.exitSurvey.completed).toBe(true);
  });

  it("confirms a successful send without changing anything about completion", async () => {
    vi.stubEnv("VITE_SURVEY_ENDPOINT", "https://example.com/hook");
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue({ ok: true, status: 200 } as Response);
    const user = userEvent.setup();
    renderSurvey();

    await completeTheSurvey(user);

    expect(await screen.findByText(exitSurvey.sentMessage)).toBeInTheDocument();
    await waitFor(() => expect(fetchSpy).toHaveBeenCalledTimes(1));

    const body = JSON.parse((fetchSpy.mock.calls[0][1] as RequestInit).body as string);
    expect(body.sessionId).toMatch(/^[a-z0-9]{16}$/);
    expect(JSON.stringify(body).toLowerCase()).not.toContain("name");
  });
});
