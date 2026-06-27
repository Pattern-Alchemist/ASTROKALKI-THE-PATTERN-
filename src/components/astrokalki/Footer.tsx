'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { openWhatsAppModal } from '@/lib/whatsapp-modal';

const WHATSAPP_URL = 'https://wa.me/918920862931';
const YOUTUBE_URL = 'https://www.youtube.com/@AstroKalki';
const INSTAGRAM_URL = 'https://www.instagram.com/unfilteredbuddy_';
const EMAIL = 'sos.astrokalki@gmail.com';

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/[0.04] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-16 mb-12">
          {/* Brand with logo */}
          <div className="flex items-start gap-4">
            <Image
              src="/astrokalki-logo.jpeg"
              alt="AstroKalki"
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <p className="font-[var(--font-cormorant)] text-2xl md:text-3xl text-[#e8e0d4]">
                Astro<span className="italic">Kalki</span>
              </p>
              <p className="text-[10px] text-[#8a8078] mt-2 tracking-[0.2em] uppercase font-[var(--font-inter)]">
                The Pattern Intelligence System™
              </p>
            </div>
          </div>

          {/* Decoder Credit with neon glow */}
          <div className="text-left md:text-right">
            <p className="text-[10px] text-[#8a8078] tracking-[0.2em] uppercase font-[var(--font-inter)]">
              Decoder
            </p>
            <p
              className="font-[var(--font-cormorant)] text-xl text-[#f5f3f0] mt-1"
              style={{
                textShadow: '0 0 4px rgba(255,255,255,0.5), 0 0 8px rgba(255,255,255,0.3), 0 0 16px rgba(255,255,255,0.15)',
                animation: 'kaustubh-flicker 4s ease-in-out infinite',
              }}
            >
              Kaustubh
            </p>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 pt-8 border-t border-white/[0.04]">
          {/* Sessions */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#8a8078] mb-4 font-[var(--font-inter)]">
              Sessions
            </p>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-xs text-[#8a8078]/70 hover:text-[#e8e0d4] transition-colors duration-300 font-[var(--font-inter)] font-light">
                  All Sessions
                </a>
              </li>
              <li>
                <button onClick={() => openWhatsAppModal('Pattern Snapshot (₹999)')} className="text-xs text-[#8a8078]/70 hover:text-[#e8e0d4] transition-colors duration-300 font-[var(--font-inter)] font-light text-left">
                  Pattern Snapshot
                </button>
              </li>
              <li>
                <button onClick={() => openWhatsAppModal('Relationship Decode')} className="text-xs text-[#8a8078]/70 hover:text-[#e8e0d4] transition-colors duration-300 font-[var(--font-inter)] font-light text-left">
                  Relationship Decode
                </button>
              </li>
              <li>
                <button onClick={() => openWhatsAppModal('Emotional Decode')} className="text-xs text-[#8a8078]/70 hover:text-[#e8e0d4] transition-colors duration-300 font-[var(--font-inter)] font-light text-left">
                  Emotional Decode
                </button>
              </li>
              <li>
                <button onClick={() => openWhatsAppModal('Shadow Work')} className="text-xs text-[#8a8078]/70 hover:text-[#e8e0d4] transition-colors duration-300 font-[var(--font-inter)] font-light text-left">
                  Shadow Work
                </button>
              </li>
            </ul>
          </div>

          {/* Knowledge */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#8a8078] mb-4 font-[var(--font-inter)]">
              Knowledge
            </p>
            <ul className="space-y-2">
              {[
                { label: 'Pattern Atlas', href: '#dangerous-knowledge' },
                { label: 'The Mirror Method', href: '#method' },
                { label: 'Long-form Guides', href: '#dangerous-knowledge' },
                { label: 'Pattern Library', href: '#dangerous-knowledge' },
              ].map(item => (
                <li key={item.label}>
                  <a href={item.href} className="text-xs text-[#8a8078]/70 hover:text-[#e8e0d4] transition-colors duration-300 font-[var(--font-inter)] font-light">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* The Practice */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#8a8078] mb-4 font-[var(--font-inter)]">
              The Practice
            </p>
            <ul className="space-y-2">
              <li><a href="#top" className="text-xs text-[#8a8078]/70 hover:text-[#e8e0d4] transition-colors duration-300 font-[var(--font-inter)] font-light">About AstroKalki</a></li>
              <li><a href="#method" className="text-xs text-[#8a8078]/70 hover:text-[#e8e0d4] transition-colors duration-300 font-[var(--font-inter)] font-light">Methodology</a></li>
              <li><a href="#testimonials" className="text-xs text-[#8a8078]/70 hover:text-[#e8e0d4] transition-colors duration-300 font-[var(--font-inter)] font-light">Testimonials</a></li>
              <li><a href="#assessment" className="text-xs text-[#8a8078]/70 hover:text-[#e8e0d4] transition-colors duration-300 font-[var(--font-inter)] font-light">Assessment</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#8a8078] mb-4 font-[var(--font-inter)]">
              Connect
            </p>
            <ul className="space-y-2">
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-xs text-[#8a8078]/70 hover:text-[#c9a96e] transition-colors duration-300 font-[var(--font-inter)] font-light flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="text-xs text-[#8a8078]/70 hover:text-[#c9a96e] transition-colors duration-300 font-[var(--font-inter)] font-light flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  YouTube
                </a>
              </li>
              <li>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-xs text-[#8a8078]/70 hover:text-[#c9a96e] transition-colors duration-300 font-[var(--font-inter)] font-light flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  Instagram
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="text-xs text-[#8a8078]/70 hover:text-[#c9a96e] transition-colors duration-300 font-[var(--font-inter)] font-light flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                  Email
                </a>
              </li>
              <li>
                <a href="tel:+918920862931" className="text-xs text-[#8a8078]/70 hover:text-[#e8e0d4] transition-colors duration-300 font-[var(--font-inter)] font-light">
                  +91 89208 62931
                </a>
              </li>
              <li>
                <button onClick={() => openWhatsAppModal()} className="text-xs text-[#c9a96e]/70 hover:text-[#c9a96e] transition-colors duration-300 font-[var(--font-inter)] font-light text-left">
                  Book a Session →
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/[0.04]">
          <p className="text-[10px] text-[#8a8078]/50 font-[var(--font-inter)]">
            &copy; 2026 AstroKalki. All patterns reserved. Founded by Kaustubh.
          </p>
          <p className="text-[10px] text-[#8a8078]/50 font-[var(--font-inter)]">
            The Pattern Intelligence System™ · Vedic Psychology · Depth Work
          </p>
        </div>
      </div>

      {/* Kaustubh neon flicker keyframes */}
      <style>{`
        @keyframes kaustubh-flicker {
          0%, 100% { opacity: 1; }
          45% { opacity: 1; }
          47% { opacity: 0.85; }
          49% { opacity: 1; }
          52% { opacity: 0.9; }
          55% { opacity: 1; }
          75% { opacity: 1; }
          77% { opacity: 0.8; }
          79% { opacity: 1; }
        }
      `}</style>
    </footer>
  );
}
