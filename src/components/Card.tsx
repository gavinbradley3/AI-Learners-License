import type { ElementType, ReactNode } from "react";
import styles from "./Card.module.css";

/**
 * The five states of the course. Each gets its own rail colour and eyebrow tint so a
 * student can tell teaching from practice from marked assessment at a glance — always
 * alongside the eyebrow text, never colour on its own.
 */
export type CardVariant = "teaching" | "practice" | "assessment" | "correction" | "success";

export interface CardProps {
  eyebrow?: string;
  heading?: string;
  headingLevel?: ElementType;
  headingId?: string;
  variant?: CardVariant;
  /** A short technical mark shown beside the heading, e.g. a module number. */
  marker?: string;
  children?: ReactNode;
  className?: string;
}

export function Card({
  eyebrow,
  heading,
  headingLevel: HeadingTag = "h2",
  headingId,
  variant,
  marker,
  children,
  className,
}: CardProps) {
  const classes = [styles.card, variant ? styles[variant] : "", className].filter(Boolean).join(" ");
  const hasHead = Boolean(eyebrow || heading);

  return (
    <section className={classes}>
      {hasHead && (
        <div className={styles.head}>
          <div className={styles.headText}>
            {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
            {heading && (
              <HeadingTag id={headingId} className={styles.heading}>
                {heading}
              </HeadingTag>
            )}
          </div>
          {marker && (
            <span className={styles.marker} aria-hidden="true">
              {marker}
            </span>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
