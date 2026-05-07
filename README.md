# vermaelen.dev — personal site

Personal website for Jason Vermaelen — Senior BI Analyst. Built with Next.js on Vercel.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- MDX for content
- Vercel Analytics
- Deployed on Vercel

## Structure

```
app/                    Next.js App Router routes
components/             Reusable UI components
content/
  case-studies/         Case study MDX files
  writing/              Blog post MDX files
docs/
  prd.md                Product requirements doc
lib/                    Helpers (MDX loading, search index)
public/                 Static assets
```

## Local dev

```bash
npm install
npm run dev
```

## Deployment

Auto-deploys to Vercel on push to `main`.
