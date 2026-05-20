# Personal Site PRD — Jason Vermaelen

**Repo:** `github.com/jvermaelen/personal-site`
**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind · MDX · Vercel
**Builder:** Claude Code + Claude Opus 4.7
**Owner:** Jason Vermaelen
**Status:** Draft v1 — May 2026
**Target launch:** Within 30 days

---

## 0. TL;DR

A personal site for **Jason Vermaelen** — a mid-career BI Analyst II at Indeed pivoting toward **Product Management, Strategy/BizOps, and Senior Analytics** roles. The site replaces the existing repo's site (current `docs/PRD.md` is to be ignored).

The goal is **recruiter inbounds and interview requests** from Seed–Series D startups, AI-native companies, and FAANG. The portfolio's differentiator is that Jason is genuinely a **data person who has shipped product strategy** — most PM portfolios are screenshots of Figma; his can be live SQL, live dashboards, and quantified business outcomes.

Three design directions are proposed: **Safe (Editorial Analyst)**, **Bold (Operating System)**, **Experimental (Dashboard as Portfolio)**. The recommendation is to **build Bold as v1** and use Experimental's dashboard-as-portfolio metaphor for the case-study detail pages.

---

## 1. Why this exists

Jason needs a site that does three things at once:

1. **Convert recruiter inbound** — when a recruiter lands on the site after seeing LinkedIn, they should within 30 seconds understand the role-fit and have an obvious "next step" (email, schedule, download resume).
2. **Be a credible case-study repository** — three flagship case studies that hiring managers can read end-to-end without needing follow-up context. Each one should be defensible in a live interview ("walk me through this project").
3. **Showcase technical range** — the site itself is a portfolio artifact. Next.js + live data + an AI feature = proof Jason isn't just a dashboard-builder, he's a builder.

---

## 2. Research: the 2026 portfolio meta

Based on current Awwwards winners, recruiter surveys, and BI/PM portfolio guides published Jan–May 2026:

### What's working

- **Quality > quantity.** 3–5 deep case studies, not 12 thumbnails. Recruiters read 3–4 in detail at most.
- **Quantified outcomes in the first line.** "Saved 2,000 hours/year" beats "led automation initiative" every time.
- **Live, interactive artifacts.** Embedded dashboards, published notebooks, queryable demos. Portfolios with working things get disproportionately more recruiter inbound than write-up-only sites.
- **Process narrative.** Problem → constraints → approach → tradeoffs → outcome → what I'd do differently. The "tradeoffs" and "what I'd do differently" sections are what hiring managers actually grade.
- **Personality, lightly applied.** Bookshelf, Now page, side hobbies — humanizes the candidate without diluting the professional pitch. Trend: a single personal hook (BJJ black belt, music discovery) referenced once or twice rather than a wall of personal content.
- **AI-native features.** "Ask my résumé" RAG bots and JD-tailored cover-letter generators are now table stakes for technical PM/analyst portfolios at AI-adjacent companies.
- **Command palettes (Cmd+K).** Almost every Site of the Day in 2026 has one. Signals "I build software-grade things."
- **Speed.** Sub-1s LCP. Vercel + Next.js + static MDX is the standard stack.

### What's tired

- Hero with a 3D blob and "Scroll to explore."
- Generic timeline of every job since high school.
- "I am passionate about data-driven decision making."
- Skill tag clouds.
- Light/dark toggle as the only "interactive" feature.
- Notion/Squarespace/Webflow defaults — fine for designers, dilutes the message for someone claiming technical chops.

### Award-winning references for this profile

For a BI/BizOps/PM hybrid, the relevant inspiration is **not** Awwwards Site of the Day 3D portfolios — those are for creative directors. The right references are:

- **Linear's about/careers pages** — dense, monospace, confident, technical-but-readable.
- **Vercel's engineering blog** — editorial restraint, generous type, code-as-content.
- **Brian Lovin's site (brian.lovin.com)** — Now page, bookshelf, writing, side projects — the canonical "product person portfolio."
- **Maggie Appleton's site** — case-study depth, sketch-noted diagrams, garden of essays. Demonstrates "thinks in public."
- **Pudding.cool case studies** — dataviz-led editorial storytelling.
- **Rauno Freiberg's portfolio (rauno.me)** — interaction craft as the proof.

