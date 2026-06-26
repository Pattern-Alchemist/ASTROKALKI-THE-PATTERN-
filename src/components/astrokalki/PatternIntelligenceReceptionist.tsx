'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from './hooks/useReducedMotion';

/**
 * PatternIntelligenceReceptionist — Live Demo of the WhatsApp AI Agent
 *
 * Implements the operational blueprint as an interactive web prototype.
 * Pure scripted demo: deterministic state machine, no LLM API calls.
 *
 * Layout: Two-column on desktop
 *   - Left:  Chat interface (visitor + AI messages)
 *   - Right: Analyst dashboard (live scores, CRM, stage, handoff)
 *
 * Three preset personas + free-text mode with keyword routing.
 */

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────
type Stage =
  | 'WELCOME'
  | 'Q1_PATTERN'
  | 'Q2_DURATION'
  | 'Q3_PAST'
  | 'Q4_OUTCOME'
  | 'DEMOGRAPHIC'
  | 'RECOMMEND'
  | 'BOOKING'
  | 'CONFIRMED'
  | 'REFUSAL'
  | 'HANDOFF';

type Pattern =
  | 'relationship' | 'career' | 'purpose' | 'family' | 'exhaustion'
  | 'sabotage' | 'money' | 'identity' | 'decision' | null;

type Duration = 'months' | 'years' | 'childhood' | 'always' | null;
type PastAttempt = 'therapy' | 'coaching' | 'astrology' | 'meditation' | 'nothing' | 'everything' | null;
type Service = 'snapshot' | 'deepdive' | 'dharma' | 'warriors' | null;

interface Message {
  id: string;
  sender: 'visitor' | 'ai' | 'system';
  text: string;
  timestamp: number;
}

interface Scores {
  awareness: number;
  need: number;
  urgency: number;
  readiness: number;
  buyingIntent: number;
  decisionStage: number;
}

interface CrmFields {
  name: string | null;
  age: string | null;
  country: string | null;
  occupation: string | null;
  relationshipStatus: string | null;
  biggestChallenge: string | null;
  budget: string | null;
  preferredService: string | null;
  preferredTime: string | null;
  birthDetails: string | null;
}

interface Persona {
  id: string;
  name: string;
  description: string;
  // Scripted visitor messages keyed by stage
  script: Partial<Record<Stage, string>>;
  // Pre-set scoring weights for this persona
  baseScores: Partial<Scores>;
  // Pre-set CRM fields
  baseCrm: Partial<CrmFields>;
  // Final recommended service
  finalService: Service;
}

// ─────────────────────────────────────────────────────────────
// DATA: Personas
// ─────────────────────────────────────────────────────────────
const PERSONAS: Persona[] = [
  {
    id: 'priya',
    name: 'Priya, 32, Mumbai',
    description: 'Relationship pattern · years · tried therapy · ready to book',
    script: {
      Q1_PATTERN: 'Same relationship, different person. I keep picking partners who abandon me.',
      Q2_DURATION: 'Years. Since my early twenties.',
      Q3_PAST: 'Therapy — quit after 6 months. Astrology — felt generic. Read a lot.',
      Q4_OUTCOME: 'I want to stop picking partners who abandon me.',
      DEMOGRAPHIC: 'Priya, 32, Mumbai, marketing manager, single, under ₹5k budget, weekday evening',
    },
    baseScores: { awareness: 85, need: 80, urgency: 65, readiness: 70, buyingIntent: 75, decisionStage: 80 },
    baseCrm: { name: 'Priya', age: '32', country: 'India', occupation: 'Marketing Manager', relationshipStatus: 'Single' },
    finalService: 'snapshot',
  },
  {
    id: 'arjun',
    name: 'Arjun, 28, Bangalore',
    description: 'Career confusion · months · personality tests · just exploring',
    script: {
      Q1_PATTERN: 'I think I\'m in the wrong career but I don\'t know what to do instead.',
      Q2_DURATION: 'Few months. Since a promotion I didn\'t really want.',
      Q3_PAST: 'Talked to friends. Took a personality test. Nothing really helped.',
      Q4_OUTCOME: 'Honestly just exploring right now. Not sure I\'m ready to make a change.',
      DEMOGRAPHIC: 'Arjun, 28, Bangalore, software engineer, single, under ₹1k budget, weekend',
    },
    baseScores: { awareness: 60, need: 50, urgency: 50, readiness: 40, buyingIntent: 25, decisionStage: 30 },
    baseCrm: { name: 'Arjun', age: '28', country: 'India', occupation: 'Software Engineer', relationshipStatus: 'Single' },
    finalService: null, // Routed to nurture, no booking
  },
  {
    id: 'meera',
    name: 'Meera, 41, Delhi',
    description: 'Self-sabotage · years · tried everything · ready for transformation',
    script: {
      Q1_PATTERN: 'I keep sabotaging myself. I ruin good things. Relationships, work, money — all of it.',
      Q2_DURATION: 'Years. Since childhood, honestly.',
      Q3_PAST: 'Everything. Therapy, coaching, astrology, meditation. I\'ve done it all.',
      Q4_OUTCOME: 'I want deep transformation. I\'m ready to change everything.',
      DEMOGRAPHIC: 'Meera, 41, Delhi, entrepreneur, divorced, ₹10k+ budget, weekday morning',
    },
    baseScores: { awareness: 90, need: 95, urgency: 80, readiness: 85, buyingIntent: 90, decisionStage: 90 },
    baseCrm: { name: 'Meera', age: '41', country: 'India', occupation: 'Entrepreneur', relationshipStatus: 'Divorced' },
    finalService: 'warriors', // Triggers human handoff
  },
];

