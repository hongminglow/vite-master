export const labSections = [
  {
    id: 'overview',
    label: 'Overview',
    detail: 'Stack choices, goals, and quick scripts',
  },
  {
    id: 'svg-lab',
    label: 'SVG Lab',
    detail: 'SVGR, currentColor, optimization, and sizing',
  },
  {
    id: 'forms-lab',
    label: 'Forms Lab',
    detail: 'Accessible forms, validation, and field arrays',
  },
  {
    id: 'server-state-lab',
    label: 'Server State',
    detail: 'Caching, refetching, and async ownership',
  },
  {
    id: 'render-lab',
    label: 'Render Performance',
    detail: 'Deferred updates and keeping interactions snappy',
  },
  {
    id: 'tooling-lab',
    label: 'Tooling Playbook',
    detail: 'Bundle analysis, slow builds, and slow lint',
  },
] as const

export const heroCapabilities = [
  {
    title: 'SVG workflow that scales',
    summary: 'Show raw files, SVGR components, and a repeatable optimization checklist.',
  },
  {
    title: 'Typed form handling',
    summary: 'Use React Hook Form + Zod for fast ergonomics and clear validation.',
  },
  {
    title: 'Server-state without custom cache glue',
    summary: 'Use TanStack Query for stale time, refetching, and invalidation patterns.',
  },
  {
    title: 'Responsive rendering patterns',
    summary: 'Use lazy initialization, deferred values, and transitions where they help.',
  },
] as const

export const heroMetrics = [
  {
    value: '5 labs',
    label: 'Interactive sections that mirror common frontend work.',
  },
  {
    value: '9 focused libs',
    label: 'Added only where the benefit shows up in real daily tasks.',
  },
  {
    value: 'Mar 18, 2026',
    label: 'Research baseline used for the README recommendations.',
  },
] as const

export const svgApproaches = [
  {
    title: 'Raw SVG file',
    when: 'Best for logos, hero art, or assets you do not need to restyle from React.',
    caution: 'Hard-coded fills are harder to theme dynamically.',
  },
  {
    title: 'SVGR component',
    when: 'Best for UI icons and illustrations that should react to theme, state, or size props.',
    caution: 'Normalize fills to currentColor first if you want CSS-driven color changes.',
  },
  {
    title: 'Icon library',
    when: 'Best for common actions where consistency matters more than custom illustration.',
    caution: 'Audit bundle cost if you import from too many icon sets.',
  },
] as const

export const bundleWorkflow = [
  {
    command: 'bun run build',
    output: 'Production bundle in dist/',
    note: 'Use this for the normal release path.',
  },
  {
    command: 'bun run build:analyze',
    output: 'Static treemap report in dist/reports/bundle-report.html',
    note: 'Use this before adding new libraries or after a suspicious size jump.',
  },
  {
    command: 'bun run svg:optimize',
    output: 'Optimized assets in src/assets/icons/',
    note: 'Run before converting exported SVGs into reusable components.',
  },
] as const

export const buildSpeedTips = [
  'Remove transforms you are not actively using. Extra Babel/compiler layers cost time.',
  'Let Vite keep its dependency cache warm in node_modules/.vite unless something truly changed.',
  'Analyze large libraries before installing them so you do not debug slowness after the fact.',
  'Split big screens into feature modules so one file is not doing every concern at once.',
] as const

export const lintSpeedTips = [
  'Run cached lint in the common path and reserve typed lint for a second pass or CI.',
  'Use parserOptions.projectService for typed lint instead of hand-managing many TS projects.',
  'Ignore generated output folders like dist, reports, and .cache so ESLint stays focused.',
  'Fix expensive rules only when they catch real bugs in your codebase.',
] as const

export const dependencyNotes = [
  {
    name: 'Tailwind CSS + @tailwindcss/vite',
    reason: 'Fast utility workflow with first-party Vite integration.',
  },
  {
    name: 'vite-plugin-svgr + svgo',
    reason: 'Turn SVGs into components and keep the source files optimized.',
  },
  {
    name: 'TanStack Query',
    reason: 'Handle server-state, freshness, retries, and invalidation without custom hooks.',
  },
  {
    name: 'React Hook Form + Zod',
    reason: 'Keep forms fast while sharing one validation schema between UI and data.',
  },
  {
    name: 'clsx + tailwind-merge',
    reason: 'Compose Tailwind classes safely when variants start to grow.',
  },
] as const

export const bookmarkLinks = [
  {
    name: 'Tailwind + Vite docs',
    url: 'https://tailwindcss.com/docs/guides/vite',
    description: 'Official setup path for Tailwind 4 with Vite.',
  },
  {
    name: 'SVGR docs',
    url: 'https://react-svgr.com/docs/what-is-svgr/',
    description: 'Reference for turning SVGs into React components.',
  },
  {
    name: 'SVGOMG',
    url: 'https://jakearchibald.github.io/svgomg/',
    description: 'Great visual UI for trying SVGO optimizations before scripting them.',
  },
  {
    name: 'TanStack Query defaults',
    url: 'https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults',
    description: 'Good reminder that queries are stale by default.',
  },
  {
    name: 'bundlejs',
    url: 'https://bundlejs.com/',
    description: 'Quick package size estimate before you install something.',
  },
  {
    name: 'Bundlephobia',
    url: 'https://bundlephobia.com/',
    description: 'Another quick way to compare install cost and publish size.',
  },
] as const
