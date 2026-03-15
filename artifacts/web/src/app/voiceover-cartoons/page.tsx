import pages from '@/data/pages.json';
  import type { Metadata } from 'next';

  const data = (pages as Record<string, Record<string, string>>)['seo24'];

  export const metadata: Metadata = {
    title: data.s1,
    description: data.s2,
  };

  const cartoons = [
    '/assets/images/cartoons/Voiceover-Cartoon-12-Days.png',
  '/assets/images/cartoons/Voiceover-Cartoon-A-30.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Accents.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Agency-Nerves.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Agent.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Alexander-Technique.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Awards.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Awesome-At-Oral.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Bad-Santa.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Busy-Day.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Child-Voices.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Clothing.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Darth-Vader.png',
  '/assets/images/cartoons/Voiceover-Cartoon-DeBreathing.png',
  '/assets/images/cartoons/Voiceover-Cartoon-DeEssing.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Demo-Tapes.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Dinner-Bore.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Dont-You-Know-Who-I-am.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Equity.png',
  '/assets/images/cartoons/Voiceover-Cartoon-How-Much.png',
  '/assets/images/cartoons/Voiceover-Cartoon-HowJSay.png',
  '/assets/images/cartoons/Voiceover-Cartoon-In-Store-747x1024.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Just-got-up.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Last-Minute-Job.png',
  '/assets/images/cartoons/Voiceover-Cartoon-London-Jobs.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Losing-the-big-gig.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Mic-Selection.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Multitasking.png',
  '/assets/images/cartoons/Voiceover-Cartoon-NDA.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Narration.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Nov-5th.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Off-Mic.png',
  '/assets/images/cartoons/Voiceover-Cartoon-On-The-Hunt.png',
  '/assets/images/cartoons/Voiceover-Cartoon-OnHold.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Overseas-debts.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Own-Studio.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Pay-Peanuts.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Phone-Patching.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Pirate-Voice.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Pitch-Shifting.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Poorly-Sick.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Popping-The-Mic.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Quiet-Days.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Rudolf.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Santa-Calls.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Santa-Magic-747x1024.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Santa-Style.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Scary-Voices.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Scary-VoicesII.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Scary-VoicesIV.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Sensual-Read.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Showreels.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Sound-Proofing-747x1024.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Source-Connect.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Stephen-Hawkins-747x1024.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Technical-issues.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Technology.png',
  '/assets/images/cartoons/Voiceover-Cartoon-The-Extra-Mile.png',
  '/assets/images/cartoons/Voiceover-Cartoon-TheAgency.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Time-Stretching.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Today.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Too-Cheesey.png',
  '/assets/images/cartoons/Voiceover-Cartoon-UAE.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Voice-Coach.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Voice-Of-God.png',
  '/assets/images/cartoons/Voiceover-Cartoon-VoiceBid.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Voiceover-Mums.png',
  '/assets/images/cartoons/Voiceover-Cartoon-Vox.png',
  '/assets/images/cartoons/Voiceover-Cartoon-client-written.png',
  '/assets/images/cartoons/Voiceover-Cartoon-commuting.png',
  '/assets/images/cartoons/Voiceover-Cartoon-hohoho.png',
  '/assets/images/cartoons/Voiceover-Cartoon-illness.png',
  '/assets/images/cartoons/Voiceover-Cartoon-movie-trailer-voice.png',
  '/assets/images/cartoons/Voiceover-Cartoon-on-a-budget-747x1024.png',
  '/assets/images/cartoons/Voiceover-Cartoon-topping-tailing.png',
  '/assets/images/cartoons/Voiceover-Cartoon-voice-gimp.png'
  ];

  export default function Page() {
    return (
      <main className="inner-page">
        <section className="inner-hero">
          <div className="inner-container" dangerouslySetInnerHTML={{ __html: data.s3 || '' }} />
        </section>
        <div className="inner-bar" />
        <div className="inner-parallax">
          <div className="inner-container">
            {data.s4 && <div className="cartoons-intro" dangerouslySetInnerHTML={{ __html: data.s4 }} />}
            <div className="cartoon-grid">
              {cartoons.map((src) => (
                <div key={src} className="cartoon-item">
                  <img
                    src={src}
                    alt={src.split('/').pop()?.replace(/Voiceover-Cartoon-|-/g, ' ').replace('.png', '').trim() ?? ''}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }
  