import type { Metadata } from 'next';
import Link from 'next/link';
import NewsSection from '@/components/NewsSection';

export const metadata: Metadata = {
  title: 'British Male Voiceover | Guy Harris – UK Voice Artist',
  description: 'Guy Harris is an award-winning British male voiceover artist with 25+ years experience. TV, radio, games, explainers, characters & events. Contact for a fast quote.',
  alternates: { canonical: 'https://www.voiceoverguy.co.uk/' },
};

const videoLinks = [
  { id: 'P44bGiUI0vE', title: 'Voice of Santa', subtitle: "The UK's Father Christmas" },
  { id: 'V6HuBB4WqxQ', title: 'Voice of Apple', subtitle: 'iPhone TV Ads' },
  { id: 'AnXBP5Klgv0', title: 'WORMS WMD', subtitle: 'Army Sergeant' },
  { id: 'pzsUS6koEAU', title: 'DNCE – Lifestyle of..',  subtitle: 'the Rich and Famous' },
  { id: 'Fm0qSBLhA6A', title: 'Star Wars', subtitle: 'Character voices' },
  { id: 'OmVuCVXsWM4', title: 'Craig Cash', subtitle: 'Character voice' },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <h1>Guy Harris – VoiceoverGuy</h1>
          <h2>Award Winning British Male Voiceover Artist</h2>

          <a
            href="https://g.page/r/CXXXxxxxxxxx/review"
            target="_blank"
            rel="noopener noreferrer"
            className="star-rating"
          >
            ★★★★★ <span className="rating-count">5.0 · Rated on Google</span>
          </a>

          <p className="awards-line">
            Winner: Best Male Voice — Drum Awards · IndiePendent TV Voice Artist of the Year
          </p>

          <div className="hero-bio">
            <p>
              Hi! I&apos;m Guy Harris, a professional British male voiceover artist with over 25 years experience
              in broadcast television, radio, corporate, gaming and entertainment voiceovers.
              Based in Yorkshire with a professional home studio, I deliver broadcast quality voiceovers
              globally — fast, reliably and at sensible rates.
            </p>
            <p>
              You may have heard me on ITV, the BBC, Channel 4, Sky, in video games or on the radio.
              I&apos;m the voice of Santa for BBC Radio 2, the Army Sergeant in WORMS WMD, Salty in
              Thomas &amp; Friends, and the Voice of God for numerous TV shows and live events.
            </p>
          </div>

          {/* SoundCloud Showreel */}
          <div className="audio-player-wrap">
            <p style={{ color: '#aaa', fontSize: '13px', marginBottom: '8px' }}>
              Listen to my voice demo showreel:
            </p>
            <iframe
              width="100%"
              height="166"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/voiceoverguy&amp;color=%239C060B&amp;auto_play=false&amp;hide_related=false&amp;show_comments=false&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=true"
              title="VoiceoverGuy showreel on SoundCloud"
            />
          </div>

          <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact-guy" className="cta-btn">Get a Quote / Book Guy</Link>
            <Link href="/voiceoverguy" className="cta-btn-outline" style={{ color: 'white', borderColor: 'white' }}>
              About Guy
            </Link>
          </div>
        </div>
      </section>

      {/* VOICE STYLES */}
      <section className="section">
        <div className="container">
          <h2>Professional Voiceover Styles &amp; Demos</h2>
          <p>
            Whether you need a warm and conversational tone for your explainer video, a powerful
            authoritative voice for your TV commercial, or a character voice that brings animation to
            life — I deliver. Here are some of my most requested voiceover styles:
          </p>

          <div className="features-grid">
            {[
              {
                title: 'Commercial Voiceover',
                href: '/commercial-voiceover',
                desc: 'TV, radio and digital advertising. Warm, punchy, authoritative or conversational — matched to your brand.',
              },
              {
                title: 'Explainer Video Voice',
                href: '/explainer-video-voice',
                desc: 'Clear, engaging narration that keeps viewers watching. Perfect for product demos, how-to videos and onboarding.',
              },
              {
                title: 'Apple Voice Style',
                href: '/apple-voice-style',
                desc: 'Minimalist, clean, confident. The aspirational tech voiceover that made Apple iconic.',
              },
              {
                title: 'Voice of God',
                href: '/voice-of-god',
                desc: "The powerful live event announcing voice. Awards shows, sports events, TV studio recordings — I've done them all.",
              },
              {
                title: "Voice of Santa",
                href: '/santa-voice',
                desc: "The UK's favourite Father Christmas voice. Warm, jolly, magical. Perfect for Christmas campaigns.",
              },
              {
                title: 'David Attenborough Voice',
                href: '/david-attenborough-voice',
                desc: 'Considered, measured, awe-inspiring natural history narration. One of my most requested character styles.',
              },
              {
                title: 'Football Commentator',
                href: '/football-commentator-voice',
                desc: 'Energetic, passionate sports commentary for games, promos, social media and events.',
              },
              {
                title: 'Gaming Voiceover',
                href: '/character-voiceover',
                desc: 'Character voices for AAA and indie games. From the Army Sergeant in WORMS WMD to Thomas & Friends.',
              },
              {
                title: 'Corporate & E-Learning',
                href: '/narration-voice',
                desc: 'Professional, warm and authoritative narration for internal comms, training and e-learning modules.',
              },
            ].map(item => (
              <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                <div className="feature-block">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO DEMOS */}
      <section className="section section-alt">
        <div className="container">
          <h2>Voiceover Video Demos</h2>
          <p>Watch and hear some of my recent voiceover work across TV, radio, events and gaming:</p>
          <div className="video-grid">
            {videoLinks.map(v => (
              <a
                key={v.id}
                href={`https://www.youtube.com/watch?v=${v.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="video-thumb"
              >
                <img
                  src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`}
                  alt={v.title}
                  width={320}
                  height={180}
                  loading="lazy"
                />
                <div className="video-thumb-overlay">
                  <span className="play-icon">▶</span>
                  <p>{v.title}</p>
                  <p style={{ fontSize: '11px', opacity: 0.8 }}>{v.subtitle}</p>
                </div>
              </a>
            ))}
          </div>
          <p style={{ marginTop: '20px' }}>
            <a
              href="https://www.youtube.com/channel/UCBKf-ETUIQ5dgh1WNLifhEQ"
              target="_blank"
              rel="noopener noreferrer"
              className="read-more"
            >
              View all videos on YouTube →
            </a>
          </p>
        </div>
      </section>

      {/* WHY GUY */}
      <section className="section-dark">
        <div className="container">
          <h2>Why Choose Guy?</h2>
          <div className="features-grid" style={{ marginTop: '24px' }}>
            {[
              {
                title: '25+ Years Experience',
                desc: "I've been doing this since 1999. Thousands of clients. Millions of listeners.",
              },
              {
                title: 'Professional Home Studio',
                desc: 'Broadcast quality recording 7 days a week. Fast turnaround — most jobs delivered within 4 hours.',
              },
              {
                title: 'Globally Connected',
                desc: 'Source Connect NEXUS, Cleanfeed, Zoom and Skype for directed remote sessions anywhere in the world.',
              },
              {
                title: 'Award Winning',
                desc: 'Drum Awards Best Male Voice · IndiePendent TV Voice Artist of the Year',
              },
              {
                title: 'Transparent Pricing',
                desc: 'Honest fixed-price tiers for web content. TV/radio/events quoted fairly. No surprises.',
              },
              {
                title: 'Direct Booking',
                desc: "No agency middleman. Work directly with me. Faster, cheaper, and I'll actually care about your project.",
              },
            ].map((item, i) => (
              <div key={i} className="feature-block" style={{ background: 'rgba(255,255,255,0.08)', borderTopColor: '#9C060B' }}>
                <h3 style={{ color: '#ffa0a0' }}>{item.title}</h3>
                <p style={{ color: '#ccc' }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <Link href="/contact-guy" className="cta-btn">Book Guy Now</Link>
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
