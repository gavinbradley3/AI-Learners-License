import { useMemo, useState } from "react";
import { ChoiceList } from "./ChoiceList";
import { FeedbackBanner } from "./FeedbackBanner";
import { Button } from "./Button";
import { hasFixedOrder, presentOptions } from "../logic/optionOrder";
import styles from "./QuestionCard.module.css";

export interface CorrectionCardProps {
  eyebrow?: string;
  prompt: string;
  options: readonly [string, string];
  correctIndex: 0 | 1;
  /** Shown only after an incorrect attempt, to explain without shaming. */
  explanation: string;
  /**
   * Deterministic shuffle seed. Ignored for Yes/No and True/False pairs, whose order
   * carries meaning — reversing them reads as a mistake, not as randomisation.
   */
  shuffleSeed?: string;
  continueLabel?: string;
  onCleared: () => void;
}

/**
 * A two-option correction scenario: retry-until-correct. Unlike QuestionCard, a wrong
 * answer resets selection (after showing the explanation) instead of locking permanently.
 */
export function CorrectionCard({
  eyebrow,
  prompt,
  options,
  correctIndex,
  explanation,
  shuffleSeed,
  continueLabel = "Continue",
  onCleared,
}: CorrectionCardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const presented = useMemo(() => {
    if (!shuffleSeed || hasFixedOrder(options)) {
      return { options: [...options], correctIndex };
    }
    return presentOptions(options, correctIndex, shuffleSeed);
  }, [options, correctIndex, shuffleSeed]);

  const isCorrect = selectedIndex !== null && selectedIndex === presented.correctIndex;

  const handleTryAgain = () => setSelectedIndex(null);

  return (
    <div>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <p className={styles.prompt}>{prompt}</p>
      <ChoiceList
        options={presented.options}
        selectedIndex={selectedIndex}
        correctIndex={selectedIndex !== null ? presented.correctIndex : null}
        onSelect={setSelectedIndex}
      />
      {selectedIndex !== null && (
        <FeedbackBanner correct={isCorrect} text={isCorrect ? "That's it." : explanation} />
      )}
      {selectedIndex !== null && (
        <div className={styles.continueRow}>
          {isCorrect ? (
            <Button onClick={onCleared}>{continueLabel}</Button>
          ) : (
            <Button onClick={handleTryAgain}>Try again</Button>
          )}
        </div>
      )}
    </div>
  );
}
