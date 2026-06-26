import { NextResponse } from 'next/server';
import { ingestKeywords } from '@/lib/db/queries/keywords';
import { createAutomationRun, completeAutomationRun } from '@/lib/db/queries/automation-runs';

/**
 * POST /api/seo/ingest-keywords
 *
 * Receives normalized keyword payloads from n8n workflow.
 * Inserts new keywords, skips duplicates.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body?.keywords || !Array.isArray(body.keywords)) {
    return NextResponse.json({ error: 'keywords array is required' }, { status: 400 });
  }

  // Track automation run
  const run = await createAutomationRun({
    run_type: 'keyword_ingest',
    trigger_source: body.source || 'n8n',
    input_payload: { count: body.keywords.length },
  }).catch(() => null);

  try {
    const result = await ingestKeywords({
      keywords: body.keywords.map((k: { keyword: string; normalized_keyword?: string; search_intent?: string; priority_score?: number; source?: string; cluster_id?: string }) => ({
        keyword: k.keyword,
        normalized_keyword: k.normalized_keyword || k.keyword.toLowerCase().trim(),
        search_intent: k.search_intent,
        priority_score: k.priority_score,
        source: k.source,
        cluster_id: k.cluster_id,
      })),
    });

    if (run) {
      await completeAutomationRun(run.id, { ...result, total_input: body.keywords.length });
    }

    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    if (run) {
      await completeAutomationRun(run.id, {}, 'failed', String(error));
    }
    return NextResponse.json({ error: 'Failed to ingest keywords', details: String(error) }, { status: 500 });
  }
}
