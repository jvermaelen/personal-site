'use client';

import { useState } from 'react';
import writingData from '@/data/writing.json';
import { SITE } from '@/lib/constants';
import { type Post, PostRow } from './PostRow';

type FilterValue = 'all' | 'essay' | 'build' | 'note';

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'essay', label: 'Essays' },
  { value: 'build', label: 'Build logs' },
  { value: 'note', label: 'Notes' },
];

const POSTS = writingData as Post[];

const COUNTS: Record<FilterValue, number> = (() => {
  const c: Record<FilterValue, number> = { all: POSTS.length, essay: 0, build: 0, note: 0 };
  for (const p of POSTS) {
    if (p.tag in c) c[p.tag]++;
  }
  return c;
})();

export function WritingSection() {
  const [filter, setFilter] = useState<FilterValue>('all');
  const visible = filter === 'all' ? POSTS : POSTS.filter((p) => p.tag === filter);

  return (
    <>
      <div className="container">
        <div className="filter-bar">
          <span className="label">/ filter</span>
          <div className="chip-row" role="radiogroup" aria-label="Filter posts">
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
            {visible.length} of {POSTS.length}
          </span>
        </div>
      </div>

      <section className="posts">
        <div className="container">
          {visible.map((p) => (
            <PostRow key={p.slug} post={p} />
          ))}
        </div>

        <div className="container">
          <div className="empty-note" role="status">
            <span className="glyph" aria-hidden="true">
              ✎
            </span>
            <p className="body">
              <strong>Most posts are still being written.</strong> The first build log is at the top
              of the list; the rest are scaffolded titles I&apos;m working through. Subscribing
              isn&apos;t a thing here (yet) — bookmark the RSS once it&apos;s published, or just
              email me what you&apos;d want to read first.
            </p>
            <a className="cta" href={`mailto:${SITE.email}?subject=Topic%20request`}>
              <span>Suggest a topic</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
