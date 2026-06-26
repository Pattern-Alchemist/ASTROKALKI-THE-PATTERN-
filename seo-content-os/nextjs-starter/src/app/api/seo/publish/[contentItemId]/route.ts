import { NextResponse } from 'next/server';
import { publishContent, getContentById } from '@/lib/db/queries/content-items';
import { createPublishJob, completePublishJob } from '@/lib/db/queries/publish-jobs';
import { createAutomationRun, completeAutomationRun } from '@/lib/db/queries/automation-runs';

/**
 * POST /api/seo/publish/[contentItemId]
 *
 * Marks content as published + creates a publish_job record.
 * The n8n workflow calls this after verifying QA score >= 75.
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ contentItemId: string }> }
) {
  const { contentItemId } = await params;
  const body = await request.json().catch(() => ({}));

  const run = await createAutomationRun({
    run_type: 'publish',
    trigger_source: 'n8n',
    input_payload: { content_item_id: contentItemId },
  }).catch(() => null);

  try {
    // Verify content exists + is in a publishable state
    const content = await getContentById(contentItemId);
    if (!content) {
      return NextResponse.json({ error: 'Content item not found' }, { status: 404 });
    }

    if (content.status !== 'approved' && body.status !== 'approved') {
      return NextResponse.json({
        error: 'Content must be approved before publishing',
        current_status: content.status,
        qa_score: content.qa_score,
      }, { status: 400 });
    }

    // If body contains status: 'approved', approve first
    let updatedContent = content;
    if (body.status === 'approved' && content.status !== 'approved') {
      const { updateContentItem } = await import('@/lib/db/queries/content-items');
      updatedContent = await updateContentItem(contentItemId, { status: 'approved', qa_score: content.qa_score || 100 });
    }

    // Mark as published
    const published = await publishContent(contentItemId);

    // Create publish job record
    const publishJob = await createPublishJob(contentItemId, 'nextjs');
    await completePublishJob(publishJob.id, {
      publish_status: 'completed',
      target_path: `/blog/${published.slug}`,
      response_payload: { slug: published.slug, published_at: published.published_at },
    });

    if (run) {
      await completeAutomationRun(run.id, {
        content_item_id: contentItemId,
        slug: published.slug,
        published_at: published.published_at,
      });
    }

    return NextResponse.json({
      ok: true,
      content_item_id: contentItemId,
      slug: published.slug,
      published_at: published.published_at,
      publish_job_id: publishJob.id,
    });
  } catch (error) {
    if (run) await completeAutomationRun(run.id, {}, 'failed', String(error));
    return NextResponse.json({ error: 'Failed to publish', details: String(error) }, { status: 500 });
  }
}
