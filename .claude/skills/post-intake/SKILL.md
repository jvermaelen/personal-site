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