// ─────────────────────────────────────────────────────────────
// DATA: Static lookups
// ─────────────────────────────────────────────────────────────
const PATTERN_OPTIONS: { id: Pattern; label: string }[] = [
  { id: 'relationship', label: 'Relationship' },
  { id: 'career', label: 'Career' },
  { id: 'purpose', label: 'Purpose' },
  { id: 'family', label: 'Family' },
  { id: 'exhaustion', label: 'Emotional exhaustion' },
  { id: 'sabotage', label: 'Self-sabotage' },
  { id: 'money', label: 'Money' },
  { id: 'identity', label: 'Identity' },
  { id: 'decision', label: 'Decision paralysis' },
];

const DURATION_OPTIONS: { id: Duration; label: string }[] = [
  { id: 'months', label: 'Months' },
  { id: 'years', label: 'Years' },
  { id: 'childhood', label: 'Since childhood' },
  { id: 'always', label: 'As long as I can remember' },
];

const PAST_OPTIONS: { id: PastAttempt; label: string }[] = [
  { id: 'therapy', label: 'Therapy' },
  { id: 'coaching', label: 'Coaching' },
  { id: 'astrology', label: 'Astrology' },
  { id: 'meditation', label: 'Meditation' },
  { id: 'nothing', label: 'Nothing' },
  { id: 'everything', label: 'Everything' },
];

const SERVICE_INFO: Record<Exclude<Service, null>, { name: string; price: string; duration: string }> = {
  snapshot: { name: 'Pattern Snapshot', price: '₹999', duration: '45 min' },
  deepdive: { name: 'Deep Dive', price: '₹4,999', duration: '90 min' },
  dharma: { name: 'Dharma Navigation', price: '₹9,999', duration: '120 min' },
  warriors: { name: 'Warrior\'s Journey', price: 'Custom', duration: '3 months' },
};

const SCORE_LABELS: { key: keyof Scores; label: string; shortLabel: string }[] = [
  { key: 'awareness', label: 'Pattern Awareness', shortLabel: 'Awareness' },
  { key: 'need', label: 'Need', shortLabel: 'Need' },
  { key: 'urgency', label: 'Urgency', shortLabel: 'Urgency' },
  { key: 'readiness', label: 'Readiness', shortLabel: 'Readiness' },
  { key: 'buyingIntent', label: 'Buying Intent', shortLabel: 'Buying' },
  { key: 'decisionStage', label: 'Decision Stage', shortLabel: 'Stage' },
];

const CRM_FIELDS: { key: keyof CrmFields; label: string }[] = [
  { key: 'name', label: 'Name' },
  { key: 'age', label: 'Age' },
  { key: 'country', label: 'Country' },
  { key: 'occupation', label: 'Occupation' },
  { key: 'relationshipStatus', label: 'Relationship Status' },
  { key: 'biggestChallenge', label: 'Biggest Challenge' },
  { key: 'budget', label: 'Budget' },
  { key: 'preferredService', label: 'Preferred Service' },
  { key: 'preferredTime', label: 'Preferred Time' },
  { key: 'birthDetails', label: 'Birth Details' },
];

const STAGE_LABELS: Record<Stage, string> = {
  WELCOME: 'Welcome',
  Q1_PATTERN: 'Q1 · Pattern',
  Q2_DURATION: 'Q2 · Duration',
  Q3_PAST: 'Q3 · Past Attempts',
  Q4_OUTCOME: 'Q4 · Outcome',
  DEMOGRAPHIC: 'Demographic Capture',
  RECOMMEND: 'Recommendation',
  BOOKING: 'Booking Offer',
  CONFIRMED: 'Booking Confirmed',
  REFUSAL: 'Refusal Redirect',
  HANDOFF: 'Human Handoff',
};

// ─────────────────────────────────────────────────────────────
// AI RESPONSE GENERATORS (scripted)
// ─────────────────────────────────────────────────────────────
function getWelcomeMessage(adContext?: string): string {
  if (adContext) {
    return `I noticed you came from our ${adContext} campaign. That's a strong signal — most people who click that ad are working with a specific recurring pattern.\n\nWhich feels most familiar?\n\n1. Same relationship, different person\n2. Fear of abandonment\n3. Toxic attraction\n4. Emotional confusion`;
  }
  return `Welcome to AstroKalki.\n\nWe don't predict the future — we decode the recurring patterns already shaping it.\n\nI can help you:\n• Identify your recurring life pattern\n• Recommend the right consultation\n• Answer questions about our methodology\n• Schedule an appointment\n\nTo begin, tell me in one sentence:\n\nWhat pattern keeps repeating in your life?`;
}

