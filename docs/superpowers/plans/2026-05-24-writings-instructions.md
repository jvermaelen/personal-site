# Writings Workflow Instructions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the documentation + skill + template infrastructure that turns blog post writing and LinkedIn cross-posting from an ad-hoc workflow into a structured, repeatable, gate-protected process on jasonvermaelen.com.

**Architecture:** Four files created (`docs/WRITINGS.md`, `docs/templates/linkedin-preview.html`, `app/(site)/writing/[slug]/opengraph-image.tsx`, `content/writing/_linkedin/.gitkeep`), two files modified (`.claude/skills/post-intake/SKILL.md`, `docs/INSTRUCTIONS.md`). No new runtime dependencies. Per-post OG image uses Next.js Edge `ImageResponse`, matches the existing homepage OG card visual pattern.

**Tech Stack:** Next.js 16, velite for content collections, Edge runtime for OG images, plain HTML/CSS for LinkedIn preview template, markdown for docs + skill files.

**Reference spec:** `docs/superpowers/specs/2026-05-24-writings-instructions-design.md`

---

## File Structure

| Path | Action | Purpose |
|---|---|---|
| `content/writing/_linkedin/.gitkeep` | CREATE | Reserves the directory; `_` prefix excludes from velite |
| `app/(site)/writing/[slug]/opengraph-image.tsx` | CREATE | Per-post dynamic OG image generator (Edge runtime) |
| `docs/templates/linkedin-preview.html` | CREATE | LinkedIn-faithful preview mockup with `{{PLACEHOLDER}}` slots |
| `docs/WRITINGS.md` | CREATE | Human-readable workflow doc (11 sections, ~300-400 lines) |
| `docs/INSTRUCTIONS.md` | MODIFY | Migrate §5 content to WRITINGS.md, replace §5 with cross-reference |
| `.claude/skills/post-intake/SKILL.md` | MODIFY | Extend with publishing + LinkedIn step, update description, trim redundancies |

---

## Task 1: Create `_linkedin/` directory with `.gitkeep`

**Files:**
- Create: `content/writing/_linkedin/.gitkeep`

**Why first:** Foundation for Task 7 end-to-end test. Other tasks reference this path. Tiny, zero-risk first commit.

- [ ] **Step 1: Create the directory and placeholder file**

```powershell
New-Item -ItemType Directory -Path "C:\Users\jason\code\personal-site\content\writing\_linkedin" -Force
New-Item -ItemType File -Path "C:\Users\jason\code\personal-site\content\writing\_linkedin\.gitkeep"
```

- [ ] **Step 2: Verify velite doesn't pick it up**

Run from repo root: `pnpm exec velite`

Expected output: `[VELITE] build finished in <time>ms` with no errors. The `_linkedin/` directory is invisible to velite (excluded by `_` prefix pattern at `velite.config.ts` line `pattern: ['writing/**/*.mdx', '!writing/**/_*.mdx']`).

- [ ] **Step 3: Commit**

```powershell
git add content/writing/_linkedin/.gitkeep
git commit -m "Add _linkedin/ directory for per-post LinkedIn drafts and previews"
```

---

## Task 2: Build the per-post OG image generator

**Files:**
- Create: `app/(site)/writing/[slug]/opengraph-image.tsx`
- Reference: `app/opengraph-image.tsx` (existing homepage OG, copy visual pattern)

**Why next:** Independent of doc writing. Code change; gets the most-risky implementation work out of the way early. Foundation for Task 7 acceptance test.

- [ ] **Step 1: Read the existing homepage OG image for visual pattern**

Read `app/opengraph-image.tsx`. Note: same colors (`#fafaf7`, `#111111`, `#595959`, `#d5d2c9`, `#1a3aa6`), same wordmark at top, same brand mark style.

- [ ] **Step 2: Create the per-post OG image file**

Create `app/(site)/writing/[slug]/opengraph-image.tsx` with this exact content:

```tsx
import { ImageResponse } from 'next/og';
import { writing } from '@/.velite';

export const runtime = 'edge';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };
export const alt = 'Writing post - Jason Vermaelen';

const BG = '#fafaf7';
const INK = '#111111';
const MUTED = '#595959';
const LINE = '#d5d2c9';
const COBALT = '#1a3aa6';

const TAG_LABELS: Record<string, string> = {
  essay: 'Essay',
  build: 'Build log',
  note: 'Note',
};

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = writing.find((p) => p.slug === slug && !p.draft);

  // Fallback to a generic card if the post doesn't exist or is draft
  if (!post) {
    return new ImageResponse(
      <div
        style={{
          width: '100%',
          height: '100%',
          background: BG,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: 48,
          color: INK,
        }}
      >
        Jason Vermaelen - Writing
      </div>,
      size,
    );
  }

  const tagLabel = TAG_LABELS[post.tags[0]] ?? post.tags[0];
  const displayDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(post.date));

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        background: BG,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '56px 72px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Top - wordmark */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          fontFamily: 'monospace',
        }}
      >
        <span style={{ fontSize: 32, fontWeight: 600, color: INK }}>jv</span>
        <span style={{ fontSize: 28, color: COBALT }}>•</span>
        <span style={{ fontSize: 22, color: MUTED, letterSpacing: 1 }}>
          jasonvermaelen.com / writing
        </span>
      </div>

      {/* Middle - tag chip + title + dek */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div
          style={{
            fontFamily: 'monospace',
            fontSize: 18,
            color: COBALT,
            letterSpacing: 2,
            textTransform: 'uppercase',
            display: 'flex',
          }}
        >
          {tagLabel}
        </div>
        <div
          style={{
            fontSize: post.title.length > 60 ? 56 : 72,
            fontWeight: 600,
            letterSpacing: '-2px',
            lineHeight: 1.05,
            color: INK,
            display: 'flex',
            maxWidth: 1056,
          }}
        >
          {post.title}
        </div>
        <div
          style={{
            fontSize: 24,
            color: MUTED,
            lineHeight: 1.4,
            display: 'flex',
            maxWidth: 1056,
          }}
        >
          {post.dek.length > 140 ? `${post.dek.slice(0, 137)}...` : post.dek}
        </div>
      </div>

      {/* Bottom - date + author */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: `1px solid ${LINE}`,
          paddingTop: 24,
          fontFamily: 'monospace',
          fontSize: 18,
          color: MUTED,
          letterSpacing: 1,
        }}
      >
        <div style={{ display: 'flex' }}>{displayDate}</div>
        <div style={{ display: 'flex' }}>Jason Vermaelen</div>
      </div>
    </div>,
    size,
  );
}
```

