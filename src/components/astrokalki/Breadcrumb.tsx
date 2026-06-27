'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <>
      {/* Visual Breadcrumb */}
      <nav
        className="bg-[#080808] border-b border-white/[0.04] py-4"
        aria-label="Breadcrumb"
      >
        <div className="max-w-6xl mx-auto px-5 md:px-12">
          <div className="flex items-center gap-2 text-sm text-white/60">
            {items.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                {index > 0 && <ChevronRight className="w-4 h-4" />}
                {item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-white/90 transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-white/90">{item.label}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Structured Data for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: items.map((item, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: item.label,
              item: item.href
                ? `https://astrokalki.com${item.href}`
                : 'https://astrokalki.com',
            })),
          }),
        }}
      />
    </>
  );
}
