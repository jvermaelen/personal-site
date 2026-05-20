'use client';

import { useState } from 'react';
import workData from '@/data/work.json';
import { SITE } from '@/lib/constants';
import { WorkCard, type WorkEntry } from './WorkCard';

type FilterValue = 'all' | 'bi' | 'automation' | 'product' | 'bizops';

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'bi', label: 'BI / Analytics' },
  { value: 'automation', label: 'Automation' },
  { value: 'product', label: 'Product / GTM' },
  { value: 'bizops', label: 'BizOps' },
];

// Data + counts are stable at module init (workData is a frozen import).
const WORKS = workData as WorkEntry[];

const COUNTS: Record<FilterValue, number> = (() => {
  const c: Record<FilterValue, number> = {
    all: WORKS.length,
    bi: 0,
    automation: 0,
    product: 0,
    bizops: 0,
  };
  for (const w of WORKS) {
    for (const t of w.tags) {
      if (t in c && t !== 'all') {
        c[t as Exclude<FilterValue, 'all'>]++;
      }
    }
  }
  return c;
})();

export function WorkSection() {
  const [filter, setFilter] = useState<FilterValue>('all');
  const visible = filter === 'all' ? WORKS : WORKS.filter((w) => w.tags.includes(filter));

  return (
    <>
      <div className="container">
        <div className="filter-bar">
          <span className="label">/ filter</span>
          <div className="chip-row" role="radiogroup" aria-label="Filter case studies">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                className="chip"
                aria-pressed={filter === f.value}
                onClick={() => setFilter(f.value)}
              >
                {f.label} <span className="count">{COUNTS[f.value]}</span>
              </button>
            ))}
          </div>
          <span className="filter-meta">
            {visible.length} of {WORKS.length}
          </span>
        </div>
      </div>

      <section>
        <div className="container">
          <div className="work-grid">
            {visible.map((w) => (
              <WorkCard key={w.slug} entry={w} />
            ))}
          </div>

          <div className="empty-note" role="status">
            <span className="glyph" aria-hidden="true">
              ✎
            </span>
            <p className="body">
              <strong>Most case studies are still being written.</strong> They&apos;re being cleared
              for public sharing one at a time. The cards above are scaffolded with real metrics and
              will become readable as each one is ready. The same applies to the live SQL playground
              side project.
            </p>
            <a className="cta" href={`mailto:${SITE.email}?subject=Case%20study%20deep-dive`}>
              <span>Ask for a deep-dive</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
