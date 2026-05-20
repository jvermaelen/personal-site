import { Fragment } from 'react';

/**
 * Render markdown-style **bold** inside a string as <strong>. No HTML parsing,
 * no XSS surface — content lives in our own JSON / hardcoded strings only.
 *
 * Used by Highlights, Arc, and other components that read curated prose
 * with inline emphasis from `data/*.json`.
 */
export function renderInlineBold(text: string) {
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
