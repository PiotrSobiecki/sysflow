import React from 'react'
import { PROBLEMS } from '@constants'
import styles from './Problems.module.css'

export const Problems: React.FC = () => {
  const cardRefs = React.useRef<(HTMLArticleElement | null)[]>([])
  const [visibleCards, setVisibleCards] = React.useState<boolean[]>([])

  React.useEffect(() => {
    const observers: IntersectionObserver[] = []

    cardRefs.current.forEach((card, index) => {
      if (!card) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => {
              const newState = [...prev]
              newState[index] = true
              return newState
            })
            observer.unobserve(card)
          }
        },
        {
          threshold: 0.2,
          rootMargin: '0px 0px -50px 0px',
        }
      )

      observer.observe(card)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  return (
    <section className={`${styles.section} section section--dark`}>
      <div className="container">
        <h2 className="section-title">
          Czy w firmie w której pracujesz…
        </h2>
        <div className={styles.list}>
          {PROBLEMS.map((problem, index) => (
            <article
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el
              }}
              className={`${styles.card} ${visibleCards[index] ? styles.visible : ''}`}
              style={{ 
                '--card-index': index
              } as React.CSSProperties}
            >
              <div className={styles.cardContent}>
                <span className={styles.cardIndex}>
                  {String(index + 1).padStart(2, '0')} /
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
  )
}

