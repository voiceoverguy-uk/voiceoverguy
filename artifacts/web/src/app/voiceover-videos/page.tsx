import pages from '@/data/pages.json';
import { normaliseHtml } from '@/lib/normaliseHtml';
  import type { Metadata } from 'next';

  const data = (pages as Record<string, Record<string, string>>)['seo21'];

  export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/voiceover-videos`,
  },
    title: data.s1,
    description: data.s2,
    openGraph: {
      title: `${data.s1} | VoiceoverGuy`,
      description: data.s2,
      url: 'https://www.voiceoverguy.co.uk/voiceover-videos',
      images: [{ url: 'https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.webp', width: 1200, height: 630, alt: 'Voiceover Videos – Guy Harris' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.s1} | VoiceoverGuy`,
      description: data.s2,
      images: ['https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.webp'],
    },
  };

  const items = [
    { img: '/assets/images/voiceoverguy-videos-Universal-Studio.webp', caption: data.v1 },
        { img: '/assets/images/voiceoverguy-videos-apple.webp', caption: data.v2 },
        { img: '/assets/images/voiceoverguy-videos-walkers-crisps.webp', caption: data.v3 },
        { img: '/assets/images/voiceoverguy-videos-disney-store.webp', caption: data.v4 },
        { img: '/assets/images/voiceoverguy-videos-radio-one-big-weekend.webp', caption: data.v5 },
        { img: '/assets/images/voiceoverguy-videos-nesquik-bunny.webp', caption: data.v6 },
        { img: '/assets/images/voiceoverguy-videos-penarium-game-trailer.webp', caption: data.v7 },
        { img: '/assets/images/voiceoverguy-videos-disney-world.webp', caption: data.v8 },
        { img: '/assets/images/voiceoverguy-videos-minecraft.webp', caption: data.v9 },
        { img: '/assets/images/voiceoverguy-videos-tesco-bank.webp', caption: data.v10 },
        { img: '/assets/images/voiceoverguy-videos-lego.webp', caption: data.v11 },
        { img: '/assets/images/voiceoverguy-videos-kelloggs.webp', caption: data.v12 },
        { img: '/assets/images/voiceoverguy-videos-horlicks.webp', caption: data.v13 },
        { img: '/assets/images/voiceoverguy-videos-pig-goes-pop.webp', caption: data.v14 },
        { img: '/assets/images/voiceoverguy-videos-ant-dec-takeaway-tour.webp', caption: data.v15 },
        { img: '/assets/images/voiceoverguy-videos-wren-kitchens-viral.webp', caption: data.v16 },
        { img: '/assets/images/voiceoverguy-videos-kings-road-game-trailer.webp', caption: data.v17 },
        { img: '/assets/images/voiceoverguy-videos-world-of-warships.webp', caption: data.v18 },
        { img: '/assets/images/voiceoverguy-videos-silly-moo.webp', caption: data.v19 },
        { img: '/assets/images/voiceoverguy-videos-the-car-people.webp', caption: data.v20 },
        { img: '/assets/images/voiceoverguy-videos-playmobil.webp', caption: data.v21 }
  ];

  export default function Page() {
    return (
      <main className="inner-page">
        <section className="inner-hero">
          <div className="inner-container" dangerouslySetInnerHTML={{ __html: normaliseHtml(data.s3 || '') }} />
        </section>
        <div className="inner-bar" />
        <div className="inner-parallax">
          <div className="inner-container">
            {data.s4 && <div dangerouslySetInnerHTML={{ __html: normaliseHtml(data.s4) }} />}
            <div className="video-grid">
              {items.map(({ img, caption }) => (
                <div key={img} className="video-item">
                  <img src={img} alt={caption?.replace(/<[^>]+>/g, '') ?? ''} style={{ width: '100%', borderRadius: 4 }} />
                  {caption && <p dangerouslySetInnerHTML={{ __html: caption }} />}
                </div>
              ))}
            </div>
            {data.s5 && <div dangerouslySetInnerHTML={{ __html: normaliseHtml(data.s5) }} />}
            {data.s6 && <div dangerouslySetInnerHTML={{ __html: normaliseHtml(data.s6) }} />}
            {data.s7 && <div dangerouslySetInnerHTML={{ __html: normaliseHtml(data.s7) }} />}
            {data.s8 && <div dangerouslySetInnerHTML={{ __html: normaliseHtml(data.s8) }} />}
          </div>
        </div>
      </main>
    );
  }
  