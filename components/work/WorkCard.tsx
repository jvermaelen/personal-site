import { renderInlineBold } from '@/lib/text';
import { Cover, type CoverProps } from './Cover';

export type WorkEntry = {
  slug: string;
  title: string;
  outcome: string;
  tags: string[];
  pills: string[];
  status: 'live' | 'coming-soon' | 'tba';
  cover: CoverProps;
};

const ARROW_BY_STATUS: Record<WorkEntry['status'], string> = {
  live: 'read →',
  'coming-soon': 'drafting…',
  tba: 'in flight…',
};

export function WorkCard({ entry }: { entry: WorkEntry }) {
  const arrow = ARROW_BY_STATUS[entry.status];
  const isComingSoon = entry.status !== 'live';

  return (
    <article className={`card${isComingSoon ? ' coming-soon' : ''}`}>
      <Cover {...entry.cover} />
      <div className="card-body">
        <h3>{entry.title}</h3>
        <p className="outcome">{renderInlineBold(entry.outcome)}</p>
        <div className="card-foot">
          <div className="stack">
            {entry.pills.map((p) => (
              <span key={p} className="pill">
                {p}
              </span>
            ))}
          </div>
          <span className="arrow">{arrow}</span>
        </div>
      </div>
    </article>
  );
}
