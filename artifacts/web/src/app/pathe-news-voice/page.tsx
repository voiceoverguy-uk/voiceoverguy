import InnerPage from '@/components/InnerPage';
import pages from '@/data/pages.json';
import { normaliseHtml } from '@/lib/normaliseHtml';
import type { Metadata } from 'next';
import { SchemaScripts, profilePage, breadcrumb, faqPage, videoObject } from '@/lib/staticPageSchema';

const data = (pages as Record<string, Record<string, string>>)['seo16'];

const metaDescription = "Pathe News Voice - 1940's and 1950's retro voiceover style heard on BBC Radio 1, Everton FC, Horlicks and Aston Villa's Glory Days kit launch.";

const astonVillaBlock = `<br><h2>Aston Villa Kit Launch in a <span class="ident">Pathé News</span> Style</h2>
<p>Fresh off the back of Aston Villa's big win, I was asked to voice their new kit announcement video in my Pathé-style voice, and it has turned out brilliantly. It is one of my strongest examples of the style, with that classic clipped, authoritative British delivery that suits vintage newsreel narration so well. You can hear more of my work on the <a href="/" title="VoiceoverGuy home">VoiceoverGuy home page</a>.</p>
<p>The team did a superb job with the final sound too. The EQ on the voice really helps sell the illusion, giving it that polished, archive-inspired tone that feels right at home with the Pathé flavour. It is always satisfying when the performance and production come together like that.</p>
<p>This kind of voice works beautifully for football club launches, heritage-themed promos, cinematic brand films and any project that wants that old-fashioned British newsreel authority. Recorded in my <a href="/voiceover-studio" title="Broadcast-quality voiceover studio">broadcast-quality voiceover studio</a>, it sits naturally alongside my <a href="/movie-trailer-voice" title="Movie Trailer Voice">movie trailer voice</a> work and the wider <a href="/character-voice-library" title="Character Voice Library">character voice library</a>.</p>`;

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/pathe-news-voice`,
  },
  title: data.s1,
  description: metaDescription,
  openGraph: {
    title: `${data.s1} | VoiceoverGuy`,
    description: metaDescription,
    url: 'https://www.voiceoverguy.co.uk/pathe-news-voice',
    images: [{ url: 'https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.webp', width: 1200, height: 630, alt: 'Pathe News Voice – Guy Harris' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${data.s1} | VoiceoverGuy`,
    description: metaDescription,
    images: ['https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.webp'],
  },
};

const schemas = [
  profilePage('pathe-news-voice', 'Guy Harris recreates the classic British Pathe News voice with 1940s flair and mid-Atlantic precision, trusted for documentaries, adverts and nostalgic content.', {
    jobTitle: 'Pathe News Style Voiceover Artist',
  }),
  breadcrumb('pathe-news-voice', 'Pathe News Voice'),
  faqPage('pathe-news-voice', [
    { q: 'What is a Pathe News voice?', a: 'A Pathe News voice recreates the distinctive mid-Atlantic, clipped British narration style heard in 1940s and 1950s cinema newsreels. Guy Harris delivers this retro style for documentaries, adverts, and nostalgic content.' },
    { q: 'Can Guy Harris voice my project in the Pathe News style?', a: 'Yes. Guy specialises in authentic Pathe News and Danvers-Walker style voiceovers for radio ads, TV productions, and vintage-themed campaigns.' },
  ]),
  videoObject('pathe-news-voice', data.s1, 'Classic British Pathe News style voiceover by Guy Harris with 1940s flair and mid-Atlantic precision.', 'Hp8-la1KL6E', '2015-07-02'),
  videoObject('pathe-news-voice', 'Aston Villa Kit Launch in a Pathé News Style', "Aston Villa's Glory Days kit launch voiced by Guy Harris in his vintage Pathé News style, with authoritative British newsreel delivery.", 'Lp4lZUcdQ_w', '2026-05-26', '-aston-villa'),
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
      <InnerPage pageTitle={data.s1} pageSlug="pathe-news-voice" formIntro="Looking for that classic Pathé-style delivery? Send me a quick message and I'll get back to you." sections={[
        ...(data.s4 ? [{ text: data.s4, audioSrc: '/assets/audio/pathe-news-voice-guy-harris.mp3' }] : []),
        ...(data.s7 ? [{ youtubeId: data.s7 }] : []),
        ...(data.s5 ? [{ text: data.s5 }] : []),
        ...(data.s8 ? [{ youtubeId: data.s8 }] : []),
        { text: astonVillaBlock },
        { youtubeId: 'Lp4lZUcdQ_w' },
        ...(data.s6 ? [{ text: data.s6 }] : []),
        { imageSrc: '/assets/images/pathe-voice-og.webp', imageAlt: 'Path\u00E9 News Voice \u2013 Guy Harris' },
      ]} />
      <SchemaScripts schemas={schemas} />
    </main>
  );
}
