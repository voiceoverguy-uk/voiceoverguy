import Link from 'next/link';
import type { BlogPost as BlogPostType } from '@/data/blog-posts';
import blogPosts from '@/data/blog-posts';
import BlogEnquiryForm from '@/components/BlogEnquiryForm';
import MiniPlayer from '@/components/MiniPlayer';
import { buildAllBlogSchemas } from '@/lib/buildSchema';

interface Props {
  post: BlogPostType;
}

function isValidImageFilename(filename: string): boolean {
  if (!filename) return false;
  const trimmed = filename.trim();
  return trimmed.length >= 4 && trimmed.includes('.');
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

  if (wv === '2' && video && !video.startsWith('<iframe')) {
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

  if (video.startsWith('<iframe')) {
    return (
      <div
        className="sc-embed"
        dangerouslySetInnerHTML={{ __html: video }}
      />
    );
  }

  return null;
}

function NImage({ filename, alt }: { filename: string; alt?: string }) {
  if (!isValidImageFilename(filename)) return null;
  const src = filename.startsWith('http') ? filename : `/assets/img/blog/${filename}`;
  return (
    <img
      src={src}
      alt={alt || ''}
      className="blog-post-img"
    />
  );
}

function getRelatedPosts(currentId: number, count: number): BlogPostType[] {
  const publishable = blogPosts.filter(
    p => !p.conflictsWithCorePage && p.id !== currentId && isValidImageFilename(p.image)
  );
  if (publishable.length === 0) return [];

  const picks: BlogPostType[] = [];
  const total = publishable.length;
  const prime = 7919;
  for (let i = 0; i < count && i < total; i++) {
    const idx = ((currentId * prime + i * 1301) % total + total) % total;
    const candidate = publishable[idx];
    if (!picks.find(p => p.id === candidate.id)) {
      picks.push(candidate);
    } else {
      for (let j = 1; j < total; j++) {
        const altIdx = (idx + j) % total;
        const alt = publishable[altIdx];
        if (!picks.find(p => p.id === alt.id)) {
          picks.push(alt);
          break;
        }
      }
    }
  }
  return picks;
}

export default function BlogPost({ post }: Props) {
  const hasLocalAudio = !!(post.localAudio && post.localAudio.trim());
  const hasVideoEmbed = !hasLocalAudio && (() => {
    const wv = (post.whatVideo || '').trim();
    const video = (post.video || '').trim();
    if (wv === '1' && video && !video.startsWith('<iframe')) return true;
    if (wv === '2' && video) return true;
    if (video.startsWith('<iframe')) return true;
    return false;
  })();

  const hasImage = isValidImageFilename(post.image);
  const hasText2 = !!(post.text2 && post.text2.trim());

  const ntextSections = [
    { text: post.ntext1, image: post.nimage1 },
    { text: post.ntext2, image: post.nimage2 },
    { text: post.ntext3, image: post.nimage3 },
    { text: post.ntext4, image: post.nimage4 },
  ].filter(s => (s.text && s.text.trim()) || isValidImageFilename(s.image));

  const relatedPosts = getRelatedPosts(post.id, 3);

  const schemas = buildAllBlogSchemas(post);

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={`schema-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
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

          {/* Row 1: text1 + video/audio embed (or text1 only if no media) */}
          <div className={`blog-post-main ${(hasVideoEmbed || hasLocalAudio) ? 'two-col' : 'one-col'}`}>
            {post.text1 && (
              <div
                className="blog-text-col"
                dangerouslySetInnerHTML={{ __html: normaliseHtml(post.text1) }}
              />
            )}
            {hasLocalAudio && (
              <div className="blog-media-col">
                <MiniPlayer src={post.localAudio!} title={post.pageTitle} />
              </div>
            )}
            {hasVideoEmbed && (
              <div className="blog-media-col">
                <MediaBlock post={post} />
              </div>
            )}
          </div>

          {/* Row 2: image (left) + text2 (right) — image always goes here */}
          {hasImage && hasText2 ? (
            <div className="blog-post-section two-col">
              <div className="blog-media-col">
                <img
                  src={`/assets/img/blog/${post.image}`}
                  alt={post.alt || post.pageTitle}
                  className="blog-post-img"
                />
              </div>
              <div
                className="blog-text-col"
                dangerouslySetInnerHTML={{ __html: normaliseHtml(post.text2) }}
              />
            </div>
          ) : hasImage && !hasText2 ? (
            <div className="blog-post-section">
              <img
                src={`/assets/img/blog/${post.image}`}
                alt={post.alt || post.pageTitle}
                className="blog-post-img"
              />
            </div>
          ) : hasText2 ? (
            <div className="blog-post-section">
              <div
                dangerouslySetInnerHTML={{ __html: normaliseHtml(post.text2) }}
              />
            </div>
          ) : null}

          {ntextSections.map((sec, i) => {
            const reverse = i % 2 === 0;
            const hasText = sec.text && sec.text.trim();
            const hasImg = isValidImageFilename(sec.image);
            const textEl = hasText ? (
              <div
                className="blog-text-col"
                dangerouslySetInnerHTML={{ __html: normaliseHtml(sec.text) }}
              />
            ) : null;
            const imgEl = hasImg ? (
              <div className="blog-media-col">
                <NImage filename={sec.image} alt={post.alt} />
              </div>
            ) : null;

            if (!textEl && !imgEl) return null;

            const isTwoCol = textEl && imgEl;
            return (
              <div key={i} className={`blog-post-section ${isTwoCol ? 'two-col' : ''}`}>
                {isTwoCol
                  ? (reverse ? <>{textEl}{imgEl}</> : <>{imgEl}{textEl}</>)
                  : <>{textEl}{imgEl}</>
                }
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
            <Link href="/voiceover-news" className="cta-btn cta-btn--outline">
              ← Back to News &amp; Blog
            </Link>
          </div>

          <BlogEnquiryForm pageTitle={post.pageTitle} pageUrl={post.url} />

        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section className="blog-related-strip">
          <div className="container">
            <div className="blog-related-grid">
              {relatedPosts.map(rp => (
                <Link key={rp.id} href={`/${rp.url}`} className="blog-related-card">
                  {isValidImageFilename(rp.image) && (
                    <div className="blog-related-img-wrap">
                      <img
                        src={`/assets/img/blog/${rp.image}`}
                        alt={rp.alt || rp.pageTitle}
                        className="blog-related-img"
                      />
                    </div>
                  )}
                  <div className="blog-related-title">{rp.pageTitle}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
