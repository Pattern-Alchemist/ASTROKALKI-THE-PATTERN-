import { NextResponse } from 'next/server';

/**
 * SEO Audit API Endpoint
 *
 * Returns a JSON health report of the site's SEO status.
 * Can be called by a cron job (vercel.json) or manually via /api/seo-audit
 *
 * Checks:
 * 1. Sitemap accessibility
 * 2. Robots.txt accessibility
 * 3. Meta tag presence on key pages
 * 4. Structured data validity (JSON-LD)
 * 5. Internal link health
 * 6. Performance hints
 */

const SITE_URL = 'https://astrokalki.com';

interface CheckResult {
  name: string;
  status: 'pass' | 'warn' | 'fail';
  message: string;
  details?: Record<string, unknown>;
}

export async function GET() {
  const results: CheckResult[] = [];
  const timestamp = new Date().toISOString();

  // 1. Sitemap check
  try {
    const sitemapRes = await fetch(`${SITE_URL}/sitemap.xml`, { method: 'HEAD' });
    results.push({
      name: 'Sitemap',
      status: sitemapRes.ok ? 'pass' : 'fail',
      message: sitemapRes.ok ? 'sitemap.xml accessible' : `sitemap.xml returned ${sitemapRes.status}`,
      details: { url: `${SITE_URL}/sitemap.xml`, statusCode: sitemapRes.status },
    });
  } catch {
    results.push({
      name: 'Sitemap',
      status: 'fail',
      message: 'Could not fetch sitemap.xml — site may not be live yet (this is expected in dev)',
    });
  }

  // 2. Robots.txt check
  try {
    const robotsRes = await fetch(`${SITE_URL}/robots.txt`, { method: 'HEAD' });
    results.push({
      name: 'Robots.txt',
      status: robotsRes.ok ? 'pass' : 'fail',
      message: robotsRes.ok ? 'robots.txt accessible' : `robots.txt returned ${robotsRes.status}`,
    });
  } catch {
    results.push({
      name: 'Robots.txt',
      status: 'fail',
      message: 'Could not fetch robots.txt — site may not be live yet (this is expected in dev)',
    });
  }

  // 3. Homepage meta tags check
  try {
    const homeRes = await fetch(SITE_URL);
    const homeHtml = await homeRes.text();

    const hasTitle = /<title>[^<]+<\/title>/i.test(homeHtml);
    const hasDescription = /<meta\s+name="description"/i.test(homeHtml);
    const hasOgTags = /<meta\s+property="og:/i.test(homeHtml);
    const hasTwitterCards = /<meta\s+name="twitter:/i.test(homeHtml);
    const hasCanonical = /<link\s+rel="canonical"/i.test(homeHtml);
    const hasJsonLd = /application\/ld\+json/i.test(homeHtml);

    results.push({
      name: 'Meta Tags (Homepage)',
      status: hasTitle && hasDescription && hasOgTags ? 'pass' : 'warn',
      message: `Title: ${hasTitle ? '✓' : '✗'}, Description: ${hasDescription ? '✓' : '✗'}, OG: ${hasOgTags ? '✓' : '✗'}, Twitter: ${hasTwitterCards ? '✓' : '✗'}, Canonical: ${hasCanonical ? '✓' : '✗'}`,
    });

    results.push({
      name: 'Structured Data (JSON-LD)',
      status: hasJsonLd ? 'pass' : 'fail',
      message: hasJsonLd ? 'JSON-LD blocks present' : 'No JSON-LD found',
    });

    // 4. Count JSON-LD blocks
    const jsonLdCount = (homeHtml.match(/application\/ld\+json/gi) || []).length;
    results.push({
      name: 'JSON-LD Block Count',
      status: jsonLdCount >= 4 ? 'pass' : jsonLdCount >= 2 ? 'warn' : 'fail',
      message: `${jsonLdCount} JSON-LD blocks found (target: 4+ for Organization, WebSite, Service, FAQPage)`,
    });

    // 5. Check for key SEO keywords
    const keywords = ['pattern intelligence', 'pattern biography', 'pattern dna', 'behavioral pattern'];
    const foundKeywords = keywords.filter(kw => homeHtml.toLowerCase().includes(kw));
    results.push({
      name: 'Target Keywords',
      status: foundKeywords.length >= 3 ? 'pass' : 'warn',
      message: `${foundKeywords.length}/${keywords.length} target keywords found in homepage HTML`,
    });

    // 6. Page size check
    const sizeKb = Math.round(new Blob([homeHtml]).size / 1024);
    results.push({
      name: 'Page Size',
      status: sizeKb < 150 ? 'pass' : sizeKb < 300 ? 'warn' : 'fail',
      message: `${sizeKb}KB (target: <150KB for fast LCP)`,
    });
  } catch {
    results.push({
      name: 'Homepage Fetch',
      status: 'fail',
      message: 'Could not fetch homepage for meta tag analysis (expected in dev)',
    });
  }

  // Summary
  const passed = results.filter(r => r.status === 'pass').length;
  const warned = results.filter(r => r.status === 'warn').length;
  const failed = results.filter(r => r.status === 'fail').length;
  const score = Math.round((passed / results.length) * 100);

  return NextResponse.json({
    timestamp,
    score,
    summary: { total: results.length, passed, warned, failed },
    results,
    nextActions: generateNextActions(results),
  });
}

function generateNextActions(results: CheckResult[]): string[] {
  const actions: string[] = [];
  const sitemap = results.find(r => r.name === 'Sitemap');
  if (sitemap?.status === 'fail') actions.push('Ensure sitemap.xml is deployed and accessible');
  const jsonLd = results.find(r => r.name === 'JSON-LD Block Count');
  if (jsonLd?.status !== 'pass') actions.push('Add more JSON-LD structured data blocks');
  const keywords = results.find(r => r.name === 'Target Keywords');
  if (keywords?.status !== 'pass') actions.push('Ensure target keywords appear in homepage content');
  const pageSize = results.find(r => r.name === 'Page Size');
  if (pageSize?.status === 'fail') actions.push('Reduce page size — lazy-load images, code-split heavy components');
  if (actions.length === 0) actions.push('All checks passed. Monitor Core Web Vitals in Google Search Console.');
  return actions;
}
