import arcData from '@/data/arc.json';
import { renderInlineBold } from '@/lib/text';

type ArcRow = {
  year: string;
  body: string;
  role: string;
  company: string;
  location: string;
  current?: boolean;
};

export function Arc() {
  const rows = arcData as ArcRow[];

  return (
    <section className="about-section" id="arc">
      <div className="container">
        <div className="section-head">
          <h2>§ The arc</h2>
          <span className="rule" />
          <span className="meta">2017 → now</span>
        </div>

        <div className="arc">
          {rows.map((row) => (
            <article key={row.year} className={`arc-row${row.current ? ' current' : ''}`}>
              <div className="arc-year">{row.year}</div>
              <div className="arc-body">{renderInlineBold(row.body)}</div>
              <div className="arc-meta">
                <span className="role">{row.role}</span>
                {row.company} · {row.location}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
