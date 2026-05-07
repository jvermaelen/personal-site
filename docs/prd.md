# Personal Website PRD — Jason Vermaelen

**Owner:** Jason Vermaelen
**Last updated:** May 7, 2026
**Target build:** Next.js (App Router) on Vercel, repo at `github.com/jvermaelen/git-repo`
**Intended builders:** Claude Design + Claude Opus 4.7
**Timeline:** 2–4 weeks to polished v1

---

## 1. Background & Goal

Jason is a Senior Business Intelligence Analyst at Indeed (Austin, TX) actively interviewing for his next role. His target roles are **BI Analyst, GTM Analytics, BizOps, and Sales Ops** at early-stage to Series B–D tech companies (open to other industries), preferably remote with Austin as a fallback.

The goal of this site is **to convert hiring managers and recruiters into interviews.** It is a sales tool, not a creative portfolio.

### Success metrics

- **Primary:** Interviews booked attributable to the site (tracked via mentions in outreach replies and recruiter notes).
- **Secondary:** Resume download events, contact-link clicks, and case study completion rate (Vercel Analytics events).
- **Tertiary:** Time on case study pages (signal that the storytelling is landing).

### Non-goals

- Not a design/creative showcase. No 3D, no scroll-jacking, no hero animations.
- Not a blog-first site. Writing is supported but secondary to case studies.
- Not a CMS-backed system. Content lives in MDX in the repo.
- Not optimized for mobile-only — desktop is where hiring managers actually read.

---

## 2. Audience & Positioning

### Target reader

A hiring manager or recruiter at an early-stage to Series B–D tech company, scanning the site in 30–90 seconds before deciding whether to reach out or move on. They care about:

1. Can this person ship?
2. Have they actually moved a number?
3. Will they be useful in week one, not month three?

### Positioning statement (working draft — Jason to confirm)

> Senior BI analyst who's shipped GTM strategy, product commercialization, and one of the world's largest Salesforce CRM Analytics implementations. I build the dashboard, design the motion, and talk to the rep using it.

### What makes Jason hireable (the throughline)

- **Started in Client Success** (CSA Team Lead at Talroo), so he knows what reps actually need from a dashboard.
- **Moved into BI/Analytics** at Talroo, then to Product Strategist at Indeed, then to Senior BI Analyst on one of the largest Salesforce CRM Analytics implementations in the world.
- **Has shipped revenue impact, not just reports:** 10K+ new clients from a sales pilot, 2M+ employer-jobseeker connections from a GTM strategy, 50K-click lift on a single client rollout, 2x adoption on a product pilot.
- **Speaks all three languages:** SQL/Python (data), Salesforce/CRM Analytics (operational), and exec/sales (communication).

---

## 3. Information Architecture

Five top-level routes. No mega-menu, no dropdowns.

```
/                  → Home / About
/work              → Work experience (resume page)
/case-studies      → Index of case studies
/case-studies/[slug] → Individual case study
/writing           → Blog index
/writing/[slug]    → Individual post
/contact           → Contact (or anchor on home — see §6)
```

### Global elements

- **Header:** Name (links home), nav links (Work, Case Studies, Writing, Contact), system-aware theme indicator.
- **Footer:** Copyright, last updated date, GitHub source link, LinkedIn / GitHub / X icons.

---

## 4. Page-by-Page Spec

### 4.1 Home (`/`)

**Purpose:** Land the pitch in 10 seconds. Push the reader to a case study or contact.

**Sections (in order):**

1. **Hero**
   - H1: Name.
   - Subhead: One-sentence positioning (the differentiator from §2).
   - Microcopy: Location (Austin, TX) + availability status (e.g., "Open to BI / GTM Analytics / BizOps / SalesOps roles — remote preferred").
   - Two CTAs: "See case studies" (primary) and "Get in touch" (secondary, mailto).

2. **Selected work / case study cards** (3–4 cards)
   - Each card: project title, one-line outcome with a number, tags (e.g., "Salesforce CRM Analytics · GTM · SQL").
   - Card hover state: subtle elevation, accent-color underline on title.

