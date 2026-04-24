import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPost, getAllBlogSlugs, type BlogPost as BlogPostType } from '@/data/blog-posts';
import { getCleanSlug } from '@/lib/slug';
import BlogPost from '@/components/BlogPost';

interface Props {
  params: { slug: string };
}

const SITE_URL = 'https://www.voiceoverguy.co.uk';
const FALLBACK_OG_IMAGE = `${SITE_URL}/assets/images/og-image-guy-harris.webp`;

export async function generateStaticParams() {
  return getAllBlogSlugs().map(slug => ({ slug }));
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function isValidYouTubeId(id: string): boolean {
  return /^[A-Za-z0-9_-]{6,}$/.test(id);
}

function getOgImage(post: BlogPostType): string {
  if (post.image && post.image.trim()) {
    return `${SITE_URL}/assets/img/blog/${post.image.trim()}`;
  }
  const wv = (post.whatVideo || '').trim();
  const video = (post.video || '').trim();
  if (wv === '1' && video && !video.startsWith('<iframe')) {
    const ytId = video.replace(/\/.*$/, '').trim();
    if (isValidYouTubeId(ytId)) {
      return `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
    }
  }
  return FALLBACK_OG_IMAGE;
}

function getOgDescription(post: BlogPostType): string {
  if (post.pageDesc && post.pageDesc.trim()) return post.pageDesc.trim();
  if (post.info && post.info.trim()) return stripHtml(post.info);
  if (post.homeText && post.homeText.trim()) return stripHtml(post.homeText);
  return '';
}

function toIso(dateStr: string | null): string | undefined {
  if (!dateStr) return undefined;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return undefined;
  return d.toISOString();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cleanSlug = getCleanSlug(params.slug);
  if (!cleanSlug) return { title: 'Page Not Found' };
  const post = getBlogPost(cleanSlug);
  if (post && !post.conflictsWithCorePage) {
    const title = post.metaTitle || post.pageTitle;
    const description = getOgDescription(post);
    const slugForUrl = getCleanSlug(post.url) ?? cleanSlug;
    const canonical = `${SITE_URL}/${slugForUrl}`;
    const ogImage = getOgImage(post);
    const imageAlt = post.alt || post.pageTitle;
    const publishedTime = toIso(post.date);

    return {
      title,
      description,
      alternates: {
        canonical,
      },
      openGraph: {
        type: 'article',
        title,
        description,
        url: canonical,
        siteName: 'VoiceoverGuy',
        locale: 'en_GB',
        images: [
          {
            url: ogImage,
            alt: imageAlt,
          },
        ],
        ...(publishedTime ? { publishedTime, modifiedTime: publishedTime } : {}),
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [ogImage],
      },
    };
  }

  return { title: 'Page Not Found' };
}

export default function SlugPage({ params }: Props) {
  const cleanSlug = getCleanSlug(params.slug);
  if (!cleanSlug) notFound();
  const post = getBlogPost(cleanSlug);
  if (post && !post.conflictsWithCorePage) {
    return <BlogPost post={post} />;
  }

  notFound();
}
