import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import blogPosts, { getBlogPost, getAllBlogSlugs } from '@/data/blog-posts';
import BlogPost from '@/components/BlogPost';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  if (post && !post.conflictsWithCorePage) {
    return {
      title: post.metaTitle || post.pageTitle,
      description: post.pageDesc || post.info || '',
      alternates: {
        canonical: `https://www.voiceoverguy.co.uk/${params.slug}`,
      },
    };
  }

  return { title: 'Page Not Found' };
}

export default function SlugPage({ params }: Props) {
  const post = getBlogPost(params.slug);
  if (post && !post.conflictsWithCorePage) {
    return <BlogPost post={post} />;
  }

  notFound();
}
