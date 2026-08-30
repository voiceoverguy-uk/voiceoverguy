import type { Metadata } from 'next';
import Link from 'next/link';
import NewsSection from '@/components/NewsSection';
import HomepageContact from '@/components/HomepageContact';
import VideoTilesGrid from '@/components/VideoTilesGrid';
import ReviewBlock from '@/components/ReviewBlock';
import RotatingQuotes from '@/components/RotatingQuotes';
import Testimonials from '@/components/Testimonials';
import WaveSurferPlayer from '@/components/WaveSurferPlayer';
import SeasonalHalloweenPlayer from '@/components/SeasonalHalloweenPlayer';
import AwardsBadges from '@/components/AwardsBadges';
import ClientLogosMarquee from '@/components/ClientLogosMarquee';
import { getYearsExperience } from '@/lib/experience';
import { testimonials } from '@/data/testimonials';

const yrs = getYearsExperience();
const yr = new Date().getFullYear();

export const metadata: Metadata = {
  title: 'British Male Voiceover | Guy Harris – UK Voice Artist',
  description: `Guy Harris is an award-winning British male voiceover artist. ${yrs}+ years experience, 200,000+ voiceovers. TV, radio, games, explainers, characters & events.`,
  alternates: { canonical: 'https://www.voiceoverguy.co.uk/' },
};


const clientLogos = [
  { src: '/assets/images/clients/voiceoverguy-clients-igt-gaming-awards.png', alt: 'IGT' },
  { src: '/assets/images/clients/voiceoverguy-clients-maoam.png', alt: 'MAOAM' },
  { src: '/assets/images/clients/voiceoverguy-clients-midea.png', alt: 'Midea' },
  { src: '/assets/images/clients/voiceoverguy-clients-ninja-warrior.png', alt: 'Ninja Warrior' },
  { src: '/assets/images/clients/voiceoverguy-clients-smyths-toys.png', alt: 'Smyths Toys' },
  { src: '/assets/images/clients/voiceoverguy-clients-just-eat.png', alt: 'Just Eat' },
  { src: '/assets/images/clients/voiceoverguy-clients-apple.png', alt: 'Apple' },
  { src: '/assets/images/clients/voiceoverguy-disney-brand.png', alt: 'Disney' },
  { src: '/assets/images/clients/voiceoverguy-clients-bbc-1.png', alt: 'BBC One' },
  { src: '/assets/images/clients/voiceoverguy-clients-bbc-2.png', alt: 'BBC Two' },
  { src: '/assets/images/clients/voiceoverguy-clients-tesco.png', alt: 'Tesco' },
  { src: '/assets/images/clients/voiceoverguy-lego-brand.png', alt: 'LEGO' },
  { src: '/assets/images/clients/voiceoverguy-clients-team-17.png', alt: 'Team17' },
  { src: '/assets/images/clients/voiceoverguy-clients-mcd.png', alt: "McDonald's" },
  { src: '/assets/images/clients/voiceoverguy-clients-itv.png', alt: 'ITV' },
  { src: '/assets/images/clients/voiceoverguy-clients-hotels-dot-com.png', alt: 'Hotels.com' },
  { src: '/assets/images/clients/voiceoverguy-clients-thomas-and-friends.png', alt: 'Thomas & Friends' },
  { src: '/assets/images/clients/voiceoverguy-clients-coca-cola.png', alt: 'Coca-Cola' },
  { src: '/assets/images/clients/voiceoverguy-clients-samsung.png', alt: 'Samsung' },
  { src: '/assets/images/clients/voiceoverguy-clients-sainsburys.png', alt: "Sainsbury's" },
  { src: '/assets/images/clients/voiceoverguy-clients-the-masked-singer.png', alt: 'The Masked Singer' },
  { src: '/assets/images/clients/voiceoverguy-clients-butlins.png', alt: 'Butlins' },
  { src: '/assets/images/clients/voiceoverguy-clients-dreamworks.png', alt: 'DreamWorks' },
  { src: '/assets/images/clients/voiceoverguy-clients-mini.png', alt: 'MINI' },
  { src: '/assets/images/clients/voiceoverguy-clients-mr-men.png', alt: 'Mr. Men' },
  { src: '/assets/images/clients/voiceoverguy-clients-legoland-windsor-resort.png', alt: 'Legoland Windsor Resort' },
  { src: '/assets/images/clients/voiceoverguy-clients-tv-choice.png', alt: 'TV Choice' },
  { src: '/assets/images/clients/voiceoverguy-clients-alton-towers.png', alt: 'Alton Towers' },
  { src: '/assets/images/clients/voiceoverguy-clients-biffa.png', alt: 'Biffa' },
  { src: '/assets/images/clients/voiceoverguy-clients-seabrooks.png', alt: 'Seabrooks' },
  { src: '/assets/images/clients/voiceoverguy-clients-nsandi.png', alt: 'NS&I' },
  { src: '/assets/images/clients/voiceoverguy-clients-emirates.png', alt: 'Emirates' },
  { src: '/assets/images/clients/voiceoverguy-clients-centre-parcs.png', alt: 'Centre Parcs' },
  { src: '/assets/images/clients/voiceoverguy-clients-rakbank.png', alt: 'RAKbank' },
  { src: '/assets/images/clients/voiceoverguy-clients-morrisons.png', alt: 'Morrisons' },
  { src: '/assets/images/clients/voiceoverguy-clients-minecraft.png', alt: 'Minecraft' },
  { src: '/assets/images/clients/voiceoverguy-clients-heart.png', alt: 'Heart' },
  { src: '/assets/images/clients/voiceoverguy-clients-harpic.png', alt: 'Harpic' },
  { src: '/assets/images/clients/voiceoverguy-clients-capital.png', alt: 'Capital' },
  { src: '/assets/images/clients/voiceoverguy-clients-boom-beach.png', alt: 'Boom Beach' },
  { src: '/assets/images/clients/voiceoverguy-clients-baxi.png', alt: 'Baxi' },
  { src: '/assets/images/clients/voiceoverguy-clients-booking-dot-com.png', alt: 'Booking.com' },
  { src: '/assets/images/clients/voiceoverguy-clients-the-range.png', alt: 'The Range' },
  { src: '/assets/images/clients/voiceoverguy-clients-cbeebies.png', alt: 'CBeebies' },
  { src: '/assets/images/clients/voiceoverguy-clients-p-and-o.png', alt: 'P&O' },
  { src: '/assets/images/clients/voiceoverguy-clients-snowdome.png', alt: 'SnowDome' },
  { src: '/assets/images/clients/voiceoverguy-clients-nhs.png', alt: 'NHS' },
  { src: '/assets/images/clients/voiceoverguy-clients-meta.png', alt: 'Meta' },
];

