import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import SignupSection from '@/components/features/SignupSection'

export const metadata = {
  title: 'Pricing — ReadLoop',
  description: 'ReadLoop pricing. Start free. Upgrade to Premium for £6.99/month or Pro for £14.99/month.',
}

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main>
        <div style={{ background:'var(--navy)', padding:'4rem 1.5rem 3rem', textAlign:'center' }}>
          <h1 style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(2rem,5vw,3rem)', color:'var(--white)', marginBottom:'0.7rem' }}>
            Simple, honest pricing
          </h1>
          <p style={{ color:'#7a9ab8', fontSize:'1.05rem' }}>Start free. Upgrade when you're ready.</p>
        </div>
        <div style={{ padding:'4rem 1.5rem', maxWidth:'1000px', margin:'0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'1.5rem' }}>
            {[
              { name:'Free', price:'£0', period:'/month', color:'var(--mist)',
                features:['1 book essence per day','7-day streak tracker','7-day journal history','1 reading pod','Basic book recommendations','Community access'],
                notIncluded:['Full archive access','AI personalisation','Author session replays','PDF export'],
                cta:'Get Started Free', link:'/#signup' },
              { name:'Premium', price:'£6.99', period:'/month', color:'var(--gold)',
                features:['Everything in Free','Full 365-day archive','AI book recommendations','Full journal history + analytics','3 reading pods','Author session replays','No ads ever','10% book discount'],
                notIncluded:['PDF journal export','Priority author Q&A','Team dashboard'],
                cta:'Start 7-Day Free Trial', link:'/#signup', featured: true },
              { name:'Pro', price:'£14.99', period:'/month', color:'var(--teal)',
                features:['Everything in Premium','Unlimited reading pods','PDF journal export','Priority author Q&A','ReadLoop Academy courses','20% book discount','Team dashboard','Corporate reporting'],
                notIncluded:[],
                cta:'Start 7-Day Free Trial', link:'/#signup' },
            ].map(plan => (
              <div key={plan.name} style={{
                background:'var(--white)', borderRadius:'var(--radius-lg)', padding:'2rem 1.8rem',
                border:`2px solid ${plan.featured ? 'var(--gold)' : 'var(--mist)'}`,
                boxShadow: plan.featured ? '0 4px 24px rgba(201,168,76,0.2)' : 'var(--shadow-sm)',
                position:'relative'
              }}>
                {plan.featured && (
                  <div style={{ position:'absolute', top:'-13px', left:'50%', transform:'translateX(-50%)', background:'var(--gold)', color:'var(--navy)', fontSize:'0.68rem', fontWeight:700, padding:'0.22rem 1rem', borderRadius:'20px', letterSpacing:'0.07em' }}>
                    MOST POPULAR
                  </div>
                )}
                <div style={{ fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.12em', color:'var(--silver)', textTransform:'uppercase', marginBottom:'0.4rem' }}>{plan.name}</div>
                <div style={{ fontFamily:'var(--font-serif)', fontSize:'2.5rem', fontWeight:700, color:'var(--navy)', lineHeight:1, marginBottom:'1.5rem' }}>
                  {plan.price}<span style={{ fontSize:'0.9rem', fontFamily:'var(--font-sans)', fontWeight:400, color:'var(--silver)' }}>{plan.period}</span>
                </div>
                <ul style={{ listStyle:'none', marginBottom:'2rem' }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display:'flex', gap:'0.5rem', padding:'0.35rem 0', fontSize:'0.88rem', borderBottom:'1px solid var(--smoke)', color:'var(--ink)' }}>
                      <span style={{ color:'var(--teal)', fontWeight:700 }}>✓</span>{f}
                    </li>
                  ))}
                  {plan.notIncluded.map(f => (
                    <li key={f} style={{ display:'flex', gap:'0.5rem', padding:'0.35rem 0', fontSize:'0.88rem', borderBottom:'1px solid var(--smoke)', color:'var(--silver)' }}>
                      <span style={{ color:'var(--mist)' }}>✕</span>{f}
                    </li>
                  ))}
                </ul>
                <a href={plan.link} className={`btn btn-lg ${plan.featured ? 'btn-primary' : 'btn-ghost'}`} style={{ width:'100%', textAlign:'center', display:'block' }}>
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
          <div style={{ marginTop:'3rem', textAlign:'center', padding:'2rem', background:'var(--smoke)', borderRadius:'var(--radius-lg)' }}>
            <h3 style={{ fontFamily:'var(--font-serif)', fontSize:'1.4rem', marginBottom:'0.5rem' }}>Need a corporate plan?</h3>
            <p style={{ color:'var(--silver)', marginBottom:'1.2rem', fontSize:'0.95rem' }}>
              Team plans start at £20/seat/month. Minimum 10 seats. Includes team dashboard, L&D reporting, and custom onboarding.
            </p>
            <a href="mailto:hello@readloop.co.uk" className="btn btn-teal">Contact us for corporate pricing</a>
          </div>
        </div>
        <SignupSection />
      </main>
      <Footer />
    </>
  )
}
