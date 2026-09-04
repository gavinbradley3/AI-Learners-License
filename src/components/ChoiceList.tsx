import styles from "./ChoiceList.module.css";

export interface ChoiceListProps {
  options: readonly string[];
  selectedIndex: number | null;
  /** null means never reveal correctness (used for the ungraded pre-check). */
  correctIndex: number | null;
  onSelect: (index: number) => void;
}

/** Presentation-only option letter (A, B, C, D…) — never used for scoring, which stays index/id based. */
function letterFor(index: number): string {
  return String.fromCharCode(65 + index);
}

export function ChoiceList({ options, selectedIndex, correctIndex, onSelect }: ChoiceListProps) {
  const locked = selectedIndex !== null;

  return (
    <ul className={styles.list}>
      {options.map((text, index) => {
        const isSelected = index === selectedIndex;
        const isCorrect = correctIndex !== null && index === correctIndex;
        const showResult = isSelected && correctIndex !== null;
        const statusText = showResult ? (isCorrect ? "Correct" : "Not quite") : null;
        const letter = letterFor(index);

        const classes = [
          styles.choice,
          isSelected && !showResult ? styles.selected : "",
          showResult && isCorrect ? styles.correct : "",
          showResult && !isCorrect ? styles.incorrect : "",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <li key={index} className={styles.item}>
            <button
              type="button"
              className={classes}
              disabled={locked}
              onClick={() => {
                if (!locked) onSelect(index);
              }}
              aria-label={
                statusText ? `${letter}. ${text} — selected, ${statusText.toLowerCase()}` : undefined
              }
            >
              <span className={styles.letter}>{letter}.</span>
              <span className={styles.label}>{text}</span>
              {statusText && (
                <span className={styles.statusTag}>
                  <span aria-hidden="true">{isCorrect ? "✓" : "✗"}</span>
                  {statusText}
                </span>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
