import { Hero } from '@/components/home/Hero';
import { Highlights } from '@/components/home/Highlights';
import { KPIStrip } from '@/components/home/KPIStrip';
import { LatestWriting } from '@/components/home/LatestWriting';
import { NowBlock } from '@/components/home/NowBlock';
import { SelectedWork } from '@/components/home/SelectedWork';
import { ContactStrip } from '@/components/ui/ContactStrip';

export default function HomePage() {
  return (
    <>
      <Hero />
      <KPIStrip />
      <LatestWriting />
      <Highlights />
      <SelectedWork />
      <NowBlock />

      <ContactStrip
        variant="hero"
        headline={
          <>
            Let&apos;s talk about <em>the work.</em>
          </>
        }
        subline={
          <>
            Best topics: <strong>data partnership at startups</strong>, BI-to-PM moves, the math
            behind a feature decision, or any of the case studies on this site. Worst topics:
            anything I haven&apos;t lived. I&apos;ll tell you when I haven&apos;t.
          </>
        }
        topics={[
          'Senior Analytics / BizOps roles',
          'PM tracks with a data layer',
          'Salesforce automation',
          'CRM Analytics',
          'GTM strategy',
          'Topic ideas for /writing',
          'BJJ',
        ]}
      />
    </>
  );
}
