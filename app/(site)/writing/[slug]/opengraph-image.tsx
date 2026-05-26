import { ImageResponse } from 'next/og';
import { writing } from '@/.velite';

export const runtime = 'edge';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };
export const alt = 'Writing post - Jason Vermaelen';

const BG = '#fafaf7';
const INK = '#111111';
const MUTED = '#595959';
const LINE = '#d5d2c9';
const COBALT = '#1a3aa6';

const TAG_LABELS: Record<string, string> = {
  essay: 'Essay',
  build: 'Build log',
  note: 'Note',
};

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = writing.find((p) => p.slug === slug && !p.draft);

  // Fallback to a generic card if the post doesn't exist or is draft
  if (!post) {
    return new ImageResponse(
      <div
        style={{
          width: '100%',
          height: '100%',
          background: BG,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: 48,
          color: INK,
        }}
      >
        Jason Vermaelen - Writing
      </div>,
      size,
    );
  }

  const tagLabel = TAG_LABELS[post.tags[0]] ?? post.tags[0];
  const displayDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(post.date));

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        background: BG,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '56px 72px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Top - wordmark */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          fontFamily: 'monospace',
        }}
      >
        <span style={{ fontSize: 32, fontWeight: 600, color: INK }}>jv</span>
        <span style={{ fontSize: 28, color: COBALT }}>•</span>
        <span style={{ fontSize: 22, color: MUTED, letterSpacing: 1 }}>
          jasonvermaelen.com / writing
        </span>
      </div>

      {/* Middle - tag chip + title + dek */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div
          style={{
            fontFamily: 'monospace',
            fontSize: 18,
            color: COBALT,
            letterSpacing: 2,
            textTransform: 'uppercase',
            display: 'flex',
          }}
        >
          {tagLabel}
        </div>
        <div
          style={{
            fontSize: post.title.length > 60 ? 56 : 72,
            fontWeight: 600,
            letterSpacing: '-2px',
            lineHeight: 1.05,
            color: INK,
            display: 'flex',
            maxWidth: 1056,
          }}
        >
          {post.title}
        </div>
        <div
          style={{
            fontSize: 24,
            color: MUTED,
            lineHeight: 1.4,
            display: 'flex',
            maxWidth: 1056,
          }}
        >
          {post.dek.length > 140 ? `${post.dek.slice(0, 137)}...` : post.dek}
        </div>
      </div>

      {/* Bottom - date + author */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: `1px solid ${LINE}`,
          paddingTop: 24,
          fontFamily: 'monospace',
          fontSize: 18,
          color: MUTED,
          letterSpacing: 1,
        }}
      >
        <div style={{ display: 'flex' }}>{displayDate}</div>
        <div style={{ display: 'flex' }}>Jason Vermaelen</div>
      </div>
    </div>,
    size,
  );
}
