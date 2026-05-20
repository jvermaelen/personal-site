'use client';

import { usePathname } from 'next/navigation';

/**
 * Shows the actual URL the user tried to load, inside the SQL terminal mock
 * on the 404 page. Falls back to a generic placeholder on first render before
 * the pathname hook resolves (SSR sees an empty string).
 */
export function BadUrl() {
  const path = usePathname();
  return <>{path || '/that-page-you-wanted'}</>;
}
