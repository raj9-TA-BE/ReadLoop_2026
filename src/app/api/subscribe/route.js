import { NextResponse } from 'next/server'

// FIX: In-memory rate limiter (per IP, resets on redeploy)
// For production: replace with Upstash Redis rate limiting
const rateLimitMap = new Map()

function rateLimit(ip) {
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute window
  const maxRequests = 3       // max 3 signups per IP per minute

  const record = rateLimitMap.get(ip) || { count: 0, resetAt: now + windowMs }

  if (now > record.resetAt) {
    record.count = 0
    record.resetAt = now + windowMs
  }

  record.count++
  rateLimitMap.set(ip, record)

  return record.count <= maxRequests
}

// FIX: Proper email validation regex (not just @)
function isValidEmail(email) {
  if (typeof email !== 'string') return false
  if (email.length > 254) return false // RFC 5321
  const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email.trim())
}

// FIX: Sanitise input — strip HTML/script tags
function sanitiseEmail(email) {
  if (typeof email !== 'string') return ''
  return email.trim().toLowerCase().replace(/[<>'"]/g, '')
}

export async function POST(req) {
  try {
    // FIX: Rate limiting by IP
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || req.headers.get('x-real-ip')
      || 'unknown'

    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a minute.' },
        { status: 429, headers: { 'Retry-After': '60' } }
      )
    }

    // FIX: Validate Content-Type
    const contentType = req.headers.get('content-type') || ''
    if (!contentType.includes('application/json')) {
      return NextResponse.json({ error: 'Invalid content type' }, { status: 415 })
    }

    // FIX: Safe JSON parse
    let body
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    // FIX: Sanitise and validate
    const email = sanitiseEmail(body?.email || '')

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    // FIX: Block disposable email domains (basic list)
    const disposableDomains = ['mailinator.com', 'guerrillamail.com', 'tempmail.com', 'throwaway.email', 'yopmail.com']
    const domain = email.split('@')[1]
    if (disposableDomains.includes(domain)) {
      return NextResponse.json({ error: 'Please use a real email address.' }, { status: 400 })
    }

    // TODO: Uncomment after setting up SendGrid
    // const sgMail = require('@sendgrid/mail')
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    // await sgMail.send({ to: email, from: { email: process.env.SENDGRID_FROM_EMAIL, name: 'ReadLoop' }, ... })

    // TODO: Uncomment after setting up Supabase
    // const { error: dbError } = await supabase.from('subscribers').upsert([{ email, source: 'website', created_at: new Date() }])
    // if (dbError && dbError.code !== '23505') throw dbError // 23505 = unique violation (already subscribed)

    console.log(`[subscribe] New subscriber: ${email} from IP: ${ip}`)

    return NextResponse.json({ success: true }, { status: 200 })

  } catch (error) {
    // FIX: Never leak internal error details to client
    console.error('[subscribe] Error:', error)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}

// FIX: Handle OPTIONS preflight for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_URL || 'https://readloop.co.uk',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
