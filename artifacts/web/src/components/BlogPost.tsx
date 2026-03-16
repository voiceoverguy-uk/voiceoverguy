import Link from 'next/link';
import type { BlogPost as BlogPostType } from '@/data/blog-posts';

interface Props {
  post: BlogPostType;
}

function normaliseHtml(html: string): string {
  if (!html) return '';
  return html
    .replace(/https?:\/\/www\.voiceoverguy\.co\.uk\/assets\//g, '/assets/')
    .replace(/https?:\/\/voiceoverguy\.co\.uk\/assets\//g, '/assets/')
    .replace(/<a href="([^"\/][^"]*)"([^>]*)>/g, '<a href="/$1"$2>');
}

function MediaBlock({ post }: { post: BlogPostType }) {
  const wv = (post.whatVideo || '').trim();
  const video = (post.video || '').trim();

  if (wv === '1' && video && !video.startsWith('<iframe')) {
    const ytId = video.replace(/\/.*$/, '').trim();
    return (
      <div className="embed-wrap">
        <iframe
          src={`https://www.youtube.com/embed/${ytId}`}
          title={post.pageTitle}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (wv === '2' && video) {
    return (
      <div className="embed-wrap">
        <iframe
          src={`https://player.vimeo.com/video/${video.trim()}`}
          title={post.pageTitle}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (wv === '3' || video.startsWith('<iframe')) {
    const raw = video.startsWith('<iframe') ? video : `<iframe${video.split('<iframe')[1]}`;
    return (
      <div
        className="sc-embed"
        dangerouslySetInnerHTML={{ __html: raw }}
      />
    );
  }

  if (post.image) {
    return (
      <img
        src={`/assets/img/blog/${post.image}`}
        alt={post.alt || post.pageTitle}
        className="blog-post-img"
      />
    );
  }

  return null;
}

function NImage({ filename, alt }: { filename: string; alt?: string }) {
  if (!filename) return null;
  const src = filename.startsWith('http') ? filename : `/assets/img/blog/${filename}`;
  return (
    <img
      src={src}
      alt={alt || ''}
      className="blog-post-img"
    />
  );
}

export default function BlogPost({ post }: Props) {
  const hasMedia = !!(
    post.video ||
    (post.whatVideo && post.whatVideo !== '0') ||
    post.image
  );

  const hasSections =
    post.ntext1 || post.nimage1 ||
    post.ntext2 || post.nimage2 ||
    post.ntext3 || post.nimage3 ||
    post.ntext4 || post.nimage4;

  const ntextSections = [
    { text: post.ntext1, image: post.nimage1 },
    { text: post.ntext2, image: post.nimage2 },
    { text: post.ntext3, image: post.nimage3 },
    { text: post.ntext4, image: post.nimage4 },
  ].filter(s => s.text || s.image);

  const displayDate = post.date
    ? new Date(post.date + 'T00:00:00').toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
      })
    : post.rawDate || null;

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>{post.pageTitle}</h1>
          {post.info && (
            <div
              className="page-header-sub"
              dangerouslySetInnerHTML={{ __html: normaliseHtml(post.info) }}
            />
          )}
        </div>
      </div>

      <section className="blog-post-body">
        <div className="container">

          {displayDate && (
            <div className="blog-post-date">{displayDate}</div>
          )}

          <div className={`blog-post-main ${hasMedia ? 'two-col' : 'one-col'}`}>
            {post.text1 && (
              <div
                className="blog-text-col"
                dangerouslySetInnerHTML={{ __html: normaliseHtml(post.text1) }}
              />
            )}
            {hasMedia && (
              <div className="blog-media-col">
                <MediaBlock post={post} />
              </div>
            )}
          </div>

          {post.text2 && (
            <div className="blog-post-section">
              <div
                dangerouslySetInnerHTML={{ __html: normaliseHtml(post.text2) }}
              />
            </div>
          )}

          {ntextSections.map((sec, i) => {
            const reverse = i % 2 === 0;
            const textEl = sec.text ? (
              <div
                className="blog-text-col"
                dangerouslySetInnerHTML={{ __html: normaliseHtml(sec.text) }}
              />
            ) : null;
            const imgEl = sec.image ? (
              <div className="blog-media-col">
                <NImage filename={sec.image} alt={post.alt} />
              </div>
            ) : null;
            return (
              <div key={i} className="blog-post-section two-col">
                {reverse ? <>{textEl}{imgEl}</> : <>{imgEl}{textEl}</>}
              </div>
            );
          })}

          {post.bottomText && (
            <div
              className="blog-bottom-text"
              dangerouslySetInnerHTML={{ __html: normaliseHtml(post.bottomText) }}
            />
          )}

          <div className="blog-post-cta">
            <Link href="/contact-guy" className="cta-btn">
              Book Guy for a Similar Voiceover
            </Link>
            <Link href="/voiceover-news" className="cta-btn cta-btn--outline">
              ← Back to News &amp; Blog
            </Link>
          </div>

        </div>
      </section>

      <aside className="blog-sidebar-strip">
        <div className="container">
          <div className="blog-sidebar-inner">
            <div className="sidebar-box">
              <h3>Book Guy Harris</h3>
              <p>Need a British male voiceover for your next project? Get in touch directly.</p>
              <Link href="/contact-guy" className="cta-btn" style={{ display: 'block', textAlign: 'center' }}>
                Contact Guy
              </Link>
              <p className="sidebar-phone">
                <a href="tel:+447973350178">+44 (0)7973 350 178</a>
              </p>
            </div>
            <div className="sidebar-box">
              <h3>Voice Services</h3>
              <ul>
                <li><Link href="/commercial-voiceover">Commercial Voiceover</Link></li>
                <li><Link href="/voice-of-god">Voice of God</Link></li>
                <li><Link href="/santa-voice">Santa Voice</Link></li>
                <li><Link href="/david-attenborough-voice">Attenborough Style</Link></li>
                <li><Link href="/character-voiceover">Character Voiceovers</Link></li>
                <li><Link href="/game-trailer-voice">Game Trailer Voice</Link></li>
                <li><Link href="/narration-voice">Narration</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
