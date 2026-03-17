import pages from '@/data/pages.json';
  import type { Metadata } from 'next';

  const data = (pages as Record<string, Record<string, string>>)['seo25'];

  function Img({ src, alt }: { src: string; alt: string }) {
    return <img src={src} alt={alt} title={alt} style={{ width: '100%', borderRadius: 4, marginTop: 8 }} />;
  }

  export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/voiceover-studio`,
  },
    title: data.s1,
    description: data.s2,
  };

  export default function Page() {
    return (
      <main className="inner-page">
        <section className="inner-hero">
          <div className="inner-container">
            <div dangerouslySetInnerHTML={{ __html: data.s3 || '' }} />
            <div className="studio-tour-wrap">
              <iframe
                src="https://www.voiceoverguy.co.uk/studiotour/index.html"
                title="360° VoiceoverGuy Studio Tour"
                allowFullScreen
              />
            </div>
          </div>
        </section>
        <div className="inner-bar" />
        <div className="inner-parallax">
          <div className="inner-container">
            <div className="inner-row">
              <div className="inner-col"><div dangerouslySetInnerHTML={{ __html: data.s4 || '' }} /></div>
              <div className="inner-col"><Img src="/assets/images/studio/voiceoverguy-voicover-studio1.jpg" alt="Voiceover Studio – VoiceoverGuy" /></div>
            </div>
            <div className="inner-row reverse">
              <div className="inner-col"><Img src="/assets/images/studio/voiceoverguy-voicover-studio7.jpg" alt="Yorkshire Voiceover Studio" /></div>
              <div className="inner-col"><div dangerouslySetInnerHTML={{ __html: data.s5 || '' }} /></div>
            </div>
            <div className="inner-row">
              <div className="inner-col"><div dangerouslySetInnerHTML={{ __html: data.s6 || '' }} /></div>
              <div className="inner-col"><Img src="/assets/images/studio/voiceoverguy-voicover-studio3.jpg" alt="West Yorkshire Voiceover Studio" /></div>
            </div>
            <div className="inner-row reverse">
              <div className="inner-col"><Img src="/assets/images/studio/voiceoverguy-voicover-studio4.jpg" alt="Leeds Voiceover Studio" /></div>
              <div className="inner-col"><div dangerouslySetInnerHTML={{ __html: data.s7 || '' }} /></div>
            </div>
            <div className="inner-row">
              <div className="inner-col"><div dangerouslySetInnerHTML={{ __html: data.s8 || '' }} /></div>
              <div className="inner-col"><Img src="/assets/images/studio/voiceoverguy-voicover-studio5.jpg" alt="Voiceover Studio for Hire in West Yorkshire" /></div>
            </div>
            <div className="inner-row reverse">
              <div className="inner-col"><Img src="/assets/images/studio/voiceoverguy-voicover-studio6.jpg" alt="Professional Voiceover Booth in Yorkshire" /></div>
              <div className="inner-col"><div dangerouslySetInnerHTML={{ __html: data.s9 || '' }} /></div>
            </div>
            <div className="inner-row">
              <div className="inner-col"><div dangerouslySetInnerHTML={{ __html: data.s10 || '' }} /></div>
              <div className="inner-col"><Img src="/assets/images/studio/voiceoverguy-voicover-studio2.jpg" alt="Wakefield Voiceover Studio" /></div>
            </div>
          </div>
        </div>
      </main>
    );
  }
  