'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';

type Category = 'all' | 'studio' | 'clients' | 'character' | 'santa' | 'audio' | 'humour' | 'auditions';

interface Cartoon {
  src: string;
  alt: string;
  title: string;
  caption?: string;
  cats: Exclude<Category, 'all'>[];
}

const FILTERS: { id: Category; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'studio', label: 'Studio Life' },
  { id: 'clients', label: 'Clients & Briefs' },
  { id: 'character', label: 'Character Voices' },
  { id: 'santa', label: 'Santa & Christmas' },
  { id: 'audio', label: 'Audio Editing & Tech' },
  { id: 'humour', label: 'Industry Humour' },
  { id: 'auditions', label: 'Auditions & Agents' },
];

const B = '/assets/images/cartoons/';

const cartoons: Cartoon[] = [
  {
    src: `${B}Voiceover-Cartoon-12-Days.webp`,
    alt: 'Voiceover cartoon about the 12 days of Christmas by Guy Harris',
    title: 'The 12 Days',
    caption: 'Twelve studio problems, eleven client revisions, ten takes rewound…',
    cats: ['santa'],
  },
  {
    src: `${B}Voiceover-Cartoon-A-30.webp`,
    alt: 'Voiceover cartoon about recording a 30-second spot by Guy Harris',
    title: 'A 30-Second Spot',
    caption: 'Thirty seconds. Every single word counts.',
    cats: ['clients'],
  },
  {
    src: `${B}Voiceover-Cartoon-Accents.webp`,
    alt: 'Voiceover cartoon about doing accents by Guy Harris',
    title: 'Accents',
    caption: 'Mexican accent? No problema! — the joy of character accents in voiceover.',
    cats: ['character'],
  },
  {
    src: `${B}Voiceover-Cartoon-Agency-Nerves.webp`,
    alt: 'Voiceover cartoon about nerves before an agency audition by Guy Harris',
    title: 'Agency Nerves',
    caption: 'Every voiceover artist knows the butterflies before an agency audition.',
    cats: ['auditions', 'humour'],
  },
  {
    src: `${B}Voiceover-Cartoon-Agent.webp`,
    alt: 'Voiceover cartoon about voiceover agents by Guy Harris',
    title: 'The Agent',
    caption: "Don't you know who I am? The voiceover ego in full flight.",
    cats: ['auditions', 'humour'],
  },
  {
    src: `${B}Voiceover-Cartoon-Alexander-Technique.webp`,
    alt: 'Voiceover cartoon about the Alexander Technique for voiceover posture by Guy Harris',
    title: 'Alexander Technique',
    caption: 'Stand tall, breathe deep — posture matters in the home studio.',
    cats: ['studio'],
  },
  {
    src: `${B}Voiceover-Cartoon-Awards.webp`,
    alt: 'Voiceover cartoon about award-winning voiceover by Guy Harris',
    title: 'Awards',
    caption: "When you're ready… award-winning voiceover.",
    cats: ['humour'],
  },
  {
    src: `${B}Voiceover-Cartoon-Awesome-At-Oral.webp`,
    alt: 'Voiceover cartoon about being awesome at oral delivery by Guy Harris',
    title: 'Awesome at Oral',
    caption: 'Voiceovers — awesome at oral.',
    cats: ['humour'],
  },
  {
    src: `${B}Voiceover-Cartoon-Bad-Santa.webp`,
    alt: 'Voiceover cartoon about a bad Santa voiceover performance by Guy Harris',
    title: 'Bad Santa',
    caption: "Not every Santa job goes to plan — even for the pros.",
    cats: ['santa'],
  },
  {
    src: `${B}Voiceover-Cartoon-Busy-Day.webp`,
    alt: 'Voiceover cartoon about a busy day in the recording studio by Guy Harris',
    title: 'Busy Day',
    caption: "Can we do tomorrow? I'm completely stacked out today.",
    cats: ['studio', 'clients'],
  },
  {
    src: `${B}Voiceover-Cartoon-Child-Voices.webp`,
    alt: 'Voiceover cartoon about doing child voices as an adult by Guy Harris',
    title: 'Child Voices',
    caption: 'Doing child voices as an adult voiceover artist — a particular skill.',
    cats: ['character'],
  },
  {
    src: `${B}Voiceover-Cartoon-Clothing.webp`,
    alt: 'Voiceover cartoon about what to wear in the recording booth by Guy Harris',
    title: 'Clothing',
    caption: 'Apprentice clothing — what do you actually wear in the booth?',
    cats: ['studio'],
  },
  {
    src: `${B}Voiceover-Cartoon-Darth-Vader.webp`,
    alt: 'Voiceover cartoon about the Darth Vader voice impression by Guy Harris',
    title: 'Darth Vader',
    caption: "I am your father — the classic dark lord impression.",
    cats: ['character'],
  },
  {
    src: `${B}Voiceover-Cartoon-DeBreathing.webp`,
    alt: 'Voiceover cartoon about de-breathing audio in post production by Guy Harris',
    title: 'De-Breathing',
    caption: 'Hours spent removing every audible breath from a recording.',
    cats: ['audio'],
  },
  {
    src: `${B}Voiceover-Cartoon-DeEssing.webp`,
    alt: 'Voiceover cartoon about de-essing sibilance in voiceover by Guy Harris',
    title: 'De-Essing',
    caption: 'Removing harsh sibilance — the de-esser is your best friend.',
    cats: ['audio'],
  },
  {
    src: `${B}Voiceover-Cartoon-Demo-Tapes.webp`,
    alt: 'Voiceover cartoon about demo tapes and showreels by Guy Harris',
    title: 'Demo Tapes',
    caption: 'The currency of the voiceover world — your demo reel.',
    cats: ['auditions', 'humour'],
  },
  {
    src: `${B}Voiceover-Cartoon-Dinner-Bore.webp`,
    alt: 'Voiceover cartoon about talking about voiceover all evening by Guy Harris',
    title: 'Dinner Bore',
    caption: 'The dinner party bore — talking about voiceover all evening.',
    cats: ['studio', 'humour'],
  },
  {
    src: `${B}Voiceover-Cartoon-Dont-You-Know-Who-I-am.webp`,
    alt: 'Voiceover cartoon about voiceover self-importance by Guy Harris',
    title: "Don't You Know Who I Am?",
    caption: "Voiceover self-importance reaches spectacular heights.",
    cats: ['humour'],
  },
  {
    src: `${B}Voiceover-Cartoon-Equity.webp`,
    alt: 'Voiceover cartoon about Equity union membership by Guy Harris',
    title: 'Equity',
    caption: 'Equity union membership — the professional voiceover badge.',
    cats: ['humour'],
  },
  {
    src: `${B}Voiceover-Cartoon-How-Much.webp`,
    alt: 'Voiceover cartoon about voiceover rates and costs by Guy Harris',
    title: 'How Much?',
    caption: "How much does a voiceover cost? It's the question everyone asks.",
    cats: ['clients'],
  },
  {
    src: `${B}Voiceover-Cartoon-HowJSay.webp`,
    alt: 'Voiceover cartoon about the HowJSay pronunciation guide by Guy Harris',
    title: 'HowJSay',
    caption: 'The voiceover artist\'s secret weapon for tricky pronunciations.',
    cats: ['audio'],
  },
  {
    src: `${B}Voiceover-Cartoon-In-Store-747x1024.webp`,
    alt: 'Voiceover cartoon about in-store PA voiceover announcements by Guy Harris',
    title: 'In-Store',
    caption: 'In-store PA announcements — the underrated voiceover format.',
    cats: ['clients'],
  },
  {
    src: `${B}Voiceover-Cartoon-Just-got-up.webp`,
    alt: 'Voiceover cartoon about recording first thing in the morning by Guy Harris',
    title: 'Just Got Up',
    caption: 'First thing in the morning voice — some clients actually ask for it.',
    cats: ['studio'],
  },
  {
    src: `${B}Voiceover-Cartoon-Last-Minute-Job.webp`,
    alt: 'Voiceover cartoon about a last-minute voiceover job request by Guy Harris',
    title: 'Last Minute Job',
    caption: "Can you turn it around in an hour? The last-minute voiceover emergency.",
    cats: ['clients'],
  },
  {
    src: `${B}Voiceover-Cartoon-London-Jobs.webp`,
    alt: 'Voiceover cartoon about London voiceover studio sessions by Guy Harris',
    title: 'London Jobs',
    caption: 'Heading into a West End studio — the London voiceover session.',
    cats: ['studio', 'clients'],
  },
  {
    src: `${B}Voiceover-Cartoon-Losing-the-big-gig.webp`,
    alt: 'Voiceover cartoon about losing a big voiceover job by Guy Harris',
    title: 'Losing the Big Gig',
    caption: 'You were so close — then another voice got the call.',
    cats: ['humour', 'auditions'],
  },
  {
    src: `${B}Voiceover-Cartoon-Mic-Selection.webp`,
    alt: 'Voiceover cartoon about microphone selection for voiceover by Guy Harris',
    title: 'Mic Selection',
    caption: 'Which microphone? The eternal question of every home studio.',
    cats: ['studio'],
  },
  {
    src: `${B}Voiceover-Cartoon-Multitasking.webp`,
    alt: 'Voiceover cartoon about multitasking as a freelance voiceover artist by Guy Harris',
    title: 'Multitasking',
    caption: 'Voiceover artist, engineer, accountant, receptionist — all in one.',
    cats: ['studio'],
  },
  {
    src: `${B}Voiceover-Cartoon-NDA.webp`,
    alt: 'Voiceover cartoon about non-disclosure agreements in voiceover by Guy Harris',
    title: 'NDA',
    caption: "Sign here, and here, and here — the voiceover NDA is real.",
    cats: ['clients'],
  },
  {
    src: `${B}Voiceover-Cartoon-Narration.webp`,
    alt: 'Voiceover cartoon about long-form narration voiceover by Guy Harris',
    title: 'Narration',
    caption: 'Long-form narration — settle in, this could take a while.',
    cats: ['humour'],
  },
  {
    src: `${B}Voiceover-Cartoon-Nov-5th.webp`,
    alt: 'Voiceover cartoon about November 5th bonfire night scary voiceover by Guy Harris',
    title: 'November 5th',
    caption: "Remember, remember — the perfect night for a spooky character voiceover.",
    cats: ['character'],
  },
  {
    src: `${B}Voiceover-Cartoon-Off-Mic.webp`,
    alt: 'Voiceover cartoon about going off-mic in the recording studio by Guy Harris',
    title: 'Off Mic',
    caption: 'The mic caught everything. Absolutely everything.',
    cats: ['studio'],
  },
  {
    src: `${B}Voiceover-Cartoon-On-The-Hunt.webp`,
    alt: 'Voiceover cartoon about hunting for voiceover work by Guy Harris',
    title: 'On the Hunt',
    caption: 'Marketing, emailing, chasing — the endless hunt for voiceover work.',
    cats: ['auditions', 'clients'],
  },
  {
    src: `${B}Voiceover-Cartoon-OnHold.webp`,
    alt: 'Voiceover cartoon about on-hold telephone voiceover messages by Guy Harris',
    title: 'On Hold',
    caption: 'Your call is important to us — on-hold voiceover messages.',
    cats: ['clients'],
  },
  {
    src: `${B}Voiceover-Cartoon-Overseas-debts.webp`,
    alt: 'Voiceover cartoon about international voiceover clients by Guy Harris',
    title: 'Overseas Debts',
    caption: 'International clients bring international payment adventures.',
    cats: ['clients'],
  },
  {
    src: `${B}Voiceover-Cartoon-Own-Studio.webp`,
    alt: 'Voiceover cartoon about building a home voiceover studio by Guy Harris',
    title: 'Own Studio',
    caption: 'The dream of every voiceover artist — a perfect home studio.',
    cats: ['studio'],
  },
  {
    src: `${B}Voiceover-Cartoon-Pay-Peanuts.webp`,
    alt: 'Voiceover cartoon about voiceover rates and fair pay by Guy Harris',
    title: 'Pay Peanuts',
    caption: 'Pay peanuts, get monkeys — voiceover rates matter.',
    cats: ['clients'],
  },
  {
    src: `${B}Voiceover-Cartoon-Phone-Patching.webp`,
    alt: 'Voiceover cartoon about phone patching for remote directed sessions by Guy Harris',
    title: 'Phone Patching',
    caption: 'Directing a session over the phone — old school but it works.',
    cats: ['studio'],
  },
  {
    src: `${B}Voiceover-Cartoon-Pirate-Voice.webp`,
    alt: 'Voiceover cartoon about doing a pirate character voice by Guy Harris',
    title: 'Pirate Voice',
    caption: 'Arr! Character voiceover at its most swashbuckling.',
    cats: ['character'],
  },
  {
    src: `${B}Voiceover-Cartoon-Pitch-Shifting.webp`,
    alt: 'Voiceover cartoon about pitch shifting in audio post production by Guy Harris',
    title: 'Pitch Shifting',
    caption: 'A little pitch shift goes a long way in audio post production.',
    cats: ['audio'],
  },
  {
    src: `${B}Voiceover-Cartoon-Poorly-Sick.webp`,
    alt: 'Voiceover cartoon about recording when ill by Guy Harris',
    title: 'Poorly Sick',
    caption: 'The show must go on — recording when under the weather.',
    cats: ['studio'],
  },
  {
    src: `${B}Voiceover-Cartoon-Popping-The-Mic.webp`,
    alt: 'Voiceover cartoon about mic plosives in voiceover recording by Guy Harris',
    title: 'Popping the Mic',
    caption: 'P, B and T — the plosive enemies of a clean voiceover take.',
    cats: ['studio', 'audio'],
  },
  {
    src: `${B}Voiceover-Cartoon-Quiet-Days.webp`,
    alt: 'Voiceover cartoon about quiet days waiting for work by Guy Harris',
    title: 'Quiet Days',
    caption: 'Waiting for the voiceover phone to ring… and waiting…',
    cats: ['studio'],
  },
  {
    src: `${B}Voiceover-Cartoon-Rudolf.webp`,
    alt: 'Voiceover cartoon about Rudolf the red-nosed voiceover reindeer by Guy Harris',
    title: 'Rudolf',
    caption: "Rudolf the red-nosed reindeer — the voiceover artist's seasonal companion.",
    cats: ['santa'],
  },
  {
    src: `${B}Voiceover-Cartoon-Santa-Calls.webp`,
    alt: 'Voiceover cartoon about live Santa Claus telephone calls by Guy Harris',
    title: 'Santa Calls',
    caption: 'Live Santa telephone calls — Guy Harris has done hundreds of them.',
    cats: ['santa'],
  },
  {
    src: `${B}Voiceover-Cartoon-Santa-Magic-747x1024.webp`,
    alt: 'Voiceover cartoon about the magic of a Santa voiceover session by Guy Harris',
    title: 'Santa Magic',
    caption: 'The magic of Christmas captured in a perfect Santa voiceover session.',
    cats: ['santa'],
  },
  {
    src: `${B}Voiceover-Cartoon-Santa-Style.webp`,
    alt: 'Voiceover cartoon about reading in a Santa style for festive campaigns by Guy Harris',
    title: 'Santa Style',
    caption: 'Warm, jolly, magical — reading in a Santa style for festive campaigns.',
    cats: ['santa'],
  },
  {
    src: `${B}Voiceover-Cartoon-Scary-Voices.webp`,
    alt: 'Voiceover cartoon about scary horror character voiceover by Guy Harris',
    title: 'Scary Voices',
    caption: 'Spooky, sinister, chilling — scary character voices are a specialist skill.',
    cats: ['character'],
  },
  {
    src: `${B}Voiceover-Cartoon-Scary-VoicesII.webp`,
    alt: 'Voiceover cartoon about more horror character voiceover performances by Guy Harris',
    title: 'Scary Voices II',
    caption: 'More horror — the sequel to scary voices.',
    cats: ['character'],
  },
  {
    src: `${B}Voiceover-Cartoon-Scary-VoicesIV.webp`,
    alt: 'Voiceover cartoon about taking horror voiceover further by Guy Harris',
    title: 'Scary Voices IV',
    caption: 'Taking horror character voiceover to its darkest extreme.',
    cats: ['character'],
  },
  {
    src: `${B}Voiceover-Cartoon-Sensual-Read.webp`,
    alt: 'Voiceover cartoon about the sensual voiceover read by Guy Harris',
    title: 'Sensual Read',
    caption: 'Low, slow, warm — the sensual voiceover read.',
    cats: ['character'],
  },
  {
    src: `${B}Voiceover-Cartoon-Showreels.webp`,
    alt: 'Voiceover cartoon about creating a professional voiceover showreel by Guy Harris',
    title: 'Showreels',
    caption: 'Your showreel is your calling card — make every second count.',
    cats: ['auditions', 'humour'],
  },
  {
    src: `${B}Voiceover-Cartoon-Sound-Proofing-747x1024.webp`,
    alt: 'Voiceover cartoon about soundproofing a home recording studio by Guy Harris',
    title: 'Sound Proofing',
    caption: 'Acoustic panels, heavy curtains, duvets — soundproofing gets creative.',
    cats: ['studio'],
  },
  {
    src: `${B}Voiceover-Cartoon-Source-Connect.webp`,
    alt: 'Voiceover cartoon about Source Connect remote recording by Guy Harris',
    title: 'Source Connect',
    caption: 'Do you have Source Connect? Yup, I do — studio-quality remote sessions.',
    cats: ['studio'],
  },
  {
    src: `${B}Voiceover-Cartoon-Stephen-Hawkins-747x1024.webp`,
    alt: 'Voiceover cartoon about the Stephen Hawking voice impression by Guy Harris',
    title: 'Stephen Hawking',
    caption: "Does it sound like I'm in a car? The iconic voice impression.",
    cats: ['character'],
  },
  {
    src: `${B}Voiceover-Cartoon-Technical-issues.webp`,
    alt: 'Voiceover cartoon about technical issues in the home recording studio by Guy Harris',
    title: 'Technical Issues',
    caption: 'The session is about to start. Something will go wrong. It always does.',
    cats: ['studio'],
  },
  {
    src: `${B}Voiceover-Cartoon-Technology.webp`,
    alt: 'Voiceover cartoon about technology in the modern voiceover studio by Guy Harris',
    title: 'Technology',
    caption: 'The modern home studio — more tech than you can shake a pop shield at.',
    cats: ['studio'],
  },
  {
    src: `${B}Voiceover-Cartoon-The-Extra-Mile.webp`,
    alt: 'Voiceover cartoon about going the extra mile for voiceover clients by Guy Harris',
    title: 'The Extra Mile',
    caption: 'Going the extra mile — it keeps clients coming back.',
    cats: ['clients'],
  },
  {
    src: `${B}Voiceover-Cartoon-TheAgency.webp`,
    alt: 'Voiceover cartoon about the voiceover agency relationship by Guy Harris',
    title: 'The Agency',
    caption: 'The voiceover agency relationship — a delicate but vital partnership.',
    cats: ['auditions', 'humour'],
  },
  {
    src: `${B}Voiceover-Cartoon-Time-Stretching.webp`,
    alt: 'Voiceover cartoon about time stretching audio to fit picture by Guy Harris',
    title: 'Time Stretching',
    caption: 'Fitting the voiceover to picture — time stretching to the rescue.',
    cats: ['audio'],
  },
  {
    src: `${B}Voiceover-Cartoon-Today.webp`,
    alt: 'Voiceover cartoon about a same-day voiceover deadline by Guy Harris',
    title: "Can We Do These Today?",
    caption: 'The client just sent a message. They need it today. Of course they do.',
    cats: ['clients'],
  },
  {
    src: `${B}Voiceover-Cartoon-Too-Cheesey.webp`,
    alt: 'Voiceover cartoon about avoiding the clichéd voiceover read by Guy Harris',
    title: 'Too Cheesy',
    caption: 'Too cheesy — avoiding the clichéd, over-the-top voiceover read.',
    cats: ['humour'],
  },
  {
    src: `${B}Voiceover-Cartoon-UAE.webp`,
    alt: 'Voiceover cartoon about working in the UAE as a voiceover artist by Guy Harris',
    title: 'UAE',
    caption: 'Taking the British voiceover voice to the UAE and beyond.',
    cats: ['clients'],
  },
  {
    src: `${B}Voiceover-Cartoon-Voice-Coach.webp`,
    alt: 'Voiceover cartoon about the Voice Coach bus by Guy Harris',
    title: 'Voice Coach',
    caption: 'The Voice Coach bus — voiceover training on the move.',
    cats: ['humour'],
  },
  {
    src: `${B}Voiceover-Cartoon-Voice-Of-God.webp`,
    alt: 'Voiceover cartoon about the Voice of God stadium announcer style by Guy Harris',
    title: 'Voice of God',
    caption: 'The Voice of God — booming stadium announcements and epic introductions.',
    cats: ['character'],
  },
  {
    src: `${B}Voiceover-Cartoon-VoiceBid.webp`,
    alt: 'Voiceover cartoon about the voiceover bidding marketplace by Guy Harris',
    title: 'Voice Bid',
    caption: 'The voiceover marketplace — bidding for work online.',
    cats: ['auditions'],
  },
  {
    src: `${B}Voiceover-Cartoon-Voiceover-Mums.webp`,
    alt: 'Voiceover cartoon about voiceover mums by Guy Harris',
    title: 'Voiceover Mums',
    caption: "You sure those noises are not your own? Voiceover mums get it.",
    cats: ['humour'],
  },
  {
    src: `${B}Voiceover-Cartoon-Vox.webp`,
    alt: 'Voiceover cartoon about VOX and being a producer by Guy Harris',
    title: 'VOX',
    caption: 'VOX — being a producer does have its perks.',
    cats: ['humour', 'character'],
  },
  {
    src: `${B}Voiceover-Cartoon-client-written.webp`,
    alt: 'Voiceover cartoon about reading client-written copy by Guy Harris',
    title: 'Client Written',
    caption: 'Reading exactly what is on the page — even when it defies logic.',
    cats: ['clients'],
  },
  {
    src: `${B}Voiceover-Cartoon-commuting.webp`,
    alt: 'Voiceover cartoon about commuting to voiceover recording sessions by Guy Harris',
    title: 'Commuting',
    caption: 'Before home studios, we commuted. Every. Single. Day.',
    cats: ['studio'],
  },
  {
    src: `${B}Voiceover-Cartoon-hohoho.webp`,
    alt: 'Voiceover cartoon about the festive Santa Ho Ho Ho voiceover by Guy Harris',
    title: 'Ho Ho Ho',
    caption: "Ho ho ho — the most famous three syllables in festive voiceover.",
    cats: ['santa'],
  },
  {
    src: `${B}Voiceover-Cartoon-illness.webp`,
    alt: 'Voiceover cartoon about voiceover illness and recording when under the weather by Guy Harris',
    title: 'Illness',
    caption: "Voiceover illness — recording when under the weather but the deadline won't wait.",
    cats: ['studio'],
  },
  {
    src: `${B}Voiceover-Cartoon-movie-trailer-voice.webp`,
    alt: 'Voiceover cartoon about the epic movie trailer voice by Guy Harris',
    title: 'Movie Trailer Voice',
    caption: 'In a world… the epic movie trailer voice in all its booming glory.',
    cats: ['character'],
  },
  {
    src: `${B}Voiceover-Cartoon-on-a-budget-747x1024.webp`,
    alt: 'Voiceover cartoon about recording a voiceover on a budget by Guy Harris',
    title: 'On a Budget',
    caption: "Can we do it cheaper? Recording a voiceover on a budget.",
    cats: ['clients'],
  },
  {
    src: `${B}Voiceover-Cartoon-topping-tailing.webp`,
    alt: 'Voiceover cartoon about topping and tailing audio editing by Guy Harris',
    title: 'Topping & Tailing',
    caption: 'Trimming the start and end of every recording — the finishing touch.',
    cats: ['audio'],
  },
  {
    src: `${B}Voiceover-Cartoon-voice-gimp.webp`,
    alt: 'Voiceover cartoon about the reality of freelance voiceover life by Guy Harris',
    title: 'Voice Gimp',
    caption: 'Voice Gimp — the unvarnished reality of freelance voiceover life.',
    cats: ['humour'],
  },
];

