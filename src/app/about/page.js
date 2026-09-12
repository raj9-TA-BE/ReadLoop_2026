import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import SignupSection from '@/components/features/SignupSection'

export const metadata = {
  title: 'About ReadLoop',
  description: 'ReadLoop was built by Raj Shah, a Technical Architect based in Luton, UK. One book a day, 5 minutes, compounding for life.',
}

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        <div style={{ background:'var(--navy)', padding:'5rem 1.5rem', textAlign:'center' }}>
          <h1 style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(2rem,5vw,3rem)', color:'var(--white)', marginBottom:'1rem' }}>
            Why ReadLoop exists
          </h1>
          <p style={{ color:'#7a9ab8', fontSize:'1.05rem', maxWidth:'560px', margin:'0 auto' }}>
            Because 72% of self-development books are never finished — and the world's best ideas deserve better than a dusty shelf.
          </p>
        </div>
        <div style={{ maxWidth:'760px', margin:'0 auto', padding:'4rem 1.5rem' }}>
          <h2 style={{ fontFamily:'var(--font-serif)', fontSize:'1.6rem', marginBottom:'1rem' }}>The problem we solve</h2>
          <p style={{ lineHeight:1.8, color:'var(--slate)', marginBottom:'1.5rem', fontSize:'1.02rem' }}>
            There is no shortage of extraordinary books. There is a shortage of consistent habits. The average UK professional buys 12 self-development books a year and finishes fewer than 2. Not because they lack interest — because life gets in the way, chapters get long, and reading sessions get postponed until "the weekend" that never arrives with enough energy.
          </p>
          <p style={{ lineHeight:1.8, color:'var(--slate)', marginBottom:'1.5rem', fontSize:'1.02rem' }}>
            ReadLoop was built to solve the consistency problem, not the content problem. The content already exists. What was missing was a <strong>habit engine</strong> — something that delivers the best ideas from the world's best books in exactly the time it takes to drink your morning coffee, builds a streak you're emotionally invested in protecting, and tracks the real-world actions you take as a result.
          </p>
          <h2 style={{ fontFamily:'var(--font-serif)', fontSize:'1.6rem', marginBottom:'1rem', marginTop:'2.5rem' }}>The builder</h2>
          <p style={{ lineHeight:1.8, color:'var(--slate)', marginBottom:'1.5rem', fontSize:'1.02rem' }}>
            ReadLoop is built by <strong>Raj Shah</strong>, a Technical Architect based in Luton, UK, with 14+ years of experience designing enterprise cloud and data solutions for companies including Whitbread, ASDA, and ETEX across the UK and Europe. Raj holds Microsoft Azure Developer and AI Engineer certifications and has deep expertise in building scalable, user-first digital platforms.
          </p>
          <p style={{ lineHeight:1.8, color:'var(--slate)', marginBottom:'2.5rem', fontSize:'1.02rem' }}>
            ReadLoop is built on the same engineering principles used in enterprise systems: reliability, scalability, and a relentless focus on the end user's outcome — not just their experience.
          </p>
          <div style={{ background:'var(--navy)', borderRadius:'var(--radius-lg)', padding:'2rem', borderLeft:'4px solid var(--gold)' }}>
            <p style={{ color:'var(--white)', fontStyle:'italic', fontSize:'1.05rem', lineHeight:1.7, marginBottom:'1rem' }}>
              "I built ReadLoop because I wanted it to exist. The books that changed my thinking — Frankl, Dweck, Goggins, Newport — took me years to discover and weeks to finish. I wanted a way to give their best ideas to every professional who doesn't have time to read, in a format that builds a habit instead of just delivering content."
            </p>
            <p style={{ color:'var(--gold)', fontSize:'0.9rem', fontWeight:600 }}>— Raj Shah, Founder</p>
          </div>
        </div>
        <SignupSection />
      </main>
      <Footer />
    </>
  )
}
