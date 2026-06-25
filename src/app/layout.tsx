import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

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
  title: "AstroKalki — The Same Pain. Different Face. Same Pattern.",
  description:
    "The same pain. Different face. Same pattern. AstroKalki decodes the karmic loops, emotional self-sabotage, and repeating relationship patterns running your life — through Vedic astrology and depth psychology. Not prediction. Pattern recognition.",
  keywords: [
    "trauma bond help",
    "karmic relationship reading",
    "astrology for emotional healing",
    "shadow work astrology",
    "emotional pattern decoding",
    "relationship clarity",
    "spiritual psychology",
    "karmic pattern analysis",
    "shadow self decoding",
    "emotional blueprint reading",
    "Vedic astrology consultation",
    "depth psychology astrology",
    "relationship pattern reading",
    "trauma loop decoding",
    "destiny clarity session",
    "karmic loop breaker",
    "emotional self-sabotage help",
    "pattern recognition astrology",
  ],
  authors: [{ name: "AstroKalki" }],
  creator: "Kaustubh",
  publisher: "AstroKalki",
  robots: "index, follow",
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "AstroKalki — The Same Pain. Different Face. Same Pattern.",
    description:
      "Relationships. Self-sabotage. Emotional confusion. Sometimes the problem isn't your choices — it's the pattern beneath them. Not prediction. Pattern recognition.",
    url: "https://astrokalki.com",
    siteName: "AstroKalki",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/hero-cinematic.png",
        width: 1344,
        height: 768,
        alt: "AstroKalki — The Same Pain. Different Face. Same Pattern.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@astrokalki",
    title: "AstroKalki — The Same Pain. Different Face. Same Pattern.",
    description:
      "Not prediction. Pattern recognition. Decode the emotional patterns running your relationships and choices.",
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
                "Vedic astrology and depth psychology pattern recognition. Decode karmic loops, emotional self-sabotage, trauma bonds, and shadow patterns.",
              url: "https://astrokalki.com",
              logo: "https://astrokalki.com/logo.svg",
              telephone: "+91-89208-62931",
              email: "hello@astrokalki.com",
              priceRange: "₹999 - ₹2,999",
              foundingDate: "2023",
              founder: {
                "@type": "Person",
                name: "Kaustubh",
                url: "https://astrokalki.com",
                jobTitle: "Pattern Recognition Practitioner",
                knowsAbout: [
                  "Relationship Patterns",
                  "Trauma Bonds",
                  "Self-Sabotage",
                  "Shadow Work",
                  "Vedic Astrology",
                  "Depth Psychology",
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
      </body>
    </html>
  );
}
