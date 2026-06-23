# Spec: "I wondered what it would take to earn $1M from one song on Spotify"

**Status:** Drafting
**Author:** Jason Vermaelen
**Date:** 2026-06-22
**Type:** Personal-site blog post (essay), short-form
**Slug:** `spotify-million-dollar-song`
**Target length:** ~1,000-1,200 words (essay range per `post-intake` skill is 800-1,500)

## Goal

Walk a curious reader through what it would actually take for a single 3-minute song to gross $1 million in royalties from Spotify in one month. Use the question as a vehicle to (a) demystify Spotify's pro-rata royalty pool, (b) deliver three escalating "how big is big?" comparisons, and (c) land a quiet gut-punch about gross vs take-home pay for working artists.

The post is intentionally short and fun. It is not an analysis; it is back-of-the-envelope math with one good reveal.

## Six brainstorm answers (per `post-intake` skill, non-skippable)

### 1. The seed (one sentence)
Spotify's royalty system is a fixed pool, not a per-stream meter, so "winning big" on Spotify means claiming a meaningful slice of all the world's listening for one month, which turns the "how much can a song earn?" question into a vivid puzzle about scale.

### 2. The audience
LinkedIn-tier general readers who follow the site casually, plus the recruiter/hiring-manager segment who'll find this through a LinkedIn share. Technical-curious but not music industry insiders. They like a fun, math-y thought experiment that respects their time and teaches them something they didn't know. Phone-scroll context.

### 3. The one thing (single sentence the reader should remember)
**"Spotify's royalty pool is fixed at about $11B/year, so earning $1M from one song in one month means claiming roughly 0.1% of all global listening, and even at that top-of-platform scale, the take-home is what a senior engineer makes."**

If a reader takes nothing else away, this is it. Every paragraph should serve this sentence.

### 4. The angle (distinctive POV)
Most "how Spotify pays artists" pieces either explain the mechanism abstractly ("here's how pro-rata works") or argue the fairness case ("Spotify is/isn't ripping off musicians"). Neither hooks a casual reader, because both lead with the system instead of the question.

This post sidesteps both. It treats the system as a puzzle: "given these rules, what does the win condition actually look like?" The pro-rata explainer becomes a one-paragraph mechanic the reader needs in order to follow the math, not the post's thesis. The thesis is the *scale*. Belgium does the heavy lifting, not jargon.

### 5. The evidence (3-5 concrete items)
1. Spotify Loud & Clear 2025 report: $11B paid to music industry, 1,500+ artists earning $1M+, ~80 artists earning $10M+ (cited as anchor figures)
2. Spotify Q1 2026 earnings: 761M MAU, 293M Premium subs (cited for the scale comparison)
3. 2025 global stream volume (~3.2 trillion) from Chartmetric / industry reporting (cited as denominator)
4. 5-8 specific 2025 chart-topping songs with their stream counts (will pull at write-time from Spotify charts / kworb.net)
5. Standard distributor and label split percentages (DistroKid ~9%, major label ~50%+) for the take-home kicker

### 6. The honest tradeoff
This is back-of-envelope math, not a forecast or rigorous analysis. The real per-stream rate varies meaningfully by listener market (US streams generate more pool than Indian streams because of subscription price), Premium vs Free, and recent bundling rules in Spotify's 2024 royalty model update. The simple "pool ÷ streams" math collapses all of that into a single global average. The post acknowledges this in a caveat box near the end, and trusts the reader to recognize that order-of-magnitude is the right altitude for a fun post about thought-experiment numbers, not for negotiating a record deal.

## Title and dek

**Title:** `I wondered what it would take to earn $1M from one song on Spotify. It's roughly the population of Belgium.`
- 102 characters, well under the 160-char velite limit
- Matches the FARS post's "I wondered X. The data says Y." pattern
- Names the surprising number in the title to pull a click without spoiling the math

**Dek:** `A back-of-the-envelope tour through Spotify's pro-rata pool, from one person looping a song for a year to what it actually costs to take home the money.`
- 161 characters, well under the 320-char velite limit

## Structure (four beats + kicker, ~1,000-1,200 words)

Plain markdown, no MDX components. Each `##` heading corresponds to a beat. Heading text is illustrative; final wording set at draft time.

