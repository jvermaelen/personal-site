/**
 * Theme helpers — client-only. Cookie is the source of truth; server reads it
 * in app/layout.tsx and sets `data-theme` on <html>. Client flips both the
 * cookie AND the attribute so the change is instant (no reload) and persists
 * on the next request.
 */

export type Theme = 'light' | 'dark';

const COOKIE_NAME = 'theme';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export function getCurrentTheme(): Theme {
  if (typeof document === 'undefined') return 'light';
  return (document.documentElement.getAttribute('data-theme') ?? 'light') as Theme;
}

export function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
  // biome-ignore lint/suspicious/noDocumentCookie: Cookie Store API is async, which would force toggleTheme() and every caller to be async for no real win on a single tiny write.
  document.cookie = `${COOKIE_NAME}=${theme}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`;
}

export function toggleTheme(): Theme {
  const next: Theme = getCurrentTheme() === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  return next;
}
