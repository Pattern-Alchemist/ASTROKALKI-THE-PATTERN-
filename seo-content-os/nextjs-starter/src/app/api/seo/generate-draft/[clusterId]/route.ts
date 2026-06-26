import { NextResponse } from 'next/server';
import { getClusterById } from '@/lib/db/queries/clusters';
import { getBriefByCluster } from '@/lib/db/queries/briefs';
import { getTemplateByKey } from '@/lib/db/queries/templates';
import { createContentItem } from '@/lib/db/queries/content-items';
import { createAutomationRun, completeAutomationRun } from '@/lib/db/queries/automation-runs';

/**
 * POST /api/seo/generate-draft/[clusterId]
 *
 * Receives LLM-generated draft content from n8n.
 * Creates a content_item linked to the cluster + brief + template.
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ clusterId: string }> }
) {
  const { clusterId } = await params;
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: 'Request body is required' }, { status: 400 });
  }

  const run = await createAutomationRun({
    run_type: 'draft_generate',
    trigger_source: 'n8n',
    input_payload: { cluster_id: clusterId },
  }).catch(() => null);

  try {
    const cluster = await getClusterById(clusterId);
    if (!cluster) {
      return NextResponse.json({ error: 'Cluster not found' }, { status: 404 });
    }

    const brief = await getBriefByCluster(clusterId);
    const template = body.template_key ? await getTemplateByKey(body.template_key) : null;

    // Calculate word count from content
    const wordCount = body.content_md ? body.content_md.split(/\s+/).length : null;

    const contentItem = await createContentItem({
      cluster_id: clusterId,
      brief_id: brief?.id,
      template_id: template?.id,
      title: body.title,
      slug: body.slug || cluster.target_slug || cluster.cluster_name.toLowerCase().replace(/\s+/g, '-'),
      meta_title: body.meta_title,
      meta_description: body.meta_description,
      excerpt: body.excerpt,
      content_md: body.content_md,
      content_json: body.content_json,
      schema_json: body.schema_json,
      word_count: wordCount || undefined,
      status: 'drafted',
    });

    if (run) {
      await completeAutomationRun(run.id, { content_item_id: contentItem.id, slug: contentItem.slug });
    }

    return NextResponse.json({ ok: true, content_item_id: contentItem.id, slug: contentItem.slug });
  } catch (error) {
    if (run) await completeAutomationRun(run.id, {}, 'failed', String(error));
    return NextResponse.json({ error: 'Failed to generate draft', details: String(error) }, { status: 500 });
  }
}
