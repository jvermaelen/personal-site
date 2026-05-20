import { ImageResponse } from 'next/og';

/**
 * Default Open Graph image for the entire site.
 *
 * Next.js convention: `opengraph-image.tsx` at app root is auto-wired into
 * page metadata. The output URL is `${metadataBase}/opengraph-image.<ext>?<id>`.
 * Per-route overrides go in route folders (none yet).
 *
 * Runtime: Edge. Cached by Vercel at the CDN — first request renders, all
 * subsequent shares pull the cached PNG.
 *
 * next/og constraints worth knowing:
 *   - No CSS variables (use hex)
 *   - Children of flex containers need `display: flex` set explicitly
 *   - Default sans is system-ui; for monospace use fontFamily: 'monospace'
 */

export const runtime = 'edge';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };
export const alt = 'Jason Vermaelen — Senior BI Analyst at Indeed';

const BG = '#fafaf7';
const INK = '#111111';
const INK_SOFT = '#2e2e2e';
const MUTED = '#595959';
const COBALT = '#1a3aa6'; // approximation of oklch(44% 0.18 250)

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        background: BG,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '64px 80px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Top — wordmark */}
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
        <span style={{ fontSize: 22, color: MUTED, letterSpacing: 1 }}>jasonvermaelen.com</span>
      </div>

      {/* Middle/bottom — main */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div
          style={{
            fontFamily: 'monospace',
            fontSize: 22,
            color: MUTED,
            letterSpacing: 1,
            display: 'flex',
          }}
        >
          Senior BI Analyst · Indeed · Austin, TX
        </div>
        <div
          style={{
            fontSize: 112,
            fontWeight: 600,
            letterSpacing: '-4px',
            lineHeight: 1,
            color: INK,
            display: 'flex',
          }}
        >
          Jason Vermaelen<span style={{ color: COBALT }}>.</span>
        </div>
        <div
          style={{
            fontSize: 28,
            lineHeight: 1.4,
            color: INK_SOFT,
            maxWidth: 980,
            display: 'flex',
          }}
        >
          The data partner Product, Sales, and Marketing actually want in the room.
        </div>
      </div>
    </div>,
    size,
  );
}
