import { Fragment } from 'react';
import highlightsData from '@/data/highlights.json';

type HighlightNum = string | { value: string; small: string };

type Highlight = {
  num: HighlightNum;
  body: string;
  role: string;
  company: string;
  years: string;
  /**
   * TODO Day 6+: when `/work` ships, add hrefs to the first 2 entries so they
   * link to the corresponding case studies. v1 ships with no case-study pages,
   * so every row is an <article> with no nav target — avoids broken links.
   */
  href?: string;
};

/**
 * Render markdown-style **bold** inside a string as <strong>. No HTML parsing,
 * no XSS surface — content lives in our own JSON.
 */
function renderInlineBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      // biome-ignore lint/suspicious/noArrayIndexKey: regex.split() of a static string — parts have no natural id and order is stable
      return <strong key={`b-${i}`}>{part.slice(2, -2)}</strong>;
    }
    // biome-ignore lint/suspicious/noArrayIndexKey: regex.split() of a static string — parts have no natural id and order is stable
    return <Fragment key={`t-${i}`}>{part}</Fragment>;
  });
}

function renderNum(num: HighlightNum) {
  if (typeof num === 'string') return num;
  return (
    <>
      <span className="a">{num.value}</span>
      <span className="small">{num.small}</span>
    </>
  );
}

function numToKey(num: HighlightNum): string {
  return typeof num === 'string' ? num : `${num.value}${num.small}`;
}

export function Highlights() {
  const highlights = highlightsData as Highlight[];

  return (
    <section className="section" id="work">
      <div className="container">
        <div className="section-head">
          <h2>§ Highlights</h2>
          <span className="rule" />
          <span className="meta">seven outcomes · most recent first</span>
        </div>

        <div className="highlights">
          {highlights.map((h) => (
            <article key={numToKey(h.num)} className="hl">
              <div className="hl-num">{renderNum(h.num)}</div>
              <div className="hl-body">{renderInlineBold(h.body)}</div>
              <div className="hl-meta">
                <div className="role">{h.role}</div>
                {h.company} · {h.years}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
