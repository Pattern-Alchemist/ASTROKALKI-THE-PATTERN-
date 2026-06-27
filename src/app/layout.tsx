import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import SiteModalListener from "@/components/astrokalki/SiteModalListener";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://astrokalki.com"),
  title: "AstroKalki — The Pattern Intelligence System™",
  description:
    "Most apps track what you do. AstroKalki reveals why you keep doing it. The world's first Pattern Intelligence System™ — decode the invisible psychological patterns repeating in your relationships, work, and inner life. Daily tools, weekly intelligence, your Pattern Biography.",
  keywords: [
    "pattern intelligence",
    "pattern recognition psychology",
    "behavioral pattern intelligence",
    "repeating relationship patterns",
    "why do i keep repeating the same relationship pattern",
    "self-sabotage pattern",
    "shadow work",
    "inner voices psychology",
    "pattern biography",
    "pattern dna",
    "behavioral loops",
    "emotional pattern decoding",
    "relationship pattern reading",
    "karmic pattern analysis",
    "depth psychology",
    "self-awareness platform",
    "psychological self-awareness",
    "breaking behavioral loops",
  ],
  authors: [{ name: "AstroKalki" }],
  creator: "Kaustubh",
  publisher: "AstroKalki",
  robots: "index, follow",
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "AstroKalki — Most apps track what you do. We reveal why you keep doing it.",
    description:
      "The Pattern Intelligence System™. Decode the invisible patterns repeating in your life. Daily tools, weekly intelligence, your Pattern Biography.",
    url: "https://astrokalki.com",
    siteName: "AstroKalki",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/hero-cinematic.png",
        width: 1344,
        height: 768,
        alt: "AstroKalki — The Pattern Intelligence System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@astrokalki",
    title: "AstroKalki — The Pattern Intelligence System™",
    description:
      "Most apps track what you do. AstroKalki reveals why you keep doing it. Decode the invisible patterns repeating your life.",
    images: ["/images/hero-cinematic.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "AstroKalki",
              alternateName: "Astro Kalki",
              description:
                "The Pattern Intelligence System™ — a behavioral self-awareness platform that decodes the invisible psychological patterns repeating in a user's life. Owns three proprietary entities: Pattern Intelligence System™, Pattern Biography, Pattern DNA.",
              url: "https://astrokalki.com",
              logo: "https://astrokalki.com/logo.svg",
              telephone: "+91-89208-62931",
              email: "hello@astrokalki.com",
              priceRange: "₹999 - ₹9,999",
              foundingDate: "2023",
              founder: {
                "@type": "Person",
                name: "Kaustubh",
                url: "https://astrokalki.com",
                jobTitle: "Pattern Recognition Practitioner",
                knowsAbout: [
                  "Pattern Intelligence",
                  "Behavioral Pattern Recognition",
                  "Relationship Patterns",
                  "Self-Sabotage",
                  "Shadow Work",
                  "Depth Psychology",
                  "Pattern Biography",
                  "Pattern DNA",
                ],
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "AstroKalki",
              alternateName: "The Pattern Intelligence System",
              url: "https://astrokalki.com",
              description: "The Pattern Intelligence System™ — decode the invisible psychological patterns repeating in your life.",
              inLanguage: "en",
              publisher: {
                "@type": "Organization",
                name: "AstroKalki",
                url: "https://astrokalki.com",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Service",
                serviceType: "Pattern Snapshot Consultation",
                name: "Pattern Snapshot",
                description: "A 45-minute tactical decoding of one recurring pattern. Best for relationship confusion, recurring problems, and emotional loops.",
                provider: { "@type": "Organization", name: "AstroKalki", url: "https://astrokalki.com" },
                areaServed: "Worldwide",
                offers: {
                  "@type": "Offer",
                  price: "999",
                  priceCurrency: "INR",
                  availability: "https://schema.org/InStock",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                serviceType: "Deep Dive Karmic Architecture Consultation",
                name: "Deep Dive",
                description: "Complete karmic architecture mapping including psychological mapping, shadow patterns, behavioural cycles, and 12-month strategy.",
                provider: { "@type": "Organization", name: "AstroKalki", url: "https://astrokalki.com" },
                areaServed: "Worldwide",
                offers: {
                  "@type": "Offer",
                  price: "4999",
                  priceCurrency: "INR",
                  availability: "https://schema.org/InStock",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                serviceType: "Dharma Navigation Consultation",
                name: "Dharma Navigation",
                description: "Career, purpose, and major life direction consultation with constitutional analysis and decision framework.",
                provider: { "@type": "Organization", name: "AstroKalki", url: "https://astrokalki.com" },
                areaServed: "Worldwide",
                offers: {
                  "@type": "Offer",
                  price: "9999",
                  priceCurrency: "INR",
                  availability: "https://schema.org/InStock",
                },
              },
            ]),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "DefinedTermSet",
              name: "AstroKalki Proprietary Frameworks",
              description: "The three proprietary entities that define the Pattern Intelligence category.",
              hasDefinedTerm: [
                {
                  "@type": "DefinedTerm",
                  name: "Pattern Intelligence System™",
                  description: "A behavioral self-awareness platform that decodes the invisible psychological patterns repeating in a user's life. Composed of four pillars: Observe, Decode, Interrupt, Transform.",
                  url: "https://astrokalki.com#pattern-intelligence-system",
                },
                {
                  "@type": "DefinedTerm",
                  name: "Pattern Biography",
                  description: "A user's psychological life operating manual, structured as chapters that auto-generate from 30+ days of logged behavioral data. Each chapter covers ~30 days with a literary title pulled from the dominant pattern.",
                  url: "https://astrokalki.com#pattern-intelligence-system",
                },
                {
                  "@type": "DefinedTerm",
                  name: "Pattern DNA",
                  description: "An evolving psychological fingerprint across six dimensions: Avoidance, Control, Performer, Rescuer, Shadow, and Witness. Updates in real time from every interaction across the Pattern Intelligence System.",
                  url: "https://astrokalki.com#pattern-intelligence-system",
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Is this like a regular astrology reading?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. Most astrology readings tell you what will happen. AstroKalki shows you why the same things keep happening. This is pattern recognition, not prediction.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How is this different from therapy?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Therapy works with the conscious mind over time. AstroKalki works with the unconscious architecture immediately. Your birth chart reveals patterns that took therapy years to uncover.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What do I need to provide for a session?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Your date of birth, time of birth, and place of birth. The more accurate the time, the deeper the reading.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do I need to believe in astrology for this to work?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. You do not need to believe in gravity for it to affect you. The patterns in your chart exist whether you acknowledge them or not.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How long until I see results?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Immediately. Most clients report that the recognition happens during the session itself — the moment a pattern is named, it loses its invisible power over you.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Are sessions confidential?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Absolutely. Everything shared in a session remains completely confidential. Your birth chart, your patterns, your revelations — they stay between us.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${cormorant.variable} ${inter.variable} antialiased bg-[#050505] text-[#e8e0d4]`}
      >
        {children}
        <SiteModalListener />
      </body>
    </html>
  );
}
