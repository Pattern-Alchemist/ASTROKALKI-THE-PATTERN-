create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_clusters_updated_at on clusters;
create trigger trg_clusters_updated_at
before update on clusters
for each row execute function set_updated_at();

drop trigger if exists trg_keywords_updated_at on keywords;
create trigger trg_keywords_updated_at
before update on keywords
for each row execute function set_updated_at();

drop trigger if exists trg_briefs_updated_at on briefs;
create trigger trg_briefs_updated_at
before update on briefs
for each row execute function set_updated_at();

drop trigger if exists trg_content_items_updated_at on content_items;
create trigger trg_content_items_updated_at
before update on content_items
for each row execute function set_updated_at();
