import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

/**
 * POST /api/seo/revalidate
 *
 * Triggers Next.js on-demand revalidation for a specific path or tag.
 * Called by n8n publish workflow after content goes live.
 *
 * Body:
 *   { "path": "/blog/the-rescuer-pattern", "tag": "blog" }
 *   { "path": "all" }  — revalidate everything
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: 'Request body is required' }, { status: 400 });
  }

  try {
    const revalidatedPaths: string[] = [];

    // Revalidate by tag
    if (body.tag) {
      revalidateTag(body.tag);
      revalidatedPaths.push(`tag:${body.tag}`);
    }

    // Revalidate by path
    if (body.path) {
      if (body.path === 'all') {
        // Revalidate known route groups
        const collections = ['blog', 'patterns', 'glossary', 'compare'];
        for (const col of collections) {
          revalidateTag(col);
          revalidatedPaths.push(`tag:${col}`);
        }
        revalidatePath('/', 'layout');
        revalidatedPaths.push('/');
      } else {
        // Normalize path
        const path = body.path.startsWith('/') ? body.path : `/${body.path}`;
        revalidatePath(path);
        revalidatedPaths.push(path);
      }
    }

    return NextResponse.json({
      ok: true,
      revalidated: revalidatedPaths,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Revalidation failed',
      details: String(error),
    }, { status: 500 });
  }
}

/**
 * GET /api/seo/revalidate
 *
 * Health check endpoint.
 */
export async function GET() {
  return NextResponse.json({
    ok: true,
    endpoint: 'revalidate',
    methods: ['POST'],
    description: 'Triggers Next.js on-demand revalidation',
  });
}
