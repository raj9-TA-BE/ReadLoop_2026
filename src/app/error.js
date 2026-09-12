'use client'
import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('[ReadLoop Error]', error)
  }, [error])

  return (
    <main style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 1.5rem', textAlign: 'center' }}>
      <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>⚠️</div>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.8rem' }}>Something went wrong</h2>
      <p style={{ color: 'var(--silver)', marginBottom: '2rem' }}>We've logged this and will fix it. Your streak is safe.</p>
      <button onClick={reset} className="btn btn-primary">Try again</button>
    </main>
  )
}
