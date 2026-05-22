# Case Study Intake

Fill one of these per case study. Bullets, not prose — Claude writes the prose to
match the rest of the site's voice. Plan on ~30–45 minutes per case.

`_intake.md` is excluded from the build (the `_` prefix + `.md` extension keep it
out of velite). Don't ship this file; it's a scratchpad.

---

## What's actually safe to share

Most analyst work is more shareable than it feels.

**Almost always fine:**
- Time/efficiency gains (`~2,000 hours/year returned`)
- Adoption rates (`100% of team by month 6`, `daily-active by hundreds`)
- Speed deltas (`mean time to first touch: 6h → 11min`)
- Volume orders of magnitude (`3× growth over two years`)
- Tools used (Salesforce, Snowflake, Tableau — all public)
- Team structures described abstractly (`a 6-person ops team`)
- Process, methodology, and lessons
- Anything already on the resume or LinkedIn

**Be careful with:**
- Specific revenue numbers
- Customer names or counts
- Internal product names not public-facing
- Exact headcounts that imply company size
- Specific cost figures

**Rule of thumb:** if you could say it in a public conference talk, it can go
on the site. Round and anonymize — `~2,000` not `1,873`. Add denominators
(`/year`, `% of team`). Reads as credible without exposing anything.

---

## Frontmatter — the metadata header

```
TITLE: outcome-forward, one line
  Example: "Salesforce case automation that returned ~2,000 hours/year"

OUTCOME HEADLINE: the lead sentence (under 220 chars)
  One sentence with the headline number — what it does in interview screens.
  Example: "A 6-month internal automation build that returned ~2,000 analyst
  hours per year back to the team via Salesforce case-routing automation."

ROLE / COMPANY / YEAR / DURATION:
  Example: "Senior BI Analyst (lead) / Indeed / 2024 / 6 months"

TAGS: 1–3 from this list (must match the work-index filter):
  BI · Analytics · Product · GTM · BizOps · Automation · Operations

COLLABORATORS (optional, teams not names):
  Example: "Sales Ops, Salesforce Admins, BI Team"

TOOLS (optional):
  Example: "Salesforce CRM Analytics, SQL, Snowflake, Apex flows"

STATUS: Live | Shipped | Sunset | Internal-only

KPI STRIP — 2 to 4 metrics for the report header:
  Each one is { label, value, unit }. Rough numbers are fine.

  Example:
  - Hours returned · ~2,000 · /year
  - Common-path triage · 100% · automated
  - Spec to live · 6 · months
  - Team adoption · 100% · by month 6
```

---

## Body — the 7 sections

### 1. The headline

The "if a recruiter only reads one paragraph, this is the one" paragraph.
~60–90 words. Numbers in the first or second sentence. Active verbs.

**What to provide:**
- What changed? (one sentence, with a number)
- What was the team doing before? (one sentence)
- What does the team do now instead? (one sentence)

### 2. Context & constraints

What was the org facing, and what couldn't change. Only include constraints
that meaningfully shaped the decision.

**What to provide:**
- The situation in one sentence (`A 6-person ops team was hand-triaging
  Salesforce cases every morning. Case volume had grown 3× over two years
  while headcount hadn't.`)
- 2–4 constraints that actually shaped the decision:
  - Vendor lock-in? (`Had to live inside Salesforce — no separate
    orchestration tool.`)
  - Deadline? (`Q4 freeze in month 5 — ship before then or wait until Q2.`)
  - Existing investment that couldn't be replaced?
  - Auditability/reversibility requirements?
  - Team capacity?

### 3. The decision

What was chosen — and, critically, what was **not** chosen. The "not"
section is non-optional. This is where hiring managers grade product
judgment.

**What to provide:**
- The decision in 2–3 sentences. (What did you build? Two parts —
  classifier + resolver? One thing? Why this shape?)
- **What you chose NOT to do.** The obvious option you rejected.
  Example: `I didn't try to automate any case the classifier scored below
  a defensible confidence threshold. The math said it would have added
  ~12% more hours saved, but a wrong auto-close on a real customer issue
  was an order of magnitude worse than a human glancing at it.`

### 4. Process

How it was built, who was involved, what went sideways.

