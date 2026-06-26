import { NextResponse } from 'next/server';
import { refreshContent } from '@/lib/db/queries/content-items';
import { createAutomationRun, completeAutomationRun } from '@/lib/db/queries/automation-runs';

/**
 * POST /api/seo/refresh/[contentItemId]
 *
 * Marks content as refreshed (content was updated/re-optimized).
 * Updates last_refreshed_at timestamp.
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ contentItemId: string }> }
) {
  const { contentItemId } = await params;
  const body = await request.json().catch(() => ({}));

  const run = await createAutomationRun({
    run_type: 'refresh',
    trigger_source: 'n8n',
    input_payload: { content_item_id: contentItemId },
  }).catch(() => null);

  try {
    const refreshed = await refreshContent(contentItemId);

    // If content_md was updated, store it
    if (body.content_md) {
      const { updateContentItem } = await import('@/lib/db/queries/content-items');
      const wordCount = body.content_md.split(/\s+/).length;
      await updateContentItem(contentItemId, {
        content_md: body.content_md,
        word_count: wordCount,
        content_json: body.content_json,
      });
    }

    if (run) {
      await completeAutomationRun(run.id, {
        content_item_id: contentItemId,
        last_refreshed_at: refreshed.last_refreshed_at,
      });
    }

    return NextResponse.json({
      ok: true,
      content_item_id: contentItemId,
      last_refreshed_at: refreshed.last_refreshed_at,
    });
  } catch (error) {
    if (run) await completeAutomationRun(run.id, {}, 'failed', String(error));
    return NextResponse.json({ error: 'Failed to refresh', details: String(error) }, { status: 500 });
  }
}
