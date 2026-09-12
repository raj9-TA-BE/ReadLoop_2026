'use client'
import { useState, useCallback, useEffect } from 'react'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import BookCard from '@/components/features/BookCard'
import StreakTracker from '@/components/features/StreakTracker'
import JournalSection from '@/components/features/JournalSection'
import SignupSection from '@/components/features/SignupSection'
import CommunityTrack from '@/components/features/CommunityTrack'
import MilestoneModal from '@/components/features/MilestoneModal'
import { ToastContainer } from '@/components/ui/Toast'
import { useStreak, useCommunityTrack, useToast } from '@/lib/hooks'
import styles from './page.module.css'

// SSR-safe: import data functions only — no top-level execution
import { resolveBooks, getWeekSchedule, getAllBooks, getHinduBooks, getJainBooks } from '@/data/books'

// Safe fallback book for SSR
const FALLBACK_BOOK = {
  id: 1, emoji: '📚', track: 'general',
  title: 'Loading today\'s book…', author: '',
  category: 'General', tags: [],
  essence: 'Your daily book essence is loading. Start your reading streak today.',
  quote: 'The journey of a thousand miles begins with a single step.',
  lessons: ['Open ReadLoop every morning at the same time.','Read the essence before checking your phone.','Log one action you will take today.'],
  affiliateUrl: '#', readTime: 5, difficulty: 'Beginner',
}