**What to provide:**
- Rough phases (3–4 is typical):
  - Example: `Phase 1: instrumentation only, 6 weeks logging manual
    decisions. Phase 2: shadow-mode rollout, classifier predicts but
    human still decides. Phase 3: 20% live cutover with daily review.
    Phase 4: full cutover with monthly review.`
- **The almost-killed-it moment.** Be specific:
  - Example: `Salesforce Apex flow limit nobody had hit before. In
    hindsight, I'd have done the limit math during the spec.`
- Who was involved (teams, not names): `BI Team, Sales Ops, SFDC Admins`

### 5. Results

Quantified. Specific. Sourced where possible (which dashboard, which
query, which time window). Avoid percentages without denominators.

**What to provide:**

A. **Primary metric** with denominator and time window.
   - Example: `~2,000 hrs/year, measured against pre-rollout 6-week baseline`

B. **3–4 secondary metrics** (these populate the MetricCallout):
   - Example:
     - Common-path triage: 100% automated
     - Auto-close accuracy: 99.4% (sampled)
     - Mean time to first touch: 6h → 11min
     - Adoption: 100% of team by month 6

C. **(Bonus) Before/After chart data.** If you can give rough proportions
   (8 bars before, 8 after) that show the shape of the change, Claude can
   generate the chart from bar heights. Just give relative numbers.
   - Example:
     - Before — weekly manual triage hrs: 38, 40, 36, 42, 38, 40, 37, 39
     - After  — weekly manual triage hrs: 12, 10, 8, 6, 4, 5, 4, 4

### 6. Tradeoffs & what I'd do differently

**Non-optional section.** Hiring managers read this closely; recruiters
skip it but hiring managers do not.

**What to provide** — pick at least 3 of the 4:

- **The tradeoff I'd make again.** What worked, even if it cost time?
  Example: `Shadow mode before live cutover. The 6-week shadow phase
  felt slow at the time. In hindsight it was the cheapest insurance
  policy in the whole project.`

- **The tradeoff I'd revisit.** What was a 60/40 call you'd reopen?
  Example: `Apex flow limits. I treated platform constraints as a
  "we'll find out when we get there" problem. Spec them up front next time.`

- **What I'd do differently if I started over.** Order of operations, scope,
  team composition.
  Example: `Ship the dashboards first, the automation second. We shipped
  the routing flow before the analytics view, which meant for the first
  six weeks people had to take my word that it was working.`

- **The open question.** What would you want a peer reviewer to push back on?
  Example: `The ML-assisted bucket is opaque. As volume scales, I'd want
  to swap it for something more interpretable, even at a small accuracy cost.`

### 7. Artifacts

Anything publicly shareable. Live demos > screenshots > write-ups. Even
purely internal artifacts add credibility just by being named.

**What to provide:** 3–6 items, format `{ label, kind, meta }`:
- `Live dashboard — anonymized read-only view` · internal · request access
- `Architecture notes — Notion` · 15 min read
- `SQL queries — GitHub gist` · 8 queries
- `Walkthrough recording — Loom` · 12 min

For each: if there's a URL you can share, give it. Otherwise just label
the artifact and Claude will format it correctly.

---

## Worked example — Salesforce case automation

This is what a filled-in intake looks like. Most of this content is already
implied by the work-index card; this is just expanding it into the 7-section
shape.

```
TITLE: Salesforce case automation that returned ~2,000 hours/year to the team.
OUTCOME HEADLINE: A 6-month internal build on top of Salesforce. Replaced
  manual case triage with a routing layer that handles the common path
  automatically — letting the team's analysts spend their time on the cases
  that actually need human judgment.
ROLE / COMPANY / YEAR / DURATION: Senior BI Analyst (lead) / Indeed / 2024 / 6 months
TAGS: BI, Automation, Operations
COLLABORATORS: BI Team, Sales Ops, SFDC Admins
TOOLS: Salesforce CRM Analytics, Apex flows, SQL, Snowflake
STATUS: Live

KPI STRIP:
  - Hours returned · ~2,000 · /year
  - Common-path triage · 100% · automated
  - Spec to live · 6 · months
  - Adoption · 100% · of team by mo. 6
```