The two anti-patterns to avoid: (1) the agency-style 3D scroll-jacking portfolio (signals "designer pretending to be technical"), and (2) the bare-bones GitHub README site (signals "engineer who doesn't care about communication"). Jason is between those poles — the design system should reflect that.

---

## 3. Audience & user stories

Three reader personas, ranked by frequency:

**P1 — Recruiter (60% of traffic).** Skims for 30 seconds. Wants: current title, target role, salary band signal (seniority), resume PDF, contact. Needs the homepage to answer "is this person worth a recruiter screen" in one viewport.

**P2 — Hiring manager (30% of traffic).** Arrives from recruiter forward or LinkedIn. Wants: depth on 1–2 case studies, evidence of business judgment, sense of personality. Will spend 3–8 minutes if engaged.

**P3 — Peer / network referral (10%).** Wants: writing, side projects, vibe-check. Drives word-of-mouth referrals.

### User stories

- As a **recruiter**, I want to download Jason's resume in one click so I can attach it to a req.
- As a **recruiter**, I want to see his current role and target role clearly so I don't waste a screen on misfit.
- As a **hiring manager**, I want to read a complete case study with metrics and tradeoffs so I can evaluate him before booking time.
- As a **hiring manager at an AI company**, I want to see he's actually used AI tools to build things, not just talked about them.
- As a **peer**, I want to find his writing/projects so I can vouch for him intelligently.

---

## 4. Positioning

### Elevator pitch (homepage hero, ~25 words)

> I've been the data-driven partner to Product, Sales, and Marketing — owning feature prioritization, GTM strategy, and performance analysis. I ship the right decisions, not just more features.

### Subhead / supporting line

> Currently BI Analyst II at Indeed. Previously GTM Product Strategist (Indeed) and BI Analyst (Talroo). Looking for Senior Analytics, BizOps, or Product roles where rigor meets shipping.

### Voice & tone

**Confident, dry, analyst-precise — with a builder's bias toward shipping.** Specifically:

- Numbers before adjectives. ("Saved 2,000 hours/year" not "dramatically improved efficiency.")
- Active verbs. ("Led, built, launched" not "was involved in.")
- Honest about tradeoffs. ("This dashboard saved time, but adoption took 6 months and required two re-trainings.")
- Occasional dry humor in footer/About/Now, never in case studies.
- Never: "passionate," "data-driven decision making" (as a phrase), "synergize," "rockstar," "ninja," any emoji except maybe one in the footer.

---

## 5. Information architecture

```
/                          Home (hero + 3 featured case studies + now + contact CTA)
/about                     Long-form story, photo, BJJ + music sidenote, resume link
/work                      Index of all case studies
/work/[slug]               Case study detail page (MDX)
/now                       What I'm working on / reading / training (updated monthly)
/writing                   Blog index (MDX posts)
/writing/[slug]            Blog post (MDX)
/projects                  Side projects index (with live demos where possible)
/contact                   Contact form + scheduling link + email
/resume.pdf                Direct download
/api/chat                  Edge function for "Ask my résumé" RAG bot
/api/og                    Dynamic OG image generation (per case study)
```

### Sitemap notes

- **No "/services" page** — this is a job-hunt site, not a freelance pitch.
- **No "Press" or "Speaking" page** until there's something to put on it (flag TODO; skip in v1).
- **Footer** carries: email, LinkedIn, GitHub, last-updated timestamp, site source link (GitHub repo — show off that the site itself is open source).

---

## 6. Three design directions

The three options below are intentionally separated by risk level. The recommendation is **Option B (Bold / Operating System)** as the primary build, with Option C's dashboard metaphor applied selectively to case-study detail pages.

### Option A — Safe: "Editorial Analyst"

A calm, magazine-style site with generous whitespace and a slim serif headline face paired with a clean sans body. Single warm accent (terracotta or muted ochre). Influence: *The New York Times Magazine*, Maggie Appleton, Robin Sloan's site, classic editorial restraint.

