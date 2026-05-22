import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

/**
 * Artifact list for case study Artifacts sections. Children are rendered
 * inside `.artifacts`; CSS in globals.css styles `.artifacts li` to match
 * the `.artifact` row pattern from the design reference.
 *
 * MDX example:
 *   <Stack>
 *     - [Live dashboard — anonymized read-only view](#)
 *     - [Architecture notes — Notion](#)
 *     - [SQL queries — GitHub gist](#)
 *   </Stack>
 */
export function Stack({ children }: Props) {
  return <div className="artifacts">{children}</div>;
}
