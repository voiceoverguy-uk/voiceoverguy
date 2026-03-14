export interface Project {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  h2?: string;
  intro?: string;
  youtubeId?: string;
  audioUrl?: string;
  imageUrl?: string;
  imageAlt?: string;
  relatedLinks?: { label: string; href: string }[];
}

// Starter entries for known portfolio pages — expand from live site data
// TODO: populate all 200+ entries from live site during Phase 2
export const projects: Project[] = [
  {
    slug: 'disney-store-marvel-voiceover',
    title: 'Disney Store Marvel Voiceover | VoiceoverGuy',
    metaTitle: 'Disney Store Marvel Voiceover',
    metaDescription: 'Guy Harris voiced the Disney Store Marvel campaign. British male voiceover for one of the world\'s biggest brands.',
    h1: 'Disney Store Marvel Voiceover',
    intro: 'Guy Harris provided the British male voiceover for the Disney Store Marvel campaign. A powerful, authoritative read that matched the epic scale of the Marvel universe.',
    relatedLinks: [
      { label: 'Commercial Voiceover', href: '/commercial-voiceover' },
      { label: 'Contact Guy', href: '/contact-guy' },
    ],
  },
  {
    slug: 'britains-got-talent-competition-voice',
    title: "Britain's Got Talent Competition Voice | VoiceoverGuy",
    metaTitle: "Britain's Got Talent Competition Voice",
    metaDescription: "Guy Harris is the competition voice for Britain's Got Talent on ITV. Hear the voice behind the biggest talent show in the UK.",
    h1: "Britain's Got Talent Competition Voice",
    intro: "Guy Harris voiced the competition spots for the entire Britain's Got Talent 2025 series on ITV — the biggest talent show in the UK. His energetic, engaging delivery brought the prize elements to life for millions of viewers.",
    relatedLinks: [
      { label: 'TV & Commercial Voiceover', href: '/commercial-voiceover' },
      { label: 'Voice of God', href: '/voice-of-god' },
    ],
  },
  {
    slug: 'worms-wmd-character-voices',
    title: 'WORMS WMD Army Sergeant Character Voice | VoiceoverGuy',
    metaTitle: 'WORMS WMD Character Voices',
    metaDescription: 'Guy Harris voiced the Army Sergeant character in WORMS WMD by Team17. Hear his game character voiceover performance.',
    h1: 'WORMS WMD – Army Sergeant Character Voice',
    youtubeId: 'AnXBP5Klgv0',
    intro: 'Guy Harris voiced the iconic Army Sergeant character for WORMS WMD, the beloved strategy game by Team17. His gruff, commanding delivery became one of the most memorable characters in the franchise.',
    relatedLinks: [
      { label: 'Character Voiceovers', href: '/character-voiceover' },
      { label: 'Game Trailer Voice', href: '/game-trailer-voice' },
    ],
  },
  {
    slug: 'thomas-the-tank-engine-voice-of-salty',
    title: 'Thomas the Tank Engine – Voice of Salty | VoiceoverGuy',
    metaTitle: 'Thomas the Tank Engine – Voice of Salty',
    metaDescription: "Guy Harris is the voice of Salty and Winston in Thomas & Friends All Engines Go. British male character voiceover.",
    h1: "Thomas & Friends – Voice of Salty",
    intro: "Guy Harris is the voice of Salty, Winston and the Blue Troublesome Tanker in Thomas & Friends All Engines Go — the beloved children's animated series watched by millions of children worldwide.",
    relatedLinks: [
      { label: 'Character Voiceovers', href: '/character-voiceover' },
      { label: 'Animation Voiceovers', href: '/animation-voiceovers' },
    ],
  },
  {
    slug: 'bbc-radio-2-voice-of-santa',
    title: 'BBC Radio 2 – Voice of Santa | VoiceoverGuy',
    metaTitle: 'BBC Radio 2 Voice of Santa',
    metaDescription: 'Guy Harris is the Voice of Santa on BBC Radio 2. The UK\'s No.1 Santa voice for Christmas campaigns and broadcasts.',
    h1: 'BBC Radio 2 – Voice of Santa',
    intro: 'Guy Harris provided the Voice of Santa for BBC Radio 2, one of the UK\'s most listened-to radio stations. His warm, jolly and instantly recognisable Santa voice has been heard by millions across the UK.',
    relatedLinks: [
      { label: 'Santa Voice', href: '/santa-voice' },
      { label: 'Contact Guy', href: '/contact-guy' },
    ],
  },
  {
    slug: 'masked-singer-voice-of-god-butlins',
    title: 'The Masked Singer – Voice of God at Butlins | VoiceoverGuy',
    metaTitle: 'The Masked Singer Voice of God – Butlins',
    metaDescription: "Guy Harris is the Voice of God for The Masked Singer at Butlins. Powerful event announcing voice for live shows.",
    h1: "The Masked Singer – Voice of God at Butlins",
    intro: "Guy Harris is the Voice of God for The Masked Singer live shows at Butlins holiday parks across the UK. His commanding, authoritative delivery sets the scene for one of the country's most popular live entertainment events.",
    relatedLinks: [
      { label: 'Voice of God', href: '/voice-of-god' },
      { label: 'Event & Awards Voiceover', href: '/voice-of-god' },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return projects.map(p => p.slug);
}
