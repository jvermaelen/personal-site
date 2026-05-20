import { Fragment } from 'react';
import nowData from '@/data/now.json';

/**
 * Render markdown-style **bold**, *italic*, and [text](url) links. Static
 * content from data/now.json — no XSS surface.
 */
function renderRichInline(text: string) {
  // Match **bold**, *italic*, or [text](url) — captured groups preserved.
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(re);

  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      // biome-ignore lint/suspicious/noArrayIndexKey: regex.split() of a static string — parts have no natural id and order is stable
      return <strong key={`b-${i}`}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      // biome-ignore lint/suspicious/noArrayIndexKey: regex.split() of a static string — parts have no natural id and order is stable
      return <em key={`i-${i}`}>{part.slice(1, -1)}</em>;
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch?.[1] && linkMatch[2]) {
      return (
        // biome-ignore lint/suspicious/noArrayIndexKey: regex.split() of a static string — parts have no natural id and order is stable
        <a key={`l-${i}`} href={linkMatch[2]}>
          {linkMatch[1]}
        </a>
      );
    }
    // biome-ignore lint/suspicious/noArrayIndexKey: regex.split() of a static string — parts have no natural id and order is stable
    return <Fragment key={`t-${i}`}>{part}</Fragment>;
  });
}

export function NowSections() {
  return (
    <div className="now-sections">
      {nowData.sections.map((section) => (
        <div key={section.label} className="now-section">
          <div className="label">{section.label}</div>
          <div className="body">{renderRichInline(section.body)}</div>
        </div>
      ))}
    </div>
  );
}
