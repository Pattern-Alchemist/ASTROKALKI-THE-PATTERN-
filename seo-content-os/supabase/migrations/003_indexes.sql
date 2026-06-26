create index if not exists idx_keywords_normalized on keywords(normalized_keyword);
create index if not exists idx_keywords_cluster_id on keywords(cluster_id);
create index if not exists idx_clusters_target_slug on clusters(target_slug);
create index if not exists idx_content_items_slug on content_items(slug);
create index if not exists idx_content_items_status on content_items(status);
create index if not exists idx_content_items_cluster_id on content_items(cluster_id);
create index if not exists idx_publish_jobs_status on publish_jobs(publish_status);
create index if not exists idx_automation_runs_type_status on automation_runs(run_type, status);
create index if not exists idx_content_items_search on content_items using gin (to_tsvector('english', coalesce(title,'') || ' ' || coalesce(content_md,'')));
