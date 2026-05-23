import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { work } from '@/.velite';
import { useMDXComponent } from '@/lib/mdx';
import { ContactStrip } from '@/components/ui/ContactStrip';
import { CaseBody } from '@/components/case-study/CaseBody';
import {
  Aside,
  BeforeAfter,
  CaseSection,
  Figure,
  KPIStrip,
  MetricCallout,
  PullQuote,
  Stack,
} from '@/components/case-study';
import { SITE } from '@/lib/constants';

interface Params {
  slug: string;
}

/** All custom components available inside case-study MDX files. */
const MDX_COMPONENTS = {
  CaseSection,
  KPIStrip,
  MetricCallout,
  Aside,
  BeforeAfter,
  Figure,
  Stack,
  PullQuote,
};

export function generateStaticParams() {
  return work
    .filter((p) => !p.draft)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = work.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} - ${SITE.name}`,
    description: post.description ?? post.outcomeHeadline,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = work.find((p) => p.slug === slug && !p.draft);
  if (!post) notFound();

  // Next / prev case for the bottom nav card
  const sorted = [...work].filter((p) => !p.draft).sort((a, b) => (b.order ?? b.year) - (a.order ?? a.year));
  const idx = sorted.findIndex((p) => p.slug === slug);
  const nextCase = sorted[idx + 1] ?? null;

  const MDXContent = useMDXComponent(post.body);

  return (
    <>
      {/* ── Breadcrumb ────────────────────────────────────────────────────── */}
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">jv</a>
          <span className="sep" aria-hidden="true">/</span>
          <a href="/work">work</a>
          <span className="sep" aria-hidden="true">/</span>
          <span className="here">{post.slug}</span>
        </nav>
      </div>

      {/* ── Case header ───────────────────────────────────────────────────── */}
      <section className="case-header">
        <div className="container">
          <div className="case-eyebrow">
            <span>
              <span className="accent-dot" aria-hidden="true">§</span> Case study
            </span>
            <span className="chip">{post.year}</span>
            {post.status && (
              <span className="chip status">{post.status.toLowerCase()}</span>
            )}
          </div>

          <h1 className="case-title">{post.title}</h1>
          <p className="case-lead">{post.outcomeHeadline}</p>

          {/* Meta strip - role / company / duration / team / tags */}
          <div className="meta-strip">
            <div className="meta-cell">
              <span className="k">Role</span>
              <span className="v">{post.role}</span>
            </div>
            <div className="meta-cell">
              <span className="k">Company</span>
              <span className="v">{post.company}</span>
            </div>
            <div className="meta-cell">
              <span className="k">Duration</span>
              <span className="v">{post.duration} · {post.year}</span>
            </div>
            {post.collaborators && post.collaborators.length > 0 && (
              <div className="meta-cell">
                <span className="k">Team</span>
                <span className="v">{post.collaborators.join(' · ')}</span>
              </div>
            )}
            <div className="meta-cell">
              <span className="k">Tags</span>
              <span className="v tags">
                {post.tags.map((t) => (
                  <span key={t} className="meta-tag">{t}</span>
                ))}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── KPI strip ─────────────────────────────────────────────────────── */}
      <section className="case-kpis" aria-label="Key metrics">
        <div className="case-kpi-grid">
          {post.metrics.map((m) => (
            <div className="case-kpi-tile" key={m.label}>
              <span className="kpi-value">
                {m.value}
                {m.unit && <span className="small">{m.unit}</span>}
              </span>
              <span className="kpi-label">{m.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Body (view toggle + MDX) ──────────────────────────────────────── */}
      <CaseBody>
        <MDXContent components={MDX_COMPONENTS} />
      </CaseBody>

      {/* ── Next case nav ─────────────────────────────────────────────────── */}
      {nextCase && (
        <section className="next-case" aria-label="Next case study">
          <div className="container">
            <a className="next-case-card" href={nextCase.url}>
              <div className="nc-num">
                {String(idx + 2).padStart(2, '0')} / {String(sorted.length).padStart(2, '0')}
                <small>next case</small>
              </div>
              <div>
                <div className="nc-title">{nextCase.title}</div>
                <div className="nc-outcome">
                  {nextCase.company} · {nextCase.year} · {nextCase.tags.join(' / ')}
                </div>
              </div>
              <span className="nc-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </section>
      )}

      <ContactStrip
        headline="Want to talk through it?"
        subline="I respond within 24 hours on weekdays. Happy to walk you through the architecture."
      />
    </>
  );
}
