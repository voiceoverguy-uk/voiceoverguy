'use client';

import { useState, useEffect, useCallback } from 'react';

const cartoons: { src: string; alt: string }[] = [
  { src: '/assets/images/cartoons/Voiceover-Cartoon-12-Days.png', alt: 'Voiceover cartoon: The 12 Days of Christmas — voiceover style' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-A-30.png', alt: 'Voiceover cartoon: Recording a 30-second spot' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Accents.png', alt: 'Voiceover cartoon: Mexican accent? No problema! — doing accents' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Agency-Nerves.png', alt: 'Voiceover cartoon: Nerves before an agency audition' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Agent.png', alt: "Voiceover cartoon: Don't you know who I am? — the voiceover ego" },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Alexander-Technique.png', alt: 'Voiceover cartoon: The Alexander Technique for voiceover posture' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Awards.png', alt: "Voiceover cartoon: When you're ready… award-winning voiceover" },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Awesome-At-Oral.png', alt: 'Voiceover cartoon: Voiceovers — awesome at oral' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Bad-Santa.png', alt: 'Voiceover cartoon: Bad Santa voiceover performance' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Busy-Day.png', alt: "Voiceover cartoon: Can we do tomorrow? I'm stacked out today" },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Child-Voices.png', alt: 'Voiceover cartoon: Doing child voices as an adult voiceover artist' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Clothing.png', alt: 'Voiceover cartoon: Apprentice clothing — what to wear in the booth' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Darth-Vader.png', alt: 'Voiceover cartoon: I am your father — Darth Vader voice impression' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-DeBreathing.png', alt: 'Voiceover cartoon: De-breathing audio in post production' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-DeEssing.png', alt: 'Voiceover cartoon: De-essing — removing sibilance from a voiceover' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Demo-Tapes.png', alt: 'Voiceover cartoon: Demo tapes and showreels' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Dinner-Bore.png', alt: 'Voiceover cartoon: The dinner party bore — talking about voiceover all evening' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Dont-You-Know-Who-I-am.png', alt: "Voiceover cartoon: Don't you know who I am? — voiceover self-importance" },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Equity.png', alt: 'Voiceover cartoon: Equity union membership for professional voiceovers' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-How-Much.png', alt: 'Voiceover cartoon: How much does a voiceover cost?' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-HowJSay.png', alt: 'Voiceover cartoon: HowJSay pronunciation guide for voiceover scripts' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-In-Store-747x1024.png', alt: 'Voiceover cartoon: In-store PA voiceover announcements' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Just-got-up.png', alt: 'Voiceover cartoon: Just got up voice — recording first thing in the morning' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Last-Minute-Job.png', alt: 'Voiceover cartoon: The last-minute voiceover job request' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-London-Jobs.png', alt: 'Voiceover cartoon: London voiceover studio sessions' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Losing-the-big-gig.png', alt: 'Voiceover cartoon: Losing the big voiceover gig to another voice' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Mic-Selection.png', alt: 'Voiceover cartoon: Microphone selection for voiceover recording' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Multitasking.png', alt: 'Voiceover cartoon: Multitasking as a freelance voiceover artist' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-NDA.png', alt: 'Voiceover cartoon: NDA — non-disclosure agreement in the voiceover world' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Narration.png', alt: 'Voiceover cartoon: Long-form narration voiceover style' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Nov-5th.png', alt: 'Voiceover cartoon: November 5th bonfire night — scary voiceover' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Off-Mic.png', alt: 'Voiceover cartoon: Going off-mic in the recording studio' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-On-The-Hunt.png', alt: 'Voiceover cartoon: On the hunt for voiceover work' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-OnHold.png', alt: 'Voiceover cartoon: On-hold telephone voiceover messages' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Overseas-debts.png', alt: 'Voiceover cartoon: Overseas debts — international voiceover clients' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Own-Studio.png', alt: 'Voiceover cartoon: Building your own home voiceover studio' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Pay-Peanuts.png', alt: 'Voiceover cartoon: Pay peanuts, get monkeys — voiceover rates matter' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Phone-Patching.png', alt: 'Voiceover cartoon: Phone patching for remote directed sessions' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Pirate-Voice.png', alt: 'Voiceover cartoon: Pirate voice — character voiceover performance' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Pitch-Shifting.png', alt: 'Voiceover cartoon: Pitch shifting in audio post production' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Poorly-Sick.png', alt: 'Voiceover cartoon: Recording when poorly — the show must go on' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Popping-The-Mic.png', alt: 'Voiceover cartoon: Popping the mic — dealing with plosives in voiceover' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Quiet-Days.png', alt: 'Voiceover cartoon: Quiet days waiting for the voiceover phone to ring' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Rudolf.png', alt: 'Voiceover cartoon: Rudolf the red-nosed voiceover reindeer' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Santa-Calls.png', alt: 'Voiceover cartoon: Live Santa Claus telephone calls voiced by Guy Harris' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Santa-Magic-747x1024.png', alt: 'Voiceover cartoon: The magic of Christmas — Santa voiceover session' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Santa-Style.png', alt: 'Voiceover cartoon: Reading in a Santa style for festive campaigns' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Scary-Voices.png', alt: 'Voiceover cartoon: Scary voices — horror character voiceover' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Scary-VoicesII.png', alt: 'Voiceover cartoon: Scary voices II — more horror character performances' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Scary-VoicesIV.png', alt: 'Voiceover cartoon: Scary voices IV — taking horror voiceover further' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Sensual-Read.png', alt: 'Voiceover cartoon: The sensual voiceover read' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Showreels.png', alt: 'Voiceover cartoon: Creating a professional voiceover showreel' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Sound-Proofing-747x1024.png', alt: 'Voiceover cartoon: Soundproofing your home recording studio' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Source-Connect.png', alt: 'Voiceover cartoon: Source Connect — do you have Source Connect? Yup, I do!' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Stephen-Hawkins-747x1024.png', alt: "Voiceover cartoon: Stephen Hawking voice impression — does it sound like I'm in a car?" },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Technical-issues.png', alt: 'Voiceover cartoon: Technical issues in the home recording studio' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Technology.png', alt: 'Voiceover cartoon: Technology in the modern voiceover studio' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-The-Extra-Mile.png', alt: 'Voiceover cartoon: Going the extra mile for voiceover clients' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-TheAgency.png', alt: 'Voiceover cartoon: The voiceover agency relationship' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Time-Stretching.png', alt: 'Voiceover cartoon: Time stretching — fitting a voiceover to picture' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Today.png', alt: 'Voiceover cartoon: Can we get these made today?' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Too-Cheesey.png', alt: 'Voiceover cartoon: Too cheesy — avoiding the clichéd voiceover read' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-UAE.png', alt: 'Voiceover cartoon: Working in the UAE — voiceover abroad' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Voice-Coach.png', alt: 'Voiceover cartoon: The Voice Coach bus' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Voice-Of-God.png', alt: 'Voiceover cartoon: The Voice of God — stadium announcer voiceover' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-VoiceBid.png', alt: 'Voiceover cartoon: Voice Bidding — the voiceover marketplace' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Voiceover-Mums.png', alt: 'Voiceover cartoon: Voiceover mums — you sure those noises are not your own?' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-Vox.png', alt: 'Voiceover cartoon: VOX — being a producer does have its perks' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-client-written.png', alt: 'Voiceover cartoon: Client-written copy — reading exactly what is on the page' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-commuting.png', alt: 'Voiceover cartoon: Commuting to voiceover recording sessions' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-hohoho.png', alt: 'Voiceover cartoon: Ho ho ho — festive Santa voiceover' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-illness.png', alt: 'Voiceover cartoon: Voiceover illness — recording when under the weather' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-movie-trailer-voice.png', alt: 'Voiceover cartoon: The epic movie trailer voice' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-on-a-budget-747x1024.png', alt: 'Voiceover cartoon: Recording a voiceover on a budget' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-topping-tailing.png', alt: 'Voiceover cartoon: Topping and tailing — editing the start and end of a recording' },
  { src: '/assets/images/cartoons/Voiceover-Cartoon-voice-gimp.png', alt: 'Voiceover cartoon: Voice Gimp — the reality of freelance voiceover life' },
];

