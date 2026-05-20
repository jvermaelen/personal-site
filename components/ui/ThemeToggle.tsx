'use client';

/**
 * Theme toggle — stub for Day 2. Real cookie-backed toggle lands Day 4 alongside
 * the Cmd+K palette (the palette delegates "T" / "theme" actions here).
 *
 * For now: renders the sun icon (light is the default theme per the preview's
 * data-theme="light" default). The button is real and accessible but no-ops on
 * click. Replacing the click handler with a server action + cookie set + router
 * refresh is the Day 4 task.
 */
export function ThemeToggle() {
  function handleClick() {
    // TODO Day 4: cookie-based theme toggle
  }

  return (
    <button type="button" onClick={handleClick} className="theme-btn" aria-label="Toggle theme">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    </button>
  );
}
