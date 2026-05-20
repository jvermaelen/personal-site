import Link from 'next/link';
import { BadUrl } from '@/components/not-found/BadUrl';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { SITE } from '@/lib/constants';

/**
 * 404 — `app/not-found.tsx` lives outside the (site) route group so it uses
 * only the root layout (html + fonts + theme cookie). Chrome here is minimal:
 * brand + theme toggle in the header, single-line footer. By design.
 */
export default function NotFound() {
  return (
    <>
      <header className="nav">
        <div className="container nav-row">
          <Link href="/" className="brand" aria-label="Home" title="Home">
            <span>jv</span>
            <span className="dot" aria-hidden="true" />
            <span className="brand-label">/ home</span>
          </Link>
          <div className="nav-tools">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="not-found-main">
        <div className="container">
          <div className="not-found-stack">
            <div className="not-found-eyebrow">/ status — page not found</div>

            <h1 className="not-found-title">
              404<span className="small"> — query returned 0 rows.</span>
            </h1>

            <p className="not-found-lead">
              The page you were looking for doesn&apos;t exist — at least not at this URL. Likely{' '}
              <strong>a stale link</strong>, a case study still drafting, or a path I haven&apos;t
              built yet. The recovery options below all work.
            </p>

            <div className="sql-card" aria-hidden="true">
              <div className="sql-head">
                <span>postgres @ {SITE.domain}</span>
                <span className="dots">
                  <span />
                  <span />
                  <span />
                </span>
              </div>
              <div className="sql-body">
                <span className="sql-comment">-- looking up the page you requested…</span>
                {'\n'}
                <span className="sql-kw">SELECT</span> page, status{'\n'}
                <span className="sql-kw">FROM</span> site.pages{'\n'}
                <span className="sql-kw">WHERE</span> url ={' '}
                <span className="sql-str">
                  &apos;
                  <BadUrl />
                  &apos;
                </span>
                ;
                <div className="sql-result">
                  <span className="zero">0 rows</span> returned · query executed in 4ms
                </div>
              </div>
            </div>

            <div className="suggestions">
              <Link className="suggestion" href="/">
                <span className="stamp">/ home</span>
                <span className="what">
                  Start at the top
                  <span className="arrow">→</span>
                </span>
                <span className="why">The KPI strip, the highlights, the pitch in 30 seconds.</span>
              </Link>
              <Link className="suggestion" href="/work">
                <span className="stamp">/ work</span>
                <span className="what">
                  Case studies
                  <span className="arrow">→</span>
                </span>
                <span className="why">
                  Outcome-first writeups — and the empty state for the ones still in the writing
                  pile.
                </span>
              </Link>
              <Link className="suggestion" href="/writing">
                <span className="stamp">/ writing</span>
                <span className="what">
                  Essays &amp; build logs
                  <span className="arrow">→</span>
                </span>
                <span className="why">
                  Long-form thinking and notes from things I&apos;ve shipped.
                </span>
              </Link>
              <Link className="suggestion" href="/about">
                <span className="stamp">/ about</span>
                <span className="what">
                  The long version
                  <span className="arrow">→</span>
                </span>
                <span className="why">
                  Career arc, how I work, what I&apos;m building toward next.
                </span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="not-found-footer">
        <div className="container">
          Lost? Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> — I&apos;ll help find what
          you were looking for.
        </div>
      </footer>
    </>
  );
}
