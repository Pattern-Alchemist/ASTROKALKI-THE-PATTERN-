'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Check } from 'lucide-react';
import SiteModalListener from '@/components/astrokalki/SiteModalListener';

export const dynamicParams = true;

interface CampaignConfig {
  campaign: string;
  headline: string;
  subheadline: string;
  painPoint: string;
  painPointDetails: string[];
  primaryCTA: string;
  testimonialName: string;
  testimonialRole: string;
  testimonialQuote: string;
  offer: string;
  offerPrice: string;
  offerDescription: string;
  faqs: Array<{ q: string; a: string }>;
  metaTitle: string;
  metaDescription: string;
}

const campaigns: Record<string, CampaignConfig> = {
  'repeating-heartbreak': {
    campaign: 'repeating-heartbreak',
    headline: 'REPEATING HEARTBREAK is not bad luck.',
    subheadline: 'It is a familiar emotional blueprint.',
    painPoint: 'Why do you keep attracting the same type of partner?',
    painPointDetails: [
      'You recognize the red flags mid-relationship. But you stay anyway.',
      "The pattern feels inevitable. Like you're being pulled toward it.",
      "Therapy helped you understand it. But understanding didn't change it.",
      "You're tired of blaming yourself. You want to break the cycle.",
    ],
    primaryCTA: 'Begin Pattern Snapshot',
    testimonialName: 'Priya M.',
    testimonialRole: 'Relationship Coach',
    testimonialQuote: "I thought I was choosing wrong partners. The session showed me I was choosing the same wound, again and again. Within a week, my dating decisions felt completely different.",
    offer: 'Pattern Snapshot',
    offerPrice: '₹999',
    offerDescription: 'A 45-minute tactical decoding of your relationship blueprint. See the exact pattern, why it was created, and how to interrupt it.',
    faqs: [
      {
        q: 'How is this different from therapy?',
        a: "Therapy explores your past over time. This reveals the invisible blueprint running your present. You'll recognize patterns in the first 15 minutes that therapy might take months to uncover.",
      },
      {
        q: 'Will this actually change my dating life?',
        a: "Yes. Most clients report that the moment a pattern is named, it loses its invisible power. You'll start recognizing it in real time, which means you can choose differently.",
      },
      {
        q: 'What do I need to bring?',
        a: "Your birth date, time, and place. That's it. Your chart will reveal the relationship blueprint you've been living.",
      },
      {
        q: 'Is this guaranteed to work?',
        a: "Nothing is guaranteed. But if you're willing to see the pattern, the pattern becomes changeable. Most clients experience a shift within 48 hours.",
      },
      {
        q: 'What if my birth time is unknown?',
        a: 'We can still do a session with your approximate birth time. The insights are still profound, just less precise around timing.',
      },
    ],
    metaTitle: 'Why You Keep Attracting The Same Partner | Pattern Snapshot',
    metaDescription: 'Stop blaming yourself. Your relationship pattern is written in your birth chart. Decode it in 45 minutes with AstroKalki Pattern Snapshot.',
  },
  'career-stagnation': {
    campaign: 'career-stagnation',
    headline: 'SAME JOB. SAME BURNOUT.',
    subheadline: 'Different title, same invisible trap.',
    painPoint: 'Why does your career keep hitting a ceiling?',
    painPointDetails: [
      "You're good at what you do. But you're trapped in a role that exhausts you.",
      "You've switched jobs twice. The burnout followed you.",
      "You know what needs to change. But you can't seem to make the move.",
      'Your potential feels locked behind an invisible wall.',
    ],
    primaryCTA: 'Begin Dharma Navigation',
    testimonialName: 'Arjun S.',
    testimonialRole: 'Product Manager',
    testimonialQuote: 'I thought the problem was the job. Turns out the problem was that I was choosing jobs that matched my self-sabotage pattern. Once I saw it, everything changed. I finally took the leap into entrepreneurship.',
    offer: 'Dharma Navigation',
    offerPrice: '₹9,999',
    offerDescription: 'A 2-hour deep consultation mapping your constitutional career blueprint, your actual calling, and the exact steps to align your work life with your dharma.',
    faqs: [
      {
        q: 'Is this a career counseling session?',
        a: "No. Career counseling tells you what jobs exist. Dharma Navigation shows you which jobs match your actual nature. It's the difference between finding a job and finding your calling.",
      },
      {
        q: "I've already had career coaching. Why is this different?",
        a: 'Because most career advice ignores why you sabotage yourself. Your birth chart reveals the exact pattern keeping you stuck. Fix the pattern, and the career naturally shifts.',
      },
      {
        q: 'How soon can I expect a change?',
        a: 'Most clients report clarity within days. Real change depends on your willingness to act. But the direction is usually crystal clear after one session.',
      },
      {
        q: "What if I don't know what I want to do?",
        a: "That's actually common. Your chart reveals what you're naturally designed to do. It's not about finding your passion — it's about recognizing your dharma.",
      },
      {
        q: 'Can this help me negotiate better?',
        a: 'It can. But more importantly, it helps you recognize which roles to say no to. That alone changes your career trajectory.',
      },
    ],
    metaTitle: 'Break Your Career Pattern | Dharma Navigation Consultation',
    metaDescription: "Your career ceiling isn't real. Decode your actual calling and the pattern keeping you stuck with Dharma Navigation.",
  },
  'self-sabotage': {
    campaign: 'self-sabotage',
    headline: 'YOUR SHADOW is choosing your life.',
    subheadline: 'Even when you know better, you still choose the familiar pain.',
    painPoint: 'Why do you sabotage yourself?',
    painPointDetails: [
      'You self-destruct right before success. Like clockwork.',
      'You know what you need to do. But something inside stops you.',
      "You're your own worst enemy. And you're exhausted by the war inside you.",
      "Other people don't get why you do this. You don't get why you do this either.",
    ],
    primaryCTA: 'Begin Deep Dive',
    testimonialName: 'Meera K.',
    testimonialRole: 'Entrepreneur',
    testimonialQuote: "I finally understood that my sabotage wasn't random. It was a protection mechanism from childhood. The moment I saw it written in my chart, I could stop fighting with myself.",
    offer: 'Deep Dive',
    offerPrice: '₹4,999',
    offerDescription: 'A 90-minute deep exploration of your sabotage architecture, shadow patterns, behavioral cycles, and a personalized strategy to interrupt the loop.',
    faqs: [
      {
        q: 'Is self-sabotage something I can actually fix?',
        a: 'Yes. But first you have to see it clearly. Your chart shows the exact pattern and why your psyche created it. Understanding the why makes the fix possible.',
      },
      {
        q: 'Why do I keep doing this to myself?',
        a: 'Your sabotage pattern was created as protection. It kept you safe once. Your birth chart shows when and why. Knowing this transforms everything.',
      },
      {
        q: 'Will this session be depressing?',
        a: 'The opposite. Most clients feel relief. Finally, your behavior makes sense. That clarity is liberating.',
      },
      {
        q: 'How long until I stop sabotaging?',
        a: "Awareness changes behavior instantly. You'll notice yourself catching the pattern in real time within days. Actual behavioral change usually stabilizes within 4-6 weeks.",
      },
      {
        q: "What if I don't want to change?",
        a: "That's okay too. Sometimes we're not ready. But the fact that you're here suggests some part of you is ready. That's enough to begin.",
      },
    ],
    metaTitle: 'Break Your Self-Sabotage Pattern | Deep Dive Consultation',
    metaDescription: "Stop fighting yourself. Your sabotage pattern is written in your birth chart. See it, understand it, stop it.",
  },
  'shadow-work': {
    campaign: 'shadow-work',
    headline: 'THE SELF YOU REFUSE TO SEE is running your life.',
    subheadline: "Every choice you make is shaped by what you won't look at.",
    painPoint: 'What are you not seeing about yourself?',
    painPointDetails: [
      'You attract the same conflicts, with different people.',
      'Others say things about you that you refuse to acknowledge.',
      'You judge harshly in others what you refuse to see in yourself.',
      'Your growth has plateaued. And you do not know why.',
    ],
    primaryCTA: 'Begin Deep Dive',
    testimonialName: 'Vikram B.',
    testimonialRole: 'Spiritual Practitioner',
    testimonialQuote: 'Shadow work changed everything. Not by being gentle, but by being honest. My chart showed me exactly what I was running from. I finally stopped running.',
    offer: 'Deep Dive',
    offerPrice: '₹4,999',
    offerDescription: 'A comprehensive shadow mapping session revealing your disowned patterns, rejected aspects, and a framework for integration and wholeness.',
    faqs: [
      {
        q: 'Is shadow work dangerous?',
        a: "Only if you're not ready. But integrating your shadow is the path to real power. Your chart shows whether you're ready and what to expect.",
      },
      {
        q: "What if I don't want to look?",
        a: 'That&apos;s the shadow working. The resistance itself is the answer. We work with that resistance, not against it.',
      },
      {
        q: 'How does this differ from shadow work courses?',
        a: 'Generic shadow work is abstract. This is specific to you. Your birth chart pinpoints exactly which shadow to work with.',
      },
      {
        q: 'Will this make me feel bad?',
        a: 'Temporarily, maybe. But the outcome is freedom. Most clients say they feel lighter, more whole, more real than they ever have.',
      },
      {
        q: 'What is my shadow really?',
        a: "Everything you've rejected in yourself. Usually the opposite of who you think you are. Your chart shows it clearly.",
      },
    ],
    metaTitle: 'Shadow Work & Psychological Integration | Deep Dive',
    metaDescription: "Integrate your shadow. Your birth chart shows exactly what you're running from and how to stop.",
  },
  'pattern-audit': {
    campaign: 'pattern-audit',
    headline: 'STOP GUESSING. Audit your pattern.',
    subheadline: 'See all your patterns in one place.',
    painPoint: 'What pattern is running your life?',
    painPointDetails: [
      'You know something is repeating. But you&apos;re not sure what it is.',
      'You want to understand yourself better, faster.',
      'You&apos;re curious but not sure where to start.',
      'You want a comprehensive map of your psychological blueprint.',
    ],
    primaryCTA: 'Begin Pattern Audit',
    testimonialName: 'Sanya M.',
    testimonialRole: 'Software Engineer',
    testimonialQuote: "The Pattern Audit gave me a bird's-eye view of my entire life architecture. I finally understood how all my patterns connected. Game-changing.",
    offer: 'Pattern Audit',
    offerPrice: '₹999',
    offerDescription: 'A comprehensive 45-minute session mapping your complete pattern landscape across relationships, career, behavior, and decision-making.',
    faqs: [
      {
        q: 'What exactly is a pattern audit?',
        a: "It's a complete scan of your psychological blueprint. We look at your relationship patterns, career patterns, behavioral loops, and decision-making patterns all together.",
      },
      {
        q: 'How is this different from a Pattern Snapshot?',
        a: 'Pattern Snapshot focuses on one pattern deeply. Pattern Audit shows you all your patterns and how they connect.',
      },
      {
        q: 'Is this good for beginners?',
        a: 'Perfect for beginners. It gives you the full map so you can choose which pattern to go deep on next.',
      },
      {
        q: 'How long does the audit take?',
        a: 'About 45 minutes. You&apos;ll walk away with a clear understanding of your complete pattern landscape.',
      },
      {
        q: 'Can I do this if I know nothing about astrology?',
        a: 'Absolutely. You do not need any background. We&apos;ll explain everything as we go.',
      },
    ],
    metaTitle: 'Complete Pattern Audit | See Your Full Psychological Blueprint',
    metaDescription: "Stop guessing what's running your life. Get a complete audit of all your patterns in 45 minutes.",
  },
};

