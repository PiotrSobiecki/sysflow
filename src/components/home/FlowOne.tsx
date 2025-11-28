import React, { useRef, useEffect, useMemo, useState } from "react";
import { PROCESS_STEPS, AUTOMATION_AREAS } from "@constants";
import { useRevealOnIntersect } from "@hooks/useRevealOnIntersect";
import styles from "./FlowOne.module.css";

interface ProcessStepCardProps {
  step: (typeof PROCESS_STEPS)[number];
  index: number;
  isVisible: boolean;
  delayStyle: React.CSSProperties;
}

interface AutomationAreaCardProps {
  area: (typeof AUTOMATION_AREAS)[number];
  index: number;
  isVisible: boolean;
  activeCardIndices: Set<number>;
  setActiveCardIndices: React.Dispatch<React.SetStateAction<Set<number>>>;
}

const AutomationAreaCard: React.FC<AutomationAreaCardProps> = ({
  area,
  index,
  isVisible,
  activeCardIndices,
  setActiveCardIndices,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardVisible, setCardVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Na mobile: użyj osobnego IntersectionObserver dla każdej karty
    if (isMobile) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setCardVisible(true);
            // Dodaj tę kartę do aktywnych
            setActiveCardIndices((prev) => {
              const newSet = new Set(prev);
              newSet.add(index);
              return newSet;
            });
          } else {
            // Gdy karta opuszcza viewport, usuń ją z aktywnych
            setActiveCardIndices((prev) => {
              const newSet = new Set(prev);
              newSet.delete(index);
              return newSet;
            });
          }
        },
        {
          threshold: [0.3, 0.6],
          rootMargin: "0px 0px -25% 0px",
        }
      );

      observer.observe(card);

      return () => {
        observer.disconnect();
      };
    } else {
      // Na desktopie: użyj isVisible z sekcji
      setCardVisible(isVisible);
    }
  }, [isVisible, isMobile, index, setActiveCardIndices]);

  return (
    <div
      ref={cardRef}
      className={`${styles.areaCard} ${cardVisible ? styles.visible : ""} ${
        activeCardIndices.has(index) ? styles.active : ""
      }`}
      style={
        {
          animationDelay: `${index * 0.12}s`,
          "--card-index": index,
        } as React.CSSProperties
      }
    >
      {area.image && (
        <div className={styles.areaCardImageWrapper} key={`image-${index}`}>
          <img
            key={`img-${index}-${area.image}`}
            src={area.image}
            alt={area.title}
            className={styles.areaCardImage}
            loading="lazy"
          />
        </div>
      )}
      <h4>{area.title}</h4>
      <p>{area.description}</p>
    </div>
  );
};

const ProcessStepCard: React.FC<ProcessStepCardProps> = ({
  step,
  index,
  isVisible,
  delayStyle,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isCompactStack, setIsCompactStack] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsCompactStack(window.innerWidth <= 600);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Usunięto animację scale podczas scrollowania - tylko efekt sticky pozostaje

  const baseTop = isCompactStack ? 90 : 140;
  const verticalStep = isCompactStack ? 18 : 30;
  const horizontalStep = isCompactStack ? 8 : 15;
  const stickyTop = baseTop + index * verticalStep;
  const leftOffset = index * horizontalStep;

  return (
    <div
      ref={cardRef}
      className={`${styles.processStep} ${isVisible ? styles.visible : ""}`}
      style={{
        position: "sticky",
        top: `${stickyTop}px`,
        marginLeft: `${leftOffset}px`,
        marginBottom: "200px",
        transformOrigin: "center top",
        ...delayStyle,
      }}
    >
      <div className={styles.stepImageWrapper}>
        <img
          src={step.image}
          alt={step.title}
          className={styles.stepImage}
          loading="lazy"
        />
      </div>
      <div className={styles.stepContent}>
        <h4>{step.title}</h4>
        <p>{step.description}</p>
      </div>
    </div>
  );
};

export const FlowOne: React.FC = () => {
  const { ref, isVisible } = useRevealOnIntersect();
  const [activeCardIndices, setActiveCardIndices] = useState<Set<number>>(
    new Set()
  );
  const goalRef = useRef<HTMLDivElement>(null);
  const [goalVisible, setGoalVisible] = useState(false);

  const cardDelaySteps = useMemo(
    () =>
      PROCESS_STEPS.map((_, index) => ({
        animationDelay: `${index * 140 + 200}ms`,
      })),
    []
  );

  useEffect(() => {
    const goal = goalRef.current;
    if (!goal) return;

    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setGoalVisible(true);
          }
        },
        {
          threshold: 0.3,
          rootMargin: "0px 0px -50px 0px",
        }
      );

      observer.observe(goal);

      return () => {
        observer.disconnect();
      };
    } else {
      setGoalVisible(isVisible);
    }
  }, [isVisible]);

  return (
    <section id="flowone" className="section section--darker" ref={ref}>
      <div className="container">
        <h2 className={`section-title ${styles.titleText}`}>
          FlowOne SYSTEM: Inteligentne Centrum Danych
        </h2>
        <p className={`section-description ${styles.descriptionText}`}>
          FlowOne SYSTEM to kompleksowe rozwiązanie, które centralizuje dane z
          wszystkich systemów firmowych i automatyzuje kluczowe procesy.
          Wykorzystujemy technologie AI oraz platformy Low-Code/No-Code, aby
          dostarczyć system idealnie dopasowany do Twojej firmy.
        </p>

        <div
          ref={goalRef}
          className={`${styles.goal} ${goalVisible ? styles.visible : ""}`}
        >
          <h3>Cel wdrożenia</h3>
          <p>
            Usprawnienie pracy poprzez automatyzację powtarzalnych zadań i
            scentralizowanie danych w jednym, intuicyjnym systemie. Koniec z
            przeskakiwaniem między dziesiątkami aplikacji – wszystko w jednym
            miejscu.
          </p>
          <div className={styles.billingModel}>
            <strong>Model rozliczeniowy:</strong> FTE/success fee
          </div>
        </div>

        <h3 className={styles.processTitle}>Proces Wdrożenia FlowOne SYSTEM</h3>
        <div className={styles.processStepsContainer}>
          <div className={styles.processSteps}>
            {PROCESS_STEPS.map((step, index) => (
              <ProcessStepCard
                key={index}
                step={step}
                index={index}
                isVisible={isVisible}
                delayStyle={cardDelaySteps[index]}
              />
            ))}
          </div>
        </div>

        <h3 className={styles.areasTitle}>Przykładowe Obszary Automatyzacji</h3>
        <p className={styles.areasSubtitle}>
          FlowOne SYSTEM można dostosować do niemal każdego procesu biznesowego.
          Oto najczęściej automatyzowane obszary:
        </p>

        <div className={styles.automationAreas}>
          {AUTOMATION_AREAS.map((area, index) => (
            <AutomationAreaCard
              key={index}
              area={area}
              index={index}
              isVisible={isVisible}
              activeCardIndices={activeCardIndices}
              setActiveCardIndices={setActiveCardIndices}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
