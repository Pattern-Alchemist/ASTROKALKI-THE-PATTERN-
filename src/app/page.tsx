'use client';

import Loader from '@/components/astrokalki/Loader';
import Navbar from '@/components/astrokalki/Navbar';
import Hero from '@/components/astrokalki/Hero';
import Recognition from '@/components/astrokalki/Recognition';
import Method from '@/components/astrokalki/Method';
import Services from '@/components/astrokalki/Services';
import WarriorsJourney from '@/components/astrokalki/WarriorsJourney';
import Testimonials from '@/components/astrokalki/Testimonials';
import DangerousKnowledge from '@/components/astrokalki/DangerousKnowledge';
import Assessment from '@/components/astrokalki/Assessment';
import FAQ from '@/components/astrokalki/FAQ';
import FinalCTA from '@/components/astrokalki/FinalCTA';
import Footer from '@/components/astrokalki/Footer';

export default function Home() {
  return (
    <>
      <Loader />
      <Navbar />

      <main id="top" className="bg-[#050505] overflow-x-hidden">
        {/* 1. Hero — Immediate identity + assessment CTA */}
        <Hero />

        {/* 2. Recognition — Self-recognition energy */}
        <Recognition />

        {/* 3. Method — 4-step framework */}
        <Method />

        {/* 4. Services — PRIMARY conversion section */}
        <Services />

        {/* 5. Warrior's Journey — Documentary timeline */}
        <WarriorsJourney />

        {/* 6. Testimonials — Recognitions + stats */}
        <Testimonials />

        {/* 7. Dangerous Knowledge — Premium intellectual publication */}
        <DangerousKnowledge />

        {/* 8. Assessment CTA — mid-page funnel */}
        <Assessment />

        {/* 9. FAQ — Conversion support */}
        <FAQ />

        {/* 10. Final CTA — Eclipse imagery */}
        <FinalCTA />

        <Footer />
      </main>
    </>
  );
}
