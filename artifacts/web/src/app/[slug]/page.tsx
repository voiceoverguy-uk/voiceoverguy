import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProject, getAllSlugs } from '@/data/projects';
import blogPosts, { getBlogPost, getAllBlogSlugs } from '@/data/blog-posts';
import BlogPost from '@/components/BlogPost';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const projectSlugs = getAllSlugs().map(slug => ({ slug }));
  const blogSlugs = getAllBlogSlugs().map(slug => ({ slug }));
  return [...projectSlugs, ...blogSlugs];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject(params.slug);
  if (project) {
    return {
      title: project.metaTitle
        ? `${project.metaTitle} | VoiceoverGuy`
        : project.title,
      description: project.metaDescription,
      alternates: {
        canonical: `https://www.voiceoverguy.co.uk/${params.slug}`,
      },
    };
  }

  const post = getBlogPost(params.slug);
  if (post && !post.conflictsWithCorePage) {
    return {
      title: post.metaTitle
        ? `${post.metaTitle} | VoiceoverGuy`
        : `${post.pageTitle} | VoiceoverGuy`,
      description: post.pageDesc || post.info || '',
      alternates: {
        canonical: `https://www.voiceoverguy.co.uk/${params.slug}`,
      },
    };
  }

  return { title: 'Page Not Found | VoiceoverGuy' };
}

export default function SlugPage({ params }: Props) {
  const project = getProject(params.slug);

  if (project) {
    return (
      <>
        <div className="page-header">
          <div className="container">
            <h1>{project.h1}</h1>
            {project.h2 && <p>{project.h2}</p>}
          </div>
        </div>

        <section className="page-content">
          <div className="container">
            <div className="two-col">
              <div>
                {project.youtubeId && (
                  <div className="embed-container" style={{ marginBottom: '24px' }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${project.youtubeId}`}
                      title={project.h1}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}

                {project.audioUrl && (
                  <div className="sc-embed">
                    <iframe
                      width="100%"
                      height="166"
                      scrolling="no"
                      frameBorder="no"
                      allow="autoplay"
                      src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(project.audioUrl)}&color=%239C060B&auto_play=false`}
                      title={project.h1}
                    />
                  </div>
                )}

                {project.imageUrl && (
                  <img
                    src={project.imageUrl}
                    alt={project.imageAlt || project.h1}
                    style={{ maxWidth: '100%', marginBottom: '24px', borderRadius: '4px' }}
                  />
                )}

                {project.intro && (
                  <p style={{ fontSize: '15px', lineHeight: '1.8' }}>{project.intro}</p>
                )}

                <div style={{ marginTop: '32px' }}>
                  <Link href="/contact-guy" className="cta-btn">
                    Book Guy for a Similar Voiceover
                  </Link>
                </div>
              </div>

              <div>
                {project.relatedLinks && project.relatedLinks.length > 0 && (
                  <div className="sidebar-box">
                    <h3>Related Voiceover Services</h3>
                    <ul>
                      {project.relatedLinks.map(link => (
                        <li key={link.href}>
                          <Link href={link.href}>{link.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="sidebar-box">
                  <h3>Book Guy</h3>
                  <p style={{ fontSize: '13px' }}>
                    Need a similar voiceover for your project? Get in touch with Guy directly.
                  </p>
                  <Link href="/contact-guy" className="cta-btn" style={{ display: 'block', textAlign: 'center' }}>
                    Contact Guy
                  </Link>
                </div>

                <div className="sidebar-box">
                  <h3>More Work</h3>
                  <ul>
                    <li><Link href="/commercial-voiceover">Commercial Voiceover</Link></li>
                    <li><Link href="/voice-of-god">Voice of God</Link></li>
                    <li><Link href="/santa-voice">Voice of Santa</Link></li>
                    <li><Link href="/david-attenborough-voice">Attenborough Style</Link></li>
                    <li><Link href="/character-voiceover">Character Voiceovers</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  const post = getBlogPost(params.slug);
  if (post && !post.conflictsWithCorePage) {
    return <BlogPost post={post} />;
  }

  notFound();
}
