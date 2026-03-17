import InnerPage from '@/components/InnerPage';
import VogPlaylist from '@/components/VogPlaylist';
import pages from '@/data/pages.json';
import type { Metadata } from 'next';

const data = (pages as Record<string, Record<string, string>>)['seo7'];

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/voice-of-god`,
  },
  title: data.s1,
  description: data.s2,
};

export default function Page() {
  return (
    <main className="inner-page">
      {data.s3 && (
        <section className="inner-hero">
          <div className="inner-container" dangerouslySetInnerHTML={{ __html: data.s3 }} />
        </section>
      )}
      <div className="inner-bar" />

      {/* Mini playlist — replaces SoundCloud embed */}
      <div className="inner-parallax">
        <div className="inner-container" style={{ paddingBottom: 0 }}>
          <VogPlaylist />
        </div>
      </div>

      <InnerPage pageTitle={data.s1} pageSlug="voice-of-god" sections={[
        ...(data.s4 ? [{ text: data.s4 }] : []),
        ...(data.s7 ? [{ youtubeId: data.s7 }] : []),
        ...(data.s5 ? [{ text: data.s5 }] : []),
        ...(data.s8 ? [{ youtubeId: data.s8 }] : []),
        ...(data.s6 ? [{ text: data.s6 }] : []),
        { imageSrc: '/assets/images/voice-of-god-voice-og.jpg', imageAlt: 'Voice of God – Guy Harris' },
      ]} />
    </main>
  );
}
