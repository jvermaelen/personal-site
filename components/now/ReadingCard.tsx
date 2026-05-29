import nowData from '@/data/now.json';

const { currentlyReading } = nowData;

export function ReadingCard() {
  const cover = 'cover' in currentlyReading ? currentlyReading.cover : null;

  return (
    <aside className="reading-card" aria-label="Currently reading">
      {cover ? (
        // biome-ignore lint/performance/noImgElement: tiny local thumbnail, optimization not worth next/image config
        <img
          className="reading-cover reading-cover-img"
          src={cover}
          alt={`Cover of ${currentlyReading.title}`}
          width={56}
          height={84}
          loading="lazy"
        />
      ) : (
        <div className="reading-cover" aria-hidden="true" />
      )}
      <div>
        <div className="label">/ currently reading</div>
        <div className="title">{currentlyReading.title}</div>
        <div className="author">{currentlyReading.author}</div>
      </div>
    </aside>
  );
}