- **Type:** Newsreader or EB Garamond display + system-ui sans body + JetBrains Mono for meta.
- **Color:** Warm off-white (#f8f5f0-ish, oklch(97% 0.01 80)), ink black, single accent.
- **Motion:** Minimal — only on hover, no scroll-jacking, no entry animations beyond a 200ms fade.
- **Hero:** Big serif name, two-line pitch, link to first case study. Single horizontal rule.
- **Why it's safe:** Mature, signals seniority, won't age. Reads as "I am thoughtful, not flashy."
- **Why it might be wrong:** Doesn't visually signal technical depth. Could read as "PM who writes Medium posts."

### Option B — Bold: "Operating System" *(recommended)*

A Linear/Vercel/Rauno-inspired dual-mode site. Dense without being cluttered. Monospace meta labels, sharp dividers, KPI tiles on the homepage, a Cmd+K command palette as the navigation primitive. Subtle animation on data — counters tick up, charts ease in. Influence: Linear's about pages, Vercel docs, Rauno Freiberg, Brian Lovin.

- **Type:** Geist Sans or system-ui sans + Geist Mono / JetBrains Mono. (Optional restrained serif for case-study pull-quotes.)
- **Color:** True dark mode (#0a0a0a, oklch(15% 0.01 250)) + paper light mode. Single cool accent (electric blue or vibrant green) + a warm "highlight" for KPIs.
- **Motion:** Confident — Framer Motion fades, KPI counters that tick, page transitions, but always sub-300ms.
- **Hero:** Name + role + 4-tile KPI strip ("2K hrs/yr saved · 200+ daily dashboard users · 4 yrs at Indeed · BJJ Black Belt"). Cmd+K hint pinned bottom-left.
- **Why it's right for Jason:** Signals "technical builder," matches the target-company vernacular (Linear/Vercel/Anthropic-style aesthetics are what AI-native and scale-up companies use internally), and frames quantified outcomes as the primary visual element. Plays to his actual strength: numbers.
- **Risk:** Slightly trendy. Mitigate with restraint — no unnecessary glow, no terminal cursor, no "scroll to explore."

### Option C — Experimental: "Dashboard as Portfolio"

The site **is** a BI dashboard. Left sidebar nav with section icons, top-bar with filter chips ("All work / 2023 / 2024 / 2025"), the homepage is a literal KPI dashboard with cards, charts, and a feed of "recent activity" (GitHub commits, blog posts, projects). Case studies open like Tableau workbook pages. Influence: Power BI / Tableau dashboard UI, Datadog homepages, mode.com workspaces.

- **Type:** Tight sans (Geist or system-ui) + monospace for everything numeric.
- **Color:** Light mode primary (BI tools are mostly light), with a single brand color used as Tableau-style data fill.
- **Motion:** Hover-on-chart tooltips, filter transitions, "refresh data" easter egg.
- **Hero:** A real, working dashboard. Filterable. The "Featured Work" tile is itself a chart of project impact ($ saved, users reached, hours back).
- **Why it's exciting:** Nothing else looks like this in the PM/analyst portfolio space. The medium *is* the message — a BI analyst whose portfolio is a BI dashboard. Memorable.
- **Risk:** Could feel gimmicky to a non-data hiring manager (e.g. a generalist PM hiring manager at a consumer startup). Also a much bigger build.
- **Hybrid suggestion:** Don't use this for the whole site. **Use the dashboard metaphor for case-study detail pages** — each case study opens with a "report header" KPI strip and lets the reader filter the narrative ("show me just the metrics" / "show me the process"). This is the recommendation.

### Decision matrix

| Criterion             | A — Editorial | B — Operating System | C — Dashboard |
|-----------------------|:-------------:|:--------------------:|:-------------:|
| Signals seniority     | ★★★           | ★★★                  | ★★            |
| Signals technical     | ★             | ★★★                  | ★★★           |
| Recruiter scan-ability| ★★★           | ★★★                  | ★★            |
| Build effort (weeks)  | 1.5           | 2.5                  | 4+            |
| Memorable             | ★             | ★★                   | ★★★           |
| Ages well             | ★★★           | ★★                   | ★★            |
| **Recommended**       |               | **✓ Primary**        | **✓ Borrow for case studies** |

---

## 7. Page-by-page spec

### Home (`/`)

**Above the fold (single viewport on 14" laptop):**
1. Wordmark "Jason Vermaelen" — top-left.
2. Nav (top-right): Work · Writing · Now · About · Contact. Cmd+K hint inline.
3. Hero: Name + 25-word pitch + current title line.
4. **KPI strip (4 tiles):** "2,000 hrs/yr saved" · "100s of daily dashboard users" · "4 years at Indeed" · "BJJ Black Belt" *(the last tile is intentional — humanizes, and discipline signals reliability)*.
5. Primary CTA: "Read the case studies ↓".

**Below the fold, in order:**
- **Featured Work** — 3 case study cards. Each shows: title, outcome metric in big numerals, one-line problem, role tag (PM/BI/BizOps), year, time-to-read.
- **Now** — 4-line summary of current focus + last-updated date + link to full `/now`.
- **Writing** — latest 3 posts, titles + dates only.
- **Footer** — email, LinkedIn, GitHub, "View source for this site," last-updated timestamp.

### About (`/about`)

Long-form, ~600 words. Structure:
1. The professional arc (Talroo → Indeed BI → Indeed GTM Product Strategist → Indeed BI II → next).
2. How Jason works — the bridge between data and product decisions; specific examples.
3. The personal sidebar (right-rail or end of page): BJJ, music discovery, currently reading. Photo here, not in hero.
4. Resume download button.
5. "What I'm looking for next" — explicit role criteria. Recruiters love this.

### Work index (`/work`)

Reverse-chronological grid of case studies. Filter chips: "PM strategy" · "BI / Analytics" · "Automation" · "All". Each card: title, outcome, year, role. No images required (consider line-art or chart-thumbnail per study).

### Case study detail (`/work/[slug]`)

**Mandatory structure — Claude Code should enforce this template via MDX frontmatter validation.**

Frontmatter:
```yaml
title: "Salesforce CRM Analytics Dashboard for Scaled Business Solutions"
role: "BI Analyst II (lead)"
company: "Indeed"
year: 2024
duration: "6 months"
tags: ["BI", "Analytics", "Operations"]
outcome_headline: "Daily-active dashboard for hundreds of global users; measurably faster sales ops"
metrics:
  - label: "Daily active users"
    value: "100s globally"
  - label: "Adoption ramp"
    value: "6 months to steady state"
collaborators: ["Sales Ops", "Salesforce Admins", "BI Team"]
tools: ["Salesforce CRM Analytics", "SQL", "Tableau"]
status: "Live"
```

Body sections (always, in this order):
1. **The headline** — 1 paragraph, the outcome.
2. **Context & constraints** — what the org was facing, what couldn't change.
3. **The decision** — what I chose to do and what I chose not to do.
4. **Process** — how it was built, who was involved, what went sideways.
5. **Results** — quantified. Specific metrics.
6. **Tradeoffs & what I'd do differently** — non-optional. This section is what hiring managers read for signal.
7. **Artifacts** — screenshots, embedded live demo if possible, links to repo.

### Now (`/now`)

Updated monthly. Inspired by nownownow.com convention. ~150–250 words. Last-updated date prominent.

### Writing (`/writing`, `/writing/[slug]`)

MDX posts in `content/writing/*.mdx`. Reverse-chron list. Tags optional. No comments. No newsletter signup in v1.

### Projects (`/projects`)

Side projects with live demo links where applicable. Stub for now — flag as TODO in v1 if no projects yet.

### Contact (`/contact`)

- Email (mailto link).
- Scheduling link (Cal.com or similar — Jason to provide).
- Optional contact form (Resend or Formspree).
- LinkedIn, GitHub links.
- Note: "I respond within 24 hours on weekdays."

---

## 8. The flagship case studies (initial 3)

Based on the projects Jason provided, these are the three v1 case studies. **All copy below is a draft for Claude Code to refine with Jason's input.**

### Case Study 1 — Salesforce Case Automation
- **Outcome headline:** Automated case assignment and resolution flows that returned ~2,000 hours/year to the team.
- **Role:** BI Analyst II, Indeed.
- **Why this matters in interviews:** Proves Jason ships operational impact, not just dashboards. Strong BizOps signal.
- **Needs from Jason:** Before/after metrics, any architecture diagrams, what got automated specifically, who else was involved.

### Case Study 2 — Salesforce CRM Analytics Dashboard (Scaled Business Solutions)
- **Outcome headline:** Designed, built, and launched a global dashboard now used daily by hundreds of users across Scaled Business Solutions, driving measurable sales ops efficiency.
- **Role:** BI Analyst II (project lead), Indeed.
- **Why this matters in interviews:** Cross-functional leadership, scale (hundreds of users globally), end-to-end ownership from spec to launch to adoption.
- **Needs from Jason:** Screenshots (anonymized if needed), specific efficiency metrics, adoption curve, what features users requested post-launch.

### Case Study 3 — Hiring Events Product Strategy
- **Outcome headline:** Drove a product analysis and POV for Product/GTM leadership that influenced R&D resourcing and long-term strategy for Indeed's hiring events product.
- **Role:** GTM Product Strategist, Indeed.
- **Why this matters in interviews:** The clearest "product manager" signal in the portfolio. Demonstrates ability to operate up — informing exec strategy, not just executing roadmaps.
- **Needs from Jason:** Anything publicly shareable about the framework used, the recommendation, what shipped as a result, lessons learned.

### Future case study TODOs

- Self-built React + real-data dashboard (build for the portfolio itself; doubles as a side project).
- Live SQL playground case study (queryable demo of a public dataset).
- A Jupyter notebook deep-dive on a public dataset (e.g. job market analysis using BLS data — leverages Jason's domain).

---

## 9. Tech stack

**Confirmed:**
- **Framework:** Next.js 15, App Router, React Server Components.
- **Language:** TypeScript, strict mode.
- **Styling:** Tailwind CSS v4 with CSS variables for theming.
- **Content:** MDX files in `/content`. No CMS. `next-mdx-remote` + `gray-matter` for parsing. Optional: `contentlayer2` or `velite` for type-safe content.
- **Hosting:** Vercel.
- **Analytics:** Vercel Analytics + Vercel Speed Insights.
- **Repo:** `github.com/jvermaelen/personal-site`.

**Recommended (Claude Code's call):**
- **UI primitives:** Radix UI (not full shadcn — keep dep surface small, but use shadcn-style copy-paste for specific components like Command palette).
- **Animation:** Motion (formerly Framer Motion) — used sparingly. Bundle-budget < 50KB on this.
- **Icons:** Lucide React.
- **Forms:** React Hook Form + Zod, server actions for submission. Resend for transactional email if contact form is added.
- **OG images:** `next/og` for per-page dynamic OG generation.
- **Search:** No global search in v1. Cmd+K palette is hardcoded routes + recent posts.
- **Linting:** Biome (faster than ESLint+Prettier) or ESLint+Prettier — Claude Code picks.
- **Testing:** Skip in v1 unless trivial. Visual regression via Vercel preview deployments is enough.

**Bundle budget:** Sub-200KB JS for the homepage. Lighthouse 95+ on all metrics. LCP < 1.2s.

### Repo structure (proposed)

```
/app
  /(site)
    page.tsx            # Home
    /about/page.tsx
    /work
      page.tsx          # Index
      /[slug]/page.tsx  # Detail (renders MDX)
    /writing
      page.tsx
      /[slug]/page.tsx
    /now/page.tsx
    /projects/page.tsx
    /contact/page.tsx
  /api
    /chat/route.ts      # AI: ask-my-resume
    /og/route.tsx       # Dynamic OG images
  layout.tsx
  globals.css
/components
  /ui                   # Primitives (Button, Card, KPI, etc.)
  /command-palette      # Cmd+K
  /case-study           # MDX components used in case studies
  /home                 # Home-only components
/content
  /work/*.mdx           # Case studies
  /writing/*.mdx        # Blog posts
  /now.mdx              # Current Now page
/lib
  /mdx.ts               # MDX loaders, frontmatter validators (Zod)
  /og.tsx               # OG image template
  /chat                 # RAG / chat helpers
/public
  resume.pdf
  /images
/data
  resume.json           # Structured resume (single source of truth)
  links.json            # All links/handles
```

---

## 10. AI features

**v1 — ship one feature, ship it well:**

### "Ask Jason" — RAG chat over resume + case studies

A small, persistent button (bottom-right) that opens a chat UI. The model has access to a vector index of Jason's resume, case studies, blog posts, and Now page.

- **Backend:** Vercel Edge Function. Use Anthropic's Claude (Haiku for cost, Sonnet for quality — A/B). Embeddings via OpenAI `text-embedding-3-small` or Voyage. Vector store: Upstash Vector (cheap, edge-compatible).
- **Guardrails:** System prompt restricts to topics about Jason's professional background. Rate limit by IP. No PII collection.
- **UX:** Suggested prompts on open ("What's Jason's strongest case study?" / "Tell me about his Indeed work" / "Is he a fit for a PM role at an early-stage startup?"). Conversation persists in localStorage only.
- **Cost cap:** $20/mo Anthropic budget. Cache common queries.

**v2 — defer:**
- JD-tailored cover letter generator (paste a JD, get a draft cover letter referencing Jason's relevant experience). Cool but adds complexity. Build only if Recruiter inbound conversion is below target after 30 days.

**No AI gimmicks:** No chatbot pretending to be Jason. No emojis from the bot. The bot is a research assistant for the recruiter, not a parasocial sim.

---

## 11. Interactive features

- **Cmd+K command palette** — quick nav to all pages, search recent posts, "download resume," "email me."
- **Light/dark theme toggle** — system-aware default, manual override stored in cookie.
- **Animated KPI counters on hero** — single tick-up animation on first scroll-into-view, never repeats.
- **OG images per page** — dynamically generated, includes page title + Jason's wordmark.
- **"View source" footer link** — direct link to the GitHub repo for the site itself. Strong technical signal.

**Explicitly out of scope:** scroll-jacked animations, page transitions that delay content, custom cursor, music player, 3D anything.

---

## 12. Brand & domain

### Domain

**Recommendation: `jvermaelen.com`** as primary, with `jasonv.co` as a memorable shortlink redirect if Jason wants one. `.com` is non-negotiable for recruiter trust.

Backup candidates if `.com` is taken: `jvermaelen.dev`, `jvermaelen.me`. Avoid `.io` (oversaturated, dating now).

### Wordmark

Set in the body sans, all lowercase, no logo glyph. "jason vermaelen" or just "jv" as a favicon. Resist the urge to design a monogram — restraint is the brand.

### Favicon

`jv` monospace, terracotta accent on dark or vice versa. 32×32 + 180×180 apple-touch.

### Headshot

Single photo on the About page only. Not on the home page. Plain background, looking at camera, ¾ crop. Jason has one already — use it.

---

## 13. Success metrics & analytics

Tracked in Vercel Analytics + a `/admin` dashboard page (gated by env var):

| Metric                                           | Target (90 days post-launch) |
|--------------------------------------------------|------------------------------|
| Unique visitors / month                          | 500+                         |
| Resume downloads / month                         | 30+                          |
| Contact form / email click-throughs / month      | 10+                          |
| Recruiter-initiated outreach (tracked by Jason)  | 5+ qualified / month         |
| Average time on case-study page                  | > 2:00                       |
| Case-study completion rate (scroll to bottom)    | > 40%                        |
| LinkedIn profile view uplift                     | +30% from baseline           |
| Lighthouse performance score                     | ≥ 95                         |

UTM tagging on all outbound shares (LinkedIn, email signatures) so attribution is clean.

---

## 14. Implementation roadmap

**Total: 4 weeks. Build with Claude Code in this order.**

### Week 1 — Foundation
- Repo setup, Next.js 15, Tailwind, TypeScript strict.
- Design tokens (CSS variables for both themes).
- Layout, nav, footer.
- Cmd+K palette skeleton.
- MDX pipeline with frontmatter validation.
- Deploy to Vercel preview on every PR.

### Week 2 — Core content pages
- Home with placeholder case studies.
- About page with real copy.
- Work index page.
- Case study detail template (MDX rendering).
- Now page (initial version).
- Theme toggle.

### Week 3 — Case studies & writing
- Write/import the 3 flagship case studies (Jason supplies raw material, Claude Code drafts in the template).
- Writing index.
- 1–2 seed blog posts.
- Resume PDF + structured `resume.json`.
- Contact page with form (Resend integration if budget allows).

### Week 4 — Polish, AI, launch
- "Ask Jason" RAG chat.
- Dynamic OG images.
- Final pass: copy, motion, accessibility, Lighthouse.
- Domain setup, DNS, SSL.
- Launch on Vercel production.
- Announce on LinkedIn.

---

## 15. Resolved decisions

1. **Assets** — Resume PDF + headshot live in `/public` (`/public/resume.pdf`, `/public/headshot.png`). A backup headshot is at `/public/headshot-alt.jpg`.
2. **Case studies** — **None ship in v1.** Jason will add them post-launch. v1 substitutes a **"Career Highlights"** strip on the homepage built from resume bullets, and `/work` shows a tasteful "Case studies coming soon" state with the highlight strip as a teaser. Reserve the MDX scaffolding so Claude Code can drop them in without a re-architect.
3. **Contact** — Both. Primary email `jason.vermaelen@gmail.com` + Cal.com scheduling link `app.cal.com/jason-vermaelen`. Both on the homepage CTA, About page, Contact page, and footer.
4. **Salary signal** — *Reverted.* Jason opted out. No salary band on the site. Recruiter pre-qualification handled via the explicit "Open to Senior Analytics, BizOps, and Product roles" line and the resume.
5. **Side projects** — Page is stubbed. Render a clean "Building something — check back soon" empty state with a link to GitHub. Do not omit the nav entry; leaving it visible signals intent.
6. **Case-study cover art** — Either generated chart-thumbnails from real data **or** topic-relevant imagery, chosen per case study. Build a `<CaseStudyCover/>` MDX component that takes either `chart={...}` or `image="..."`.
7. **Spotify** — Yes. Wire a "Recently played" component on `/now`. Use the Spotify Web API with a long-lived refresh token (token managed via env vars, not user OAuth). Fall back to a static "Album of the month" if API errors.
8. **BJJ on About** — Explicit paragraph. Draft below; Jason will edit.

### Jason's BJJ copy (use verbatim, lightly edited)

> I started training Brazilian Jiu-Jitsu in 2006 and earned my black belt in 2020. I train at Paragon BJJ in Austin. I love it because it keeps me in great physical shape, keeps me mentally sharp, is genuinely fun, and is easy to keep doing for decades. It's also been an amazing social outlet — I've met hundreds of people and made friends from all walks of life around the world through jiu-jitsu. It's shaped me into the person I am today.

## 16. Resume-derived facts (canonical)

For Claude Code: when populating the homepage, About, and `resume.json`, draw from these resume-confirmed facts (not the older numbers in earlier drafts). All metrics are from Jason's resume:

- **Current title:** Senior Business Intelligence Analyst — Salesforce CRM Analytics, Indeed (2024–present).
- **Previous Indeed role:** Product Strategist — Global Product Commercialization (2022–2024).
- **Prior:** Senior Data Business Analyst, Talroo (2018–2022); Client Success Analyst Team Lead, Talroo (2017–2018).
- **Education:** BA Marketing, Southeastern Louisiana University (2014). MS Data Analytics — Data Science, Western Governors University (in progress).
- **Location:** Austin, TX.
- **Headline metrics** (use these for KPI tiles and Career Highlights):
  - Drove **2M+ employer↔jobseeker connections** via GTM optimization on a new product launch.
  - Brought in **10,000+ new clients** via a 3-month Sales/CS-led marketing promotion.
  - Built a Salesforce CRM Analytics dashboard with **100s of daily users globally** across Scaled Business Solutions.
  - Led a sales automation pilot with **700+ clients**, achieving **2x adoption vs. the control group**.
  - Influenced a new product launch that increased job seeker↔employer connections by **6%**.
  - At Talroo, led a title expansion rollout that lifted a client's clicks by **+50K** and applicants by **+3K Q/Q**, with record low CPA.
  - Grew the Client Success vertical revenue by **20% QoQ** with **95% retention** as team lead at Talroo.
- **Stack he can claim:** SQL (Snowflake), Python, Excel, Salesforce, Salesforce CRM Analytics, Metabase, Jupyter, CRM/sales analytics frameworks (CAC, LTV, churn, ROI, conversion).
- **Phone** is on the PDF resume only — do **not** publish on the site.

---

## 16. Out of scope (v1)

- Newsletter / email subscriptions.
- Comments on blog posts.
- Multi-language.
- A public RSS feed (add in v1.1 if writing picks up).
- E-commerce / shop.
- Talks / speaking page.
- Testimonials page.
- A "uses" page (defer to a blog post if asked).

---

## Appendix A — Aesthetic moodboard references

For Claude Code to study before building:
- linear.app/about
- vercel.com/blog
- brian.lovin.com
- rauno.me
- maggieappleton.com
- pudding.cool (case-study craft, not visual style)
- anthropic.com/news (restraint, type)

## Appendix B — Anti-references

Sites NOT to look like:
- Most Awwwards Site of the Day "creative portfolios" — these are for designers, not analysts.
- Notion-template-as-portfolio sites — fine for entry-level, not for someone targeting Senior+.
- Webflow template sites with 3D blobs or scroll-jacked horizontal scrolling.
- "Hi I'm Jason and I'm passionate about data" generic developer-portfolio template sites.

---

*End of PRD v1. Hand off to Claude Code.*
