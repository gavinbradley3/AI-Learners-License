import type { ReactNode } from "react";
import { ProgressIndicator } from "./ProgressIndicator";
import { ResetProgressControl } from "./ResetProgressControl";
import styles from "./AppShell.module.css";

export interface AppShellProps {
  children: ReactNode;
  progress?: { label: string; current: number; total: number };
  onReset: () => void;
}

export function AppShell({ children, progress, onReset }: AppShellProps) {
  return (
    <div className={styles.shell}>
      <a href="#main-content" className="visually-hidden">
        Skip to main content
      </a>
      <header className={styles.header}>
        <div className={styles.brandBlock}>
          <p className={styles.brand}>AI Learner Licence</p>
          <span className={styles.brandMark} aria-hidden="true">
            Classroom permit
          </span>
        </div>
        {progress && (
          <div className={styles.headerProgress}>
            <ProgressIndicator {...progress} />
          </div>
        )}
        <div className={styles.headerControls}>
          <ResetProgressControl onReset={onReset} />
        </div>
      </header>
      <main id="main-content" className={styles.main}>
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
}
