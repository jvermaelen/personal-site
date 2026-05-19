# Jason Vermaelen — Personal Website & Portfolio

This repository contains the source code and content for my personal website, plus documentation, project case studies, and LinkedIn post drafts organized for repeatability.

## Quick Links
- 🌐 **Live site:** [jasonvermaelen.com](https://jasonvermaelen.com) _(update once live)_
- 📄 **How to contribute content:** [`docs/INSTRUCTIONS.md`](docs/INSTRUCTIONS.md)
- ✍️ **Voice & style guide:** [`docs/VOICE.md`](docs/VOICE.md)

---

## Repo Structure

```
/
├── README.md                   ← You are here
├── docs/
│   ├── INSTRUCTIONS.md         ← Master guide for adding content, projects, copy
│   ├── VOICE.md                ← Writing voice & tone guide
│   └── HANDOFF.md              ← Tech stack/CMS handoff (coming from Claude Design)
├── projects/
│   ├── template/
│   │   └── README.md           ← Template for every new project
│   └── [project-slug]/         ← One folder per project (e.g., homemates-biz-plan)
│       ├── README.md           ← Case study write-up
│       ├── assets/             ← Charts, screenshots, exports
│       └── linkedin-post.md    ← LinkedIn post draft for this project
├── linkedin/
│   └── post-archive.md         ← Running archive of all published LinkedIn posts
└── [site source files]         ← CMS/framework files (structure TBD from handoff doc)
```

---

## Workflow: Adding a New Project

1. Copy `projects/template/` → rename to `projects/[project-slug]/`
2. Fill out the `README.md` inside using the case study template in `docs/INSTRUCTIONS.md`
3. Drop any supporting assets into `assets/`
4. Draft the LinkedIn post in `linkedin-post.md`
5. Add the case study to the live site
6. Publish the LinkedIn post and link to the site
7. Commit and push everything together

---

## About

I'm a BI Analyst / BizOps / Product Manager based in Austin, TX. This site showcases my work and thinking, with a focus on landing roles at FAANG companies and high-growth startups (Series Seed–Series D).

Built with 🤖 + ☕ in Austin.
