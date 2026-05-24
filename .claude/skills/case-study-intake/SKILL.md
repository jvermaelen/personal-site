---
description: Drafting, refining, or planning a case study for the /work section of jasonvermaelen.com. Covers the 7-section body structure, KPI strip rules, MDX components, frontmatter validation, and the intake-first workflow. Auto-load when the user mentions case study, work writeup, project deep-dive, or /work/[slug] in the context of this site.
---

# Case study intake

For drafting any case study that ships to `/work/[slug]` on jasonvermaelen.com.

## Step 0 — The intake-first workflow

**Don't write a case study from a one-line brief.** The canonical intake template is at `content/work/_intake.md` - it has the worked Salesforce example, a blank template per case study, and the "what's safe to share" rules for proprietary work.

If Jason hasn't filled in the intake yet, point him there first. Once you have bullets, you write the MDX. The workflow is:

1. Jason fills in the intake (`_intake.md` template) with bullets per the 7 sections
2. You read the bullets + read existing case studies for voice reference
3. You write the full MDX
4. Jason reviews on the live page (Vercel preview) and flags anything wrong

## Step 1 — Brainstorm the framing before writing MDX

The intake bullets give you the FACTS. They don't give you the FRAMING. Every case study has multiple credible leads:

- The Salesforce automation case could lead with "2-week AI-augmented build" OR "~1,500 hours/year returned" OR "from 6-month Apex/Flow to 2-week Python." Each shapes a different first impression.
- The SBS dashboard could lead with "400K opportunities tracked" OR "held the line on scope" OR "AWS-to-Salesforce data plumbing." All true; one of them is sharper for this audience at this moment.
- The GTM case could lead with "2M+ connections" OR "the judgment call to hold back the largest segment." Both work; one of them is the actual signal.

**Per `docs/INSTRUCTIONS.md` §3: brainstorm before writing.** If `/superpowers:brainstorm` is installed, use it. Otherwise, work through these questions out loud with Jason before drafting any MDX:

1. **The interview moment.** Which conversation does this case study want to engineer? (Screening call, technical depth dive, exec/judgment round?) The framing should be tuned to the moment where it'll actually get read.

2. **The audience.** Which type of hiring manager is the strongest fit for this case? BI hiring manager, product hiring manager, AI/ML-focused recruiter, BizOps lead? Each cares about different signals - and the same project supports different framings depending on which one you optimize for.

3. **The single line.** What's the one sentence about this work that a hiring manager should remember after closing the tab? This becomes the `outcomeHeadline` and almost always the §01 lead sentence.

4. **The judgment beat.** §03 Decision needs a "what I chose NOT to do" callout. Which rejected option, specifically, was the highest-signal? Don't draft until you can name it in one sentence. If you can't, the case isn't ready - go back to Jason for more bullets.

5. **The tradeoff that lands hardest.** §06 Tradeoffs needs 3-4 beats. Which one is the strongest? The one where Jason owns a real limitation or non-obvious mistake is what hiring managers grade product judgment on. Identify that one up front so the section builds toward it instead of treating all tradeoffs as equal.

**Don't proceed to MDX until those five have clear answers.** The intake template captures the facts; this step captures the framing. Skipping it produces case studies that read as "here is what I did" instead of "here is the judgment call I made." The latter is what gets recruiters to reply.

## Step 2 — Voice rules

