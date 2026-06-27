'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useReducedMotion } from './hooks/useReducedMotion';
import { SPRING, EASE } from './utils/animation';
import { openWhatsAppModal } from '@/lib/whatsapp-modal';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Method', href: '#method' },
    { label: 'Services', href: '#services' },
    { label: 'Warrior', href: '#warriors-journey' },
    { label: 'Articles', href: '#dangerous-knowledge' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={
        prefersReduced
          ? { duration: 0 }
          : { duration: 1, delay: 2.4, ease: EASE.outExpoLegacy }
      }
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? 'bg-[#050505]/90 backdrop-blur-xl border-b border-white/[0.06] py-3'
          : 'bg-transparent py-5'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-12 flex items-center justify-between">
        {/* Logo image */}
        <a href="#top" className="flex items-center gap-2" aria-label="AstroKalki home">
          <Image
            src="/astrokalki-logo.jpeg"
            alt="AstroKalki — The Pattern Intelligence System"
            width={36}
            height={36}
            className="rounded-full"
            priority
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="text-[10px] tracking-[0.25em] uppercase text-[#8a8078] hover:text-[#e8e0d4] transition-colors duration-500"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => openWhatsAppModal()}
          className="hidden md:inline-block px-5 py-2.5 text-[10px] tracking-[0.25em] uppercase border border-[#c9a96e]/40 text-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#050505] transition-all duration-500"
        >
          Book a Session
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
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
        id="mobile-menu"
        initial={false}
        animate={{
          height: mobileOpen ? 'auto' : 0,
          opacity: mobileOpen ? 1 : 0,
        }}
        transition={
          prefersReduced
            ? { duration: 0 }
            : { ...SPRING.stiff }
        }
        className="md:hidden overflow-hidden bg-[#050505]/95 backdrop-blur-xl"
        role="menu"
      >
        <div className="px-5 py-6 flex flex-col gap-5">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-xs tracking-[0.25em] uppercase text-[#8a8078] hover:text-[#e8e0d4] transition-colors"
              role="menuitem"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => { setMobileOpen(false); openWhatsAppModal(); }}
            className="inline-block px-5 py-3 text-[10px] tracking-[0.25em] uppercase border border-[#c9a96e]/40 text-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#050505] transition-all duration-500 text-center"
            role="menuitem"
          >
            Book a Session
          </button>
          {/* Social links in mobile menu */}
          <div className="flex gap-4 pt-3 border-t border-white/[0.04]">
            <a href="https://wa.me/918920862931" target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#8a8078] hover:text-[#c9a96e]">WhatsApp</a>
            <a href="https://www.youtube.com/@AstroKalki" target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#8a8078] hover:text-[#c9a96e]">YouTube</a>
            <a href="https://www.instagram.com/unfilteredbuddy_" target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#8a8078] hover:text-[#c9a96e]">Instagram</a>
            <a href="mailto:sos.astrokalki@gmail.com" className="text-[10px] text-[#8a8078] hover:text-[#c9a96e]">Email</a>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}
