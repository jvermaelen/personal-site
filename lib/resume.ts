/**
 * Resume — canonical data wrapper.
 *
 * All pages read structured resume data from here (via these helpers) instead
 * of duplicating fields inline. Per HANDOFF: data/resume.json is the source of
 * truth; the website surfaces are projections of it.
 *
 * Marketing copy (hero pitch, headline tagline) is NOT in resume.json — it
 * lives in the components that render it, with comments explaining why.
 */

import resumeData from '@/data/resume.json';

export const resume = resumeData;

export type HeadlineMetric = (typeof resume.headlineMetrics)[number];

export function getHeadlineMetrics(): readonly HeadlineMetric[] {
  return resume.headlineMetrics;
}

export type CurrentRole = {
  label: string;
  company: string;
  location: string;
};

export function getCurrentRole(): CurrentRole {
  // Current = the work entry with endDate === null; fallback to first.
  const current = resume.work.find((w) => w.endDate === null) ?? resume.work[0];
  return {
    label: resume.basics.label,
    company: current.company,
    location: `${resume.basics.location.city}, ${resume.basics.location.region}`,
  };
}
