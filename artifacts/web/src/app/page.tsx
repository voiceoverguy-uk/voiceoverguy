import type { Metadata } from 'next';
import Link from 'next/link';
import NewsSection from '@/components/NewsSection';
import ReviewBlock from '@/components/ReviewBlock';
import WaveSurferPlayer from '@/components/WaveSurferPlayer';

export const metadata: Metadata = {
  title: 'British Male Voiceover | Guy Harris – UK Voice Artist',
  description: 'Guy Harris is an award-winning British male voiceover artist with 25+ years experience. TV, radio, games, explainers, characters & events. Contact for a fast quote.',
  alternates: { canonical: 'https://www.voiceoverguy.co.uk/' },
};

const videoTiles = [
  {
    img: '/assets/images/voiceoverguy-home-commercial-voice.jpg',
    titleOverlay: 'Commercial Voice',
    captionLine1: 'Male',
    captionHighlight: 'Voiceover',
    captionLine1End: 'Showreel',
    href: 'https://www.youtube.com/watch?v=9bs4CJ4RixI',
  },
  {
    img: '/assets/images/voiceoverguy-home-character-voices.jpg',
    titleOverlay: 'Character Voices',
    captionLine1: '',
    captionHighlight: 'Character',
    captionLine1End: 'Voice Showreel',
    href: 'https://www.youtube.com/watch?v=Ad85PPvSfbc',
  },
  {
    img: '/assets/images/voiceoverguy-home-apple-voice.jpg',
    titleOverlay: 'The Apple Voice',
    captionLine1: 'Apple',
    captionHighlight: 'iPhone',
    captionLine1End: 'TV Ads',
    href: 'https://www.youtube.com/watch?v=uYDQObLc1vw',
  },
  {
    img: '/assets/images/voiceoverguy-home-explainer-voices.jpg',
    titleOverlay: 'Explainer Voices',
    captionLine1: '',
    captionHighlight: 'Explainer',
    captionLine1End: 'Video Showreel',
    href: 'https://www.youtube.com/watch?v=TGD6Btk4twk',
  },
  {
    img: '/assets/images/voiceoverguy-home-what-i-do.jpg',
    titleOverlay: 'This is what I do...',
    captionLine1: 'Well? This is what',
    captionHighlight: 'i do',
    captionLine1End: '',
    href: 'https://www.youtube.com/watch?v=TqkdBK8mBW8',
  },
  {
    img: '/assets/images/voiceoverguy-home-voice-of-santa.jpg',
    titleOverlay: 'Voice of Santa',
    captionLine1: 'Ho Ho Ho! The Voice of',
    captionHighlight: 'Santa',
    captionLine1End: '',
    href: 'https://www.youtube.com/watch?v=P44bGiUI0vE',
  },
];

