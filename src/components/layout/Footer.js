import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logo}>ReadLoop</div>
          <p className={styles.tagline}>One book a day. Compounding for life.</p>
          <div className={styles.social}>
            <a href="https://twitter.com/readloopapp" target="_blank" rel="noopener noreferrer" aria-label="Twitter">𝕏</a>
            <a href="https://linkedin.com/company/readloop" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>
            <a href="https://instagram.com/readloopapp" target="_blank" rel="noopener noreferrer" aria-label="Instagram">📸</a>
          </div>
        </div>
        <div className={styles.cols}>
          <div>
            <h4>Platform</h4>
            <a href="/books">Book Library</a>
            <a href="/dashboard">Dashboard</a>
            <a href="/pricing">Pricing</a>
            <a href="/#signup">Start Free</a>
          </div>
          <div>
            <h4>Content</h4>
            <a href="/blog">Blog</a>
            <a href="/blog/reading-habit">Reading Habits</a>
            <a href="/blog/book-summaries">Book Summaries</a>
            <a href="/about">About Us</a>
          </div>
          <div>
            <h4>Company</h4>
            <a href="/about">About</a>
            <a href="mailto:hello@readloop.co.uk">Contact</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>© {year} ReadLoop · Built by Raj Shah · Luton, UK</span>
        <span>readloop.co.uk · Empowering 40,000+ readers</span>
      </div>
    </footer>
  )
}
