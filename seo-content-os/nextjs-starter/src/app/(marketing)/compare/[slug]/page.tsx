import { getContentBySlug } from '@/lib/db/queries/content-items';

export default async function PatternPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getContentBySlug(slug);
  if (!item) return <main><h1>Not found</h1></main>;
  return <main><h1>{item.title}</h1><article>{item.content_md}</article></main>;
}
