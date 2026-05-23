import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { writing } from '@/.velite';
import { useMDXComponent } from '@/lib/mdx';
import { ContactStrip } from '@/components/ui/ContactStrip';
import { SITE } from '@/lib/constants';

interface Params {
  slug: string;
}

const TAG_LABELS: Record<string, string> = {
  essay: 'Essay',
  build: 'Build log',
  note: 'Note',
};

export function generateStaticParams() {
  return writing
    .filter((p) => !p.draft && p.status === 'Live')
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = writing.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} - ${SITE.name}`,
    description: post.dek,
    openGraph: {
      title: post.title,
      description: post.dek,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function WritingPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = writing.find((p) => p.slug === slug && !p.draft);
  if (!post) notFound();

  const MDXContent = useMDXComponent(post.body);

  // "2026-05-19" → "May 19, 2026" in UTC so the date never shifts by timezone
  const displayDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(post.date));

  return (
    <>
      {/* ── Post hero ─────────────────────────────────────────────────────── */}
      <header className="post-hero">
        <div className="container-narrow">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="/">jv</a>
            <span className="sep" aria-hidden="true">/</span>
            <a href="/writing">writing</a>
            <span className="sep" aria-hidden="true">/</span>
            <span className="here">{post.slug}</span>
          </nav>

          <div className="post-hero-meta">
            {post.tags.map((t) => (
              <span key={t} className={`tag ${t}`}>
                {TAG_LABELS[t] ?? t}
              </span>
            ))}
            {post.readTime && <span>{post.readTime}</span>}
            <time dateTime={post.date}>{displayDate}</time>
          </div>

          <h1 className="post-h1">{post.title}</h1>
          <p className="post-dek-hero">{post.dek}</p>
        </div>
      </header>

      {/* ── Post body ─────────────────────────────────────────────────────── */}
      <main className="post-main">
        <div className="container-narrow">
          <div className="prose">
            <MDXContent />
          </div>
        </div>
      </main>

      <ContactStrip
        headline="Want to write back?"
        subline="Topic suggestions, push-back, or just a thread to pull - I read everything."
      />
    </>
  );
}