export default function Home() {
  const arabellaAge = (() => {
    const today = new Date();
    const dob = new Date(2016, 5, 4);
    let age = today.getFullYear() - dob.getFullYear();
    if (today.getMonth() < 5 || (today.getMonth() === 5 && today.getDate() < 4)) age--;
    return age;
  })();

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-panel">
            <h1>
              British Male Voiceover Artist – <span className="text-red">Guy Harris</span>
            </h1>
            <h2>Voice heard Worldwide</h2>

            <WaveSurferPlayer
              src="/assets/audio/commercial-voiceover-showreel-guy-harris.mp3"
            />

            <ReviewBlock />

            <div className="hero-cta-wrapper">
              <a href="#contact" className="hero-cta-button">
                Get in Touch Today
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENT LOGOS */}
      <section className="client-logos-section">
        <div className="container">
          <div className="client-logos-border client-logos-border--top" />
          <ClientLogosMarquee logos={clientLogos} />
          <div className="client-logos-border client-logos-border--bottom" />
        </div>
      </section>

      {/* HEAR THE RANGE — SIX SHOWREEL AUDIO PLAYERS */}
      <section className="home-section showreel-section">
        <div className="container">
          <div className="showreel-module">
            <div className="showreel-header">
              <h2 className="showreel-heading">Hear the Range</h2>

              <div className="showreel-divider" />
            </div>
            <div className="showreel-players">
              <div className="showreel-player-item">
                <WaveSurferPlayer
                  src="/assets/audio/explainer-narration-demo-guy-harris.mp3"
                  label={`<span class="text-red">Explainer and Narration</span> ${yr}`}
                  compact
                />
              </div>
              <div className="showreel-player-item">
                <WaveSurferPlayer
                  src="/assets/audio/guy-harris-voiceoverguy-character-showreel.mp3"
                  label={`<span class="text-red">Character Voices</span> Showreel ${yr}`}
                  compact
                />
              </div>
              <div className="showreel-player-item">
                <WaveSurferPlayer
                  src="/assets/audio/spooky-showreel-guy-harris.mp3"
                  label={`<span class="text-red">Halloween</span> Voices ${yr}`}
                  compact
                />
              </div>
              <div className="showreel-player-item">
                <WaveSurferPlayer
                  src="/assets/audio/voice-of-god-showreel-voiceover-guy-harris.mp3"
                  label={`<span class="text-red">Voice of God</span> Showreel ${yr}`}
                  compact
                />
              </div>
              <div className="showreel-player-item">
                <WaveSurferPlayer
                  src="/assets/audio/football-commentator-demo-2026-guy-harris.mp3"
                  label={`<span class="text-red">Football Commentator</span> Voice ${yr}`}
                  compact
                />
              </div>
              <div className="showreel-player-item">
                <WaveSurferPlayer
                  src="/assets/audio/david-attenborough-demo-guy-harris.mp3"
                  label={`<span class="text-red">David Attenborough</span> Voice ${yr}`}
                  compact
                />
              </div>
            </div>
            <SeasonalHalloweenPlayer yr={yr} />
          </div>
        </div>
      </section>

      {/* VIDEO TILES */}
      <section className="section section--no-top">
        <div className="container">
          <div className="showreel-header video-range-header">
            <h2 className="showreel-heading">Watch the Range</h2>
            <div className="showreel-divider" />
          </div>
          <VideoTilesGrid />
        </div>
      </section>

      {/* CLUSTER A: CREDENTIALS & TRUST */}
      <section className="home-cluster home-cluster--no-before">
        <div className="container">
          <div className="credentials-box">
            <p>
              Guy Harris – VoiceoverGuy. A professional and award-winning British male voiceover artist.{' '}
              Over {yrs} years&apos; experience and more than 200,000 scripts voiced, Guy works with global brands{' '}
              including Apple, Disney, BBC, ITV, Hotels.com, Bauer, Global, The Mr Men and Thomas the Tank Engine.
            </p>
            <p>
              <strong>Award-winning British voiceover</strong> – VOX Best Male Voiceover Winner and 3-time SOVAS (USA) finalist.
            </p>
            <AwardsBadges />
            <p>
              If you&apos;re looking for a reliable and fast-turnaround from a British male voiceover,{' '}
              Guy delivers <strong>broadcast-quality audio</strong> from his professional studio.{' '}
              <Link href="/commercial-voiceover" className="red-link">TV &amp; Radio ads</Link>,{' '}
              <Link href="/explainer-video-voice" className="red-link">Explainer voiceovers</Link>,{' '}
              <a href="https://www.pathevoice.co.uk" target="_blank" rel="noopener noreferrer" className="red-link">Path&eacute; News</a>,{' '}
              <Link href="/character-voiceover" className="red-link">Character Voiceovers</Link>,{' '}
              and his highly requested{' '}
              <Link href="/david-attenborough-voice" className="red-link">David Attenborough voice impression</Link>{' '}
              — just ask Google.
            </p>
          </div>
        </div>
      </section>

      {/* ROTATING QUOTES */}
      <RotatingQuotes />

      {/* CLUSTER B: WHY CLIENTS */}
      <section className="home-cluster home-cluster--left home-cluster--no-before">
        <div className="container">
          <div className="home-callout-box home-callout-box--left">
            <div className="home-callout-box-text">
              <h2>Why Clients Choose Me</h2>
              <p>
                Finding the right voice shouldn&apos;t feel like a gamble. After {yrs} years and more than 200,000 projects, I&apos;ve learned{' '}
                that clients want the same three things: reliability, speed, and audio that sounds brilliant first time.
              </p>
              <p>
                I&apos;m in the studio every day, I take direction well, and I keep your project moving without fuss or drama. If you{' '}
                want a voice who just gets it right, you&apos;ve found the right Guy.
              </p>
              <p>
                <Link href="/why-use-voiceoverguy" className="red-link">Read the full story →</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CLUSTER B2: AWARDS */}
      <section className="home-cluster home-cluster--left">
        <div className="container">
          <div className="home-callout-box home-callout-box--stage">
            <div className="home-callout-box-text">
              <h2>Event or Awards Night Voiceover?</h2>
              <p>
                Running an event, awards show or stage production?<br />
                My{' '}
                <Link href="/voice-of-god" className="red-link">Voice of God</Link>{' '}
                delivery is trusted by <strong>ITV</strong>, <strong>Butlins</strong>, <strong>The Masked Singer</strong>, <strong>Bestway</strong>, <strong>Poundland</strong>, <strong>GoLocal</strong> and <strong>TV Choice Awards</strong>. If you need a big, authoritative announcer voice that fills the room and lifts the atmosphere, lets talk. Need more? Check out the dedicated{' '}
                <a href="https://www.voiceofgod.co.uk" target="_blank" rel="noopener noreferrer" className="red-link">Voice of God</a> site.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CLUSTER C: CHILD VOICEOVER */}
      <section className="home-cluster home-cluster--left">
        <div className="container">
          <div className="home-callout-box home-callout-box--arabella">
            <div className="home-callout-box-text">
              <h2>Looking for a child voiceover? Meet my daughter <span className="text-red">Arabella</span></h2>
              <p>
                At {arabellaAge}-years-old Arabella is a professional child voiceover artist with national credits including Tesco, Sainsbury&apos;s, Zara, Kinda, Currys, Aquarabia, Hotpoint, Geely and Heinz.
              </p>
              <p>
                Her clear, natural young girl voice is perfect for animation, radio, and commercials. Have a listen to her{' '}
                <Link href="/arabella-harris-girl-child-voiceover-kid" className="red-link">child voiceover demos</Link> or visit{' '}
                <a href="https://www.arabellaharris.com" target="_blank" rel="noopener noreferrer" className="red-link">ArabellaHarris.com</a>{' '}
                to learn more.
              </p>
            </div>
            <div className="home-callout-box-image" role="presentation" />
          </div>
        </div>
      </section>

      {/* FEATURE BLOCKS */}
      <section className="section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-block">
              <h3>🌍 Heard Worldwide</h3>
              <p>
                As a British male voiceover artist, my voice
                is heard worldwide, delivering over 100
                projects weekly across TV, radio, online, and
                gaming. From global campaigns to niche
                projects, I&apos;m here to bring your script to life,
                no matter where in the world you are.
              </p>
            </div>
            <div className="feature-block">
              <h3>🚀 Same Day Delivery</h3>
              <p>
                Need a voiceover fast?
                With a 99% same-day delivery rate, I&apos;ll
                provide professionally voiced and edited
                audio (mp3 or WAV) in less than 24 hours.
                Trust my quick turnaround to keep your
                project on schedule and on budget.
              </p>
            </div>
            <div className="feature-block">
              <h3>📍 Location</h3>
              <p>
                Based in West Yorkshire, I&apos;m perfectly
                positioned for remote and in-person
                sessions. Whether you need a{' '}
                <Link href="/voiceover-studio" className="red-link">studio-quality
                recording</Link>, a live-directed session or fast
                delivery for your{' '}
                <Link href="/explainer-video-voice" className="red-link">explainer video</Link>, I&apos;ll make it
                smooth and stress-free.
              </p>
            </div>
            <div className="feature-block">
              <h3>✅ Pro vs Cheaper Alternative?</h3>
              <p>
                Why choose professional? A high-quality
                voiceover elevates your project in ways
                cheaper alternatives simply can&apos;t match.
                With decades of experience, I deliver
                standout voiceovers that engage your
                audience and add value to your brand.
              </p>
            </div>
            <div className="feature-block">
              <h3>🎙️ Bespoke Demos</h3>
              <p>
                Hear the difference with a free bespoke
                demo tailored to your specific project.
                Avoid generic showreels!— Let me ensure
                I&apos;m the perfect fit for your brand or project
                before booking your VoiceOver.{' '}
                <a href="#contact" className="red-link">Get in touch today.</a>
              </p>
            </div>
            <div className="feature-block">
              <h3>💻 Studio Tech</h3>
              <p>
                Save on studio fees with remote directing!
                Using Cleanfeed, Source Connect Nexus,
                Riverside, Zoom, Teams, and more, I deliver
                broadcast-quality audio from my Yorkshire
                based{' '}
                <Link href="/voiceover-studio" className="red-link">voiceover-studio</Link>. Let our tech and
                experience make it all stress-free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* NEWS */}
      <NewsSection />

      <div id="contact">
        <HomepageContact />
      </div>

      {/* STRUCTURED DATA: single @graph block */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Organization',
                '@id': 'https://www.voiceoverguy.co.uk/#organization',
                name: 'VoiceoverGuy',
                url: 'https://www.voiceoverguy.co.uk',
                logo: 'https://www.voiceoverguy.co.uk/assets/images/guy-harris-voiceover.webp',
                image: 'https://www.voiceoverguy.co.uk/images/guy-harris-profile.jpg',
                email: 'guy@voiceoverguy.co.uk',
                description: 'Professional British male voiceover services for agencies, brands and broadcasters worldwide. Broadcast-quality remote recording with fast turnaround.',
                founder: { '@id': 'https://www.voiceoverguy.co.uk/#guyharris' },
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: '5',
                  bestRating: '5',
                  worstRating: '1',
                  ratingCount: '119',
                  reviewCount: '119',
                },
                sameAs: [
                  'https://www.linkedin.com/in/voiceoverguy/',
                  'https://www.youtube.com/user/voiceoverguyharris',
                  'https://soundcloud.com/voiceoverguy',
                ],
                location: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Wakefield',
                  addressRegion: 'West Yorkshire',
                  addressCountry: 'GB',
                },
              },
              {
                '@type': 'Person',
                '@id': 'https://www.voiceoverguy.co.uk/#guyharris',
                name: 'Guy Harris',
                alternateName: 'VoiceoverGuy',
                url: 'https://www.voiceoverguy.co.uk',
                image: 'https://www.voiceoverguy.co.uk/images/guy-harris-profile.jpg',
                jobTitle: 'British Male Voiceover Artist',
                description: `Guy Harris is an award-winning British male voiceover artist with over ${yrs} years of experience and more than 200,000 voiceovers. Known for his commercial reads, character voices, explainer narration, David Attenborough impression and as the UK\u2019s No.1 Voice of Santa.`,
                gender: 'Male',
                nationality: 'British',
                email: 'guy@voiceoverguy.co.uk',
                worksFor: { '@id': 'https://www.voiceoverguy.co.uk/#organization' },
                sameAs: [
                  'https://www.linkedin.com/in/voiceoverguy/',
                  'https://www.youtube.com/user/voiceoverguyharris',
                  'https://soundcloud.com/voiceoverguy',
                ],
                award: [
                  'VOX Award \u2013 Best Male Voiceover (Winner)',
                  'SOVAS \u2013 Outstanding Commercial Voiceover (Finalist)',
                  'SOVAS \u2013 Outstanding Animation Character (Finalist)',
                  'SOVAS \u2013 Outstanding Promo Voice (Finalist)',
                ],
                hasOccupation: {
                  '@type': 'Occupation',
                  name: 'British Male Voiceover Artist',
                  occupationLocation: { '@type': 'Country', name: 'United Kingdom' },
                  skills: [
                    'Commercial Voiceovers',
                    'Character Voices',
                    'David Attenborough Voice Style',
                    'Santa Voice',
                    'Explainer Video Narration',
                    'Game Voices',
                    'E-Learning Narration',
                    'Broadcast-quality Audio Production',
                  ],
                },
                knowsAbout: [
                  'British Male Voiceover',
                  'Commercial Voiceover',
                  'TV & Radio Ad Voiceovers',
                  'Explainer Videos',
                  'Narration',
                  'Character Voice Acting',
                  'Game Trailer Voice',
                  'David Attenborough Impression',
                  'Santa Voiceover',
                  'Voice of God',
                  'Event Voiceovers',
                  'Awards Voiceover',
                ],
              },
              {
                '@type': 'WebSite',
                '@id': 'https://www.voiceoverguy.co.uk/#website',
                name: 'VoiceoverGuy',
                url: 'https://www.voiceoverguy.co.uk',
                publisher: { '@id': 'https://www.voiceoverguy.co.uk/#organization' },
                potentialAction: {
                  '@type': 'SearchAction',
                  target: {
                    '@type': 'EntryPoint',
                    urlTemplate: 'https://www.voiceoverguy.co.uk/?s={search_term_string}',
                  },
                  'query-input': 'required name=search_term_string',
                },
              },
              {
                '@type': 'WebPage',
                '@id': 'https://www.voiceoverguy.co.uk/#webpage',
                name: 'British Male Voiceover | Guy Harris \u2013 UK Voice Artist',
                description: `Guy Harris is an award-winning British male voiceover artist. ${yrs}+ years experience, 200,000+ voiceovers. TV, radio, games, explainers, characters & events.`,
                url: 'https://www.voiceoverguy.co.uk',
                isPartOf: { '@id': 'https://www.voiceoverguy.co.uk/#website' },
                about: { '@id': 'https://www.voiceoverguy.co.uk/#guyharris' },
                publisher: { '@id': 'https://www.voiceoverguy.co.uk/#organization' },
              },
              {
                '@type': 'AudioObject',
                '@id': 'https://www.voiceoverguy.co.uk/#audio-commercial',
                name: 'Commercial Showreel 2025 \u2013 Guy Harris',
                description: 'British male voiceover commercial showreel by Guy Harris. Heard on TV, radio and online worldwide.',
                contentUrl: 'https://www.voiceoverguy.co.uk/assets/audio/guy-harris-voiceoverguy-commercial-showreel.mp3',
                encodingFormat: 'audio/mpeg',
                duration: 'PT1M14S',
                inLanguage: 'en-GB',
              },
              {
                '@type': 'AudioObject',
                '@id': 'https://www.voiceoverguy.co.uk/#audio-character',
                name: 'Character Voices Showreel 2025 \u2013 Guy Harris',
                description: 'British male character voice showreel by Guy Harris featuring gaming voices, cartoon styles and comedic characters.',
                contentUrl: 'https://www.voiceoverguy.co.uk/assets/audio/guy-harris-voiceoverguy-character-showreel.mp3',
                encodingFormat: 'audio/mpeg',
                duration: 'PT1M45S',
                inLanguage: 'en-GB',
              },
              {
                '@type': 'AudioObject',
                '@id': 'https://www.voiceoverguy.co.uk/#audio-explainer',
                name: 'Explainer Video Showreel 2025 \u2013 Guy Harris',
                description: 'Explainer video narration showreel by British male voiceover artist Guy Harris.',
                contentUrl: 'https://www.voiceoverguy.co.uk/assets/audio/guy-harris-voiceoverguy-explainer-video-showreel.mp3',
                encodingFormat: 'audio/mpeg',
                duration: 'PT1M12S',
                inLanguage: 'en-GB',
              },
              {
                '@type': 'VideoObject',
                name: 'VoiceoverGuy Commercial Showreel',
                description: 'Guy Harris commercial voiceover showreel. British male voiceover artist heard on TV, radio and online worldwide.',
                thumbnailUrl: 'https://img.youtube.com/vi/TqkdBK8mBW8/hqdefault.jpg',
                contentUrl: 'https://www.youtube.com/watch?v=TqkdBK8mBW8',
                embedUrl: 'https://www.youtube.com/embed/TqkdBK8mBW8',
                uploadDate: '2024-01-15T00:00:00+00:00',
              },
              ...testimonials.map((t, i) => ({
                '@type': 'Review',
                '@id': `https://www.voiceoverguy.co.uk/#review-${i}`,
                itemReviewed: { '@id': 'https://www.voiceoverguy.co.uk/#organization' },
                reviewBody: t.quote,
                reviewRating: {
                  '@type': 'Rating',
                  ratingValue: '5',
                  bestRating: '5',
                  worstRating: '1',
                },
                author: {
                  '@type': 'Person',
                  name: t.name,
                  ...(t.company ? { worksFor: { '@type': 'Organization', name: t.company } } : {}),
                  ...(t.role ? { jobTitle: t.role } : {}),
                },
              })),
            ],
          }),
        }}
      />
    </>
  );
}
