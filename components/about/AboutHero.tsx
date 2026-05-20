export function AboutHero() {
  return (
    <section className="about-hero">
      <div className="container">
        <div className="eyebrow">
          <span className="accent-dot">§</span> About · the long version
        </div>
        <h1 className="page-title">
          Data partner who actually <em>ships product decisions.</em>
        </h1>
        <p className="lead">
          I&apos;m a senior BI analyst at Indeed with a four-year stretch that&apos;s split between
          dashboarding and product strategy. I&apos;ve sat on the data side of the table and on the
          GTM side of the table, which is where most of my best work has come from — when the person
          modeling the funnel is the same person deciding what to build next.
        </p>
        <p className="lead">
          This page is the long version. There&apos;s a{' '}
          <a href="#resume" style={{ color: 'var(--accent)' }}>
            PDF resume
          </a>{' '}
          if you&apos;d rather skim.
        </p>
      </div>
    </section>
  );
}
