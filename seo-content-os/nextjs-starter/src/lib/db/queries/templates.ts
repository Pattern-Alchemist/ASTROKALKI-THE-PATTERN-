/**
 * Templates — query module
 * Table: templates
 */

import { getSupabaseServiceClient } from '../../supabase/server';

export interface Template {
  id: string;
  template_key: string;
  template_name: string;
  page_type: string;
  prompt_system: string | null;
  prompt_user: string | null;
  schema_type: string | null;
  section_structure: string[];
  created_at: string;
}

export async function getTemplates(pageType?: string): Promise<Template[]> {
  const supabase = getSupabaseServiceClient();
  if (!supabase) return [];

  let query = supabase.from('templates').select('*').order('created_at', { ascending: true });
  if (pageType) query = query.eq('page_type', pageType);

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function getTemplateByKey(key: string): Promise<Template | null> {
  const supabase = getSupabaseServiceClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .eq('template_key', key)
    .single();

  if (error) throw error;
  return data;
}
