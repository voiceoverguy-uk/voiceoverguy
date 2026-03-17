export type BlogRating = 'highest' | 'middle' | 'lowest' | 'not-a-blog';

const LEGACY_MAP: Record<string, BlogRating> = {
  '5': 'highest',
  '3': 'middle',
  '1': 'lowest',
  '0': 'not-a-blog',
};

const TIER_ORDER: Record<BlogRating, number> = {
  'highest': 0,
  'middle': 1,
  'lowest': 2,
  'not-a-blog': 3,
};

export function fromLegacyRating(value: string): BlogRating {
  return LEGACY_MAP[value] ?? 'middle';
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function sortByRating<T extends { blogRating: BlogRating }>(posts: T[]): T[] {
  const tiers: Record<BlogRating, T[]> = {
    'highest': [],
    'middle': [],
    'lowest': [],
    'not-a-blog': [],
  };

  for (const post of posts) {
    tiers[post.blogRating].push(post);
  }

  return [
    ...shuffle(tiers['highest']),
    ...shuffle(tiers['middle']),
    ...shuffle(tiers['lowest']),
  ];
}
