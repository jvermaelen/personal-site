import Link from 'next/link';
import { NAV_LINKS, SITE } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <nav className="footer-nav" aria-label="Footer">
          <Link href="/">home</Link>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
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
