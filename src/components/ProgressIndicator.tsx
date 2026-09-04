import styles from "./ProgressIndicator.module.css";

export interface ProgressIndicatorProps {
  label: string;
  current: number;
  total: number;
}

/** Discrete step segments, never a percentage — retries make a percentage misleading (BUILD_SPEC §7). */
export function ProgressIndicator({ label, current, total }: ProgressIndicatorProps) {
  return (
    <div className={styles.wrap} role="group" aria-label={label}>
      <p className={styles.label}>{label}</p>
      <div className={styles.segments} aria-hidden="true">
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={[styles.segment, i < current ? styles.segmentFilled : ""].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}
