import React, { useState, useEffect, useRef } from "react";
import { TRAINING_FEATURES, AGENDA_ITEMS, TRAINING_PRICE } from "@constants";
import { useRevealOnIntersect } from "@hooks/useRevealOnIntersect";
import styles from "./Training.module.css";

export const Training: React.FC = () => {
  const { ref, isVisible } = useRevealOnIntersect();
  const [forceVisible, setForceVisible] = useState(false);
  const [animatedPrice, setAnimatedPrice] = useState(0);
  const priceBoxRef = useRef<HTMLDivElement>(null);
  const animationTimerRef = useRef<number | null>(null);

  useEffect(() => {
    // Na mobile pokaż sekcję od razu, nawet jeśli IntersectionObserver
    // z jakiegoś powodu nie zadziała (problem na części iPhone / Android)
    if (typeof window !== "undefined" && window.innerWidth <= 768) {
      setForceVisible(true);
    }

    const priceBox = priceBoxRef.current;
    if (!priceBox) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Resetuj cenę i uruchom animację od 30000 w dół do 12000
          setAnimatedPrice(30000);

          // Wyczyść poprzedni timer jeśli istnieje
          if (animationTimerRef.current) {
            clearInterval(animationTimerRef.current);
          }

          let start = 30000;
          const end = TRAINING_PRICE; // 12000
          const duration = 2000;
          const decrement = (30000 - end) / (duration / 16);

          animationTimerRef.current = window.setInterval(() => {
            start -= decrement;
            if (start <= end) {
              setAnimatedPrice(end);
              if (animationTimerRef.current) {
                clearInterval(animationTimerRef.current);
                animationTimerRef.current = null;
              }
            } else {
              setAnimatedPrice(Math.floor(start));
            }
          }, 16);
        } else {
          // Resetuj cenę gdy element opuszcza viewport
          setAnimatedPrice(30000);
          if (animationTimerRef.current) {
            clearInterval(animationTimerRef.current);
            animationTimerRef.current = null;
          }
        }
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    observer.observe(priceBox);

    return () => {
      observer.disconnect();
      if (animationTimerRef.current) {
        clearInterval(animationTimerRef.current);
      }
    };
  }, []);

  const sectionVisible = isVisible || forceVisible;

  return (
    <section
      id="szkolenie"
      className={`${styles.section} section section--dark`}
      ref={ref}
    >
      <div className={styles.videoBackground}>
        <video autoPlay loop muted playsInline className={styles.video}>
          <source
            src={`${import.meta.env.BASE_URL}video/video1.mp4`}
            type="video/mp4"
          />
        </video>
        <div className={styles.videoOverlay}></div>
      </div>
      <div className="container">
        <h2
          className={`section-title ${styles.titleText}`}
          style={{ color: "#fff" }}
        >
          Szkolenie: Przekształć Sposób Pracy Zespołu
        </h2>
        <p
          className={`section-description ${styles.descriptionText}`}
          style={{ color: "#fff" }}
        >
          Nasze kompleksowe szkolenie to 8 spotkań, które wyposażą Twój zespół w
          praktyczną wiedzę i narzędzia do natychmiastowego zastosowania. Każde
          spotkanie trwa 60 minut i kończy się konkretnymi wskazówkami
          implementacyjnymi. Celem jest znaczący efekt po każdym spotkaniu.
        </p>

          <div className={styles.features}>
          <h3>Co wyróżnia nasze szkolenie?</h3>
          <div className={styles.featuresGrid}>
            {TRAINING_FEATURES.map((feature, index) => (
              <div
                key={index}
                className={`${styles.feature} ${
                  sectionVisible ? styles.visible : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className={styles.featureIcon}>✓</span>
                <div
                  dangerouslySetInnerHTML={{
                    __html: feature.replace(
                      /\*\*(.*?)\*\*/g,
                      "<strong>$1</strong>"
                    ),
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div
          ref={priceBoxRef}
          className={`${styles.priceBox} ${
            sectionVisible ? styles.visible : ""
          }`}
        >
          <h3>Koszt</h3>
          <div className={styles.price}>
            {animatedPrice.toLocaleString("pl-PL")} PLN
          </div>
          <p className={styles.priceNote}>
            Niektóre prezentowane aplikacje są płatne – decyzja o ich zakupie
            należy do uczestników.
          </p>
        </div>

        <h3
          className={`${styles.agendaTitle} ${styles.agendaTitleText}`}
          style={{ color: "#fff" }}
        >
          Agenda Szkolenia
        </h3>
        <p
          className={`${styles.agendaSubtitle} ${styles.agendaSubtitleText}`}
          style={{ color: "#fff" }}
        >
          Program dostosowujemy do specyfiki Twojej firmy, ale standardowa
          agenda obejmuje następujące moduły:
        </p>

        <div className={styles.agendaGrid}>
          {AGENDA_ITEMS.map((item, index) => (
            <AgendaCard
              key={item.number}
              item={item}
              index={index}
              isVisible={sectionVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface AgendaCardProps {
  item: (typeof AGENDA_ITEMS)[number];
  index: number;
  isVisible: boolean;
}

const AgendaCard: React.FC<AgendaCardProps> = ({ item, index, isVisible }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({
    x: 0,
    y: 0,
    rotateX: 0,
    rotateY: 0,
  });
  const [gridTransform, setGridTransform] = useState({
    x: 80,
    y: 80,
    scale: 1,
    radius: 80,
  });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const element = itemRef.current;
    if (!element) return;

    const isMobile = window.innerWidth <= 768;

    // Na mobile: użyj IntersectionObserver do aktywacji animacji
    if (isMobile) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsActive(true);
            // Uruchom animacje hover automatycznie
            setGridTransform({
              x: 80,
              y: 80,
              scale: 1.5,
              radius: 80,
            });
          } else {
            setIsActive(false);
            setGridTransform({
              x: 80,
              y: 80,
              scale: 1,
              radius: 80,
            });
          }
        },
        {
          threshold: 0.5,
          rootMargin: "0px 0px -20% 0px",
        }
      );

      observer.observe(element);

      return () => {
        observer.disconnect();
      };
    }

    // Na desktopie: użyj hover
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      const translateX = ((x - centerX) / centerX) * 8;
      const translateY = ((y - centerY) / centerY) * 8;

      const gridXPercent = (x / rect.width) * 100;
      const gridYPercent = (y / rect.height) * 100;
      const bulgeRadius = 80;
      const gridScale = 1.5;

      setTransform({
        x: translateX,
        y: translateY,
        rotateX,
        rotateY,
      });

      setGridTransform({
        x: gridXPercent,
        y: gridYPercent,
        scale: gridScale,
        radius: bulgeRadius,
      });
    };

    const handleMouseLeave = () => {
      setTransform({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
      setGridTransform({ x: 75, y: 75, scale: 1, radius: 80 });
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={itemRef}
      className={`${styles.agendaItem} ${isVisible ? styles.visible : ""} ${
        isActive ? styles.active : ""
      }`}
      style={{
        animationDelay: `${index * 0.05}s`,
        transform: `perspective(1000px) translateX(${transform.x}px) translateY(${transform.y}px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) translateZ(0)`,
      }}
    >
      <div className={styles.agendaGridWrapper}>
        <div
          className={styles.agendaGridPattern}
          style={
            {
              transform: `scale(${gridTransform.scale})`,
              transformOrigin: `${gridTransform.x}% ${gridTransform.y}%`,
            } as React.CSSProperties
          }
        ></div>
        <div
          className={styles.agendaGridBulge}
          style={
            {
              "--bulge-radius": `${gridTransform.radius}px`,
              "--bulge-x": `${gridTransform.x}%`,
              "--bulge-y": `${gridTransform.y}%`,
            } as React.CSSProperties
          }
        ></div>
      </div>
      <div className={styles.agendaNumber}>{item.number}</div>
      <h4>{item.title}</h4>
      <p>{item.description}</p>
    </div>
  );
};
