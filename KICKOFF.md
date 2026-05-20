# Kickoff checklist — handing off to Claude Code

Step-by-step playbook for getting from "I downloaded a zip" to "the site is live." Read top-to-bottom on day 1.

---

## ① Prerequisites — sign up for these first

You'll need accounts at each of these. The starred ones (★) are required for v1 launch; the rest can be added later.

| Service | Why | Required for v1? |
|---|---|---|
| **GitHub** ★ | Hosting the source repo | ✅ |
| **Vercel** ★ | Hosting the site | ✅ |
| **A domain registrar** (Namecheap, Cloudflare, etc.) ★ | Bought `jasonvermaelen.com` | ✅ |
| **Cal.com** ★ | Scheduling link `app.cal.com/jason-vermaelen` | ✅ (or whatever scheduling tool you already use) |
| **Anthropic Console** | API key for Ask Jason chat | ⚪ (defer to Week 4) |
| **Upstash** | Vector store + rate limit for Ask Jason | ⚪ (defer to Week 4) |
| **OpenAI** or **Voyage** | Embeddings for RAG | ⚪ (defer to Week 4) |
| **Spotify Developer** | API for /now "Recently played" | ⚪ (the /now page falls back gracefully without it) |
| **Resend** | Optional contact-form email | 🔵 nice-to-have |

For each one, save the API keys / tokens in a password manager. **Don't put them in the repo** — Claude Code will set them up as Vercel env vars.

---

## ② Setup steps (in order)

### 1. Unzip and inspect
Unzip the project download. Skim:
- `PRD.md` — the brief (you've already seen this)
- `HANDOFF.md` — Claude Code's instruction manual (it'll read this for you)
- `design-reference/*.html` — your design previews
- `data/resume.json` — your canonical data
- `content/work/_template.mdx` — the case-study scaffold

### 2. Create the GitHub repo
- Name: **`personal-site`** under your account `jvermaelen`
- Visibility: public (PRD calls for "view source" link from the site)
- License: MIT or none
- **Do NOT** initialize with a README — the project already has one (well, HANDOFF.md serves that purpose for now).

### 3. Push the project files
Easiest path: GitHub web UI → "uploading an existing file" → drag the entire unzipped folder. Or `git init && git add . && git commit && git push` locally if you prefer the CLI.

The Preview HTML files should land in a `/design-reference/` subfolder (the zip is already structured this way).

### 4. Connect Vercel to the repo
- Go to vercel.com → "Add New Project" → import the GitHub repo
- Use defaults for now (Next.js detection happens automatically once Claude Code scaffolds it)
- Skip env vars — you'll add them later when Ask Jason is wired up

### 5. Open Claude Code on the repo
Claude Code has its own way of opening a repo. Get to the point where you have a chat window open in the context of your local clone of `personal-site/`.

### 6. Paste the first prompt (below)

---

## ③ First prompt to Claude Code

Copy-paste this into Claude Code. **Don't paraphrase** — the explicit structure matters for getting a good plan back instead of an immediate code dump.

```
You're picking up a personal portfolio site project for Jason Vermaelen —
Senior BI Analyst at Indeed, targeting Senior Analytics, BizOps, and PM
roles at Seed-Series D startups, AI-native companies, and FAANG.

Read these three files in this order, top to bottom:
1. PRD.md — the full brief and 4-week roadmap
2. HANDOFF.md — what's already been designed and where everything goes
3. design-reference/Homepage Preview.html — the canonical visual reference

Then skim the rest of design-reference/ to see the other 7 page designs
(About, Now, Work Index, Case Study, Writing, 404, OG templates).

Once you've done that, before writing any code:

1. Confirm the tech stack matches what's in the PRD (Next.js 16 App
   Router, TypeScript strict, Tailwind v4, MDX, Vercel).
2. Propose the repo structure. Compare against HANDOFF.md's proposed
   structure — flag any deltas and why.
3. Outline your plan for Week 1 (Foundation per PRD section 14).
4. List the architectural decisions you want my input on before you
   start coding (e.g. Tailwind v4 config approach, content layer
   choice, MDX validation strategy, RAG vector store).

Wait for my approval on the plan before you start writing components.
Match the design references faithfully — type, color tokens, spacing,
interaction details. Don't drift.

Color is locked: cobalt accent, oklch(44% 0.18 250) on light bg, 
oklch(78% 0.18 250) on dark bg. WCAG AA on all greys.

Voice is locked per PRD section 4: numbers before adjectives, active
verbs, honest about tradeoffs, no "passionate" or "data-driven decision
making", no emojis outside what's already in the design references.
```

---

## ④ What to expect from Claude Code's first response

