export type TopicCategory =
  | 'Start here'
  | 'Foundations'
  | 'Data and state'
  | 'Performance'
  | 'Delivery'

export type LabTopic = {
  path: string
  navLabel: string
  title: string
  detail: string
  summary: string
  category: TopicCategory
  tags: string[]
}

export const labTopics: LabTopic[] = [
  {
    path: '/',
    navLabel: 'Overview',
    title: 'Overview',
    detail: 'Route map, stack notes, and a quick way to jump into any topic.',
    summary:
      'Start here to see what the lab covers, which problems each route solves, and which tools are worth knowing before you add more dependencies.',
    category: 'Start here',
    tags: ['dashboard', 'route map', 'scripts'],
  },
  {
    path: '/svg',
    navLabel: 'SVG Workflow',
    title: 'SVG workflow',
    detail: 'Importing, compressing, recoloring, and resizing SVG assets.',
    summary:
      'Use files for static art, SVGR for interactive UI icons, and SVGO before either one so the asset stays cheap.',
    category: 'Foundations',
    tags: ['svgr', 'svgo', 'currentColor'],
  },
  {
    path: '/forms',
    navLabel: 'Forms',
    title: 'Forms and validation',
    detail: 'Schema-backed forms, field arrays, and practical validation defaults.',
    summary:
      'Keep one schema as the source of truth, let the form library own field registration, and avoid hand-rolled validation drift.',
    category: 'Foundations',
    tags: ['react-hook-form', 'zod', 'accessibility'],
  },
  {
    path: '/server-state',
    navLabel: 'Server State',
    title: 'Server-state',
    detail: 'Caching, stale data, background refetching, and async ownership.',
    summary:
      'Reach for TanStack Query when freshness, retries, invalidation, or shared async data starts leaking into components.',
    category: 'Data and state',
    tags: ['react-query', 'cache', 'refetch'],
  },
  {
    path: '/optimistic-ui',
    navLabel: 'Optimistic UI',
    title: 'Optimistic UI',
    detail: 'Fast-feeling mutations with rollback when the request fails.',
    summary:
      'Update the cache first, keep the previous snapshot for rollback, and invalidate after settle so the UI feels immediate without becoming dishonest.',
    category: 'Data and state',
    tags: ['mutations', 'rollback', 'query cache'],
  },
  {
    path: '/render-performance',
    navLabel: 'Render Performance',
    title: 'Render responsiveness',
    detail: 'Deferred rendering, transitions, and narrowing expensive work.',
    summary:
      'Keep interactions responsive by separating urgent input updates from heavier derived rendering work.',
    category: 'Performance',
    tags: ['useDeferredValue', 'startTransition', 'lazy init'],
  },
  {
    path: '/virtual-lists',
    navLabel: 'Virtual Lists',
    title: 'Virtualized lists',
    detail: 'Rendering big collections without paying for every row at once.',
    summary:
      'Virtualization cuts DOM cost when the list is truly large, while deferred search keeps typing snappy when filtering thousands of rows.',
    category: 'Performance',
    tags: ['tanstack-virtual', 'large lists', 'scrolling'],
  },
  {
    path: '/route-splitting',
    navLabel: 'Route Splitting',
    title: 'Route-level splitting',
    detail: 'Load code on demand so one screen does not tax every other screen.',
    summary:
      'Lazy route modules are the cheapest win once an app grows past a handful of screens or starts adopting heavier optional features.',
    category: 'Delivery',
    tags: ['react lazy', 'dynamic import', 'suspense'],
  },
  {
    path: '/tooling',
    navLabel: 'Tooling',
    title: 'Tooling playbook',
    detail: 'Bundle reports, slow build fixes, and keeping lint practical.',
    summary:
      'Measure the bundle before and after installs, keep lint in fast and deep paths, and trim build transforms that are not earning their keep.',
    category: 'Delivery',
    tags: ['bundle analyzer', 'eslint', 'vite'],
  },
]

export const overviewTopic = labTopics[0]
export const contentTopics = labTopics.slice(1)

export function getLabTopic(pathname: string) {
  const normalizedPath =
    pathname.length > 1 && pathname.endsWith('/')
      ? pathname.slice(0, -1)
      : pathname

  return labTopics.find((topic) => topic.path === normalizedPath) ?? overviewTopic
}
