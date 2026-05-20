import { renderInlineBold } from '@/lib/text';

const CRITERIA = [
  '**Senior Analytics, BizOps, or Product-leaning roles.** IC or lead-IC. Most curious about PM tracks where the team is already data-fluent; less interested in being a PM in a vacuum.',
  '**Seed → Series D, AI-native, FAANG.** Companies where the data layer is taken seriously enough that "what does the funnel say" gets asked before "what does Marketing think."',
  '**Remote (US) or Austin hybrid.** Local to ATX; happy to fly for offsites.',
  "**Stack that respects SQL.** Snowflake / dbt / Metabase / Looker / etc. Not allergic to BigQuery or Tableau, but I'll push back on tooling that hides the query.",
  "**A team that ships.** The companies I've done my best work at gave me a seat in the launch meeting, not just the post-mortem.",
];

export function NextChapter() {
  return (
    <section className="about-section" id="next">
      <div className="container">
        <div className="section-head">
          <h2>§ The next chapter</h2>
          <span className="rule" />
          <span className="meta">where I do my best work</span>
        </div>

        <div className="next-block">
          <div className="next-label">/ my ideal room</div>
          <div className="next-list">
            {CRITERIA.map((c) => (
              <div key={c.slice(0, 40)} className="next-item">
                <span className="check">✓</span>
                <span>{renderInlineBold(c)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
