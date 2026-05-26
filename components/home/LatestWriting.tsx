import Link from 'next/link';
import writingData from '@/data/writing.json';
import { PostRow, type Post } from '@/components/writing/PostRow';

export function LatestWriting() {
  const posts = (writingData as Post[])
    .filter((p) => p.status === 'live')
    .slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section className="section home-section">
      <div className="container">
        <div className="section-head">
          <h2>§ Latest writing</h2>
          <span className="rule" />
          <Link href="/writing" className="section-cta">
            read all →
          </Link>
        </div>
        <div className="posts home-posts">
          {posts.map((p) => (
            <PostRow key={p.slug} post={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
