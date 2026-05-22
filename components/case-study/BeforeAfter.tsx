interface Props {
  before: { caption: string; bars?: number[]; summary?: string };
  after: { caption: string; bars?: number[]; summary?: string };
}

const DEFAULT_BEFORE = [85, 90, 78, 95, 88, 92, 84, 89];
const DEFAULT_AFTER = [28, 24, 18, 14, 10, 11, 9, 8];

/**
 * Before/after bar-chart pair for Results sections. Accepts optional bar
 * height arrays (0–100) and summary labels. Defaults to the Salesforce
 * automation example proportions when no data is provided.
 */
export function BeforeAfter({ before, after }: Props) {
  const beforeBars = before.bars ?? DEFAULT_BEFORE;
  const afterBars = after.bars ?? DEFAULT_AFTER;

  return (
    <div className="ba">
      <div className="ba-card before">
        <div className="ba-k">{before.caption}</div>
        <div className="ba-bars">
          {beforeBars.map((h, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static bar array — no reordering, index is the stable key
            <div key={i} className="ba-bar" style={{ height: `${h}%` }} />
          ))}
        </div>
        {before.summary && <div className="ba-summary">{before.summary}</div>}
      </div>
      <div className="ba-card after">
        <div className="ba-k">{after.caption}</div>
        <div className="ba-bars">
          {afterBars.map((h, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static bar array — no reordering, index is the stable key
            <div key={i} className="ba-bar" style={{ height: `${h}%` }} />
          ))}
        </div>
        {after.summary && <div className="ba-summary">{after.summary}</div>}
      </div>
    </div>
  );
}
