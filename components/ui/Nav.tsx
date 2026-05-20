'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CommandPalette } from '@/components/command-palette/CommandPalette';
import { NAV_LINKS } from '@/lib/constants';
import { ThemeToggle } from './ThemeToggle';

export function Nav() {
  const pathname = usePathname();

  function isActive(href: string): boolean {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="nav">
      <div className="container nav-row">
        <Link href="/" className="brand" aria-label="Home" title="Home">
          <span>jv</span>
          <span className="dot" aria-hidden="true" />
          <span className="brand-label">/ home</span>
        </Link>
        <nav className="nav-links" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={isActive(link.href) ? 'active' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="nav-tools">
          <CommandPalette />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
