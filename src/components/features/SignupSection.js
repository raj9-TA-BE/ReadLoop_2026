'use client'
import { useState } from 'react'
import { useSubscribe } from '@/lib/hooks'
import styles from './SignupSection.module.css'

export default function SignupSection() {
  const [email, setEmail] = useState('')
  const { status, subscribe } = useSubscribe()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) subscribe(email)
  }

  return (
    <section className={styles.section} id="signup">
      <div className={styles.inner}>
        <div className={styles.text}>
          <h2>Start your streak today.</h2>
          <p>Join 40,000+ readers who read smarter, not longer. One book essence every morning — free, forever.</p>
        </div>

        {status === 'success' ? (
          <div className={styles.success}>
            <div className={styles.successIcon}>🎉</div>
            <h3>You're in!</h3>
            <p>Your first book essence arrives tomorrow at 8am. Check your inbox to confirm.</p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="email" value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com" required
              className={styles.input}
              disabled={status === 'loading'}
            />
            <button type="submit" className={styles.button} disabled={status === 'loading'}>
              {status === 'loading' ? 'Sending...' : 'Get Daily Book →'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className={styles.error}>Something went wrong. Please try again.</p>
        )}

        <div className={styles.trust}>
          <span>🔒 No spam</span>
          <span>✓ GDPR compliant</span>
          <span>✓ Unsubscribe any time</span>
          <span>✓ Free forever</span>
        </div>

        <div className={styles.socialProof}>
          <div className={styles.avatars}>
            {['👨‍💼','👩‍💻','👨‍🎓','👩‍🔬','👨‍🏫'].map((a, i) => (
              <span key={i} className={styles.avatar}>{a}</span>
            ))}
          </div>
          <p>"ReadLoop is the first reading app that actually changed my behaviour, not just my bookshelf." — Sarah K., Product Manager</p>
        </div>
      </div>
    </section>
  )
}
