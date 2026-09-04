import type { ElementType, ReactNode } from "react";
import styles from "./Card.module.css";

export interface CardProps {
  eyebrow?: string;
  heading?: string;
  headingLevel?: ElementType;
  headingId?: string;
  children?: ReactNode;
  className?: string;
}

export function Card({
  eyebrow,
  heading,
  headingLevel: HeadingTag = "h2",
  headingId,
  children,
  className,
}: CardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ");
  return (
    <section className={classes}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      {heading && (
        <HeadingTag id={headingId} className={styles.heading}>
          {heading}
        </HeadingTag>
      )}
      {children}
    </section>
  );
}
