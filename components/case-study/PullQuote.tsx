import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  cite?: string;
}

/**
 * Pull quote for writing posts and case study prose. Renders a styled
 * blockquote with an accent left-border.
 */
export function PullQuote({ children, cite }: Props) {
  return (
    <blockquote className="pull-quote">
      <div className="pull-quote-body">{children}</div>
      {cite && <cite className="pull-quote-cite">{cite}</cite>}
    </blockquote>
  );
}
