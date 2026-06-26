/**
 * Internal Links — query/mutation module
 * Table: internal_links
 */

import { getSupabaseServiceClient } from '../../supabase/server';

export interface InternalLink {
  id: string;
  source_content_id: string;
  target_content_id: string;
  anchor_text: string;
  link_reason: string | null;
  status: string;
  created_at: string;
}

export interface CreateInternalLinkInput {
  source_content_id: string;
  target_content_id: string;
  anchor_text: string;
  link_reason?: string;
  status?: string;
}

export async function getInternalLinksForContent(contentId: string): Promise<InternalLink[]> {
  const supabase = getSupabaseServiceClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('internal_links')
    .select('*')
    .or(`source_content_id.eq.${contentId},target_content_id.eq.${contentId}`)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createInternalLinks(links: CreateInternalLinkInput[]): Promise<InternalLink[]> {
  const supabase = getSupabaseServiceClient();
  if (!supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('internal_links')
    .insert(links.map(l => ({ ...l, status: l.status || 'suggested' })))
    .select();

  if (error) throw error;
  return data || [];
}

export async function updateLinkStatus(id: string, status: string): Promise<InternalLink> {
  const supabase = getSupabaseServiceClient();
  if (!supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('internal_links')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Bulk create internal links from QA workflow suggestions.
 * Resolves target slugs to content_item IDs.
 */
export async function createLinksFromSuggestions(
  sourceContentId: string,
  suggestions: { target_slug: string; anchor_text: string; link_reason?: string }[]
): Promise<{ created: number; not_found: string[] }> {
  const supabase = getSupabaseServiceClient();
  if (!supabase) throw new Error('Supabase not configured');

  // Resolve target slugs to content item IDs
  const slugs = suggestions.map(s => s.target_slug);
  const { data: targetItems } = await supabase
    .from('content_items')
    .select('id, slug')
    .in('slug', slugs)
    .eq('status', 'published');

  const slugToId = new Map((targetItems || []).map(item => [item.slug, item.id]));
  const notFound = suggestions.filter(s => !slugToId.has(s.target_slug)).map(s => s.target_slug);

  const validLinks = suggestions
    .filter(s => slugToId.has(s.target_slug))
    .map(s => ({
      source_content_id: sourceContentId,
      target_content_id: slugToId.get(s.target_slug)!,
      anchor_text: s.anchor_text,
      link_reason: s.link_reason,
      status: 'suggested',
    }));

  if (validLinks.length === 0) {
    return { created: 0, notFound };
  }

  const { error } = await supabase.from('internal_links').insert(validLinks);
  if (error) throw error;

  return { created: validLinks.length, notFound };
}