export default function CartoonGallery() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const openLightbox = (i: number) => { setIndex(i); setOpen(true); };
  const closeLightbox = () => setOpen(false);
  const prev = useCallback(() => setIndex(i => (i - 1 + cartoons.length) % cartoons.length), []);
  const next = useCallback(() => setIndex(i => (i + 1) % cartoons.length), []);

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
  }, [open, prev, next]);

  return (
    <>
      <div className="cartoon-grid">
        {cartoons.map((c, i) => (
          <button
            key={c.src}
            className="cartoon-thumb"
            onClick={() => openLightbox(i)}
            aria-label={`View full size: ${c.alt}`}
          >
            <img src={c.src} alt={c.alt} loading="lazy" />
          </button>
        ))}
      </div>

      <div className="cartoons-footer">
        <h2><span className="ident">Cartoons</span> for Voiceover</h2>
        <p>If you have any ideas from our voiceover world you think there are other cartoons just waiting to be drawn, please do let me know.</p>
        <p>Always open to suggestions for other humourous ideas that we can turn into Voiceover Cartoons.</p>
        <p>The amazing cartoons are designed by Guy Harris and illustrated by <a href="http://www.georgeraggett.co.uk" target="_blank" rel="noopener noreferrer" className="ident">George Raggett</a></p>
        <p>Do have a good look around the website and you are sure to find a style that would suit your project.</p>
        <p>The search box on the home page should help you navigate to a style or tone you need.</p>
        <p>Or do check out the <a href="/news-blog" className="ident">News and Blog</a> page. You&#39;ll see some of the projects I&#39;ve already been a part of.</p>
      </div>

      {open && (
        <div
          className="lb-overlay"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Cartoon lightbox"
        >
          <button className="lb-close" onClick={closeLightbox} aria-label="Close">✕</button>
          <button
            className="lb-arrow lb-arrow--prev"
            onClick={e => { e.stopPropagation(); prev(); }}
            aria-label="Previous cartoon"
          >
            ‹
          </button>
          <div className="lb-content" onClick={e => e.stopPropagation()}>
            <img src={cartoons[index].src} alt={cartoons[index].alt} className="lb-img" />
            <p className="lb-caption">{cartoons[index].alt.replace('Voiceover cartoon: ', '')}</p>
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
