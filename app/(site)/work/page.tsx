import type { Metadata } from 'next';
import { ContactStrip } from '@/components/ui/ContactStrip';
import { HighlightsRail } from '@/components/work/HighlightsRail';
import { WorkHero } from '@/components/work/WorkHero';
import { WorkSection } from '@/components/work/WorkSection';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Case studies from eight years across BI, Product Strategy, and BizOps at Indeed and Talroo.',
};

export default function WorkPage() {
  return (
    <>
      <WorkHero />
      <WorkSection />
      <HighlightsRail />

      <ContactStrip
        headline="Want the long version?"
        subline="Happy to walk you through any of these in detail."
      />
    </>
  );
}
