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
  {
    id: 'dracula-voice-dairyland',
    title: 'Dracula Voice for Dairyland',
    description: 'Count Dracula-style voice with a playful, theatrical edge. Great for spooky comedy, Halloween promos, parody scripts and larger-than-life character reads.',
    mp3: '/assets/audio/dairyland-dracula-voice.mp3',
    aliases: ['count dracula', 'spooky vampire', 'dracula', 'vampire', 'halloween', 'spooky', 'horror comedy'],
  },
  {
    id: 'camp-australian-male',
    title: 'Camp Australian Male',
    description: 'Camp Australian male voice created for Priscilla Queen of the Desert. Bold, lively and full of personality, ideal for theatre-style promos, comedy and flamboyant character work.',
    mp3: '/assets/audio/priscilla-camp-aussie.mp3',
    aliases: ['priscilla style', 'camp australian', 'priscilla', 'australian', 'aussie', 'camp', 'theatrical'],
  },
  {
    id: 'random-character-montage',
    title: 'Random Character Montage',
    description: 'A mixed montage of short story snippets performed in a range of different character voices. Slightly odd in the best way, but a strong showcase of versatility and vocal range.',
    mp3: '/assets/audio/random-character-montage.mp3',
    aliases: ['character montage', 'voice range', 'montage', 'versatility', 'mixed characters', 'showcase'],
  },
  {
    id: 'pantomime-dame',
    title: 'Pantomime Dame',
    description: 'A classic camp male pantomime dame voice with big festive energy and plenty of character. Perfect for Christmas shows, theatre promos, seasonal events and larger-than-life comedy reads.',
    mp3: '/assets/audio/pantomime-dame-guy-harris.mp3',
    aliases: ['panto dame', 'festive camp voice', 'pantomime', 'panto', 'dame', 'christmas', 'festive', 'theatre'],
  },
  {
    id: 'cockney-voice-morrisons',
    title: 'Cockney Voice',
    description: 'Cheeky, fun Cockney-style voice used for the Morrisons Wonky Range. Full of character and ideal for playful commercials, comedy reads and down-to-earth British promo work.',
    mp3: '/assets/audio/morrisons-cockney-wonky-voice.mp3',
    aliases: ['wonky range voice', 'cheeky cockney', 'cockney', 'morrisons', 'wonky', 'british', 'cheeky'],
  },
  {
    id: 'evil-voice-mr-intoxico',
    title: 'Evil Voice for Mr Intoxico',
    description: 'High-pitched evil character voice with a twisted, theatrical feel. Ideal for Halloween promos, spooky events, sinister comedy and over-the-top villain work.',
    mp3: '/assets/audio/mr-intoxico-evil-voiceover-guy-harris.mp3',
    aliases: ['evil halloween voice', 'villain voice', 'evil', 'halloween', 'villain', 'sinister', 'twisted', 'spooky'],
  },
  {
    id: 'wacky-male-voice-linkee',
    title: 'Wacky Male Voice for Linkee',
    description: 'Fun, wacky male voice created for the game Linkee. Bright, playful and full of character, ideal for games, toy brands, comedy reads and energetic promos.',
    mp3: '/assets/audio/linkee-wacky-male-voice.mp3',
    aliases: ['linkee voice', 'wacky game voice', 'linkee', 'wacky', 'game voice', 'toy brand', 'playful'],
  },
];
