# INSTRUCTIONS.md
**Personal Website — Jason Vermaelen**
_Last updated: May 2026 — Added Section 3: Project Workflow (brainstorming, PRD, orchestrator, full builds, latest libraries)_

> This file is the source of truth for how to add, update, and write content on this site. It is written for use by an AI (Claude) but is human-readable. Always reference this file before making any changes. A tech stack/CMS-specific handoff document will be provided separately.

---

## 1. Who This Site Is For & What It Does

This is a personal website that blends professional credibility with genuine personality. It is not a resume dump — it is a living portfolio and brand presence designed to:

- Showcase projects, case studies, and skills across BI/Analytics, BizOps, and Product Management
- Attract interest from FAANG-tier companies (Google, Meta, Apple, Amazon, Microsoft) and high-growth startups (Series Seed through Series D)
- Demonstrate the ability to think strategically, work with data, and ship things that matter

Every piece of content on this site should pass this test: **"Would a sharp PM or hiring manager at a Series B startup or Google find this impressive and clear?"**

---

## 2. Site Sections & Their Purpose

| Section | Purpose |
|---|---|
| **Home / Hero** | First impression. One sharp headline, a 2–3 sentence summary, and a clear CTA. |
| **About** | Brief personal + professional story. Human, not corporate. |
| **Projects / Case Studies** | The core of the site. Deep dives into real work. |
| **Skills** | A scannable list of tools, technologies, and competencies. |
| **Blog / Writing** | Long-form thinking on analytics, product, and business. Optional section. |
| **Resume / Experience** | Condensed work history. Links to full resume PDF. |
| **Contact** | Simple. An email or contact form. No fluff. |

---

## 3. Project Workflow — How to Start Any New Project

Every project on this site — whether a case study, a new feature, a design, or a code build — follows this startup sequence:

### Step 1: Load & Brainstorm
Before writing a single line of copy or code, load the brainstorming skill and the PRD (Product Requirements Document) for the project. Then ask Jason clarifying questions before starting. Do not skip this step, even if the brief seems clear.

### Step 2: Write the PRD (If One Doesn't Exist)
If no PRD exists, one needs to be created first. Use Deep Research at the PRD stage to inform requirements, competitive context, and any technical or content decisions that need external grounding.

### Step 3: Plan with an Orchestrator
Once the PRD is ready, use the Orchestrator to write a to-do list broken into sub-tasks. Assign each sub-task to a sub-agent for execution. This applies to all projects — content, design, and code.

### Step 4: Build the Full Version
Always build and present the full version of whatever is being created. Do not offer a "light version," an MVP alternative, or ask whether a simpler approach would be preferred. If it's worth building, build it completely.

### Step 5: Use the Latest Libraries
When making any design, data, or code decisions, always use the latest available version of the relevant library or model. For example: always use Claude Opus 4.7 (or the latest available Opus model) — never default to an older version.

---

## 4. Adding a New Project or Case Study

Projects are the heart of this site. Each one should tell a clear story: **problem → approach → outcome.**

### Required Information
Before writing a case study, gather the following:

- **The problem:** What was broken, missing, or unclear?
- **Your specific role:** What did _you_ do? Not the team — you.
- **The approach:** What frameworks, data, or methods did you use?
- **The metrics:** What does success look like in numbers? (e.g., "reduced churn by 18%", "saved 12 hrs/week in manual reporting", "grew revenue pipeline by $2.4M")
- **The outcome:** What changed as a result?
- **Tools used:** SQL, Tableau, Python, Looker, Figma, Jira, etc.
- **Target audience relevance:** Which type of company would care most about this? (FAANG / startup / both)

### Case Study Structure

```
## [Project Title]
**Role:** [Your title or role on the project]
**Company / Context:** [Company name or "Personal / Academic"]
**Tools:** [List of tools used]

### The Problem
[2–4 sentences. What was broken or unknown? Why did it matter?]

### My Approach
[3–6 sentences or bullets. What did you do and how? Lead with your decisions.]

### Results
[Quantified outcomes. Use real numbers wherever possible. If numbers are unavailable, describe the qualitative impact clearly.]

### What I Learned
[Optional but recommended. 1–3 sentences. Shows self-awareness and growth mindset.]
```

