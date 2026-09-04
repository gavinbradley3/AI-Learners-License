import { useEffect, useRef, useState } from "react";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { licence } from "../data/copy";
import { createLicenceRecord, formatIssueDate } from "../logic/licenceCredential";
import { useCourse } from "../state/CourseContext";
import { useCourseActions } from "../state/useCourseActions";
import styles from "./LicenceScreen.module.css";

export function LicenceScreen() {
  const { state } = useCourse();
  const actions = useCourseActions();
  const [revealed, setRevealed] = useState(false);
  const issuedRef = useRef(false);

  // Issued once, on this device, the first time the student reaches this screen. Kept in
  // progress state so a refresh shows the same number the student may have already printed.
  useEffect(() => {
    if (state.licence || issuedRef.current) return;
    issuedRef.current = true;
    actions.issueLicence(createLicenceRecord());
  }, [state.licence, actions]);

  const record = state.licence ?? null;

  return (
    <Card
      headingLevel="h1"
      variant="success"
      heading={licence.completionHeading}
      eyebrow={licence.statusLabel}
    >
      <div className="screen-only">
        <p>{licence.intro}</p>
        <p>{licence.meansIntro}</p>
        <ul>
          {licence.skills.map((skill, i) => (
            <li key={i}>{skill}</li>
          ))}
        </ul>
        <p style={{ fontWeight: 600 }}>{licence.overrideHeading}</p>
        <p>{licence.overrideBody}</p>
        <blockquote>{licence.quote}</blockquote>
      </div>

      {!revealed && (
        <div className="actions-row">
          <Button onClick={() => setRevealed(true)}>{licence.viewLicenceLabel}</Button>
        </div>
      )}

      {revealed && (
        <>
          <section className={styles.licenceCard} aria-label={licence.cardTitle}>
            <div className={styles.licenceHead}>
              <div>
                <h2 className={styles.licenceTitle}>{licence.cardTitle}</h2>
                <p className={styles.licenceKind}>Classroom learning credential</p>
              </div>
              <div className={styles.seal} aria-hidden="true">
                <span className={styles.sealTop}>{licence.cardSealTop}</span>
                <span className={styles.sealMark}>{licence.cardSealMark}</span>
                <span className={styles.sealBottom}>{licence.cardSealBottom}</span>
              </div>
            </div>

            <p className={styles.statusRow}>
              <span className={styles.statusLabel}>Status</span>
              <span className={styles.statusValue}>{licence.statusLabel}</span>
            </p>

            <p className={styles.skillsHeading}>{licence.cardSkillsHeading}</p>
            <ul className={styles.skillsList}>
              {licence.cardSkills.map((skill, i) => (
                <li key={i}>
                  <span className={styles.tick} aria-hidden="true">
                    ✓
                  </span>
                  {skill}
                </li>
              ))}
            </ul>

            {record && (
              <div className={styles.metaRow}>
                <span className={styles.metaItem}>
                  <span className={styles.metaLabel}>{licence.cardNumberLabel}</span>
                  <span className={styles.metaValue}>{record.number}</span>
                </span>
                <span className={styles.metaItem}>
                  <span className={styles.metaLabel}>{licence.cardIssuedLabel}</span>
                  <span className={styles.metaValue}>{formatIssueDate(record.issuedOn)}</span>
                </span>
              </div>
            )}

            <p className={styles.restriction}>{licence.cardRestriction}</p>
            <p className={styles.licenceFooter}>{licence.cardFooter}</p>
          </section>

          <div className="actions-row">
            <Button onClick={() => actions.goTo("exitSurvey")}>{licence.continueLabel}</Button>
            <Button variant="secondary" onClick={() => window.print()}>
              {licence.printLabel}
            </Button>
          </div>
        </>
      )}
    </Card>
  );
}
