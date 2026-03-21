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
  {
    path: '/url-state',
    navLabel: 'URL State',
    title: 'URL search params',
    detail: 'Filters, pagination, and sorting that live in the URL instead of useState.',
    summary:
      'Use useSearchParams as the single source of truth for filter state so links are shareable, the back button works, and state survives refresh.',
    category: 'Data and state',
    tags: ['useSearchParams', 'zod', 'shareable URLs'],
  },
  {
    path: '/error-handling',
    navLabel: 'Error Handling',
    title: 'Error boundaries and recovery',
    detail: 'Catch rendering and async errors so one crash never kills the whole page.',
    summary:
      'Wrap routes and widgets in error boundaries with retry actions so users see recovery options instead of a white screen.',
    category: 'Delivery',
    tags: ['ErrorBoundary', 'recovery', 'graceful degradation'],
  },
  {
    path: '/input-timing',
    navLabel: 'Input Timing',
    title: 'Debounce, throttle, and timing',
    detail: 'Control when expensive work fires in response to user input.',
    summary:
      'Debounce API calls, throttle scroll handlers, and defer heavy renders — each solves a different timing problem.',
    category: 'Performance',
    tags: ['debounce', 'throttle', 'useDeferredValue'],
  },
  {
    path: '/auth-routing',
    navLabel: 'Auth Routing',
    title: 'Auth guards and permissions',
    detail: 'Protected routes, role gates, and redirect-after-login patterns.',
    summary:
      'Guard routes with context-based auth, gate UI sections by role, and redirect users back to where they were after login.',
    category: 'Delivery',
    tags: ['protected routes', 'role guard', 'redirect'],
  },
  {
    path: '/notifications',
    navLabel: 'Notifications',
    title: 'Toast and notification patterns',
    detail: 'Build a toast system with portals, auto-dismiss, and accessibility.',
    summary:
      'Use context and createPortal to render toasts outside the main DOM tree with proper aria-live, auto-dismiss timing, and action support.',
    category: 'Foundations',
    tags: ['toast', 'portal', 'aria-live'],
  },
  {
    path: '/dialogs',
    navLabel: 'Dialogs',
    title: 'Modal and dialog patterns',
    detail: 'Native <dialog> for focus trapping, scroll lock, and zero-dependency modals.',
    summary:
      'Use the native dialog element for modals that get focus trapping, backdrop clicks, Escape to close, and scroll lock without any library.',
    category: 'Foundations',
    tags: ['dialog', 'modal', 'focus trap'],
  },
  {
    path: '/media',
    navLabel: 'Media',
    title: 'Responsive images and media',
    detail: 'srcset, lazy loading, format negotiation, and layout shift prevention.',
    summary:
      'Serve the right image size and format so pages load fast without layout shift — the single highest-impact performance optimization most teams skip.',
    category: 'Performance',
    tags: ['srcset', 'lazy loading', 'Core Web Vitals'],
  },
  {
    path: '/testing',
    navLabel: 'Testing',
    title: 'Testing strategy',
    detail: 'Vitest, Testing Library, MSW, and the testing trophy for React apps.',
    summary:
      'Follow the testing trophy: mostly integration tests, some unit tests for pure logic, few E2E tests for critical paths, and static analysis always on.',
    category: 'Delivery',
    tags: ['vitest', 'testing-library', 'msw'],
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
