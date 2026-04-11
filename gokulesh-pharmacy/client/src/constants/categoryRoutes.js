/**
 * Public URL segments under /category/:name — map to Category.slug in MongoDB when they differ.
 * Ensure admin categories use these slugs (or add aliases below).
 */
export const CATEGORY_QUICK_LINKS = [
  { path: 'hing', label: 'Hing' },
  { path: 'churan', label: 'Churan' },
  { path: 'achar', label: 'Achar' },
  { path: 'mukwas', label: 'Mukwas' }
];

/** URL param → preferred category slug in database */
const SLUG_ALIASES = {
  mukwas: 'mukhwas'
};

export function resolveCategorySlugFromUrl(urlSegment) {
  if (!urlSegment || typeof urlSegment !== 'string') return '';
  const key = urlSegment.toLowerCase().trim();
  return SLUG_ALIASES[key] || key;
}
