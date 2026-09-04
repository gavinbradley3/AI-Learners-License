import { useMemo, useRef, useState } from "react";
import { ChoiceList } from "./ChoiceList";
import { ContextBlocks } from "./ContextBlocks";
import { FeedbackBanner } from "./FeedbackBanner";
import { Button } from "./Button";
import { presentOptions } from "../logic/optionOrder";
import type { ContextBlock } from "../types";
import styles from "./QuestionCard.module.css";

export interface QuestionCardOption {
  text: string;
  feedback?: string;
}

export interface QuestionCardProps {
  eyebrow?: string;
  context?: readonly ContextBlock[];
  prompt: string;
  options: readonly QuestionCardOption[];
  correctIndex: number;
  /** false hides correct/incorrect feedback entirely (used only by the ungraded pre-check). */
  revealCorrectness?: boolean;
  /**
   * When provided, options are displayed in a deterministic shuffled order derived from
   * this seed. Build it from already-persisted values (question id + attempt count) so a
   * refresh reproduces the same order and a retry gets a new one. Omit to keep authored order.
   */
  shuffleSeed?: string;
  continueLabel?: string;
  onContinue: (result: { correct: boolean }) => void;
}

/**
 * A single answer-once question: selecting a choice locks it immediately, shows inline
 * feedback (unless revealCorrectness is false), then an explicit Continue advances.
 * Give this component a fresh `key` per question so React remounts state cleanly —
 * it never resets itself internally.
 */
export function QuestionCard({
  eyebrow,
  context,
  prompt,
  options,
  correctIndex,
  revealCorrectness = true,
  shuffleSeed,
  continueLabel = "Continue",
  onContinue,
}: QuestionCardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const hasContinuedRef = useRef(false);

  // Whole option objects move together, so feedback stays attached to its own answer.
  const presented = useMemo(
    () =>
      shuffleSeed
        ? presentOptions(options, correctIndex, shuffleSeed)
        : { options: [...options], correctIndex, sourceIndex: options.map((_, i) => i) },
    [options, correctIndex, shuffleSeed],
  );

  const handleContinue = () => {
    if (selectedIndex === null || hasContinuedRef.current) return;
    hasContinuedRef.current = true;
    onContinue({ correct: selectedIndex === presented.correctIndex });
  };

  const selected = selectedIndex !== null ? presented.options[selectedIndex] : null;

  return (
    <div>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <ContextBlocks blocks={context} />
      <p className={styles.prompt}>{prompt}</p>
      <ChoiceList
        options={presented.options.map((o) => o.text)}
        selectedIndex={selectedIndex}
        correctIndex={revealCorrectness ? presented.correctIndex : null}
        onSelect={setSelectedIndex}
      />
      {revealCorrectness && selected && (
        <FeedbackBanner
          correct={selectedIndex === presented.correctIndex}
          text={selected.feedback ?? ""}
        />
      )}
      {selectedIndex !== null && (
        <div className={styles.continueRow}>
          <Button onClick={handleContinue}>{continueLabel}</Button>
        </div>
      )}
    </div>
  );
}
