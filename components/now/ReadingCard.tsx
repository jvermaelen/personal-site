import nowData from '@/data/now.json';

export function ReadingCard() {
  return (
    <aside className="reading-card" aria-label="Currently reading">
      <div className="reading-cover" aria-hidden="true" />
      <div>
        <div className="label">/ currently reading</div>
        <div className="title">{nowData.currentlyReading.title}</div>
        <div className="author">{nowData.currentlyReading.author}</div>
      </div>
    </aside>
  );
}
