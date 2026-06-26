/**
 * Automation Runs — query/mutation module
 * Table: automation_runs
 *
 * Tracks every n8n workflow run for audit + debugging.
 */

import { getSupabaseServiceClient } from '../../supabase/server';

export interface AutomationRun {
  id: string;
  run_type: string;
  trigger_source: string | null;
  input_payload: Record<string, unknown> | null;
  output_payload: Record<string, unknown> | null;
  status: string;
  started_at: string;
  finished_at: string | null;
  error_message: string | null;
}

export interface CreateAutomationRunInput {
  run_type: string;
  trigger_source?: string;
  input_payload?: Record<string, unknown>;
  status?: string;
}

export async function createAutomationRun(input: CreateAutomationRunInput): Promise<AutomationRun> {
  const supabase = getSupabaseServiceClient();
  if (!supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('automation_runs')
    .insert({
      run_type: input.run_type,
      trigger_source: input.trigger_source || null,
      input_payload: input.input_payload || null,
      status: input.status || 'running',
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function completeAutomationRun(
  id: string,
  outputPayload: Record<string, unknown>,
  status: string = 'completed',
  errorMessage?: string
): Promise<AutomationRun> {
  const supabase = getSupabaseServiceClient();
  if (!supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('automation_runs')
    .update({
      output_payload: outputPayload,
      status,
      finished_at: new Date().toISOString(),
      error_message: errorMessage || null,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getAutomationRuns(runType?: string, limit = 50): Promise<AutomationRun[]> {
  const supabase = getSupabaseServiceClient();
  if (!supabase) return [];

  let query = supabase
    .from('automation_runs')
    .select('*')
    .order('started_at', { ascending: false })
    .limit(limit);

  if (runType) query = query.eq('run_type', runType);

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}
