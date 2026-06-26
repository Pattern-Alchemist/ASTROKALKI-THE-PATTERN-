# AstroKalki — Backlink Strategy & SEO Automation Guide

## Table of Contents
1. [SEO Self-Looping Automation](#seo-self-looping-automation)
2. [Backlink Strategy (Honest)](#backlink-strategy-honest)
3. [Pattern Library Content Plan](#pattern-library-content-plan)
4. [Deployment Instructions](#deployment-instructions)

---

## SEO Self-Looping Automation

### What's Built

Two API endpoints + a cron configuration:

#### 1. `/api/seo-audit` — SEO Health Check
- **Method:** GET
- **Returns:** JSON report with score (0-100), pass/warn/fail counts, specific issues, and recommended next actions
- **Checks:**
  - Sitemap accessibility
  - Robots.txt accessibility
  - Meta tag presence (title, description, OG, Twitter, canonical)
  - JSON-LD structured data block count
  - Target keyword presence in homepage HTML
  - Page size (performance hint)

**Example response:**
```json
{
  "timestamp": "2026-06-26T12:00:00.000Z",
  "score": 85,
  "summary": { "total": 7, "passed": 6, "warned": 1, "failed": 0 },
  "results": [...],
  "nextActions": ["Ensure target keywords appear in homepage content"]
}
```

#### 2. `/api/sitemap-refresh` — Sitemap Regenerator
- **Method:** GET (returns status) or POST (returns XML)
- **Returns:** Sitemap XML with all sections + Pattern Library articles
- **Auto-includes:** 8 homepage sections + 15 Pattern Library article URLs

#### 3. `vercel.json` — Cron Job Configuration
```json
{
  "crons": [
    { "path": "/api/seo-audit", "schedule": "0 9 * * 1" },     // Every Monday 9 AM
    { "path": "/api/sitemap-refresh", "schedule": "0 2 * * *" } // Daily 2 AM
  ]
}
```

### How to Activate

1. **Deploy to Vercel** — the cron jobs are automatically detected from `vercel.json`
2. **Verify the cron is running** — check Vercel dashboard → Functions → Cron
3. **Monitor results** — the `/api/seo-audit` endpoint returns JSON you can:
   - View in browser at `https://astrokalki.com/api/seo-audit`
   - Pipe to a monitoring tool (Datadog, LogTail)
   - Connect to a Slack webhook for weekly alerts

### What This Does NOT Do (Honestly)

- ❌ **Cannot submit to Google Search Console automatically** — GSC API requires OAuth credentials and a service account. You need to:
  1. Verify domain ownership in GSC (one-time, via DNS TXT record)
  2. Submit sitemap URL manually once: `https://astrokalki.com/sitemap.xml`
  3. GSC will auto-crawl based on the sitemap + crawl budget

- ❌ **Cannot ping Google for re-indexing on every change** — Google's Indexing API only works for JobPosting and BroadcastEvent content types. For regular content, Google crawls on its own schedule based on your sitemap + crawl budget.

- ❌ **Cannot run in a static deployment** — the cron jobs require Vercel (or similar serverless platform). If deploying to a static host (Netlify static, GitHub Pages), the endpoints won't run.

---

## Backlink Strategy (Honest)

### The Truth About "Automatic Backlinks"

**Automatic backlinks do not exist.** Any service promising "1000 backlinks automatically" is selling you spam that will get your site penalized by Google. Backlinks must be earned through:

1. Creating linkable content (original research, definitive guides, free tools)
2. Manual outreach to relevant websites
3. Digital PR (expert quotes, guest articles, podcast appearances)
4. Building relationships with publishers in your niche

### What's Built (The Real Strategy)

#### 1. Linkable Asset: Pattern Library (15 articles)
The Pattern Library is the primary linkable asset. Each article is:
- 800-1200 words of original, substantive content
- Structured for featured snippets (H2/H3 questions, concise definitions)
- Interlinked to the pillar pages (Pattern Intelligence System™, Pattern Biography, Pattern DNA)
- Targeted at high-intent long-tail queries ("why do I keep rescuing people", "fear of abandonment in relationships")

**Why this attracts backlinks:** Therapists, coaches, and relationship bloggers will link to these articles as references. The content is definitive enough to cite.

#### 2. Shareable Asset: Pattern DNA Snippet
The shareable Pattern DNA (in the member dashboard, forthcoming) is designed for social sharing. Each share creates a branded touchpoint that can drive organic traffic and indirect backlinks.

#### 3. Embeddable Widget (To Build Next)
Create a free "Pattern of the Day" widget that other websites (therapists, coaches, wellness blogs) can embed on their sites. The embed includes a backlink to astrokalki.com. This is the closest thing to "automatic backlinks" — each embed is a permanent backlink from a relevant site.

### Manual Backlink Outreach Plan (90 Days)

#### Month 1: Foundation
- [ ] Submit to Google Search Console + Bing Webmaster Tools
- [ ] Submit to industry directories:
  - Psychology Today therapist directory (if applicable)
  - India-based wellness directories
  - Alternative healing directories
- [ ] Create AstroKalki profiles on:
  - LinkedIn (company page)
  - Crunchbase (if applicable)
  - Wikipedia (when notability criteria met — not yet)
- [ ] Claim Google Knowledge Panel (via Google Business Profile)

#### Month 2: Content Promotion
- [ ] Pitch 5 guest articles to psychology/relationship blogs:
  - "The Pattern Intelligence System: A New Framework for Self-Awareness"
  - "Why You Keep Repeating the Same Relationship Pattern (and How to Break It)"
  - "The Rescuer Pattern: Why You Attract People Who Need Saving"
- [ ] Pitch 3 podcast appearances:
  - Relationship/psychology podcasts
  - India-based wellness podcasts
  - YouTube interview channels in the niche
- [ ] HARO (Help A Reporter Out) — respond to queries about:
  - Relationship patterns
  - Self-sabotage
  - Psychological self-awareness

#### Month 3: Digital PR
- [ ] Publish original research: "The Pattern Report 2026" — survey data on the most common recurring patterns (anonymized, from your tool users)
- [ ] Pitch the report to journalists covering psychology/relationships
- [ ] Create a "Pattern Recognition Day" (made-up holiday) and pitch it
- [ ] Reach out to 10 YouTube channels in the niche for collaboration/cross-promotion

### Backlink Tracking

Track backlinks using:
- **Free:** Google Search Console (Links report)
- **Free:** Ahrefs Free Backlink Checker (limited)
- **Paid:** Ahrefs, Semrush, or Moz (full backlink monitoring)

Target: 50 referring domains by Day 90 (realistic for a new site with original content).

---

## Pattern Library Content Plan

### Current State (15 articles)
- The Rescuer Pattern
- The Avoidance Loop
- The Performer Trap
- The Controlling Pattern
- The Numbing Strategy
- The Overworking Pattern
- The People-Pleasing Loop
- The Overthinking Loop
- The Withdrawal Pattern
- The Inner Critic
- The Inner Child
- The Fear of Abandonment
- The Fear of Being Seen
- The Imposter Pattern
- The Perfectionism Loop

### Next 15 Articles (Month 2)
- The Comparison Pattern
- The People-Pleasing Parent (generational)
- The Anxious Achiever
- The Avoidant Attacher
- The Anxious Attacher
- The Disorganized Attacher
- The Conflict Avoider
- The Crisis Creator
- The Martyr Pattern
- The Ghost Pattern (disappearing)
- The Love-Bombing Loop
- The Trauma Bond
- The Narcissistic Parent Wound
- The Good Girl/Good Boy Syndrome
- The Burnout Pattern

### Next 20 Articles (Month 3)
- The Comparison Trap in the Age of Social Media
- The Sunday Night Dread Pattern
- The Money Avoidance Pattern
- The Money Anxiety Pattern
- The Career Self-Sabotage Loop
- The Friendship Withdrawal Pattern
- The People-Pleasing at Work Pattern
- The Imposter at 30/40/50
- The Midlife Pattern Shift
- The Grief Avoidance Loop
- The Anger Suppression Pattern
- The Emotional Exhaustion Cycle
- The Decision Paralysis Pattern
- The Perfectionist Parent
- The Overfunctioning Partner
- The Underfunctioning Partner
- The Fixer Pattern
- The Peacekeeper Pattern
- The Loner Pattern
- The Chameleon Pattern

### Article Template (for future articles)
Each article follows this structure (already implemented in the 15 initial articles):
1. **What is [Pattern Name]?** — definition + reframing
2. **How the Pattern Forms** — childhood origin
3. **How the Pattern Runs** — the behavioral loop
4. **The Hidden Payoff** — why it persists
5. **Breaking the Pattern** — the practice

---

## Deployment Instructions

### 1. Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

### 2. Verify Cron Jobs
- Go to Vercel Dashboard → your project → Functions → Cron Jobs
- Confirm both crons are listed:
  - `/api/seo-audit` — weekly Monday 9 AM
  - `/api/sitemap-refresh` — daily 2 AM

### 3. Set Up Google Search Console
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property: `https://astrokalki.com`
3. Verify via DNS TXT record (your domain registrar)
4. Submit sitemap: `https://astrokalki.com/sitemap.xml`
5. Check coverage after 24-48 hours

### 4. Set Up Bing Webmaster Tools
1. Go to [bing.com/webmasters](https://www.bing.com/webmasters)
2. Add site + verify
3. Submit sitemap

### 5. Monitor
- Weekly: Check `/api/seo-audit` JSON for health score
- Weekly: Check GSC for new indexed pages + impressions
- Monthly: Check GSC Links report for new backlinks
- Monthly: Review which Pattern Library articles are getting traffic, double down on those topics

---

## Technical Notes

### Why Vercel Cron (not a custom script)
Vercel Cron is:
- Free on the Hobby tier (up to 2 cron jobs)
- Runs automatically without server management
- Integrated with Next.js API routes
- Has built-in retry logic

### Why Not a Self-Looping Script Inside the App
A "self-looping" script that runs inside the browser cannot:
- Run when no one is visiting the site
- Access server-side resources (filesystem, external APIs)
- Persist between page reloads

Server-side cron is the only way to run periodic SEO tasks reliably.

### Firebase Activation (When Ready)
The Firebase config is ready in `/src/lib/firebase.ts`. To activate:
```bash
npm install firebase
```
Then uncomment the initialization code in that file. Firebase can then be used for:
- Storing Pattern Library article views (analytics)
- Storing email signups (instead of just localStorage)
- User authentication for the future member dashboard
- Pattern Log data (synced across devices)
