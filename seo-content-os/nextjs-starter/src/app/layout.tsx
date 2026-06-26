import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'SEO Content OS',
  description: 'Programmatic SEO architecture with Next.js, Supabase, and n8n.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
