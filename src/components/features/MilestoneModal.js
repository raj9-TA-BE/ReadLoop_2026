'use client'
import { useMemo } from 'react'
import styles from './MilestoneModal.module.css'

const CONFETTI_COLORS = ['var(--gold)', 'var(--teal)', 'var(--orange)', 'var(--gold2)', 'var(--teal2)']

export default function MilestoneModal({ milestone, onClose }) {
  const pieces = useMemo(() => {
    if (!milestone) return []
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.6,
      duration: 2.4 + Math.random() * 1.4,
      drift: `${(Math.random() - 0.5) * 160}px`,
      spin: `${360 + Math.random() * 360}deg`,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      size: 6 + Math.random() * 6,
    }))
  }, [milestone])

  if (!milestone) return null

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Streak milestone reached">
      <div className={styles.confettiField} aria-hidden>
        {pieces.map(p => (
          <span
            key={p.id}
            className={styles.confetti}
            style={{
              left: `${p.left}%`,
              width: p.size, height: p.size * 0.4,
              background: p.color,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              '--drift': p.drift,
              '--spin': p.spin,
            }}
          />
        ))}
      </div>

      <div className={styles.card}>
        <div className={styles.icon}>{milestone.icon}</div>
        <h3 className={styles.title}>{milestone.label}!</h3>
        <p className={styles.sub}>{milestone.streak}-day reading streak. You&apos;re building a habit that sticks.</p>
        <button className="btn btn-primary btn-lg" onClick={onClose}>Keep Reading</button>
      </div>
    </div>
  )
}
