---
description: Drafting, refining, or planning a writing post (essay, build log, or note) for the /writing section of jasonvermaelen.com. Covers voice rules, post structure by type, frontmatter, word counts, and the publish checklist. Auto-load when the user mentions blog post, writing post, build log, essay, or note in the context of this site.
---

# Writing post intake

For drafting any post that ships to `/writing/[slug]` on jasonvermaelen.com.

## Step 0 — Always do this first

1. **Read `docs/VOICE.md`** to ground in Jason's voice. It's the source of truth for tone, structural patterns, and words to avoid.
2. **Confirm the post type** before drafting. Three options, matching the velite enum + work-index filter chips:
   - `essay` — reflective, opinionated, argumentative
   - `build` — concrete, project-anchored, includes decisions and tradeoffs
   - `note` — tight observation, single idea, no padding
3. **Confirm the seed.** If Jason gives you only a title, ask for a paragraph or two of "what's the idea" before drafting. Don't write from one-line briefs.
4. **Check `data/writing.json`** to see if the post already exists in the index (often there's a placeholder row with status: drafting). If so, you're upgrading it to live.

## Step 1 — Brainstorm before drafting

**Per `docs/INSTRUCTIONS.md` §3: this step is non-skippable, even when the brief seems clear.** Skipping it produces posts where the angle drifts mid-draft or the takeaway never crystallizes. Push back hard if Jason wants to skip ahead to drafting before the brainstorm questions have clear answers.

**If the `/superpowers:brainstorm` skill is installed, invoke it** - it's purpose-built for this kind of structured pre-work. Otherwise, work through these questions out loud with Jason before any drafting:

1. **The seed.** What's the one observation, frustration, or pattern this post wants to communicate? In one sentence.

2. **The audience.** Who reads this, and in what context? A recruiter screening a Senior BI candidate? A hiring manager who already met Jason once? A fellow analyst Googling "how to ship a portfolio"? The audience changes the voice and the evidence.

3. **The one thing.** If the reader skims everything else, what's the single sentence they should remember? This is the post's center of gravity. If you can't state it before drafting, the post doesn't have one yet.

4. **The angle.** What's the distinctive POV vs. the obvious take on the same topic? Three generic drafts about "how I built my portfolio" exist on every blog. What's Jason's version saying that nobody else's says?

5. **The evidence.** What numbers, projects, or anecdotes will carry the post? List 3-5 concrete items before writing. If the answer is "I'll figure it out as I draft," that's a signal to keep brainstorming.

6. **The honest tradeoff.** Per VOICE.md, every Jason piece acknowledges a tradeoff or limitation. Identify it up front so it doesn't read as a tacked-on afterthought.

**Optional: research the topic landscape.** For essay-type posts on broad topics (AI in analytics, portfolio design, BI tooling), use WebSearch to skim what others have written. The goal is to find what's already been said so Jason can sharpen the angle that hasn't.

**Optional: capture the brainstorm in a scratch file.** Drop the answers into `content/writing/_drafts/<slug>-brainstorm.md`. The `_` prefix and `.md` extension keep it out of the velite build, so it stays as a working artifact next to the eventual post without shipping.

**Don't proceed to drafting until those six have clear, written-out answers.** "Let's nail down the angle before we draft" is the right move, even if it feels like friction. The friction is what saves you from rewriting a 1,200-word draft halfway through.

## Voice rules (compressed from docs/VOICE.md)

**Three-word version:** Warm. Curious. Grounded.

**Always do:**
- Lead with the WHY before the WHAT. State the problem or context, then build to the conclusion.
- Specific numbers, real examples. "Increased dashboard adoption from 40 to 210 weekly users over 3 months" beats "drove dashboard adoption."
- Acknowledge a tradeoff or uncertainty honestly somewhere in every piece.
- Plain, direct sentences. If a line sounds like a McKinsey deck, rewrite it.
- Quiet confidence. State the view, don't hedge with "perhaps" or "it might be worth considering."
- Use "I" - own the work directly. Don't hide behind "we" when describing your contributions.

**Never do:**
- Em-dashes (-). Site-wide they've been replaced with hyphens with spaces (` - `). They read as an AI-tell.
- Buzzwords: leverage (verb), synergies, robust, excited to share, passionate about, utilize, best-in-class, thought leader, circle back, move the needle.
- Generic opens like "Have you ever wondered..." or "In today's world..." - Jason doesn't hook, he states.
- "In conclusion" / "Thanks for reading" / "As we can see" - ends just stop.

**Phrases Jason actually uses (drop these in where they fit naturally):**
- "Let's look at..." / "Now that we have X, let's..."
- "For a few reasons"
- "While X looks good, Y needs some work"
- "This means..."
- "So currently, the company is..."

## Post type recipes

| Type | Length | Structure |
|---|---|---|
| `essay` | 800-1500 words | Hook → setup the landscape → develop 2-4 sub-arguments with `##` headings → land the takeaway |
| `build` | 600-1500 words | Hook → what the brief was → what you tried → what you shipped → what you'd do differently → the one thing |
| `note` | 200-500 words | Single observation, no headings needed, 2-4 paragraphs |

## Frontmatter (velite-validated)

```yaml
---
title: "Specific, direct title. Not clickbait. Max 160 chars."
slug: "lowercase-kebab-case"
date: "YYYY-MM-DD"
dek: "1-2 sentence hook. State the insight or problem upfront. Max 320 chars."
tags: ["essay"]   # or "build" or "note" - exactly one in the array
readTime: "~X min"
status: "Live"    # or "Drafting" / "Planned"
draft: false
---
```

**Slug naming:** match the title's core noun.
- "Why I scoped this portfolio to v1.5" → `scoping-portfolio-v15`
- "Three patterns I keep seeing in Salesforce CRM Analytics" → `crm-analytics-patterns`

## Body structure

Plain markdown (no MDX components needed for most posts):

```mdx
## First sub-section heading

Paragraph 1. State the problem or context.

Paragraph 2. Develop the idea.

## Second sub-section heading

[continue]

## The one thing

The takeaway, plainly stated. Stop here.
```

For build logs about this site specifically, MDX components from `@/components/case-study` are available if you need them (PullQuote, Aside, Figure, etc.). Use sparingly - posts are mostly prose.

## How Jason opens a piece

From VOICE.md, the canonical good/bad example:

> Bad: "Have you ever wondered why so many Americans can't afford a home?"
>
> Good: "As home prices continue to rise and median wages remain well below home costs, buying a home is becoming further out of reach for many Americans."

State the situation directly. Trust the reader to care.

## How Jason closes a piece

Make the final point and stop. No "in conclusion." No "thanks for reading." If the piece earned its conclusion, you don't need to label it.

For build logs, the close often takes the form "If there's one thing I'd tell another analyst..." - this is a known pattern from the existing build log at `content/writing/building-the-portfolio.mdx`. Worth reading that file as a voice reference before drafting.

## Voice checklist before commit

- [ ] Leads with context or problem, not conclusion
- [ ] At least one specific number, example, or concrete detail
- [ ] No buzzwords (leverage as verb, synergies, robust, utilize, etc.)
- [ ] At least one acknowledged tradeoff or limitation
- [ ] Plain language - no jargon a non-expert would need to Google
- [ ] Ends with a clear final point, not a summary
- [ ] No em-dashes anywhere
- [ ] First-person "I" used consistently

## After drafting

1. Place the file at `content/writing/<slug>.mdx`
2. Run `pnpm exec velite` to validate the frontmatter against the Zod schema
3. Run `pnpm typecheck && pnpm lint && pnpm build` before commit
4. Update `data/writing.json` - flip the post's status to `"live"` so the writing index makes it a clickable link (PostRow renders `<a>` only when `status === "live"`)
5. The post auto-appears at `/writing/<slug>` once the velite build runs

## Useful references

- `content/writing/building-the-portfolio.mdx` - existing live post, good voice reference
- `velite.config.ts` - the writing schema (allowed tags, status enum, frontmatter validation)
- `docs/VOICE.md` - full voice guide
- `docs/INSTRUCTIONS.md` - content rules
