import { SITE } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-row">
          <div>{SITE.copyright}</div>
          <div className="mid">
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </div>
          <div className="end">
            Built with Next.js ·{' '}
            <a href={SITE.repo} target="_blank" rel="noopener noreferrer">
              view source ↗
            </a>
          </div>
        </div>
        <div className="footer-meta">Last updated: {SITE.lastUpdated}</div>
      </div>
    </footer>
  );
}
