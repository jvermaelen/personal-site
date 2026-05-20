# Handoff to Claude Code

This document explains everything Claude Code needs to build the production site from the design references in this project. **The PRD (`PRD.md`) is the source of truth.** This file is just the bridge between the PRD and what's already been designed.

---

## What you're building

A personal portfolio site for **Jason Vermaelen** — Senior BI Analyst at Indeed, targeting Senior Analytics, BizOps, and Product roles at Seed–Series D startups, AI-native companies, and FAANG.

Tech stack (confirmed per PRD section 9):
- **Next.js 15** (App Router, React Server Components)
- **TypeScript** (strict)
- **Tailwind CSS v4** (with CSS variables for theming)
- **MDX** for content (next-mdx-remote + gray-matter, or contentlayer2/velite for type-safe content)
- **Vercel** hosting + Analytics
- **Repo:** `github.com/jvermaelen/personal-site`

Domain: **`jvermaelen.com`**

---

## What's already designed

Every page on the site has a working HTML design reference in `/design-reference/`. These are **not** production code — they're visual + interaction specs. Port them faithfully to React/Next.js, then discard.

| Design reference | Ports to | Notes |
|---|---|---|
| `Homepage Preview.html` | `app/page.tsx` | Hero + circular headshot + KPI strip + Highlights + Now excerpt + beefy contact strip |
| `About Preview.html` | `app/about/page.tsx` | Career arc + 3 principles + "the next chapter" criteria + BJJ paragraph + resume CTA |
| `Now Preview.html` | `app/now/page.tsx` | 6 sections + sticky Spotify "Recently played" sidebar + currently-reading card + changelog |
| `Work Index Preview.html` | `app/work/page.tsx` | 6-card grid (charts as covers) + filter chips + coming-soon empty state + highlights rail |
| `Case Study Preview.html` | `app/work/[slug]/page.tsx` | Report-header KPI strip + 7-section body + reader view-mode toggle (Full/Metrics/Process) |
| `Writing Preview.html` | `app/writing/page.tsx` | Long-form post list + filter chips + on-deck queue (combined writing + projects) |
| `404 Preview.html` | `app/not-found.tsx` | "Query returned 0 rows" + SQL terminal card + 2×2 recovery grid |
| `OG Image Preview.html` | `app/api/og/route.tsx` | 4 OG card variants — read the comment block at the top of the file for next/og wiring |

---

## Source of truth files (these are production, not references)

These are real data files. Port their paths into the final repo as-is.

| File | Goes to | Purpose |
|---|---|---|
| `data/resume.json` | `data/resume.json` | Canonical resume data. JSONResume-schema-compliant + two extensions (`targetRoles`, `headlineMetrics`). All pages should READ FROM THIS — don't duplicate resume content inline. |
| `content/work/_template.mdx` | `content/work/_template.mdx` | Case-study scaffold. Frontmatter is Zod-validatable; spec lives in the comment block. Drop a copy as `<slug>.mdx`, fill, flip `draft: false`. |
| `favicon.svg` | `public/favicon.svg` | SVG favicon with auto dark/light via `prefers-color-scheme`. |
| `headshot.png` | `public/headshot.png` | Hero headshot. **Currently 591×586 — not retina-crisp at 380px hero size. Expect a higher-res replacement from Jason.** |

---

## Component scaffolds (port, don't copy)

These two JS files are vanilla-JS implementations of features that need to be ported to React components. Each one has a **handoff doc as a comment block at the top of the file** — read it before porting.

| File | Ports to | Key specs |
|---|---|---|
| `command-palette.js` | `components/CommandPalette.tsx` | Cmd+K palette. Routes, filter behavior, theme-toggle delegation, action dispatch via custom events. Use `cmdk` or `shadcn-cmdk` for the React rebuild. |
| `ask-jason.js` | `components/AskJason.tsx` + `app/api/chat/route.ts` | Floating chat button + RAG chat panel. Comment block at top has the full Vercel Edge + Upstash Vector + Anthropic spec. **Replace the `window.claude.complete` demo call with `fetch('/api/chat', …)`** wiring to a real Edge route. |

---

## Proposed repo structure

```
personal-site/
├── app/
│   ├── (site)/
│   │   ├── page.tsx                ← Homepage Preview
│   │   ├── about/page.tsx          ← About Preview
│   │   ├── work/
│   │   │   ├── page.tsx            ← Work Index Preview
│   │   │   └── [slug]/page.tsx     ← Case Study Preview (renders MDX)
│   │   ├── writing/
│   │   │   ├── page.tsx            ← Writing Preview
│   │   │   └── [slug]/page.tsx     ← Writing post detail (renders MDX)
│   │   ├── now/page.tsx            ← Now Preview
│   │   └── not-found.tsx           ← 404 Preview
│   ├── api/
│   │   ├── chat/route.ts           ← Ask Jason RAG (Edge)
│   │   ├── og/route.tsx            ← Dynamic OG images (Edge, next/og)
│   │   └── spotify/recent/route.ts ← Now page Spotify feed (Edge, 5-min cache)
│   ├── layout.tsx
│   └── globals.css                 ← extract CSS variables from any preview <style> block
├── components/
│   ├── ui/                         ← Button, Card, KPI tile, Chip primitives
│   ├── command-palette/            ← from command-palette.js
│   ├── ask-jason/                  ← from ask-jason.js (+ chat route)
│   ├── case-study/                 ← MDX components: KPIStrip, MetricCallout, BeforeAfter, etc.
│   └── now/
│       └── SpotifyRecent.tsx       ← Server Component, see spec in Now Preview.html
├── content/
│   ├── work/
│   │   └── _template.mdx           ← scaffold (already provided)
│   ├── writing/                    ← MDX posts (none yet)
│   └── now.mdx                     ← /now copy (currently inline in Now Preview.html — extract)
├── data/
│   └── resume.json                 ← already provided, canonical
├── public/
│   ├── favicon.svg                 ← already provided
│   ├── headshot.png                ← already provided (expect higher-res swap)
│   └── resume.pdf                  ← Jason provides
├── design-reference/               ← all *Preview.html files — keep for visual reference, do not ship
├── PRD.md
├── HANDOFF.md                      ← this file
└── README.md
```

