# SEO Content OS — Updated v0.2

An automated content operating system for AstroKalki: n8n workflows + Next.js API routes + Supabase backend. Handles the full content lifecycle: keyword intake → brief building → draft generation → QA + internal links → publish + revalidation.

## What's New in v0.2

### 1. Importable n8n Workflows (2 new)
- `n8n/importable/qa-internal-links.json` — QA scoring + internal link suggestions workflow
- `n8n/importable/publish-revalidate.json` — Publish + Next.js revalidation + Google Indexing API ping

### 2. Supabase Query/Mutation Implementations (all placeholders replaced)
- `src/lib/db/queries/clusters.ts` — CRUD for content clusters
- `src/lib/db/queries/keywords.ts` — Ingest + dedupe + status updates
- `src/lib/db/queries/briefs.ts` — Create + fetch SEO briefs
- `src/lib/db/queries/content-items.ts` — Full CRUD + QA scoring + publish + refresh
- `src/lib/db/queries/internal-links.ts` — Create links + bulk suggestions with slug-to-ID resolution
- `src/lib/db/queries/publish-jobs.ts` — Track publish jobs + completion
- `src/lib/db/queries/automation-runs.ts` — Log every n8n workflow run for audit
- `src/lib/db/queries/templates.ts` — Fetch content templates

### 3. Working Supabase Clients
- `src/lib/supabase/client.ts` — Browser client (@supabase/ssr)
- `src/lib/supabase/server.ts` — Server client (cookie-based) + service-role client (bypasses RLS)

### 4. New API Routes (3 new)
- `GET /api/seo/content-context` — Returns content items by status (for n8n QA workflow)
- `GET /api/seo/content/[contentItemId]` — Full content item by ID
- `POST /api/seo/qa-score/[contentItemId]` — Update QA score + create internal links
- `GET/POST /api/seo/automation-run` — Log/complete automation runs

### 5. Updated API Routes (all 6 originals now use real queries)
- `POST /api/seo/ingest-keywords` — Real keyword ingestion with dedup
- `POST /api/seo/build-brief/[clusterId]` — Real brief creation + cluster status update
- `POST /api/seo/generate-draft/[clusterId]` — Real content_item creation
- `POST /api/seo/publish/[contentItemId]` — Real publish + publish_job record
- `POST /api/seo/refresh/[contentItemId]` — Real refresh timestamp
- `POST /api/seo/revalidate` — Real Next.js revalidatePath + revalidateTag

## Setup Instructions

### 1. Environment Variables
Create `.env.local` in `nextjs-starter/`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
API_BASE_URL=https://your-deployed-url.com
LLM_MODEL=gpt-4o-mini
GSHEET_ID=your_google_sheet_id
```

### 2. Supabase Setup
```bash
# Run migrations in order
supabase db push

# Or manually run the SQL files in supabase/migrations/
# 001_initial_extensions.sql → 002_content_os_tables.sql → 003_indexes.sql
# → 004_updated_at_triggers.sql → 005_seed_templates.sql

