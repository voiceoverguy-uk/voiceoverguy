import InnerPage from '@/components/InnerPage';
import pages from '@/data/pages.json';
import { normaliseHtml } from '@/lib/normaliseHtml';
import type { Metadata } from 'next';
import { SchemaScripts, localBusiness, faqPage, breadcrumb, audioObject, videoObject } from '@/lib/staticPageSchema';

const data = (pages as Record<string, Record<string, string>>)['seo13'];

const metaTitle = 'Football Commentator Voice | British Football Commentator Voiceover, Commentary & Announcer Reads';
const metaDescription = "British football commentator voice for big-match promos, comedy football ads, stadium reads, tournament campaigns and announcer-style commentary. Booked for Just Eat UEFA, Midea x Manchester City, Snickers Arabia, Pizza Hut Delivery, Betfred, Etisalat Celebrating Victory and PSG Qatar Drone Race. Fast remote sessions, broadcast-quality audio.";

const introLeadIn = `<h2>Recent <span class="ident">Football Commentator</span> Campaigns</h2>
<p>The current 2026 commentator demo is below, alongside two featured examples that show both sides of the style: comedy-led big-match energy and polished broadcast-style delivery. For a strong supporting tournament example, hear my <a href="snickers-football-commentator-voice" title="Snickers Arabia Football Commentator">Snickers Arabia World Cup football commentator work</a>.</p>`;

const section4Override = `<h2><span class="ident">Broadcast-Ready Football Commentary</span></h2>
<p>Football commentator sessions are taken live via Source Connect, Cleanfeed or Zoom and delivered broadcast-ready from a fully treated studio. Brand bookings in this style include <a href="iboy-football-commentator" class="isred" title="Netflix iBoy football commentary">Netflix's iBoy</a>, <a href="pizza-hut-delivery-football-commentator-voiceover" class="isred" title="Pizza Hut football commentary">Pizza Hut Delivery</a> and <a href="manchester-city-football-commentry-voice" class="isred" title="Midea x Manchester City">Midea x Manchester City</a>, with the wider campaign list further down the page. The player below is my current football commentator showreel.</p>`;

const bridgeBetweenVideos = `<h2><span class="ident">Featured</span> Football Commentator Examples</h2>
<p>Two complementary proof points. <strong>Just Eat UEFA</strong> above is comedy-led, contemporary, big-match energy: a national campaign built on irreverent commentator timing. <strong>Midea x Manchester City</strong> below sits at the cinematic, broadcast-style end of the football commentator voiceover spectrum, with the kind of polished match-day delivery you would expect on a global brand spot. Both were recorded remotely from my broadcast-quality studio, both went out on major campaigns, and both turned around the same day they were briefed.</p>`;

const closingEnergy = `<h2>Fast Remote Sessions, <span class="ident">Broadcast-Quality</span> Audio</h2>
<p>Football promos, sports ads, tournament cutdowns, stadium-style trailer reads and quick-turnaround broadcast work, all delivered from a fully treated studio. Live direction over Source Connect, Cleanfeed or Zoom, broadcast-ready masters, and most football jobs back the same day. Authentic British football commentator energy, no fuss.</p>`;

const selectedWork = `<h2>Selected <span class="ident">Football Commentator</span> Work</h2>
<p>A curated set of football commentator voiceovers across big-brand campaigns and tournament-led promos:</p>
<ul>
<li><a href="just-eat-uefa-football-commentator-voice" title="Just Eat UEFA Football Commentator Voice">Just Eat UEFA</a>: comedy-led big-match energy for a national campaign.</li>
<li><a href="manchester-city-football-commentry-voice" title="Manchester City Football Commentator Voice">Midea x Manchester City</a>: cinematic broadcast-style commentary for a global brand.</li>
<li><a href="snickers-football-commentator-voice" title="Snickers Arabia Football Commentator Voice">Snickers Arabia</a>: high-energy World Cup commentator reads, still one of the strongest tournament showcases in this style.</li>
<li><a href="pizza-hut-delivery-football-commentator-voiceover" title="Pizza Hut Football Commentator Voiceover">Pizza Hut Delivery</a>: fast-paced national commentator promo.</li>
<li><a href="betfred-football-commentator" title="Betfred Football Commentator Voice">Betfred</a>: character-led EURO 2016 viral with full commentator chaos.</li>
<li><a href="etisalat-celebrating-victory-football-commentator-voice" title="Etisalat Football Commentator Voice">Etisalat Celebrating Victory</a>: Premier League celebration spot.</li>
<li><a href="qatar-drone-race-psg-voiceover" title="PSG Qatar Drone Race Voiceover">PSG Qatar Drone Race</a>: football-adjacent high-energy sports campaign that borrows the same commentator energy.</li>
</ul>`;

const section5Override = `<h2><span class="ident">20+ Years</span> of Football Promo Experience</h2>
<p>For over 20 years, I have delivered football-style voiceovers worldwide. Major campaigns include <a href="etisalat-celebrating-victory-football-commentator-voice" title="Etisalat Celebrating Victory">Etisalat's Celebrating Victory</a> and <a href="betfred-football-commentator" title="Betfred football commentator">Betfred</a>, bringing big-match energy to both scripted and improvised reads.</p>
<p>You get broadcast audio, fast delivery and reliable direction-friendly sessions. Intensity, comic timing or full commentator chaos, all are on the menu.</p>
<p>From one-liners to full campaign coverage, the result is consistency, clarity and that instantly recognisable British football commentator sound.</p>`;

const section6Override = `<h2>Trusted for Premier Football Campaigns</h2>
<p>This football commentator voice has gone out across global ads, radio promos, sketches, digital campaigns and stadium content. From <strong>BBC Radio 1</strong> and <strong>Netflix</strong> to <a href="qatar-drone-race-psg-voiceover" title="PSG Qatar Drone Race">Paris Saint-Germain's Qatar Drone Race</a>, <a href="just-eat-uefa-football-commentator-voice" title="Just Eat UEFA football commentator">Just Eat UEFA promos</a> and a string of national football ad campaigns, the brief is often the same: drama, urgency, broadcaster-style delivery and that instantly recognisable British football commentator sound.</p>
<p>And football is not the only place clubs and brands have used my more heritage-led styles either. Fresh off Aston Villa's big win, I was also asked to voice their new kit launch in my <a href="/pathe-news-voice" title="Pathé News style voiceover">Pathé News style</a>, which shows how these classic British delivery styles can sit naturally alongside modern football campaigns too.</p>
<p><a href="contact-guy" class="isred" title="Book a football commentator voiceover">Get in touch</a> to book a session or request a quote for your next football promo.</p>`;

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
      <InnerPage pageTitle={data.s1} pageSlug="football-commentator-voice" formIntro="Need a football commentator voice for your project? Send me a quick message and I'll get back to you." sections={[
        { text: introLeadIn, fullWidth: true },
        { text: section4Override, audioSrc: '/assets/audio/football-commentator-demo-2026-guy-harris.mp3' },
        ...(data.s7 ? [{ youtubeId: data.s7 }] : []),
        { text: bridgeBetweenVideos, fullWidth: true },
        { text: section5Override },
        ...(data.s8 ? [{ youtubeId: data.s8 }] : []),
        { text: closingEnergy, fullWidth: true },
        { text: selectedWork, fullWidth: true },
        { text: section6Override },
        { imageSrc: '/assets/images/football-commentator-voice-og.webp', imageAlt: 'Football Commentator Voice \u2013 Guy Harris' },
      ]} />
      <SchemaScripts schemas={schemas} />
    </main>
  );
}