### Tone Notes for Case Studies
- Lead with the business problem, not the technical solution
- Use "I" — own your contributions directly
- Quantify everything possible; if you can't, explain why the outcome mattered
- Avoid phrases like "leveraged synergies" or "drove alignment" — be specific about what you actually did
- Write as if explaining to a smart PM at a startup who has 60 seconds to decide if they care

---

## 5. Writing Blog Posts

Blog posts should read like a smart person thinking out loud — not a LinkedIn post or a Medium think-piece trying too hard.

### When to Post
- When you've learned something genuinely useful from a project or experience
- When you have a clear opinion on a product, data, or business topic
- When you can add something specific that generic "top 10 tips" articles don't

### Blog Post Structure

```
## [Title — should be specific and direct, not clickbait]

**[1–2 sentence hook. State the problem or insight upfront.]**

[Body — use short paragraphs, the occasional bullet list when useful, and headers
if the post is long. Don't pad. Say the thing.]

**[Closing — one clear takeaway or honest reflection. No "thanks for reading."]**
```

### Tone Notes for Blog Posts
- Conversational but substantive — think "smart colleague over coffee," not "thought leader on stage"
- It's okay to say "I'm not sure" or "I was wrong about X" — intellectual honesty is on-brand
- Back up opinions with data or real examples when possible
- Short is usually better. 400–800 words is the sweet spot unless the topic demands more

---

## 6. Updating the Resume / Experience Section

When adding or updating work experience:

- Always include: company name, title, dates (month/year), and 2–4 bullet points
- Each bullet should follow the format: **[Action verb] + [what you did] + [measurable result]**
  - Example: "Built an automated reporting pipeline in SQL and Tableau that reduced weekly manual reporting from 8 hours to 30 minutes"
- Lead with impact, not responsibilities
- Tailor bullets toward product, data, and operations outcomes — these resonate most with target employers
- Keep the resume section condensed; link to a downloadable PDF for the full version

---

## 7. General Copy & Content Rules

These apply to every piece of content on the site.

### Always Do
- **Quantify impact.** Numbers make claims credible. Use them whenever available.
- **Be specific.** "Improved dashboard adoption" is weak. "Increased weekly active dashboard users from 40 to 210 over 3 months" is strong.
- **Use plain language.** If a high school senior can't understand the sentence, rewrite it.
- **Tailor to the audience.** FAANG cares about scale, rigor, and systems thinking. Startups care about speed, ownership, and business impact. When in doubt, speak to both.
- **Own your contributions.** Use "I" and "my" — don't hide behind "we" when describing your specific work.

### Never Do
- Use corporate buzzwords: _leverage, synergy, utilize, circle back, move the needle, best-in-class, robust_
- Write walls of text — break things up with short paragraphs, bullets, or headers
- Make claims without evidence or context
- Use a passive voice when an active one will do
- Pad copy to sound more impressive — brevity with specificity is always better

### Audience Framing
When writing for **FAANG:** Emphasize scale, analytical rigor, cross-functional collaboration, structured frameworks (PESTEL, Porter's Five Forces, balanced scorecards), and measurable business outcomes.

When writing for **startups (Seed–Series D):** Emphasize speed, ownership, bias for action, scrappiness, and the ability to wear multiple hats. Show that you can go from insight to execution quickly.

---

## 8. Tech Stack Note

A separate handoff document from Claude Design will specify the CMS, component structure, and file conventions for this site. Reference that document for anything related to implementation. These instructions cover **content and copy only**.

---

## 9. Versioning This File

When making significant changes to the site's content strategy or structure, update the "Last updated" date at the top of this file and note what changed at the bottom in a changelog section.

---

_For voice, tone, and writing style guidance, see `VOICE.md`._
