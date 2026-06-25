import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Lock,
  X,
  Clock,
  Zap,
  Menu,
  Compass,
  Layers,
  Globe,
  Eye,
  Flame,
  Droplets,
  Wind,
  ShieldAlert,
  BookOpen,
  ArrowUpRight,
  FileText,
  User,
  Check,
  Play
} from "lucide-react";
import { PatternCard, FrameworkStep, ServiceCard, ArticleCard, DiagnosticReport } from "./types";

// Static Data conforming strictly to the requested architecture
const PATTERNS: PatternCard[] = [
  {
    id: "heartbreak",
    title: "Repeating Heartbreak",
    description: "Choosing the same ghost in different bodies.",
    illustrationSeed: "vibrant",
    shadowTriggerExamples: [
      "To be seen and rejected",
      "To absorb others' projections and lose yourself",
      "To repeat parental dynamics of validation-seeking"
    ]
  },
  {
    id: "sabotage",
    title: "Self-Sabotage",
    description: "Your intellect cannot override your nervous system.",
    illustrationSeed: "abstract",
    shadowTriggerExamples: [
      "Fear of full exposure or the 'imposter' discovery",
      "Unconscious guilt of outgrowing family origins",
      "Recreating familiar chaos to avoid quiet expansion"
    ]
  },
  {
    id: "ceiling",
    title: "The Glass Ceiling",
    description: "Stagnation is a symptom of an invisible program.",
    illustrationSeed: "architecture",
    shadowTriggerExamples: [
      "Fear of absolute authority and responsibility",
      "Equating peak success with sudden desertion",
      "Stuck in the 'helper' role instead of sovereign rule"
    ]
  },
  {
    id: "mask",
    title: "The Mask",
    description: "Performing a version of yourself you no longer recognize.",
    illustrationSeed: "face",
    shadowTriggerExamples: [
      "Equating performance with safety",
      "Hiding professional vulnerability under hyper-competence",
      "Terrified of stagnant silence without external applause"
    ]
  }
];

const METHOD_STEPS: FrameworkStep[] = [
  {
    step: "01",
    title: "Vedic Mapping",
    subtitle: "The Architecture of Tendency",
    description: "We chart your default elemental tendencies (Tejas, Apas, Vayu, Prithvi) and karmic gravity fields. We isolate your natural predispositions before life conditioned them."
  },
  {
    step: "02",
    title: "Depth Psychology",
    subtitle: "The Confrontation of Shadow",
    description: "Using rigorous Jungian clinical protocols, we extract the primary unconscious shadow triggers holding your behavioral patterns hostage under high-stakes pressure."
  },
  {
    step: "03",
    title: "Pattern Recognition",
    subtitle: "The Diagnosis of the Loop",
    description: "We overlay the Vedic blueprint with the Jungian shadow map. This isolates the precise mathematical trigger point where your intellect yields to your nervous system."
  },
  {
    step: "04",
    title: "Strategic Action",
    subtitle: "The Dharma Navigation",
    description: "We deploy rigorous behavioral strategies to override the loop. Not spiritual bypassing, but actionable dharma alignment that transforms resistance into raw, absolute leverage."
  }
];

const SERVICES: ServiceCard[] = [
  {
    id: "snapshot",
    title: "PATTERN SNAPSHOT",
    price: "₹999",
    description: "A 45-minute tactical decode of your primary loop.",
    duration: "45 Minutes",
    bullets: [
      "Isolation of primary nervous-system trigger",
      "Vedic elemental profiling summary",
      "1 tactical step to override immediate stagnation"
    ]
  },
  {
    id: "deepdive",
    title: "THE DEEP DIVE",
    price: "₹4,999",
    description: "Complete psychological architecture and 12-month roadmap.",
    duration: "2-Hour Diagnostic + Document",
    bullets: [
      "Rigorous 120-minute shadow confrontation session",
      "Complete Vedic blueprint mapping document",
      "12-month personal behavioral override roadmap",
      "Bi-weekly alignment tracking framework"
    ],
    badge: "MOST REQUESTED"
  },
  {
    id: "dharma",
    title: "DHARMA NAVIGATION",
    price: "₹9,999",
    description: "Strategic pivot for career and purpose alignment.",
    duration: "2 Complete Sessions",
    bullets: [
      "Professional bottleneck diagnosis",
      "Vedic-Jungian sovereignty blueprint",
      "Authority expansion and career re-architecting",
      "Private audio brief with direct executive directives"
    ]
  },
  {
    id: "warrior",
    title: "THE WARRIOR’S JOURNEY",
    price: "Custom",
    description: "Bespoke 3-month shadow work integration.",
    duration: "3-Month Advisory",
    bullets: [
      "Weekly private clinical advisory with AstroKalki",
      "Unlimited secure asynchronous voice/text access",
      "Real-time strategic intervention in high-stakes crises",
      "Bespoke physical/somatic ritual design"
    ],
    badge: "BESPOKE S-TIER"
  }
];

const ARTICLES: ArticleCard[] = [
  {
    id: "mother-wound",
    title: "The Mother Wound in the Chart",
    category: "Depth Vedic Psychology",
    excerpt: "How moon placements and early developmental holding environments establish the default nervous-system loop that misinterprets sacrifice for survival.",
    date: "June 14, 2026",
    readTime: "9 min read"
  },
  {
    id: "repeating-heartbreak",
    title: "Why We Choose the Same Heartbreak",
    category: "Shadow Archetypes",
    excerpt: "An investigation into our unconscious compulsion to recruit specific individuals to reenact unmet childhood needs, hoping for a different resolution.",
    date: "May 29, 2026",
    readTime: "12 min read"
  },
  {
    id: "spiritual-bypassing",
    title: "The Trap of Spiritual Bypassing",
    category: "High-Performance Critique",
    excerpt: "Why meditation, breathwork, and astrological placidity often act as elite defense mechanisms, allowing individuals to escape real material sovereignty.",
    date: "April 18, 2026",
    readTime: "7 min read"
  }
];