### Beat 1: `## The question` (~150 words)

Pose the question conversationally. "I pay Spotify $11.99 a month. I upload a 3-minute song tomorrow. What would it take to gross $1 million from it in a single billing cycle?"

One paragraph explaining how Spotify actually pays artists. Per VOICE.md's "lead with WHY before WHAT": don't start with the mechanic, start with the fact that the answer depends on the mechanic. The pro-rata explainer is *infrastructure* for the math that follows, not the thesis.

The mechanic paragraph (one paragraph only):
> "Spotify doesn't pay per stream the way most people assume. Every month they pool all subscription and ad revenue, keep about 30% for themselves, and divide the remaining ~70% among rights holders based on each artist's share of total platform streams. The pool is fixed. More listening doesn't make the pool bigger - it just slices each artist's share thinner. The famous '$0.003 per stream' figure is what falls out of (pool ÷ streams) after the fact, not a contract."

Close the beat by setting the target: $1M is roughly 0.11% of one month's global royalty pool. That's the target stream share.

### Beat 2: `## The silly version` (~200 words)

One person, on repeat, 24/7 for a month.
- 3-minute song = 480 plays/day per person
- 30 days = 14,400 plays/person/month
- Hitting ~291M streams requires ~20,200 people looping the song nonstop all month

**Punchline:** none of it counts. Spotify's 2024 royalty model update added anti-artificial-streaming detection that zeroes out repeat-loop plays from small cohorts. The same update introduced a 1,000-streams-per-year minimum below which tracks earn nothing. The silly version literally pays zero.

This beat sets up the joke that "more listening" isn't a winning strategy at the individual level - it can actually be a *negative* strategy if the system flags it as fraud.

### Beat 3: `## What actually doing it looks like` (~200 words)

If every listener plays your song once a day instead of looping:
- 291M streams ÷ 30 days = ~9.7M unique listeners per day
- 9.7M ÷ 761M Spotify MAU = ~1.28% of all Spotify users worldwide

For scale: ~9.7M people is roughly the population of Belgium (~11.7M, close enough for a joke). Or "every person in NYC plus most of Chicago." A mid-sized country, every single day, listening to one song.

Close the beat by acknowledging this is still the *minimum*: because the pool is fixed, your share comes at someone else's expense. Many of those listeners would have to skip something they'd usually play.

### Beat 4: `## How this stacks against real hits` (~250 words)

Compare to actual 2025 chart-toppers. Pull 5-8 real songs at draft time with their 2025 Spotify stream counts. Spread the picks:
- 1-2 megahits (whoever topped 2025 Wrapped)
- 2-3 well-known hits
- 1-2 mid-tier popular songs
- 1 indie comparison for the lower bound

Render as a horizontal bar chart, not a table. See the "Visual asset (chart)" section below for the full chart spec. Each bar is a 2025 chart-topper sized by its estimated *monthly* Spotify royalties, with a dashed reference line at $1M and "Your song" as a tiny bar at the bottom for the visceral scale comparison. Chart caption notes the monthly-from-annual estimation method.

Reveal: per Spotify's own Loud & Clear, 1,500+ artists earned $1M+ from Spotify in *all of 2025 combined*, and only ~80 cleared $10M annually. So a single song clearing $1M in *one month* is genuinely top-of-the-platform territory.

Frame: "$1M/month from a single song isn't 'successful artist' territory. It's 'in the running for song of the year' territory."

### Beat 5: `## And then there's the take-home` (~200 words)

The closing punch: $1M to the song is not $1M to the artist.

Walk through typical splits:
- Distributor: DistroKid ~9% (or fixed-fee model), CD Baby ~9-15%, major label deal ~50%+ off the top
- Songwriter splits if co-written
- Producer points (often 2-5%)
- Publisher cut

For a fully-owned indie release through a DIY distributor: gross $1M ≈ ~$910K take-home before taxes. For a major-label deal: often ~$200-400K to the artist before taxes.

Closing line (rough draft, refine at write-time): "Hitting $1M from one song in *one month* puts you in the top fraction of a percent of music on the platform. And even then, after the splits, you're taking home *in that one month* roughly what a senior engineer earns *in a full year*. Streaming economics are strange."

