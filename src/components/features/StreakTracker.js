'use client'
import styles from './StreakTracker.module.css'

export default function StreakTracker({ streak, xp, todayRead, onMarkRead, getBadges, readDays }) {
  const today = new Date()
  const days = ['MON','TUE','WED','THU','FRI','SAT','SUN']
  const dayOfWeek = today.getDay()
  const mondayOffset = (dayOfWeek + 6) % 7

  const weekCells = days.map((d, i) => {
    const cellDate = new Date(today)
    cellDate.setDate(today.getDate() - mondayOffset + i)
    const dateStr = cellDate.toDateString()
    const isToday = cellDate.toDateString() === today.toDateString()
    const isPast = cellDate < today && !isToday
    const wasRead = readDays?.includes(dateStr) || (isPast && i < mondayOffset && streak > 0)
    return { label: d, isToday, wasRead }
  })

  const badges = getBadges()
  const level = Math.floor(xp / 500) + 1
  const levelXp = xp % 500
  const levelProgress = (levelXp / 500) * 100

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={styles.streakBadge}>
          <div className={styles.flame}>🔥</div>
          <div>
            <div className={styles.count}>{streak}</div>
            <div className={styles.label}>day streak</div>
          </div>
        </div>

        <div className={styles.levelBox}>
          <div className={styles.levelNum}>Lvl {level}</div>
          <div className={styles.xpBar}>
            <div className={styles.xpFill} style={{ width: `${levelProgress}%` }} />
          </div>
          <div className={styles.xpLabel}>{levelXp} / 500 XP</div>
        </div>

        <div className={styles.totalXp}>
          <div className={styles.xpBig}>{xp.toLocaleString()}</div>
          <div className={styles.xpSub}>total XP earned</div>
        </div>
      </div>

      <div className={styles.weekGrid}>
        {weekCells.map((cell, i) => (
          <div
            key={i}
            className={`${styles.day} ${cell.isToday ? styles.today : ''} ${cell.wasRead ? styles.read : ''}`}
          >
            <span className={styles.dayName}>{cell.label}</span>
            <span className={styles.dayIcon}>
              {cell.wasRead ? '✓' : cell.isToday ? '📖' : '·'}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.badges}>
        {badges.map(b => (
          <div
            key={b.id}
            className={`${styles.badge} ${b.earned ? styles.earned : styles.locked}`}
            title={b.earned ? `Earned: ${b.label}` : `Locked: ${b.label}`}
          >
            <span>{b.icon}</span>
            <span>{b.label}</span>
          </div>
        ))}
      </div>

      <button
        className={`${styles.markBtn} ${todayRead ? styles.done : ''}`}
        onClick={onMarkRead}
        disabled={todayRead}
      >
        {todayRead
          ? '✓ Streak extended — see you tomorrow!'
          : '✓ Mark today\'s book as read  (+60 XP)'}
      </button>
    </div>
  )
}
