import { defineCollection, defineConfig, s } from 'velite';

const allowedWorkTags = [
  'BI',
  'Analytics',
  'Product',
  'GTM',
  'BizOps',
  'Automation',
  'Operations',
  'AI',
] as const;

const allowedWritingTags = ['essay', 'build', 'note'] as const;

const work = defineCollection({
  name: 'Work',
  pattern: ['work/**/*.mdx', '!work/**/_*.mdx'],
  schema: s
    .object({
      title: s.string().max(120),
      slug: s.string().regex(/^[a-z0-9-]+$/, 'must be lowercase kebab-case'),
      outcomeHeadline: s.string().max(220),
      role: s.string(),
      company: s.string(),
      year: s.number().int().min(2010).max(2100),
      duration: s.string(),
      tags: s.array(s.enum(allowedWorkTags)).min(1),
      metrics: s
        .array(
          s.object({
            label: s.string(),
            value: s.string(),
            unit: s.string().optional(),
          }),
        )
        .min(2)
        .max(4),
      headlineResult: s
        .object({
          value: s.string(),
          label: s.string(),
          caption: s.string().optional(),
        })
        .optional(),
      collaborators: s.array(s.string()).optional(),
      tools: s.array(s.string()).optional(),
      status: s.enum(['Live', 'Shipped', 'Sunset', 'Internal-only']).optional(),
      order: s.number().optional(),
      draft: s.boolean().default(true),
      cover: s
        .object({
          image: s.string().optional(),
          chart: s
            .object({
              kind: s.enum(['line', 'bar', 'area', 'kpi']),
              dataset: s.string(),
              accent: s.string().default('var(--accent)'),
              caption: s.string(),
            })
            .optional(),
        })
        .optional(),
      ogImage: s.string().nullable().optional(),
      description: s.string().nullable().optional(),
      body: s.mdx(),
    })
    .transform((data) => ({ ...data, url: `/work/${data.slug}` })),
});

const writing = defineCollection({
  name: 'Writing',
  pattern: ['writing/**/*.mdx', '!writing/**/_*.mdx'],
  schema: s
    .object({
      title: s.string().max(160),
      slug: s.string().regex(/^[a-z0-9-]+$/, 'must be lowercase kebab-case'),
      date: s.isodate(),
      dek: s.string().max(320),
      tags: s.array(s.enum(allowedWritingTags)).min(1),
      readTime: s.string().optional(),
      status: s.enum(['Live', 'Drafting', 'Planned']).default('Live'),
      draft: s.boolean().default(false),
      body: s.mdx(),
    })
    .transform((data) => ({ ...data, url: `/writing/${data.slug}` })),
});

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { work, writing },
});
