type Kpi = { value: string; small?: string };

type CoverLine = {
  kind: 'line';
  label: string;
  kpi: Kpi;
  /** Series of [x, y] points on a 100×50 viewBox. */
  points: [number, number][];
};

type CoverBar = {
  kind: 'bar';
  label: string;
  kpi: Kpi;
  bars: { h: number; muted?: boolean }[];
};

type CoverPattern = {
  kind: 'pattern';
  badge: string;
};

export type CoverProps = CoverLine | CoverBar | CoverPattern;

export function Cover(props: CoverProps) {
  if (props.kind === 'pattern') {
    return (
      <div className="card-cover">
        <div className="cover-pattern tba" aria-hidden="true">
          <span className="badge">{props.badge}</span>
        </div>
      </div>
    );
  }

  if (props.kind === 'bar') {
    return (
      <div className="card-cover">
        <div className="cover-chart" aria-hidden="true">
          {props.bars.map((bar, i) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: positional bars in a fixed chart — index is the natural id
              key={`bar-${i}`}
              className="bar"
              style={{ height: `${bar.h}%`, opacity: bar.muted ? 0.45 : undefined }}
            />
          ))}
        </div>
        <span className="cover-label">{props.label}</span>
        <span className="cover-kpi">
          {props.kpi.value}
          {props.kpi.small && <span className="small">{props.kpi.small}</span>}
        </span>
      </div>
    );
  }

  // Line variant
  const linePath = props.points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`).join(' ');
  const last = props.points[props.points.length - 1];
  const first = props.points[0];
  const areaPath = `${linePath} L${last?.[0] ?? 100},50 L${first?.[0] ?? 0},50 Z`;

  return (
    <div className="card-cover">
      <span className="cover-label">{props.label}</span>
      <div className="cover-line" aria-hidden="true">
        <svg viewBox="0 0 100 50" preserveAspectRatio="none">
          <title>{props.label}</title>
          <line className="grid" x1="0" y1="12" x2="100" y2="12" />
          <line className="grid" x1="0" y1="25" x2="100" y2="25" />
          <line className="grid" x1="0" y1="38" x2="100" y2="38" />
          <path className="area" d={areaPath} />
          <path className="line" d={linePath} />
          {first && <circle className="dot" cx={first[0]} cy={first[1]} r="1.6" />}
          {last && <circle className="dot" cx={last[0]} cy={last[1]} r="1.6" />}
        </svg>
      </div>
      <span className="cover-kpi">
        {props.kpi.value}
        {props.kpi.small && <span className="small">{props.kpi.small}</span>}
      </span>
    </div>
  );
}
