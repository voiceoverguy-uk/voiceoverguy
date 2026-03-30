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
    description: 'A deep, authoritative male voice in a punchy radio imaging style, ideal for promos, station branding and bold commercial reads.',
    mp3: '/assets/audio/serious-male-jack-fm-voice.mp3',
    aliases: ['jack fm', 'radio imaging', 'deep male', 'authoritative', 'punchy'],
  },
  {
    id: 'animated-family-film-promo-voice',
    title: 'Animated Family Film Promo Voice',
    description: 'A warm, playful promo voice with bright, family-friendly energy, ideal for animated film campaigns, trailers and upbeat commercial work.',
    mp3: '/assets/audio/disney-pixar-inside-out-promo.mp3',
    aliases: ['disney', 'pixar', 'inside out', 'family', 'animated', 'cartoon', 'promo', 'kids'],
  },
  {
    id: 'camp-male-caesar-voice',
    title: 'Camp Male Caesar Voice',
    description: 'A flamboyant Roman comedy voice with a theatrical, camp feel, ideal for parody, character reads and larger-than-life performances.',
    mp3: '/assets/audio/monty-python-camp-caesar-voice.mp3',
    aliases: ['monty python', 'roman', 'centurion', 'comedy', 'theatrical', 'camp', 'funny', 'silly'],
  },
  {
    id: 'american-hillbilly-voice',
    title: 'American Hillbilly Voice',
    description: 'A funny Southern American hillbilly-style voice with a Texas flavour, ideal for parody, cartoon roles, novelty ads and comedy characters.',
    mp3: '/assets/audio/southern-american-hillbilly-voice.mp3',
    aliases: ['texas hillbilly', 'southern character', 'southern american', 'hillbilly', 'texas', 'comedy', 'parody', 'cartoon'],
  },
  {
    id: 'tom-baker-style-voice',
    title: 'Retro Sci-Fi Narrator Voice',
    description: 'A rich, dramatic retro sci-fi voice with classic British energy, ideal for parody, homage and vintage-style character work.',
    mp3: '/assets/audio/tom-baker-voice.mp3',
    aliases: ['doctor who style', 'retro sci fi', 'tom baker', 'doctor who', 'british sci-fi', 'retro', 'dramatic'],
  },
  {
    id: 'cheesy-american-tv-announcer',
    title: 'Cheesy American TV Announcer',
    description: 'A big, bold American announcer voice with over-the-top game show energy, ideal for spoof promos, retro TV and comedy commercials.',
    mp3: '/assets/audio/cheesey-american-tv-announcer.mp3',
    aliases: ['game show announcer', 'american promo voice', 'american', 'game show', 'tv announcer', 'retro tv', 'comedy'],
  },
  {
    id: 'dracula-voice-dairyland',
    title: 'Dracula Comedy Voice',
    description: 'A playful Dracula-style voice with a theatrical spooky edge, ideal for Halloween promos, parody scripts and comic villain reads.',
    mp3: '/assets/audio/dairyland-dracula-voice.mp3',
    aliases: ['count dracula', 'spooky vampire', 'dracula', 'vampire', 'halloween', 'spooky', 'horror comedy', 'dairyland'],
  },
  {
    id: 'camp-australian-male',
    title: 'Camp Australian Character Voice',
    description: 'A bold, lively Australian-style character voice with flamboyant comedy energy, ideal for theatre-style promos and larger-than-life reads.',
    mp3: '/assets/audio/priscilla-camp-aussie.mp3',
    aliases: ['priscilla style', 'camp australian', 'priscilla', 'australian', 'aussie', 'camp', 'theatrical'],
  },
  {
    id: 'random-character-montage',
    title: 'Character Voice Montage',
    description: 'A mixed montage of short character snippets showcasing versatility, vocal range and a variety of distinct performance styles.',
    mp3: '/assets/audio/random-character-montage.mp3',
    aliases: ['character montage', 'voice range', 'montage', 'versatility', 'mixed characters', 'showcase'],
  },
  {
    id: 'knight-rider-intro',
    title: 'Knight Rider Style Intro Voice',
    description: 'A dramatic 1980s-style American narration voice inspired by classic TV intros, ideal for parody, retro promos and cinematic voiceover.',
    mp3: '/assets/audio/knight-rider-voice.mp3',
    aliases: ['knight rider voice', 'retro tv intro', 'knight rider', 'richard basehart', 'retro', '1980s', 'american narration'],
  },
  {
    id: 'doc-brown-back-to-the-future',
    title: 'Mad Scientist Voice',
    description: 'A fast-talking, eccentric mad scientist voice with manic energy and retro sci-fi charm, ideal for parody, homage and theatrical promo work.',
    mp3: '/assets/audio/doc-brown-back-to-the-future.mp3',
    aliases: ['doc brown voice', 'back to the future style', 'doc brown', 'back to the future', 'christopher lloyd', 'eccentric', 'sci-fi', 'mad scientist'],
  },
  {
    id: 'renton-trainspotting',
    title: 'Gritty Scottish Character Voice',
    description: 'A sharp, edgy Scottish character voice with attitude and grit, ideal for parody, homage and darker comedy reads.',
    mp3: '/assets/audio/renton-trainspotting-guy-harris.mp3',
    aliases: ['renton voice', 'trainspotting style', 'renton', 'trainspotting', 'scottish', 'ewan mcgregor', 'parody', 'gritty'],
  },
  {
    id: 'super-hero-voice-comic-con',
    title: 'Super Hero Voice',
    description: 'A bold, dramatic superhero-style voice with blockbuster energy, ideal for comic events, trailers, promos and action-led character reads.',
    mp3: '/assets/audio/york-comic-con-american-super-hero-voice.mp3',
    aliases: ['superhero voice', 'comic con voice', 'superhero', 'comic con', 'american', 'blockbuster', 'trailer'],
  },
  {
    id: 'pantomime-dame',
    title: 'Pantomime Dame Voice',
    description: 'A classic camp pantomime dame voice full of festive energy and character, ideal for theatre promos, seasonal events and comedy reads.',
    mp3: '/assets/audio/pantomime-dame-guy-harris.mp3',
    aliases: ['panto dame', 'festive camp voice', 'pantomime', 'panto', 'dame', 'christmas', 'festive', 'theatre'],
  },
  {
    id: 'cockney-voice-morrisons',
    title: 'Cockney Character Voice',
    description: 'A cheeky Cockney-style character voice with playful British charm, ideal for commercials, comedy scripts and down-to-earth promo work.',
    mp3: '/assets/audio/morrisons-cockney-wonky-voice.mp3',
    aliases: ['wonky range voice', 'cheeky cockney', 'cockney', 'morrisons', 'wonky', 'british', 'cheeky'],
  },
  {
    id: 'evil-voice-mr-intoxico',
    title: 'Evil Villain Voice',
    description: 'A twisted, theatrical villain voice with a sinister comedic edge, ideal for Halloween promos, spooky events and over-the-top character work.',
    mp3: '/assets/audio/mr-intoxico-evil-voiceover-guy-harris.mp3',
    aliases: ['evil halloween voice', 'villain voice', 'evil', 'halloween', 'villain', 'sinister', 'twisted', 'spooky', 'mr intoxico'],
  },
  {
    id: 'wacky-male-voice-linkee',
    title: 'Wacky Comedy Male Voice',
    description: 'A bright, playful male character voice with energetic comedy appeal, ideal for games, toy brands, promos and fun commercial reads.',
    mp3: '/assets/audio/linkee-wacky-male-voice.mp3',
    aliases: ['linkee voice', 'wacky game voice', 'linkee', 'wacky', 'game voice', 'toy brand', 'playful', 'comedy'],
  },
];
