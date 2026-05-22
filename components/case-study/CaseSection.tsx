import type { ReactNode } from 'react';

interface Props {
  id: string;
  /** Space-separated view modes this section appears in: 'all', 'metrics', 'process'. */
  views?: string;
  children: ReactNode;
}

/**
 * Wraps a case-study body section with a `data-views` attribute so the
 * view-mode toggle CSS can show/hide it:
 *
 *   [data-view="metrics"] [data-views]:not([data-views~="metrics"]) { display: none; }
 *
 * Example MDX usage:
 *   <CaseSection id="results" views="all metrics">
 *   ## Results
 *   ...
 *   </CaseSection>
 */
export function CaseSection({ id, views = 'all', children }: Props) {
  return (
    <section className="case-section" id={id} data-views={views}>
      {children}
    </section>
  );
}