# Generate TypeScript types
supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.ts
```

### 3. Install Dependencies
```bash
cd nextjs-starter
npm install
```

### 4. Deploy Next.js
```bash
npm run build
# Deploy to Vercel (recommended for revalidatePath support)
vercel --prod
```

### 5. Import n8n Workflows
1. Open n8n (self-hosted or n8n.cloud)
2. Import each JSON file from `n8n/importable/`:
   - `qa-internal-links.json`
   - `publish-revalidate.json`
3. Configure credentials:
   - Google Sheets (for keyword/content sheet reads)
   - OpenAI (for QA scoring + link suggestions)
   - HTTP Request (uses `$env.API_BASE_URL`)
4. Set n8n environment variables:
   - `API_BASE_URL` → your deployed Next.js URL
   - `LLM_MODEL` → `gpt-4o-mini` (or your preferred model)
5. Test each workflow node by node before activating

## The Full Content Loop

```
1. Keyword Intake (n8n workflow #1 — existing)
   Google Sheets → Classify Intent → POST /api/seo/ingest-keywords

2. Brief Building (n8n workflow #2 — existing)
   Content Queue → SERP Context → LLM Brief → POST /api/seo/build-brief/[clusterId]

3. Draft Generation (n8n workflow #3 — existing)
   Brief → LLM Draft → POST /api/seo/generate-draft/[clusterId]

4. QA + Internal Links (n8n workflow #4 — NEW)
   Schedule → Fetch Drafted Content → LLM QA Score → LLM Internal Links
   → POST /api/seo/qa-score/[contentItemId]
   → Auto-approve if score >= 75, else flag for review

5. Publish + Revalidate (n8n workflow #5 — NEW)
   Webhook Trigger → Fetch Content → Verify Approved + QA >= 75
   → POST /api/seo/publish/[contentItemId]
   → POST /api/seo/revalidate (Next.js on-demand revalidation)
   → Ping Google Indexing API
   → Record automation_run
```

## File Structure
```
seo-content-os/
├── n8n/
│   ├── importable/
│   │   ├── qa-internal-links.json      ← NEW
│   │   └── publish-revalidate.json     ← NEW
│   └── workflows.json                  ← Original 3 workflows (skeleton)
├── supabase/
│   └── migrations/
│       ├── 001_initial_extensions.sql
│       ├── 002_content_os_tables.sql
│       ├── 003_indexes.sql
│       ├── 004_updated_at_triggers.sql
│       └── 005_seed_templates.sql
├── nextjs-starter/
│   ├── package.json                    ← NEW (with @supabase/ssr)
│   ├── src/
│   │   ├── lib/
│   │   │   ├── supabase/
│   │   │   │   ├── client.ts           ← UPDATED (working browser client)
│   │   │   │   └── server.ts           ← UPDATED (working server + service clients)
│   │   │   ├── db/
│   │   │   │   └── queries/
│   │   │   │       ├── clusters.ts     ← NEW
│   │   │   │       ├── keywords.ts     ← NEW
│   │   │   │       ├── briefs.ts       ← NEW
│   │   │   │       ├── content-items.ts← UPDATED (real queries)
│   │   │   │       ├── internal-links.ts← NEW
│   │   │   │       ├── publish-jobs.ts ← NEW
│   │   │   │       ├── automation-runs.ts← NEW
│   │   │   │       └── templates.ts    ← NEW
│   │   │   └── seo/ (existing helpers)
│   │   ├── app/
│   │   │   ├── api/seo/
│   │   │   │   ├── ingest-keywords/route.ts       ← UPDATED
│   │   │   │   ├── build-brief/[clusterId]/route.ts← UPDATED
│   │   │   │   ├── generate-draft/[clusterId]/route.ts← UPDATED
│   │   │   │   ├── publish/[contentItemId]/route.ts← UPDATED
│   │   │   │   ├── refresh/[contentItemId]/route.ts← UPDATED
│   │   │   │   ├── revalidate/route.ts             ← UPDATED
│   │   │   │   ├── content-context/route.ts        ← NEW
│   │   │   │   ├── content/[contentItemId]/route.ts← NEW
│   │   │   │   ├── qa-score/[contentItemId]/route.ts← NEW
│   │   │   │   └── automation-run/route.ts         ← NEW
│   │   │   └── (marketing + admin pages — existing)
│   │   └── types/ (existing)
└── README.md                           ← THIS FILE
```

## What's Next (Phase 3)

The current system covers the full content loop. Next extensions:
- **Content refresh scheduler** — detect decaying content (traffic drop in GSC) and trigger re-optimization
- **Competitor monitoring** — track SERP changes for target keywords
- **Backlink monitoring** — integrate with Ahrefs/Semrush API to track new backlinks
- **Performance dashboard** — admin view showing content pipeline health + automation run history
- **Multi-model LLM** — allow different models for different tasks (GPT-4 for drafts, GPT-4o-mini for QA)
