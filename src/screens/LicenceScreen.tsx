import { useState } from "react";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { licence } from "../data/copy";
import { useCourseActions } from "../state/useCourseActions";
import styles from "./LicenceScreen.module.css";

export function LicenceScreen() {
  const actions = useCourseActions();
  const [revealed, setRevealed] = useState(false);

  return (
    <Card headingLevel="h1" heading={licence.completionHeading} eyebrow={licence.statusLabel}>
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

      {!revealed && (
        <div className="actions-row">
          <Button onClick={() => setRevealed(true)}>{licence.viewLicenceLabel}</Button>
        </div>
      )}

      {revealed && (
        <>
          <div className={styles.licenceCard} aria-label="AI Learner Licence card">
            <p className={styles.licenceTitle}>{licence.cardTitle}</p>
            <p className={styles.licenceStatus}>{licence.cardStatusLabel}</p>
            <p className={styles.skillsHeading}>{licence.cardSkillsHeading}</p>
            <ul className={styles.skillsList}>
              {licence.cardSkills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
            <p className={styles.licenceFooter}>{licence.cardFooter}</p>
          </div>
          <div className="actions-row">
            <Button onClick={() => actions.goTo("exitSurvey")}>{licence.continueLabel}</Button>
          </div>
        </>
      )}
    </Card>
  );
}