- [ ] **Step 3: Run typecheck**

Run: `pnpm typecheck`

Expected: clean exit (zero errors). If a type error fires on the velite `writing` import, verify `.velite/index.d.ts` exists (run `pnpm exec velite` to regenerate if needed).

- [ ] **Step 4: Run lint**

Run: `pnpm lint`

Expected: `Checked N files in <time>ms. No fixes applied.` If there are lint errors (e.g., on the inline `style` props using `any`-ish JSX), they're usually safe to fix inline with biome-ignore comments matching the pattern used elsewhere in the codebase.

- [ ] **Step 5: Run production build**

Run: `pnpm build`

Expected: `Route (app)` list includes `├ ƒ /(site)/writing/[slug]/opengraph-image`. Build completes with no errors.

- [ ] **Step 6: Visual smoke test in dev**

Run: `pnpm dev` (in another terminal)

Open in browser: `http://localhost:3000/writing/building-the-portfolio/opengraph-image`

Expected: A 1200×630 PNG that shows: "BUILD LOG" tag chip in cobalt, the post's actual title (`Building the portfolio I'd actually want a recruiter to read.`), the post's dek text, the post's date (May 19, 2026), and "Jason Vermaelen" in the bottom-right. Background is `#fafaf7` cream. Same visual style as the homepage OG card.

Stop the dev server (`Ctrl+C`) before moving on.

- [ ] **Step 7: Commit**

```powershell
git add "app/(site)/writing/[slug]/opengraph-image.tsx"
git commit -m "Add per-post OG image generator for writing routes"
```

---

## Task 3: Build the LinkedIn preview HTML template

**Files:**
- Create: `docs/templates/linkedin-preview.html`

**Why next:** Independent of doc writing. Pure HTML/CSS, no build dependencies. Test = open in browser, verify it looks like LinkedIn.

- [ ] **Step 1: Create the template file**

