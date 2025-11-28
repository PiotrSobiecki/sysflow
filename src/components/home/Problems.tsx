import React from "react";
import { PROBLEMS } from "@constants";
import styles from "./Problems.module.css";

export const Problems: React.FC = () => {
  const cardRefs = React.useRef<(HTMLElement | null)[]>([]);
  const [visibleCards, setVisibleCards] = React.useState<boolean[]>([]);
  const [activeCardIndex, setActiveCardIndex] = React.useState<number | null>(
    null
  );

  React.useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const isMobile = window.innerWidth <= 768;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            if (isMobile) {
              // Na mobile: tylko ostatnia widoczna karta ma efekty hover
              setActiveCardIndex(index);
            }
            // Wszystkie karty pozostają widoczne
            setVisibleCards((prevState) => {
              const newState = [...prevState];
              newState[index] = true;
              return newState;
            });
          } else if (isMobile) {
            // Na mobile: gdy karta opuszcza viewport, dezaktywuj efekty hover
            setActiveCardIndex((prevIndex) =>
              prevIndex === index ? null : prevIndex
            );
          }
        },
        {
          threshold: 0.3,
          rootMargin: "0px 0px -30% 0px",
        }
      );

      observer.observe(card);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <section className={`${styles.section} section section--dark`}>
      <div className="container">
        <h2 className="section-title">Czy w firmie w której pracujesz…</h2>
        <div className={styles.list}>
          {PROBLEMS.map((problem, index) => (
            <article
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={`${styles.card} ${
                visibleCards[index] ? styles.visible : ""
              } ${activeCardIndex === index ? styles.active : ""}`}
              style={
                {
                  "--card-index": index,
                } as React.CSSProperties
              }
            >
              <div className={styles.cardContent}>
                <span className={styles.cardIndex}>
                  {String(index + 1).padStart(2, "0")} /
                </span>
                <div className={styles.copy}>
                  <div className={styles.titleLine}>{problem.text}</div>
                </div>
              </div>
              <div className={styles.cardPreview}>
                <div className={styles.previewInner}>
                  <img
                    src={problem.image}
                    alt=""
                    className={styles.previewImage}
                    loading="lazy"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
