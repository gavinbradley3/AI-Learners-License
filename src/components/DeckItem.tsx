import { useMemo, useRef, useState } from "react";
import { ChoiceList } from "./ChoiceList";
import { FeedbackBanner } from "./FeedbackBanner";
import { Button } from "./Button";
import { hasFixedOrder, presentOptions } from "../logic/optionOrder";
import styles from "./QuestionCard.module.css";

export interface DeckItemProps {
  prompt: string;
  choiceLabels: readonly string[];
  correctIndex: number;
  feedback: string;
  /**
   * Only set for decks whose cards carry their own answer pair. Decks that reuse one
   * fixed scale across every card (Quick Sort, Trust Meter) keep their authored order,
   * because reordering a scale per card would break the mental model.
   */
  shuffleSeed?: string;
  continueLabel?: string;
  onContinue: () => void;
}

/** One card of a sequential deck (Quick Sort, Trust Meter): a shared label set, one feedback line per item. */
export function DeckItem({
  prompt,
  choiceLabels,
  correctIndex,
  feedback,
  shuffleSeed,
  continueLabel = "Continue",
  onContinue,
}: DeckItemProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const hasContinuedRef = useRef(false);

  const presented = useMemo(() => {
    if (!shuffleSeed || hasFixedOrder(choiceLabels)) {
      return { options: [...choiceLabels], correctIndex };
    }
    return presentOptions(choiceLabels, correctIndex, shuffleSeed);
  }, [choiceLabels, correctIndex, shuffleSeed]);

  const handleContinue = () => {
    if (selectedIndex === null || hasContinuedRef.current) return;
    hasContinuedRef.current = true;
    onContinue();
  };

  return (
    <div>
      <p className={styles.prompt}>{prompt}</p>
      <ChoiceList
        options={presented.options}
        selectedIndex={selectedIndex}
        correctIndex={selectedIndex !== null ? presented.correctIndex : null}
        onSelect={setSelectedIndex}
      />
      {selectedIndex !== null && (
        <FeedbackBanner correct={selectedIndex === presented.correctIndex} text={feedback} />
      )}
      {selectedIndex !== null && (
        <div className={styles.continueRow}>
          <Button onClick={handleContinue}>{continueLabel}</Button>
        </div>
      )}
    </div>
  );
}
