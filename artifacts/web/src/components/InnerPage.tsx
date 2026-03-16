import React from 'react';
import BlogEnquiryForm from '@/components/BlogEnquiryForm';

interface Section {
  text?: string;
  youtubeId?: string;
  vimeoId?: string;
  imageSrc?: string;
  imageAlt?: string;
  fullWidth?: boolean;
}

interface InnerPageProps {
  sections: Section[];
  pageTitle?: string;
  pageSlug?: string;
}

function normalizeHTML(html: string): string {
  return (html || '')
    .replace(/https:\/\/www\.voiceoverguy\.co\.uk\/assets\/audio\//g, '/assets/audio/')
    .replace(/https:\/\/www\.voiceoverguy\.co\.uk\/assets\/images\//g, '/assets/images/')
    .replace(/class="isred"/g, 'class="isred"')
    .replace(/class="ident"/g, 'class="ident"');
}

function isYouTubeId(str: string): boolean {
  const clean = (str || '').replace(/\/.*$/, '').trim();
  return /^[a-zA-Z0-9_-]{11}$/.test(clean);
}

function isVimeoId(str: string): boolean {
  return /^\d{7,10}$/.test((str || '').trim());
}

function YouTubeEmbed({ id }: { id: string }) {
  const cleanId = id.replace(/\/.*$/, '').trim();
  return (
    <div className="embed-wrap">
      <iframe
        src={`https://www.youtube.com/embed/${cleanId}`}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

function VimeoEmbed({ id }: { id: string }) {
  return (
    <div className="embed-wrap">
      <iframe
        src={`https://player.vimeo.com/video/${id.trim()}`}
        title="Vimeo video"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export default function InnerPage({ sections, pageTitle, pageSlug }: InnerPageProps) {
  const pairs: Array<[Section, Section | null]> = [];
  let i = 0;

  while (i < sections.length) {
    const s = sections[i];
    if (s.fullWidth) {
      pairs.push([s, null]);
      i++;
    } else if (i + 1 < sections.length && !sections[i + 1].fullWidth) {
      pairs.push([s, sections[i + 1]]);
      i += 2;
    } else {
      pairs.push([s, null]);
      i++;
    }
  }

  return (
    <div className="inner-parallax">
      <div className="inner-container">
        {pairs.map((pair, idx) => {
          const [left, right] = pair;
          if (!right) {
            return (
              <div key={idx} className="inner-full">
                {left.text && (
                  <div dangerouslySetInnerHTML={{ __html: normalizeHTML(left.text) }} />
                )}
                {left.youtubeId && isYouTubeId(left.youtubeId) && (
                  <YouTubeEmbed id={left.youtubeId} />
                )}
                {left.vimeoId && isVimeoId(left.vimeoId) && (
                  <VimeoEmbed id={left.vimeoId} />
                )}
                {left.imageSrc && (
                  <img src={left.imageSrc} alt={left.imageAlt || ''} className="inner-img" />
                )}
              </div>
            );
          }

          const isEven = idx % 2 === 0;
          return (
            <div key={idx} className={`inner-row${!isEven ? ' reverse' : ''}`}>
              <div className="inner-col">
                {left.text && (
                  <div dangerouslySetInnerHTML={{ __html: normalizeHTML(left.text) }} />
                )}
                {left.youtubeId && isYouTubeId(left.youtubeId) && (
                  <YouTubeEmbed id={left.youtubeId} />
                )}
                {left.vimeoId && isVimeoId(left.vimeoId) && (
                  <VimeoEmbed id={left.vimeoId} />
                )}
                {left.imageSrc && (
                  <img src={left.imageSrc} alt={left.imageAlt || ''} style={{ width: '100%', borderRadius: 4, marginTop: 8 }} />
                )}
              </div>
              <div className="inner-col">
                {right.text && (
                  <div dangerouslySetInnerHTML={{ __html: normalizeHTML(right.text) }} />
                )}
                {right.youtubeId && isYouTubeId(right.youtubeId) && (
                  <YouTubeEmbed id={right.youtubeId} />
                )}
                {right.vimeoId && isVimeoId(right.vimeoId) && (
                  <VimeoEmbed id={right.vimeoId} />
                )}
                {right.imageSrc && (
                  <img src={right.imageSrc} alt={right.imageAlt || ''} style={{ width: '100%', borderRadius: 4, marginTop: 8 }} />
                )}
              </div>
            </div>
          );
        })}

        {pageTitle && pageSlug && (
          <BlogEnquiryForm
            pageTitle={pageTitle}
            pageUrl={`https://www.voiceoverguy.co.uk/${pageSlug}`}
          />
        )}
      </div>
    </div>
  );
}
