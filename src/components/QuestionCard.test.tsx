import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QuestionCard } from "./QuestionCard";
import { CorrectionCard } from "./CorrectionCard";

const options = [
  { text: "Option A", feedback: "Feedback A" },
  { text: "Option B", feedback: "Feedback B" },
];

describe("QuestionCard", () => {
  it("locks all choices after the first selection and shows feedback", async () => {
    const user = userEvent.setup();
    const onContinue = vi.fn();
    render(
      <QuestionCard
        prompt="Pick one"
        options={options}
        correctIndex={1}
        onContinue={onContinue}
      />,
    );

    const [optionA, optionB] = screen.getAllByRole("button");
    await user.click(optionA);
    expect(screen.getByText("Feedback A")).toBeInTheDocument();

    // Locked: clicking the other option must not change the outcome.
    await user.click(optionB);
    expect(screen.getByText("Feedback A")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Continue" }));
    expect(onContinue).toHaveBeenCalledTimes(1);
    expect(onContinue).toHaveBeenCalledWith({ correct: false });
  });

  it("ignores a double-click on Continue", async () => {
    const user = userEvent.setup();
    const onContinue = vi.fn();
    render(
      <QuestionCard
        prompt="Pick one"
        options={options}
        correctIndex={0}
        onContinue={onContinue}
      />,
    );
    const [optionA] = screen.getAllByRole("button");
    await user.click(optionA);
    const continueButton = screen.getByRole("button", { name: "Continue" });
    await user.click(continueButton);
    await user.click(continueButton);
    expect(onContinue).toHaveBeenCalledTimes(1);
  });

  it("hides correctness entirely when revealCorrectness is false", async () => {
    const user = userEvent.setup();
    const onContinue = vi.fn();
    render(
      <QuestionCard
        prompt="Pick one"
        options={[{ text: "Option A" }, { text: "Option B" }]}
        correctIndex={0}
        revealCorrectness={false}
        onContinue={onContinue}
      />,
    );
    const [optionA] = screen.getAllByRole("button");
    await user.click(optionA);
    expect(screen.queryByText("Correct")).not.toBeInTheDocument();
    expect(screen.queryByText("Not quite")).not.toBeInTheDocument();
  });
});

describe("CorrectionCard", () => {
  it("allows retrying after an incorrect attempt until correct", async () => {
    const user = userEvent.setup();
    const onCleared = vi.fn();
    render(
      <CorrectionCard
        prompt="Which is better?"
        options={["Wrong choice", "Right choice"]}
        correctIndex={1}
        explanation="Here's why that's not it."
        onCleared={onCleared}
      />,
    );

    const [wrongChoice] = screen.getAllByRole("button");
    await user.click(wrongChoice);
    expect(screen.getByText("Here's why that's not it.")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Try again" }));
    const [, rightChoice] = screen.getAllByRole("button");
    await user.click(rightChoice);
    expect(screen.getByText("That's it.")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Continue" }));
    expect(onCleared).toHaveBeenCalledTimes(1);
  });
});
