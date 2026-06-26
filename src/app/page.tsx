'use client';

import Loader from '@/components/astrokalki/Loader';
import Navbar from '@/components/astrokalki/Navbar';
import Hero from '@/components/astrokalki/Hero';
import PatternRecognition from '@/components/astrokalki/PatternRecognition';
import Services from '@/components/astrokalki/Services';
import Method from '@/components/astrokalki/Method';
import WarriorsJourney from '@/components/astrokalki/WarriorsJourney';
import Testimonials from '@/components/astrokalki/Testimonials';
import DangerousKnowledge from '@/components/astrokalki/DangerousKnowledge';
import PatternLibrary from '@/components/astrokalki/PatternLibrary';
import MemberPreview from '@/components/astrokalki/MemberPreview';
import EmailSignup from '@/components/astrokalki/EmailSignup';
import Assessment from '@/components/astrokalki/Assessment';
import FinalCTA from '@/components/astrokalki/FinalCTA';
import Footer from '@/components/astrokalki/Footer';

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
        <Method />

        {/* 5. Warrior's Journey — one powerful section */}
        <WarriorsJourney />

        {/* 6. Testimonials */}
        <Testimonials />

        {/* 7. Dangerous Knowledge — 3 articles only */}
        <DangerousKnowledge />

        {/* 7b. Pattern Library — 15 SEO cornerstone articles */}
        <PatternLibrary />

        {/* 8. Member Preview — compact Pattern Intelligence System teaser */}
        <MemberPreview />

        {/* 9. Email Signup — owned audience */}
        <section className="bg-[#080808] py-12 md:py-16 border-t border-white/[0.04]">
          <div className="max-w-3xl mx-auto px-5 md:px-12">
            <EmailSignup />
          </div>
        </section>

        {/* 10. Assessment CTA */}
        <Assessment />

        {/* 11. Final CTA */}
        <FinalCTA />

        <Footer />
      </main>
    </>
  );
}
