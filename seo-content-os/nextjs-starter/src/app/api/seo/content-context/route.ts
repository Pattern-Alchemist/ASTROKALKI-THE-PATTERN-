import { NextResponse } from 'next/server';
import { getContentItems, getPublishedContent } from '@/lib/db/queries/content-items';

/**
 * GET /api/seo/content-context
 *
 * Returns content items filtered by status.
 * Used by n8n QA workflow to fetch drafted content + published content for internal linking.
 *
 * Query params:
 *   status=published|drafted|review|approved|queued
 *   limit=50 (default)
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status') || undefined;
  const limit = parseInt(searchParams.get('limit') || '50', 10);

  try {
    let items;
    if (status === 'published') {
      items = await getPublishedContent(limit);
    } else {
      items = await getContentItems({ status, limit });
    }

    // Return minimal fields for context (don't send full content_md)
    const context = items.map(item => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      cluster_id: item.cluster_id,
      status: item.status,
      qa_score: item.qa_score,
      word_count: item.word_count,
      meta_description: item.meta_description,
      excerpt: item.excerpt,
    }));

    return NextResponse.json({ items: context, count: context.length });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch content context', details: String(error) }, { status: 500 });
  }
}