const clientLogos = [
  { src: '/assets/images/clients/voiceoverguy-clients-igt-gaming-awards.png', alt: 'IGT' },
  { src: '/assets/images/clients/voiceoverguy-clients-maoam.png', alt: 'MAOAM' },
  { src: '/assets/images/clients/voiceoverguy-clients-midea.png', alt: 'Midea' },
  { src: '/assets/images/clients/voiceoverguy-clients-ninja-warrior.png', alt: 'Ninja Warrior' },
  { src: '/assets/images/clients/voiceoverguy-clients-smyths-toys.png', alt: 'Smyths Toys' },
  { src: '/assets/images/clients/voiceoverguy-clients-just-eat.png', alt: 'Just Eat' },
  { src: '/assets/images/clients/voiceoverguy-clients-apple.png', alt: 'Apple' },
  { src: '/assets/images/clients/voiceoverguy-disney-brand.png', alt: 'Disney' },
  { src: '/assets/images/clients/voiceoverguy-clients-bbc-2.png', alt: 'BBC' },
  { src: '/assets/images/clients/voiceoverguy-microsoft-brand.png', alt: 'Microsoft' },
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
  { src: '/assets/images/clients/voiceoverguy-clients-poundland.png', alt: 'Poundland' },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <h1>
            British Male Voiceover Artist – <span className="text-red">Guy Harris</span>
          </h1>
          <h2>Voice heard Worldwide</h2>

          <WaveSurferPlayer
            src="/assets/audio/guy-harris-voiceoverguy-commercial-showreel.mp3"
          />

          <div className="hero-bio">
            <p>
              Guy Harris – VoiceoverGuy. A professional and award-winning British male voiceover artist.{' '}
              Over 25 years&apos; experience and more than 200,000 scripts voiced, Guy works with global brands{' '}
              including Apple, Disney, ITV, Hotels.com, BBC and Thomas the Tank Engine.
            </p>
          </div>

          <ReviewBlock />
        </div>
      </section>

      {/* AWARDS / CREDENTIALS */}
      <section className="home-section">
        <div className="container">
          <p>
            <strong>Multi-award-winning British voiceover</strong> – VOX Best Male Voiceover Award winner and 3-time SOVAS (USA) finalist.
          </p>
          <p>
            If you&apos;re looking for a confident, reliable and fast-turnaround male voiceover,<br />
            Guy delivers <strong>broadcast-quality audio</strong> from his professional studio.<br />
            Choose from{' '}
            <Link href="/commercial-voiceover" className="red-link">TV &amp; Radio ads</Link>,{' '}
            <Link href="/explainer-video-voice" className="red-link">Explainer voiceovers</Link>,{' '}
            <a href="https://www.pathevoice.co.uk" target="_blank" rel="noopener noreferrer" className="red-link">Pathé News Voiceover</a>,{' '}
            <Link href="/character-voiceover" className="red-link">Character Voiceovers</Link>,<br />
            and his highly requested{' '}
            <Link href="/david-attenborough-voice" className="red-link">David Attenborough impression</Link>{' '}
            — just ask Google.
          </p>
        </div>
      </section>

      {/* EVENT OR AWARDS NIGHT */}
      <section className="home-section">
        <div className="container">
          <h2>Event or Awards Night Voiceover?</h2>
          <p>
            Running an event, awards show or big stage production? My{' '}
            <Link href="/voice-of-god" className="red-link">Voice of God</Link>{' '}
            delivery is trusted by <strong>ITV</strong>, <strong>Butlins</strong>, <strong>The Masked Singer</strong>, <strong>Bestway</strong>, <strong>Poundland</strong> and the <strong>National History Museum</strong>. If you need a bold, authoritative announcer voice that fills the room and lifts the atmosphere — you&apos;ve found the right Guy.
          </p>
        </div>
      </section>

      {/* WHY CLIENTS CHOOSE ME */}
      <section className="home-section">
        <div className="container">
          <h2>Why Clients Choose Me</h2>
          <p>
            Finding the right voice shouldn&apos;t feel like a gamble. After 25 years and more than 200,000 projects, I&apos;ve learned{' '}
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
      </section>

      {/* ARABELLA HARRIS */}
      <section className="home-section">
        <div className="container">
          <h2>Need a <span className="text-red">British Child Voiceover</span>?</h2>
          <p>
            Meet <strong>Arabella Harris</strong> — a 9-year-old professional child voiceover artist with national credits including Tesco,<br />
            Sainsbury&apos;s, and Nickelodeon.
          </p>
          <p>
            Her clear, natural young girl voice is ideal for animation, radio, and commercials.<br />
            <Link href="/arabella-harris-girl-child-voiceover-kid" className="red-link">Listen to her child voiceover demos</Link> or visit{' '}
            <a href="https://www.arabellaharris.com" target="_blank" rel="noopener noreferrer" className="red-link">ArabellaHarris.com</a>{' '}
            to learn more.
          </p>
        </div>
      </section>

      {/* READY TO BOOK CTA */}
      <section className="home-section">
        <div className="container">
          <p>
            Ready to book a professional voice that&apos;s fast, reliable and broadcast-quality?
          </p>
          <p>
            <Link href="/contact-guy" className="red-link">Get in touch today</Link>{' '}
            — I&apos;m in the studio and ready to help.
          </p>
        </div>
      </section>

      {/* THREE SHOWREEL AUDIO PLAYERS */}
      <section className="home-section">
        <div className="container">
          <div className="showreel-players">
            <div className="showreel-player-item">
              <WaveSurferPlayer
                src="/assets/audio/guy-harris-voiceoverguy-commercial-showreel.mp3"
                label='<span class="text-red">Commercial</span> Showreel 2025'
                compact
              />
            </div>
            <div className="showreel-player-item">
              <WaveSurferPlayer
                src="/assets/audio/guy-harris-voiceoverguy-character-showreel.mp3"
                label='<span class="text-red">Character</span> Voices Showreel 2025'
                compact
              />
            </div>
            <div className="showreel-player-item">
              <WaveSurferPlayer
                src="/assets/audio/guy-harris-voiceoverguy-explainer-video-showreel.mp3"
                label='<span class="text-red">Explainer Video</span> Showreel 2025'
                compact
              />
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO TILES */}
      <section className="section">
        <div className="container">
          <p style={{ textAlign: 'center', marginBottom: '24px' }}>
            Not sure where to start? Here are my most requested styles — from commercial reads to character voices. Each video below gives you a quick taste of how I can bring your project to life.
          </p>
          <div className="video-grid">
            {videoTiles.map(v => (
              <div key={v.img}>
                <a
                  href={v.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="video-thumb"
                >
                  <img
                    src={v.img}
                    alt={v.titleOverlay}
                    width={400}
                    height={225}
                    loading="lazy"
                  />
                </a>
                <div className="video-caption">
                  <p>{v.captionLine1} <span className="text-red">{v.captionHighlight}</span> {v.captionLine1End}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENT LOGOS */}
      <section className="client-logos-section">
        <div className="client-logos-border client-logos-border--top" />
        <div className="client-logos-marquee-wrapper">
          <div className="client-logos-marquee">
            {clientLogos.map(logo => (
              <img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
              />
            ))}
            <div aria-hidden="true" style={{ display: 'contents' }}>
              {clientLogos.map(logo => (
                <img
                  key={`${logo.alt}-dup`}
                  src={logo.src}
                  alt=""
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="client-logos-border client-logos-border--bottom" />
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
                <Link href="/contact-guy" className="red-link">Get in touch today.</Link>
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

      {/* NEWS */}
      <NewsSection />

      {/* SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Guy Harris',
            jobTitle: 'Voiceover Artist',
            url: 'https://www.voiceoverguy.co.uk/',
            image: 'https://www.voiceoverguy.co.uk/assets/images/guy-harris-voiceover.jpg',
            telephone: '+447973350178',
            email: 'guy@voiceoverguy.co.uk',
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'GB',
              addressRegion: 'Yorkshire',
            },
            sameAs: [
              'https://www.youtube.com/channel/UCBKf-ETUIQ5dgh1WNLifhEQ',
              'https://soundcloud.com/voiceoverguy',
            ],
          }),
        }}
      />
    </>
  );
}