export default function Home() {
  const { streak, xp, todayRead, readDays, markRead, getBadges, milestone, clearMilestone } = useStreak()
  const { track, setTrack, trackMeta, allMeta } = useCommunityTrack()
  const { toasts, show: showToast } = useToast()

  const [generalBooks, setGeneralBooks] = useState([FALLBACK_BOOK])
  const [displayBook, setDisplayBook]   = useState(FALLBACK_BOOK)
  const [browseIdx, setBrowseIdx]       = useState(0)
  const [weekSchedule, setSchedule]     = useState([])
  const [isCommunityDay, setIsCommDay]  = useState(false)
  const [mounted, setMounted]           = useState(false)

  // Resolve books client-side only (avoids SSR Date issues)
  useEffect(() => {
    setMounted(true)
    const gb = getAllBooks().filter(b => b.track === 'general')
    setGeneralBooks(gb)

    const resolved = resolveBooks(new Date(), track)
    const isComm   = resolved.isCommunityDay && track !== 'none' && resolved.community
    setIsCommDay(!!isComm)
    setDisplayBook(isComm ? resolved.community : (gb[0] || FALLBACK_BOOK))
    setSchedule(getWeekSchedule(new Date(), track))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Recompute on track change
  useEffect(() => {
    if (!mounted) return
    const gb = getAllBooks().filter(b => b.track === 'general')
    const resolved = resolveBooks(new Date(), track)
    const isComm   = resolved.isCommunityDay && track !== 'none' && resolved.community
    setIsCommDay(!!isComm)
    setBrowseIdx(0)
    setDisplayBook(isComm ? resolved.community : (gb[browseIdx] || gb[0] || FALLBACK_BOOK))
    setSchedule(getWeekSchedule(new Date(), track))
  }, [track, mounted]) // eslint-disable-line react-hooks/exhaustive-deps

  // Update display book when browsing
  useEffect(() => {
    if (!mounted || isCommunityDay) return
    const gb = getAllBooks().filter(b => b.track === 'general')
    if (gb.length > 0) setDisplayBook(gb[browseIdx % gb.length])
  }, [browseIdx, mounted, isCommunityDay])

  // Scroll-reveal: fade+lift elements marked `.reveal` into view once, as the user scrolls to them
  useEffect(() => {
    const targets = document.querySelectorAll('.reveal')
    if (!targets.length) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.15 })
    targets.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [mounted])

  const handleMarkRead = useCallback(() => {
    markRead(displayBook.id)
    showToast(`🔥 Streak extended to ${streak + 1} days! +60 XP`)
  }, [markRead, displayBook.id, showToast, streak])

  const handleTrackChange = useCallback((newTrack) => {
    const meta = allMeta[newTrack]
    showToast(`${meta?.icon || '📚'} Switched to ${meta?.label || 'General'} track`)
  }, [allMeta, showToast])

  const handlePrev = () => setBrowseIdx(i => (i - 1 + generalBooks.length) % generalBooks.length)
  const handleNext = () => setBrowseIdx(i => (i + 1) % generalBooks.length)

  const hinduBooks = getHinduBooks()
  const jainBooks  = getJainBooks()

  return (
    <>
      <Nav />
      <main>
        {/* HERO */}
        <section className={styles.hero}>
          <div className={`${styles.heroInner} fade-up`}>
            <span className={styles.eyebrow}>One book · One day · One habit</span>
            <h1 className={styles.heroTitle}>
              The reading habit<br/>that actually <em>sticks</em>
            </h1>
            <p className={styles.heroSub}>
              Get one distilled book essence daily. Track your streak. Log what you do differently.
              Become who you&apos;re reading to be.
            </p>
            <div className={styles.heroActions}>
              <a href="#signup" className="btn btn-primary btn-xl">Start Free — No Card Needed</a>
              <a href="#today" className="btn btn-ghost-light btn-xl">Read Today&apos;s Book</a>
            </div>
            <div className={styles.heroStats}>
              {[['365','books a year'],['5 min','per day'],['40K+','readers'],['92%','finish each essence']].map(([num,lbl])=>(
                <div key={lbl} className={styles.stat}>
                  <span className={styles.statNum}>{num}</span>
                  <span className={styles.statLabel}>{lbl}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMMUNITY BANNER */}
        {isCommunityDay && (
          <div className={styles.communityBanner} style={{ background: track === 'hindu' ? 'rgba(255,107,53,0.08)' : 'rgba(124,185,232,0.08)', borderColor: track === 'hindu' ? 'rgba(255,107,53,0.25)' : 'rgba(124,185,232,0.25)' }}>
            <span className={styles.communityBannerIcon}>{trackMeta?.icon}</span>
            <div>
              <strong>{trackMeta?.label} Day</strong>
              <span> — Today&apos;s essence is from your community track. General books return tomorrow.</span>
            </div>
          </div>
        )}

        {/* TODAY'S BOOK */}
        <section id="today" className={styles.section}>
          <div className="container">
            <div className={styles.sectionHead}>
              <div className="section-label">
                {isCommunityDay ? `${trackMeta?.icon} ${trackMeta?.label?.toUpperCase()} — ` : ''}
                TODAY&apos;S BOOK
              </div>
              {!isCommunityDay && generalBooks.length > 1 && (
                <div className={styles.bookNav}>
                  <button className={styles.navBtn} onClick={handlePrev} aria-label="Previous">‹</button>
                  <span className={styles.navCount}>{browseIdx + 1} / {generalBooks.length}</span>
                  <button className={styles.navBtn} onClick={handleNext} aria-label="Next">›</button>
                </div>
              )}
            </div>
            <BookCard key={displayBook.id} book={displayBook} onMarkRead={handleMarkRead} todayRead={todayRead} />
          </div>
        </section>

        {/* STREAK */}
        <section id="streak" className={styles.section}>
          <div className="container">
            <div className="section-label">YOUR READING STREAK</div>
            <StreakTracker streak={streak} xp={xp} todayRead={todayRead} readDays={readDays} onMarkRead={handleMarkRead} getBadges={getBadges} />
          </div>
        </section>

        {/* COMMUNITY TRACK SELECTOR */}
        <section className={styles.section} id="community">
          <div className="container">
            <div className="section-label">READING TRACK</div>
            <CommunityTrack onChange={handleTrackChange} />
            {weekSchedule.length > 0 && (
              <div className={styles.weekPreview}>
                <div className={styles.weekLabel}>This week&apos;s schedule</div>
                <div className={styles.weekGrid}>
                  {weekSchedule.map((day, i) => (
                    <div key={i} className={`${styles.weekDay} ${day.isCommunityDay ? styles.communityDay : ''}`}>
                      <div className={styles.wdName}>{day.dayName}</div>
                      <div className={styles.wdDate}>{day.dateStr}</div>
                      <div className={styles.wdEmoji}>{day.book?.emoji || '📚'}</div>
                      <div className={styles.wdTitle}>{(day.book?.title || '').substring(0,16)}{(day.book?.title || '').length > 16 ? '…' : ''}</div>
                      {day.isCommunityDay && <div className={styles.wdTrackBadge}>{track === 'hindu' ? '🕉️' : '☸️'}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* JOURNAL */}
        <section className={styles.section}>
          <div className="container">
            <div className="section-label">TRANSFORMATION JOURNAL</div>
            <JournalSection currentBook={displayBook} />
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className={styles.howSection}>
          <div className="container">
            <h2 className={styles.howTitle}>Built for habit, not just reading</h2>
            <p className={styles.howSub}>Every feature is engineered to pull you back tomorrow — not just impress you today.</p>
            <div className={styles.howGrid}>
              {[
                { icon:'⏰', t:'Daily trigger', d:'Set your reading moment. We deliver at exactly that time, every day.', color:'var(--gold)' },
                { icon:'🧠', t:'AI personalisation', d:'Every like, save, and skip teaches ReadLoop what you need next.', color:'var(--violet)' },
                { icon:'🔥', t:'Streak & XP system', d:'Earn XP, level up, unlock badges. Never break the chain.', color:'var(--orange)' },
                { icon:'📓', t:'Transformation journal', d:'Log one real action per book. 365 entries = your proof of change.', color:'var(--sky)' },
                { icon:'👥', t:'Reading pods', d:'5 readers. Shared goals. Accountability that actually works.', color:'var(--pink)' },
                { icon:'🕉️', t:'Community tracks', d:'Hindu Dharma (Sundays) and Jain Wisdom (Thursdays) woven into your daily habit.', color:'var(--teal)' },
              ].map((f, i) => (
                <div key={f.t} className={`${styles.featureCard} reveal`} style={{ animationDelay: `${i * 0.06}s`, '--feature-color': f.color }}>
                  <div className={styles.featureIcon}>{f.icon}</div>
                  <h3>{f.t}</h3>
                  <p>{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMMUNITY LIBRARY */}
        <section className={styles.communitySection}>
          <div className="container">
            <div className={styles.commGrid}>
              <div className={`${styles.commCard} reveal`} style={{ borderColor:'#FF6B35', background:'rgba(255,107,53,0.04)' }}>
                <div className={styles.commHeader}>
                  <span style={{ fontSize:'2rem' }}>🕉️</span>
                  <div>
                    <h3>Hindu Dharma Track</h3>
                    <p>Every Sunday · {hinduBooks.length} books rotating weekly</p>
                  </div>
                </div>
                <ul className={styles.commList}>
                  {hinduBooks.slice(0,4).map(b => <li key={b.id}><span>{b.emoji}</span><span>{b.title}</span></li>)}
                  {hinduBooks.length > 4 && <li style={{color:'var(--silver)'}}>+{hinduBooks.length - 4} more texts…</li>}
                </ul>
              </div>
              <div className={`${styles.commCard} reveal`} style={{ borderColor:'#7CB9E8', background:'rgba(124,185,232,0.04)', animationDelay: '0.08s' }}>
                <div className={styles.commHeader}>
                  <span style={{ fontSize:'2rem' }}>☸️</span>
                  <div>
                    <h3>Jain Wisdom Track</h3>
                    <p>Every Thursday · {jainBooks.length} books rotating weekly</p>
                  </div>
                </div>
                <ul className={styles.commList}>
                  {jainBooks.slice(0,4).map(b => <li key={b.id}><span>{b.emoji}</span><span>{b.title}</span></li>)}
                  {jainBooks.length > 4 && <li style={{color:'var(--silver)'}}>+{jainBooks.length - 4} more texts…</li>}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF */}
        <section className={styles.proofSection}>
          <div className="container">
            <h2 className={styles.proofTitle}>What readers say</h2>
            <div className={styles.proofGrid}>
              {[
                { q:"ReadLoop is the first reading app that actually changed my behaviour. 127-day streak.", n:"Sarah K.", r:"Product Manager · London" },
                { q:"The Hindu Dharma track on Sundays transformed my week. The Bhagavad Gita essence was extraordinary.", n:"Priya M.", r:"Software Engineer · Birmingham" },
                { q:"As a Jain, finding the Tattvartha Sutra on ReadLoop was wonderful. Thursday is my favourite reading day.", n:"Rohan S.", r:"Business Owner · Leicester" },
              ].map((t, i) => (
                <div key={t.n} className={`${styles.testimonial} reveal`} style={{ animationDelay: `${i * 0.06}s` }}>
                  <p className={styles.testimonialQ}>&ldquo;{t.q}&rdquo;</p>
                  <div><strong style={{fontSize:'0.9rem'}}>{t.n}</strong><br/><span style={{fontSize:'0.8rem',color:'var(--silver)'}}>{t.r}</span></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <SignupSection />
      </main>
      <Footer />
      <ToastContainer toasts={toasts} />
      <MilestoneModal milestone={milestone} onClose={clearMilestone} />
    </>
  )
}
