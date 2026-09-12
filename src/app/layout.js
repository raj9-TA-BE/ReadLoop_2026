import './globals.css'

export const metadata = {
  metadataBase: new URL('https://readloop.co.uk'),
  title: { default: 'ReadLoop — One Book a Day. Build the Habit.', template: '%s | ReadLoop' },
  description: 'Get one distilled book essence daily. Track your streak. Build your reading habit and transform your thinking — one book at a time.',
  keywords: ['reading habit', 'book summaries', 'daily reading', 'book essences', 'reading tracker', 'self development', 'book app UK'],
  authors: [{ name: 'Raj Shah', url: 'https://readloop.co.uk' }],
  openGraph: {
    type: 'website', locale: 'en_GB', url: 'https://readloop.co.uk',
    title: 'ReadLoop — One Book a Day. Build the Habit.',
    description: 'Daily book essences + streak tracking + transformation journal.',
    siteName: 'ReadLoop',
    images: [{ url: '/og/og-default.png', width: 1200, height: 630, alt: 'ReadLoop' }],
  },
  twitter: {
    card: 'summary_large_image', title: 'ReadLoop — One Book a Day',
    description: 'Daily book essences. Streak tracking. Transformation journal.',
    images: ['/og/og-default.png'], creator: '@readloopapp',
  },
  robots: { index: true, follow: true },
  manifest: '/manifest.json',
}

const THEME_INIT_SCRIPT = `
(function () {
  try {
    var saved = localStorage.getItem('readloop_theme');
    if (saved === 'light' || saved === 'dark') {
      document.documentElement.setAttribute('data-theme', saved);
    }
  } catch (e) {}
})();
`

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lora:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
