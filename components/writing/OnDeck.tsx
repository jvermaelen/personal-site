import { SITE } from '@/lib/constants';
import onDeckData from '@/data/on-deck.json';

type OnDeckEntry = {
  stamp: string;
  what: string;
  why: string;
};

export function OnDeck() {
  const entries = onDeckData as OnDeckEntry[];
  const isEmpty = entries.length === 0;

  return (
    <section className="on-deck-section">
      <div className="container">
        <div className="on-deck-head">
          <h2>§ On deck</h2>
          <span className="rule" />
          <span className="meta">
            {isEmpty ? 'coming soon' : 'topics in the queue · not yet drafted'}
          </span>
        </div>

        {isEmpty ? (
          <div className="on-deck-empty" role="status">
            <p>
              <strong>More writing topics coming soon.</strong> Curating the next batch of essays,
              build logs, and notes. Want to suggest a topic?{' '}
              <a href={`mailto:${SITE.email}?subject=Topic%20request`}>Email me</a>.
            </p>
          </div>
        ) : (
          <div className="on-deck">
            {entries.map((entry) => (
              <div key={entry.what} className="on-deck-cell">
                <span className="stamp">{entry.stamp}</span>
                <span className="what">{entry.what}</span>
                <span className="why">{entry.why}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
