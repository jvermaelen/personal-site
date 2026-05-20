import onDeckData from '@/data/on-deck.json';

type OnDeckEntry = {
  stamp: string;
  what: string;
  why: string;
};

export function OnDeck() {
  const entries = onDeckData as OnDeckEntry[];

  return (
    <section className="on-deck-section">
      <div className="container">
        <div className="on-deck-head">
          <h2>§ On deck</h2>
          <span className="rule" />
          <span className="meta">topics in the queue · not yet drafted</span>
        </div>

        <div className="on-deck">
          {entries.map((entry) => (
            <div key={entry.what} className="on-deck-cell">
              <span className="stamp">{entry.stamp}</span>
              <span className="what">{entry.what}</span>
              <span className="why">{entry.why}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
