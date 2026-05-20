import nowData from '@/data/now.json';

export function NowHero() {
  return (
    <section className="now-hero">
      <div className="container">
        <div className="eyebrow">
          <span>
            <span className="accent-dot">§</span> Now · what I&apos;m up to
          </span>
          <span className="updated">
            <time dateTime={nowData.updatedISO}>updated {nowData.updated}</time>
          </span>
        </div>
        <h1 className="page-title">
          What I&apos;m doing <span className="accent">right now.</span>
        </h1>
        <p className="lead">
          A /now page in the{' '}
          <a href="https://nownownow.com" style={{ color: 'var(--accent)' }}>
            nownownow.com
          </a>{' '}
          tradition. Updated monthly. Honest about the current focus, not the resume version.
        </p>
      </div>
    </section>
  );
}
