import InnerPage from '@/components/InnerPage';
import pages from '@/data/pages.json';
import { normaliseHtml } from '@/lib/normaliseHtml';
import type { Metadata } from 'next';
import { SchemaScripts, localBusiness, faqPage, breadcrumb, audioObject, videoObject } from '@/lib/staticPageSchema';

const data = (pages as Record<string, Record<string, string>>)['seo13'];

const metaTitle = 'Football Commentator Voice | British Football Commentator Voiceover for Promos & Ads';
const metaDescription = "British football commentator voice for big-match promos, comedy ads, stadium reads and tournament campaigns. As heard for Just Eat UEFA, Midea, Manchester City, Snickers, Pizza Hut and Betfred. Fast remote sessions, broadcast-quality audio.";

const introLeadIn = `<h2>The UK's Hub for <span class="ident">Football Commentator</span> Voiceover</h2>
<p>If you have landed here searching for a British football commentator voice, this is the right page. From big-match promos and World Cup ad campaigns to comedy football sketches, stadium-style trailer reads and high-energy tournament cutdowns, this is the home of my football commentator voiceover work. Sessions are fast, broadcast-quality and direction-friendly, with same-day delivery the norm. Featured below are two of the most current examples, with my <a href="snickers-football-commentator-voice" title="Snickers Football Commentator Voice">Snickers World Cup football commentator</a> work and the wider selected campaign list further down the page.</p>`;

const bridgeBetweenVideos = `<h2><span class="ident">Featured</span> Football Commentator Examples</h2>
<p>The Just Eat UEFA spot above is a great example of comedy-led big-match energy. Below, the Midea piece with Manchester City sits at the more cinematic, broadcast end of the football commentator voiceover spectrum. Both were recorded remotely from my broadcast-quality studio, both went out on major campaigns, and both show the range of what a British football commentator voice can bring to a brand.</p>`;

const closingEnergy = `<h2>Fast Remote Sessions, <span class="ident">Broadcast-Quality</span> Audio</h2>
<p>Whether the brief is a big-tournament promo, a stadium-style read, a comedy football ad or a fast turnaround social cutdown, sessions are directed live via Source Connect, Cleanfeed or Zoom and audio is delivered broadcast-ready. Most jobs go out same day. World-class football energy, authentic British commentary, no fuss.</p>`;

const selectedWork = `<h2>Selected <span class="ident">Football Commentator</span> Work</h2>
<p>A short selection of strong examples across the football commentator voiceover space, mixing big-brand campaigns and tournament-led promos:</p>
<ul>
<li><a href="just-eat-uefa-football-commentator-voice" title="Just Eat UEFA Football Commentator Voice">Just Eat UEFA</a>: comedy big-match energy for a national campaign.</li>
<li><a href="manchester-city-football-commentry-voice" title="Manchester City Football Commentator Voice">Midea x Manchester City</a>: broadcast-style commentary for a global brand.</li>
<li><a href="snickers-football-commentator-voice" title="Snickers Football Commentator Voice">Snickers Arabia</a>: high-energy World Cup commentator reads, still one of the strongest examples in this style.</li>
<li><a href="pizza-hut-delivery-football-commentator-voiceover" title="Pizza Hut Football Commentator Voiceover">Pizza Hut Delivery</a>: fast-paced national commentator promo.</li>
<li><a href="betfred-football-commentator" title="Betfred Football Commentator Voice">Betfred</a>: character-led EURO promo with full commentator chaos.</li>
<li><a href="etisalat-celebrating-victory-football-commentator-voice" title="Etisalat Football Commentator Voice">Etisalat Celebrating Victory</a>: Premier League celebration spot.</li>
<li><a href="qatar-drone-race-psg-voiceover" title="PSG Qatar Drone Race Voiceover">PSG Qatar Drone Race</a>: a related high-energy sports campaign that borrows the same commentator energy.</li>
</ul>`;

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/football-commentator-voice`,
  },
  title: metaTitle,
  description: metaDescription,
  openGraph: {
    title: `${metaTitle} | VoiceoverGuy`,
    description: metaDescription,
    url: 'https://www.voiceoverguy.co.uk/football-commentator-voice',
    images: [{ url: 'https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.webp', width: 1200, height: 630, alt: 'Football Commentator Voice – Guy Harris' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${metaTitle} | VoiceoverGuy`,
    description: metaDescription,
    images: ['https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.webp'],
  },
};

const schemas = [
  localBusiness('football-commentator-voice', 'Guy Harris is a British voiceover artist known for his football commentator-style voice, used by BBC, Netflix, and major sports brands.'),
  faqPage('football-commentator-voice', [
    { q: 'Can I hire Guy Harris for a football commentator-style voiceover?', a: 'Yes, Guy Harris is available to voice football-style commentaries for TV, radio, promos, and comedy spots. His voice is trusted by major broadcasters and sports clubs.' },
    { q: 'Is the voiceover studio located in Wakefield, West Yorkshire?', a: "Yes, Guy\u2019s voiceover studio is based in Wakefield, West Yorkshire and offers remote and in-person directed sessions." },
    { q: "What\u2019s included in a football commentator voiceover session?", a: 'Voiceover sessions include a live directed call, multiple takes, and delivery in your preferred format. Fast turnaround and professional audio are guaranteed.' },
  ]),
  breadcrumb('football-commentator-voice', 'Football Commentator Voice'),
  audioObject('football-commentator-voice', 'Football Commentator Voice \u2013 Guy Harris', 'Professional football commentator-style voiceover demo by Guy Harris.', '/assets/audio/football-commentator-showreel-guy-harris.mp3', 'PT72S'),
  videoObject('football-commentator-voice', 'Football Commentator Voice \u2013 Guy Harris', 'High-energy football commentator-style voiceover demo.', 'T9opwMc46Ms', '2021-06-07'),
];

export default function Page() {
  return (
    <main className="inner-page">
      {data.s3 && (
        <section className="inner-hero">
          <div className="inner-container" dangerouslySetInnerHTML={{ __html: normaliseHtml(data.s3) }} />
        </section>
      )}
      <div className="inner-bar" />
      <InnerPage pageTitle={data.s1} pageSlug="football-commentator-voice" formIntro="Need a football commentator voice? Send me a quick message and I'll get back to you." sections={[
        { text: introLeadIn, fullWidth: true },
        ...(data.s4 ? [{ text: data.s4, audioSrc: '/assets/audio/football-commentator-demo-2026-guy-harris.mp3' }] : []),
        ...(data.s7 ? [{ youtubeId: data.s7 }] : []),
        { text: bridgeBetweenVideos, fullWidth: true },
        ...(data.s5 ? [{ text: data.s5 }] : []),
        ...(data.s8 ? [{ youtubeId: data.s8 }] : []),
        { text: closingEnergy, fullWidth: true },
        { text: selectedWork, fullWidth: true },
        ...(data.s6 ? [{ text: data.s6 }] : []),
        { imageSrc: '/assets/images/football-commentator-voice-og.webp', imageAlt: 'Football Commentator Voice \u2013 Guy Harris' },
      ]} />
      <SchemaScripts schemas={schemas} />
    </main>
  );
}
