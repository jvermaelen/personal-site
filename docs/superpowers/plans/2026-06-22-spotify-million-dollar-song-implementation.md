# Spotify Million-Dollar-Song Post — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `/writing/spotify-million-dollar-song` to `jasonvermaelen.com` per the spec at `docs/superpowers/specs/2026-06-22-spotify-million-dollar-song-design.md`.

**Architecture:** Single MDX post in `content/writing/`, hand-coded inline SVG chart in Beat 4, OG image route reusing the chart, new entry in `data/writing.json` at publish. No companion repo, no notebook, no chart toolchain — back-of-envelope math with one good visual.

**Tech Stack:** Next.js 16, velite, Tailwind v4, TypeScript. Inline SVG for the chart (no matplotlib, no recharts).

---

## File Structure

| File | Purpose | Action |
|---|---|---|
| `content/writing/spotify-million-dollar-song.mdx` | The post itself + inline SVG chart | Create |
| `app/(site)/writing/spotify-million-dollar-song/opengraph-image.tsx` | OG image at 1200x630 reusing the chart | Create |
| `data/writing.json` | Writing index entry (added at publish, status: "live") | Modify |

No new components, no helper modules. The chart lives inline in the MDX as raw SVG. The OG image renders its own SVG with title overlay. This keeps the post fully self-contained.

---

## Phase 1: Verify numbers and pick reference songs

### Task 1: Re-verify Spotify headline figures at write-time

The spec used numbers current as of June 2026. Re-verify before drafting in case anything has shifted (e.g., Q2 2026 earnings dropped late July).

**Files:** None modified. This is a verification step before drafting.

- [ ] **Step 1: Confirm Loud & Clear 2025 payout figure ($11B) is still the most recent published**

Search the web for "Spotify Loud and Clear 2025 royalty payout" and verify $11B is still cited as the 2025 total. If a 2026 mid-year update has dropped, use the newer figure.

- [ ] **Step 2: Confirm latest MAU and Premium sub counts**

Search for "Spotify Q2 2026 earnings MAU" (or whichever is latest). Spec used Q1 2026: 761M MAU, 293M Premium. If a newer quarter has reported, use those numbers.

- [ ] **Step 3: Confirm total annual streams estimate (~3.2T for 2025)**

Search for "Spotify total streams 2025 annual" and verify 3.2T is still the cited figure. Acceptable to use industry estimates from Chartmetric / Music Business Worldwide if Spotify hasn't officially published.

- [ ] **Step 4: Recompute derived numbers if any input changed**

If any of the three figures shifted, update the derived math in your working notes:
- Monthly pool = annual_payout / 12
- Monthly streams = annual_streams / 12
- $1M target as % of pool = 1,000,000 / monthly_pool
- Streams needed = pct * monthly_streams
- Daily streams = streams_needed / 30
- % of MAU = daily_streams / MAU

Keep these numbers in scratch notes for use in drafting. No commit yet.

### Task 2: Pick 5-8 reference songs and pull annual stream counts

**Files:** None modified. Scratch work for chart data.

- [ ] **Step 1: Pull 2025 Spotify Wrapped top songs**

Open `https://newsroom.spotify.com/2025-12-03/wrapped-top-artists-songs-albums-podcasts-audiobooks/` (or the most recent Wrapped announcement). List the top 5 songs by global streams.

- [ ] **Step 2: Pull annual stream counts from kworb.net**

Visit `https://kworb.net/spotify/songs.html` for Spotify's all-time and yearly stream rankings. For each Wrapped top song, capture its 2025 stream count. Aim for 6-8 songs total spanning the range:
- 1-2 megahits (top of Wrapped)
- 2-3 well-known hits (top 20 of 2025)
- 1-2 mid-tier popular songs (recognizable but not blockbusters)
- 1 indie comparison (something respectable but not viral, e.g., ~50M annual streams)

Record in scratch as a table: song, artist, 2025 streams (M).

