import type { Metadata } from 'next';
import { ContactStrip } from '@/components/ui/ContactStrip';
import { OnDeck } from '@/components/writing/OnDeck';
import { WritingHero } from '@/components/writing/WritingHero';
import { WritingSection } from '@/components/writing/WritingSection';

export const metadata: Metadata = {
  title: 'Writing',
  description:
    "Long-form essays on data work and product judgment. Build logs from things I'm shipping.",
};

export default function WritingPage() {
  return (
    <>
      <WritingHero />
      <WritingSection />
      <OnDeck />

      <ContactStrip
        headline="Want to write back?"
        subline="Topic suggestions, push-back, or just a thread to pull - I read everything."
      />
    </>
  );
}
