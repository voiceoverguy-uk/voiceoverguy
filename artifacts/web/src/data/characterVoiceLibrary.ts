export interface CharacterVoiceEntry {
  id: string;
  title: string;
  description: string;
  audioSrc: string;
  aliases?: string[];
}

export const characterVoiceLibrary: CharacterVoiceEntry[] = [
  {
    id: 'serious-male-voice',
    title: 'Serious Male Voice',
    description: 'A deep, authoritative male voice in the style of Jack FM radio imaging — punchy, confident and no-nonsense.',
    audioSrc: '/assets/audio/serious-male-jack-fm-voice.mp3',
    aliases: ['jack fm', 'radio imaging', 'deep male', 'authoritative', 'punchy'],
  },
  {
    id: 'animated-family-film-promo-voice',
    title: 'Animated Family Film Promo Voice',
    description: 'A warm, playful voiceover in the style of Disney/Pixar film promos — fun, energetic and family-friendly.',
    audioSrc: '/assets/audio/disney-pixar-inside-out-promo.mp3',
    aliases: ['disney', 'pixar', 'inside out', 'family', 'animated', 'cartoon', 'promo', 'kids'],
  },
  {
    id: 'camp-male-caesar-voice',
    title: 'Camp Male Caesar Voice',
    description: 'A flamboyant, comedic Roman centurion voice inspired by Monty Python — theatrical, camp and wickedly funny.',
    audioSrc: '/assets/audio/monty-python-camp-caesar-voice.mp3',
    aliases: ['monty python', 'roman', 'centurion', 'comedy', 'theatrical', 'camp', 'funny', 'silly'],
  },
];
