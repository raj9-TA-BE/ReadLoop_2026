import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Blog — Reading Habits, Book Summaries & Self Development | ReadLoop',
  description: 'Articles on building reading habits, book summaries for busy professionals, and self-development strategies that actually work.',
}

const POSTS = [
  { slug:'how-to-build-reading-habit', title:'How to Build a Daily Reading Habit That Actually Sticks', date:'Sep 8, 2026', readTime:'6 min', category:'Habits', excerpt:"72% of people who buy self-development books never finish them. Here's the science-backed system that changes that." },
  { slug:'atomic-habits-summary', title:'Atomic Habits by James Clear — Full Summary & Key Lessons', date:'Sep 7, 2026', readTime:'8 min', category:'Book Summaries', excerpt:"James Clear's framework for building habits that compound. The complete ReadLoop breakdown with actionable lessons." },
  { slug:'best-books-busy-professionals', title:'10 Best Books for Busy UK Professionals in 2026', date:'Sep 6, 2026', readTime:'5 min', category:'Book Lists', excerpt:"Chosen for impact per minute of reading time. No 400-page commitments. Just the ideas that will change your thinking." },
  { slug:'reading-vs-book-summaries', title:'Reading vs Book Summaries: Which Actually Changes You?', date:'Sep 5, 2026', readTime:'7 min', category:'Habits', excerpt:"The surprising research on what drives behavioural change from books — and why it's not what most readers think." },
  { slug:'morning-reading-habit', title:'The 5-Minute Morning Reading Habit That Professionals Swear By', date:'Sep 4, 2026', readTime:'4 min', category:'Habits', excerpt:"BJ Fogg's research on habit stacking meets the ReadLoop method. How to make reading as automatic as brushing your teeth." },
]

export default function BlogPage() {
  return (
    <>
      <Nav />
      <main>
        <div style={{ background:'var(--navy)', padding:'4rem 1.5rem 3rem' }}>
          <div className="container">
            <h1 style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(1.8rem,4vw,2.8rem)', color:'var(--white)', marginBottom:'0.5rem' }}>Reading Insights</h1>
            <p style={{ color:'#7a9ab8', fontSize:'1rem' }}>Articles to help you read better, think clearer, and build lasting habits.</p>
          </div>
        </div>
        <div className="container" style={{ padding:'3rem 1.5rem' }}>
          <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem', maxWidth:'780px' }}>
            {POSTS.map(post => (
              <article key={post.slug} style={{ background:'var(--white)', borderRadius:'var(--radius-lg)', padding:'1.8rem', border:'1px solid var(--mist)', boxShadow:'var(--shadow-sm)' }}>
                <div style={{ display:'flex', gap:'0.6rem', marginBottom:'0.8rem', alignItems:'center' }}>
                  <span className="tag tag-teal">{post.category}</span>
                  <span style={{ fontSize:'0.75rem', color:'var(--silver)' }}>{post.date} · {post.readTime} read</span>
                </div>
                <h2 style={{ fontFamily:'var(--font-serif)', fontSize:'1.2rem', marginBottom:'0.5rem', color:'var(--navy)' }}>
                  <a href={`/blog/${post.slug}`} style={{ textDecoration:'none', color:'inherit' }}>{post.title}</a>
                </h2>
                <p style={{ color:'var(--silver)', fontSize:'0.92rem', lineHeight:1.65 }}>{post.excerpt}</p>
                <a href={`/blog/${post.slug}`} style={{ display:'inline-block', marginTop:'1rem', color:'var(--teal)', fontSize:'0.88rem', fontWeight:600, textDecoration:'none' }}>
                  Read more →
                </a>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