Inherit everything from `.claude/skills/post-intake/SKILL.md` (or `docs/VOICE.md` if that skill isn't loaded). Three-word voice: **Warm. Curious. Grounded.** No em-dashes, no buzzwords, "I" not "we", plain language, quiet confidence.

**Additional case-study-specific rules:**

- **Numbers BEFORE adjectives.** "Returned ~1,500 hours/year" beats "dramatically improved efficiency." Every claim gets a number with a denominator and time window.
- **The "what I chose NOT to do" beat is non-optional.** Every case study has an `<Aside>` callout in §03 Decision where Jason explains the obvious option he rejected and why. This is where hiring managers grade product judgment.
- **The tradeoffs section is non-optional.** §06 must have 3-4 honest beats. A case study with no tradeoffs reads as a brochure.
- **Audience test (from INSTRUCTIONS.md):** "Would a sharp PM or hiring manager at a Series B startup or Google find this impressive and clear?"

## File location

`content/work/<slug>.mdx`

Slug matches the work-index card slug in `data/work.json` (e.g. `salesforce-case-automation`, `global-crm-analytics-dashboard`, `gtm-launch-2m-connections`).

## Frontmatter (velite-validated)

```yaml
---
title: "Outcome-forward, one line. Max 120 chars."
slug: "lowercase-kebab-case"
outcomeHeadline: "One sentence leading with the headline number. Max 220 chars."
role: "Senior BI Analyst (lead)"   # or Product Strategist, etc.
company: "Indeed"
year: 2024                          # number, 2010-2100
duration: "6 months"
tags: ["BI", "Automation"]          # 1-3 from allowed enum below
metrics:                             # 2-4 metrics for the case-header KPI strip
  - label: "Hours returned"
    value: "~1,500"
    unit: "/year"
collaborators: ["BI Team"]          # optional, teams not names
tools: ["Python", "Salesforce REST API", "Cursor"]   # optional, free-form
status: "Live"                       # Live | Shipped | Sunset | Internal-only
order: 1                             # sort order on /work, descending
draft: false
description: "1-sentence SEO meta description. Falls back to outcomeHeadline."
---
```

**Allowed `tags` enum:** `BI`, `Analytics`, `Product`, `GTM`, `BizOps`, `Automation`, `Operations`, `AI`

**Tools go in the `tools` field**, NOT in tags. Use it for things like Cursor, Claude CLI, Snowflake, Jupyter, SAQL, n8n, OAuth, etc.

## The 7-section body structure

Every case study has these 7 sections, in order, each wrapped in `<CaseSection>` with the correct `views` attribute for the reader view-toggle:

| § | id | views | What goes here |
|---|---|---|---|
| 01 | `headline` | `"all metrics process"` | 60-90 word paragraph. Outcome with number in first or second sentence. |
| 02 | `context` | `"all process"` | Situation in 1 sentence + 2-4 constraints that actually shaped the decision |
| 03 | `decision` | `"all process"` | What was chosen + the obvious option **NOT** chosen (in an `<Aside>` callout) |
| 04 | `process` | `"all process"` | Phases (3-4 typical) + the "almost killed it" moment |
| 05 | `results` | `"all metrics"` | `<MetricCallout>` primary + 3-4 secondary; optionally `<BeforeAfter>` for time-saved cases |
| 06 | `tradeoffs` | `"all process"` | 3-4 beats: would do again, would revisit, would do differently, open question |
| 07 | `artifacts` | `"all"` | `<Stack>` with 3-4 items, usually "available on request" |

## MDX components available

All importable from `@/components/case-study` (and auto-injected via the page wrapper - you can use them directly in MDX without imports):

- `<CaseSection id="..." views="...">` - wraps each of the 7 sections
- `<MetricCallout primary={{label, value, caption?}} secondary={[{label, value}]} />` - the big metric card in §05 Results
- `<BeforeAfter before={{caption, bars: [n], summary?}} after={{...}} />` - bar chart pair for §05 Results (8 bars each, heights 0-100)
- `<Aside label="/ What I chose not to do">...</Aside>` - the §03 callout
- `<Figure src="..." alt="..." caption="..." />` - diagrams (placeholder pattern if no src)
- `<Stack>...</Stack>` - for §07 Artifacts, wraps a markdown list
- `<PullQuote>...</PullQuote>` - sparingly
- `<KPIStrip metrics={...} />` - rarely needed in body (the page already renders frontmatter `metrics`)

## Heading style inside sections

Use raw HTML for section headings to get the accent number prefix matching the design:

```mdx
<h2><span className="num">01</span>The headline</h2>
```

CSS `.case-section h2 .num` colors the number in cobalt accent. Don't use plain markdown `## The headline` - it won't get the numbered prefix.

## §05 Results: which component when

- **Time-saved or before/after process cases** (e.g. Salesforce automation): use both `<MetricCallout>` AND `<BeforeAfter>`. The MetricCallout headlines the annualized return; BeforeAfter shows the shape of the change in bar form.
- **Dashboard / surface / adoption cases** (e.g. SBS dashboard): use `<MetricCallout>` only. Bar charts don't fit "100s of daily users" data well.
- **Product/GTM judgment cases** (e.g. GTM launch): use `<MetricCallout>` with primary outcome + secondary metrics showing breadth. No BeforeAfter.

## Cover chart on the work-index card

Update `data/work.json` for the matching slug. The card cover (`kind: line` or `kind: bar`) should already exist; just verify it points the right direction:

- **Line charts** use 100×50 SVG viewBox. y=0 is the TOP, y=50 is the BOTTOM. So lower y values = higher on screen.
- **For "cumulative" or "growth" metrics**, the line should climb up-and-to-the-right (y values DECREASING from left to right).
- Don't ship a line chart that goes down-and-to-the-right for a positive metric. Even if the underlying number is "manual hours reducing," reframe the chart as "hours saved climbing."

## After drafting

1. Run `pnpm exec velite` to validate the frontmatter against the Zod schema
2. Update `data/work.json` for the corresponding work-index card:
   - Title, outcome (markdown supports `**bold**`)
   - Tags (lowercase, used for filter chips on `/work`)
   - Pills (3 max; suggested format: `["Company", "Year", "Work-Type"]` e.g. `["Indeed", "2026", "AI Automation"]`)
   - Status: `"coming-soon"` → `"live"`
3. Run `pnpm typecheck && pnpm lint && pnpm build` before commit
4. WorkCard renders as a clickable `<a>` link only when `status === "live"` - this happens automatically once you flip the status

## Voice checklist before commit

- [ ] Outcome metric is in `outcomeHeadline` AND first paragraph of §01
- [ ] At least one specific number with denominator and time window
- [ ] §03 has an `<Aside>` with the "what I chose NOT to do" beat
- [ ] §04 has the "almost killed it" moment - the part that almost broke the project
- [ ] §06 Tradeoffs has 3-4 honest beats (not platitudes)
- [ ] Voice: first-person "I", plain language, no em-dashes, no buzzwords
- [ ] Cover chart climbs up-and-to-the-right
- [ ] Work-card pills include the work-type tag

## Useful references

- `content/work/_intake.md` - intake template (worked Salesforce example + blank template)
- `content/work/_template.mdx` - older MDX scaffold, mostly superseded by the intake
- `content/work/salesforce-case-automation.mdx` - flagship case study, the strongest voice example
- `content/work/global-crm-analytics-dashboard.mdx` - dashboard case (no BeforeAfter)
- `content/work/gtm-launch-2m-connections.mdx` - product/GTM judgment case
- `velite.config.ts` - the Work schema (allowed tags, status enum, all validation)
- `docs/VOICE.md` - full voice guide
- `docs/INSTRUCTIONS.md` - content rules + audience framing (FAANG vs. startup)
