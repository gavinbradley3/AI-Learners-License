import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChoiceList } from "./ChoiceList";

describe("ChoiceList", () => {
  it("renders A/B/C/D letters in option order, presentation-only", () => {
    render(
      <ChoiceList
        options={["First", "Second", "Third", "Fourth"]}
        selectedIndex={null}
        correctIndex={null}
        onSelect={() => {}}
      />,
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons.map((b) => b.textContent)).toEqual([
      expect.stringContaining("A."),
      expect.stringContaining("B."),
      expect.stringContaining("C."),
      expect.stringContaining("D."),
    ]);
  });

  it("selecting the option labeled C reports index 2, not the letter", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <ChoiceList
        options={["First", "Second", "Third", "Fourth"]}
        selectedIndex={null}
        correctIndex={null}
        onSelect={onSelect}
      />,
    );
    const buttons = screen.getAllByRole("button");
    await user.click(buttons[2]); // labeled "C."
    expect(onSelect).toHaveBeenCalledWith(2);
  });

  it("keeps letters stable and independent of which option is marked correct", () => {
    render(
      <ChoiceList
        options={["First", "Second", "Third"]}
        selectedIndex={1}
        correctIndex={1}
        onSelect={() => {}}
      />,
    );
    const buttons = screen.getAllByRole("button");
    // Letter for the selected/correct option is still "B", not re-lettered to "A".
    expect(buttons[1].textContent).toContain("B.");
  });
});
