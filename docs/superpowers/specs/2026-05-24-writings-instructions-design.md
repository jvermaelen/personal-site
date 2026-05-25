# Writings Workflow Instructions - Design Spec

**Date:** 2026-05-24
**Status:** Draft, awaiting Jason's review
**Author:** Brainstormed with Claude (Opus 4.7)
**Implements:** Setting up structured workflow for blog post creation + LinkedIn cross-posting on jasonvermaelen.com

---

## 1. Context & purpose

Jason ships writing posts (essays, build logs, notes) to `/writing/[slug]` on jasonvermaelen.com. Three case studies and one seed blog post are live as of May 2026. The workflow for creating posts is partially documented (existing `.claude/skills/post-intake/SKILL.md` + `docs/INSTRUCTIONS.md` §5 + `docs/VOICE.md`), but two things are missing:

1. **LinkedIn cross-post workflow.** Currently undocumented. Research (per the [LinkedIn 2026 brainstorm research](#research-grounding)) shows specific algorithmic mechanics that drive recruiter discovery, the primary goal for cross-posting.
2. **Publication safety gates.** No formal "stop and confirm before publishing" checkpoints. Recovery from a bad blog post is feasible (amend commit); recovery from a bad LinkedIn post is much harder.

This spec defines a workflow that integrates the existing draft-time skill with new publishing + cross-post + preview infrastructure, and adds explicit human-in-the-loop gates before anything goes live.

### Goals

- Drive recruiter and hiring-manager inbounds via consistent LinkedIn presence (the primary success metric).
- Make LinkedIn cross-posting low-friction enough that Jason actually does it for every post.
- Preserve Jason's voice (no AI tells, no buzzwords, em-dash-free per the recent site-wide sweep).
- Never publish anything (site or LinkedIn) without Jason's explicit approval.

### Non-goals

- Build LinkedIn carousel or Newsletter workflows yet (deferred until cadence proves out — see §11).
- Implement direct LinkedIn API posting (intentionally rejected for trust + technical-cost reasons — see §9).
- Track per-post engagement metrics in the repo (potential future addition).

---

## 2. Architecture overview

Four files change or get created:

| Path | Type | Action |
|---|---|---|
| `docs/WRITINGS.md` | Human-readable workflow doc | **CREATE** - new authoritative reference |
| `.claude/skills/post-intake/SKILL.md` | Claude-loaded skill | **EXTEND** - add publishing + LinkedIn steps |
| `docs/templates/linkedin-preview.html` | Browser-rendered LinkedIn mockup | **CREATE** - one-time template |
| `docs/INSTRUCTIONS.md` | Existing site-wide content rules | **TRIM** - move §5 content to WRITINGS.md, add cross-reference |

One directory convention is added:

- `content/writing/_linkedin/` - per-post LinkedIn drafts (`<slug>.md`) and rendered previews (`<slug>-preview.html`). Velite ignores the `_` prefix and the non-.mdx extensions, so nothing here ships to the site.

Plus a deferred-but-acknowledged TODO:

- `app/(site)/writing/[slug]/opengraph-image.tsx` - per-post dynamic OG image generator. Already on Jason's punch list. The workflow gains a step that references this file once it exists; the workflow falls back to the site default OG image until then.

### File relationship diagram

```
docs/WRITINGS.md  ◀── authoritative human-readable workflow
       ▲
       │ referenced by
       │
.claude/skills/post-intake/SKILL.md  ◀── auto-loads when drafting OR publishing posts
       │
       │ tells Claude to invoke
       ▼
docs/templates/linkedin-preview.html  ◀── stamped per-post into _linkedin/<slug>-preview.html

docs/INSTRUCTIONS.md  ──"See WRITINGS.md"──▶  docs/WRITINGS.md
docs/VOICE.md         ◀── still authoritative for voice; both above refer to it
```

---

## 3. `docs/WRITINGS.md` content design

Eleven sections, in order. Each one is one of:

- **Concise** (1-2 paragraphs) - quick reference material.
- **Detailed** (5-15 numbered/bulleted items) - workflows and checklists.
- **Reference** (table or list) - lookup data like hashtag sets, character counts.

### §1. When to write a post  (Concise)

The decision test from existing INSTRUCTIONS.md §5: write when you've learned something useful from a project, when you have a clear opinion grounded in real data, or when you can add something specific that generic content can't.

### §2. Post type recipes  (Reference + Concise per type)

Three types, matching velite enum:

- **Essay** (`essay` tag) - 1000-1500 words. Reflective, opinionated, argumentative.
- **Build log** (`build` tag) - 600-1500 words. Concrete, project-anchored, includes decisions and tradeoffs.
- **Note** (`note` tag) - 200-500 words. Single observation, no padding.

Each entry shows: when to choose this type, target length, voice direction, example structure.

### §3. Pre-draft brainstorm  (Detailed)

Lifts the six-question checklist from `post-intake` skill (seed, audience, the one thing, angle, evidence, honest tradeoff). Adds the explicit directive: for anything longer than a note, invoke `superpowers:brainstorming` to run it formally.

### §4. Voice  (Concise + reference)

Authoritative voice rules live in `docs/VOICE.md`. This section gives:

- The three-word version ("Warm. Curious. Grounded.")
- The AI-tell scrub list (5 items - see §5 below)
- Pointer to `docs/VOICE.md` for the full guide

### §5. AI-tell scrub checklist  (Detailed)

A pre-publish list adapted from the LinkedIn 2026 research:

1. No em-dashes anywhere (site-wide convention from May 2026 sweep).
2. Variable paragraph length - mix of 1-sentence and 3-5-sentence paragraphs. Uniform structure is an AI tell.
3. At least one named entity (specific tool, person, company, date, dollar figure, or query) per ~300 words.
4. No "It's not X, it's Y" constructions. They scan as AI.
5. No tricolons or repeated rhetorical structures. Single sentences with three parallel clauses are an AI tell.

### §6. Structure templates  (Detailed - one per type)

Three concrete templates - frontmatter + section structure + opening/closing patterns - one for each post type. Each template references the existing seed post at `content/writing/building-the-portfolio.mdx` as a worked example.

### §7. Publishing workflow - site  (Detailed)

Pre-commit:

1. Voice checklist pass (the 5 AI-tell items + general voice rules from VOICE.md).
2. `pnpm exec velite` - frontmatter validation.
3. `pnpm typecheck && pnpm lint && pnpm build` - full build green.
4. Per-post OG image exists at `app/(site)/writing/[slug]/opengraph-image.tsx` OR falls back to site default.
5. `data/writing.json` entry for the post exists with `status: "live"`.

**Gate 1 - STOP before git push.** Show Jason: diff summary, voice checklist results, preview URL (Vercel preview or localhost). Wait for explicit approval ("ship it" / "go" / "looks good"). Only then run `git push origin main`.

### §8. Publishing workflow - LinkedIn cross-post  (Detailed)

Per post type:

- **Note** → full republish on LinkedIn. No link. 3-5 hashtags.
- **Build log + Essay (text version, current default)** → custom 1,300-1,900 character rewrite. Hook in first 210 chars (mobile cutoff). Link to site post at the very end of the body. 3-5 hashtags. Attach the same OG image used on the site.

Steps:

1. Read the site post; write LinkedIn version to `content/writing/_linkedin/<slug>.md`.
2. Apply AI-tell scrub (§5).
3. Stamp into `docs/templates/linkedin-preview.html` → write `content/writing/_linkedin/<slug>-preview.html`.
4. Give Jason the path to open the preview in his browser (or render via Claude Preview MCP if available in the session).
5. Iterate with Jason on the draft until preview looks right.
6. **Gate 2 - STOP before sending Jason to publish.** This is the strongest gate. Wait for explicit "ship it" from Jason.
7. After approval: give Jason the final text + image path + hashtag set in a copyable block. He pastes into LinkedIn manually. LinkedIn's native preview is the final sanity check.
8. Commit the `_linkedin/<slug>.md` draft and `<slug>-preview.html` to the repo for archive.

Within ~30 minutes of the site post going live - per the research, the first 30-90 minutes determine LinkedIn distribution. Worth scheduling the cross-post tightly to the site publish.

### §9. Engagement triage  (Concise)

Brief rules for what to do with comments and DMs from cross-posts. Reply within 24 hours to genuine engagement. Don't engage with low-effort comments (one-word "great post!" type) - they don't help the algorithm and dilute the thread.

### §10. Future workflows (deferred)  (Concise)

Placeholder section noting two future-layer additions, with brief criteria for when to implement:

- **Document carousels for build logs** - implement once Jason has shipped 3-4 LinkedIn cross-posts and wants to invest in higher-reach formats. Research shows carousels get ~6.6% engagement vs ~4.2% for text.
- **LinkedIn Newsletter for long essays** - implement only once Jason commits to a regular publishing cadence (monthly or better). Newsletters carry zero link penalty but require recurring subscriber commitment.

### §11. Versioning  (Concise)

Same "last updated" pattern as existing INSTRUCTIONS.md and VOICE.md.

---

## 4. `.claude/skills/post-intake/SKILL.md` extension

Changes to the existing skill file:

### 4.1. Description field update

Add publishing + cross-post triggers:

> Current description (paraphrased): "Triggers on drafting, refining, or planning a writing post."
> Updated description: "Triggers on drafting, refining, or planning a writing post; publishing a writing post; cross-posting to LinkedIn; or drafting a LinkedIn post for a published writing."

### 4.2. New "Step N: Publishing + LinkedIn cross-post" section

Goes after the existing "Step 1 — Brainstorm before drafting" section, before the operational reference sections.

Content:

- Brief: this step fires when status transitions from `drafting` → `live` OR when Jason wants to draft a LinkedIn cross-post.
- Pointer to `docs/WRITINGS.md` §7 (site publishing) and §8 (LinkedIn cross-post) as the authoritative workflow.
- AI-tell scrub checklist (5 items - inline copy of §5 from WRITINGS.md to keep the skill self-sufficient).
- File path conventions: `content/writing/_linkedin/<slug>.md` for drafts; `content/writing/_linkedin/<slug>-preview.html` for rendered previews.
- LinkedIn shape decision tree (note → republish, essay/build → 1,300-1,900 char custom rewrite).
- **Explicit Gate 1 + Gate 2 language** (the human-in-the-loop checkpoints):

> "Before `git push origin main`: stop. Show Jason the voice checklist results, the local preview URL, and the diff summary. Wait for explicit approval. This is non-negotiable."
>
> "Before telling Jason 'paste this into LinkedIn': stop. Generate the `<slug>-preview.html` via the template. Give Jason the local path. Wait for explicit approval. This gate is the strongest. A bad LinkedIn post is harder to undo than a bad git commit."

- Within-30-minutes timing rule for LinkedIn cross-post (algorithm reasoning cited).

### 4.3. Existing "After drafting" section update

Flow the existing post-draft steps into the new publishing step, instead of ending at "ship it."

### 4.4. Existing "Useful references" section update

Add pointers to:

- `docs/WRITINGS.md` (new)
- `content/writing/_linkedin/` (where LinkedIn drafts and previews live)
- `docs/templates/linkedin-preview.html` (the preview template)

### 4.5. Trim mildly redundant inline sections

The existing skill has "Voice rules" and "How Jason opens / closes a piece" as inline summaries of VOICE.md. Trim these slightly and replace with stronger pointers to `docs/VOICE.md` and `docs/WRITINGS.md` §4-§5 as authoritative sources. Acceptable duplication remains (post type recipes, frontmatter spec) - these stay inline because the skill needs them in-context.

---

## 5. `docs/templates/linkedin-preview.html` design

Self-contained HTML file that visually mimics a LinkedIn post card. Pure HTML + CSS, no JavaScript, no external dependencies. Template uses `{{PLACEHOLDER}}` slots that the skill substitutes per post.

### 5.1. Placeholder slots

- `{{PROFILE_NAME}}` - "Jason Vermaelen"
- `{{PROFILE_HEADLINE}}` - "Senior BI Analyst at Indeed" (or current title from `data/resume.json`)
- `{{PROFILE_IMAGE_PATH}}` - relative path to `public/headshot.png`
- `{{POST_TIME}}` - "now" placeholder
- `{{POST_BODY}}` - the full LinkedIn post text
- `{{POST_BODY_PREVIEW_210}}` - the first 210 chars (mobile cutoff) for the "before see more" rendering
- `{{POST_BODY_PREVIEW_280}}` - the first 280 chars (desktop cutoff)
- `{{POST_IMAGE_PATH}}` - relative path to attached image (typically the post's OG image)
- `{{POST_IMAGE_ALT}}` - alt text for the attached image
- `{{HASHTAGS}}` - the hashtag set as displayed at end of body

### 5.2. Visual fidelity targets

- Faithful: profile circle + name + headline at top, body text with "see more" cutoff at exactly 210/280 chars, hashtags in LinkedIn's blue inline style, image rendered at LinkedIn's actual aspect ratio.
- Approximations OK: grayed-out engagement bar (reactions/comments/shares icons, no actual numbers), no comment thread, no recommended-posts sidebar.
- Mobile vs desktop toggle: optional, but nice-to-have. Renders the post with the 210-char cutoff for mobile view and 280-char cutoff for desktop view. Side-by-side or via a CSS class toggle.

### 5.3. How it's used per post

1. Skill reads `content/writing/_linkedin/<slug>.md`.
2. Skill reads the post's OG image path (from `app/(site)/writing/[slug]/opengraph-image.tsx` or the default).
3. Skill substitutes placeholders into the template.
4. Skill writes the result to `content/writing/_linkedin/<slug>-preview.html`.
5. Skill outputs the absolute path. Jason opens in his browser, OR Claude Preview MCP renders inline if available in the session.

---

## 6. Permission gates - exact wording

Gates are most effective when the language is the same every time. The skill's instructions use this exact phrasing:

### Gate 1: Pre-site-publish

> "Pre-publish checkpoint. Do not run `git push origin main`. Show Jason: (1) the diff summary of files changed, (2) the result of the voice + AI-tell checklist (all five items pass or flag which failed), (3) the local preview URL (typically `localhost:3000/writing/<slug>`) or Vercel preview URL. Wait for explicit approval - 'ship it', 'go', 'looks good', or equivalent. Only after explicit approval, run `git push`."

### Gate 2: Pre-LinkedIn-publish

> "Pre-LinkedIn checkpoint. Do not tell Jason 'this is ready to paste.' First: (1) generate the LinkedIn preview HTML at `content/writing/_linkedin/<slug>-preview.html`, (2) give Jason the local file path, (3) wait for him to review in his browser, (4) iterate if he requests changes. Only after explicit approval, output the final copyable block (text + image path + hashtags) for him to paste into LinkedIn manually. This gate is the strongest gate in the entire writings workflow - a bad LinkedIn post is harder to undo than a bad git commit."

---

## 7. Image strategy

### 7.1. Two images, one source

Both the site OG share image and the LinkedIn post image use the same 1200×630 PNG, generated dynamically per post. Path: `app/(site)/writing/[slug]/opengraph-image.tsx` produces the file at build time, served at `<site>/writing/<slug>/opengraph-image.png`.

For LinkedIn use: the workflow downloads (or references) the same image file and attaches it directly to the LinkedIn post (not as a link unfurl - the link unfurl is the rejected B-pattern from the brainstorm).

### 7.2. Per-post OG image template

The `app/(site)/writing/[slug]/opengraph-image.tsx` is a known TODO from Jason's existing punch list. Until built, the site falls back to the default OG image at `app/opengraph-image.tsx` (the homepage card). The publishing workflow flags the missing per-post image as a warning, not a blocker.

Template content (when built): post title + a one-line takeaway + the post's tag (essay/build/note) + the site brand mark. Visual style matches the homepage OG card.

### 7.3. LinkedIn variant - deferred

A 1200×1200 square crop is better for in-feed LinkedIn rendering but is overkill for v1. Deferred to "future workflows" along with carousels and Newsletters.

---

## 8. Migration: `docs/INSTRUCTIONS.md` §5

Existing INSTRUCTIONS.md §5 ("Writing Blog Posts") contains: when-to-post criteria, structure template, tone notes. ~30 lines.

Migration:

1. Cut §5 from INSTRUCTIONS.md.
2. Paste the content into `docs/WRITINGS.md` §1 (when to write), §6 (structure templates), and §4 (voice notes) as appropriate. Reword as needed for new context.
3. Replace the cut §5 with a one-line cross-reference: "**§5. Writing Blog Posts** - see [`WRITINGS.md`](WRITINGS.md) for the full workflow."
4. Update INSTRUCTIONS.md's "Last updated" line.

---

## 9. Out of scope / rejected options

Recording the explicit rejections so future-Jason and future-Claude know the reasoning:

- **Direct LinkedIn API posting.** Rejected for trust (undermines the permission gate), technical cost (LinkedIn Marketing Developer Platform approval is multi-week), and small upside (30 seconds of paste time isn't worth the engineering complexity). Revisit only if posting cadence climbs to 2+ posts/week and the paste-and-publish step becomes the real bottleneck.

- **Browser automation via Playwright/Puppeteer for LinkedIn.** Rejected: against LinkedIn ToS, fragile to UI changes, no benefit vs. manual paste once the preview pipeline exists.

- **Document carousels.** Deferred (not rejected). Implementation gate: 3-4 cross-posts shipped, Jason confirms commitment to higher-effort formats.

- **LinkedIn Newsletters.** Deferred. Implementation gate: Jason commits to monthly-or-better publishing cadence.

- **Per-post engagement tracking in the repo.** Deferred. Could add a `content/writing/_linkedin/<slug>-metrics.md` file later, populated manually with reach/engagement numbers from LinkedIn 7 days after posting. Useful for retrospectives, not required for v1.

- **AI-generated post images** (beyond the OG image generator). Rejected for v1. One reliable per-post image is better than many unreliable sources.

---

## 10. Acceptance criteria

Implementation is complete when:

- [ ] `docs/WRITINGS.md` exists with all 11 sections from §3 above, reads cleanly start to finish.
- [ ] `docs/INSTRUCTIONS.md` §5 is migrated and replaced with the cross-reference line.
- [ ] `.claude/skills/post-intake/SKILL.md` has the new publishing + LinkedIn step, the updated description, and the trimmed inline sections.
- [ ] `docs/templates/linkedin-preview.html` exists, renders cleanly in a browser with placeholder content, all `{{PLACEHOLDER}}` slots documented.
- [ ] `content/writing/_linkedin/` directory exists (with `.gitkeep` if empty) and has a comment in WRITINGS.md explaining the naming convention.
- [ ] A test run end-to-end: pick an existing post (`building-the-portfolio.mdx`), generate a LinkedIn draft + rendered preview, verify the preview HTML looks faithful to LinkedIn's actual rendering.
- [ ] Voice + AI-tell scrub: the new docs pass the same checks Jason's actual posts have to pass (no em-dashes, varied paragraph length, no buzzwords).

---

## 11. Research grounding

LinkedIn-related design decisions in this spec are grounded in research conducted 2026-05-24, primary sources:

- [Algorithm InSights Report 2025 - Richard van der Blom](https://www.linkedin.com/posts/richardvanderblom_chapter-1-algorithm-insights-report-2025-activity-7322514599126130688-Q895)
- [AuthoredUp - LinkedIn Character Limits 2026](https://authoredup.com/blog/linkedin-character-limit)
- [Socialinsider - LinkedIn Organic Benchmarks 2026](https://www.socialinsider.io/social-media-benchmarks/linkedin)
- [Gromming - LinkedIn External Links Penalty 2026](https://gromming.com/blog/linkedin-external-links-penalty)
- [Leonar - LinkedIn Recruiter Boolean Search 2026](https://www.leonar.app/blog/linkedin-recruiter-boolean-search/)
- [Entrepreneur - LinkedIn Fighting AI Slop](https://www.entrepreneur.com/business-news/linkedin-is-fighting-back-against-ai-slop-and-ai-comments)

Full source list in the brainstorming session transcript.

---

## 12. Open questions for Jason's review

These are things I'm assuming but want explicit confirmation on:

1. **Voice samples for VOICE.md.** Jason mentioned earlier he could add voice samples to VOICE.md. Should the WRITINGS.md workflow include "if you encounter a paragraph in your own draft that captures voice well, drop it as a sample in VOICE.md"? Or keep VOICE.md updates as a separate manual process?

2. **`_linkedin/` directory naming.** I've named it `_linkedin/` (underscore prefix for velite exclusion). Alternative: `linkedin-drafts/` outside `content/` entirely (e.g. `content/linkedin/` or top-level `linkedin/`). The underscore prefix matches existing patterns (`_drafts/`, `_intake.md`) which is why I chose it. Confirm this naming is fine.

3. **Headshot for the LinkedIn preview template.** The preview template needs Jason's headshot. I'd use `public/headshot.png` (the file already on the site). Confirm there isn't a separate "professional LinkedIn-style headshot" Jason would rather use here.

4. **Per-post OG image priority.** This is an existing punch-list item, not technically blocking the writings workflow. But the LinkedIn cross-post benefits significantly from a real per-post image vs. the homepage default. Should the per-post OG image be built before this workflow ships, or can it follow as a Phase 2?
