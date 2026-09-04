import { useState } from "react";
import { Button } from "./Button";
import { resetProgressCopy } from "../data/copy";
import styles from "./ResetProgressControl.module.css";

export interface ResetProgressControlProps {
  onReset: () => void;
}

export function ResetProgressControl({ onReset }: ResetProgressControlProps) {
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <div className={styles.confirmRow} role="alertdialog" aria-label={resetProgressCopy.confirmLabel}>
        <span>{resetProgressCopy.confirmMessage}</span>
        <Button
          variant="secondary"
          onClick={() => {
            setConfirming(false);
            onReset();
          }}
        >
          {resetProgressCopy.confirmLabel}
        </Button>
        <Button variant="ghost" onClick={() => setConfirming(false)}>
          {resetProgressCopy.cancelLabel}
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <Button variant="ghost" onClick={() => setConfirming(true)}>
        {resetProgressCopy.buttonLabel}
      </Button>
    </div>
  );
}
