import { SITE } from '@/lib/constants';

type ContactStripProps = {
  /** Required. ReactNode so callers can include <em>...</em> for accent emphasis. */
  headline: React.ReactNode;
  /** Optional sub-paragraph below the headline. */
  subline?: React.ReactNode;
  /**
   * "hero" = full beefy version (Homepage): eyebrow, big headline, sub,
   * response-strip, best-topics chips, 5 contact items including Resume.
   * "compact" = simpler (About/Now/Work/Writing/Case Study): smaller headline,
   * 4 contact items, no chips or response strip. Default: "compact".
   */
  variant?: 'hero' | 'compact';
  /** Chips shown only in hero variant. */
  topics?: string[];
  /** Response-time line; defaults to "within 24 hours on weekdays." */
  responseTime?: string;
};

export function ContactStrip({
  headline,
  subline,
  variant = 'compact',
  topics,
  responseTime = "within 24 hours on weekdays · longer if I'm on the mats.",
}: ContactStripProps) {
  const isHero = variant === 'hero';

  return (
    <section className={`contact-strip${isHero ? '' : ' compact'}`} id="contact">
      <div className="container contact-grid">
        <div>
          {isHero && (
            <div className="contact-eyebrow">
              <span className="accent-dot">§</span> Contact
            </div>
          )}
          <h2>{headline}</h2>
          {subline && <p className="sub">{subline}</p>}

          {isHero && (
            <div className="response-strip" role="status">
              <span className="pulse" aria-hidden="true" />
              <span className="text">
                <strong>Response time:</strong> {responseTime}
              </span>
            </div>
          )}

          {isHero && topics && topics.length > 0 && (
            <div className="best-topics">
              <span className="label">/ what I'm best at hearing about</span>
              <div className="list">
                {topics.map((topic) => (
                  <span key={topic} className="topic">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="contact-list">
          <div className="header">/ ways to reach me</div>

          <a
            href={SITE.cal}
            className="contact-item primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="k">Schedule</span>
            <span className="v">
              <span>{SITE.calDisplay}</span>
              {isHero && <span className="label-sub">fastest - grab a 30-min slot</span>}
            </span>
            <span className="a">→</span>
          </a>

          <a href={`mailto:${SITE.email}`} className="contact-item">
            <span className="k">Email</span>
            <span className="v">
              <span>{SITE.email}</span>
              {isHero && <span className="label-sub">preferred for anything with detail</span>}
            </span>
            <span className="a">→</span>
          </a>

          <a
            href={SITE.linkedin}
            className="contact-item"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="k">LinkedIn</span>
            <span className="v">
              <span>{SITE.linkedinDisplay}</span>
              {isHero && <span className="label-sub">DMs open - connection requests too</span>}
            </span>
            <span className="a">→</span>
          </a>

          <a href={SITE.github} className="contact-item" target="_blank" rel="noopener noreferrer">
            <span className="k">GitHub</span>
            <span className="v">
              <span>{SITE.githubDisplay}</span>
              {isHero && <span className="label-sub">source for this site · side projects</span>}
            </span>
            <span className="a">→</span>
          </a>

          {isHero && (
            <a href={SITE.resumePath} className="contact-item" download>
              <span className="k">Resume</span>
              <span className="v">
                <span>{SITE.resumeFilename}</span>
                <span className="label-sub">{SITE.resumeMeta}</span>
              </span>
              <span className="a">↓</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
