'use client'
import { useState, useEffect, useCallback, useRef } from 'react'

// ─── SAFE STORAGE WRAPPER ─────────────────────────────────────────────────────
// FIX: localStorage throws in Safari private mode and some WebViews
const storage = {
  get(key) {
    try { return localStorage.getItem(key) } catch { return null }
  },
  set(key, value) {
    try { localStorage.setItem(key, value); return true } catch { return false }
  },
  remove(key) {
    try { localStorage.removeItem(key) } catch {}
  },
}

function safeParse(str, fallback) {
  if (!str) return fallback
  try { return JSON.parse(str) } catch { return fallback }
}

// ─── MILESTONES ───────────────────────────────────────────────────────────────
const MILESTONES = [
  { threshold: 3,   icon: '🔥', label: '3-Day Fire' },
  { threshold: 7,   icon: '⚡', label: 'Week Warrior' },
  { threshold: 30,  icon: '💎', label: '30-Day Diamond' },
  { threshold: 100, icon: '👑', label: 'Century Club' },
]

// ─── STREAK HOOK ──────────────────────────────────────────────────────────────
export function useStreak() {
  const [streak, setStreak]     = useState(0)
  const [xp, setXp]             = useState(0)
  const [todayRead, setTodayRead] = useState(false)
  const [readDays, setReadDays] = useState([])
  const [milestone, setMilestone] = useState(null)

  useEffect(() => {
    const data = safeParse(storage.get('readloop_streak'), null)
    if (!data) return

    const today    = new Date().toDateString()
    const lastRead = data.lastRead || ''
    const msGap    = new Date() - new Date(lastRead)
    const isConsec = lastRead && msGap < 2 * 24 * 60 * 60 * 1000

    setStreak(isConsec ? (data.streak || 0) : 0)
    setXp(data.xp || 0)
    setTodayRead(lastRead === today)
    setReadDays(Array.isArray(data.readDays) ? data.readDays : [])
  }, [])

  // FIX: Use functional updater + ref to avoid stale closures
  const xpRef      = useRef(xp)
  const readDaysRef = useRef(readDays)
  useEffect(() => { xpRef.current = xp }, [xp])
  useEffect(() => { readDaysRef.current = readDays }, [readDays])

  const markRead = useCallback((bookId) => {
    const today = new Date().toDateString()
    if (readDaysRef.current.includes(today)) return // already marked today

    setTodayRead(true)
    setStreak(prev => {
      const newStreak = prev + 1
      // FIX: weekly bonus uses ref not stale capture
      const weekBonus = newStreak % 7 === 0 ? 100 : 0
      const newXp     = xpRef.current + 60 + weekBonus
      const newDays   = [...readDaysRef.current, today]

      setXp(newXp)
      setReadDays(newDays)
      xpRef.current = newXp
      readDaysRef.current = newDays

      storage.set('readloop_streak', JSON.stringify({
        streak: newStreak,
        xp: newXp,
        lastRead: today,
        readDays: newDays,
        lastBookId: bookId,
      }))

      const hit = MILESTONES.find(m => m.threshold === newStreak)
      if (hit) setMilestone({ ...hit, streak: newStreak })

      return newStreak
    })
  }, [])

  const clearMilestone = useCallback(() => setMilestone(null), [])

  const getBadges = useCallback(() => {
    const all = [
      { id: 'first',   icon: '🌱', label: 'First Day',       threshold: 1,   color: 'var(--green)'  },
      { id: 'three',   icon: '🔥', label: '3-Day Fire',      threshold: 3,   color: 'var(--orange)' },
      { id: 'week',    icon: '⚡', label: 'Week Warrior',    threshold: 7,   color: 'var(--teal2)'  },
      { id: 'month',   icon: '💎', label: '30-Day Diamond',  threshold: 30,  color: 'var(--sky)'    },
      { id: 'century', icon: '👑', label: 'Century Club',    threshold: 100, color: 'var(--pink)'   },
    ]
    return all.map(b => ({ ...b, earned: streak >= b.threshold }))
  }, [streak])

  return { streak, xp, todayRead, readDays, markRead, getBadges, milestone, clearMilestone }
}

