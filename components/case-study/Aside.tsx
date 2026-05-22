import type { ReactNode } from 'react';

interface Props {
  label?: string;
  children: ReactNode;
}

/**
 * Accent-bordered callout for case study asides — typically used for
 * "What I chose not to do" explanations in the Decision section.
 *
 * MDX example:
 *   <Aside>
 *     I didn't try to automate any case the classifier scored below a
 *     defensible threshold. The math said it would add ~12% more hours saved,
 *     but a wrong auto-close on a real customer issue was an order of magnitude
 *     worse than a human glancing at it.
 *   </Aside>
 */
export function Aside({ label = '/ What I chose not to do', children }: Props) {
  return (
    <div className="callout">
      <div className="callout-k">{label}</div>
      <div className="callout-body">{children}</div>
    </div>
  );
}
