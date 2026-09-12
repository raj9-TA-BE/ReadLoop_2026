import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import { getAllBooks, CATEGORIES } from '@/data/books'
import styles from './books.module.css'

export const metadata = {
  title: 'Book Library — 365 Book Essences',
  description: 'Browse 365 book essences across self-development, productivity, mindfulness, leadership and more. Each essence is distilled into a 5-minute daily read.',
}

export default function BooksPage() {
  return (
    <>
      <Nav />
      <main>
        <div className={styles.hero}>
          <div className="container">
            <h1>The ReadLoop Library</h1>
            <p>365 book essences. 5 minutes each. One life-changing idea per day.</p>
          </div>
        </div>
        <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
          <div className={styles.grid}>
            {getAllBooks().map(book => (
              <article key={book.id} className={styles.bookItem}>
                <div className={styles.emoji}>{book.emoji}</div>
                <div className={styles.info}>
                  <h3>{book.title}</h3>
                  <p className={styles.author}>{book.author}</p>
                  <div style={{ display:'flex', gap:'0.4rem', flexWrap:'wrap', marginTop:'0.4rem' }}>
                    {book.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                  <p className={styles.preview}>{book.essence.substring(0, 120)}...</p>
                </div>
                <div className={styles.bookMeta}>
                  <div className={styles.dayLabel}>Day {book.day}</div>
                  <div className={styles.readTime}>⏱ {book.readTime} min</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