export default function CampaignLandingPage({
  params,
}: {
  params: Promise<{ campaign: string }>;
}) {
  const [campaign, setCampaign] = useState<CampaignConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  useEffect(() => {
    params.then((p) => {
      const config = campaigns[p.campaign];
      if (config) {
        setCampaign(config);
        // Track page view
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'page_view', {
            page_path: `/lp/${p.campaign}`,
            page_title: config.metaTitle,
          });
        }
      }
      setLoading(false);
    });
  }, [params]);

  if (loading || !campaign) {
    return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-[#e8e0d4]">Loading...</div>;
  }

  const handleCTAClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        value: campaign.offerPrice.replace('₹', ''),
        currency: 'INR',
        transaction_id: `${campaign.campaign}-${Date.now()}`,
      });
    }
    // Trigger WhatsApp modal
    const event = new CustomEvent('open-whatsapp-modal', {
      detail: { campaign: campaign.campaign, offer: campaign.offer },
    });
    window.dispatchEvent(event);
  };

  return (
    <>
      <a href="#main-content" className="skip-to-content">Skip to content</a>
      
      <main id="main-content" className="bg-[#050505] text-[#e8e0d4] overflow-x-hidden">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-5 md:px-12 pt-20 pb-12 relative">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-1/4 w-64 h-64 bg-[#c9a96e]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-[#c9a96e]/5 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-4xl text-center">
            <div className="mb-6 inline-block">
              <div className="text-sm font-medium text-[#c9a96e] uppercase tracking-widest">For you</div>
            </div>

            <h1 className="text-5xl md:text-7xl font-serif font-medium mb-6 text-balance leading-tight">
              {campaign.headline}
            </h1>

            <p className="text-xl md:text-2xl text-[#b8ada0] mb-8 text-balance leading-relaxed">
              {campaign.subheadline}
            </p>

            <button
              onClick={handleCTAClick}
              className="bg-[#c9a96e] text-[#050505] px-8 md:px-12 py-4 md:py-5 text-lg font-medium hover:bg-[#dab88f] transition-colors duration-300 inline-block mb-8"
            >
              {campaign.primaryCTA}
            </button>

            <div className="flex items-center justify-center gap-2 text-sm text-[#8a8078]">
              <span>👉</span>
              <span>No payment required. Pattern Consultation only.</span>
            </div>
          </div>

          <ChevronDown className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce w-6 h-6 text-[#c9a96e]" />
        </section>

        {/* Pain Point Section */}
        <section className="py-20 md:py-32 px-5 md:px-12 bg-[#080808] border-t border-white/[0.04]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-12 text-balance">
              {campaign.painPoint}
            </h2>

            <ul className="space-y-6">
              {campaign.painPointDetails.map((detail, i) => (
                <li key={i} className="flex gap-4">
                  <div className="text-[#c9a96e] text-xl flex-shrink-0">✓</div>
                  <p className="text-lg text-[#b8adb0] leading-relaxed">{detail}</p>
                </li>
              ))}
            </ul>

            <div className="mt-12 pt-12 border-t border-white/[0.04]">
              <p className="text-[#8a8078] mb-6">This is not about willpower. This is about pattern recognition.</p>
              <button
                onClick={handleCTAClick}
                className="bg-[#c9a96e] text-[#050505] px-8 py-4 text-base font-medium hover:bg-[#dab88f] transition-colors duration-300"
              >
                {campaign.primaryCTA}
              </button>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-20 md:py-32 px-5 md:px-12 bg-[#050505]">
          <div className="max-w-3xl mx-auto">
            <div className="border border-white/[0.08] p-8 md:p-12 bg-[#0a0a0a]">
              <p className="text-lg md:text-xl text-[#e8e0d4] mb-6 italic leading-relaxed">
                &quot;{campaign.testimonialQuote}&quot;
              </p>
              <div>
                <p className="font-medium text-[#c9a96e]">{campaign.testimonialName}</p>
                <p className="text-sm text-[#8a8078]">{campaign.testimonialRole}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Offer Section */}
        <section className="py-20 md:py-32 px-5 md:px-12 bg-[#080808] border-t border-white/[0.04]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-8">What you get:</h2>

            <div className="bg-[#0a0a0a] border border-white/[0.08] p-8 md:p-12 mb-8">
              <div className="flex items-start justify-between mb-6 pb-6 border-b border-white/[0.04]">
                <div>
                  <h3 className="text-2xl font-medium mb-2">{campaign.offer}</h3>
                  <p className="text-[#8a8078]">{campaign.offerDescription}</p>
                </div>
                <div className="text-3xl font-medium text-[#c9a96e] whitespace-nowrap ml-8">{campaign.offerPrice}</div>
              </div>

              <ul className="space-y-3">
                <li className="flex gap-3 items-start">
                  <Check className="w-5 h-5 text-[#c9a96e] flex-shrink-0 mt-0.5" />
                  <span>Personalized pattern analysis</span>
                </li>
                <li className="flex gap-3 items-start">
                  <Check className="w-5 h-5 text-[#c9a96e] flex-shrink-0 mt-0.5" />
                  <span>Clear, actionable insights</span>
                </li>
                <li className="flex gap-3 items-start">
                  <Check className="w-5 h-5 text-[#c9a96e] flex-shrink-0 mt-0.5" />
                  <span>Follow-up strategy</span>
                </li>
                <li className="flex gap-3 items-start">
                  <Check className="w-5 h-5 text-[#c9a96e] flex-shrink-0 mt-0.5" />
                  <span>Lifetime access to session notes</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleCTAClick}
              className="w-full bg-[#c9a96e] text-[#050505] px-8 py-5 text-lg font-medium hover:bg-[#dab88f] transition-colors duration-300"
            >
              Reserve Your Spot — {campaign.offerPrice}
            </button>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 md:py-32 px-5 md:px-12 bg-[#050505]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-12">Questions?</h2>

            <div className="space-y-4">
              {campaign.faqs.map((faq, i) => (
                <div
                  key={i}
                  className="border border-white/[0.08] bg-[#0a0a0a] overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === i ? null : i)}
                    className="w-full px-6 md:px-8 py-5 md:py-6 flex items-center justify-between hover:bg-[#141414] transition-colors duration-300"
                  >
                    <span className="text-lg font-medium text-left">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#c9a96e] flex-shrink-0 transition-transform duration-300 ${
                        expandedFAQ === i ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>

                  {expandedFAQ === i && (
                    <div className="px-6 md:px-8 py-6 md:py-8 border-t border-white/[0.04] bg-[#080808]">
                      <p className="text-[#b8adb0] leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 md:py-32 px-5 md:px-12 bg-[#080808] border-t border-white/[0.04]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6">Ready to see your pattern?</h2>
            <p className="text-lg text-[#8a8078] mb-8">
              Start with a conversation. No commitment, no payment. Just clarity.
            </p>
            <button
              onClick={handleCTAClick}
              className="bg-[#c9a96e] text-[#050505] px-8 md:px-12 py-4 md:py-5 text-lg font-medium hover:bg-[#dab88f] transition-colors duration-300 inline-block"
            >
              Begin {campaign.offer}
            </button>
            <p className="text-sm text-[#8a8078] mt-6">
              <Link href="/" className="underline hover:text-[#c9a96e] transition-colors">
                ← Back to home
              </Link>
            </p>
          </div>
        </section>
      </main>

      <SiteModalListener />
    </>
  );
}
