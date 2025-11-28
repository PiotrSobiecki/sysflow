import React from "react";
import { WHY_CHOOSE_ITEMS } from "@constants";
import { useRevealOnIntersect } from "@hooks/useRevealOnIntersect";
import styles from "./WhyChoose.module.css";

export const WhyChoose: React.FC = () => {
  const cardRefs = React.useRef<(HTMLElement | null)[]>([]);
  const [visibleCards, setVisibleCards] = React.useState<boolean[]>([]);
  const { ref: philosophyRef, isVisible: philosophyVisible } =
    useRevealOnIntersect();

  React.useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
            observer.unobserve(card);
          }
        },
        {
          threshold: 0.2,
          rootMargin: "0px 0px -50px 0px",
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
    <section className={`${styles.section} section section--darker`}>
      <div className="container">
        <h2 className="section-title">Dlaczego wybrać?</h2>
        <div className={styles.list}>
          {WHY_CHOOSE_ITEMS.map((item, index) => (
            <article
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={`${styles.card} ${
                visibleCards[index] ? styles.visible : ""
              }`}
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
                  <h4 className={styles.titleLine}>{item.title}</h4>
                  <p className={styles.descriptionLine}>{item.description}</p>
                </div>
              </div>
              <div className={styles.cardPreview}>
                <div className={styles.previewInner}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={styles.previewImage}
                    loading="lazy"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div
          ref={philosophyRef}
          className={`${styles.philosophy} ${
            philosophyVisible ? styles.visible : ""
          }`}
        >
          <h3>Nasza Filozofia</h3>
          <p>
            Wierzymy, że technologia powinna służyć ludziom, a nie na odwrót.
            Dlatego projektujemy systemy intuicyjne, które realnie oszczędzają
            czas i redukują frustrację.
          </p>
        </div>
      </div>
    </section>
  );
};
