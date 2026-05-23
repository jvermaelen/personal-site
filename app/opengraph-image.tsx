import { ImageResponse } from 'next/og';

/**
 * Default Open Graph image for the entire site.
 *
 * Next.js convention: `opengraph-image.tsx` at app root is auto-wired into
 * page metadata. The output URL is `${metadataBase}/opengraph-image.<ext>?<id>`.
 * Per-route overrides go in route folders (none yet).
 *
 * Runtime: Edge. Cached by Vercel at the CDN - first request renders, all
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
export const alt = 'Jason Vermaelen - Senior BI Analyst at Indeed';

const BG = '#fafaf7';
const INK = '#111111';
const MUTED = '#595959';
const LINE = '#d5d2c9';
const COBALT = '#1a3aa6'; // approximation of oklch(44% 0.18 250)

const KPIS = [
  { value: '2M+', label: 'connections driven' },
  { value: '10K+', label: 'new clients · 3 mo' },
  { value: '100s', label: 'daily dashboard users' },
  { value: '2K', label: 'hrs/yr returned' },
];

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
        <span style={{ fontSize: 22, color: MUTED, letterSpacing: 1 }}>jasonvermaelen.com</span>
      </div>

      {/* Middle - role + big name */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
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
            fontSize: 116,
            fontWeight: 600,
            letterSpacing: '-4px',
            lineHeight: 1,
            color: INK,
            display: 'flex',
          }}
        >
          Jason Vermaelen<span style={{ color: COBALT }}>.</span>
        </div>
      </div>

      {/* Bottom - KPI strip */}
      <div
        style={{
          display: 'flex',
          borderTop: `1px solid ${LINE}`,
          paddingTop: 24,
          gap: 32,
        }}
      >
        {KPIS.map((k) => (
          <div
            key={k.value}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              flex: 1,
            }}
          >
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: 48,
                fontWeight: 500,
                color: COBALT,
                letterSpacing: '-2px',
                lineHeight: 1,
              }}
            >
              {k.value}
            </span>
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: 13,
                color: MUTED,
                letterSpacing: 1.2,
                textTransform: 'uppercase',
              }}
            >
              {k.label}
            </span>
          </div>
        ))}
      </div>
    </div>,
    size,
  );
}
