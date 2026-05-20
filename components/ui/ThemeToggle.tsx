'use client';

import { useEffect, useState } from 'react';
import { getCurrentTheme, type Theme, toggleTheme } from '@/lib/theme';

/**
 * Theme toggle — flips cookie + data-theme attribute instantly (no reload).
 * Icon shows what you'd switch TO: in light mode show moon, in dark show sun.
 *
 * Also exposes a global `__toggleTheme` window function so the Cmd+K palette
 * can delegate "Toggle theme" actions without coupling to the button DOM.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    setTheme(getCurrentTheme());

    // Expose for command-palette delegation
    (window as unknown as { __toggleTheme?: () => void }).__toggleTheme = () => {
      setTheme(toggleTheme());
    };
    return () => {
      delete (window as unknown as { __toggleTheme?: () => void }).__toggleTheme;
    };
  }, []);

  function handleClick() {
    setTheme(toggleTheme());
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={handleClick}
      className="theme-btn"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      id="theme-toggle"
    >
      {isDark ? (
        // Sun — shown in dark mode (click switches to light)
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
      ) : (
        // Moon — shown in light mode (click switches to dark)
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
