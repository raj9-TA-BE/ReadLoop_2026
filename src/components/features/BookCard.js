'use client'
import { useState } from 'react'
import styles from './BookCard.module.css'

export default function BookCard({ book, onMarkRead, todayRead }) {
  const [saved, setSaved] = useState(false)
  const [shared, setShared] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const handleSave = () => {
    setSaved(true)
    const saved = JSON.parse(localStorage.getItem('readloop_saved') || '[]')
    if (!saved.includes(book.id)) {
      localStorage.setItem('readloop_saved', JSON.stringify([...saved, book.id]))
    }
  }

  const handleShare = async () => {
    const text = `"${book.quote}"\n— ${book.author}\n\nRead the full essence on ReadLoop 📚\nhttps://readloop.co.uk`
    if (navigator.share) {
      try { await navigator.share({ title: `ReadLoop: ${book.title}`, text }) }
      catch {}
    } else {
      await navigator.clipboard.writeText(text)
      setShared(true)
      setTimeout(() => setShared(false), 2000)
    }
  }

  return (
    <article className={`${styles.card} fade-up`}>
      <header className={styles.header}>
        <div className={styles.spine}>{book.emoji}</div>
        <div className={styles.meta}>
          <h2 className={styles.title}>{book.title}</h2>
          <p className={styles.author}>by {book.author}</p>
          <div className={styles.tags}>
            {book.tags.map(t => <span key={t} className="tag">{t}</span>)}
            <span className={styles.readTime}>⏱ {book.readTime} min read</span>
          </div>
        </div>
        <div className={styles.dayBadge}>
          <span className={styles.dayNum}>Day {book.day}</span>
          <span className={styles.dayOf}>of 365</span>
        </div>
      </header>

      <div className={styles.body}>
        <p className={styles.essenceLabel}>CORE ESSENCE</p>
        <p className={`${styles.essence} ${expanded ? styles.expanded : ''}`}>
          {book.essence}
        </p>
        {!expanded && (
          <button className={styles.readMore} onClick={() => setExpanded(true)}>
            Read full essence ↓
          </button>
        )}

        <blockquote className={styles.quote}>
          <span className={styles.openQuote}>"</span>
          {book.quote}
          <span className={styles.closeQuote}>"</span>
          <cite>— {book.author}</cite>
        </blockquote>

        <div className={styles.lessons}>
          <p className={styles.lessonsLabel}>3 LESSONS TO ACT ON TODAY</p>
          {book.lessons.map((l, i) => (
            <div key={i} className={styles.lesson}>
              <div className={styles.lessonNum}>{i + 1}</div>
              <p>{l}</p>
            </div>
          ))}
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerActions}>
          <button
            className={`${styles.actionBtn} ${saved ? styles.saved : ''}`}
            onClick={handleSave}
            disabled={saved}
          >
            {saved ? '♥ Saved' : '♡ Save'}
          </button>
          <button className={styles.actionBtn} onClick={handleShare}>
            {shared ? '✓ Copied!' : '↗ Share'}
          </button>
          <a
            href={book.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.buyBtn}
          >
            📖 Buy Book
          </a>
        </div>
        <button
          className={`${styles.markReadBtn} ${todayRead ? styles.alreadyRead : 'pulse-gold'}`}
          onClick={() => !todayRead && onMarkRead(book.id)}
          disabled={todayRead}
        >
          {todayRead ? '✓ Read today' : '✓ Mark as Read'}
        </button>
      </footer>
    </article>
  )
}
