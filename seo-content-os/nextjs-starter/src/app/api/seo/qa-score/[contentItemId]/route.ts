import { NextResponse } from 'next/server';
import { updateQaScore } from '@/lib/db/queries/content-items';
import { createInternalLinks } from '@/lib/db/queries/internal-links';
import { createAutomationRun, completeAutomationRun } from '@/lib/db/queries/automation-runs';

/**
 * POST /api/seo/qa-score/[contentItemId]
 *
 * Receives QA score + internal link suggestions from n8n QA workflow.
 * Updates content_item.qa_score + creates internal_links records.
 *
 * Body:
 *   {
 *     "qa_score": 85,
 *     "qa_issues": ["Meta description too short"],
 *     "qa_suggestions": ["Add FAQ section"],
 *     "internal_links": [
 *       { "target_slug": "the-rescuer-pattern", "anchor_text": "rescuer pattern", "link_reason": "..." }
 *     ]
 *   }
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ contentItemId: string }> }
) {
  const { contentItemId } = await params;
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: 'Request body is required' }, { status: 400 });
  }

  const run = await createAutomationRun({
    run_type: 'qa_scoring',
    trigger_source: 'n8n',
    input_payload: { content_item_id: contentItemId, qa_score: body.qa_score },
  }).catch(() => null);

  try {
    // Update QA score (auto-approves if >= 75)
    const updated = await updateQaScore(
      contentItemId,
      body.qa_score,
      body.qa_issues,
      body.qa_suggestions
    );

    // Create internal links from suggestions
    let linksResult = { created: 0, not_found: [] as string[] };
    if (body.internal_links && Array.isArray(body.internal_links)) {
      const { createLinksFromSuggestions } = await import('@/lib/db/queries/internal-links');
      linksResult = await createLinksFromSuggestions(contentItemId, body.internal_links);
    }

    if (run) {
      await completeAutomationRun(run.id, {
        content_item_id: contentItemId,
        qa_score: body.qa_score,
        new_status: updated.status,
        internal_links_created: linksResult.created,
      });
    }

    return NextResponse.json({
      ok: true,
      content_item_id: contentItemId,
      qa_score: body.qa_score,
      new_status: updated.status,
      internal_links_created: linksResult.created,
      internal_links_not_found: linksResult.notFound,
    });
  } catch (error) {
    if (run) await completeAutomationRun(run.id, {}, 'failed', String(error));
    return NextResponse.json({ error: 'Failed to update QA score', details: String(error) }, { status: 500 });
  }
}
