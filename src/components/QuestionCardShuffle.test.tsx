import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QuestionCard } from "./QuestionCard";
import { presentOptions } from "../logic/optionOrder";

const options = [
  { text: "Wrong one", feedback: "why-wrong-one" },
  { text: "The best answer", feedback: "why-best" },
  { text: "Wrong two", feedback: "why-wrong-two" },
  { text: "Wrong three", feedback: "why-wrong-three" },
];
const AUTHORED_CORRECT = 1;

/** Where the correct answer actually lands on screen for a given seed. */
function displayedCorrectIndex(seed: string) {
  return presentOptions(options, AUTHORED_CORRECT, seed).correctIndex;
}

describe("QuestionCard with shuffled options", () => {
  it("scores the correct answer wherever it is displayed, not by position", async () => {
    // Seeds chosen so the correct answer lands in several different slots.
    const seeds = ["seed-a", "seed-b", "seed-c", "seed-d", "seed-e", "seed-f"];

    for (const seed of seeds) {
      const user = userEvent.setup();
      const onContinue = vi.fn();
      const { unmount } = render(
        <QuestionCard
          prompt="Pick one"
          options={options}
          correctIndex={AUTHORED_CORRECT}
          shuffleSeed={seed}
          onContinue={onContinue}
        />,
      );

      const buttons = screen.getAllByRole("button");
      await user.click(buttons[displayedCorrectIndex(seed)]);
      await user.click(screen.getByRole("button", { name: "Continue" }));

      expect(onContinue, `seed ${seed}`).toHaveBeenCalledWith({ correct: true });
      unmount();
    }
  });

  it("marks a distractor wrong even when it sits where the answer used to be", async () => {
    const seed = "seed-a";
    const correctSlot = displayedCorrectIndex(seed);
    const wrongSlot = correctSlot === 0 ? 1 : 0;

    const user = userEvent.setup();
    const onContinue = vi.fn();
    render(
      <QuestionCard
        prompt="Pick one"
        options={options}
        correctIndex={AUTHORED_CORRECT}
        shuffleSeed={seed}
        onContinue={onContinue}
      />,
    );

    await user.click(screen.getAllByRole("button")[wrongSlot]);
    await user.click(screen.getByRole("button", { name: "Continue" }));
    expect(onContinue).toHaveBeenCalledWith({ correct: false });
  });

  it("shows the feedback belonging to the option the student actually picked", async () => {
    const seed = "seed-b";
    const presented = presentOptions(options, AUTHORED_CORRECT, seed);
    const user = userEvent.setup();

    render(
      <QuestionCard
        prompt="Pick one"
        options={options}
        correctIndex={AUTHORED_CORRECT}
        shuffleSeed={seed}
        onContinue={vi.fn()}
      />,
    );

    await user.click(screen.getAllByRole("button")[0]);
    expect(screen.getByText(presented.options[0].feedback)).toBeInTheDocument();
  });

  it("renders the same order on re-mount with the same seed (refresh safety)", () => {
    const seed = "M1-Q1:0";
    const first = render(
      <QuestionCard prompt="Q" options={options} correctIndex={AUTHORED_CORRECT} shuffleSeed={seed} onContinue={vi.fn()} />,
    );
    const firstOrder = screen.getAllByRole("button").map((b) => b.textContent);
    first.unmount();

    render(
      <QuestionCard prompt="Q" options={options} correctIndex={AUTHORED_CORRECT} shuffleSeed={seed} onContinue={vi.fn()} />,
    );
    expect(screen.getAllByRole("button").map((b) => b.textContent)).toEqual(firstOrder);
  });
});
