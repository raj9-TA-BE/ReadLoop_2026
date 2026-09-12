'use client'
import { useState, useEffect } from 'react'
import styles from './Nav.module.css'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a href="/" className={styles.brand}>
          Read<span>Loop</span>
        </a>

        <div className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          <a href="/#today" onClick={() => setMenuOpen(false)}>Today</a>
          <a href="/books" onClick={() => setMenuOpen(false)}>Library</a>
          <a href="/pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
          <a href="/about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="/blog" onClick={() => setMenuOpen(false)}>Blog</a>
          <a href="/#signup" className={styles.cta} onClick={() => setMenuOpen(false)}>Start Free</a>
        </div>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
