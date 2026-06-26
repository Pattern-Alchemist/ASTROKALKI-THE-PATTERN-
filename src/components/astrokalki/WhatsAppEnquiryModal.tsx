'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * WhatsAppEnquiryModal — chart analysis enquiry form
 *
 * Collects: name, birth details (date/time/place), biggest challenge,
 * preferred service. On submit, compiles into a WhatsApp message and
 * opens wa.me link with prefilled text.
 *
 * Phone: +91 89208 62931
 */

const WHATSAPP_PHONE = '918920862931';
const SERVICES = [
  'Pattern Snapshot (₹999)',
  'Deep Dive (₹4,999)',
  'Dharma Navigation (₹9,999)',
  "Warrior's Journey (Custom)",
  'Not sure yet',
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  prefillService?: string;
}

export default function WhatsAppEnquiryModal({ isOpen, onClose, prefillService }: Props) {
  const [form, setForm] = useState({
    name: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    challenge: '',
    service: prefillService || '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!form.name.trim()) return;

    const message = `*AstroKalki Enquiry*

*Name:* ${form.name}
*Birth Date:* ${form.birthDate || 'Not provided'}
*Birth Time:* ${form.birthTime || 'Not provided'}
*Birth Place:* ${form.birthPlace || 'Not provided'}

*Biggest Challenge:*
${form.challenge || 'Not specified'}

*Preferred Service:* ${form.service || 'Not specified'}

I'd like to book a consultation. Please share available slots.`;

    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setForm({ name: '', birthDate: '', birthTime: '', birthPlace: '', challenge: '', service: '' });
    }, 2000);
  };

  const inputClass = "w-full px-3 py-2.5 bg-[#050505] border border-white/[0.06] focus:border-[#c9a96e]/40 outline-none text-[11px] text-[#f5f3f0] font-[var(--font-inter)]";
  const labelClass = "text-[8px] tracking-[0.2em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] font-medium block mb-1";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-[#0a0a0a] border border-[#c9a96e]/30 max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/[0.04]">
              <div>
                <p className="text-[8px] tracking-[0.25em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)] font-medium">
                  Chart Analysis Enquiry
                </p>
                <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold mt-0.5">
                  Begin Your Pattern Decode
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-[#8a8078] hover:text-[#f5f3f0] text-xl leading-none"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-[32px] mb-3 text-[#7da87a]">✓</div>
                  <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold mb-2">
                    Opening WhatsApp...
                  </p>
                  <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)]">
                    Your enquiry is being sent to +91 89208 62931
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] font-light leading-relaxed">
                    Fill in your details. We&apos;ll compile them into a WhatsApp message and send it directly to our team. Your chart analysis starts here.
                  </p>

                  <div>
                    <label className={labelClass}>Your Name *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Your full name"
                      className={inputClass}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>Birth Date</label>
                      <input
                        type="date"
                        value={form.birthDate}
                        onChange={e => setForm({ ...form, birthDate: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Birth Time</label>
                      <input
                        type="time"
                        value={form.birthTime}
                        onChange={e => setForm({ ...form, birthTime: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Birth Place</label>
                    <input
                      type="text"
                      value={form.birthPlace}
                      onChange={e => setForm({ ...form, birthPlace: e.target.value })}
                      placeholder="City, State, Country"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Biggest Challenge (one sentence)</label>
                    <textarea
                      value={form.challenge}
                      onChange={e => setForm({ ...form, challenge: e.target.value })}
                      placeholder="What pattern keeps repeating in your life?"
                      rows={2}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Preferred Service</label>
                    <select
                      value={form.service}
                      onChange={e => setForm({ ...form, service: e.target.value })}
                      className={inputClass}
                    >
                      <option value="">Select a service</option>
                      {SERVICES.map(s => (
                        <option key={s} value={s} className="bg-[#050505]">{s}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={!form.name.trim()}
                    className="w-full px-4 py-3 text-[10px] tracking-[0.2em] uppercase font-[var(--font-inter)] font-semibold bg-[#c9a96e] text-[#050505] hover:bg-[#d4b87a] disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Send via WhatsApp
                  </button>

                  <p className="text-[8px] text-[#8a8078]/40 font-[var(--font-inter)] italic text-center">
                    Opens WhatsApp with your details prefilled. No data stored on our servers.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
