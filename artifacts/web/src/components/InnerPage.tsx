import React from 'react';
import BlogEnquiryForm from '@/components/BlogEnquiryForm';
import { normaliseHtml } from '@/lib/normaliseHtml';

interface Section {
  text?: string;
  youtubeId?: string;
  vimeoId?: string;
  imageSrc?: string;
  imageAlt?: string;
  fullWidth?: boolean;
  node?: React.ReactNode;
  audioSrc?: string;
  downloadLabel?: string;
}

interface InnerPageProps {
  sections: Section[];
  pageTitle?: string;
  pageSlug?: string;
  formIntro?: string;
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

function AudioPlayer({ src, label }: { src: string; label?: string }) {
  return (
    <div className="demo-player">
      <audio controls>
        <source src={src} type="audio/mpeg" />
      </audio>
      <a href={src} download className="demo-download-btn">
        {label || 'Download Sample MP3'}
      </a>
    </div>
  );
}

export default function InnerPage({ sections, pageTitle, pageSlug, formIntro }: InnerPageProps) {
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
                  <div dangerouslySetInnerHTML={{ __html: normaliseHtml(left.text) }} />
                )}
                {left.audioSrc && <AudioPlayer src={left.audioSrc} label={left.downloadLabel} />}
                {left.youtubeId && isYouTubeId(left.youtubeId) && (
                  <YouTubeEmbed id={left.youtubeId} />
                )}
                {left.vimeoId && isVimeoId(left.vimeoId) && (
                  <VimeoEmbed id={left.vimeoId} />
                )}
                {left.imageSrc && (
                  <div className="blog-post-img-card">
                    <img src={left.imageSrc} alt={left.imageAlt || ''} className="blog-post-img" />
                    {left.imageAlt && <p className="blog-post-img-caption">{left.imageAlt}</p>}
                  </div>
                )}
                {left.node && <>{left.node}</>}
              </div>
            );
          }

          const isEven = idx % 2 === 0;
          return (
            <div key={idx} className={`inner-row${!isEven ? ' reverse' : ''}`}>
              <div className="inner-col">
                {left.text && (
                  <div dangerouslySetInnerHTML={{ __html: normaliseHtml(left.text) }} />
                )}
                {left.audioSrc && <AudioPlayer src={left.audioSrc} label={left.downloadLabel} />}
                {left.youtubeId && isYouTubeId(left.youtubeId) && (
                  <YouTubeEmbed id={left.youtubeId} />
                )}
                {left.vimeoId && isVimeoId(left.vimeoId) && (
                  <VimeoEmbed id={left.vimeoId} />
                )}
                {left.imageSrc && (
                  <div className="blog-post-img-card">
                    <img src={left.imageSrc} alt={left.imageAlt || ''} className="blog-post-img" />
                    {left.imageAlt && <p className="blog-post-img-caption">{left.imageAlt}</p>}
                  </div>
                )}
                {left.node && <>{left.node}</>}
              </div>
              <div className="inner-col">
                {right.text && (
                  <div dangerouslySetInnerHTML={{ __html: normaliseHtml(right.text) }} />
                )}
                {right.youtubeId && isYouTubeId(right.youtubeId) && (
                  <YouTubeEmbed id={right.youtubeId} />
                )}
                {right.vimeoId && isVimeoId(right.vimeoId) && (
                  <VimeoEmbed id={right.vimeoId} />
                )}
                {right.imageSrc && (
                  <div className="blog-post-img-card">
                    <img src={right.imageSrc} alt={right.imageAlt || ''} className="blog-post-img" />
                    {right.imageAlt && <p className="blog-post-img-caption">{right.imageAlt}</p>}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {pageTitle && pageSlug && (
          <BlogEnquiryForm
            pageTitle={pageTitle}
            pageUrl={`https://www.voiceoverguy.co.uk/${pageSlug}`}
            intro={formIntro}
          />
        )}
      </div>
    </div>
  );
}
