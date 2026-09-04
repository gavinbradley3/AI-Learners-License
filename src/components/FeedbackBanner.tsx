import styles from "./FeedbackBanner.module.css";

export interface FeedbackBannerProps {
  correct: boolean;
  correctLabel?: string;
  incorrectLabel?: string;
  text: string;
}

export function FeedbackBanner({
  correct,
  text,
  correctLabel = "Correct",
  incorrectLabel = "Not quite",
}: FeedbackBannerProps) {
  const classes = [styles.banner, correct ? styles.correct : styles.incorrect].join(" ");
  return (
    <div className={classes} role="status" aria-live="polite">
      <p className={styles.status}>
        <span aria-hidden="true">{correct ? "✓" : "✗"}</span>
        {correct ? correctLabel : incorrectLabel}
      </p>
      <p className={styles.text}>{text}</p>
    </div>
  );
}
