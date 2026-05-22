'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';

type ViewMode = 'all' | 'metrics' | 'process';

const VIEW_LABELS: Record<ViewMode, string> = {
  all: 'Full story',
  metrics: 'Just the metrics',
  process: 'Just the process',
};

const READ_TIMES: Record<ViewMode, string> = {
  all: '~6 min · full',
  metrics: '~2 min · metrics only',
  process: '~4 min · process only',
};

interface Props {
  children: ReactNode;
  /** Override the read-time label shown in the view bar. */
  readTime?: string;
}

/**
 * Client wrapper for the case study body. Manages the reader view-mode toggle
 * (Full story / Just the metrics / Just the process) and applies `data-view`
 * on the <article> element so CSS can show/hide `[data-views]` sections:
 *
 *   [data-view="metrics"] [data-views]:not([data-views~="metrics"]) { display: none; }
 *
 * Usage in the page (server component passes MDX content as children):
 *   <CaseBody>
 *     <MDXContent code={post.body} />
 *   </CaseBody>
 */
export function CaseBody({ children, readTime }: Props) {
  const [view, setView] = useState<ViewMode>('all');

  return (
    <>
      <div className="container">
        <div className="view-bar">
          <span className="label">/ view</span>
          <div className="view-tabs" role="radiogroup" aria-label="Reader view mode">
            {(Object.keys(VIEW_LABELS) as ViewMode[]).map((v) => (
              <button
                key={v}
                type="button"
                className="view-tab"
                aria-pressed={view === v}
                onClick={() => setView(v)}
              >
                {VIEW_LABELS[v]}
              </button>
            ))}
          </div>
          <span className="view-meta">{readTime ?? READ_TIMES[view]}</span>
        </div>
      </div>

      <article className="case-body" data-view={view}>
        <div className="container-narrow">{children}</div>
      </article>
    </>
  );
}
