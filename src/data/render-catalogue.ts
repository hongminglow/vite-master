export type LabTrack =
  | 'all'
  | 'svg'
  | 'forms'
  | 'server-state'
  | 'performance'
  | 'tooling'

export type RenderCatalogueItem = {
  id: string
  name: string
  track: Exclude<LabTrack, 'all'>
  painPoint: string
  recommendation: string
  tags: string[]
  searchText: string
  weight: number
}

const seedEntries = [
  {
    name: 'SVGR component imports',
    track: 'svg',
    painPoint: 'Need to recolor SVGs from React state or Tailwind classes.',
    recommendation: 'Use ?react imports and normalize fills to currentColor.',
    tags: ['svg', 'currentcolor', 'icons', 'svgr'],
  },
  {
    name: 'SVG file optimization',
    track: 'svg',
    painPoint: 'Designer exports are verbose and often ship unnecessary bytes.',
    recommendation: 'Run SVGO or SVGOMG before promoting files into the app.',
    tags: ['svg', 'svgo', 'compression', 'assets'],
  },
  {
    name: 'Schema-driven forms',
    track: 'forms',
    painPoint: 'Validation logic drifts from UI constraints.',
    recommendation: 'Keep one Zod schema and feed it into React Hook Form.',
    tags: ['forms', 'zod', 'validation', 'react-hook-form'],
  },
  {
    name: 'Field array management',
    track: 'forms',
    painPoint: 'Dynamic inputs get messy when every row has hand-written state.',
    recommendation: 'Use useFieldArray so add/remove stays declarative.',
    tags: ['forms', 'field-array', 'inputs', 'state'],
  },
  {
    name: 'TanStack Query cache',
    track: 'server-state',
    painPoint: 'Repeated fetching and stale data logic leaks into components.',
    recommendation: 'Use query keys, staleTime, and invalidation instead of bespoke caches.',
    tags: ['server-state', 'react-query', 'cache', 'data-fetching'],
  },
  {
    name: 'Background refetch control',
    track: 'server-state',
    painPoint: 'UI refreshes more often than users expect and feels noisy.',
    recommendation: 'Tune staleTime and focus refetch behavior per screen.',
    tags: ['server-state', 'refetch', 'freshness', 'network'],
  },
  {
    name: 'Deferred search updates',
    track: 'performance',
    painPoint: 'Typing lags while heavy derived data recomputes.',
    recommendation: 'Use useDeferredValue to keep input responsive.',
    tags: ['performance', 'deferred', 'search', 'rendering'],
  },
  {
    name: 'Transitioned filters',
    track: 'performance',
    painPoint: 'Large filter changes block the UI and feel sticky.',
    recommendation: 'Wrap non-urgent state updates in startTransition.',
    tags: ['performance', 'transition', 'filters', 'ux'],
  },
  {
    name: 'Bundle diff review',
    track: 'tooling',
    painPoint: 'Libraries get added without a clear size tradeoff.',
    recommendation: 'Generate a static analyzer report before shipping the change.',
    tags: ['tooling', 'bundle', 'size', 'report'],
  },
  {
    name: 'Cached lint path',
    track: 'tooling',
    painPoint: 'Lint gets slower as the project grows.',
    recommendation: 'Cache the default lint path and separate typed lint into a second command.',
    tags: ['tooling', 'eslint', 'cache', 'typed-lint'],
  },
  {
    name: 'Vite dependency cache',
    track: 'tooling',
    painPoint: 'Cold starts feel slow after lockfile or config changes.',
    recommendation: 'Understand node_modules/.vite before nuking caches blindly.',
    tags: ['tooling', 'vite', 'cache', 'build'],
  },
  {
    name: 'Lazy state initialization',
    track: 'performance',
    painPoint: 'Expensive initial computations rerun on every render.',
    recommendation: 'Use the function form of useState for one-time setup work.',
    tags: ['performance', 'use-state', 'lazy-init', 'render'],
  },
] as const

export const renderTracks: Array<{ value: LabTrack; label: string }> = [
  { value: 'all', label: 'All topics' },
  { value: 'svg', label: 'SVG' },
  { value: 'forms', label: 'Forms' },
  { value: 'server-state', label: 'Server state' },
  { value: 'performance', label: 'Performance' },
  { value: 'tooling', label: 'Tooling' },
]

export function buildRenderCatalogue(repeats = 42): RenderCatalogueItem[] {
  return Array.from({ length: repeats }, (_, batchIndex) =>
    seedEntries.map((entry, entryIndex) => {
      const idBase = entry.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      return {
        id: `${idBase}-${batchIndex}-${entryIndex}`,
        name: entry.name,
        track: entry.track,
        painPoint: entry.painPoint,
        recommendation: entry.recommendation,
        tags: [...entry.tags],
        searchText: [
          entry.name,
          entry.painPoint,
          entry.recommendation,
          entry.tags.join(' '),
          `batch ${batchIndex + 1}`,
        ]
          .join(' ')
          .toLowerCase(),
        weight: ((batchIndex + 2) * (entryIndex + 3)) % 17,
      }
    }),
  ).flat()
}

export function filterRenderCatalogue(
  catalogue: RenderCatalogueItem[],
  query: string,
  track: LabTrack,
) {
  const normalizedQuery = query.trim().toLowerCase()

  return catalogue
    .filter((item) => {
      if (track !== 'all' && item.track !== track) {
        return false
      }

      if (!normalizedQuery) {
        return true
      }

      return normalizedQuery
        .split(/\s+/)
        .every((token) => item.searchText.includes(token))
    })
    .sort(
      (left, right) => getScore(right, normalizedQuery) - getScore(left, normalizedQuery),
    )
}

function getScore(item: RenderCatalogueItem, query: string) {
  if (!query) {
    return item.weight
  }

  let score = item.weight

  if (item.searchText.includes(query)) {
    score += 40
  }

  for (const token of query.split(/\s+/)) {
    if (token.length === 0) {
      continue
    }

    if (item.searchText.includes(token)) {
      score += 10
    }
  }

  for (let index = 0; index < 80; index += 1) {
    score += item.searchText.charCodeAt(index % item.searchText.length) % 4
  }

  return score
}