3. **About** (3–4 short paragraphs)
   - Career arc in plain English.
   - Tools / stack (rendered as a simple chip list, not a logo wall): SQL (Snowflake), Python, Salesforce CRM Analytics, Metabase, Excel, Jupyter.
   - Currently pursuing MS in Data Analytics – Data Science at WGU.

4. **Recent writing** (3 most recent posts, optional — hide section if no posts yet)

5. **Contact strip** — email + LinkedIn + GitHub.

### 4.2 Work (`/work`)

**Purpose:** The resume page. Optimized for skimming.

**Layout:** Single column, reverse-chronological. Each role:

- Company, location, dates (right-aligned)
- Role title (bolded)
- 1-sentence role summary
- 3–6 bulleted accomplishments, each leading with a verb and ending with a number where possible
- Tools used at that role (chip row at the bottom of each entry)

**Roles to include (from resume):**

- Indeed — Senior BI Analyst, Salesforce CRM Analytics (2024–Present)
- Indeed — Product Strategist, Global Product Commercialization (2022–2024)
- Talroo — Senior Data Business Analyst (2018–2022)
- Talroo — Client Success Analyst Team Lead (2017–2018)

**Education section** at the bottom:
- WGU — MS, Data Analytics – Data Science (in progress)
- Southeastern Louisiana University — B.A., Marketing (2014)

**No PDF resume download in v1** (Jason chose mailto + links over PDF). Add later if recruiters ask.

### 4.3 Case Studies (`/case-studies`)

**Purpose:** Show, don't tell. This is the most important content on the site.

**Index page:** Grid or list of case study cards, same component as the home featured cards.

**Individual case study template** (`/case-studies/[slug]`):

Each case study follows a strict structure so they're easy to write and easy to scan:

1. **Title** — Outcome-led, not project-led. Good: "Cut forecast variance from 18% to 6% on $X pipeline." Bad: "Salesforce dashboard project."
2. **TL;DR card** — 3 lines: Problem · Approach · Outcome. Pinned at the top, scannable in 5 seconds.
3. **Context** — What was the company, what was the team, what was the actual business problem.
4. **Approach** — What Jason did, in plain English. SQL/dashboard/process changes. Include collapsed code snippets where they earn their place (a SQL query, a DAX measure, a Python snippet). Don't include code as decoration.
5. **Outcome** — Numbers. Always numbers. If a number is sensitive, use directional language ("reduced X by ~30%") rather than skipping the metric.
6. **What I'd do differently** — Short, honest section. Signals seniority and self-awareness. 2–3 sentences.
7. **Tools** — Chip row at the bottom.

**Case studies to write (ranked by signal-to-effort):**

1. **Salesforce CRM Analytics dashboard launch (Indeed, 2024–present)** — "Built and launched a Salesforce CRM Analytics dashboard now used daily by hundreds of users globally."
2. **GTM strategy for new product launch (Indeed, 2022–2024)** — "Drove 2M+ employer-jobseeker connections through GTM optimization."
3. **Sales automation pilot (Indeed)** — "Doubled product adoption vs. control in a 700+ client pilot."
4. **Title expansion rollout (Talroo, 2018–2022)** — "+50K clicks, +3K applicants, record-low CPA for a high-profile client through a targeted feature rollout."
5. **CS team lead → revenue lift (Talroo, 2017–2018)** — "Grew vertical revenue 20% QoQ with 95% retention while leading a 5-person CS team."

V1 ships with at least 2 case studies live. The other 3 ship as drafts and get added in week 3–4.

### 4.4 Writing (`/writing`)

**Purpose:** Demonstrate thinking. Posts should be short essays on analytics craft, GTM, BI tooling — not life updates.

**Index:** Reverse-chronological list. Each entry: title, date, 1-line description, reading time.

**Post template:**
- Title, date, reading time
- Body (MDX)
- "Get in touch" footer (email + LinkedIn)

**v1 ships with 0–2 posts.** This section is optional at launch and can be hidden from nav if empty.

