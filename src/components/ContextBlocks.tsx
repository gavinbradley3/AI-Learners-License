import type { ContextBlock } from "../types";
import styles from "./ContextBlocks.module.css";

export interface ContextBlocksProps {
  blocks?: readonly ContextBlock[];
}

/** Renders a mix of plain paragraphs and quoted lines (e.g. what a student typed to AI). */
export function ContextBlocks({ blocks }: ContextBlocksProps) {
  if (!blocks?.length) return null;
  return (
    <div className={styles.wrap}>
      {blocks.map((block, i) =>
        typeof block === "string" ? (
          <p key={i}>{block}</p>
        ) : (
          <blockquote key={i}>{block.quote}</blockquote>
        ),
      )}
    </div>
  );
}