// ─── COMMUNITY TRACK HOOK ─────────────────────────────────────────────────────
export function useCommunityTrack() {
  const [track, setTrackState] = useState('none')

  useEffect(() => {
    const saved = storage.get('readloop_track')
    if (saved && ['none', 'hindu', 'jain'].includes(saved)) {
      setTrackState(saved)
    }
  }, [])

  const setTrack = useCallback((newTrack) => {
    if (!['none', 'hindu', 'jain'].includes(newTrack)) return
    setTrackState(newTrack)
    storage.set('readloop_track', newTrack)
  }, [])

  const trackMeta = {
    none:  { label: 'General',              icon: '📚', color: '#E0A83E', communityDay: null },
    hindu: { label: 'Hindu Dharma Track',   icon: '🕉️', color: '#FF6B35', communityDay: 'Sunday' },
    jain:  { label: 'Jain Wisdom Track',    icon: '☸️', color: '#7CB9E8', communityDay: 'Thursday' },
  }

  return { track, setTrack, trackMeta: trackMeta[track] || trackMeta.none, allMeta: trackMeta }
}

// ─── JOURNAL HOOK ─────────────────────────────────────────────────────────────
export function useJournal() {
  const [entries, setEntries] = useState([])
  const entriesRef = useRef(entries)
  useEffect(() => { entriesRef.current = entries }, [entries])

  useEffect(() => {
    const saved = safeParse(storage.get('readloop_journal'), null)
    if (saved && Array.isArray(saved)) {
      setEntries(saved)
    } else {
      const defaults = [
        { id: 1, date: 'Sep 9',  book: "Man's Search for Meaning", action: "Wrote down what gives my work meaning beyond salary.", xp: 20 },
        { id: 2, date: 'Sep 10', book: "The Power of Now",         action: "Put my phone in another room for 2 hours of deep work.", xp: 20 },
        { id: 3, date: 'Sep 11', book: "Atomic Habits",            action: "Moved my book to my pillow so I read before checking my phone.", xp: 20 },
      ]
      setEntries(defaults)
    }
  }, [])

  // FIX: Use ref to avoid stale closure over entries
  const addEntry = useCallback((book, action) => {
    if (!action || typeof action !== 'string' || !action.trim()) return null

    const entry = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      book: String(book).substring(0, 100),
      action: action.trim().substring(0, 300),
      xp: 20,
    }

    const newEntries = [entry, ...entriesRef.current]
    setEntries(newEntries)
    entriesRef.current = newEntries
    storage.set('readloop_journal', JSON.stringify(newEntries.slice(0, 365))) // cap at 365
    return entry
  }, [])

  const exportJournal = useCallback(() => {
    const csv = [
      'Date,Book,Action,XP',
      ...entriesRef.current.map(e =>
        `"${e.date}","${e.book.replace(/"/g, '""')}","${e.action.replace(/"/g, '""')}",${e.xp}`
      )
    ].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url; a.download = 'readloop-journal.csv'; a.click()
    URL.revokeObjectURL(url)
  }, [])

  return { entries, addEntry, exportJournal }
}

// ─── SUBSCRIBE HOOK ───────────────────────────────────────────────────────────
export function useSubscribe() {
  const [status, setStatus] = useState('idle') // idle|loading|success|error
  const [message, setMessage] = useState('')

  const subscribe = useCallback(async (email) => {
    if (status === 'loading') return
    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // FIX: Include CSRF-style token (simple timestamp check server-side)
        body: JSON.stringify({ email: String(email).trim(), ts: Date.now() }),
      })

      const data = safeParse(await res.text(), {})

      if (res.ok) {
        setStatus('success')
        setMessage(data.message || '')
      } else if (res.status === 429) {
        setStatus('error')
        setMessage('Too many attempts. Please try again in a minute.')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Network error. Please check your connection.')
    }
  }, [status])

  const reset = useCallback(() => { setStatus('idle'); setMessage('') }, [])

  return { status, message, subscribe, reset }
}

// ─── TOAST HOOK ───────────────────────────────────────────────────────────────
export function useToast() {
  const [toasts, setToasts] = useState([])

  const show = useCallback((msg, type = 'success') => {
    const id = `${Date.now()}-${Math.random()}`
    setToasts(prev => [...prev.slice(-4), { id, msg, type }]) // max 5 toasts
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500)
  }, [])

  return { toasts, show }
}