// Content for full magazine articles (simulating high-authority essays)
const ARTICLE_CONTENTS: Record<string, string[]> = {
  "mother-wound": [
    "In high-performance consulting, we frequently witness individuals who can command global boards but crumble under the weight of domestic expectations or parental triggers. In traditional Vedic architecture, the Moon (Chandra) is not a floating symbol of romance; it is the somatic foundation of the early mind—specifically, the maternal holding environment.",
    "When the early maternal environment is characterized by conditional warmth, the infant's nervous system couples survival with performance. You learn that your existence is valuable only when you are resolving chaos or achieving. This establishes a lifelong pattern of hyper-independence.",
    "Under Jungian analysis, this manifests as the 'Good Child Shadow.' The individual grows up to be a highly competent leader, yet their private life is a wasteland of exhaustion. They recruit partners who are weak, chaotic, or emotionally unavailable, repeating the childhood template of earning love. To break this, we must dismantle the unconscious belief that stillness equates to death."
  ],
  "repeating-heartbreak": [
    "We do not fall in love; we fall in familiarity. The unconscious mind has no interest in happiness; its only objective is resolution. If you were raised by a critic, your nervous system will find gentle partners boring, misinterpreting calm as a lack of chemistry.",
    "You will instead feel an electric, magnetic pull toward someone who reflects that familiar childhood critic. You tell yourself they are 'different' because of their face or credentials. Yet, within months, the same loop emerges. You are back on your knees, begging for emotional scraps.",
    "This is the compulsion to repeat—what Freud called the Wiederholungszwang. Jung understood that until you make the unconscious conscious, it will direct your life and you will call it fate. AstroKalki E) maps this loop precisely to show you that your choice in partners is actually a secure algorithm designed to keep you emotionally starved but comfortable."
  ],
  "spiritual-bypassing": [
    "The modern self-care industrial complex is an elite anesthetic. We see executives traveling to ashrams, drinking plant medicines, or repeating affirmations while their core psychological dynamics remain completely untouched.",
    "This is 'Spiritual Bypassing'—the usage of mystical systems or placid philosophies to avoid the brutal, necessary work of psychological integration. It is far easier to blame a transit of Saturn or clear an aura than it is to admit you are terrified of absolute authority, or that your ambition is driven by a deep sense of unworthiness.",
    "At AstroKalki E), we utilize Vedic Mapping not as a tool of prediction, but as a map of gravity. We do not offer escape routes. True sovereignty requires a clean, sober confrontation with the shadow. Your nervous system must be re-trained to tolerate high-stakes peace rather than high-stakes chaos."
  ]
};