The year-vs-month contrast is the load-bearing part of this beat. The take-home for the month equals a yearly salary; make sure the framing makes that pop, not blur.

No "in conclusion." Just the final line, then stop. (Per VOICE.md.)

## Key numbers and sources

All figures must be verified at write-time and re-checked the day before publish. If any source updates between now and publish (e.g., Q2 2026 earnings drop late July 2026), recompute.

| Figure | Value | Source | Freshness |
|---|---|---|---|
| Spotify 2025 industry payouts | $11B | Loud & Clear 2025 (published April 2026) | Current |
| Spotify Q1 2026 MAU | 761M | Spotify Q1 2026 earnings release | Current |
| Spotify Q1 2026 Premium subs | 293M | Spotify Q1 2026 earnings release | Current |
| Total annual streams 2025 | ~3.2 trillion | Chartmetric / industry estimates | Current |
| Avg implied per-stream rate | ~$0.0034 | Derived: $11B ÷ 3.2T | Current |
| Artists earning $1M+ in 2025 | 1,500+ | Loud & Clear 2025 | Current |
| Artists earning $10M+ in 2025 | ~80 | Loud & Clear 2025 | Current |
| Belgium population | ~11.7M | World Bank 2024 estimate | Current |
| 2024 royalty model update details | 1,000-stream/year threshold, anti-fraud rules | Spotify announcement Nov 2023; effective April 2024 | Current |
| Typical distributor cuts | DistroKid 9% (flat fee model), CD Baby 9%, major label 50%+ | Industry standard, link to a music business reference | Current |

**Derived headline numbers (recompute at write-time):**
- Monthly pool: $11B ÷ 12 ≈ **$917M**
- Monthly streams: 3.2T ÷ 12 ≈ **267B**
- $1M target as share of monthly pool: $1M ÷ $917M = **0.109%**
- Streams of your song needed: 0.109% × 267B ≈ **~291M streams in one month**
- Daily streams needed: 291M ÷ 30 ≈ **9.7M/day**
- Share of MAU listening daily: 9.7M ÷ 761M ≈ **1.28%**

**External reference sources to cite inline:**
- Spotify Loud & Clear report (loudandclear.byspotify.com)
- Spotify Q1 2026 earnings release (newsroom.spotify.com)
- Music Business Worldwide / Chartmetric for stream volume reporting
- Liz Pelly's *Mood Machine* (2025) - mention once in footer as a reading recommendation for the pro-rata curious

## Visual asset (chart)

A single chart anchors Beat 4 and doubles as the OG image. One artifact, two payoffs.

### Chart spec
- **Type:** horizontal bar chart, 6-8 bars plus the "Your song" reference bar
- **Bars (top to bottom, ordered by monthly royalties descending):**
  - 1-2 megahits from 2025 (whoever topped 2025 Wrapped)
  - 2-3 well-known hits
  - 1-2 mid-tier popular songs
  - 1 indie comparison for the lower bound
  - "Your song" as the bottom bar, sized to represent the $1M target (so the reader sees how it compares)
- **Reference line:** dashed vertical line at $1M, labeled "$1M / month target"
- **X-axis:** estimated monthly Spotify royalties in dollars (log scale if the range is too wide; linear if the range is comparable)
- **Y-axis:** song labels (song name + artist on two lines, or song name with artist as secondary text)
- **Colors:** cobalt (`var(--accent)`) for bars, amber for the $1M reference line, neutral grey for axis labels. Match the cars-vs-suvs post's chart palette where it makes sense.
- **Caption (below the chart):** "Estimated monthly Spotify royalties for [N] top songs of 2025. Monthly figures estimated as ~20% of annual streams (typical peak month for top tracks); annual stream counts via kworb.net. The $1M reference line marks the post's target."

### Implementation
- **Format:** hand-coded inline SVG embedded in the MDX. No matplotlib, no companion repo, no external tooling.
- **Reasoning:** matches the existing site's chart pattern (cover charts on /work, KPI strip animations), renders crisp at any size, light/dark mode aware via CSS variables, no toolchain dependency for a single chart.
- **Effort:** ~30-45 min during implementation.
- **Light/dark mode:** colors driven by CSS variables (`var(--accent)`, etc.) so the chart adapts automatically.