function getAutoResponse(pattern: Pattern): string {
  switch (pattern) {
    case 'relationship':
      return 'Most relationship pain isn\'t caused by choosing the wrong person. It\'s usually caused by repeating the same unconscious selection pattern — the same emotional signature that feels familiar, even when it hurts. AstroKalki focuses on identifying that pattern before trying to change your relationships.';
    case 'career':
      return 'Career confusion is rarely about the job itself. It\'s often a conflict between your behavioural conditioning — what you were taught to value — and your natural Dharma, the work your constitution is actually built for. The friction you feel is the gap between the two.';
    case 'sabotage':
      return 'Most self-sabotage isn\'t laziness or weakness. It\'s protective programming built earlier in life — a strategy that once kept you safe and is now running on outdated inputs. The sabotage feels irrational because the original context is gone, but the program is still running.';
    case 'family':
      return 'Parental conditioning often creates identity patterns that continue long after childhood. These aren\'t things you "inherited" metaphorically — they\'re behavioural scripts you learned by watching, absorbed before you had language for them.';
    case 'purpose':
      return 'Purpose confusion usually signals a disconnection from your constitutional design — what Vedic psychology calls Dharma. The search for purpose often fails because it\'s approached as a choice rather than a recognition.';
    case 'exhaustion':
      return 'Emotional exhaustion is rarely about volume — it\'s usually about friction. You\'re spending energy against an internal pattern that resists your direction. The exhaustion is the symptom; the pattern is the cause.';
    case 'money':
      return 'Money patterns are almost never about money. They\'re usually a multi-domain pattern involving identity, self-worth, and often inherited family scripts around scarcity or self-punishment.';
    case 'identity':
      return 'Identity crises usually arise when the constructed self — who you decided to be in your twenties — no longer fits the constitutional self that\'s been underneath all along. The friction is the gap becoming visible.';
    case 'decision':
      return 'Decision paralysis is rarely about the decision itself. It\'s almost always a signal that two patterns are in conflict — both want different things, and neither will yield. The work is to identify the patterns, not to overpower the paralysis.';
    default:
      return 'Thank you for sharing that. Let me understand this more precisely.';
    }
}

function getQ2Prompt(): string {
  return 'How long has this repeated?\n\n• Months\n• Years\n• Since childhood\n• As long as I can remember';
}

function getQ3Prompt(): string {
  return 'What have you already tried?\n\n• Therapy\n• Coaching\n• Astrology\n• Meditation\n• Nothing\n• Everything';
}

function getQ4Prompt(): string {
  return 'What outcome are you hoping for? (in one or two sentences)';
}

function getRecommendation(service: Service, compositeScore: number): string {
  if (!service) {
    return `Based on what you\'ve shared, I\'d suggest starting with our free Dharma assessment on astrokalki.com — it\'ll give you a constitutional map and a starting point.\n\nI\'ll also send you a short piece on patterns next week, no pressure. If you want to go deeper after that, the Pattern Snapshot consultation (₹999) is the right next step.`;
  }
  if (service === 'warriors') {
    return `What you\'re describing — a readiness for deep transformation across multiple domains — is exactly what the Warrior\'s Journey was designed for. It\'s our 3-month application-only programme.\n\nBecause it\'s application-only and limited-availability, I\'d like to connect you with our team directly to share the application and answer your questions. Shall I do that?`;
  }
  const info = SERVICE_INFO[service];
  return `Based on what you\'ve described, I\'d recommend the ${info.name} — a ${info.duration} session where we ${service === 'snapshot' ? 'map the pattern precisely and identify the intervention point' : service === 'deepdive' ? 'map the full karmic architecture across multiple domains' : 'map your constitutional design and decision framework'}.\n\nIt\'s ${info.price}. Shall I show you available slots?`;
}

function getRefusalScript(topic: string): string {
  const scripts: Record<string, string> = {
    lottery: 'AstroKalki doesn\'t predict lottery numbers or gambling outcomes. That\'s not what we do — and any service that claims to is lying. What we can do is identify the pattern behind why you\'re seeking a windfall.',
    death: 'AstroKalki doesn\'t predict death — that\'s not within our scope, and any claim to do so is irresponsible. If you\'re facing mortality anxiety, we can explore that as a pattern.',
    medical: 'AstroKalki is not a medical service. We don\'t diagnose or treat. For medical concerns, please consult a qualified physician. What we can explore is the psychological pattern around your health concern.',
    marriage: 'We don\'t predict when you\'ll meet someone — that\'s not how patterns work. What we can map is the selection pattern that has shaped your relationships so far. Most people who ask that question are working with a specific relationship pattern — would you like to explore that?',
    wealth: 'Wealth isn\'t something we predict. The more useful question is the pattern behind your relationship with money — and that\'s something we can map precisely.',
    curse: 'AstroKalki doesn\'t work with curses or black magic — those frameworks aren\'t part of our methodology. The pattern you\'re experiencing is psychological, not supernatural, and we can examine it as such.',
    default: 'That\'s outside what we do. What we can do is identify the recurring psychological pattern behind what you\'re describing. Would you like to explore that?',
  };
  return scripts[topic] || scripts.default;
}

function detectForbiddenTopic(text: string): string | null {
  const lower = text.toLowerCase();
  if (/lottery|gamble|bet|casino|jackpot/.test(lower)) return 'lottery';
  if (/when will i die|death timing|predict.*death/.test(lower)) return 'death';
  if (/medical|diagnose|disease|illness|treatment/.test(lower)) return 'medical';
  if (/when will i (get married|meet someone|find love)|marriage timing/.test(lower)) return 'marriage';
  if (/will i be rich|when will i be wealthy|wealth timing/.test(lower)) return 'wealth';
  if (/curse|black magic|evil eye|jadu tona/.test(lower)) return 'curse';
  return null;
}

