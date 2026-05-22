import Image from 'next/image';

interface Props {
  src?: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
}

/**
 * Architecture diagram or screenshot for case study Process sections.
 * If `src` is provided, renders a Next.js Image; otherwise renders a
 * striped placeholder matching the design reference.
 */
export function Figure({ src, alt = '', caption, width = 1200, height = 675 }: Props) {
  return (
    <figure className="cs-figure">
      <div className="cs-figure-frame">
        {src ? (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        ) : (
          <span className="placeholder">{alt || 'diagram placeholder'}</span>
        )}
      </div>
      {caption && <figcaption className="cs-figure-caption">{caption}</figcaption>}
    </figure>
  );
}
