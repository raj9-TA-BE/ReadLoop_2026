'use client'
import { useCommunityTrack } from '@/lib/hooks'
import styles from './CommunityTrack.module.css'

export default function CommunityTrack({ onChange }) {
  const { track, setTrack, allMeta } = useCommunityTrack()

  const handleSelect = (newTrack) => {
    setTrack(newTrack)
    if (onChange) onChange(newTrack)
  }

  const tracks = [
    {
      id: 'none',
      icon: '📚',
      label: 'General',
      subtitle: 'All traditions',
      desc: 'Self-development, psychology, productivity, and philosophy from around the world.',
      color: '#E0A83E',
      communityDay: null,
    },
    {
      id: 'hindu',
      icon: '🕉️',
      label: 'Hindu Dharma',
      subtitle: 'Every Sunday',
      desc: 'Bhagavad Gita, Upanishads, Vivekananda, Yogananda — the great texts of Sanatana Dharma, interspersed on Sundays.',
      color: '#FF6B35',
      communityDay: 'Sunday',
      books: 7,
    },
    {
      id: 'jain',
      icon: '☸️',
      label: 'Jain Wisdom',
      subtitle: 'Every Thursday',
      desc: 'Tattvartha Sutra, Mahavira&#39;s teachings, Kundakunda, Hemachandra — ahimsa and anekantavada every Thursday.',
      color: '#7CB9E8',
      communityDay: 'Thursday',
      books: 7,
    },
  ]

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>Your Reading Track</h3>
        <p className={styles.subtitle}>
          Community tracks add one philosophy book from your tradition each week, woven into your daily reading.
        </p>
      </div>

      <div className={styles.grid}>
        {tracks.map(t => (
          <button
            key={t.id}
            className={`${styles.track} ${track === t.id ? styles.active : ''}`}
            style={{ '--track-color': t.color }}
            onClick={() => handleSelect(t.id)}
            aria-pressed={track === t.id}
          >
            <div className={styles.trackIcon}>{t.icon}</div>
            <div className={styles.trackInfo}>
              <div className={styles.trackLabel}>{t.label}</div>
              <div className={styles.trackSubtitle}>{t.subtitle}</div>
              <div className={styles.trackDesc}>{t.desc}</div>
              {t.communityDay && (
                <div className={styles.trackPill}>
                  {t.books} books · rotates weekly on {t.communityDay}
                </div>
              )}
            </div>
            {track === t.id && (
              <div className={styles.checkmark} aria-hidden>✓</div>
            )}
          </button>
        ))}
      </div>

      {track !== 'none' && (
        <div className={styles.activeNotice} style={{ borderColor: allMeta[track]?.color }}>
          <span style={{ color: allMeta[track]?.color }}>{allMeta[track]?.icon}</span>
          <span>
            <strong>{allMeta[track]?.label}</strong> active —
            your community book appears every {allMeta[track]?.communityDay}.
            General books fill all other days.
          </span>
        </div>
      )}
    </div>
  )
}
