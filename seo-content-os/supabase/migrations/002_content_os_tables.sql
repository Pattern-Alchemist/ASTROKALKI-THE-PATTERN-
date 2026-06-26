create table if not exists clusters (
  id uuid primary key default gen_random_uuid(),
  cluster_name text not null,
  primary_keyword text not null,
  page_type text not null,
  search_intent text,
  target_slug text unique,
  pillar_topic text,
  status text not null default 'planned',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists keywords (
  id uuid primary key default gen_random_uuid(),
  cluster_id uuid references clusters(id) on delete set null,
  keyword text not null,
  normalized_keyword text not null,
  search_intent text,
  priority_score numeric,
  source text,
  status text not null default 'new',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists templates (
  id uuid primary key default gen_random_uuid(),
  template_key text unique not null,
  template_name text not null,
  page_type text not null,
  prompt_system text,
  prompt_user text,
  schema_type text,
  section_structure jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists briefs (
  id uuid primary key default gen_random_uuid(),
  cluster_id uuid not null references clusters(id) on delete cascade,
  serp_summary jsonb,
  competitors jsonb,
  headings jsonb,
  faq_items jsonb,
  entities jsonb,
  internal_link_targets jsonb,
  schema_recommendation text,
  status text not null default 'drafted',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists content_items (
  id uuid primary key default gen_random_uuid(),
  cluster_id uuid not null references clusters(id) on delete cascade,
  brief_id uuid references briefs(id) on delete set null,
  template_id uuid references templates(id) on delete set null,
  title text,
  slug text unique not null,
  meta_title text,
  meta_description text,
  excerpt text,
  content_md text,
  content_json jsonb,
  schema_json jsonb,
  canonical_url text,
  word_count integer,
  language text not null default 'en',
  status text not null default 'queued',
  qa_score numeric,
  publish_target text not null default 'nextjs',
  published_at timestamptz,
  last_refreshed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists internal_links (
  id uuid primary key default gen_random_uuid(),
  source_content_id uuid not null references content_items(id) on delete cascade,
  target_content_id uuid not null references content_items(id) on delete cascade,
  anchor_text text not null,
  link_reason text,
  status text not null default 'suggested',
  created_at timestamptz not null default now()
);

create table if not exists publish_jobs (
  id uuid primary key default gen_random_uuid(),
  content_item_id uuid not null references content_items(id) on delete cascade,
  target_system text not null,
  target_path text,
  git_branch text,
  commit_sha text,
  publish_status text not null default 'pending',
  response_payload jsonb,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create table if not exists automation_runs (
  id uuid primary key default gen_random_uuid(),
  run_type text not null,
  trigger_source text,
  input_payload jsonb,
  output_payload jsonb,
  status text not null default 'running',
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  error_message text
);
