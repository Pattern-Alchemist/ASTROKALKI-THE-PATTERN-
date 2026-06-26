/**
 * Briefs — query/mutation module
 * Table: briefs
 */

import { getSupabaseServiceClient } from '../../supabase/server';

export interface Brief {
  id: string;
  cluster_id: string;
  serp_summary: Record<string, unknown> | null;
  competitors: Record<string, unknown>[] | null;
  headings: Record<string, unknown>[] | null;
  faq_items: Record<string, unknown>[] | null;
  entities: string[] | null;
  internal_link_targets: Record<string, unknown>[] | null;
  schema_recommendation: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CreateBriefInput {
  cluster_id: string;
  serp_summary?: Record<string, unknown>;
  competitors?: Record<string, unknown>[];
  headings?: Record<string, unknown>[];
  faq_items?: Record<string, unknown>[];
  entities?: string[];
  internal_link_targets?: Record<string, unknown>[];
  schema_recommendation?: string;
  status?: string;
}

export async function getBriefByCluster(clusterId: string): Promise<Brief | null> {
  const supabase = getSupabaseServiceClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('briefs')
    .select('*')
    .eq('cluster_id', clusterId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows
  return data;
}

export async function createBrief(input: CreateBriefInput): Promise<Brief> {
  const supabase = getSupabaseServiceClient();
  if (!supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('briefs')
    .insert({ ...input, status: input.status || 'drafted' })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateBrief(id: string, updates: Partial<Brief>): Promise<Brief> {
  const supabase = getSupabaseServiceClient();
  if (!supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('briefs')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
