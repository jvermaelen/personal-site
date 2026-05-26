import Link from 'next/link';
import workData from '@/data/work.json';
import { WorkCard, type WorkEntry } from '@/components/work/WorkCard';

export function SelectedWork() {
  const entries = (workData as WorkEntry[]).filter((w) => w.status === 'live');

  if (entries.length === 0) return null;

  return (
    <section className="section home-section">
      <div className="container">
        <div className="section-head">
          <h2>§ Selected work</h2>
          <span className="rule" />
          <Link href="/work" className="section-cta">
            see all →
          </Link>
        </div>
        <div className="selected-work-grid">
          {entries.map((w) => (
            <WorkCard key={w.slug} entry={w} />
          ))}
        </div>
      </div>
    </section>
  );
}
