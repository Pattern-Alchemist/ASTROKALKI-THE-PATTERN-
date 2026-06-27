'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * EmailSignup (Section 4 · Owned Audience)
 *
 * Lead magnet. Exchange: user enters email → unlocks weekly Pattern
 * Intelligence email + full Pattern DNA evolution history.
 *
 * Stores email locally (privacy-positive). In production, this would
 * POST to /api/subscribe which integrates with email provider
 * (Mailchimp/ConvertKit/Listmonk). For now, simulates success.
 */

const STORAGE_KEY = 'astrokalki-email-signup';

export default function EmailSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'subscribed' | 'error'>('idle');
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);

  // Check on mount if already subscribed
  useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setAlreadySubscribed(true);
        setStatus('subscribed');
      }
    } catch {}
  });

  const subscribe = () => {
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      return;
    }

    setStatus('loading');

    // Simulate API call (in production: POST /api/subscribe)
    setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          email: email.trim(),
          subscribedAt: new Date().toISOString(),
        }));
      } catch {}
      setStatus('subscribed');
      setAlreadySubscribed(true);
    }, 800);
  };

  return (
    <div className="border border-[#c9a96e]/30 p-5 md:p-6 bg-gradient-to-br from-[#0a0a0a] to-[#050505]">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-[#c9a96e] rounded-full animate-pulse" />
        <span className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)] font-medium">
          The Weekly Pattern Intelligence Email
        </span>
      </div>
      <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold mb-1">
        Weekly intelligence, in your inbox.
      </p>
      <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] font-light mb-4 leading-relaxed">
        Every Sunday morning: one pattern insight, one question to sit with, one small intervention. No horoscopes. No manifesting. Just the recurring architecture, decoded. ~3 min read.
      </p>

      <AnimatePresence mode="wait">
        {status === 'subscribed' ? (
          <motion.div
            key="subscribed"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 border border-[#7da87a]/30 bg-[#7da87a]/[0.05] text-center"
          >
            <p className="text-[11px] text-[#7da87a] font-[var(--font-cormorant)] italic">
              {alreadySubscribed ? '✓ You\'re on the list.' : '✓ Subscribed. First email arrives Sunday.'}
            </p>
            <p className="text-[8px] text-[#8a8078]/50 font-[var(--font-inter)] mt-1">
              Check your inbox for confirmation.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col sm:flex-row gap-2 mb-3">
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setStatus('idle'); }}
                onKeyDown={e => e.key === 'Enter' && subscribe()}
                placeholder="you@email.com"
                disabled={status === 'loading'}
                className="flex-1 px-3 py-2.5 bg-[#050505] border border-white/[0.06] focus:border-[#c9a96e]/40 outline-none text-[11px] text-[#f5f3f0] font-[var(--font-inter)] disabled:opacity-50"
              />
              <button
                onClick={subscribe}
                disabled={status === 'loading' || !email.trim()}
                className="px-5 py-2.5 text-[9px] tracking-[0.2em] uppercase font-[var(--font-inter)] font-semibold bg-[#c9a96e] text-[#050505] hover:bg-[#d4b87a] disabled:opacity-30 disabled:cursor-not-allowed transition-all whitespace-nowrap"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>

            {status === 'error' && (
              <p className="text-[9px] text-[#a07050] font-[var(--font-inter)] italic mb-2">
                Please enter a valid email.
              </p>
            )}

            <p className="text-[8px] text-[#8a8078]/40 font-[var(--font-inter)] italic">
              One email per week. Unsubscribe in one click. We never share your email.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* What you get */}
      <div className="mt-5 pt-4 border-t border-white/[0.04]">
        <span className="text-[8px] tracking-[0.2em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] block mb-2">
          What You Get
        </span>
        <ul className="space-y-1.5">
          {[
            'One pattern insight — drawn from the week\'s most common reader question',
            'One question to sit with — designed to surface what\'s unconscious',
            'One small intervention — 60 seconds or less, applicable immediately',
            'First access to new Pattern Library articles before they publish',
          ].map((item, i) => (
            <li key={i} className="text-[9px] text-[#f5f3f0]/70 font-[var(--font-inter)] font-light leading-relaxed pl-3 relative">
              <span className="absolute left-0 text-[#c9a96e]/60">→</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