A good first response from Claude Code will:
- ✅ Have read the PRD + HANDOFF + at least one HTML reference
- ✅ Confirm the stack
- ✅ Propose 6–10 specific architectural decisions to align on
- ✅ Ask for the env vars / accounts that Week 1 needs
- ✅ Show a Week 1 work plan
- ❌ **NOT** dump 15 files of code without asking

If it dumps code immediately, tell it: *"Hold on. Confirm the plan from steps 1–4 of my first prompt before writing components."*

---

## ⑤ Things YOU (and only you) can provide

Bookmark this list. Claude Code will ask for them as it hits each one.

| What | When you'll need it | Where it goes |
|---|---|---|
| **Higher-res headshot** (≥760×760) | Week 2 (homepage hero) | `public/headshot.png` |
| **Resume PDF** (final version) | Week 3 | `public/resume.pdf` |
| **Cal.com link confirmation** | Week 1 | already in resume.json |
| **Domain DNS access** | Week 4 launch | Vercel DNS config |
| **Anthropic API key** | Week 4 (Ask Jason) | Vercel env var `ANTHROPIC_API_KEY` |
| **Upstash Vector creds** | Week 4 (Ask Jason RAG) | Vercel env vars |
| **OpenAI/Voyage API key** | Week 4 (embeddings) | Vercel env var |
| **Spotify dev app creds** | Week 2 (Now page) | Vercel env vars `SPOTIFY_CLIENT_ID`, `_SECRET`, `_REFRESH_TOKEN` |
| **Real case study content** | Week 3 | for each `content/work/<slug>.mdx` |
| **First Writing posts** | Week 3+ | `content/writing/<slug>.mdx` |
| **Cleared-for-public screenshots** | Week 3 (case studies) | `public/work/<slug>/*.png` |

---

## ⑥ Common follow-up questions Claude Code might ask, and your answers

Be ready for these — they'll come up early:

**"Should we use Tailwind v4 or v3?"**
→ v4 per PRD. v3 if you hit a blocker; flag it to me.

**"contentlayer2 or velite or raw next-mdx-remote?"**
→ Your call. PRD allows any of them. Pick the lightest one that gives you Zod-validated frontmatter.

**"Should I use shadcn/ui?"**
→ Copy-paste specific shadcn components if helpful (Command palette, especially). **Don't** install the full library — keep the dep surface small per PRD.

**"What about analytics?"**
→ Vercel Analytics + Speed Insights only. Nothing else in v1.

**"Should the contact form actually send email?"**
→ Defer the form to v1.1. The inline contact strip on the homepage handles primary contact — Schedule, Email, LinkedIn, GitHub, Resume.

**"What testing framework?"**
→ Skip in v1. Vercel preview deploys are enough.

**"Can I use a database?"**
→ No. Static-MDX content + edge-cached external APIs (Spotify, Anthropic) only.

---

## ⑦ Iteration tips

Claude Code will get ~85% of the design right on the first port. The remaining 15% is iteration:

- **Open the preview HTML and the rendered Next.js page side-by-side.** When something feels off, screenshot both and tell Claude Code "match the spacing/type/weight/etc. of the reference."
- **Lean on the design tokens.** When colors look wrong, it's almost always because Claude Code drifted from the `--ink-soft` / `--muted` palette. Point back to HANDOFF.md's token block.
- **Keep the design-reference/ folder in the repo** during iteration. Delete it only after you launch and don't need to point at it anymore.

---

## ⑧ Launch checklist

When Claude Code says "ready to launch":

- [ ] Lighthouse scores 95+ on Performance / Accessibility / Best Practices / SEO
- [ ] All pages render without console errors
- [ ] Theme toggle works on every page
- [ ] ⌘K palette opens on every page
- [ ] Ask Jason responds (or is gracefully disabled with a "coming soon" state)
- [ ] OG cards render correctly — test with `https://www.opengraph.xyz/`
- [ ] Favicon shows up in browser tabs
- [ ] `/resume.pdf` downloads cleanly
- [ ] Cal.com link opens scheduling
- [ ] Custom domain `jasonvermaelen.com` resolves with valid SSL
- [ ] `linkedin.com/in/vermaelen` profile updated with the new URL
- [ ] Test the share-card preview on LinkedIn DM, Slack, iMessage

---

## ⑨ Post-launch

- Update `/now` once a month — that's the only page that needs ongoing maintenance.
- Add case studies to `content/work/` as they get cleared for public sharing.
- Add Writing posts to `content/writing/` as you finish drafts.
- The site source links back to itself (`view source ↗` in footer) — keep the repo public.
- Track recruiter inbound conversion (see PRD section 13 for the target metrics).

---

Good luck. The PRD + HANDOFF + design references give Claude Code more to work with than 95% of greenfield handoffs. This should be a smooth build.
