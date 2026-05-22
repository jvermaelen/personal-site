interface Metric {
  label: string;
  value: string;
  unit?: string;
  trend?: string;
}

interface Props {
  metrics: Metric[];
}

/**
 * Case-study KPI strip — the "report header" that anchors every case study
 * with 2-4 headline metrics. Separate from the homepage KPIStrip (which
 * animates from 0; this one is static and uses the case-kpis styles).
 */
export function KPIStrip({ metrics }: Props) {
  return (
    <section className="case-kpis" aria-label="Key metrics">
      <div className="case-kpi-grid">
        {metrics.map((m) => (
          <div className="case-kpi-tile" key={m.label}>
            <span className="kpi-value">
              {m.value}
              {m.unit && <span className="small">{m.unit}</span>}
            </span>
            <span className="kpi-label">{m.label}</span>
            {m.trend && <span className="kpi-trend">{m.trend}</span>}
          </div>
        ))}
      </div>
    </section>
  );
}
