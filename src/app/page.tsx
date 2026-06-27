'use client';

import { lazy, Suspense } from 'react';
import Loader from '@/components/astrokalki/Loader';
import Navbar from '@/components/astrokalki/Navbar';
import Hero from '@/components/astrokalki/Hero';
import PatternRecognition from '@/components/astrokalki/PatternRecognition';
import Services from '@/components/astrokalki/Services';

// Lazy load below-the-fold components
const Method = lazy(() => import('@/components/astrokalki/Method'));
const WarriorsJourney = lazy(() => import('@/components/astrokalki/WarriorsJourney'));
const Testimonials = lazy(() => import('@/components/astrokalki/Testimonials'));
const DangerousKnowledge = lazy(() => import('@/components/astrokalki/DangerousKnowledge'));
const PatternLibrary = lazy(() => import('@/components/astrokalki/PatternLibrary'));
const MemberPreview = lazy(() => import('@/components/astrokalki/MemberPreview'));
const EmailSignup = lazy(() => import('@/components/astrokalki/EmailSignup'));
const Assessment = lazy(() => import('@/components/astrokalki/Assessment'));
const FinalCTA = lazy(() => import('@/components/astrokalki/FinalCTA'));
const Footer = lazy(() => import('@/components/astrokalki/Footer'));

const LoadingFallback = () => (
  <div className="py-16 md:py-24">
    <div className="max-w-6xl mx-auto px-5 md:px-12">
      <div className="h-12 bg-white/5 rounded animate-pulse" />
    </div>
  </div>
);

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-to-content">Skip to content</a>
      <Loader />
      <Navbar />

      <main id="main-content" className="bg-[#050505] overflow-x-hidden">
        {/* 1. Hero — cinematic, one promise, two CTAs */}
        <Hero />

        {/* 2. Pattern Recognition — the signature fade sequence */}
        <PatternRecognition />

        {/* 3. Services — immediate, large, one paragraph each */}
        <Services />

        {/* 4. Method — 4 steps */}
        <Suspense fallback={<LoadingFallback />}>
          <Method />
        </Suspense>

        {/* 5. Warrior's Journey — one powerful section */}
        <Suspense fallback={<LoadingFallback />}>
          <WarriorsJourney />
        </Suspense>

        {/* 6. Testimonials */}
        <Suspense fallback={<LoadingFallback />}>
          <Testimonials />
        </Suspense>

        {/* 7. Dangerous Knowledge — 3 articles only */}
        <Suspense fallback={<LoadingFallback />}>
          <DangerousKnowledge />
        </Suspense>

        {/* 7b. Pattern Library — 15 SEO cornerstone articles */}
        <Suspense fallback={<LoadingFallback />}>
          <PatternLibrary />
        </Suspense>

        {/* 8. Member Preview — compact Pattern Intelligence System teaser */}
        <Suspense fallback={<LoadingFallback />}>
          <MemberPreview />
        </Suspense>

        {/* 9. Email Signup — owned audience */}
        <section className="bg-[#080808] py-12 md:py-16 border-t border-white/[0.04]">
          <div className="max-w-3xl mx-auto px-5 md:px-12">
            <Suspense fallback={<LoadingFallback />}>
              <EmailSignup />
            </Suspense>
          </div>
        </section>

        {/* 10. Assessment CTA */}
        <Suspense fallback={<LoadingFallback />}>
          <Assessment />
        </Suspense>

        {/* 11. Final CTA */}
        <Suspense fallback={<LoadingFallback />}>
          <FinalCTA />
        </Suspense>

        <Suspense fallback={<LoadingFallback />}>
          <Footer />
        </Suspense>
      </main>
    </>
  );
}
