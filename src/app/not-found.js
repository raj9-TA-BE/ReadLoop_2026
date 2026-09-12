import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'

export default function NotFound() {
  return (
    <>
      <Nav />
      <main style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>📚</div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem,4vw,2.6rem)', color: 'var(--navy)', marginBottom: '0.8rem' }}>
          Page not found
        </h1>
        <p style={{ color: 'var(--silver)', fontSize: '1rem', maxWidth: '420px', marginBottom: '2rem', lineHeight: '1.65' }}>
          Looks like this page took a different path. The good news — today's book essence is waiting for you.
        </p>
        <a href="/" className="btn btn-primary btn-lg">Back to today's book →</a>
      </main>
      <Footer />
    </>
  )
}
