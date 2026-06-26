import { createBrowserClient } from '@supabase/ssr';

/**
 * Browser-side Supabase client.
 * Uses @supabase/ssr for proper cookie-based auth.
 *
 * Requires env vars:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY
 */
export function getSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.warn('[Supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
    return null;
  }

  return createBrowserClient(url, key);
}
