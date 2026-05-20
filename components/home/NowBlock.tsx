import Link from 'next/link';

/**
 * Now block — Homepage excerpt of /now. Content is hardcoded here for v1.
 * When /now ships (Day 7+), extract the paragraph + side items into
 * content/now.mdx and read from there.
 */

const SIDE_ITEMS = [
  { k: 'Role', v: 'Sr. BI Analyst' },
  { k: 'Location', v: 'Austin, TX' },
  { k: 'Stack', v: 'SQL · Snowflake · Python · SFDC · Metabase' },
  { k: 'Training', v: 'BJJ · black belt since 2020' },
  { k: 'Listening', v: 'music discovery is a hobby — Spotify feed live on /now' },
] as const;

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
              <strong>Senior BI Analyst at Indeed</strong>, working on Salesforce CRM Analytics.
              Pursuing an <strong>MS in Data Analytics</strong> at WGU. Training jiu-jitsu at{' '}
              <strong>Paragon BJJ</strong> in Austin. Reading more, shipping more, looking for
              what&apos;s next.
            </p>
            <Link href="/now" className="read-more">
              read the full Now page <span>→</span>
            </Link>
          </div>
          <div className="now-side">
            <div className="stack">
              {SIDE_ITEMS.map((item) => (
                <div key={item.k} className="item">
                  <span className="k">{item.k}</span>
                  <span className="v">{item.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
