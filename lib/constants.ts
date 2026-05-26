/**
 * Site-wide constants: links, handles, display strings.
 * Single source of truth — every component reads from here, never inline.
 */

export const SITE = {
  name: 'Jason Vermaelen',
  shortName: 'jv',
  url: 'https://jasonvermaelen.com',
  domain: 'jasonvermaelen.com',
  email: 'jason.vermaelen@gmail.com',
  linkedin: 'https://linkedin.com/in/vermaelen',
  linkedinDisplay: 'linkedin.com/in/vermaelen',
  github: 'https://github.com/jvermaelen',
  githubDisplay: 'github.com/jvermaelen',
  cal: 'https://app.cal.com/jason-vermaelen',
  calDisplay: 'app.cal.com/jason-vermaelen',
  repo: 'https://github.com/jvermaelen/personal-site',
  resumePath: '/resume.pdf',
  resumeFilename: 'jason-vermaelen-senior-bi-analyst-resume.pdf',
  resumeMeta: '82 KB · updated May 2026',
  location: 'Austin, TX',
  copyright: '© Jason Vermaelen · Austin, TX · 2026',
  lastUpdated: 'May 20, 2026',
} as const;

export const NAV_LINKS = [
  { href: '/work', label: 'work' },
  { href: '/writing', label: 'writing' },
  { href: '/now', label: 'now' },
  { href: '/about', label: 'about' },
] as const;
