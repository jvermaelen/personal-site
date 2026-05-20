import { SITE } from '@/lib/constants';

export function ResumeCTA() {
  return (
    <section className="about-section" id="resume" style={{ paddingTop: 0 }}>
      <div className="container">
        <a className="resume-cta" href={SITE.resumePath} download>
          <div className="left">
            <span className="label">/ resume</span>
            <span className="title">{SITE.resumeFilename}</span>
          </div>
          <span className="meta">{SITE.resumeMeta}</span>
          <span className="right">download ↓</span>
        </a>
      </div>
    </section>
  );
}
