/**
 * Clusters — query/mutation module
 * Table: clusters
 */

import { getSupabaseServiceClient } from '../../supabase/server';

export interface Cluster {
  id: string;
  cluster_name: string;
  primary_keyword: string;
  page_type: string;
  search_intent: string | null;
  target_slug: string | null;
  pillar_topic: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CreateClusterInput {
  cluster_name: string;
  primary_keyword: string;
  page_type: string;
  search_intent?: string;
  target_slug?: string;
  pillar_topic?: string;
  status?: string;
}

export async function getClusters(status?: string): Promise<Cluster[]> {
  const supabase = getSupabaseServiceClient();
  if (!supabase) return [];

  let query = supabase.from('clusters').select('*').order('created_at', { ascending: false });
  if (status) query = query.eq('status', status);

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function getClusterById(id: string): Promise<Cluster | null> {
  const supabase = getSupabaseServiceClient();
  if (!supabase) return null;

  const { data, error } = await supabase.from('clusters').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

export async function getClusterBySlug(slug: string): Promise<Cluster | null> {
  const supabase = getSupabaseServiceClient();
  if (!supabase) return null;

  const { data, error } = await supabase.from('clusters').select('*').eq('target_slug', slug).single();
  if (error) throw error;
  return data;
}

export async function createCluster(input: CreateClusterInput): Promise<Cluster> {
  const supabase = getSupabaseServiceClient();
  if (!supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('clusters')
    .insert({ ...input, status: input.status || 'planned' })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateCluster(id: string, updates: Partial<Cluster>): Promise<Cluster> {
  const supabase = getSupabaseServiceClient();
  if (!supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('clusters')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
