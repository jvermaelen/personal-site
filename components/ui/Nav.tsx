'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/lib/constants';
import { ThemeToggle } from './ThemeToggle';

function getBrandLabel(pathname: string): string {
  if (pathname === '/') return 'home';
  const seg = pathname.split('/')[1];
  return seg || 'home';
}

export function Nav() {
  const pathname = usePathname();
  const brandLabel = getBrandLabel(pathname);

  function isActive(href: string): boolean {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="nav">
      <div className="container nav-row">
        <Link href="/" className="brand" aria-label="Home" title="Home">
          <span>jv</span>
          <span className="dot" aria-hidden="true" />
          <span className="brand-label">/ {brandLabel}</span>
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
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
