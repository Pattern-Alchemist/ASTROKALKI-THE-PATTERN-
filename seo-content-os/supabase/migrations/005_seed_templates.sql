insert into templates (template_key, template_name, page_type, schema_type, section_structure)
values
('glossary_basic', 'Glossary Basic', 'glossary', 'DefinedTerm', '["intro","definition","how_it_works","faq"]'::jsonb),
('comparison_xy', 'Comparison X vs Y', 'comparison', 'Article', '["intro","differences","pros_cons","who_should_choose","faq"]'::jsonb),
('alternatives_list', 'Alternatives List', 'alternatives', 'ItemList', '["intro","best_for","alternatives","comparison_table","faq"]'::jsonb),
('use_case_guide', 'Use Case Guide', 'use-case', 'HowTo', '["intro","steps","mistakes","examples","faq"]'::jsonb)
on conflict (template_key) do nothing;