Create `docs/templates/linkedin-preview.html` with this exact content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>LinkedIn Preview - {{POST_SLUG}}</title>
<style>
  /* LinkedIn-faithful styling.
     Sources: LinkedIn web UI as of May 2026. */
  :root {
    --bg-page: #f4f2ee;
    --bg-card: #ffffff;
    --ink: rgba(0, 0, 0, 0.9);
    --ink-soft: rgba(0, 0, 0, 0.6);
    --ink-muted: rgba(0, 0, 0, 0.45);
    --link: #0a66c2;
    --border: #e0dfdc;
    --shadow: 0 0 0 1px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.06);
  }

  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    background: var(--bg-page);
    font-family: -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: var(--ink);
    padding: 24px;
    line-height: 1.4;
  }

  .container {
    max-width: 552px;
    margin: 0 auto;
  }

  .toolbar {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
    font-size: 12px;
    color: var(--ink-soft);
  }
  .toolbar button {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 6px 14px;
    cursor: pointer;
    font-family: inherit;
    font-size: 12px;
    color: var(--ink);
  }
  .toolbar button.active {
    background: var(--ink);
    color: var(--bg-card);
    border-color: var(--ink);
  }
  .toolbar .meta {
    margin-left: auto;
    color: var(--ink-muted);
    align-self: center;
  }

  .post-card {
    background: var(--bg-card);
    border-radius: 8px;
    box-shadow: var(--shadow);
    overflow: hidden;
  }

  .post-header {
    padding: 12px 16px;
    display: flex;
    gap: 8px;
    align-items: flex-start;
  }
  .profile-img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--border);
    object-fit: cover;
    flex-shrink: 0;
  }
  .profile-text { flex: 1; min-width: 0; }
  .profile-name {
    font-weight: 600;
    font-size: 14px;
    color: var(--ink);
    line-height: 1.3;
  }
  .profile-headline {
    font-size: 12px;
    color: var(--ink-soft);
    line-height: 1.3;
    margin-top: 1px;
  }
  .post-time {
    font-size: 12px;
    color: var(--ink-muted);
    margin-top: 2px;
  }

  .post-body {
    padding: 0 16px 12px;
    font-size: 14px;
    color: var(--ink);
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  .post-body .hashtag { color: var(--link); }
  .post-body .see-more { color: var(--ink-soft); font-weight: 400; }

  /* Mobile mode: hide content beyond 210 chars, show "...see more"
     Desktop mode: hide content beyond 280 chars.
     Default = desktop. Toggle via .mode-mobile on body. */
  .post-body .truncated-mobile,
  .post-body .truncated-desktop {
    display: none;
  }
  body.mode-mobile .post-body .truncated-mobile { display: inline; }
  body:not(.mode-mobile) .post-body .truncated-desktop { display: inline; }

  body.mode-mobile .post-body .hidden-mobile { display: none; }
  body:not(.mode-mobile) .post-body .hidden-desktop { display: none; }

  .post-image-wrap {
    width: 100%;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    background: var(--bg-page);
  }
  .post-image {
    width: 100%;
    height: auto;
    display: block;
  }

  .engagement-counts {
    padding: 8px 16px 4px;
    display: flex;
    gap: 4px;
    font-size: 12px;
    color: var(--ink-soft);
    align-items: center;
  }
  .reaction-icons {
    display: inline-flex;
    margin-right: 4px;
  }
  .reaction-icons span {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    display: inline-block;
    border: 2px solid var(--bg-card);
    margin-left: -4px;
  }
  .reaction-icons span:first-child { margin-left: 0; background: var(--link); }
  .reaction-icons span:nth-child(2) { background: #df704d; }
  .reaction-icons span:nth-child(3) { background: #f5bb00; }

  .engagement-bar {
    padding: 4px 8px 8px;
    display: flex;
    gap: 4px;
    border-top: 1px solid var(--border);
    margin-top: 4px;
  }
  .engagement-bar button {
    flex: 1;
    background: transparent;
    border: none;
    padding: 8px;
    border-radius: 4px;
    font-size: 13px;
    color: var(--ink-soft);
    font-family: inherit;
    cursor: default;
  }

  .validation {
    margin-top: 24px;
    padding: 16px;
    background: var(--bg-card);
    border-radius: 8px;
    border: 1px solid var(--border);
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 12px;
    color: var(--ink-soft);
    line-height: 1.6;
  }
  .validation h2 {
    margin: 0 0 12px;
    font-size: 13px;
    color: var(--ink);
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .validation .pass { color: #0a8043; }
  .validation .warn { color: #ce7000; }
  .validation .fail { color: #b3261e; }
</style>
</head>
<body>
  <div class="container">
    <div class="toolbar">
      <button class="active" onclick="document.body.classList.remove('mode-mobile')">Desktop</button>
      <button onclick="document.body.classList.add('mode-mobile')">Mobile (210 char cutoff)</button>
      <span class="meta">{{POST_SLUG}} - preview</span>
    </div>

    <div class="post-card">
      <div class="post-header">
        <img class="profile-img" src="{{PROFILE_IMAGE_PATH}}" alt="{{PROFILE_NAME}}" />
        <div class="profile-text">
          <div class="profile-name">{{PROFILE_NAME}}</div>
          <div class="profile-headline">{{PROFILE_HEADLINE}}</div>
          <div class="post-time">{{POST_TIME}} • 🌐</div>
        </div>
      </div>

      <div class="post-body">{{POST_BODY_RENDERED}}</div>

      <div class="post-image-wrap">
        <img class="post-image" src="{{POST_IMAGE_PATH}}" alt="{{POST_IMAGE_ALT}}" />
      </div>

      <div class="engagement-counts">
        <span class="reaction-icons"><span></span><span></span><span></span></span>
        <span>0</span>
      </div>

      <div class="engagement-bar">
        <button>👍 Like</button>
        <button>💬 Comment</button>
        <button>🔄 Repost</button>
        <button>➤ Send</button>
      </div>
    </div>

    <div class="validation">
      <h2>Preview validation</h2>
      <div>Character count: <span id="char-count">{{CHAR_COUNT}}</span> (sweet spot: 1,300-1,900)</div>
      <div>Hook in first 210 chars: <span class="{{HOOK_PASS_CLASS}}">{{HOOK_PASS_TEXT}}</span></div>
      <div>AI-tell scrub: <span class="{{AI_SCRUB_CLASS}}">{{AI_SCRUB_TEXT}}</span></div>
      <div>Hashtag count: <span class="{{HASHTAG_PASS_CLASS}}">{{HASHTAG_COUNT}}</span> (target: 3-5)</div>
      <div>Image attached: <span class="{{IMAGE_PASS_CLASS}}">{{IMAGE_PASS_TEXT}}</span></div>
    </div>
  </div>
</body>
</html>
```

- [ ] **Step 2: Test render with placeholder content**

Open `docs/templates/linkedin-preview.html` directly in a browser. Expected: a LinkedIn-faithful post card with `{{PLACEHOLDER}}` literal strings visible in the slots. Toggle between Desktop/Mobile buttons - the body should swap based on the CSS class.

This validates the template itself renders. Actual substitution happens per post (see Task 7 acceptance test).

- [ ] **Step 3: Commit**

```powershell
git add docs/templates/linkedin-preview.html
git commit -m "Add LinkedIn preview HTML template with placeholder slots"
```

---

## Task 4: Write `docs/WRITINGS.md`

**Files:**
- Create: `docs/WRITINGS.md`
- Reference: `docs/INSTRUCTIONS.md` §5 (source content to migrate)
- Reference: `docs/VOICE.md` (cross-link as authoritative voice guide)
- Reference: `docs/superpowers/specs/2026-05-24-writings-instructions-design.md` §3 (the 11-section outline)

**Why now:** Foundation for Task 5 (INSTRUCTIONS.md migration) and Task 6 (post-intake update). Both reference this file.

- [ ] **Step 1: Read source material**

Read the full content of:
- `docs/INSTRUCTIONS.md` §5 "Writing Blog Posts"
- `docs/VOICE.md` (for the canonical voice rules to cross-link)
- `.claude/skills/post-intake/SKILL.md` (for the 6-question brainstorm wording)
- `docs/superpowers/specs/2026-05-24-writings-instructions-design.md` §3 (the section-by-section outline)

- [ ] **Step 2: Write WRITINGS.md**

Create `docs/WRITINGS.md` with 11 sections matching the spec outline. Use this header:

```markdown
# WRITINGS.md
**Workflow for writing and cross-posting blog content on jasonvermaelen.com**
_Last updated: 2026-05-24_

> This document is the authoritative workflow for creating writing posts and cross-posting them to LinkedIn. For voice and style rules, see [`VOICE.md`](VOICE.md). For site-wide content rules and project workflow, see [`INSTRUCTIONS.md`](INSTRUCTIONS.md).

---
```

Then write the eleven sections in order:

**§1. When to write a post** - 1-2 paragraphs. Source: INSTRUCTIONS.md §5 "When to Post" subsection. Adapt to first-person framing.

**§2. Post type recipes** - One subsection per type (essay, build log, note). Each one: target length, when to use, voice direction, structure example. Match the velite enum exactly. Reference the `velite.config.ts` `allowedWritingTags` for the canonical list.

**§3. Pre-draft brainstorm** - Lift the six-question checklist verbatim from `.claude/skills/post-intake/SKILL.md` Step 1 (seed, audience, the one thing, angle, evidence, honest tradeoff). Add explicit directive: "For any post longer than a note, invoke `superpowers:brainstorming` to run the brainstorm formally before drafting."

**§4. Voice** - 200-300 words. Three-word version ("Warm. Curious. Grounded."), pointer to VOICE.md as the authoritative source, and the voice-sample-capture step: when a paragraph in a draft particularly captures the voice, copy it into VOICE.md §4 (Words & Phrases That Sound Like Jason) with a one-line context note. The skill prompts for this during pre-commit.

**§5. AI-tell scrub checklist** - The 5-item list from the spec, as a numbered list with one-sentence rationale per item:

1. No em-dashes anywhere (site-wide convention from May 2026 sweep)
2. Variable paragraph length - mix of 1-sentence and 3-5-sentence paragraphs (uniform = AI tell)
3. At least one named entity per ~300 words (specific tool, person, company, date, dollar figure)
4. No "It's not X, it's Y" constructions (AI signature)
5. No tricolons or repeated rhetorical structures (single sentences with three parallel clauses are an AI tell)

**§6. Structure templates** - Three concrete templates, one per post type. Each: frontmatter block (YAML matching velite schema), section structure (with brief notes), opening/closing patterns. Reference `content/writing/building-the-portfolio.mdx` as the worked build-log example.

**§7. Publishing workflow - site** - Numbered checklist:
1. Voice + AI-tell scrub passes (§4 + §5)
2. `pnpm exec velite` succeeds
3. `pnpm typecheck && pnpm lint && pnpm build` all green
4. Per-post OG image renders (visit `/writing/<slug>/opengraph-image` in dev)
5. `data/writing.json` entry has `status: "live"`
6. **Gate 1 STOP** - show diff + preview URL + checklist results - wait for Jason's "ship it" before `git push`
7. After approval: push, monitor Vercel deploy, verify live URL renders

**§8. Publishing workflow - LinkedIn cross-post** - The biggest section. Per-type decision tree (note → full republish, essay/build → 1,300-1,900 char custom rewrite). Step-by-step:

1. Read site post; write LinkedIn draft to `content/writing/_linkedin/<slug>.md`
2. Apply hook formula (first 210 chars must be the strongest line)
3. Apply AI-tell scrub (§5)
4. Stamp into `docs/templates/linkedin-preview.html` → write `content/writing/_linkedin/<slug>-preview.html`
5. Give Jason the absolute path to open in browser (or render via Claude Preview MCP if available)
6. Iterate on draft based on preview feedback
7. **Gate 2 STOP (strongest gate)** - wait for Jason's explicit "ship it"
8. After approval: output final copyable block (text + image path + hashtags) for Jason to paste into LinkedIn
9. Within ~30 min of site post going live (algorithm window per the 2026 research)
10. Commit the `<slug>.md` + `<slug>-preview.html` to repo for archive

Include hashtag rules: 3-5, niche over trending, set example `#DataAnalytics #BusinessIntelligence #ProductAnalytics #BizOps` + one specific tag per post.

**§9. Engagement triage** - 1-2 paragraphs. Reply within 24 hours to substantive comments. Don't engage with one-word "great post" comments - they don't help the algorithm and dilute the thread.

**§10. Future workflows (deferred)** - Brief placeholder section. Two items: document carousels for build logs (gate: 3-4 LinkedIn posts shipped first), LinkedIn Newsletter for long essays (gate: monthly cadence committed). Cite research showing carousel reach (6.6% vs 4.2%).

**§11. Versioning** - Same pattern as other docs in `docs/`. Last-updated line at top. Brief changelog at bottom when significant changes happen.

Target total length: 300-400 lines of markdown.

- [ ] **Step 3: Read it back start-to-finish**

Open the file. Read every section. Check:
- All 11 sections present in order
- Headings consistent style
- Cross-references to VOICE.md and INSTRUCTIONS.md resolve (file paths correct)
- Voice in the doc itself matches Jason's: no em-dashes, named specifics, varied paragraph length
- AI-tell scrub list items match the wording in §5 of the spec exactly

- [ ] **Step 4: Commit**

```powershell
git add docs/WRITINGS.md
git commit -m "Add WRITINGS.md - authoritative workflow for blog posts + LinkedIn cross-posts"
```

---

## Task 5: Migrate `INSTRUCTIONS.md` §5 to cross-reference

**Files:**
- Modify: `docs/INSTRUCTIONS.md`

**Why now:** WRITINGS.md exists (Task 4), so the cross-reference resolves. This task is small.

- [ ] **Step 1: Locate §5 in INSTRUCTIONS.md**

Read `docs/INSTRUCTIONS.md`. The section "## 5. Writing Blog Posts" begins around line 102 and continues through "### Tone Notes for Blog Posts" ending around line 128 (verify exact line numbers in the actual file).

- [ ] **Step 2: Replace §5 content with cross-reference**

Edit `docs/INSTRUCTIONS.md`:

Replace the entire §5 section (from `## 5. Writing Blog Posts` heading through the end of the "Tone Notes for Blog Posts" subsection) with:

```markdown
## 5. Writing Blog Posts

For the full workflow - when to write, post type recipes, structure templates, the LinkedIn cross-post workflow, and the voice + AI-tell scrub checklist - see [`WRITINGS.md`](WRITINGS.md).

This section is intentionally short. INSTRUCTIONS.md covers site-wide content rules; WRITINGS.md covers the writing workflow specifically.
```

- [ ] **Step 3: Update INSTRUCTIONS.md's last-updated line**

Find the line near the top that reads `_Last updated: May 2026 — Added Section 3: Project Workflow ...`. Update to reflect the §5 migration:

```markdown
_Last updated: 2026-05-24 - §5 (Writing Blog Posts) migrated to WRITINGS.md_
```

- [ ] **Step 4: Verify no broken cross-references**

Search the rest of the repo for references to "INSTRUCTIONS.md §5":

Run: `pnpm exec rg "INSTRUCTIONS\.md.*§5" --type md`

Update any matches to point to `WRITINGS.md` instead.

- [ ] **Step 5: Commit**

```powershell
git add docs/INSTRUCTIONS.md
git commit -m "Migrate INSTRUCTIONS.md §5 content to WRITINGS.md; replace with cross-reference"
```

---

## Task 6: Extend `.claude/skills/post-intake/SKILL.md`

**Files:**
- Modify: `.claude/skills/post-intake/SKILL.md`

**Why now:** WRITINGS.md exists, so the skill can reference it as the authoritative workflow doc. The skill is the operational checklist; WRITINGS.md is the long-form reference.

- [ ] **Step 1: Read the current skill**

Read `.claude/skills/post-intake/SKILL.md` completely. Note the current structure: frontmatter `description`, then sections including Step 0, Step 1 (brainstorm), voice rules, post type recipes, frontmatter spec, body structure, voice checklist, after drafting, useful references.

- [ ] **Step 2: Update the `description` frontmatter field**

Replace the current `description:` line in the YAML frontmatter with:

```yaml
description: Drafting, refining, publishing, or cross-posting a writing post (essay, build log, or note) on jasonvermaelen.com. Covers pre-draft brainstorm, voice rules, frontmatter, structural templates, the site publishing checklist, the LinkedIn cross-post workflow, and the human-in-the-loop permission gates. Auto-load when the user mentions blog post, writing post, build log, essay, note, publishing a post, or cross-posting to LinkedIn.
```

- [ ] **Step 3: Add new "Step N: Publishing + LinkedIn cross-post" section**

Insert this new section directly after the existing "Step 1 - Brainstorm before drafting" section. **Em-dash policy:** the existing skill file may have em-dashes in some headings (it was authored before the May 2026 site-wide sweep). Skill files are not user-facing rendered content, so existing em-dashes can stay. However, ANY NEW CONTENT YOU ADD in this task uses hyphens with spaces, not em-dashes - matches the modern convention and keeps drift minimal.

```markdown
## Step 2 - Publishing + LinkedIn cross-post

**Authoritative reference: [`docs/WRITINGS.md`](../../../docs/WRITINGS.md) §7 (site publishing) and §8 (LinkedIn cross-post).** That doc carries the long-form workflow; this section is the operational checklist.

### Site publishing - pre-commit checklist

Before any `git push origin main` that flips a post's `status: drafting` → `status: live`:

1. Voice scrub (see §4 voice rules above)
2. AI-tell scrub (5 items - see below)
3. `pnpm exec velite` succeeds
4. `pnpm typecheck && pnpm lint && pnpm build` all green
5. Per-post OG image renders at `/writing/<slug>/opengraph-image` (visit in dev to verify)
6. `data/writing.json` entry exists with `status: "live"`

### AI-tell scrub (5 items)

1. No em-dashes anywhere (site-wide convention)
2. Variable paragraph length (mix of 1-sentence and 3-5-sentence paragraphs)
3. At least one named entity per ~300 words (specific tool, person, company, date, dollar figure)
4. No "It's not X, it's Y" constructions
5. No tricolons (three parallel clauses) or repeated rhetorical structures

### Voice sample capture

After the AI-tell scrub passes, scan the post for any paragraph that particularly captures Jason's voice. If one stands out, copy it into [`docs/VOICE.md`](../../../docs/VOICE.md) §4 (Words & Phrases That Sound Like Jason) as a worked sample with a one-line context note ("from <slug>.mdx, <date>"). VOICE.md grows organically with real examples.

### Gate 1 - STOP before site publish

> "Pre-publish checkpoint. Do not run `git push origin main`. Show Jason: (1) the diff summary of files changed, (2) the result of the voice + AI-tell checklist (all five items pass or flag which failed), (3) the local preview URL (typically `localhost:3000/writing/<slug>`) or Vercel preview URL. Wait for explicit approval - 'ship it', 'go', 'looks good', or equivalent. Only after explicit approval, run `git push`."

This gate is non-negotiable.

### LinkedIn cross-post - shape by type

- **Note (200-500 words)** → full republish on LinkedIn, no link, 3-5 hashtags
- **Build log + Essay (text version, current default)** → custom 1,300-1,900 character rewrite, hook in first 210 chars, link to site post at the very end of the body, 3-5 hashtags, attach the same per-post OG image from the site

### LinkedIn cross-post workflow

1. Read the live site post
2. Write LinkedIn version to `content/writing/_linkedin/<slug>.md`
3. Apply AI-tell scrub (same 5 items as above)
4. Stamp into `docs/templates/linkedin-preview.html` → write `content/writing/_linkedin/<slug>-preview.html`
5. Give Jason the absolute path to open in his browser
6. Iterate on the draft based on Jason's preview feedback

### Gate 2 - STOP before LinkedIn publish (strongest gate)

> "Pre-LinkedIn checkpoint. Do not tell Jason 'this is ready to paste.' First: (1) generate the LinkedIn preview HTML at `content/writing/_linkedin/<slug>-preview.html`, (2) give Jason the local file path, (3) wait for him to review in his browser, (4) iterate if he requests changes. Only after explicit approval, output the final copyable block (text + image path + hashtags) for him to paste into LinkedIn manually. This gate is the strongest gate in the entire writings workflow - a bad LinkedIn post is harder to undo than a bad git commit."

### After Gate 2 approval

1. Output a copyable code block containing: final LinkedIn post text + image file path + hashtag set
2. Remind Jason that LinkedIn's native preview is the final sanity check before he clicks Publish
3. Commit `_linkedin/<slug>.md` and `<slug>-preview.html` to the repo for archive
4. Note the ~30-min window: the LinkedIn post performs best if published within ~30 min of the site post going live (per LinkedIn 2026 algorithm research)
```

- [ ] **Step 4: Update the "Useful references" section at the end of the skill**

Find the existing references section. Add these entries (preserve existing entries):

```markdown
- [`docs/WRITINGS.md`](../../../docs/WRITINGS.md) - authoritative workflow for writing posts + LinkedIn cross-posts
- [`docs/templates/linkedin-preview.html`](../../../docs/templates/linkedin-preview.html) - LinkedIn preview template (stamped per-post into `_linkedin/<slug>-preview.html`)
- `content/writing/_linkedin/` - per-post LinkedIn drafts and rendered previews live here
```

- [ ] **Step 5: Trim mildly redundant inline content**

Locate the inline "Voice rules" and "How Jason opens / closes a piece" sections. Compress them. Replace with:

```markdown
## Voice rules

The three-word version: **Warm. Curious. Grounded.**

For the full voice guide, see [`docs/VOICE.md`](../../../docs/VOICE.md). For the AI-tell scrub list, see Step 2 above (Publishing) or [`docs/WRITINGS.md`](../../../docs/WRITINGS.md) §5.

Key Jason-isms to preserve:
- Numbers before adjectives ("Returned ~1,500 hours/year" beats "improved efficiency")
- Lead with WHY before WHAT
- Plain language. If it sounds like a McKinsey deck, rewrite it
- Quiet confidence - don't hedge with "perhaps" or "it might be worth"
- Acknowledge tradeoffs - honest framing beats highlight reel
```

The "How Jason opens / closes a piece" section can be removed entirely - its content is captured in `docs/WRITINGS.md` §6 (Structure templates) and `docs/VOICE.md` §6 (Structural Patterns).

- [ ] **Step 6: Read the skill back end-to-end**

Read the modified `.claude/skills/post-intake/SKILL.md`. Verify:
- YAML frontmatter has the updated description field
- Step 0 (read voice docs) preserved
- Step 1 (6-question brainstorm) preserved
- NEW Step 2 (publishing + LinkedIn) is present with both Gate 1 and Gate 2 wording exact
- Voice rules trimmed but key Jason-isms still listed
- Useful references section includes the three new entries

- [ ] **Step 7: Verify the skill still loads (build won't catch this; manual check)**

In a fresh Claude Code session, the skill should auto-discover from `.claude/skills/post-intake/SKILL.md` and surface the updated description in any "list skills" output. This can't be verified in the current session - just a note for the next session.

- [ ] **Step 8: Commit**

```powershell
git add ".claude/skills/post-intake/SKILL.md"
git commit -m "Extend post-intake skill with publishing + LinkedIn cross-post workflow"
```

---

## Task 7: End-to-end acceptance test on `building-the-portfolio`

**Files:**
- Create: `content/writing/_linkedin/building-the-portfolio.md` (the draft LinkedIn post)
- Create: `content/writing/_linkedin/building-the-portfolio-preview.html` (rendered preview from template)

**Why now:** All infrastructure is in place. This is the acceptance test: prove the workflow actually works end-to-end on the existing live post.

**Important note on the LinkedIn draft below:** The text below is a PROVISIONAL first draft for the acceptance test, intended as proof that the workflow produces a sensible output. It is NOT pre-approved for publishing. Gate 2 still applies: Jason must approve the draft before it ever gets pasted into LinkedIn. The draft is committed to the repo (in `_linkedin/`) as a starting point for iteration, not as a finished product.

- [ ] **Step 1: Read the existing seed post**

Read `content/writing/building-the-portfolio.mdx`. Note:
- Title: "Building the portfolio I'd actually want a recruiter to read."
- Tag: `build` (build log)
- Date: 2026-05-19
- Dek: "The brief, the rejected directions, the design decisions I made on the way to a v1 - and the one thing I'd tell another analyst to do before designing anything."

Per the workflow (build log type), the LinkedIn version is a custom 1,300-1,900 character rewrite with the link at the end.

- [ ] **Step 2: Write the LinkedIn draft**

Create `content/writing/_linkedin/building-the-portfolio.md` with this content:

```markdown
---
slug: building-the-portfolio
type: build
char_count: <fill in after writing>
hashtags: ["DataAnalytics", "BusinessIntelligence", "PortfolioBuild", "Recruiting"]
image_path: "/writing/building-the-portfolio/opengraph-image"
posted_to_linkedin: false
posted_date: null
---

Most BI portfolios I've seen do one thing badly: they list projects and hope the recruiter fills in the blanks.

I rebuilt mine differently. Here's what changed.

The brief was tight - get interviews at Series A-D startups and FAANG, not just impress other developers. So every design decision started with: would a sharp PM or hiring manager at a Series B find this credible in 90 seconds?

That ruled out a lot. Standard Notion / Framer templates assume the work is visual - dashboards don't screenshot well, neither does SQL. Resume PDFs are static claims a recruiter has to take on faith. Building something elaborate to ship "later" turned into a stalling pattern.

What I landed on: a site that functions like a report. One headline metric per case study. Every section earns its place by answering a question a hiring manager actually asks.

Three design decisions that matter:

→ One accent color. Just cobalt. Forces every element to earn its place; a richer palette is more options to make it look like a template someone else designed.

→ Case study tradeoffs are mandatory. Every writeup has a "what I'd do differently" section. A portfolio that only shows wins is a brochure - the tradeoffs section is where hiring managers grade judgment.

→ Lead with the number, not the project name. "Salesforce case automation" is a project. "Returned ~1,500 hours/year to the team" is an outcome. The number is what gets the reply.

That last one is the headline I'd tell another analyst before they start: the number is the lead, the project name is context.

Full writeup with the rejected directions and what I'd change: https://jasonvermaelen.com/writing/building-the-portfolio

#DataAnalytics #BusinessIntelligence #PortfolioBuild #Recruiting
```

After writing, count characters in the post body (excluding frontmatter). Aim for 1,300-1,900. Update the `char_count` field in the frontmatter to match. Should land roughly in the 1,400-1,600 range.

- [ ] **Step 3: Apply AI-tell scrub**

Re-read the draft. Verify:
- ✓ No em-dashes (uses → arrows and hyphens with spaces instead)
- ✓ Variable paragraph length (1-sentence paragraphs mixed with 3-sentence ones)
- ✓ Named entities present ("Notion", "Framer", "Series A-D", "FAANG", "Salesforce", "1,500 hours/year", "cobalt")
- ✓ No "It's not X, it's Y" constructions
- ✓ No tricolons (three parallel-clause sentences)

If any check fails, edit and re-scrub.

- [ ] **Step 4: Generate the LinkedIn preview HTML**

Read `docs/templates/linkedin-preview.html`. Substitute the placeholder slots with the actual content:

- `{{POST_SLUG}}` → `building-the-portfolio`
- `{{PROFILE_NAME}}` → `Jason Vermaelen`
- `{{PROFILE_HEADLINE}}` → `Senior BI Analyst at Indeed | Salesforce CRM Analytics | Context Engineering`
- `{{PROFILE_IMAGE_PATH}}` → `../../../public/headshot.png` (relative path from `_linkedin/` to `public/`)
- `{{POST_TIME}}` → `Just now`
- `{{POST_BODY_RENDERED}}` → the full post body text from Step 2, with hashtags wrapped in `<span class="hashtag">#DataAnalytics</span>` style
- `{{POST_IMAGE_PATH}}` → handled as follows:
  - The per-post OG image is rendered by the Next.js Edge route at build time, not stored as a local file. The preview HTML opens directly in a browser without the dev server, so it can't fetch the dynamic Edge URL.
  - Concrete solution: with `pnpm dev` running, visit `http://localhost:3000/writing/building-the-portfolio/opengraph-image`, right-click → "Save image as" → save to `public/og-building-the-portfolio.png`. Then set `{{POST_IMAGE_PATH}}` → `../../../public/og-building-the-portfolio.png`.
  - This produces a faithful preview. For the production LinkedIn post, Jason attaches the real Edge-rendered image (download or screenshot from the live URL `https://jasonvermaelen.com/writing/building-the-portfolio/opengraph-image`).
- `{{POST_IMAGE_ALT}}` → `Building the portfolio I'd actually want a recruiter to read - blog post header`
- `{{CHAR_COUNT}}` → the actual character count from Step 2
- `{{HOOK_PASS_CLASS}}` → `pass`
- `{{HOOK_PASS_TEXT}}` → `✓ Strong hook in first 210 chars (contrarian-take lead)`
- `{{AI_SCRUB_CLASS}}` → `pass`
- `{{AI_SCRUB_TEXT}}` → `✓ 5/5 checks pass`
- `{{HASHTAG_PASS_CLASS}}` → `pass`
- `{{HASHTAG_COUNT}}` → `4`
- `{{IMAGE_PASS_CLASS}}` → `pass`
- `{{IMAGE_PASS_TEXT}}` → `✓ Per-post OG image`

Write the substituted result to `content/writing/_linkedin/building-the-portfolio-preview.html`.

- [ ] **Step 5: Open the preview in a browser**

Open `content/writing/_linkedin/building-the-portfolio-preview.html` directly in a browser (no dev server needed; it's static HTML).

Verify:
- Profile circle shows Jason's headshot (or a placeholder if path resolution fails)
- Profile name and headline render
- Post body shows full text with proper formatting
- Hashtags render in LinkedIn blue
- Image rendering area is present (may show broken image icon if path doesn't resolve; document)
- Engagement bar at bottom shows Like/Comment/Repost/Send
- Validation block at bottom shows all 5 checks passing in green
- Desktop/Mobile toggle works (mobile mode hides content past ~210 chars)

- [ ] **Step 6: Verify the per-post OG image works for this post**

Run `pnpm dev` (in another terminal).

Visit: `http://localhost:3000/writing/building-the-portfolio/opengraph-image`

Expected: a 1200×630 PNG showing the post's actual title, dek, "BUILD LOG" tag, date (May 19, 2026), and Jason Vermaelen byline. Background cream `#fafaf7`.

Stop the dev server.

- [ ] **Step 7: Commit the acceptance test artifacts**

```powershell
git add content/writing/_linkedin/building-the-portfolio.md content/writing/_linkedin/building-the-portfolio-preview.html
git commit -m "Acceptance test: end-to-end LinkedIn draft + preview for building-the-portfolio"
```

---

## Task 8: Final verification + push

**Files:**
- None modified (verification only)

- [ ] **Step 1: Full build green**

Run from repo root:

```powershell
pnpm typecheck
pnpm lint
pnpm build
```

Expected: All three pass with no errors. The `pnpm build` output should include `├ ƒ /(site)/writing/[slug]/opengraph-image` in the routes list.

- [ ] **Step 2: Verify all 10 acceptance criteria from the spec §10**

Read `docs/superpowers/specs/2026-05-24-writings-instructions-design.md` §10. For each unchecked box, confirm it's now satisfied:

- [ ] `docs/WRITINGS.md` exists with all 11 sections - check Task 4
- [ ] `docs/INSTRUCTIONS.md` §5 migrated with cross-reference - check Task 5
- [ ] `.claude/skills/post-intake/SKILL.md` updated - check Task 6
- [ ] `docs/templates/linkedin-preview.html` exists and renders - check Task 3
- [ ] `content/writing/_linkedin/` directory exists - check Task 1
- [ ] `app/(site)/writing/[slug]/opengraph-image.tsx` exists and renders correctly for building-the-portfolio - check Tasks 2 + 7
- [ ] End-to-end test passed - check Task 7
- [ ] Voice + AI-tell scrub: new docs themselves pass the scrub - read through, verify
- [ ] `pnpm typecheck && pnpm lint && pnpm build` all pass - check this step

- [ ] **Step 3: Push to remote**

```powershell
git push origin main
```

Expected: all task commits land on the remote.

- [ ] **Step 4: Summary**

Output a one-paragraph summary of what shipped:

> "Writings workflow infrastructure complete. Created `docs/WRITINGS.md` (workflow), `docs/templates/linkedin-preview.html` (preview template), `app/(site)/writing/[slug]/opengraph-image.tsx` (per-post OG images), `content/writing/_linkedin/` directory. Extended `.claude/skills/post-intake/SKILL.md` with the publishing + LinkedIn cross-post workflow, including Gate 1 (pre-site-publish) and Gate 2 (pre-LinkedIn-publish, the strongest gate). Migrated `docs/INSTRUCTIONS.md` §5 to a WRITINGS.md cross-reference. Acceptance test passed end-to-end on `building-the-portfolio` post."

---

## Notes for the implementer

- **Em-dashes:** This repo has a site-wide convention against em-dashes (May 2026 sweep). The WRITINGS.md and post-intake skill files we're creating/modifying are NOT user-facing rendered text, but for consistency, prefer hyphens with spaces over em-dashes in any new content. Existing skill files may have em-dashes - those are fine to preserve since they don't render to users.

- **TDD note:** Strict TDD doesn't apply to most of this work (the bulk is doc writing). For the per-post OG image generator (Task 2), the test is "visit the URL and verify it renders" rather than a unit test, because the project has no unit test framework currently. This is acceptable.

- **Commits:** Each task ends with a commit. Don't batch multiple tasks into one commit - the per-task granularity matters for review.

- **Stop and ask:** If any step's expected output doesn't match reality, STOP and surface the issue. Don't proceed past a failing step.

- **Velite regeneration:** After modifying anything in `content/`, run `pnpm exec velite` to refresh the `.velite/` cache before running build.