function detectPattern(text: string): Pattern {
  const lower = text.toLowerCase();
  if (/relationship|partner|boyfriend|girlfriend|spouse|husband|wife|abandon|breakup|ex /.test(lower)) return 'relationship';
  if (/career|job|work|promotion|profession/.test(lower)) return 'career';
  if (/purpose|dharma|meaning|calling/.test(lower)) return 'purpose';
  if (/parent|mother|father|family|childhood/.test(lower)) return 'family';
  if (/exhaust|tired|burnout|drained|depleted/.test(lower)) return 'exhaustion';
  if (/sabotage|self.?destruct|ruin|destroy/.test(lower)) return 'sabotage';
  if (/money|wealth|financial|debt|income/.test(lower)) return 'money';
  if (/identity|who am i|lost myself|don't know myself/.test(lower)) return 'identity';
  if (/decision|choose|paralysis|stuck|can't decide/.test(lower)) return 'decision';
  return 'relationship'; // default
}

function detectDuration(text: string): Duration {
  const lower = text.toLowerCase();
  if (/month/.test(lower)) return 'months';
  if (/year/.test(lower)) return 'years';
  if (/childhood|since i was (young|a kid|small)/.test(lower)) return 'childhood';
  if (/always|forever|as long as/.test(lower)) return 'always';
  return 'years';
}

function detectPast(text: string): PastAttempt {
  const lower = text.toLowerCase();
  if (/therapy|therapist|counseling|counselor/.test(lower)) return 'therapy';
  if (/coaching|coach|mentor/.test(lower)) return 'coaching';
  if (/astrology|astrologer|chart|horoscope/.test(lower)) return 'astrology';
  if (/meditation|meditate|mindfulness|vipassana/.test(lower)) return 'meditation';
  if (/nothing|haven't tried|didn't try/.test(lower)) return 'nothing';
  if (/everything|all of it|tried it all/.test(lower)) return 'everything';
  return 'nothing';
}

function recommendService(pattern: Pattern, duration: Duration, past: PastAttempt, outcome: string): Service {
  const lower = outcome.toLowerCase();
  // Warrior's Journey: deep transformation signal
  if (/deep transformation|change everything|3.?month|warrior|ready to change/.test(lower)) return 'warriors';
  // Dharma Navigation: purpose/career with specific outcome
  if (pattern === 'purpose' || (pattern === 'career' && /purpose|dharma|direction|meaning/.test(lower))) return 'dharma';
  // Deep Dive: multi-year patterns, relationship repeating, sabotage, money
  if (pattern === 'relationship' && duration === 'years') return 'deepdive';
  if (pattern === 'sabotage' && (duration === 'years' || duration === 'childhood')) return 'deepdive';
  if (pattern === 'family') return 'deepdive';
  if (pattern === 'money') return 'deepdive';
  if (pattern === 'identity') return 'deepdive';
  // Pattern Snapshot: tactical first step
  return 'snapshot';
}

// ─────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────
export default function PatternIntelligenceReceptionist() {
  const prefersReduced = useReducedMotion();
  const [messages, setMessages] = useState<Message[]>([]);
  const [stage, setStage] = useState<Stage>('WELCOME');
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  const [visitorInput, setVisitorInput] = useState('');
  const [scores, setScores] = useState<Scores>({
    awareness: 0, need: 0, urgency: 0, readiness: 0, buyingIntent: 0, decisionStage: 0,
  });
  const [crm, setCrm] = useState<CrmFields>({
    name: null, age: null, country: null, occupation: null,
    relationshipStatus: null, biggestChallenge: null, budget: null,
    preferredService: null, preferredTime: null, birthDetails: null,
  });
  const [recommendedService, setRecommendedService] = useState<Service>(null);
  const [humanTakeoverActive, setHumanTakeoverActive] = useState(false);
  const [showHandoffNotice, setShowHandoffNotice] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const messageCounter = useRef(0);

  const compositeScore = Math.round(
    (scores.awareness + scores.need + scores.urgency + scores.readiness + scores.buyingIntent + scores.decisionStage) / 6
  );

  // ─── Auto-scroll to bottom on new message ───
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'end' });
    }
  }, [messages, prefersReduced]);

  // ─── Initialize with welcome ───
  useEffect(() => {
    if (messages.length === 0) {
      addAiMessage(getWelcomeMessage());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addMessage = useCallback((sender: Message['sender'], text: string) => {
    messageCounter.current += 1;
    setMessages(prev => [...prev, {
      id: `m-${messageCounter.current}`,
      sender,
      text,
      timestamp: Date.now(),
    }]);
  }, []);

  const addAiMessage = useCallback((text: string, delay = 500) => {
    setTimeout(() => addMessage('ai', text), delay);
  }, [addMessage]);

  const addSystemMessage = useCallback((text: string) => {
    addMessage('system', text);
  }, [addMessage]);

  // ─── Reset conversation ───
  const reset = () => {
    setMessages([]);
    setStage('WELCOME');
    setSelectedPersona(null);
    setVisitorInput('');
    setScores({ awareness: 0, need: 0, urgency: 0, readiness: 0, buyingIntent: 0, decisionStage: 0 });
    setCrm({
      name: null, age: null, country: null, occupation: null,
      relationshipStatus: null, biggestChallenge: null, budget: null,
      preferredService: null, preferredTime: null, birthDetails: null,
    });
    setRecommendedService(null);
    setHumanTakeoverActive(false);
    setShowHandoffNotice(false);
    messageCounter.current = 0;
    setTimeout(() => addMessage('ai', getWelcomeMessage()), 100);
  };

  // ─── Persona selection ───
  const handlePersonaSelect = (persona: Persona) => {
    setSelectedPersona(persona.id);
    // Apply base scores and CRM
    setScores(prev => ({ ...prev, ...persona.baseScores }));
    setCrm(prev => ({ ...prev, ...persona.baseCrm }));
    addSystemMessage(`Scenario loaded: ${persona.name} — ${persona.description}`);
  };

  // ─── Main message handler ───
  const handleVisitorMessage = (text: string) => {
    if (!text.trim()) return;
    addMessage('visitor', text);

    // Check for forbidden topics first
    const forbidden = detectForbiddenTopic(text);
    if (forbidden) {
      setStage('REFUSAL');
      addAiMessage(getRefusalScript(forbidden));
      return;
    }

    // Route based on current stage
    setTimeout(() => {
      routeByStage(text);
    }, 300);
  };

  const routeByStage = (visitorText: string) => {
    switch (stage) {
      case 'WELCOME':
      case 'Q1_PATTERN': {
        const pattern = detectPattern(visitorText);
        addAiMessage(getAutoResponse(pattern), 600);
        setTimeout(() => {
          addAiMessage(getQ2Prompt(), 1400);
          setStage('Q2_DURATION');
          // Update scores: pattern language detected
          if (/keep|recurring|same pattern|repeating|cycle/.test(visitorText.toLowerCase())) {
            setScores(prev => ({ ...prev, awareness: Math.min(100, prev.awareness + 20) }));
          }
        }, 1800);
        break;
      }
      case 'Q2_DURATION': {
        const duration = detectDuration(visitorText);
        addAiMessage(getQ3Prompt(), 600);
        setStage('Q3_PAST');
        // Update urgency score
        const urgencyBoost = duration === 'months' ? 25 : duration === 'years' ? 15 : 5;
        setScores(prev => ({ ...prev, urgency: Math.min(100, prev.urgency + urgencyBoost) }));
        break;
      }
      case 'Q3_PAST': {
        const past = detectPast(visitorText);
        addAiMessage(getQ4Prompt(), 600);
        setStage('Q4_OUTCOME');
        // Update readiness score
        const readinessBoost = past === 'therapy' || past === 'coaching' ? 25 : past === 'meditation' ? 15 : past === 'nothing' ? 5 : 20;
        setScores(prev => ({ ...prev, readiness: Math.min(100, prev.readiness + readinessBoost) }));
        break;
      }
      case 'Q4_OUTCOME': {
        // Update decision stage based on specificity
        const lower = visitorText.toLowerCase();
        const decisionBoost = /specific|stop|change|transform|work with|ready/.test(lower) ? 25 : 10;
        setScores(prev => ({ ...prev, decisionStage: Math.min(100, prev.decisionStage + decisionBoost) }));

        // Capture biggest challenge
        setCrm(prev => ({ ...prev, biggestChallenge: visitorText.slice(0, 80) }));

        // Recommend service — find first visitor message (the pattern response)
        const firstVisitorMsg = messages.find(m => m.sender === 'visitor');
        const pattern = detectPattern(firstVisitorMsg?.text || visitorText);
        const duration = detectDuration(messages[messages.length - 3]?.text || 'years');
        const past = detectPast(messages[messages.length - 2]?.text || 'nothing');
        const service = recommendService(pattern, duration, past, visitorText);

        setTimeout(() => {
          addAiMessage('Thank you. Before I recommend the right next step, I\'d like to capture a few details so we can tailor this properly.', 500);
          setTimeout(() => {
            addAiMessage('Could you share:\n• Your name and age\n• City\n• Occupation\n• Budget range (under ₹1k / ₹1-5k / ₹5-10k / ₹10k+)\n• Preferred consultation time (weekday morning/afternoon/evening, or weekend)', 1400);
            setStage('DEMOGRAPHIC');
          }, 2000);
        }, 800);
        break;
      }
      case 'DEMOGRAPHIC': {
        // Parse demographic info from visitor text
        const lower = visitorText.toLowerCase();
        const nameMatch = visitorText.match(/^([A-Z][a-z]+)/);
        const ageMatch = visitorText.match(/(\d{2})/);
        const budgetMatch = lower.match(/(under .?1k|1.?5k|5.?10k|10k\+|₹?\d{3,})/);

        setCrm(prev => ({
          ...prev,
          name: nameMatch ? nameMatch[1] : prev.name,
          age: ageMatch ? ageMatch[1] : prev.age,
          country: prev.country || 'India',
          budget: budgetMatch ? budgetMatch[1] : prev.budget,
          preferredTime: /morning/.test(lower) ? 'Weekday morning' : /afternoon/.test(lower) ? 'Weekday afternoon' : /evening/.test(lower) ? 'Weekday evening' : /weekend/.test(lower) ? 'Weekend' : prev.preferredTime,
        }));

        // Boost buying intent
        if (budgetMatch) {
          setScores(prev => ({ ...prev, buyingIntent: Math.min(100, prev.buyingIntent + 20) }));
        }

        // Determine final recommendation based on accumulated context
        const pattern = detectPattern(messages.find(m => m.sender === 'visitor')?.text || 'relationship');
        const finalService = selectedPersona
          ? PERSONAS.find(p => p.id === selectedPersona)?.finalService || 'snapshot'
          : recommendService(pattern, 'years', 'therapy', visitorText);

        setRecommendedService(finalService);
        setCrm(prev => ({ ...prev, preferredService: finalService ? SERVICE_INFO[finalService].name : 'Free assessment' }));

        setTimeout(() => {
          const composite = Math.round(
            (scores.awareness + scores.need + scores.urgency + scores.readiness + scores.buyingIntent + scores.decisionStage) / 6
          );

          if (finalService === 'warriors') {
            addAiMessage(getRecommendation('warriors', composite), 500);
            setStage('HANDOFF');
            setShowHandoffNotice(true);
          } else if (composite > 60 && finalService) {
            addAiMessage(getRecommendation(finalService, composite), 500);
            setStage('BOOKING');
          } else {
            addAiMessage(getRecommendation(null, composite), 500);
            setStage('CONFIRMED'); // Nurture path — conversation complete
          }
        }, 800);
        break;
      }
      case 'BOOKING': {
        const lower = visitorText.toLowerCase();
        if (/yes|sure|ok|show me|available|slots/.test(lower)) {
          addAiMessage('Here are this week\'s available slots (all times IST):\n\n• Wed 14:00\n• Thu 11:00\n• Fri 16:30\n\nWhich works for you?', 500);
          setStage('CONFIRMED');
        } else if (/no|later|not now/.test(lower)) {
          addAiMessage('No problem. I\'ll send you a short note next week with a relevant case study. Whenever you\'re ready, just reply here.', 500);
          setStage('CONFIRMED');
        } else {
          // Treat as slot selection
          const slotMatch = visitorText.match(/(wed|thu|fri)/i);
          if (slotMatch) {
            const day = slotMatch[1].charAt(0).toUpperCase() + slotMatch[1].slice(1).toLowerCase();
            addAiMessage(`Confirmed — ${day} with our team.\n\nHere\'s your payment link: [payment-link]\n\nOnce payment completes, you\'ll receive a calendar invite and a 24-hour reminder. Looking forward to mapping this pattern with you.`, 500);
            setStage('CONFIRMED');
          } else {
            addAiMessage('Shall I show you available slots? Yes or no?', 500);
          }
        }
        break;
      }
      case 'CONFIRMED':
      case 'HANDOFF':
      case 'REFUSAL': {
        // Conversation complete; ignore further input
        addAiMessage('This conversation has concluded. Click "Reset Conversation" to start a new demo.', 300);
        break;
      }
      default:
        break;
    }
  };

  // ─── Auto-advance persona script ───
  const autoAdvance = () => {
    if (!selectedPersona) return;
    const persona = PERSONAS.find(p => p.id === selectedPersona);
    if (!persona) return;

    const scriptForStage = persona.script[stage];
    if (scriptForStage) {
      handleVisitorMessage(scriptForStage);
    } else if (stage === 'DEMOGRAPHIC') {
      handleVisitorMessage(persona.script.DEMOGRAPHIC || 'Priya, 32, Mumbai, marketing manager, single, under ₹5k, weekday evening');
    } else if (stage === 'BOOKING') {
      handleVisitorMessage('Yes, show me slots');
    } else if (stage === 'HANDOFF') {
      handleVisitorMessage('Yes, connect me');
    }
  };

  // ─── Human takeover ───
  const triggerHumanTakeover = () => {
    setHumanTakeoverActive(true);
    setShowHandoffNotice(true);
    addSystemMessage('⚠ HUMAN HANDOFF TRIGGERED — operator notified');
    addAiMessage('I\'m bringing our team into this conversation now. They\'ll respond within 2 hours. Thank you for your patience.', 500);
    setStage('HANDOFF');
  };

  // ─── Render ───
  return (
    <section className="bg-[#050505] py-14 md:py-20 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        {/* Header */}
        <div className="mb-8">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)] mb-3">
            Live Demo · Pattern Intelligence Receptionist
          </p>
          <h2 className="font-[var(--font-cormorant)] text-2xl md:text-4xl font-bold tracking-[-0.02em] text-[#f5f3f0] mb-3">
            The AI <span className="italic font-light">receptionist</span>, in action
          </h2>
          <p className="text-xs md:text-sm text-[#8a8078] font-[var(--font-inter)] font-light max-w-2xl">
            A working prototype of the WhatsApp AI agent from the operational blueprint. Three preset scenarios — or type your own messages. The analyst dashboard updates in real time. Pure scripted demo, no LLM calls.
          </p>
        </div>

        {/* Persona selector */}
        <div className="mb-6">
          <span className="text-[8px] tracking-[0.2em] uppercase text-[#8a8078]/50 font-[var(--font-inter)] block mb-2">
            Load Scenario
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {PERSONAS.map(p => (
              <button
                key={p.id}
                onClick={() => handlePersonaSelect(p)}
                disabled={stage !== 'WELCOME' && selectedPersona !== p.id}
                className={`p-3 border text-left transition-all duration-200 ${
                  selectedPersona === p.id
                    ? 'border-[#c9a96e] bg-[#c9a96e]/5'
                    : 'border-white/[0.04] hover:border-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed'
                }`}
              >
                <span className={`text-[10px] font-[var(--font-cormorant)] font-bold block ${selectedPersona === p.id ? 'text-[#c9a96e]' : 'text-[#f5f3f0]'}`}>
                  {p.name}
                </span>
                <span className="text-[8px] text-[#8a8078]/60 font-[var(--font-inter)] italic mt-1 block leading-relaxed">
                  {p.description}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4">
          {/* Chat panel */}
          <div className="border border-white/[0.04] bg-[#0a0a0a]/50 flex flex-col" style={{ height: '600px' }}>
            {/* WhatsApp-style header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.04] bg-[#080808]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#c9a96e]/20 border border-[#c9a96e]/40 flex items-center justify-center">
                  <span className="text-[10px] text-[#c9a96e] font-[var(--font-cormorant)] font-bold">A</span>
                </div>
                <div>
                  <p className="text-[11px] text-[#f5f3f0] font-[var(--font-inter)] font-medium">AstroKalki Intelligence</p>
                  <p className="text-[8px] text-[#8a8078]/50 font-[var(--font-inter)]">online · Pattern Recognition Concierge</p>
                </div>
              </div>
              <button
                onClick={reset}
                className="text-[8px] tracking-[0.15em] uppercase text-[#8a8078]/50 hover:text-[#c9a96e] font-[var(--font-inter)] transition-colors"
              >
                Reset
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ scrollbarWidth: 'thin' }}>
              {messages.map(m => (
                <motion.div
                  key={m.id}
                  initial={prefersReduced ? undefined : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${m.sender === 'visitor' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={
                    m.sender === 'visitor'
                      ? 'max-w-[75%] bg-[#c9a96e]/15 border border-[#c9a96e]/30 px-3 py-2'
                      : m.sender === 'system'
                        ? 'max-w-[90%] bg-[#a07050]/10 border border-[#a07050]/30 px-3 py-2 text-center'
                        : 'max-w-[80%] bg-[#111111] border border-white/[0.06] px-3 py-2'
                  }>
                    <p className={`text-[11px] font-[var(--font-inter)] leading-relaxed whitespace-pre-wrap ${
                      m.sender === 'visitor' ? 'text-[#f5f3f0]' : m.sender === 'system' ? 'text-[#a07050]' : 'text-[#f5f3f0]/90'
                    }`}>
                      {m.text}
                    </p>
                    <p className={`text-[7px] mt-1 font-[var(--font-inter)] ${
                      m.sender === 'visitor' ? 'text-[#c9a96e]/50 text-right' : m.sender === 'system' ? 'text-[#a07050]/60' : 'text-[#8a8078]/40'
                    }`}>
                      {new Date(m.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Quick options for current stage */}
            {(stage === 'Q1_PATTERN' || stage === 'Q2_DURATION' || stage === 'Q3_PAST') && (
              <div className="px-4 py-2 border-t border-white/[0.04] bg-[#080808]">
                <div className="flex flex-wrap gap-1.5">
                  {(stage === 'Q1_PATTERN' ? PATTERN_OPTIONS : stage === 'Q2_DURATION' ? DURATION_OPTIONS : PAST_OPTIONS).map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => handleVisitorMessage(opt.label)}
                      className="px-2.5 py-1 text-[9px] font-[var(--font-inter)] border border-white/[0.06] text-[#8a8078]/70 hover:border-[#c9a96e]/40 hover:text-[#c9a96e] transition-all"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-3 border-t border-white/[0.04] bg-[#080808]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={visitorInput}
                  onChange={e => setVisitorInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && visitorInput.trim()) {
                      handleVisitorMessage(visitorInput);
                      setVisitorInput('');
                    }
                  }}
                  placeholder={stage === 'CONFIRMED' || stage === 'HANDOFF' || stage === 'REFUSAL' ? 'Conversation complete — reset to start a new demo' : 'Type as the visitor...'}
                  disabled={stage === 'CONFIRMED' || stage === 'HANDOFF' || stage === 'REFUSAL'}
                  className="flex-1 bg-[#050505] border border-white/[0.06] focus:border-[#c9a96e]/40 outline-none px-3 py-2 text-[11px] text-[#f5f3f0] font-[var(--font-inter)] disabled:opacity-40"
                />
                {selectedPersona && stage !== 'CONFIRMED' && stage !== 'HANDOFF' && stage !== 'REFUSAL' && (
                  <button
                    onClick={autoAdvance}
                    className="px-3 py-2 text-[9px] tracking-[0.15em] uppercase font-[var(--font-inter)] font-medium border border-[#c9a96e]/40 text-[#c9a96e] hover:bg-[#c9a96e]/10 transition-all"
                  >
                    Auto ▶
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Analyst dashboard */}
          <div className="border border-white/[0.04] bg-[#0a0a0a]/50 flex flex-col overflow-y-auto" style={{ maxHeight: '600px', scrollbarWidth: 'thin' }}>
            <div className="px-4 py-3 border-b border-white/[0.04] bg-[#080808]">
              <p className="text-[10px] font-[var(--font-inter)] font-medium text-[#f5f3f0]">Analyst Dashboard</p>
              <p className="text-[8px] text-[#8a8078]/50 font-[var(--font-inter)] mt-0.5">Live lead intelligence</p>
            </div>

            {/* Current stage */}
            <div className="px-4 py-3 border-b border-white/[0.04]">
              <span className="text-[8px] tracking-[0.2em] uppercase text-[#8a8078]/50 font-[var(--font-inter)] block mb-1">
                Current Stage
              </span>
              <p className="text-[12px] font-[var(--font-cormorant)] font-bold text-[#c9a96e]">
                {STAGE_LABELS[stage]}
              </p>
            </div>

            {/* Composite score */}
            <div className="px-4 py-3 border-b border-white/[0.04]">
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-[8px] tracking-[0.2em] uppercase text-[#8a8078]/50 font-[var(--font-inter)]">
                  Composite Score
                </span>
                <span className={`text-[18px] font-[var(--font-cormorant)] font-bold tabular-nums ${
                  compositeScore > 80 ? 'text-[#7da87a]' : compositeScore > 60 ? 'text-[#c9a96e]' : compositeScore > 40 ? 'text-[#a07050]' : 'text-[#8a8078]'
                }`}>
                  {compositeScore}
                </span>
              </div>
              <div className="h-1.5 bg-white/[0.04] relative overflow-hidden">
                <motion.div
                  className="h-full"
                  style={{ background: compositeScore > 80 ? '#7da87a' : compositeScore > 60 ? '#c9a96e' : compositeScore > 40 ? '#a07050' : '#8a8078' }}
                  animate={{ width: `${compositeScore}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <p className="text-[8px] text-[#8a8078]/40 font-[var(--font-inter)] italic mt-1">
                {compositeScore > 80 ? 'Book immediately' : compositeScore > 60 ? 'Recommend + book' : compositeScore > 40 ? 'Educate further' : compositeScore > 20 ? 'Newsletter + assessment' : 'Assessment only'}
              </p>
            </div>

            {/* Score breakdown */}
            <div className="px-4 py-3 border-b border-white/[0.04]">
              <span className="text-[8px] tracking-[0.2em] uppercase text-[#8a8078]/50 font-[var(--font-inter)] block mb-2">
                Score Breakdown
              </span>
              <div className="space-y-1.5">
                {SCORE_LABELS.map(s => (
                  <div key={s.key}>
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="text-[9px] text-[#8a8078] font-[var(--font-inter)]">{s.shortLabel}</span>
                      <span className="text-[9px] text-[#f5f3f0]/70 font-[var(--font-inter)] tabular-nums">{scores[s.key]}</span>
                    </div>
                    <div className="h-0.5 bg-white/[0.04] relative overflow-hidden">
                      <motion.div
                        className="h-full bg-[#c9a96e]"
                        animate={{ width: `${scores[s.key]}%` }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Service recommendation */}
            <div className="px-4 py-3 border-b border-white/[0.04]">
              <span className="text-[8px] tracking-[0.2em] uppercase text-[#8a8078]/50 font-[var(--font-inter)] block mb-1.5">
                Recommended Service
              </span>
              {recommendedService ? (
                <div>
                  <p className="text-[12px] font-[var(--font-cormorant)] font-bold text-[#f5f3f0]">
                    {SERVICE_INFO[recommendedService].name}
                  </p>
                  <p className="text-[9px] text-[#c9a96e]/70 font-[var(--font-inter)] mt-0.5">
                    {SERVICE_INFO[recommendedService].price} · {SERVICE_INFO[recommendedService].duration}
                  </p>
                </div>
              ) : (
                <p className="text-[10px] text-[#8a8078]/40 font-[var(--font-inter)] italic">
                  Pending qualification
                </p>
              )}
            </div>

            {/* CRM fields */}
            <div className="px-4 py-3 border-b border-white/[0.04]">
              <span className="text-[8px] tracking-[0.2em] uppercase text-[#8a8078]/50 font-[var(--font-inter)] block mb-2">
                CRM Capture ({CRM_FIELDS.filter(f => crm[f.key]).length}/{CRM_FIELDS.length})
              </span>
              <div className="space-y-1">
                {CRM_FIELDS.map(f => {
                  const value = crm[f.key];
                  return (
                    <div key={f.key} className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${value ? 'bg-[#c9a96e]' : 'bg-[#3a3530]'}`} />
                      <span className="text-[8px] text-[#8a8078]/60 font-[var(--font-inter)] w-20 shrink-0">{f.label}</span>
                      <span className={`text-[8px] font-[var(--font-inter)] truncate ${value ? 'text-[#f5f3f0]/70' : 'text-[#8a8078]/30 italic'}`}>
                        {value || '—'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Handoff */}
            <div className="px-4 py-3">
              <button
                onClick={triggerHumanTakeover}
                disabled={humanTakeoverActive}
                className={`w-full px-3 py-2 text-[9px] tracking-[0.2em] uppercase font-[var(--font-inter)] font-medium border transition-all ${
                  humanTakeoverActive
                    ? 'border-[#a07050]/40 text-[#a07050] bg-[#a07050]/10 cursor-default'
                    : 'border-[#a07050]/40 text-[#a07050] hover:bg-[#a07050]/10'
                }`}
              >
                {humanTakeoverActive ? '✓ Operator Notified' : 'Trigger Human Handoff'}
              </button>
              <AnimatePresence>
                {showHandoffNotice && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 p-2 border border-[#a07050]/30 bg-[#a07050]/5"
                  >
                    <p className="text-[8px] text-[#a07050]/80 font-[var(--font-inter)]">
                      <b>Notification sent:</b> {crm.name || 'Visitor'} · {STAGE_LABELS[stage]} · {recommendedService ? SERVICE_INFO[recommendedService].name : 'N/A'}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="mt-4 text-[9px] text-[#8a8078]/40 font-[var(--font-inter)] italic">
          Pure scripted demo · No LLM API calls · All data stays in your browser · Based on the AstroKalki Operational Blueprint v1.0
        </p>
      </div>
    </section>
  );
}
