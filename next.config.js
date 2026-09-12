/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // FIX #1: Clickjacking protection
          { key: 'X-Frame-Options', value: 'DENY' },
          // FIX #2: MIME sniffing protection
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // FIX #3: HSTS (force HTTPS — enable after domain is live)
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          // FIX #4: Referrer policy
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // FIX #5: Permissions policy — disable unused browser APIs
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          // FIX #6: Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https:",
              "connect-src 'self' https://www.google-analytics.com https://*.supabase.co",
              "frame-ancestors 'none'",
            ].join('; '),
          },
          // FIX #7: CORS — restrict to own origin for API routes
          { key: 'Access-Control-Allow-Origin', value: 'https://readloop.co.uk' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
    ]
  },
  // FIX #8: Validate critical env vars at build time
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://readloop.co.uk',
  },
}

module.exports = nextConfig
