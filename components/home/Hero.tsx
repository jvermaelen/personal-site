import Image from 'next/image';
import { SITE } from '@/lib/constants';
import { getCurrentRole } from '@/lib/resume';

/**
 * Hero pitch - intentionally NOT pulled from resume.json's basics.summary.
 * The resume summary is the PDF-context version; the hero needs a tighter,
 * recruit-tuned version. See PRD §4 (positioning) for the source.
 *
 * If this copy ever changes, update PRD §4 to keep them aligned.
 */
const HERO_PITCH_PREFIX =
  "The data partner Product, Sales, and Marketing actually want in the room. I've owned feature prioritization, GTM strategy, and performance analysis - and ";
const HERO_PITCH_ACCENT = 'I ship the right decisions, not just more features.';

export function Hero() {
  const role = getCurrentRole();

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-text">
            <div className="role-line">
              <span>{role.label}</span>
              <span className="sep">·</span>
              <span>{role.company}</span>
              <span className="sep">·</span>
              <span>{role.location}</span>
              <span className="sep">&nbsp;&nbsp;</span>
              <span className="open">Open to good conversations</span>
            </div>
            <h1>
              Jason Vermaelen<span className="period">.</span>
            </h1>
            <p className="pitch">
              {HERO_PITCH_PREFIX}
              <em>{HERO_PITCH_ACCENT}</em>
            </p>
            <div className="ctas">
              <a href={SITE.cal} className="btn primary" target="_blank" rel="noopener noreferrer">
                <span>Schedule a call</span>
                <span className="arrow">→</span>
              </a>
              <a href={`mailto:${SITE.email}`} className="btn ghost email">
                <span>Email</span>
                <span className="mail">{SITE.email}</span>
              </a>
            </div>
          </div>
          <div className="hero-avatar" aria-hidden="true">
            <Image src="/headshot.png" alt="Jason Vermaelen" width={760} height={760} priority />
          </div>
        </div>
        <a className="scroll-hint" href="#kpis">
          <span>see the numbers</span>
          <span className="scroll-arrow">↓</span>
        </a>
      </div>
    </section>
  );
}
