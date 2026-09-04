import { useState } from "react";
import type { InfoSection, ModuleScreen } from "../types";
import { Card } from "./Card";
import { Button } from "./Button";
import { ContextBlocks } from "./ContextBlocks";
import { QuestionCard } from "./QuestionCard";
import { DeckItem } from "./DeckItem";
import styles from "./ModuleScreenView.module.css";

export interface ModuleScreenViewProps {
  screen: ModuleScreen;
  onDone: () => void;
}

function InfoSectionBody({ section }: { section: InfoSection }) {
  return (
    <>
      <ContextBlocks blocks={section.blocks} />
      {section.bulletGroups?.map((group, i) => (
        <div className={styles.bulletGroup} key={i}>
          {group.heading && <p className={styles.bulletHeading}>{group.heading}</p>}
          <ul>
            {group.items.map((item, j) => (
              <li key={j}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
      {section.note && <p className={styles.note}>{section.note}</p>}
    </>
  );
}

export function ModuleScreenView({ screen, onDone }: ModuleScreenViewProps) {
  if (screen.type === "info") {
    return (
      <Card headingLevel="h1" variant="teaching" heading={screen.heading} eyebrow={screen.eyebrow ?? "Learn"}>
        <InfoSectionBody section={screen} />
        {screen.sections?.map((section, i) => (
          <div className={styles.section} key={i}>
            {section.heading && <h2 className={styles.sectionHeading}>{section.heading}</h2>}
            <InfoSectionBody section={section} />
          </div>
        ))}
        <div className="actions-row">
          <Button onClick={onDone}>{screen.continueLabel}</Button>
        </div>
      </Card>
    );
  }

  if (screen.type === "choice") {
    return (
      <Card headingLevel="h1" variant="practice" heading={screen.heading} eyebrow={screen.eyebrow ?? "Practice"}>
        <QuestionCard
          context={screen.context}
          prompt={screen.prompt}
          options={screen.options.map((o) => ({ text: o.label, feedback: o.feedback }))}
          correctIndex={screen.correctIndex}
          shuffleSeed={screen.id}
          continueLabel={screen.continueLabel}
          onContinue={onDone}
        />
      </Card>
    );
  }

  if (screen.type === "deck") {
    return <DeckScreenView screen={screen} onDone={onDone} />;
  }

  return (
    <Card headingLevel="h1" variant="teaching" eyebrow="Takeaway" heading={screen.heading}>
      <blockquote className={styles.note}>{screen.quote}</blockquote>
      <div className="actions-row">
        <Button onClick={onDone}>{screen.continueLabel}</Button>
      </div>
    </Card>
  );
}

function DeckScreenView({
  screen,
  onDone,
}: {
  screen: Extract<ModuleScreen, { type: "deck" }>;
  onDone: () => void;
}) {
  const [itemIndex, setItemIndex] = useState(0);
  const item = screen.items[itemIndex];
  const isLast = itemIndex === screen.items.length - 1;

  return (
    <Card headingLevel="h1" variant="practice" eyebrow="Practice" heading={screen.heading}>
      {screen.intro && <p>{screen.intro}</p>}
      <p className={styles.note}>
        {itemIndex + 1} of {screen.items.length}
      </p>
      <DeckItem
        key={item.id}
        prompt={item.prompt}
        choiceLabels={item.choiceLabels ?? screen.choiceLabels ?? []}
        correctIndex={item.correctIndex}
        {...(item.choiceLabels ? { shuffleSeed: item.id } : {})}
        feedback={item.feedback}
        continueLabel={isLast ? screen.continueLabel : "Next"}
        onContinue={() => {
          if (isLast) onDone();
          else setItemIndex((i) => i + 1);
        }}
      />
    </Card>
  );
}
