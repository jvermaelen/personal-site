import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import { cookies } from 'next/headers';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

/**
 * metadataBase prefers the Vercel deploy URL while the custom domain isn't
 * pointing at the site yet. Once jasonvermaelen.com is wired up in Vercel,
 * VERCEL_URL on production deploys will resolve to the custom domain, so this
 * single line handles preview + production cleanly. Local dev falls back to
 * the canonical URL (OG previews aren't tested locally anyway).
 */
const SITE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'https://jasonvermaelen.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Jason Vermaelen — Senior BI Analyst, Indeed',
    template: '%s — Jason Vermaelen',
  },
  description:
    'Senior BI Analyst at Indeed. Open to Senior Analytics, BizOps, and Product roles. Case studies, writing, and the numbers behind them.',
  openGraph: {
    type: 'website',
    siteName: 'Jason Vermaelen',
    url: SITE_URL,
  },
  twitter: { card: 'summary_large_image' },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value === 'dark' ? 'dark' : 'light';

  return (
    <html lang="en" data-theme={theme} className={jetbrainsMono.variable}>
      <body>{children}</body>
    </html>
  );
}
