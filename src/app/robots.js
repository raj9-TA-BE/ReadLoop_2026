export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/dashboard/'] },
    sitemap: 'https://readloop.co.uk/sitemap.xml',
  }
}
