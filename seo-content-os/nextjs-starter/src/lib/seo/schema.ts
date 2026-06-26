export function buildSchema(type: string, payload: Record<string, unknown>) {
  return { '@context': 'https://schema.org', '@type': type, ...payload };
}
