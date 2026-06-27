# ASTROKALKI Deployment Checklist for www.astrokalki.com

## ✅ Pre-Deployment Status

### Build & Compilation
- [x] Production build completes successfully (`npm run build`)
- [x] TypeScript compilation passes
- [x] ESLint errors resolved (AnnotationLayer ref access fixed)
- [x] No blocking errors

### Configuration Updates
- [x] Added `"type": "module"` to package.json (improves build time)
- [x] Updated domain allowlist in next.config.ts (space-z.ai → astrokalki.com)
- [x] Next.js 16.1.3 with Turbopack configured
- [x] Image optimization enabled (AVIF/WebP formats)
- [x] Standalone output mode configured

---

## 📋 Deployment Checklist

### Vercel Project Setup
- [ ] Create new Vercel project or use existing
- [ ] Connect GitHub repository (Pattern-Alchemist/ASTROKALKI-THE-PATTERN-)
- [ ] Set production branch to `main`

### Domain Configuration
- [ ] Add custom domain: `www.astrokalki.com`
- [ ] Configure DNS records (CNAME or A records per Vercel instructions)
- [ ] Enable SSL/TLS certificate (automatic with Vercel)
- [ ] Set up domain redirect for `astrokalki.com` → `www.astrokalki.com` (if needed)

### Environment Variables
In Vercel Project Settings > Environment Variables, set:
- [ ] `DATABASE_URL` - Production database URL (currently uses local SQLite)
- [ ] Any other environment-specific variables
- [ ] Enable "Automatically expose System Environment Variables" if using secrets

### Database
- [ ] Provision production database (PostgreSQL recommended)
- [ ] Run Prisma migrations: `npm run db:push` (execute in deployment)
- [ ] Verify migrations completed successfully
- [ ] Set database backups (if using managed service)

### Cron Jobs (configured in vercel.json)
- [ ] SEO audit: Runs Mondays at 9 AM UTC (`/api/seo-audit`)
- [ ] Sitemap refresh: Daily 12:01 AM UTC (`/api/sitemap-refresh`)
- [ ] Monitor cron job logs in Vercel dashboard

### Performance & Monitoring
- [ ] Enable Vercel Analytics
- [ ] Enable Web Vitals monitoring
- [ ] Configure error tracking (Sentry/LogRocket optional)
- [ ] Review and optimize LCP/INP/CLS metrics

### Security Headers
The following should be set in Vercel project settings:
- [ ] `X-Frame-Options: SAMEORIGIN` (clickjacking protection)
- [ ] `X-Content-Type-Options: nosniff`
- [ ] `Referrer-Policy: strict-origin-when-cross-origin`
- [ ] `Permissions-Policy: accelerometer=(), camera=(), etc`

### Pre-Launch Testing
- [ ] Test homepage loads correctly: https://www.astrokalki.com
- [ ] Verify all 6 static pages render
- [ ] Test API endpoints: `/api/seo-audit`, `/api/sitemap-refresh`
- [ ] Check image optimization is working (use DevTools)
- [ ] Test responsive design on mobile, tablet, desktop
- [ ] Verify fonts load correctly
- [ ] Check for console errors in production mode
- [ ] Test annotation layer interactions
- [ ] Verify forms submit correctly (if applicable)

### SEO & Accessibility
- [ ] Verify sitemap generates at `/api/sitemap-refresh`
- [ ] Check robots.txt is accessible
- [ ] Test page meta descriptions and og:image tags
- [ ] Run Lighthouse audit (target: 90+ all categories)
- [ ] Validate HTML with W3C validator
- [ ] Test keyboard navigation
- [ ] Check ARIA labels and semantic HTML

### Monitoring & Maintenance
- [ ] Set up notifications for build failures
- [ ] Configure alerts for errors/exceptions
- [ ] Monitor cron job executions
- [ ] Set up performance monitoring dashboard
- [ ] Plan weekly log review schedule

---

## 🚀 Final Deployment Steps

1. **Push to main branch**
   ```bash
   git add .
   git commit -m "Deploy: Production fixes and domain configuration"
   git push origin main
   ```

2. **Vercel Deployment**
   - Vercel automatically deploys on push to main
   - Monitor build logs at: https://vercel.com/dashboard

3. **Post-Deployment Verification**
   - [ ] Check deployment succeeded in Vercel dashboard
   - [ ] Test www.astrokalki.com loads without errors
   - [ ] Verify all functionality works
   - [ ] Check Core Web Vitals in deployment

4. **DNS Activation** (if not already live)
   - Update DNS records to point to Vercel nameservers
   - Wait for DNS propagation (usually 1-24 hours)

---

## 📊 Build Output Summary

```
Routes:
├ ○ / (Static)
├ ○ /_not-found (Static)
├ ƒ /api (Dynamic)
├ ƒ /api/seo-audit (Dynamic)
└ ƒ /api/sitemap-refresh (Dynamic)

Build Status: ✓ SUCCESS
Compile Time: 11.7s
Total Time: ~200ms for static generation
```

---

## ⚠️ Known Lint Warnings (Non-Blocking)

These pre-existing patterns don't affect deployment:
- useState called directly in effects (performance warning, not breaking)
- require() style imports in Supabase utilities (legacy pattern)

These are optimized for future refactoring but don't prevent deployment.

---

## 📞 Troubleshooting

### Build Fails
- Check environment variables are set
- Verify database connection
- Review Vercel build logs

### Domain Not Resolving
- Verify DNS records are correct
- Allow 24 hours for propagation
- Check domain is active in registrar

### Pages Load Slowly
- Enable image optimization verification
- Check database query performance
- Review Vercel analytics dashboard

---

**Last Updated:** 2026-06-27
**Status:** Ready for Deployment ✓