- [ ] **Step 3: Validate the "peak month ≈ 20% of annual" approximation**

Spot-check 2-3 songs that have publicly-known monthly chart data. Compare their reported peak monthly streams to (annual streams * 0.20). If the approximation is off by more than ~5 percentage points across all spot-checks, adjust the assumption (e.g., to 15% or 25%) and update the chart caption accordingly. Record the validated assumption.

- [ ] **Step 4: Compute estimated monthly royalties for each song**

For each: monthly_streams = annual_streams * <validated_pct>. Then implied_monthly_royalty = monthly_streams * 0.0034. Record in scratch as the final chart data table.

---

## Phase 2: Draft the post body

### Task 3: Create MDX scaffold with frontmatter

**Files:**
- Create: `content/writing/spotify-million-dollar-song.mdx`

- [ ] **Step 1: Create the file with frontmatter only**

```mdx
---
title: "I wondered what it would take to earn $1M from one song on Spotify. It's roughly the population of Belgium."
slug: "spotify-million-dollar-song"
date: "2026-06-22"
dek: "A back-of-the-envelope tour through Spotify's pro-rata pool, from one person looping a song for a year to what it actually costs to take home the money."
tags: ["essay"]
readTime: "5 min"
status: "Drafting"
draft: true
---
```

(Adjust the `date` field to today's actual ISO date when drafting.)

- [ ] **Step 2: Validate the frontmatter via velite**

Run: `pnpm exec velite`
Expected: clean build with the new post recognized in the Writing collection. If velite errors on a field, fix the frontmatter to match `velite.config.ts` schema (tags enum, status enum, slug regex, char limits).

- [ ] **Step 3: Commit the scaffold**

```bash
git add content/writing/spotify-million-dollar-song.mdx
git commit -m "draft: scaffold spotify-million-dollar-song post"
```

### Task 4: Draft Beat 1 — The question + mechanic (~150 words)

**Files:**
- Modify: `content/writing/spotify-million-dollar-song.mdx`

- [ ] **Step 1: Write Beat 1 directly into the MDX**

Append after the frontmatter:

```mdx
## The question

I pay Spotify $11.99 a month, and on a long drive last week I started wondering: if I uploaded a 3-minute song tomorrow, what would it take to gross $1 million from it in a single billing cycle?

The honest answer requires fixing a small misconception first. Spotify doesn't pay artists per stream the way most people assume. Every month, the company pools all subscription and ad revenue, keeps about 30% for itself, and divides the remaining ~70% among rights holders based on each artist's share of total platform streams. The pool is fixed. More listening doesn't make the pool bigger. It just slices each artist's share thinner. The famous "$0.003 per stream" figure is what falls out of (pool ÷ streams) after the fact, not a contract Spotify signs.

That changes the question. It's no longer "how much do I make per play?" It becomes: how much of the world's listening can I claim in a month?

Spotify paid the music industry $11 billion in 2025, per their Loud & Clear report. That's a monthly pool of roughly $917 million. To pocket $1 million from it, I need to claim about 0.11% of every dollar that flows through the system that month.
```

- [ ] **Step 2: Voice check — read it back aloud**

Read the beat aloud. Verify:
- Leads with context (the question, then the mechanic), not the conclusion ✓
- Specific numbers ($11.99, 30%, $11B, $917M, 0.11%) ✓
- Plain language, no buzzwords (no "leverage", "robust", "utilize", etc.) ✓
- First person "I" ✓
- No em-dashes (use spaced hyphens)

- [ ] **Step 3: Commit**

```bash
git add content/writing/spotify-million-dollar-song.mdx
git commit -m "draft: write Beat 1 (question + mechanic)"
```

### Task 5: Draft Beat 2 — The silly version (~200 words)

**Files:**
- Modify: `content/writing/spotify-million-dollar-song.mdx`

- [ ] **Step 1: Append Beat 2 to the MDX**

```mdx
## The silly version

The first instinct, of course, is to just listen to the song myself. A lot. A 3-minute song means 480 plays per day, every day. Over a month, one person looping the song 24/7 would log 14,400 plays.

I need roughly 291 million streams in that month to hit my target. (That's 0.11% of an estimated 267 billion total monthly streams across the platform.) Dividing those 291 million by my 14,400 monthly loops, I'd need about 20,000 people streaming the song nonstop for the entire month, never sleeping, never pausing, never switching apps.

Here's the punchline: even if I could organize 20,000 friends willing to do this, the streams wouldn't count. Spotify's 2024 royalty model update added detection for artificial streaming, and looped plays from a tiny cohort get flagged and zeroed out. The same update added a 1,000-streams-per-year minimum below which tracks earn literally nothing. The silly strategy doesn't just fail to make me a millionaire. It fails to make me a single dollar.

So the song has to actually be popular. Which raises the next question: what does "popular enough to net me $1M in a month" look like in real numbers?
```

- [ ] **Step 2: Voice check**

Verify:
- The "20,000 people streaming nonstop" image is concrete, not abstract
- The fraud-detection reveal lands as a joke, not a lecture
- The pivot to Beat 3 is one clean sentence
- No em-dashes

- [ ] **Step 3: Commit**

```bash
git add content/writing/spotify-million-dollar-song.mdx
git commit -m "draft: write Beat 2 (silly version)"
```

### Task 6: Draft Beat 3 — What actually doing it looks like (~200 words)

**Files:**
- Modify: `content/writing/spotify-million-dollar-song.mdx`

- [ ] **Step 1: Append Beat 3 to the MDX**

```mdx
## What actually doing it looks like

If real people listen to the song once a day (no loops, no friend-network coordination, just genuine plays), the math gets cleaner. 291 million streams over 30 days is about 9.7 million streams per day. So I need 9.7 million unique people pressing play on my song every single day for a month.

Spotify has roughly 761 million monthly active users as of Q1 2026. That means I need about 1.28% of every Spotify user in the world to listen to my song daily. Not "have heard of it." Not "saved it." Pressed play, every day, for a month.

For scale, 9.7 million people is roughly the population of Belgium. Or every adult in New York City, every day, for thirty days.

And remember, that's the minimum. Because the pool is fixed, every stream I capture is a stream that didn't go to someone else. A meaningful share of Belgium would have to skip something they'd usually play in favor of my song. Pro-rata makes my win someone else's loss, in a way the per-stream framing hides.
```

- [ ] **Step 2: Voice check**

Verify:
- The Belgium comparison lands (it's the title's payoff)
- Numbers are specific (9.7M, 1.28%, 761M)
- The "win is someone else's loss" line plants the pro-rata insight without lecturing
- No em-dashes

- [ ] **Step 3: Commit**

```bash
git add content/writing/spotify-million-dollar-song.mdx
git commit -m "draft: write Beat 3 (Belgium-scale realistic version)"
```

### Task 7: Draft Beat 4 prose (chart placeholder for now) (~250 words)

**Files:**
- Modify: `content/writing/spotify-million-dollar-song.mdx`

- [ ] **Step 1: Append Beat 4 prose with a placeholder for the chart**

Use the validated reference song data from Task 2. Adapt the exact song picks and numbers to match what you pulled. Insert a placeholder `{/* CHART GOES HERE */}` where the SVG will land.

```mdx
## How this stacks against real hits

The cleanest way to understand "1.28% of all Spotify listening, every day" is to see how it compares to songs that actually do hit those numbers.

{/* CHART GOES HERE */}

(Annual stream counts via kworb.net; monthly figures estimated as roughly 20% of annual streams, which approximates the peak-month behavior of top tracks.)

The chart is humbling. Even the biggest songs of 2025 only cleared $1M in royalties in their absolute peak month, and most "huge" songs land closer to $200-500K per peak month at typical chart-topper scale.

Spotify's own Loud & Clear report confirms the scarcity. In all of 2025, only about 1,500 artists earned $1M+ from Spotify across their entire catalogs for the full year. Only about 80 cleared $10M for the year. So a single song clearing $1M in one month isn't "successful artist" territory. It's "in the running for song of the year" territory.

Two caveats worth naming before the punchline. The $0.0034 per-stream figure I've been using is a global average; the actual implied rate varies by listener market (US streams generate more pool than Indian streams because of subscription pricing), Premium vs Free, and recent bundling rules. The math also assumes I own the song outright. The next section will complicate that.
```

- [ ] **Step 2: Voice check**

Verify:
- The Loud & Clear data lands as a reference point, not a tangent
- The pivot to Beat 5 is one clean question
- Chart caption uses parentheses (matches site convention)
- No em-dashes

- [ ] **Step 3: Commit**

```bash
git add content/writing/spotify-million-dollar-song.mdx
git commit -m "draft: write Beat 4 prose with chart placeholder"
```

### Task 8: Draft Beat 5 — The take-home kicker (~200 words)

**Files:**
- Modify: `content/writing/spotify-million-dollar-song.mdx`

- [ ] **Step 1: Append Beat 5 to the MDX**

```mdx
## And then there's the take-home

$1 million to the song is not $1 million to the artist.

Anyone uploading independently through a service like DistroKid keeps almost everything (DistroKid takes a flat annual fee instead of a percentage; CD Baby's percentage model takes around 9%). After distributor fees, an indie release in this scenario probably nets around $900K before taxes.

A typical major-label deal looks very different. The label usually keeps 50% or more off the top of recording royalties, songwriters get their own publishing cut, and producer points (usually 2-5%) come out before the artist sees the balance. A signed artist hitting $1M in a single month often takes home somewhere between $200K and $400K of it, before taxes.

So here's the full picture. Hitting $1M from one song in *one month* puts the song in the top fraction of a percent of music on the entire platform. The artist needs the equivalent of Belgium pressing play every day. They need to beat Spotify's anti-fraud detection by being genuinely loved, not artificially streamed. And after the splits, the artist takes home *in that one peak month* roughly what a senior software engineer earns *across a full year of work*.

Streaming economics are strange.
```

- [ ] **Step 2: Voice check**

Verify:
- The closing line is the last word — no "in conclusion", no "thanks for reading"
- The year-vs-month contrast is *explicit* and italicized for emphasis
- Quiet confidence — the math is doing the work, not adjectives
- No em-dashes

- [ ] **Step 3: Commit**

```bash
git add content/writing/spotify-million-dollar-song.mdx
git commit -m "draft: write Beat 5 (take-home kicker)"
```

### Task 9: Add footer disclosure

**Files:**
- Modify: `content/writing/spotify-million-dollar-song.mdx`

- [ ] **Step 1: Append the footer disclosure**

```mdx
---

*Numbers from Spotify's [Loud & Clear 2025 report](https://loudandclear.byspotify.com/) and Q1 2026 earnings release, current as of June 2026. The pro-rata explainer draws on Liz Pelly's* Mood Machine *(2025) and reporting from Music Business Worldwide. If you're reading this a year from now, the pool has gotten bigger and the per-stream math has gotten worse.*
```

(Italicized via single-asterisk markdown; the book title is double-italicized via the nested asterisks pattern.)

- [ ] **Step 2: Commit**

```bash
git add content/writing/spotify-million-dollar-song.mdx
git commit -m "draft: add footer disclosure with sources"
```

---

## Phase 3: Build the chart

### Task 10: Design the SVG chart inline

**Files:**
- Modify: `content/writing/spotify-million-dollar-song.mdx`

Replace the `{/* CHART GOES HERE */}` placeholder with hand-coded SVG. Use the validated chart data from Task 2.

- [ ] **Step 1: Sketch the chart dimensions and structure**

Plan on paper or in scratch:
- ViewBox: `0 0 800 480` (roughly 5:3, fits responsive container)
- Left margin for song labels: ~200px
- Right margin: ~40px
- Bar height: ~32px with ~10px gap between bars
- Total bars: validated count from Task 2 + 1 (for "Your song")
- X-axis: linear scale 0 to (max bar value * 1.1) for breathing room
- $1M reference line: dashed vertical at x corresponding to $1,000,000

- [ ] **Step 2: Write the SVG**

Replace the placeholder with this scaffold, populating the data from Task 2:

```mdx
<svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar chart comparing estimated monthly Spotify royalties for top 2025 songs against the $1M target">
  <title>Estimated monthly Spotify royalties for top 2025 songs vs $1M target</title>

  {/* Bars — one rect per song, x=200 (left margin), width = (royalty/max)*scale */}
  {/* Example bar for one song: */}
  <g>
    <text x="190" y="42" text-anchor="end" font-family="system-ui, sans-serif" font-size="13" fill="var(--ink)">Song name</text>
    <text x="190" y="58" text-anchor="end" font-family="system-ui, sans-serif" font-size="11" fill="var(--ink-soft)">Artist</text>
    <rect x="200" y="28" width="350" height="32" fill="var(--accent)" rx="2"/>
    <text x="560" y="50" font-family="system-ui, sans-serif" font-size="12" fill="var(--ink-soft)">$1.4M</text>
  </g>

  {/* Repeat <g> blocks per song. "Your song" goes last, tiny bar at $1M target */}

  {/* $1M reference line — dashed vertical */}
  <line x1="450" y1="20" x2="450" y2="430" stroke="#d97706" stroke-width="2" stroke-dasharray="6 4"/>
  <text x="455" y="18" font-family="system-ui, sans-serif" font-size="11" fill="#d97706">$1M / month</text>

  {/* X-axis baseline */}
  <line x1="200" y1="430" x2="780" y2="430" stroke="var(--ink-soft)" stroke-width="1"/>
  <text x="200" y="450" font-family="system-ui, sans-serif" font-size="11" fill="var(--ink-soft)">$0</text>
  <text x="780" y="450" text-anchor="end" font-family="system-ui, sans-serif" font-size="11" fill="var(--ink-soft)">Estimated monthly royalties</text>
</svg>
```

Adjust the actual x positions, widths, and labels based on your real data. The 450 x-coordinate for the $1M line is illustrative; compute it from your scale.

- [ ] **Step 3: Verify the SVG renders correctly in local dev**

Run: `pnpm dev` and open `http://localhost:3000/writing/spotify-million-dollar-song`. Check that:
- The chart renders at the expected size on desktop
- Bars are cobalt accent in light mode, lifted cobalt in dark mode
- The $1M line is amber
- All song labels are readable
- "Your song" bar is visible (small but present)
- No horizontal overflow on mobile (resize browser to 375px width to verify)

- [ ] **Step 4: Commit**

```bash
git add content/writing/spotify-million-dollar-song.mdx
git commit -m "draft: embed Beat 4 reference-song chart as inline SVG"
```

### Task 11: Build the OG image route

**Files:**
- Create: `app/(site)/writing/spotify-million-dollar-song/opengraph-image.tsx`

The OG image renders the same chart at 1200x630 with the post title overlaid. Look at `app/opengraph-image.tsx` (the homepage OG) for the pattern.

- [ ] **Step 1: Create the OG image route file**

```tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = "I wondered what it would take to earn $1M from one song on Spotify. It's roughly the population of Belgium.";
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: '#f8f9fa',
          padding: '60px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ fontSize: 32, color: '#475569', marginBottom: 20 }}>
          jasonvermaelen.com / writing
        </div>
        <div style={{ fontSize: 48, fontWeight: 600, color: '#0f172a', lineHeight: 1.2, marginBottom: 40 }}>
          What it takes to earn $1M from one song on Spotify
        </div>
        {/* Embed simplified chart inline. Re-render bars + reference line at OG dimensions. */}
        {/* Use the same data as the inline MDX chart but scaled for 1200x630. */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div style={{ fontSize: 28, color: '#2563eb', fontWeight: 600 }}>
            ~9.7M daily listeners. Belgium-sized.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
```

(This is a simpler "callout card" approach for the OG, rather than reimplementing the full chart in `next/og`'s JSX-as-image renderer. The full chart works in MDX as SVG, but `next/og` has limited SVG support, so a text-forward OG with the key takeaway number lands harder anyway.)

- [ ] **Step 2: Verify OG renders**

Run: `pnpm dev` and visit `http://localhost:3000/writing/spotify-million-dollar-song/opengraph-image`. The image should render at 1200x630 with the title and "9.7M daily listeners" callout.

Test the OG by checking the page source for the `<meta property="og:image">` tag pointing to this route.

- [ ] **Step 3: Commit**

```bash
git add app/(site)/writing/spotify-million-dollar-song/opengraph-image.tsx
git commit -m "feat(writing): add OG image for spotify-million-dollar-song"
```

---

## Phase 4: Pre-publish polish

### Task 12: Voice checklist pass

**Files:** None modified unless issues found. This is a review pass.

- [ ] **Step 1: Read the full post aloud, top to bottom**

Open `content/writing/spotify-million-dollar-song.mdx`. Read every paragraph aloud, beginning to end.

- [ ] **Step 2: Run the VOICE.md checklist**

For each item, verify (and fix if needed):
- Leads with context or problem, not conclusion ✓
- At least one specific number per major paragraph ✓
- No buzzwords: leverage (verb), synergies, robust, excited to share, passionate about, utilize, best-in-class, thought leader, circle back, move the needle ✓
- At least one acknowledged tradeoff or limitation (in the caveat box or footer) ✓
- Plain language, no jargon a non-expert would need to Google ✓
- Ends with a clear final point, not a summary ✓
- No em-dashes anywhere ✓
- First-person "I" used consistently ✓

If any item fails, fix in the MDX and re-read.

- [ ] **Step 3: Commit any voice fixes**

```bash
git add content/writing/spotify-million-dollar-song.mdx
git commit -m "polish: voice pass on spotify-million-dollar-song"
```

(Skip this commit if no fixes were needed.)

### Task 13: Em-dash sweep

**Files:** None modified unless em-dashes found.

- [ ] **Step 1: Sweep for em-dashes**

Run: `grep "—" content/writing/spotify-million-dollar-song.mdx`
Expected: zero matches.

If any em-dashes appear, replace them with spaced hyphens (` - `).

- [ ] **Step 2: Commit any fixes**

```bash
git add content/writing/spotify-million-dollar-song.mdx
git commit -m "polish: em-dash sweep on spotify-million-dollar-song"
```

(Skip this commit if no fixes were needed.)

### Task 14: Full validation gauntlet

**Files:** None modified. Verification only.

- [ ] **Step 1: Velite validation**

Run: `pnpm exec velite`
Expected: clean build, the new post listed under Writing collection.

- [ ] **Step 2: TypeScript check**

Run: `pnpm typecheck`
Expected: zero errors.

- [ ] **Step 3: Lint check**

Run: `pnpm lint`
Expected: zero warnings or errors.

- [ ] **Step 4: Full production build**

Run: `pnpm build`
Expected: clean build, the new route `/writing/spotify-million-dollar-song` listed in the static page generation.

- [ ] **Step 5: Local dev preview, final visual check**

Run: `pnpm dev` and visit `http://localhost:3000/writing/spotify-million-dollar-song`. Verify:
- Title renders correctly
- Dek displays below title
- All five beats render with `##` headings
- Chart renders crisp at desktop and mobile widths
- Footer disclosure italicizes properly
- Light/dark mode toggle works without breaking the chart
- No console errors

If any issues, fix in MDX/TSX and re-run. No commit for verification-only.

---

## Phase 5: Publish (gated on user approval)

> **STOP HERE.** Do not execute Phase 5 without explicit user "okay, ship it" approval. Per standing instructions, no GitHub pushes happen without user sign-off.

### Task 15: Flip frontmatter and add writing.json entry

**Files:**
- Modify: `content/writing/spotify-million-dollar-song.mdx` (frontmatter only)
- Modify: `data/writing.json`

- [ ] **Step 1: Flip the MDX frontmatter to published state**

In `content/writing/spotify-million-dollar-song.mdx`, change:
```yaml
status: "Drafting"
draft: true
```
to:
```yaml
status: "Live"
draft: false
```

Also update the `date` field to the actual publish date if it has shifted.

- [ ] **Step 2: Add the entry to `data/writing.json`**

Open `data/writing.json`. Add a new top-of-array entry (before the existing `sight-lines-and-suvs` entry):

```json
{
  "slug": "spotify-million-dollar-song",
  "date": "Jun 22",
  "year": "2026",
  "title": "I wondered what it would take to earn $1M from one song on Spotify. It's roughly the population of Belgium.",
  "dek": "A back-of-the-envelope tour through Spotify's pro-rata pool, from one person looping a song for a year to what it actually costs to take home the money.",
  "tag": "essay",
  "tagLabel": "Essay",
  "readTime": "5 min read",
  "status": "live"
}
```

Adjust the `date` and `year` to match the actual publish date. The `status: "live"` (lowercase) is what makes `PostRow` render the entry as a clickable link.

- [ ] **Step 3: Final validation gauntlet**

Run:
```bash
pnpm exec velite && pnpm typecheck && pnpm lint && pnpm build
```
Expected: all four pass clean.

- [ ] **Step 4: Em-dash final sweep**

Run: `grep "—" content/writing/spotify-million-dollar-song.mdx`
Expected: zero matches.

- [ ] **Step 5: Commit the publish flip**

```bash
git add content/writing/spotify-million-dollar-song.mdx data/writing.json
git commit -m "feat(writing): launch spotify-million-dollar-song post"
```

### Task 16: Push to deploy

**Files:** None modified. Deployment action.

- [ ] **Step 1: Confirm user approval to push**

Before pushing, explicitly ask the user: "Ready to push to GitHub and trigger the Vercel deploy?" Wait for explicit "yes" / "ship it" / "okay" before proceeding.

- [ ] **Step 2: Push to main**

Run: `git push origin main`
Expected: Vercel webhook fires, deploy begins.

- [ ] **Step 3: Verify deploy**

Wait ~1-2 minutes for Vercel to build and deploy, then visit `https://jasonvermaelen.com/writing/spotify-million-dollar-song`. Verify:
- Page loads with correct title and content
- Chart renders
- OG image is correct (test via `https://www.opengraph.xyz/url/https%3A%2F%2Fjasonvermaelen.com%2Fwriting%2Fspotify-million-dollar-song` or similar OG debugger)
- Writing index at `/writing` shows the new post as a clickable link

If issues, debug and push fixes as additional commits. Don't rollback unless something is genuinely broken.

---

## Out of scope

Things this plan deliberately does NOT do:
- Companion analysis repo (the post is back-of-envelope, not analysis)
- Custom React chart component (inline SVG only — see spec "Visual asset" section)
- Multiple charts (one in Beat 4 + the OG card is the full visual budget)
- Brainstorm scratch file at `content/writing/_drafts/` (the spec covers it)
- A "more like this" footer link to cars-vs-suvs (let site nav handle it)
- LinkedIn post text draft (separate workstream after the post is live)

## Process gates

- [x] Spec written and approved
- [x] Plan written and approved
- [ ] User reviews this plan and approves before implementation begins
- [ ] Implementation executes Phase 1 through Phase 4
- [ ] User explicitly approves Phase 5 (publish + push) before deploy