---

## Design system tokens (extract to `globals.css`)

The CSS custom properties are duplicated across every preview HTML's `<style>` block. Extract them ONCE to `app/globals.css`. They use the same names already, so substitution is mechanical.

```css
:root {
  /* Dark (default) */
  --bg: #0a0a0a; --bg-elev: #111111; --bg-elev-2: #161616;
  --line: #1f1f1f; --line-strong: #2a2a2a;
  --ink: #ededed; --ink-soft: #cfcfcf; --muted: #9a9a9a; --muted-soft: #6e6e6e;
  --accent: oklch(78% 0.18 250);   /* cobalt — lifted for dark */
  --accent-ink: #0a0a0a;
  --reverse-bg: #ededed; --reverse-ink: #0a0a0a;
}

[data-theme="light"] {
  --bg: #fafaf7; --bg-elev: #ffffff; --bg-elev-2: #f4f3ee;
  --line: #e6e4dd; --line-strong: #d5d2c9;
  --ink: #111111; --ink-soft: #2e2e2e; --muted: #595959; --muted-soft: #7c7c7c;
  --accent: oklch(44% 0.18 250);   /* cobalt — committed accent */
  --accent-ink: #ffffff;
  --reverse-bg: #0a0a0a; --reverse-ink: #ededed;
}
```

All grey values are tuned to hit **WCAG AA contrast** in both themes. Don't drift from these without re-checking ratios.

Type stack:
- `--sans`: `ui-sans-serif, system-ui, -apple-system, "Helvetica Neue", "Segoe UI", Helvetica, Arial, sans-serif`
- `--mono`: `"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace`

Load JetBrains Mono via `next/font/google` in `app/layout.tsx` for performance + zero-CLS.

---

## Implementation roadmap (4 weeks per PRD section 14)

**Week 1 — Foundation**
Repo + Next.js 15 + Tailwind + TS strict. Extract tokens to globals.css. Build shared `<Nav/>` and `<Footer/>` components. Port `command-palette.js` → React component (use `cmdk`). Set up MDX pipeline with Zod-validated frontmatter. Deploy to Vercel preview on every PR.

**Week 2 — Core content pages**
Homepage, About, Now, Work Index, 404 — port from the design references. Theme toggle (cookie-backed). Wire `data/resume.json` into the pages that need it (KPI strip, About arc, headline metrics). Read the Spotify component spec in `Now Preview.html` and build `SpotifyRecent.tsx` + `/api/spotify/recent`.

**Week 3 — Case studies + writing**
Case Study detail page from MDX. Write/draft the 3 flagship case studies in collaboration with Jason. Writing index. 1–2 seed blog posts. Resume PDF + structured resume.json wired up.

**Week 4 — Polish, AI, launch**
Ask Jason chat (port `ask-jason.js` → React + Edge API route, wire RAG). Dynamic OG images (port `OG Image Preview.html` templates to `next/og`). Final pass: copy, motion, accessibility, Lighthouse. Domain + DNS + SSL. Launch.

---

## Things you'll need from Jason

Ask him for these as you hit them:

1. **Real case study content** for the 3 flagship studies (Salesforce automation, Global CRM dashboard, Hiring Events strategy). Bullets, before/after metrics, any publicly-shareable artifacts. The MDX template in `content/work/_template.mdx` has the structure.
2. **Higher-res headshot** — the current one is 591×586 and will look soft at 380px. Aim for ≥760×760.
3. **Resume PDF** — to drop in `public/resume.pdf`.
4. **Service credentials** — Anthropic API key, Spotify dev app credentials, Upstash Vector creds, domain DNS access.
5. **Confirmation of Cal.com link** — `app.cal.com/jason-vermaelen`. Verify it's set up.
6. **Cleared-for-public version** of any internal screenshots / dashboards going into case studies.
7. **First couple of Writing posts** — at least the "Building the portfolio I'd actually want a recruiter to read" build log is already drafted in `Writing Preview.html`.

---

## Voice & copy

Don't drift. The PRD section 4 is non-negotiable. Specifically:
- Numbers before adjectives.
- Active verbs ("led, built, shipped"), never "was involved in."
- Honest about tradeoffs (every case study has a "what I'd do differently" section).
- Never: "passionate," "data-driven decision making," "synergize," "rockstar," "ninja."
- No emojis except where they already appear in the design references (footer, /now changelog, etc.).

---

## Out of scope for v1 (per PRD section 16)

Newsletter, comments, multi-language, RSS feed, e-commerce, speaking page, testimonials, "/uses" page. Don't accidentally build any of these.

---

## When in doubt

Read the PRD first. Then read the comment block at the top of the source file that's closest to the question. If still stuck, ask Jason — don't guess on architectural decisions (vector store choice, content layer, rate-limit strategy, etc.).
