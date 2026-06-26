import { NextResponse } from 'next/server';
import { getContentById } from '@/lib/db/queries/content-items';

/**
 * GET /api/seo/content/[contentItemId]
 *
 * Returns full content item by ID.
 * Used by n8n publish workflow to verify status + QA score.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ contentItemId: string }> }
) {
  const { contentItemId } = await params;

  try {
    const content = await getContentById(contentItemId);
    if (!content) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch content', details: String(error) }, { status: 500 });
  }
}
