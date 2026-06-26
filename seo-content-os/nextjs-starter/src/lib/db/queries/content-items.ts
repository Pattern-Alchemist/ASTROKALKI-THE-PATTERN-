/**
 * Content Items — query/mutation module
 * Table: content_items
 *
 * Replaces the placeholder version that returned demo data.
 */

import { getSupabaseServiceClient } from '../../supabase/server';

export interface ContentItem {
  id: string;
  cluster_id: string;
  brief_id: string | null;
  template_id: string | null;
  title: string | null;
  slug: string;
  meta_title: string | null;
  meta_description: string | null;
  excerpt: string | null;
  content_md: string | null;
  content_json: Record<string, unknown> | null;
  schema_json: Record<string, unknown> | null;
  canonical_url: string | null;
  word_count: number | null;
  language: string;
  status: string;
  qa_score: number | null;
  publish_target: string;
  published_at: string | null;
  last_refreshed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateContentItemInput {
  cluster_id: string;
  brief_id?: string;
  template_id?: string;
  title?: string;
  slug: string;
  meta_title?: string;
  meta_description?: string;
  excerpt?: string;
  content_md?: string;
  content_json?: Record<string, unknown>;
  schema_json?: Record<string, unknown>;
  word_count?: number;
  status?: string;
  publish_target?: string;
}

export async function getContentBySlug(slug: string): Promise<ContentItem | null> {
  const supabase = getSupabaseServiceClient();
  if (!supabase) {
    // Fallback for when Supabase isn't configured (dev mode)
    return {
      slug,
      title: `Draft page for ${slug}`,
      content_md: 'Connect this query to Supabase content_items.',
      // ... minimal fields
    } as ContentItem;
  }

  const { data, error } = await supabase
    .from('content_items')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data;
}

export async function getContentById(id: string): Promise<ContentItem | null> {
  const supabase = getSupabaseServiceClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('content_items')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function getContentItems(filters?: {
  status?: string;
  clusterId?: string;
  limit?: number;
}): Promise<ContentItem[]> {
  const supabase = getSupabaseServiceClient();
  if (!supabase) return [];

  let query = supabase.from('content_items').select('*').order('created_at', { ascending: false });
  if (filters?.status) query = query.eq('status', filters.status);
  if (filters?.clusterId) query = query.eq('cluster_id', filters.clusterId);
  if (filters?.limit) query = query.limit(filters.limit);

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function getPublishedContent(limit = 50): Promise<ContentItem[]> {
  return getContentItems({ status: 'published', limit });
}

export async function createContentItem(input: CreateContentItemInput): Promise<ContentItem> {
  const supabase = getSupabaseServiceClient();
  if (!supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('content_items')
    .insert({
      ...input,
      status: input.status || 'queued',
      publish_target: input.publish_target || 'nextjs',
      language: 'en',
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateContentItem(id: string, updates: Partial<ContentItem>): Promise<ContentItem> {
  const supabase = getSupabaseServiceClient();
  if (!supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('content_items')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateQaScore(
  id: string,
  qaScore: number,
  qaIssues?: string[],
  qaSuggestions?: string[]
): Promise<ContentItem> {
  const supabase = getSupabaseServiceClient();
  if (!supabase) throw new Error('Supabase not configured');

  // Store QA issues/suggestions in content_json if available
  const updates: Partial<ContentItem> = {
    qa_score: qaScore,
    status: qaScore >= 75 ? 'approved' : 'review',
  };

  const { data, error } = await supabase
    .from('content_items')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  // Store issues/suggestions in a separate update to content_json
  if (qaIssues || qaSuggestions) {
    const existing = data.content_json || {};
    await supabase
      .from('content_items')
      .update({
        content_json: {
          ...existing,
          qa_issues: qaIssues,
          qa_suggestions: qaSuggestions,
        },
      })
      .eq('id', id);
  }

  return data;
}

export async function publishContent(id: string): Promise<ContentItem> {
  const supabase = getSupabaseServiceClient();
  if (!supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('content_items')
    .update({
      status: 'published',
      published_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function refreshContent(id: string): Promise<ContentItem> {
  const supabase = getSupabaseServiceClient();
  if (!supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('content_items')
    .update({
      last_refreshed_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
