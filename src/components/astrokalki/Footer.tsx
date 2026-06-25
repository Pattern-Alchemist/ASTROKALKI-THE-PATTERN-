'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/[0.04] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-16 mb-12">
          {/* Brand */}
          <div>
            <p className="font-[var(--font-cormorant)] text-2xl md:text-3xl text-[#e8e0d4]">
              Astro<span className="italic">Kalki</span>
            </p>
            <p className="text-[10px] text-[#8a8078] mt-2 tracking-[0.2em] uppercase font-[var(--font-inter)]">
              Not fortune telling. Pattern recognition.
            </p>
          </div>

          {/* Decoder Credit */}
          <div className="text-left md:text-right">
            <p className="text-[10px] text-[#8a8078] tracking-[0.2em] uppercase font-[var(--font-inter)]">
              Decoder
            </p>
            <p className="font-[var(--font-cormorant)] text-xl text-[#c9a96e]/80 mt-1">
              Kaustubh
            </p>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 pt-8 border-t border-white/[0.04]">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#8a8078] mb-4 font-[var(--font-inter)]">
              Sessions
            </p>
            <ul className="space-y-2">
              {['All Sessions', 'Pattern Snapshot', 'Relationship Decode', 'Emotional Decode', 'Shadow Work'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#services"
                      className="text-xs text-[#8a8078]/70 hover:text-[#e8e0d4] transition-colors duration-300 font-[var(--font-inter)] font-light"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#8a8078] mb-4 font-[var(--font-inter)]">
              Knowledge
            </p>
            <ul className="space-y-2">
              {['Pattern Atlas', 'The Mirror Method', 'Long-form Guides', 'Pattern Library'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-xs text-[#8a8078]/70 hover:text-[#e8e0d4] transition-colors duration-300 font-[var(--font-inter)] font-light"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#8a8078] mb-4 font-[var(--font-inter)]">
              The Practice
            </p>
            <ul className="space-y-2">
              {['About AstroKalki', 'Methodology', 'Testimonials', 'FAQ'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={item === 'FAQ' ? '#assessment' : '#method'}
                      className="text-xs text-[#8a8078]/70 hover:text-[#e8e0d4] transition-colors duration-300 font-[var(--font-inter)] font-light"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#8a8078] mb-4 font-[var(--font-inter)]">
              Connect
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="tel:+918920862931"
                  className="text-xs text-[#8a8078]/70 hover:text-[#e8e0d4] transition-colors duration-300 font-[var(--font-inter)] font-light"
                >
                  +91 89208 62931
                </a>
              </li>
              <li>
                <a
                  href="#assessment"
                  className="text-xs text-[#c9a96e]/70 hover:text-[#c9a96e] transition-colors duration-300 font-[var(--font-inter)] font-light"
                >
                  Book a Session &rarr;
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/[0.04]">
          <p className="text-[10px] text-[#8a8078]/50 font-[var(--font-inter)]">
            &copy; 2026 AstroKalki. All patterns reserved. Founded by Kaustubh.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-[10px] text-[#8a8078]/50 hover:text-[#8a8078] transition-colors font-[var(--font-inter)]"
            >
              Unsubscribe
            </a>
            <a
              href="#"
              className="text-[10px] text-[#8a8078]/50 hover:text-[#8a8078] transition-colors font-[var(--font-inter)]"
            >
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
