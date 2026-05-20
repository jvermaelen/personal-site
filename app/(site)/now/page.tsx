import type { Metadata } from 'next';
import { Changelog } from '@/components/now/Changelog';
import { NowHero } from '@/components/now/NowHero';
import { NowSections } from '@/components/now/NowSections';
import { ReadingCard } from '@/components/now/ReadingCard';
import { SpotifyRecent } from '@/components/now/SpotifyRecent';
import { ContactStrip } from '@/components/ui/ContactStrip';

export const metadata: Metadata = {
  title: 'Now',
  description: "What I'm doing right now. Updated monthly.",
};

export default function NowPage() {
  return (
    <>
      <NowHero />

      <section>
        <div className="container now-main">
          <NowSections />
          <aside className="now-side" aria-label="Live activity">
            <SpotifyRecent />
            <ReadingCard />
          </aside>
        </div>
      </section>

      <Changelog />

      <ContactStrip headline="Want to talk?" subline="I respond within 24 hours on weekdays." />
    </>
  );
}
