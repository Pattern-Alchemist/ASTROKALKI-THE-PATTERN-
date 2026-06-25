'use client';

import Loader from '@/components/astrokalki/Loader';
import Navbar from '@/components/astrokalki/Navbar';
import Hero from '@/components/astrokalki/Hero';
import PatternMosaic from '@/components/astrokalki/PatternMosaic';
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
        {/* 1. Hero — 3 seconds to authority */}
        <Hero />

        {/* 2. Pattern Mosaic — High-density recognition cards */}
        <PatternMosaic />

        {/* 3. Method — Engine Room with Golden Thread */}
        <Method />

        {/* 4. Services — Luxury Marketplace (PRIMARY) */}
        <Services />

        {/* 5. Warrior's Journey — A24 moment */}
        <WarriorsJourney />

        {/* 6. Testimonials — Recognitions + Stats */}
        <Testimonials />

        {/* 7. Dangerous Knowledge — Magazine / Intellectual Moat */}
        <DangerousKnowledge />

        {/* 8. Assessment CTA — Funnel touchpoint */}
        <Assessment />

        {/* 9. FAQ — Conversion support */}
        <FAQ />

        {/* 10. Final CTA — Eclipse + Shadow */}
        <FinalCTA />

        <Footer />
      </main>
    </>
  );
}
