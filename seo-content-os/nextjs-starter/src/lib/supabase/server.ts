import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Server-side Supabase client for App Router route handlers.
 * Uses @supabase/ssr with cookie-based auth.
 *
 * Requires env vars:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY
 */
export async function getSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.warn('[Supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing sessions.
        }
      },
    },
  });
}

/**
 * Service-role client for admin operations (bypasses RLS).
 * Only use in server-side API routes, never expose to client.
 *
 * Requires env var: SUPABASE_SERVICE_ROLE_KEY
 */
export function getSupabaseServiceClient() {
  const { createClient } = require('@supabase/supabase-js');
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.warn('[Supabase] Missing SUPABASE_SERVICE_ROLE_KEY for service client');
    return null;
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
