import type { Metadata } from 'next';
import { AboutHero } from '@/components/about/AboutHero';
import { Arc } from '@/components/about/Arc';
import { NextChapter } from '@/components/about/NextChapter';
import { Personal } from '@/components/about/Personal';
import { Principles } from '@/components/about/Principles';
import { ResumeCTA } from '@/components/about/ResumeCTA';
import { ContactStrip } from '@/components/ui/ContactStrip';

export const metadata: Metadata = {
  title: 'About',
  description:
    "Senior BI Analyst at Indeed. The career arc, how I work, what I'm looking for next.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Arc />
      <Principles />
      <NextChapter />
      <Personal />
      <ResumeCTA />

      <ContactStrip headline="Want to talk?" subline="I respond within 24 hours on weekdays." />
    </>
  );
}
