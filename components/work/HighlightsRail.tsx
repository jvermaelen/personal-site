import railData from '@/data/work-rail.json';
import { renderInlineBold } from '@/lib/text';

type RailValue = string | { value: string; small: string };

type RailEntry = {
  val: RailValue;
  body: string;
  meta: string;
};

function renderVal(val: RailValue) {
  if (typeof val === 'string') return val;
  return (
    <>
      {val.value}
      <span className="small">{val.small}</span>
    </>
  );
}

function railKey(val: RailValue): string {
  return typeof val === 'string' ? val : `${val.value}${val.small}`;
}

export function HighlightsRail() {
  const rows = railData as RailEntry[];

  return (
    <section className="rail-section">
      <div className="container">
        <div className="rail-head">
          <h2>§ Highlights - the short version</h2>
          <span className="rule" />
          <span className="meta">resume bullets · while case studies ship</span>
        </div>

        <div className="rail">
          {rows.map((row) => (
            <div key={railKey(row.val)} className="rail-cell">
              <span className="val">{renderVal(row.val)}</span>
              <span className="body">{renderInlineBold(row.body)}</span>
              <span className="meta">{row.meta}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
