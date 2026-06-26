/**
 * Publish Jobs — query/mutation module
 * Table: publish_jobs
 */

import { getSupabaseServiceClient } from '../../supabase/server';

export interface PublishJob {
  id: string;
  content_item_id: string;
  target_system: string;
  target_path: string | null;
  git_branch: string | null;
  commit_sha: string | null;
  publish_status: string;
  response_payload: Record<string, unknown> | null;
  created_at: string;
  completed_at: string | null;
}

export async function createPublishJob(
  contentItemId: string,
  targetSystem: string = 'nextjs'
): Promise<PublishJob> {
  const supabase = getSupabaseServiceClient();
  if (!supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('publish_jobs')
    .insert({
      content_item_id: contentItemId,
      target_system: targetSystem,
      publish_status: 'pending',
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function completePublishJob(
  id: string,
  updates: {
    publish_status: string;
    target_path?: string;
    git_branch?: string;
    commit_sha?: string;
    response_payload?: Record<string, unknown>;
  }
): Promise<PublishJob> {
  const supabase = getSupabaseServiceClient();
  if (!supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('publish_jobs')
    .update({
      ...updates,
      completed_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getPublishJobs(contentItemId: string): Promise<PublishJob[]> {
  const supabase = getSupabaseServiceClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('publish_jobs')
    .select('*')
    .eq('content_item_id', contentItemId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}