### Data sourcing and honest estimation
- **Annual stream counts:** kworb.net (free, widely cited, estimates from public chart data).
- **Monthly estimation:** "peak month ≈ ~20% of annual streams" for top tracks. This is an approximation. Real monthly distributions vary by release timing, virality, and seasonal effects.
- **Implied monthly royalties:** monthly streams × $0.0034 (the derived global average per-stream rate).
- **Honest framing in the caption:** the chart caption explicitly says these are estimates from public data, not Spotify-reported monthly royalties. The post body acknowledges the same limitation in the existing caveat box (no separate caveat needed).

### OG image reuse
- `app/(site)/writing/spotify-million-dollar-song/opengraph-image.tsx` renders the same chart at 1200x630 with the post title overlaid.
- Either share the SVG component between the MDX and the OG route, or derive the OG render from the same chart data with OG-appropriate sizing.
- The chart-as-OG is the LinkedIn share's visual hook. Optimize for that scroll-stopping format: title at top, chart filling the body, "$1M" callout visible.

## Caveats and disclosures

**Inline caveat box (short, near the end, before the kicker):**
- "Stream" = 30+ seconds of listening, per Spotify's payout rules
- Per-stream rates vary by listener market (US streams generate more pool than Indian streams because of subscription price), Premium vs Free, and recent bundling rules
- The $0.0034 figure is a global average; your actual rate depends on who's streaming you and where
- The math assumes you fully own the song; deals change everything

**Footer disclosure (one line):**
- "Numbers from Spotify's Loud & Clear 2025 report and Q1 2026 earnings, current as of June 2026. The pro-rata explainer draws on Liz Pelly's *Mood Machine* (2025) and reporting from Music Business Worldwide. If you're reading this a year from now, the pool has gotten bigger and the per-stream math has gotten worse."

The footer explicitly handles the "what if this data is older" ask. Numbers will visibly age. The disclosure flags that openly.

## Site integration

### File
`content/writing/spotify-million-dollar-song.mdx`

### Frontmatter (matches velite schema exactly)

```yaml
---
title: "I wondered what it would take to earn $1M from one song on Spotify. It's roughly the population of Belgium."
slug: "spotify-million-dollar-song"
date: "2026-06-22"  # adjust to actual publish date in ISO format
dek: "A back-of-the-envelope tour through Spotify's pro-rata pool, from one person looping a song for a year to what it actually costs to take home the money."
tags: ["essay"]
readTime: "5 min"
status: "Drafting"  # flip to "Live" at publish
draft: true  # flip to false at publish
---
```

Schema notes (per `velite.config.ts`):
- `tags` enum is `['essay', 'build', 'note']` only - must be exactly one
- `status` enum is `['Live', 'Drafting', 'Planned']`
- `slug` must match `/^[a-z0-9-]+$/`
- `title` max 160 chars; current title is 102
- `dek` max 320 chars; current dek is 161

### `data/writing.json` entry (added at publish, lowercase `status`)

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

The `status: "live"` (lowercase) is what makes `PostRow` render the entry as a clickable link, per the cars-vs-suvs launch lessons.

### OG image
The OG image renders the Beat 4 chart at 1200x630 with the post title overlaid. See "Visual asset (chart)" section above for the full spec; the OG route reuses the chart component or its data with OG-appropriate sizing.

### No companion analysis repo
The math is back-of-envelope. This spec documents the sources. Inline citations in the post are sufficient for any reader who wants to verify.

## Voice and style requirements (per `docs/VOICE.md` + `post-intake` skill)

### Hard rules
- **No em-dashes anywhere.** Use ` - ` (spaced hyphen). Final check before commit: `grep "—" content/writing/spotify-million-dollar-song.mdx` must return zero matches.
- **No buzzwords:** leverage (as verb), synergies, robust, excited to share, passionate about, utilize, best-in-class, thought leader, circle back, move the needle, data-driven decision making.
- **No generic opens** ("Have you ever wondered...", "In today's world..."). Open by stating the situation directly.
- **No "in conclusion" / "thanks for reading" / "as we can see."** Make the final point and stop.
- **First-person "I"** throughout. Own the curiosity directly.

