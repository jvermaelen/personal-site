export type Post = {
  slug: string;
  date: string;
  year: string;
  title: string;
  dek: string;
  tag: 'essay' | 'build' | 'note';
  tagLabel: string;
  readTime: string;
  status: 'live' | 'drafting' | 'planned';
};

const STATUS_LABEL: Record<Post['status'], string> = {
  live: 'Live',
  drafting: 'Drafting',
  planned: 'Planned',
};

export function PostRow({ post }: { post: Post }) {
  const isComingSoon = post.status !== 'live';

  const inner = (
    <>
      <div className="post-date">
        {post.date}
        <span className="year">{post.year}</span>
      </div>
      <div className="post-body">
        <h2 className="post-title">{post.title}</h2>
        <p className="post-dek">{post.dek}</p>
        <div className="post-meta">
          <span className={`tag ${post.tag}`}>{post.tagLabel}</span>
          <span>{post.readTime}</span>
          <span className={`status-pill ${isComingSoon ? 'drafting' : ''}`}>
            {STATUS_LABEL[post.status]}
          </span>
        </div>
      </div>
      <span className="post-arrow" aria-hidden="true">
        →
      </span>
    </>
  );

  // Live posts link to the detail page; coming-soon posts are non-interactive.
  if (!isComingSoon) {
    return (
      <a className="post" href={`/writing/${post.slug}`}>
        {inner}
      </a>
    );
  }

  return (
    <article className="post coming-soon" aria-label={post.title}>
      {inner}
    </article>
  );
}