**Search across blog posts:** Required (from Jason's nice-to-haves). Implement client-side search with a simple in-memory index built at build time (e.g., FlexSearch or a hand-rolled fuzzy match against post frontmatter). No server search infra needed.

### 4.5 Contact (`/contact` or anchor)

**Purpose:** Make it stupid-easy to reach out.

**Content:**
- One-sentence "what I'm looking for" (mirrors the home hero availability line)
- Mailto link (large, obvious)
- LinkedIn, GitHub, X links
- "Based in Austin, TX — open to remote"

**v1 implementation:** A `/contact` page is fine; alternately, contact can be a footer/strip on every page and `/contact` redirects to home with `#contact` anchor. Recommendation: build a `/contact` page so it's linkable from outreach emails.

---

## 5. Design Direction

### Visual style

**Editorial-minimal with subtle data-forward touches.** This is the right register for analyst roles in 2026 — award-winning creative portfolios (3D, brutalist, scroll-jacking) signal "I want a creative dev job" and actively hurt analyst applications.

### Specific design decisions

- **Typography:** One serif or grotesque for headings (e.g., Inter Display, GT Sectra, Söhne), one clean sans for body (Inter, Söhne, system stack), one mono for numbers and code (JetBrains Mono, IBM Plex Mono).
- **Color:** Near-black on near-white in light mode; near-white on near-black in dark mode. **One accent color** for links and primary CTAs. Recommend a confident but not loud accent (e.g., a saturated blue, a desaturated green, or a warm orange — Jason picks during design phase).
- **Layout:** Generous whitespace. Single-column or 12-col grid with content max-width ~720–880px for prose, wider only for case study hero images.
- **Theme:** **Auto / system-preference only** (Jason's choice). No user-toggleable theme switcher in v1.
- **Numbers:** Render key metrics in a slightly larger, mono or tabular-figures font. Numbers should feel like numbers.
- **Data visualization:** Allow inline charts in case studies (sparklines, simple bar charts, before/after callouts). Keep them minimal — no Tableau-grade dashboards inside the site. Recommend Recharts or a lightweight handcoded SVG approach.

### What to explicitly avoid

- Hero animations, scroll-jacking, custom cursors, page transitions.
- Logo walls of "tools I know."
- Stock photography.
- Testimonial carousels.
- Dark UI for the sake of looking technical.

### Accessibility

- WCAG AA contrast minimum.
- Keyboard-navigable nav and case study cards.
- All interactive elements have visible focus states.
- Alt text on every image.
- Reduced-motion media query respected.

---

## 6. Technical Spec

### Stack

- **Framework:** Next.js 15+ (App Router, RSC by default).
- **Language:** TypeScript, strict mode.
- **Styling:** Tailwind CSS v4. Optional: a small set of CSS variables for design tokens (color, spacing, typography scale).
- **Content:** MDX files in repo. Use `@next/mdx` or `contentlayer2` for type-safe content; lean toward `@next/mdx` + a small custom frontmatter parser to keep deps minimal.
- **Search:** FlexSearch (client-side), index built from MDX frontmatter at build time.
- **Charts (for case studies):** Recharts, only loaded on pages that need it.
- **Analytics:** Vercel Analytics + Vercel Speed Insights.
- **Deployment:** Vercel, free tier, `*.vercel.app` subdomain.
- **Hosting (repo):** GitHub at `github.com/jvermaelen/git-repo`.

### Repo structure

```
/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    # Home
│   ├── work/page.tsx
│   ├── case-studies/
│   │   ├── page.tsx                # Index
│   │   └── [slug]/page.tsx         # Dynamic case study route
│   ├── writing/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── contact/page.tsx
│   ├── sitemap.ts
│   ├── robots.ts
│   └── opengraph-image.tsx
├── content/
│   ├── case-studies/
│   │   ├── salesforce-crm-analytics.mdx
│   │   ├── gtm-product-launch.mdx
│   │   └── ...
│   └── writing/
│       └── ...
├── components/
│   ├── nav.tsx
│   ├── footer.tsx
│   ├── case-study-card.tsx
│   ├── metric.tsx                  # Big-number component
│   ├── chip.tsx                    # Tool/tag chip
│   └── search.tsx                  # Client-side blog search
├── lib/
│   ├── content.ts                  # MDX loading helpers
│   └── search-index.ts
├── public/
│   └── ...
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

### SEO requirements (Jason's nice-to-have list)

- **Meta tags:** Title, description, canonical, OG image per route. Use Next.js Metadata API.
- **Sitemap:** Auto-generated from MDX file list via `app/sitemap.ts`.
- **robots.txt:** Allow all, point to sitemap.
- **OG images:** Dynamic per case study and writing post via `opengraph-image.tsx`. Use Next.js's built-in OG image generation. Template: dark background, large title, small "jvermaelen.vercel.app" footer, accent-color rule.
- **Structured data:** `Person` schema on home, `Article` schema on writing posts, `CreativeWork` on case studies.

### Performance targets

- Lighthouse score ≥ 95 on all pages (Performance, Accessibility, Best Practices, SEO).
- Core Web Vitals: LCP < 2.0s, CLS < 0.05, INP < 200ms on a mid-tier laptop on cable.
- All pages statically rendered (SSG); no SSR needed for v1.

### Browser support

Modern evergreen browsers (last 2 versions of Chrome, Firefox, Safari, Edge). No IE.

---

## 7. Content Plan

Jason needs to write content. The site shell can be built in parallel.

### v1 launch content (must-have)

- Home page copy (hero, about, contact strip)
- Work page (already mostly written — port from resume)
- 2 case studies, fully written
- Contact page

### Week 3–4 additions

- 3 more case studies
- 1 writing post (optional — sets up the blog as live, not empty)

### Case study writing template

A `case-study-template.mdx` should live in `/content/case-studies/` (gitignored or marked draft) with the structure from §4.3 prefilled, so Jason can copy it for each new study.

---

## 8. Build Plan

### Phase 1 — Setup & shell (Days 1–3)

- Initialize Next.js 15 + TS + Tailwind v4 in the existing GitHub repo.
- Set up MDX loading and a minimal content type system.
- Build the layout shell: header, footer, container, theme tokens.
- Deploy to Vercel and confirm the `*.vercel.app` subdomain works.
- Wire Vercel Analytics + Speed Insights.

### Phase 2 — Core pages (Days 4–8)

- Home page (hero, featured cards, about, contact strip).
- Work page (port resume content).
- Case studies index + dynamic route + 1 placeholder case study end-to-end.
- Writing index + dynamic route + 1 placeholder post end-to-end.
- Contact page.

### Phase 3 — Polish & content (Days 9–18)

- Real case study content (2 minimum for launch).
- Dynamic OG images.
- Sitemap, robots, structured data.
- Search across blog posts.
- Accessibility pass (keyboard nav, focus states, alt text, contrast).
- Lighthouse pass (target ≥95 on all pages).

### Phase 4 — Launch & iterate (Days 19–28)

- Soft launch — share with 3–5 trusted contacts for feedback.
- Add remaining 3 case studies.
- Iterate on copy based on feedback.
- Public launch (LinkedIn post, X post, recruiter outreach mentions site).

---

## 9. Open Questions / Decisions for Jason

1. **Confirm the differentiator** — accept the working draft from §2, or rewrite it.
2. **Pick an accent color** during the design phase (or trust the designer to propose 2–3).
3. **Custom domain** — `vermaelen.com` and similar are likely available and cost ~$12/yr. Strong recommendation to grab one before launch even if Vercel subdomain ships first; switching later costs nothing but losing inbound link equity is annoying.
4. **PDF resume** — confirm staying with mailto-only, or add a downloadable PDF in v1.
5. **X (Twitter) presence** — is there an active handle to link to, or skip?

---

## 10. Out of Scope for v1

- CMS integration
- Newsletter signup
- Comments on blog posts
- View counts / reading-time analytics on posts
- Custom domain (deferred per Jason's choice)
- RSS feed (Jason didn't select this)
- Speaking / Press section
- Side projects section
- Multi-language support

These are all reasonable v2+ additions if the site proves valuable.
