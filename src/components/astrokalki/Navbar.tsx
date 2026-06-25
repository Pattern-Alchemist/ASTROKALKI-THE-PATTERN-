'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? 'bg-[#050505]/90 backdrop-blur-xl border-b border-white/[0.06] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-12 flex items-center justify-between">
        <a
          href="#top"
          className="font-[var(--font-cormorant)] text-xl md:text-2xl tracking-tight text-[#e8e0d4] hover:text-[#c9a96e] transition-colors duration-500"
        >
          Astro<span className="italic">Kalki</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <a
            href="#pattern"
            className="text-[10px] tracking-[0.25em] uppercase text-[#8a8078] hover:text-[#e8e0d4] transition-colors duration-500"
          >
            Framework
          </a>
          <a
            href="#method"
            className="text-[10px] tracking-[0.25em] uppercase text-[#8a8078] hover:text-[#e8e0d4] transition-colors duration-500"
          >
            Method
          </a>
          <a
            href="#services"
            className="text-[10px] tracking-[0.25em] uppercase text-[#8a8078] hover:text-[#e8e0d4] transition-colors duration-500"
          >
            Services
          </a>
          <a
            href="#assessment"
            className="text-[10px] tracking-[0.25em] uppercase text-[#8a8078] hover:text-[#e8e0d4] transition-colors duration-500"
          >
            Assessment
          </a>
        </div>

        <a
          href="#assessment"
          className="hidden md:inline-block px-5 py-2.5 text-[10px] tracking-[0.25em] uppercase border border-[#c9a96e]/40 text-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#050505] transition-all duration-500"
        >
          Begin Analysis
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-px bg-[#e8e0d4] transition-all duration-500 ${
              mobileOpen ? 'rotate-45 translate-y-[3.5px]' : ''
            }`}
          />
          <span
            className={`block w-5 h-px bg-[#e8e0d4] transition-all duration-500 ${
              mobileOpen ? '-rotate-45 -translate-y-[3.5px]' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: mobileOpen ? 'auto' : 0,
          opacity: mobileOpen ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="md:hidden overflow-hidden bg-[#050505]/95 backdrop-blur-xl"
      >
        <div className="px-5 py-6 flex flex-col gap-5">
          <a
            href="#pattern"
            onClick={() => setMobileOpen(false)}
            className="text-xs tracking-[0.25em] uppercase text-[#8a8078] hover:text-[#e8e0d4] transition-colors"
          >
            Framework
          </a>
          <a
            href="#method"
            onClick={() => setMobileOpen(false)}
            className="text-xs tracking-[0.25em] uppercase text-[#8a8078] hover:text-[#e8e0d4] transition-colors"
          >
            Method
          </a>
          <a
            href="#services"
            onClick={() => setMobileOpen(false)}
            className="text-xs tracking-[0.25em] uppercase text-[#8a8078] hover:text-[#e8e0d4] transition-colors"
          >
            Services
          </a>
          <a
            href="#assessment"
            onClick={() => setMobileOpen(false)}
            className="inline-block px-5 py-3 text-[10px] tracking-[0.25em] uppercase border border-[#c9a96e]/40 text-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#050505] transition-all duration-500 text-center"
          >
            Begin Analysis
          </a>
        </div>
      </motion.div>
    </motion.nav>
  );
}
