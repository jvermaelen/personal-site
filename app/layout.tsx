import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import { cookies } from 'next/headers';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://jasonvermaelen.com'),
  title: {
    default: 'Jason Vermaelen — Senior BI Analyst, Indeed',
    template: '%s — Jason Vermaelen',
  },
  description:
    'Senior BI Analyst at Indeed. Open to Senior Analytics, BizOps, and Product roles. Case studies, writing, and the numbers behind them.',
  openGraph: {
    type: 'website',
    siteName: 'Jason Vermaelen',
    url: 'https://jasonvermaelen.com',
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
