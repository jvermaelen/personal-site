import Link from 'next/link';
import { ReadingCard } from '@/components/now/ReadingCard';
import { SpotifyRecent } from '@/components/now/SpotifyRecent';

/**
 * Now block - Homepage teaser for /now.
 *
 * Right column hosts two live cards (compact music card + currently-reading)
 * so the homepage gets visual texture + a liveness signal ("synced Xm ago")
 * without duplicating the full /now sidebar. The "read the full Now page →"
 * link is still the primary CTA to send recruiters deeper.
 *
 * Stack details (SQL / Snowflake / etc.) are woven into the paragraph so the
 * right column can be all-visual.
 */
export function NowBlock() {
  return (
    <section className="section" id="now" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section-head">
          <h2>§ Currently</h2>
          <span className="rule" />
          <span className="meta">updated may 2026</span>
        </div>

        <div className="now-block">
          <div>
            <div className="label-row">
              <span>What I&apos;m doing</span>
              <span>/now</span>
            </div>
            <p>
              <strong>Senior BI Analyst at Indeed</strong>, on Salesforce CRM Analytics. Day-to-day
              in <strong>SQL · Snowflake · Python · SFDC · Metabase</strong>. Pursuing an{' '}
              <strong>MS in Data Analytics</strong> at WGU. Training jiu-jitsu at{' '}
              <strong>Paragon BJJ</strong>. Reading more, shipping more, looking for what&apos;s
              next.
            </p>
            <Link href="/now" className="read-more">
              read the full Now page <span>→</span>
            </Link>
          </div>
          <div className="now-block-side">
            <SpotifyRecent limit={2} />
            <ReadingCard />
          </div>
        </div>
      </div>
    </section>
  );
}
