# ReadLoop — Complete Deployment Guide
## Go Live in 20 Minutes

---

## STEP 1: Buy Your Domain (5 min)

**Recommended registrars:**
- Namecheap: namecheap.com — search "readloop.co.uk" (~£8/year)
- 123-reg: 123-reg.co.uk — UK-based support
- GoDaddy: godaddy.com — easy Vercel integration

**Buy BOTH:**
- readloop.co.uk (primary)
- readloop.com (protect the brand, redirect to .co.uk)

---

## STEP 2: Deploy to Vercel (5 min)

```bash
# 1. Push to GitHub (create free account at github.com)
git init
git add .
git commit -m "feat: ReadLoop MVP v1.0"
git remote add origin https://github.com/YOUR_USERNAME/readloop.git
git push -u origin main

# 2. Deploy
# Go to vercel.com → "New Project" → Import from GitHub
# Select your readloop repo → Click "Deploy"
# Your site is live at: yourname.vercel.app
```

**OR deploy instantly with CLI:**
```bash
npm i -g vercel
vercel
# Follow prompts — done in 60 seconds
```

---

## STEP 3: Connect Your Domain (5 min)

In Vercel dashboard:
1. Settings → Domains → Add "readloop.co.uk"
2. Vercel shows you 2 DNS records to add
3. Go to your registrar → DNS settings → Add those records
4. Wait 10-30 minutes → HTTPS live automatically

---

## STEP 4: Set Up Free Services

### Supabase (Database + Auth) — FREE
1. Go to supabase.com → New Project (name: "readloop")
2. Create tables:
```sql
-- subscribers table
CREATE TABLE subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  source TEXT DEFAULT 'website'
);

-- streaks table
CREATE TABLE user_streaks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  streak_count INTEGER DEFAULT 0,
  xp INTEGER DEFAULT 0,
  last_read DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- journal entries table
CREATE TABLE journal_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  book_id INTEGER,
  book_title TEXT,
  action TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```
3. Copy URL and anon key → add to Vercel environment variables

### SendGrid (Email) — FREE (100 emails/day)
1. sendgrid.com → Create account
2. Settings → API Keys → Create API Key (full access)
3. Verify your domain (readloop.co.uk) for deliverability
4. Add to Vercel environment variables

### Google Analytics 4 — FREE
1. analytics.google.com → New Property → "readloop.co.uk"
2. Copy Measurement ID (G-XXXXXXXXXX)
3. Add as NEXT_PUBLIC_GA_ID in Vercel env vars

### Stripe (Payments) — 1.5% + 20p per transaction
1. stripe.com → Create account
2. Products → Add Product "ReadLoop Premium" £6.99/month
3. Products → Add Product "ReadLoop Pro" £14.99/month
4. Copy price IDs and API keys → Vercel env vars

---

## STEP 5: Add Environment Variables in Vercel

In Vercel → Settings → Environment Variables, add:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
SENDGRID_API_KEY=SG.xxx
SENDGRID_FROM_EMAIL=hello@readloop.co.uk
SENDGRID_FROM_NAME=ReadLoop
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_PREMIUM_PRICE_ID=price_xxx
STRIPE_PRO_PRICE_ID=price_xxx
NEXT_PUBLIC_APP_URL=https://readloop.co.uk
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## STEP 6: Affiliate Revenue (Day 1 Revenue)

Sign up for these immediately:

| Programme | URL | Commission |
|-----------|-----|------------|
| Amazon Associates UK | affiliate-program.amazon.co.uk | 4% |
| Audible UK | audible.co.uk/af/AffiliateProgram | 8% per trial |
| Waterstones | awin.com (search Waterstones) | 5% |
| Book Depository | closed, use Amazon instead | — |

Replace placeholder URLs in src/data/books.js with your actual affiliate links.

---

## STEP 7: Social Media Accounts (Day 1)

Create accounts on all platforms with @readloopapp:
- Twitter/X: twitter.com (post daily book quote at 8am)
- Instagram: instagram.com (quote card graphics)
- TikTok: tiktok.com (60-second book breakdowns)
- LinkedIn: linkedin.com (post from Raj's personal profile)
- YouTube: youtube.com (weekly book breakdown videos)

Use your OG images (public/og/) as profile graphics.

---

## STEP 8: Submit to Google Search Console

1. search.google.com/search-console
2. Add property "readloop.co.uk"
3. Verify via HTML file or DNS TXT record
4. Submit sitemap: https://readloop.co.uk/sitemap.xml
5. Done — Google will crawl within 48 hours

---

## CHECKLIST: Pre-Launch

- [ ] Domain purchased and connected
- [ ] Site live on Vercel
- [ ] HTTPS confirmed (green padlock)
- [ ] Email capture working (test it yourself)
- [ ] Google Analytics firing
- [ ] Sitemap submitted to Search Console
- [ ] Amazon affiliate links replaced in books.js
- [ ] Social media accounts created
- [ ] First LinkedIn post scheduled

## CHECKLIST: Week 1 Marketing

- [ ] Post to Product Hunt (Tuesday morning 8am PST)
- [ ] Share in 5 LinkedIn groups for UK professionals
- [ ] DM 20 LinkedIn connections personally
- [ ] Post "Book Insight of the Day" on LinkedIn (every day)
- [ ] Submit to: HackerNews "Show HN", Reddit r/productivity, r/books, r/selfimprovement
- [ ] Email your personal contacts about the launch

---

Built with ❤️ by Raj Shah · readloop.co.uk
