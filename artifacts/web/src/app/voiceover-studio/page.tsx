import pages from '@/data/pages.json';
import type { Metadata } from 'next';
import { SchemaScripts, webPage, breadcrumb, localBusiness, faqPage } from '@/lib/staticPageSchema';

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

const schemas = [
  webPage('voiceover-studio', 'VoiceoverGuy Studio', 'Professional voiceover studio in Wakefield, West Yorkshire. Take a 360\u00B0 virtual tour and see the broadcast-quality recording setup used by Guy Harris.'),
  breadcrumb('voiceover-studio', 'Voiceover Studio'),
  localBusiness('voiceover-studio', 'Professional voiceover recording studio in Wakefield, West Yorkshire offering broadcast-quality audio, same-day delivery and remote session capability.'),
  faqPage('voiceover-studio', [
    { q: 'Where is VoiceoverGuy\u2019s recording studio?', a: 'The VoiceoverGuy studio is based in Wakefield, West Yorkshire, UK \u2013 equipped for broadcast-quality recording with same-day delivery.' },
    { q: 'Can I connect to the studio remotely?', a: 'Yes. The studio supports live-directed sessions via Source Connect, Cleanfeed, Zoom, Teams and phone patch.' },
  ]),
];

export default function Page() {
  return (
    <main className="inner-page">
      <section className="inner-hero">
        <div className="inner-container">
          <div dangerouslySetInnerHTML={{ __html: data.s3 || '' }} />
          <div className="studio-tour-wrap">
            <iframe
              src="https://www.voiceoverguy.co.uk/studiotour/index.html"
              title="360\u00B0 VoiceoverGuy Studio Tour"
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
            <div className="inner-col"><Img src="/assets/images/studio/voiceoverguy-voicover-studio1.jpg" alt="Voiceover Studio \u2013 VoiceoverGuy" /></div>
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
      <SchemaScripts schemas={schemas} />
    </main>
  );
}
