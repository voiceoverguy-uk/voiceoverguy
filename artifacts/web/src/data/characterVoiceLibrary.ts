export interface CharacterVoiceEntry {
  id: string;
  title: string;
  description: string;
  mp3: string;
  aliases: string[];
}

export const characterVoiceLibrary: CharacterVoiceEntry[] = [
  {
    id: 'serious-male-voice',
    title: 'Serious Male Voice',
    description: 'A deep, authoritative male voice in the style of Jack FM radio imaging -- punchy, confident and no-nonsense.',
    mp3: '/assets/audio/serious-male-jack-fm-voice.mp3',
    aliases: ['jack fm', 'radio imaging', 'deep male', 'authoritative', 'punchy'],
  },
  {
    id: 'animated-family-film-promo-voice',
    title: 'Animated Family Film Promo Voice',
    description: 'A warm, playful voiceover in the style of Disney/Pixar film promos -- fun, energetic and family-friendly.',
    mp3: '/assets/audio/disney-pixar-inside-out-promo.mp3',
    aliases: ['disney', 'pixar', 'inside out', 'family', 'animated', 'cartoon', 'promo', 'kids'],
  },
  {
    id: 'camp-male-caesar-voice',
    title: 'Camp Male Caesar Voice',
    description: 'A flamboyant, comedic Roman centurion voice inspired by Monty Python -- theatrical, camp and wickedly funny.',
    mp3: '/assets/audio/monty-python-camp-caesar-voice.mp3',
    aliases: ['monty python', 'roman', 'centurion', 'comedy', 'theatrical', 'camp', 'funny', 'silly'],
  },
  {
    id: 'american-hillbilly-voice',
    title: 'American Hillbilly Voice',
    description: 'Funny Southern American hillbilly-style voice with a Texas flavour. Great for comedy characters, parody, cartoon roles and novelty ads.',
    mp3: '/assets/audio/southern-american-hillbilly-voice.mp3',
    aliases: ['texas hillbilly', 'southern character', 'southern american', 'hillbilly', 'texas', 'comedy', 'parody', 'cartoon'],
  },
  {
    id: 'tom-baker-style-voice',
    title: 'Tom Baker Style Voice',
    description: 'Retro Tom Baker-inspired voice style with rich, dramatic, classic British sci-fi energy. Ideal for parody, homage and vintage character work.',
    mp3: '/assets/audio/tom-baker-voice.mp3',
    aliases: ['doctor who style', 'retro sci fi', 'tom baker', 'doctor who', 'british sci-fi', 'retro', 'dramatic'],
  },
  {
    id: 'cheesy-american-tv-announcer',
    title: 'Cheesy American TV Announcer',
    description: 'Big, bold American TV announcer style with that classic over-the-top game show energy. Ideal for parody, spoof promos, retro TV and comedy commercials.',
    mp3: '/assets/audio/cheesey-american-tv-announcer.mp3',
    aliases: ['game show announcer', 'american promo voice', 'american', 'game show', 'tv announcer', 'retro tv', 'comedy'],
  },
];
