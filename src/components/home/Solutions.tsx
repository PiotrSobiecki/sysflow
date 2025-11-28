import React from "react";
import { useScrollToSection } from "@hooks/useScrollToSection";
import { useRevealOnIntersect } from "@hooks/useRevealOnIntersect";
import { ArrowRightIcon } from "@components/shared/Icons";
import styles from "./Solutions.module.css";

export const Solutions: React.FC = () => {
  const scrollToSection = useScrollToSection();
  const { ref, isVisible } = useRevealOnIntersect();

  return (
    <section className="section section--darker" ref={ref}>
      <div className="container">
        <h2 className="section-title">Nasze Rozwiązania</h2>
        <p
          className={`${styles.descriptionText} ${
            isVisible ? styles.visible : ""
          }`}
        >
          Też przez to przechodziliśmy — i odpowiedź znaleźliśmy w technologiach
          oraz mądrej automatyzacji. Poświęciliśmy czas na analizę narzędzi,
          przetestowaliśmy je w praktyce i zostawiliśmy tylko te, które realnie
          upraszczają pracę. Porządkujemy procesy, łączymy systemy, wprowadzamy
          AI tam, gdzie ma sens — aż w końcu układamy spójny, działający
          ekosystem pracy. Efekt? Mniej chaosu, szybsze decyzje i więcej czasu
          na kluczowe zadania.
        </p>
        <h3 className={styles.heading}>Jak możemy pomóc?</h3>
        <div className={styles.cards}>
          <div className={`${styles.card} ${isVisible ? styles.visible : ""}`}>
            <div className={styles.cardImage}>
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"
                alt="Szkolenie"
                className={styles.image}
                loading="lazy"
              />
            </div>
            <div className={styles.cardContent}>
              <h4>Szkolenie</h4>
              <p>
                Kompleksowy program edukacyjny z optymalizacji pracy,
                automatyzacji, bezpieczeństwa i prywatności oraz AI
              </p>
              <a
                onClick={() => scrollToSection("szkolenie")}
                className={styles.link}
              >
                Dowiedz się więcej <ArrowRightIcon size={20} />
              </a>
            </div>
          </div>
          <div
            className={`${styles.card} ${isVisible ? styles.visible : ""}`}
            style={{ animationDelay: "0.2s" }}
          >
            <div className={styles.cardImage}>
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
                alt="FlowOne SYSTEM"
                className={styles.image}
                loading="lazy"
              />
            </div>
            <div className={styles.cardContent}>
              <h4>FlowOne SYSTEM</h4>
              <p>
                Wdrożenie zaawansowanego systemu do zarządzania danymi i
                automatyzacji procesów biznesowych przy wykorzystaniu narzędzi
                typu low-code.
              </p>
              <a
                onClick={() => scrollToSection("flowone")}
                className={styles.link}
              >
                Dowiedz się więcej <ArrowRightIcon size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
