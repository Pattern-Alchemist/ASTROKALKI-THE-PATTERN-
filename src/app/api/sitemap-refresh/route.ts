import { NextResponse } from 'next/server';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

/**
 * Sitemap Refresh API
 *
 * Regenerates sitemap.xml based on the current page structure.
 * Called by cron job or manually.
 *
 * In production (Vercel), this would need a different approach
 * since the filesystem is read-only. For now, it returns the
 * sitemap content as XML for caching/CDN use.
 */

const SITE_URL = 'https://astrokalki.com';

// All sections of the site (matches page.tsx)
const SECTIONS = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/#pattern-intelligence-system', priority: '0.9', changefreq: 'weekly' },
  { path: '/#services', priority: '0.8', changefreq: 'monthly' },
  { path: '/#method', priority: '0.7', changefreq: 'monthly' },
  { path: '/#warriors-journey', priority: '0.7', changefreq: 'monthly' },
  { path: '/#testimonials', priority: '0.6', changefreq: 'monthly' },
  { path: '/#dangerous-knowledge', priority: '0.7', changefreq: 'weekly' },
  { path: '/#assessment', priority: '0.8', changefreq: 'monthly' },
];

// Pattern Library articles (will grow over time)
const PATTERN_ARTICLES = [
  'the-rescuer-pattern',
  'the-avoidance-loop',
  'the-performer-trap',
  'the-controlling-pattern',
  'the-numbing-strategy',
  'the-overworking-pattern',
  'the-people-pleasing-loop',
  'the-overthinking-loop',
  'the-withdrawal-pattern',
  'the-inner-critic',
  'the-inner-child',
  'the-fear-of-abandonment',
  'the-fear-of-visibility',
  'the-imposter-pattern',
  'the-perfectionism-loop',
];

function generateSitemap(): string {
  const today = new Date().toISOString().slice(0, 10);
  const urls: string[] = [];

  // Main sections
  SECTIONS.forEach(section => {
    urls.push(`  <url>
    <loc>${SITE_URL}${section.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${section.changefreq}</changefreq>
    <priority>${section.priority}</priority>
  </url>`);
  });

  // Pattern Library articles
  PATTERN_ARTICLES.forEach(slug => {
    urls.push(`  <url>
    <loc>${SITE_URL}/pattern/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`);
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
}

export async function GET() {
  const sitemap = generateSitemap();

  // In dev, try to write to public/
  if (process.env.NODE_ENV === 'development') {
    try {
      const publicPath = join(process.cwd(), 'public', 'sitemap.xml');
      writeFileSync(publicPath, sitemap, 'utf-8');
    } catch (e) {
      // Ignore write errors
    }
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    message: 'Sitemap generated successfully',
    urlCount: SECTIONS.length + PATTERN_ARTICLES.length,
    sitemapUrl: `${SITE_URL}/sitemap.xml`,
    sections: SECTIONS.length,
    patternArticles: PATTERN_ARTICLES.length,
  });
}

export async function POST() {
  const sitemap = generateSitemap();

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
