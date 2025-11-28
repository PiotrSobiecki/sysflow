import React, { useRef, useEffect, useState } from "react";
import { TEAM_MEMBERS } from "@constants";
import { useRevealOnIntersect } from "@hooks/useRevealOnIntersect";
import styles from "./Team.module.css";

interface TeamMemberCardProps {
  member: (typeof TEAM_MEMBERS)[number];
  index: number;
  isVisible: boolean;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  member,
  index,
  isVisible,
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
          }
        },
        {
          threshold: 0.3,
          rootMargin: "0px 0px -50px 0px",
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
  }, [isVisible, isMobile]);

  return (
    <div
      ref={cardRef}
      className={`${styles.teamMember} ${cardVisible ? styles.visible : ""}`}
      style={
        {
          animationDelay: `${index * 0.2}s`,
          marginLeft: index === 1 ? "0" : "auto",
          marginRight: index === 0 ? "auto" : "0",
        } as React.CSSProperties
      }
    >
      <div className={styles.memberAvatar}>
        {member.image ? (
          <>
            <img
              src={member.image}
              alt={member.name}
              className={styles.memberImage}
              loading="lazy"
            />
            <div className={styles.memberGradient}></div>
          </>
        ) : (
          <span>{(member as (typeof TEAM_MEMBERS)[number]).initials}</span>
        )}
      </div>
      <div className={styles.teamMemberContent}>
        <h3>{member.name}</h3>
        <p className={styles.memberRole}>{member.role}</p>
      </div>
    </div>
  );
};

export const Team: React.FC = () => {
  const { ref, isVisible } = useRevealOnIntersect();

  return (
    <section
      id="team"
      className={`${styles.section} section section--dark`}
      ref={ref}
    >
      <div className="container">
        <h2 className="section-title">Zespół Sysflow</h2>
        <p className={`section-description ${styles.fullWidthDescription}`}>
          Za sukcesem firmy stoją doświadczeni specjaliści z pasją do
          optymalizacji i automatyzacji.
        </p>

        <div className={styles.teamGrid}>
          {TEAM_MEMBERS.map((member, index) => (
            <TeamMemberCard
              key={index}
              member={member}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
