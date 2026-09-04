import { useState } from "react";
import { ChoiceList } from "./ChoiceList";
import { FeedbackBanner } from "./FeedbackBanner";
import { Button } from "./Button";
import styles from "./QuestionCard.module.css";

export interface CorrectionCardProps {
  eyebrow?: string;
  prompt: string;
  options: readonly [string, string];
  correctIndex: 0 | 1;
  /** Shown only after an incorrect attempt, to explain without shaming. */
  explanation: string;
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
  continueLabel = "Continue",
  onCleared,
}: CorrectionCardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const isCorrect = selectedIndex !== null && selectedIndex === correctIndex;

  const handleTryAgain = () => setSelectedIndex(null);

  return (
    <div>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <p className={styles.prompt}>{prompt}</p>
      <ChoiceList
        options={options}
        selectedIndex={selectedIndex}
        correctIndex={selectedIndex !== null ? correctIndex : null}
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
