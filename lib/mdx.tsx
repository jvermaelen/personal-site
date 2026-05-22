import * as runtime from 'react/jsx-runtime';

// biome-ignore lint/suspicious/noExplicitAny: MDX component map uses `any` so that case-study components with required props (CaseSection, MetricCallout, etc.) can be passed in the generic components record without TypeScript complaining about missing props — the actual type safety is on the receiving component side.
type MDXComponents = Record<string, React.ComponentType<any>>;

/**
 * Velite compiles MDX into a function-body string via @mdx-js/mdx.
 * At render time, evaluate it with the React JSX runtime to get back the
 * exported default component.
 *
 * Works in server (Node.js) contexts — `new Function` is available in all
 * Next.js rendering environments. The compiled body is self-contained: static
 * imports in MDX files are bundled by velite at build time.
 *
 * Usage:
 *   const Component = useMDXComponent(post.body)
 *   return <div className="prose"><Component /></div>
 *
 * To inject custom MDX components (for case studies):
 *   return <Component components={{ MetricCallout, Aside, ... }} />
 */
export function useMDXComponent(code: string) {
  const fn = new Function(code);
  return fn({ ...runtime }).default as React.ComponentType<{
    components?: MDXComponents;
  }>;
}
