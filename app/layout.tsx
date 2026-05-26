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
 * metadataBase resolution:
 * - Production: always use the canonical custom domain. VERCEL_URL on production
 *   resolves to the deployment-specific alias (e.g. personal-site-xxxxx.vercel.app)
 *   which is 401-protected for non-bypassed callers. LinkedIn / Twitter / etc.
 *   need the public custom domain to actually fetch the OG image.
 * - Preview deploys: use VERCEL_URL (the preview deployment URL). Acceptable
 *   here because preview shares are typically tested by Jason directly.
 * - Local dev: fall back to the canonical URL (OG previews aren't tested locally).
 */
const SITE_URL =
  process.env.VERCEL_ENV === 'production'
    ? 'https://jasonvermaelen.com'
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'https://jasonvermaelen.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Jason Vermaelen - Senior BI Analyst, Indeed',
    template: '%s - Jason Vermaelen',
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
