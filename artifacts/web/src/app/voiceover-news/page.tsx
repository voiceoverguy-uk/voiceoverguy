import type { Metadata } from 'next';
import Link from 'next/link';
import blogPosts from '@/data/blog-posts';
import { sortByRating } from '@/lib/blogRating';

export const metadata: Metadata = {
  title: 'Voiceover News & Blog | VoiceoverGuy - Guy Harris',
  description:
    'The latest voiceover news, stories, and samples from British male voiceover artist Guy Harris. TV ads, game trailers, character voices, and more.',
  alternates: {
    canonical: 'https://www.voiceoverguy.co.uk/voiceover-news',
  },
};

function PostCard({ post }: { post: (typeof blogPosts)[0] }) {
  const excerpt = post.homeText || post.info || '';

  return (
    <Link href={`/${post.url}`} className="blog-card">
      <div className="blog-card-img-wrap">
        {post.image ? (
          <img
            src={`/assets/img/blog/${post.image}`}
            alt={post.alt || post.pageTitle}
            className="blog-card-img"
            loading="lazy"
          />
        ) : (
          <div className="blog-card-no-img" />
        )}
      </div>
      <div className="blog-card-body">
        <h2 className="blog-card-title">{post.pageTitle}</h2>
        {excerpt && (
          <p
            className="blog-card-excerpt"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
        )}
      </div>
    </Link>
  );
}

export default function VoiceoverNewsPage() {
  const publishedPosts = sortByRating(
    blogPosts.filter(p => !p.conflictsWithCorePage && p.blogRating !== 'not-a-blog')
  );

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Voiceover News &amp; Blog</h1>
          <p>
            The latest projects, news, and voiceover samples from British male voiceover
            artist Guy Harris
          </p>
        </div>
      </div>

      <section className="blog-index-section">
        <div className="container">
          <div className="blog-grid">
            {publishedPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