export default function App() {
  // Navigation & State
  const [activeTab, setActiveTab] = useState<string>("home");
  const [assessmentOpen, setAssessmentOpen] = useState(false);
  const [activeMethodIndex, setActiveMethodIndex] = useState<number>(0);
  
  // Selected state for assessment pre-fill
  const [selectedPattern, setSelectedPattern] = useState<string>("");
  const [selectedElement, setSelectedElement] = useState<string>("Fire / Tejas");
  const [selectedShadow, setSelectedShadow] = useState<string>("To be seen and rejected");
  const [narrativeText, setNarrativeText] = useState<string>("");
  
  // Loading & Report states
  const [isDecoding, setIsDecoding] = useState(false);
  const [decodeStepText, setDecodeStepText] = useState("");
  const [diagnosticReport, setDiagnosticReport] = useState<DiagnosticReport | null>(null);
  
  // Magazine state
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  
  // Service Booking state
  const [bookingService, setBookingService] = useState<ServiceCard | null>(null);
  const [bookingForm, setBookingForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Trigger loading text cycle
  useEffect(() => {
    if (!isDecoding) return;
    const steps = [
      "DECODING THE ARCHITECTURE OF YOUR LOGIC...",
      "MAPPING KELD-GRAVITY FIELDS & TRANSITS...",
      "DESTRUCTURING UNCONSCIOUS JUNGIAN SHADOWS...",
      "CORRELATING VEDIC ARCHETYPES WITH NERVOUS SYSTEM REACTION..."
    ];
    let index = 0;
    setDecodeStepText(steps[0]);
    const interval = setInterval(() => {
      index++;
      if (index < steps.length) {
        setDecodeStepText(steps[index]);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, [isDecoding]);

  // Handle Assessment Launch with pre-selection
  const launchAssessment = (patternId?: string) => {
    if (patternId) {
      const match = PATTERNS.find(p => p.id === patternId);
      if (match) {
        setSelectedPattern(match.title);
        setSelectedShadow(match.shadowTriggerExamples[0]);
      }
    } else {
      setSelectedPattern(PATTERNS[0].title);
      setSelectedShadow(PATTERNS[0].shadowTriggerExamples[0]);
    }
    setDiagnosticReport(null);
    setAssessmentOpen(true);
  };

  // Submit assessment request to server
  const submitAssessment = async (e: FormEvent) => {
    e.preventDefault();
    setIsDecoding(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pattern: selectedPattern,
          element: selectedElement,
          shadowTrigger: selectedShadow,
          context: narrativeText
        })
      });
      const data = await response.json();
      if (data.success && data.report) {
        setDiagnosticReport(data.report);
      } else {
        throw new Error(data.error || "Failed to decode loop.");
      }
    } catch (err: any) {
      alert(err.message || "Decoder engine failed. Ensure server is running and your GEMINI_API_KEY is configured.");
    } finally {
      setIsDecoding(false);
    }
  };

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingService(null);
      setBookingForm({ name: "", email: "", phone: "", notes: "" });
    }, 3500);
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#F5F3F0] font-sans antialiased overflow-x-hidden selection:bg-[#C9A96E]/30 selection:text-[#F5F3F0]">
      {/* Film Grain overlay */}
      <div className="film-grain" />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#050505]/90 backdrop-blur-md border-b border-[#C9A96E]/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab("home")}>
            <span className="font-serif font-bold text-xl md:text-2xl tracking-[0.1em] text-[#C9A96E] glow-gold">
              ASTROKALKI E)
            </span>
            <div className="hidden sm:inline-block px-2.5 py-0.5 border border-[#C9A96E]/20 text-[9px] font-mono tracking-widest text-[#C9A96E] uppercase bg-[#C9A96E]/5 rounded">
              Authority Hub
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8 font-mono text-xs tracking-wider uppercase text-[#F5F3F0]/60">
            <a href="#mosaic" className="hover:text-[#C9A96E] transition">The Diagnosis</a>
            <a href="#method" className="hover:text-[#C9A96E] transition">The Method</a>
            <a href="#services" className="hover:text-[#C9A96E] transition">Services</a>
            <a href="#moat" className="hover:text-[#C9A96E] transition">Dangerous Knowledge</a>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => launchAssessment()}
              className="px-5 h-11 border border-[#C9A96E] text-[#C9A96E] hover:bg-[#C9A96E] hover:text-black transition text-xs tracking-widest font-mono uppercase bg-[#C9A96E]/5"
            >
              [BEGIN ANALYSIS]
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative min-h-[90vh] flex flex-col justify-end pb-16 md:pb-24 pt-20 px-6 overflow-hidden"
      >
        {/* Background Image of Eclipse/Shadow Figure with severe bottom-fade */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/eclipse_shadow_figure_1782395781663.jpg"
            alt="Shadow Figure under solar eclipse, Dune aesthetic, warm gold dust"
            className="w-full h-full object-cover object-center opacity-40 brightness-75 scale-105 transition-transform duration-10000"
            referrerPolicy="no-referrer"
          />
          {/* Heavy bottom and top gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
          {/* Authority Badge floating */}
          <div className="inline-flex items-center space-x-2 bg-black/60 border border-[#C9A96E]/30 rounded-full px-5 py-2.5 backdrop-blur-md">
            <span className="w-2 h-2 bg-[#C9A96E] rounded-full animate-pulse" />
            <span className="font-mono text-[10px] md:text-xs tracking-widest text-[#C9A96E] font-medium uppercase">
              2,400+ PATTERNS DECODED | 97% ACCURACY RATE
            </span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-[#F5F3F0] leading-none text-balance">
            SAME PATTERN.<br />
            <span className="text-[#C9A96E] italic font-normal">DIFFERENT FACE.</span>
          </h1>

          <p className="max-w-2xl mx-auto font-sans text-base md:text-lg text-[#F5F3F0]/80 leading-relaxed font-light">
            Vedic Intelligence meets Jungian Depth. We don't read stars; we decode the psychological DNA that keeps you in an unconscious cycle. Built for S-tier performers who demand absolute truth.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => launchAssessment()}
              className="w-full sm:w-auto px-10 h-16 bg-[#C9A96E] text-black hover:bg-[#C9A96E]/90 transition text-sm tracking-widest font-mono uppercase font-bold shadow-lg shadow-[#C9A96E]/10"
            >
              [BEGIN ANALYSIS]
            </button>
            <a
              href="#method"
              className="w-full sm:w-auto px-10 h-16 border border-[#F5F3F0]/30 hover:border-[#C9A96E] hover:text-[#C9A96E] transition text-sm tracking-widest font-mono uppercase flex items-center justify-center bg-black/40 backdrop-blur-sm"
            >
              [THE METHOD]
            </a>
          </div>
        </div>
      </motion.section>

      {/* SECTION 2: THE PATTERN MOSAIC (THE DIAGNOSIS) */}
      <motion.section 
        id="mosaic" 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-24 px-6 max-w-7xl mx-auto border-t border-[#C9A96E]/10"
      >
        <div className="text-center space-y-4 mb-16">
          <span className="font-mono text-xs tracking-widest text-[#C9A96E]/70 uppercase">
            SECTION 02 // RECURRING SYSTEMS
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
            THE ARCHITECTURE OF YOUR LOGIC
          </h2>
          <p className="max-w-2xl mx-auto text-sm text-[#F5F3F0]/60 font-light">
            Every stagnation points to an invisible program operating beneath your nervous system. Locate your primary cycle. Click on a tile to initiate immediate, direct decoding.
          </p>
        </div>

        {/* 2x2 Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PATTERNS.map((pattern, index) => (
            <motion.div
              key={pattern.id}
              onClick={() => launchAssessment(pattern.id)}
              whileHover={{ y: -4 }}
              className="group cursor-pointer relative overflow-hidden bg-[#0a0a0a] border border-[#C9A96E]/15 hover:border-[#C9A96E]/50 p-8 md:p-10 transition-all duration-300 rounded-lg flex flex-col justify-between min-h-[300px] shadow-lg shadow-black/40"
              style={{
                boxShadow: "inset 0 0 40px rgba(201, 169, 110, 0.02)"
              }}
            >
              {/* Gold dust subtle light-leak decoration on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#C9A96E]/0 via-[#C9A96E]/0 to-[#C9A96E]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#C9A96E] bg-[#C9A96E]/5 border border-[#C9A96E]/10 px-3 py-1 rounded">
                    0{index + 1} // LOOP TYPE
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#C9A96E]/5 border border-[#C9A96E]/10 flex items-center justify-center text-[#C9A96E] group-hover:bg-[#C9A96E] group-hover:text-black transition">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-serif text-2xl md:text-3xl font-bold group-hover:text-[#C9A96E] transition">
                  {pattern.title}
                </h3>
                <p className="font-serif text-lg text-[#F5F3F0]/80 italic group-hover:text-[#F5F3F0] transition font-light">
                  "{pattern.description}"
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#C9A96E]/10">
                <span className="font-mono text-[10px] text-[#C9A96E]/60 uppercase tracking-widest block mb-2">
                  Shadow manifestation triggers:
                </span>
                <ul className="space-y-1 text-xs text-[#F5F3F0]/50 font-light list-disc list-inside">
                  {pattern.shadowTriggerExamples.slice(0, 2).map((ex, i) => (
                    <li key={i}>{ex}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* SECTION 3: THE METHOD (THE PROPRIETARY SYSTEM) */}
      <motion.section 
        id="method" 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-24 bg-black/60 border-t border-b border-[#C9A96E]/10 overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/0 via-[#C9A96E]/2 to-[#050505]/0 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-20">
            <span className="font-mono text-xs tracking-widest text-[#C9A96E]/70 uppercase">
              SECTION 03 // THE PROPRIETARY CORE
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
              THE FOUR CORNERSTONES OF DECODING
            </h2>
            <p className="max-w-xl mx-auto text-sm text-[#F5F3F0]/60 font-light">
              We bridge the gap between ancient diagnostic science and depth psychological frameworks to construct a tactical bypass to your loop.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* The Golden Thread SVG/Animation Column */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center relative min-h-[400px]">
              {/* Vertical SVG Golden Thread */}
              <div className="absolute top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#C9A96E]/10 via-[#C9A96E]/30 to-[#C9A96E]/10" />
              
              {/* Active flow highlighter line */}
              <motion.div
                className="absolute top-4 w-0.5 bg-[#C9A96E]"
                animate={{
                  top: `${(activeMethodIndex / (METHOD_STEPS.length - 1)) * 80}%`,
                  height: "80px"
                }}
                transition={{ type: "spring", stiffness: 80, damping: 15 }}
                style={{ boxShadow: "0 0 10px #C9A96E" }}
              />

              <div className="flex flex-col justify-between h-full absolute inset-0 py-4">
                {METHOD_STEPS.map((step, idx) => (
                  <button
                    key={step.step}
                    onClick={() => setActiveMethodIndex(idx)}
                    className="flex items-center justify-center focus:outline-none group relative w-full z-10"
                  >
                    <div className="flex items-center space-x-6 bg-[#050505] py-2 px-4 rounded-full border border-transparent hover:border-[#C9A96E]/20 transition-all duration-300">
                      <span className={`font-mono text-xs tracking-widest font-bold ${activeMethodIndex === idx ? "text-[#C9A96E] scale-110" : "text-[#F5F3F0]/30"}`}>
                        {step.step}
                      </span>
                      <span className={`text-xs uppercase tracking-widest font-mono ${activeMethodIndex === idx ? "text-[#F5F3F0]" : "text-[#F5F3F0]/40 group-hover:text-[#F5F3F0]"}`}>
                        {step.title}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Content Panel */}
            <div className="lg:col-span-8 bg-[#0a0a0a]/80 border border-[#C9A96E]/10 p-8 md:p-12 rounded-lg relative min-h-[320px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMethodIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-bold text-[#C9A96E] tracking-widest">
                      PHASE {METHOD_STEPS[activeMethodIndex].step} // SYSTEM IMPLEMENTATION
                    </span>
                    <Sparkles className="w-5 h-5 text-[#C9A96E]" />
                  </div>

                  <h3 className="font-serif text-3xl md:text-4xl font-bold">
                    {METHOD_STEPS[activeMethodIndex].title}
                  </h3>
                  <h4 className="font-sans text-xs uppercase tracking-widest text-[#C9A96E]/80 font-bold">
                    {METHOD_STEPS[activeMethodIndex].subtitle}
                  </h4>
                  <p className="font-sans text-base text-[#F5F3F0]/70 leading-relaxed font-light">
                    {METHOD_STEPS[activeMethodIndex].description}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center space-x-4 mt-8 pt-8 border-t border-[#C9A96E]/10 font-mono text-[10px] tracking-widest text-[#F5F3F0]/40">
                <span>ASTROKALKI PROTOCOL // AUTHORITY APPROVED</span>
                <span>•</span>
                <span>METHODOLOGY SECURED</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 4: THE SERVICES (THE LUXURY MARKETPLACE) */}
      <motion.section 
        id="services" 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-24 px-6 max-w-7xl mx-auto"
      >
        <div className="text-center space-y-4 mb-20">
          <span className="font-mono text-xs tracking-widest text-[#C9A96E]/70 uppercase">
            SECTION 04 // PREMIUM INTELLIGENCE ADVISORY
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
            THE LUXURY SERVICE DIRECTORY
          </h2>
          <p className="max-w-2xl mx-auto text-sm text-[#F5F3F0]/60 font-light">
            We operate at high authority. No free discovery calls. Select the precise tier of behavioral auditing and roadmap construction your sovereignty requires.
          </p>
        </div>

        {/* 2x2 Grid (Desktop) / 1-Column Stack (Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="relative bg-[#050505] border border-[#C9A96E]/20 hover:border-[#C9A96E]/60 p-8 md:p-10 flex flex-col justify-between rounded-lg transition-all duration-300 shadow-xl group"
              style={{
                boxShadow: "inset 0 0 30px rgba(201, 169, 110, 0.01)"
              }}
            >
              {service.badge && (
                <div className="absolute -top-3 right-6 bg-[#C9A96E] text-black font-mono text-[9px] tracking-widest uppercase font-bold px-3 py-1 rounded">
                  {service.badge}
                </div>
              )}

              <div className="space-y-6">
                <div className="flex justify-between items-start border-b border-[#C9A96E]/10 pb-6">
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl font-bold tracking-tight uppercase">
                      {service.title}
                    </h3>
                    <p className="font-mono text-[10px] text-[#C9A96E]/80 uppercase tracking-wider mt-1.5 flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1.5 inline text-[#C9A96E]" /> {service.duration}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-3xl md:text-4xl font-bold text-[#C9A96E] block tracking-tight">
                      {service.price}
                    </span>
                    <span className="font-mono text-[9px] text-[#F5F3F0]/40 uppercase tracking-widest block mt-1">
                      FIXED HONEST FEE
                    </span>
                  </div>
                </div>

                <p className="font-sans text-sm text-[#F5F3F0]/70 leading-relaxed font-light italic">
                  "{service.description}"
                </p>

                <div className="space-y-3 pt-4">
                  <span className="font-mono text-[10px] text-[#C9A96E]/60 uppercase tracking-widest block">
                    DELIVERABLES INCLUDED:
                  </span>
                  <ul className="space-y-2.5 text-xs text-[#F5F3F0]/70 font-light">
                    {service.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="w-3.5 h-3.5 text-[#C9A96E] mr-2.5 mt-0.5 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-[#C9A96E]/10">
                <button
                  onClick={() => {
                    setBookingService(service);
                    setBookingSuccess(false);
                  }}
                  className="w-full h-[60px] bg-transparent border border-[#C9A96E] text-[#C9A96E] hover:bg-[#C9A96E] hover:text-black transition text-xs tracking-widest font-mono uppercase font-bold"
                >
                  SECURE THIS ENGAGEMENT
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* SECTION 5: THE FEATURE (THE WARRIOR'S JOURNEY) */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative min-h-[75vh] flex items-center px-6 md:px-12 py-24 overflow-hidden border-t border-b border-[#C9A96E]/10"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/warrior_desert_sun_1782395800524.jpg"
            alt="Warrior standing in the blinding desert sun, majestic and austere Dune aesthetic"
            className="w-full h-full object-cover object-center opacity-30 brightness-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 space-y-6">
              <span className="font-mono text-xs tracking-widest text-[#C9A96E] uppercase block">
                THE S-TIER FOCUS // CONFRONTING TRUTH
              </span>
              <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-white uppercase leading-tight">
                THIS IS NOT <br />
                SPIRITUAL COACHING.
              </h2>
              <div className="w-20 h-0.5 bg-[#C9A96E]" />
              <p className="font-sans text-base md:text-lg text-[#F5F3F0]/80 font-light leading-relaxed">
                This is a rigorous, demanding confrontation with absolute truth. It is designed solely for those who have exhausted superficial coaching templates, meditation apps, and self-help scripts. We operate at deep levels of the mind to restore material sovereignty.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => launchAssessment()}
                  className="px-8 h-16 bg-[#C9A96E] text-black hover:bg-[#C9A96E]/90 transition text-xs tracking-widest font-mono uppercase font-bold"
                >
                  [BEGIN ASSESSMENT DISPATCH]
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 bg-black/80 border border-[#C9A96E]/20 p-6 rounded-lg backdrop-blur-md">
              <span className="font-mono text-[10px] text-[#C9A96E] tracking-widest uppercase block mb-3">
                // PLATFORM AUDIT REQUIREMENT
              </span>
              <p className="font-mono text-xs text-[#F5F3F0]/60 leading-relaxed">
                "Until you make the unconscious conscious, it will direct your life and you will call it fate."
              </p>
              <span className="font-mono text-[9px] text-[#C9A96E]/80 tracking-widest uppercase block mt-4 text-right">
                — C.G. JUNG, PSYCHOLOGICAL ANALECTS
              </span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 6: DANGEROUS KNOWLEDGE (THE INTELLECTUAL MOAT) */}
      <motion.section 
        id="moat" 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-24 px-6 max-w-7xl mx-auto"
      >
        <div className="text-center space-y-4 mb-20">
          <span className="font-mono text-xs tracking-widest text-[#C9A96E]/70 uppercase">
            SECTION 06 // INTELLECTUAL MOAT
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight uppercase">
            DANGEROUS KNOWLEDGE
          </h2>
          <p className="max-w-2xl mx-auto text-sm text-[#F5F3F0]/60 font-light">
            Text-heavy, clinical, and uncompromising essays mapping early psychological injury to structural failure. This is our consultant blueprint.
          </p>
        </div>

        {/* Magazine-style blog layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticleId(article.id)}
              className="bg-[#050505] border border-[#C9A96E]/10 hover:border-[#C9A96E]/40 p-8 rounded-lg cursor-pointer transition-all duration-300 group flex flex-col justify-between min-h-[380px]"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center text-[10px] font-mono tracking-widest uppercase text-[#C9A96E]">
                  <span>{article.category}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-white group-hover:text-[#C9A96E] transition leading-tight">
                  {article.title}
                </h3>

                <p className="font-sans text-sm text-[#F5F3F0]/60 line-clamp-4 font-light leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#C9A96E]/10 flex items-center justify-between font-mono text-xs text-[#C9A96E] group-hover:translate-x-1 transition-transform">
                <span>[READ ESSAY]</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </article>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="border-t border-[#C9A96E]/10 bg-black py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5 space-y-4">
            <span className="font-serif text-xl tracking-[0.1em] text-[#C9A96E] font-bold block uppercase">
              ASTROKALKI E)
            </span>
            <p className="text-xs text-[#F5F3F0]/40 font-light leading-relaxed max-w-sm">
              An elite, high-authority Psychological Intelligence Hub blending ancient diagnostic science with contemporary clinical shadow work. Uncompromising truth for sovereign performers.
            </p>
          </div>

          <div className="md:col-span-4 space-y-4">
            <span className="font-mono text-xs tracking-widest text-[#C9A96E] uppercase block">
              // METHOD CREDENTIALS
            </span>
            <ul className="space-y-2 text-xs text-[#F5F3F0]/50 font-light">
              <li>Vedic Kundli Blueprinting Protocols</li>
              <li>Jungian Archetypal Destructuring</li>
              <li>Somatic Nervous-System Overwrite Action</li>
              <li>Absolute Sovereignty Strategy</li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4">
            <span className="font-mono text-xs tracking-widest text-[#C9A96E] uppercase block">
              // PLATFORM STATEMENT
            </span>
            <div className="bg-[#050505] border border-[#C9A96E]/20 p-4 rounded text-[10px] font-mono text-[#F5F3F0]/60 leading-relaxed">
              All intelligence dispatches are compiled in deep compliance. We protect high-net-worth client identity completely. No cookies or databases are sold to advertising pools.
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-[#C9A96E]/10 flex flex-col md:flex-row items-center justify-between text-[10px] font-mono text-[#F5F3F0]/30 tracking-widest uppercase">
          <span>© 2026 ASTROKALKI E). ALL RIGHTS SECURED.</span>
          <span className="mt-4 md:mt-0">DESIGNED BY COGNITIVE INTELLIGENCE GUILD</span>
        </div>
      </footer>

      {/* PERSISTENT FLOATING CTA FOR MOBILE */}
      <div className="fixed bottom-6 right-6 z-30 md:hidden">
        <button
          onClick={() => launchAssessment()}
          className="h-14 px-6 bg-[#C9A96E] text-black font-mono text-xs font-bold uppercase tracking-widest rounded-full shadow-2xl flex items-center space-x-2 animate-bounce"
        >
          <Play className="w-3.5 h-3.5 fill-black" />
          <span>DECODE NOW</span>
        </button>
      </div>

      {/* DANGEROUS KNOWLEDGE READER MODAL */}
      <AnimatePresence>
        {selectedArticleId && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticleId(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-3xl bg-[#050505] border border-[#C9A96E]/30 p-8 md:p-12 rounded-lg z-10 max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedArticleId(null)}
                className="absolute top-6 right-6 text-[#F5F3F0]/60 hover:text-white transition"
              >
                <X className="w-6 h-6" />
              </button>

              {(() => {
                const article = ARTICLES.find(a => a.id === selectedArticleId);
                if (!article) return null;
                const paragraphs = ARTICLE_CONTENTS[article.id] || [];
                return (
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 font-mono text-xs text-[#C9A96E] uppercase">
                        <span>{article.category}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>
                      <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                        {article.title}
                      </h2>
                      <div className="font-mono text-[10px] text-[#F5F3F0]/40">
                        PUBLISHED // {article.date} BY ASTROKALKI E) ADVISORY
                      </div>
                      <div className="w-full h-px bg-[#C9A96E]/20 pt-2" />
                    </div>

                    <div className="font-serif text-base md:text-lg text-[#F5F3F0]/80 leading-relaxed space-y-6">
                      {paragraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>

                    <div className="border border-[#C9A96E]/20 bg-[#C9A96E]/5 p-6 rounded flex flex-col md:flex-row items-center justify-between gap-4">
                      <div>
                        <span className="font-mono text-xs text-[#C9A96E] tracking-widest uppercase block font-bold">
                          RESONATING WITH THIS INQUIRY?
                        </span>
                        <p className="text-xs text-[#F5F3F0]/60 font-light mt-1">
                          Our algorithms can locate and extract your primary loop pattern.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedArticleId(null);
                          launchAssessment();
                        }}
                        className="px-6 h-12 bg-[#C9A96E] text-black font-mono text-xs uppercase font-bold shrink-0 hover:bg-[#C9A96E]/90 transition"
                      >
                        [BEGIN CORE RECOGNITION]
                      </button>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* INTERACTIVE ASSESSMENT DECODER MODAL */}
      <AnimatePresence>
        {assessmentOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!isDecoding) setAssessmentOpen(false);
              }}
              className="fixed inset-0 bg-black/95 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-4xl bg-[#050505] border border-[#C9A96E]/40 rounded-lg z-10 overflow-hidden"
              style={{
                boxShadow: "0 0 50px rgba(201, 169, 110, 0.15)"
              }}
            >
              {/* Header inside modal */}
              <div className="bg-[#0a0a0a] border-b border-[#C9A96E]/15 px-8 py-5 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 bg-[#C9A96E] rounded-full animate-pulse" />
                  <span className="font-mono text-xs tracking-widest text-[#C9A96E] font-bold uppercase">
                    ASTROKALKI E) // LOOP RECOGNITION MATRIX
                  </span>
                </div>
                {!isDecoding && (
                  <button
                    onClick={() => setAssessmentOpen(false)}
                    className="text-[#F5F3F0]/60 hover:text-white transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="p-6 md:p-10 max-h-[75vh] overflow-y-auto">
                {isDecoding ? (
                  /* Loading Matrix State */
                  <div className="flex flex-col items-center justify-center py-16 space-y-8 text-center">
                    <div className="relative w-20 h-20">
                      <div className="absolute inset-0 rounded-full border-2 border-[#C9A96E]/10" />
                      <div className="absolute inset-0 rounded-full border-2 border-t-[#C9A96E] animate-spin" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#C9A96E] animate-pulse">
                        {decodeStepText}
                      </h3>
                      <p className="font-serif text-sm italic text-[#F5F3F0]/40 max-w-md">
                        Please hold your posture. AstroKalki AI is generating clinical, structural Vedic mapping parameters combined with psychological shadow vectors.
                      </p>
                    </div>
                  </div>
                ) : diagnosticReport ? (
                  /* Diagnostic Report Presentation State */
                  <div className="space-y-8">
                    <div className="bg-[#0a0a0a] border border-[#C9A96E]/20 p-8 rounded-lg relative overflow-hidden space-y-6">
                      <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-[#C9A96E]/40 uppercase tracking-widest border-l border-b border-[#C9A96E]/10 rounded-bl bg-black">
                        SECURE REPORT #AK-{Math.floor(Math.random() * 90000) + 10000}
                      </div>

                      <div className="space-y-2">
                        <span className="font-mono text-xs text-[#C9A96E] tracking-widest uppercase block font-bold">
                          // DECODED LECTURE OUTCOME
                        </span>
                        <h3 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white uppercase">
                          {diagnosticReport.diagnosis}
                        </h3>
                      </div>

                      <div className="border-t border-b border-[#C9A96E]/10 py-5">
                        <span className="font-mono text-[10px] text-[#C9A96E]/80 tracking-widest uppercase block mb-2">
                          KARMIC COMPULSION COGNITIVE APHORISM:
                        </span>
                        <p className="font-serif text-lg md:text-xl italic text-[#F5F3F0] font-light">
                          "{diagnosticReport.karmicCore}"
                        </p>
                      </div>

                      <div className="space-y-2">
                        <span className="font-mono text-[10px] text-[#C9A96E]/80 tracking-widest uppercase block">
                          CLINICAL PSYCHE MECHANISM ANALYSIS:
                        </span>
                        <p className="font-sans text-sm text-[#F5F3F0]/80 leading-relaxed font-light">
                          {diagnosticReport.mechanism}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                        <div className="space-y-3">
                          <span className="font-mono text-[10px] text-[#C9A96E] tracking-widest uppercase block font-bold">
                            // ENVIRONMENTAL MIRRORS (THE BEHAVIOR):
                          </span>
                          <ul className="space-y-2 text-xs text-[#F5F3F0]/70 font-light">
                            {diagnosticReport.mirror.map((item, idx) => (
                              <li key={idx} className="flex items-start">
                                <ShieldAlert className="w-4 h-4 text-[#C9A96E] mr-2 shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-3">
                          <span className="font-mono text-[10px] text-[#C9A96E] tracking-widest uppercase block font-bold">
                            // OVERRIDE METHODOLOGY (THE DHARMA STEPS):
                          </span>
                          <ul className="space-y-2 text-xs text-[#F5F3F0]/70 font-light">
                            {diagnosticReport.dharmaPath.map((item, idx) => (
                              <li key={idx} className="flex items-start">
                                <Check className="w-4 h-4 text-[#C9A96E] mr-2 shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Integrated Service Advisory pitch */}
                    <div className="border border-[#C9A96E]/30 bg-black/80 p-8 rounded-lg grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                      <div className="md:col-span-8 space-y-4">
                        <div className="inline-block bg-[#C9A96E]/10 border border-[#C9A96E]/30 px-3 py-1 rounded text-xs font-mono text-[#C9A96E] uppercase">
                          RECOMMENDED ACTION METHOD: {diagnosticReport.recommendedService.name}
                        </div>
                        <h4 className="font-serif text-2xl font-bold text-white">
                          Sovereignty requires rigorous manual integration.
                        </h4>
                        <p className="font-sans text-xs text-[#F5F3F0]/60 leading-relaxed font-light">
                          <span className="font-bold text-[#C9A96E]">Why this works:</span> {diagnosticReport.recommendedService.fitReason}
                        </p>
                      </div>
                      <div className="md:col-span-4 w-full">
                        <button
                          onClick={() => {
                            const matchedService = SERVICES.find(
                              s => s.title.toUpperCase() === diagnosticReport.recommendedService.name.toUpperCase()
                            ) || SERVICES[1]; // fallback to Deep Dive
                            setBookingService(matchedService);
                            setBookingSuccess(false);
                          }}
                          className="w-full h-14 bg-[#C9A96E] text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#C9A96E]/90 transition"
                        >
                          APPLY FOR {diagnosticReport.recommendedService.name}
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4">
                      <button
                        onClick={() => setDiagnosticReport(null)}
                        className="text-xs font-mono text-[#C9A96E] hover:underline"
                      >
                        ← DECODE ANOTHER TEMPLATE
                      </button>
                      <button
                        onClick={() => setAssessmentOpen(false)}
                        className="text-xs font-mono text-[#F5F3F0]/50 hover:text-white"
                      >
                        CLOSE AUDIT DIALOG
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Questionnaire Input State */
                  <form onSubmit={submitAssessment} className="space-y-6">
                    <div className="space-y-2">
                      <span className="font-mono text-[10px] text-[#C9A96E] tracking-widest uppercase block font-bold">
                        STEP 01 // CHOOSE YOUR CORNERSTONE CYCLE
                      </span>
                      <div className="grid grid-cols-2 gap-3">
                        {PATTERNS.map((pattern) => (
                          <button
                            type="button"
                            key={pattern.id}
                            onClick={() => {
                              setSelectedPattern(pattern.title);
                              setSelectedShadow(pattern.shadowTriggerExamples[0]);
                            }}
                            className={`p-4 border text-left rounded transition-all duration-300 ${
                              selectedPattern === pattern.title
                                ? "bg-[#C9A96E]/10 border-[#C9A96E] text-white"
                                : "bg-black border-[#C9A96E]/10 text-[#F5F3F0]/50 hover:border-[#C9A96E]/35"
                            }`}
                          >
                            <h4 className="font-serif text-sm font-bold block">{pattern.title}</h4>
                            <p className="text-[10px] italic font-light truncate mt-1">"{pattern.description}"</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <span className="font-mono text-[10px] text-[#C9A96E] tracking-widest uppercase block font-bold">
                          STEP 02 // CHOOSE VEDIC ELEMENTAL ARCHETYPE
                        </span>
                        <select
                          value={selectedElement}
                          onChange={(e) => setSelectedElement(e.target.value)}
                          className="w-full h-12 bg-black border border-[#C9A96E]/20 text-white font-mono text-xs px-4 focus:border-[#C9A96E] focus:outline-none rounded"
                        >
                          <option value="Fire / Tejas">Fire / Tejas (Dynamic, high ambition, burning out under high pressure)</option>
                          <option value="Water / Apas">Water / Apas (Deeply intuitive, absorbing others' projections, boundary leaks)</option>
                          <option value="Air / Vayu">Air / Vayu (Intellectual, relentless overthinking, constantly shifting direction)</option>
                          <option value="Earth / Prithvi">Earth / Prithvi (Stable, but prone to profound change resistance, stagnation loops)</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <span className="font-mono text-[10px] text-[#C9A96E] tracking-widest uppercase block font-bold">
                          STEP 03 // UNDER PRESSURE, WHAT TRIGGERS COGNITIVE SHADOW?
                        </span>
                        <select
                          value={selectedShadow}
                          onChange={(e) => setSelectedShadow(e.target.value)}
                          className="w-full h-12 bg-black border border-[#C9A96E]/20 text-white font-mono text-xs px-4 focus:border-[#C9A96E] focus:outline-none rounded"
                        >
                          <option value="To be seen and rejected">"To be seen and rejected"</option>
                          <option value="To be weak and dependent">"To be weak and dependent"</option>
                          <option value="To fail in public view">"To fail in public view"</option>
                          <option value="To lose control of my creation">"To lose control of my creation"</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="font-mono text-[10px] text-[#C9A96E] tracking-widest uppercase block font-bold">
                        STEP 04 // DEFINE THE MATERIAL COST (OPTIONAL)
                      </span>
                      <textarea
                        value={narrativeText}
                        onChange={(e) => setNarrativeText(e.target.value)}
                        placeholder="Detail how this loop manifests in your high-stakes personal or professional life. What is it costing you right now?"
                        className="w-full h-24 bg-black border border-[#C9A96E]/20 text-white p-4 focus:border-[#C9A96E] focus:outline-none rounded text-xs leading-relaxed font-sans"
                      />
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full h-16 bg-[#C9A96E] text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#C9A96E]/90 transition"
                      >
                        [SUBMIT DECODER DISPATCH]
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* LUXURY SERVICE BOOKING DRAWER / MODAL */}
      <AnimatePresence>
        {bookingService && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!bookingSuccess) setBookingService(null);
              }}
              className="fixed inset-0 bg-black/95 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-md bg-[#050505] border border-[#C9A96E]/40 p-8 rounded-lg z-10"
              style={{
                boxShadow: "0 0 40px rgba(201, 169, 110, 0.12)"
              }}
            >
              <button
                onClick={() => setBookingService(null)}
                className="absolute top-6 right-6 text-[#F5F3F0]/60 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>

              {bookingSuccess ? (
                /* Success booking message */
                <div className="flex flex-col items-center justify-center py-10 space-y-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E] flex items-center justify-center text-[#C9A96E]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-serif text-2xl font-bold uppercase text-white">
                      ENGAGEMENT SECURED
                    </h3>
                    <p className="font-mono text-xs text-[#C9A96E] tracking-widest uppercase">
                      COGNITIVE FILE CREATED // APPROVED
                    </p>
                    <p className="font-sans text-xs text-[#F5F3F0]/60 leading-relaxed max-w-xs font-light">
                      Your diagnostic application for <span className="font-bold text-[#F5F3F0]">{bookingService.title}</span> has been flagged. Our psychological intelligence officer will contact you within 4 hours.
                    </p>
                  </div>
                </div>
              ) : (
                /* Booking Form State */
                <form onSubmit={handleBookingSubmit} className="space-y-6">
                  <div className="space-y-2 pb-2 border-b border-[#C9A96E]/10">
                    <span className="font-mono text-[9px] text-[#C9A96E] tracking-widest uppercase block">
                      // SECURE BOOKING REGISTRY
                    </span>
                    <h3 className="font-serif text-2xl font-bold uppercase text-white">
                      APPLY FOR {bookingService.title}
                    </h3>
                    <p className="text-xs text-[#C9A96E]/80 font-mono tracking-wider">
                      INVESTMENT FEE: {bookingService.price}
                    </p>
                  </div>

                  <div className="space-y-4 text-xs font-mono">
                    <div className="space-y-1">
                      <label className="text-[#C9A96E]/70 block uppercase">YOUR FULL NAME</label>
                      <input
                        type="text"
                        required
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full h-11 bg-black border border-[#C9A96E]/20 text-white px-3 focus:border-[#C9A96E] focus:outline-none rounded"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[#C9A96E]/70 block uppercase">YOUR SECURE EMAIL</label>
                      <input
                        type="email"
                        required
                        value={bookingForm.email}
                        onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                        placeholder="johndoe@example.com"
                        className="w-full h-11 bg-black border border-[#C9A96E]/20 text-white px-3 focus:border-[#C9A96E] focus:outline-none rounded"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[#C9A96E]/70 block uppercase">WHATSAPP / TELEGRAM PHONE</label>
                      <input
                        type="tel"
                        required
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full h-11 bg-black border border-[#C9A96E]/20 text-white px-3 focus:border-[#C9A96E] focus:outline-none rounded"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[#C9A96E]/70 block uppercase">PRIMARY BEHAVIORAL BOTTLENECK (OPTIONAL)</label>
                      <textarea
                        value={bookingForm.notes}
                        onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                        placeholder="Specify any high-stakes context you want evaluated prior..."
                        className="w-full h-16 bg-black border border-[#C9A96E]/20 text-white p-3 focus:border-[#C9A96E] focus:outline-none rounded text-[11px]"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full h-[60px] bg-[#C9A96E] text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#C9A96E]/90 transition"
                    >
                      SECURE ENGAGEMENT DISPATCH
                    </button>
                    <div className="flex items-center justify-center space-x-1.5 mt-3 text-[9px] font-mono text-[#F5F3F0]/40 uppercase tracking-widest">
                      <Lock className="w-3 h-3 text-[#C9A96E]" />
                      <span>SECURE 256-BIT DISPATCH TRANSIT</span>
                    </div>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
