'use client'
import { useState } from 'react'
import { useJournal } from '@/lib/hooks'
import styles from './JournalSection.module.css'

export default function JournalSection({ currentBook }) {
  const { entries, addEntry } = useJournal()
  const [action, setAction] = useState('')
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    if (!action.trim()) return
    addEntry(currentBook?.title || "Today's book", action.trim())
    setAction('')
    setAdded(true)
    setTimeout(() => setAdded(false), 3000)
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <h3>Transformation Journal</h3>
          <p>One action from each book. Your living proof of change.</p>
        </div>
        <div className={styles.count}>{entries.length} entries</div>
      </div>

      <div className={styles.entries}>
        {entries.slice(0, 5).map(e => (
          <div key={e.id} className={styles.entry}>
            <div className={styles.entryDate}>{e.date}</div>
            <div>
              <div className={styles.entryBook}>{e.book}</div>
              <div className={styles.entryAction}>{e.action}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.add}>
        <p>What's one thing you'll do differently from today's book?</p>
        <div className={styles.inputRow}>
          <input
            type="text" value={action}
            onChange={e => setAction(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            placeholder="e.g. I will set my reading trigger for 7am with coffee..."
            className={styles.input}
            maxLength={200}
          />
          <button className={styles.submit} onClick={handleAdd} disabled={!action.trim()}>
            {added ? '✓ Logged!' : 'Log it +20 XP'}
          </button>
        </div>
        {added && <p className={styles.confirmation}>📓 Entry saved — keep building your transformation.</p>}
      </div>
    </div>
  )
}
