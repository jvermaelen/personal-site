interface Row {
  label: string;
  value: string;
}

interface Props {
  primary: { label: string; value: string; caption?: string };
  secondary?: Row[];
}

/**
 * Large metric callout with a primary headline number and optional secondary
 * rows. Used in the Results section of case studies.
 *
 * MDX example:
 *   <MetricCallout
 *     primary={{ label: "Annualized return", value: "~2,000 hrs/yr", caption: "measured against 6-week pre-rollout baseline" }}
 *     secondary={[
 *       { label: "Common-path triage", value: "100% automated" },
 *       { label: "Auto-close accuracy", value: "99.4% (sampled)" },
 *     ]}
 *   />
 */
export function MetricCallout({ primary, secondary }: Props) {
  return (
    <div className="metric-callout">
      <div className="mc-primary">
        <span className="l">{primary.label}</span>
        <span className="v">{primary.value}</span>
        {primary.caption && <span className="mc-caption">{primary.caption}</span>}
      </div>
      {secondary && secondary.length > 0 && (
        <div className="mc-secondary">
          {secondary.map((row) => (
            <div className="mc-row" key={row.label}>
              <span className="l">{row.label}</span>
              <span className="v">{row.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
