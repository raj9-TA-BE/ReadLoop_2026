import { NextResponse } from 'next/server'
import { getAllBooks, getTodaysBook, getBookById, getBooksByCategory, getBooksByTrack } from '@/data/books'

// FIX: Rate limit GET requests too
const apiLimitMap = new Map()
function apiRateLimit(ip) {
  const now = Date.now()
  const record = apiLimitMap.get(ip) || { count: 0, resetAt: now + 60000 }
  if (now > record.resetAt) { record.count = 0; record.resetAt = now + 60000 }
  record.count++
  apiLimitMap.set(ip, record)
  return record.count <= 60 // 60 requests/min
}

// FIX: Sanitise query params — prevent injection
function sanitiseParam(val) {
  if (typeof val !== 'string') return null
  return val.trim().replace(/[^a-zA-Z0-9\-_\s]/g, '').substring(0, 50)
}

export async function GET(req) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
    if (!apiRateLimit(ip)) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
    }

    const { searchParams } = new URL(req.url)
    const id       = sanitiseParam(searchParams.get('id'))
    const today    = searchParams.get('today')
    const category = sanitiseParam(searchParams.get('category'))
    const track    = sanitiseParam(searchParams.get('track'))

    // FIX: Validate id is a positive integer
    if (id !== null) {
      const numId = parseInt(id, 10)
      if (isNaN(numId) || numId < 1) {
        return NextResponse.json({ error: 'Invalid book ID' }, { status: 400 })
      }
      const book = getBookById(numId)
      if (!book) return NextResponse.json({ error: 'Book not found' }, { status: 404 })
      return NextResponse.json(book)
    }

    if (today) return NextResponse.json(getTodaysBook())

    // FIX: Community track filtering
    if (track) return NextResponse.json(getBooksByTrack(track))

    if (category) return NextResponse.json(getBooksByCategory(category))

    return NextResponse.json(getAllBooks())

  } catch (error) {
    console.error('[books API] Error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 })
}
