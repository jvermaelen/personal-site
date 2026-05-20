import { getHeadlineMetrics } from '@/lib/resume';
import { KPITile } from './KPITile';

export function KPIStrip() {
  const metrics = getHeadlineMetrics();

  return (
    <section className="kpi-section" id="kpis">
      <div className="kpi-grid">
        {metrics.map((metric) => (
          <KPITile key={metric.label} value={metric.value} label={metric.label} />
        ))}
      </div>
      <div className="container kpi-caption">
        selected outcomes · 8 years · indeed + talroo · full context in case studies (shipping
        post-launch)
      </div>
    </section>
  );
}
