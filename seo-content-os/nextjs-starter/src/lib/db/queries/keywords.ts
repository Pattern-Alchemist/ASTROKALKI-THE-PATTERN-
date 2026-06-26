/**
 * Keywords — query/mutation module
 * Table: keywords
 */

import { getSupabaseServiceClient } from '../../supabase/server';

export interface Keyword {
  id: string;
  cluster_id: string | null;
  keyword: string;
  normalized_keyword: string;
  search_intent: string | null;
  priority_score: number | null;
  source: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface IngestKeywordsInput {
  keywords: {
    keyword: string;
    normalized_keyword: string;
    search_intent?: string;
    priority_score?: number;
    source?: string;
    cluster_id?: string;
  }[];
}

export async function getKeywords(clusterId?: string, status?: string): Promise<Keyword[]> {
  const supabase = getSupabaseServiceClient();
  if (!supabase) return [];

  let query = supabase.from('keywords').select('*').order('created_at', { ascending: false });
  if (clusterId) query = query.eq('cluster_id', clusterId);
  if (status) query = query.eq('status', status);

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function ingestKeywords(input: IngestKeywordsInput): Promise<{ inserted: number; duplicates: number }> {
  const supabase = getSupabaseServiceClient();
  if (!supabase) throw new Error('Supabase not configured');

  // Check for existing keywords to avoid duplicates
  const normalized = input.keywords.map(k => k.normalized_keyword);
  const { data: existing } = await supabase
    .from('keywords')
    .select('normalized_keyword')
    .in('normalized_keyword', normalized);

  const existingSet = new Set((existing || []).map(k => k.normalized_keyword));
  const newKeywords = input.keywords.filter(k => !existingSet.has(k.normalized_keyword));
  const duplicates = input.keywords.length - newKeywords.length;

  if (newKeywords.length === 0) {
    return { inserted: 0, duplicates };
  }

  const { error } = await supabase.from('keywords').insert(
    newKeywords.map(k => ({
      ...k,
      status: 'new',
    }))
  );

  if (error) throw error;
  return { inserted: newKeywords.length, duplicates };
}

export async function updateKeywordStatus(id: string, status: string, clusterId?: string): Promise<Keyword> {
  const supabase = getSupabaseServiceClient();
  if (!supabase) throw new Error('Supabase not configured');

  const updates: Record<string, unknown> = { status };
  if (clusterId) updates.cluster_id = clusterId;

  const { data, error } = await supabase
    .from('keywords')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
