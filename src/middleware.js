import { NextResponse } from 'next/server'

export function middleware(req) {
  const { pathname } = req.nextUrl

  // Protect dashboard routes (expand as Supabase auth is added)
  if (pathname.startsWith('/dashboard')) {
    const token = req.cookies.get('readloop_session')?.value
    if (!token) {
      return NextResponse.redirect(new URL('/?auth=required', req.url))
    }
  }

  // Block direct API access without correct origin header
  if (pathname.startsWith('/api/')) {
    const origin  = req.headers.get('origin') || ''
    const referer = req.headers.get('referer') || ''
    const appUrl  = process.env.NEXT_PUBLIC_APP_URL || 'https://readloop.co.uk'

    const isAllowed = origin.includes('readloop.co.uk')
      || origin.includes('localhost')
      || referer.includes('readloop.co.uk')
      || referer.includes('localhost')
      || origin === '' // server-to-server

    if (!isAllowed) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
}
