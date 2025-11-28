import React from 'react'
import { TEAM_MEMBERS } from '@constants'
import { useRevealOnIntersect } from '@hooks/useRevealOnIntersect'
import styles from './Team.module.css'

export const Team: React.FC = () => {
  const { ref, isVisible } = useRevealOnIntersect()

  return (
    <section id="team" className={`${styles.section} section section--dark`} ref={ref}>
      <div className="container">
        <h2 className="section-title">Zespół Sysflow</h2>
        <p className={`section-description ${styles.fullWidthDescription}`}>
          Za sukcesem firmy stoją doświadczeni specjaliści z pasją do optymalizacji i automatyzacji.
        </p>
        
        <div className={styles.teamGrid}>
          {TEAM_MEMBERS.map((member, index) => (
            <div 
              key={index} 
              className={`${styles.teamMember} ${isVisible ? styles.visible : ''}`}
              style={{ 
                animationDelay: `${index * 0.2}s`,
                marginLeft: index === 1 ? '0' : 'auto',
                marginRight: index === 0 ? 'auto' : '0'
              } as React.CSSProperties}
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
                  <span>{member.initials}</span>
                )}
              </div>
              <div className={styles.teamMemberContent}>
                <h3>{member.name}</h3>
                <p className={styles.memberRole}>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

