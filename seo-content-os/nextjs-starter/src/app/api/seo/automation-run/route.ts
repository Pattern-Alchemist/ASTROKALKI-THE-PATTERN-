import { NextResponse } from 'next/server';
import { createAutomationRun, completeAutomationRun, getAutomationRuns } from '@/lib/db/queries/automation-runs';

/**
 * POST /api/seo/automation-run
 *
 * Creates or completes an automation_run record.
 * Used by n8n workflows to log their execution status.
 *
 * Body (create):
 *   { "run_type": "publish", "trigger_source": "n8n", "input_payload": {...} }
 *
 * Body (complete):
 *   { "id": "uuid", "output_payload": {...}, "status": "completed", "error_message": null }
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: 'Request body is required' }, { status: 400 });
  }

  try {
    // Complete an existing run
    if (body.id && body.output_payload !== undefined) {
      const completed = await completeAutomationRun(
        body.id,
        body.output_payload,
        body.status || 'completed',
        body.error_message
      );
      return NextResponse.json({ ok: true, run: completed });
    }

    // Create a new run
    const run = await createAutomationRun({
      run_type: body.run_type,
      trigger_source: body.trigger_source,
      input_payload: body.input_payload,
      status: body.status,
    });

    return NextResponse.json({ ok: true, run_id: run.id });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to record automation run', details: String(error) }, { status: 500 });
  }
}

/**
 * GET /api/seo/automation-run
 *
 * Returns recent automation runs for monitoring.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const runType = searchParams.get('run_type') || undefined;
  const limit = parseInt(searchParams.get('limit') || '50', 10);

  try {
    const runs = await getAutomationRuns(runType, limit);
    return NextResponse.json({ runs, count: runs.length });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch automation runs', details: String(error) }, { status: 500 });
  }
}
