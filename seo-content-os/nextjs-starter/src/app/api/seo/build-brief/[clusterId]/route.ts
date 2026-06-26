import { NextResponse } from 'next/server';
import { getClusterById, updateCluster } from '@/lib/db/queries/clusters';
import { createBrief, getBriefByCluster } from '@/lib/db/queries/briefs';
import { createAutomationRun, completeAutomationRun } from '@/lib/db/queries/automation-runs';

/**
 * POST /api/seo/build-brief/[clusterId]
 *
 * Receives SERP context + LLM-generated brief structure from n8n.
 * Stores the brief and marks the cluster as 'briefed'.
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
    run_type: 'brief_build',
    trigger_source: 'n8n',
    input_payload: { cluster_id: clusterId },
  }).catch(() => null);

  try {
    // Verify cluster exists
    const cluster = await getClusterById(clusterId);
    if (!cluster) {
      return NextResponse.json({ error: 'Cluster not found' }, { status: 404 });
    }

    // Check if brief already exists (idempotent)
    const existing = await getBriefByCluster(clusterId);
    if (existing && body.skip_if_exists) {
      if (run) await completeAutomationRun(run.id, { brief_id: existing.id, skipped: true });
      return NextResponse.json({ ok: true, brief_id: existing.id, skipped: true });
    }

    // Create new brief
    const brief = await createBrief({
      cluster_id: clusterId,
      serp_summary: body.serp_summary,
      competitors: body.competitors,
      headings: body.headings,
      faq_items: body.faq_items,
      entities: body.entities,
      internal_link_targets: body.internal_link_targets,
      schema_recommendation: body.schema_recommendation,
      status: 'drafted',
    });

    // Update cluster status
    await updateCluster(clusterId, { status: 'briefed' });

    if (run) {
      await completeAutomationRun(run.id, { brief_id: brief.id, cluster_status: 'briefed' });
    }

    return NextResponse.json({ ok: true, brief_id: brief.id });
  } catch (error) {
    if (run) await completeAutomationRun(run.id, {}, 'failed', String(error));
    return NextResponse.json({ error: 'Failed to build brief', details: String(error) }, { status: 500 });
  }
}