### Voice positives to actively lean into
- Conversational and curious. Like explaining something interesting to a smart friend at a coffee shop.
- Lead WHY before WHAT (the pro-rata mechanic appears because we need it for the math, not as the lecture).
- Specific numbers, not adjectives. $9.7M/day, not "a huge number."
- Acknowledge the tradeoff openly (the caveat box does this).
- Quiet confidence. State the math, let it land.
- Medium-length paragraphs (3-5 sentences). Not one-liners, not walls of text.

### Jason-pattern phrases to drop in where natural
- "Let's look at..." / "Now that we have X, let's..."
- "For a few reasons"
- "This means..."
- Short declarative sentences after longer explanations.

### Voice reference posts
- **Primary:** `content/writing/building-the-portfolio.mdx` (build log, but the strongest voice example we have)
- **Secondary:** `content/writing/sight-lines-and-suvs.mdx` (the only other live essay, closest structural match)

Read both before drafting. The drafter should be able to identify three specific sentences from each that exemplify the voice they're trying to match.

## Pre-publish checklist

1. Verify all key numbers against current sources (re-check the day before publish; Q2 2026 earnings drop around late July could shift MAU).
2. Recompute derived numbers with any updated inputs.
3. Em-dash sweep: `grep "—" content/writing/spotify-million-dollar-song.mdx` returns zero matches.
4. VOICE.md checklist: leads with context, specific numbers, no buzzwords, acknowledged tradeoff, plain language, ends on the final point.
5. Velite validation: `pnpm exec velite && pnpm typecheck && pnpm lint && pnpm build`.
6. Add `data/writing.json` entry with `status: "live"` (lowercase).
7. Flip frontmatter `status` to `"Live"` and `draft` to `false`.
8. OG image renders correctly via local build.
9. Commit and push to deploy.
10. Verify the live URL at `jasonvermaelen.com/writing/spotify-million-dollar-song`.

## Out of scope (YAGNI)

Things this post is deliberately NOT doing:
- Not a methodological essay on streaming economics (that's the post we almost wrote and decided against)
- Not an analysis of artist payment fairness or pro-rata vs user-centric debate (mentioned in passing only)
- Not a deep dive on Spotify's 2024 royalty model update (one paragraph of context, no more)
- Not a companion repo with notebooks (back-of-envelope, not analysis)
- Not multiple charts (one bar chart in Beat 4 is the only visual; see "Visual asset (chart)" section)
- Not a piece about a specific artist's earnings (general market math only)
- Not a take on whether Spotify is good or bad for artists (the post is descriptive, not editorial)

## Open questions for implementation

1. **Which specific 2025 reference songs go into the Beat 4 chart?** Need to pull current stream counts at write-time. Probably 1-2 obvious megahits (whoever topped 2025 Wrapped), 2-3 well-known hits, 1-2 mid-tier picks, 1 indie for the lower bound. Confirm picks during writing-plans phase.
2. **Validate the "peak month ≈ 20% of annual" approximation.** Spot-check against 2-3 songs with publicly-known monthly stream data (e.g., songs that hit the Spotify Daily Top 200 with reported weekly numbers) before finalizing the chart. If the approximation is off by more than ~5 percentage points, adjust the assumption and re-state in the caption.
3. **Sharper closing line for Beat 5.** Current draft uses the year-vs-month framing explicitly, but the wording can be tightened at draft stage. Goal: the contrast should feel like the punchline, not the setup.
4. **Should the post link to the cars-vs-suvs post** as a "more like this" footer? Lean: no, keeps the post tight and lets the site nav handle it.

## Process gates (per `post-intake` skill and brainstorming flow)

- [x] Step 0 - Read VOICE.md
- [x] Step 0 - Confirm post type (`essay`)
- [x] Step 0 - Confirm the seed (six brainstorm answers above)
- [x] Step 0 - Check `data/writing.json` (no placeholder row exists for this slug; new entry will be added at publish)
- [x] Step 1 - Brainstorm complete (this spec captures all six answers)
- [ ] User reviews and approves this spec
- [ ] Transition to writing-plans skill for implementation plan
