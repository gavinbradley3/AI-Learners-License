import { useRef, useState } from "react";
import { ChoiceList } from "./ChoiceList";
import { FeedbackBanner } from "./FeedbackBanner";
import { Button } from "./Button";
import styles from "./QuestionCard.module.css";

export interface DeckItemProps {
  prompt: string;
  choiceLabels: readonly string[];
  correctIndex: number;
  feedback: string;
  continueLabel?: string;
  onContinue: () => void;
}

/** One card of a sequential deck (Quick Sort, Trust Meter): a shared label set, one feedback line per item. */
export function DeckItem({
  prompt,
  choiceLabels,
  correctIndex,
  feedback,
  continueLabel = "Continue",
  onContinue,
}: DeckItemProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const hasContinuedRef = useRef(false);

  const handleContinue = () => {
    if (selectedIndex === null || hasContinuedRef.current) return;
    hasContinuedRef.current = true;
    onContinue();
  };

  return (
    <div>
      <p className={styles.prompt}>{prompt}</p>
      <ChoiceList
        options={choiceLabels}
        selectedIndex={selectedIndex}
        correctIndex={selectedIndex !== null ? correctIndex : null}
        onSelect={setSelectedIndex}
      />
      {selectedIndex !== null && (
        <FeedbackBanner correct={selectedIndex === correctIndex} text={feedback} />
      )}
      {selectedIndex !== null && (
        <div className={styles.continueRow}>
          <Button onClick={handleContinue}>{continueLabel}</Button>
        </div>
      )}
    </div>
  );
}