### Body bullets

1. **Headline:** Six-person ops team spent most of every morning hand-triaging
   Salesforce cases. Replaced the ritual with a routing flow that does the
   routine work automatically. Returns ~2,000 analyst hours/year for cases
   that actually require judgment.

2. **Context:**
   - 6-person team supports Scaled Business Solutions globally
   - Case volume grew 3× over two years; headcount didn't
   - Constraint: had to live inside Salesforce (no separate orchestration tool)
   - Constraint: every automated decision had to be reviewable + reversible
   - Constraint: couldn't change the case data model — only the flows on top
   - Constraint: Q4 freeze in month 5; ship before then or wait until Q2

3. **Decision:**
   - Built two parts: a classifier (rules-based + small ML-assisted bucket
     for "doesn't match a known pattern") and a resolver (templated responses
     + auto-close for high-confidence cases)
   - Everything below threshold routed to a human with a recommended owner
   - **Didn't:** auto-close borderline cases. Math said +12% hours saved.
     Cost of a wrong auto-close was an order of magnitude worse than a
     human glance. Conservative threshold is why the team trusted it in
     month 2 instead of month 8.

4. **Process:**
   - Phase 1: 6 weeks of instrumentation only — logged every manual decision
   - Phase 2: shadow mode — classifier predicts, human decides, measured agreement
   - Phase 3: 20% live cutover with daily review
   - Phase 4: full cutover with weekly → monthly review
   - Almost killed it: Salesforce Apex flow limit nobody had hit before.
     Worked around it, in hindsight should've done the limit math during spec.

5. **Results:**
   - ~2,000 hrs/year (vs. pre-rollout 6-week baseline)
   - 100% common-path triage automated
   - 99.4% auto-close accuracy (sampled)
   - Mean time to first touch: 6h → 11min
   - 100% team adoption by month 6
   - Before bars: 38, 40, 36, 42, 38, 40, 37, 39 (weekly manual triage hrs)
   - After bars:  12, 10, 8, 6, 4, 5, 4, 4

6. **Tradeoffs:**
   - Would do again: shadow mode before live cutover
   - Would revisit: Apex flow limits — spec them up front
   - Would do differently: ship the dashboards first, then the automation
   - Open question: ML-assisted bucket is opaque. As volume scales, swap
     for something more interpretable even at a small accuracy cost.

7. **Artifacts:**
   - Live dashboard (anonymized read-only) · internal · request access
   - Architecture notes (Notion) · 15 min read
   - SQL queries (GitHub gist, sanitized) · 8 queries
   - Walkthrough recording (Loom) · 12 min

---

## Blank template — copy this per case study

Copy everything between the rules below into a new file when you start a
case study. Fill in the bullets, hand to Claude, get the MDX back.

---

```
TITLE:
OUTCOME HEADLINE:
ROLE / COMPANY / YEAR / DURATION:
TAGS:
COLLABORATORS:
TOOLS:
STATUS:

KPI STRIP:
  -
  -
  -
  -
```

### 1. Headline
-

### 2. Context & constraints
- Situation:
- Constraint:
- Constraint:
- Constraint:

### 3. Decision
- What I built:
- **What I chose NOT to do:**

### 4. Process
- Phase:
- Phase:
- Phase:
- Almost-killed-it moment:

### 5. Results
- Primary metric (with denominator + time window):
- Secondary:
- Secondary:
- Secondary:
- Before/after bars (8 + 8, relative heights):

### 6. Tradeoffs
- Would do again:
- Would revisit:
- Would do differently:
- Open question:

### 7. Artifacts
-
-
-

---

## Notes

- For the **second and third case studies** (Global CRM Analytics dashboard,
  Hiring Events strategy / GTM-launch), you don't need to be as exhaustive as
  the Salesforce example — that one's the flagship. Aim for the same shape
  but feel free to be lighter on detail where it matters less.
- If a section genuinely doesn't apply (e.g. no "almost killed it" moment),
  flag it and Claude will adapt — but push hard before skipping. The
  unflattering details are what make the case study credible.
- Charts: rough proportions are fine. Eight numbers that show the SHAPE of
  the change is all Claude needs to generate the BeforeAfter component.
```
