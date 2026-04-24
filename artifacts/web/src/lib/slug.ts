export function normalizeSlug(input: string | null | undefined): string {
  return (input || '').trim();
}

export function isCleanSlug(slug: string): boolean {
  return slug.length > 0 && !/[\s/?#%]/.test(slug);
}

export function getCleanSlug(input: string | null | undefined): string | null {
  const normalized = normalizeSlug(input);
  return isCleanSlug(normalized) ? normalized : null;
}
