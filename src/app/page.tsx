'use client';

import Loader from '@/components/astrokalki/Loader';
import Navbar from '@/components/astrokalki/Navbar';
import Hero from '@/components/astrokalki/Hero';
import PatternRecognition from '@/components/astrokalki/PatternRecognition';
import Methodology from '@/components/astrokalki/Methodology';
import WarriorsJourney from '@/components/astrokalki/WarriorsJourney';
import ShadowWork from '@/components/astrokalki/ShadowWork';
import DharmaNavigation from '@/components/astrokalki/DharmaNavigation';
import Testimonials from '@/components/astrokalki/Testimonials';
import Services from '@/components/astrokalki/Services';
import Assessment from '@/components/astrokalki/Assessment';
import FAQ from '@/components/astrokalki/FAQ';
import Footer from '@/components/astrokalki/Footer';

export default function Home() {
  return (
    <>
      <Loader />
      <Navbar />

      <main id="top" className="bg-[#050505] overflow-x-hidden">
        <Hero />

        {/* Pattern Recognition & Editorial Depth */}
        <PatternRecognition />

        {/* Methodology Visual Sequence */}
        <Methodology />

        {/* Warrior's Journey - Full Width Cinematic */}
        <WarriorsJourney />

        {/* Shadow Work - Psychological Confrontation */}
        <ShadowWork />

        {/* Dharma Navigation - Purpose & Direction */}
        <DharmaNavigation />

        {/* Testimonials - Recognitions & Stats */}
        <Testimonials />

        {/* Conversion & Assessment Layers */}
        <Services />
        <Assessment />
        <FAQ />

        <Footer />
      </main>
    </>
  );
}