export default function CartoonGallery() {
  const [activeFilter, setActiveFilter] = useState<Category>('all');
  const [open, setOpen] = useState(false);
  const [lbIndex, setLbIndex] = useState(0);

  const filtered = useMemo(
    () => activeFilter === 'all' ? cartoons : cartoons.filter(c => c.cats.includes(activeFilter as Exclude<Category, 'all'>)),
    [activeFilter]
  );

  const closeLightbox = useCallback(() => setOpen(false), []);
  const prev = useCallback(() => setLbIndex(i => (i - 1 + filtered.length) % filtered.length), [filtered.length]);
  const next = useCallback(() => setLbIndex(i => (i + 1) % filtered.length), [filtered.length]);

  const openLightbox = (i: number) => { setLbIndex(i); setOpen(true); };

  const handleFilterChange = (f: Category) => {
    setActiveFilter(f);
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [open, prev, next, closeLightbox]);

  const current = filtered[lbIndex];

  return (
    <>
      <p className="cartoon-gallery-lead">
        Browse by category below, from studio life and client briefs to Santa sessions, character voices, and audio editing mishaps.
      </p>

      <nav className="cartoon-filters" aria-label="Filter cartoons by category">
        {FILTERS.map(f => (
          <button
            key={f.id}
            className={`cartoon-filter-btn${activeFilter === f.id ? ' active' : ''}`}
            onClick={() => handleFilterChange(f.id)}
            aria-pressed={activeFilter === f.id}
          >
            {f.label}
            {f.id !== 'all' && (
              <span className="cartoon-filter-count">
                &nbsp;({cartoons.filter(c => c.cats.includes(f.id as Exclude<Category, 'all'>)).length})
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="cartoon-grid" role="list">
        {filtered.map((c, i) => (
          <button
            key={c.src}
            className="cartoon-card"
            onClick={() => openLightbox(i)}
            aria-label={`View full size: ${c.title}`}
            role="listitem"
          >
            <div className="cartoon-card-img-wrap">
              <img
                src={c.src}
                alt={c.alt}
                loading="lazy"
                width={400}
                height={400}
                className="cartoon-card-img"
              />
            </div>
            <span className="cartoon-card-title">{c.title}</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="cartoon-empty">No cartoons in this category yet.</p>
      )}

      {open && current && (
        <div
          className="lb-overlay"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Cartoon: ${current.title}`}
        >
          <button className="lb-close" onClick={closeLightbox} aria-label="Close lightbox">✕</button>
          <button
            className="lb-arrow lb-arrow--prev"
            onClick={e => { e.stopPropagation(); prev(); }}
            aria-label="Previous cartoon"
          >
            ‹
          </button>
          <div className="lb-content" onClick={e => e.stopPropagation()}>
            <img src={current.src} alt={current.alt} className="lb-img" width={800} height={800} />
            <p className="lb-title">{current.title}</p>
            {current.caption && <p className="lb-caption">{current.caption}</p>}
          </div>
          <button
            className="lb-arrow lb-arrow--next"
            onClick={e => { e.stopPropagation(); next(); }}
            aria-label="Next cartoon"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
