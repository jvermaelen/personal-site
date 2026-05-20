import { ContactStrip } from '@/components/ui/ContactStrip';

export default function HomePage() {
  return (
    <>
      <section style={{ padding: '88px 0 64px' }}>
        <div className="container">
          <p
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 13,
              color: 'var(--muted)',
              letterSpacing: '0.02em',
            }}
          >
            jasonvermaelen.com · building — hero, KPIs, highlights, and Now come next.
          </p>
        </div>
      </section>

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
