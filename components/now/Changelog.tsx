import nowData from '@/data/now.json';

export function Changelog() {
  return (
    <section className="changelog">
      <div className="container">
        <div className="changelog-head">
          <h2>§ Now - changelog</h2>
          <span className="rule" />
          <span className="meta">past updates</span>
        </div>
        <div className="changelog-list">
          {nowData.changelog.map((row) => (
            <div key={row.when} className="changelog-row">
              <div className="when">{row.when}</div>
              <div className="what">{row.what}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
