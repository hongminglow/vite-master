import { wait } from '@/lib/wait'

export type SolutionSnapshot = {
  generatedAt: string
  metrics: Array<{
    label: string
    value: string
    detail: string
  }>
  items: Array<{
    name: string
    owner: string
    cacheWindow: string
    reason: string
    status: 'ready' | 'watch' | 'heavy'
  }>
}

const baseItems = [
  {
    name: 'SVG pipeline docs',
    owner: 'Design system',
    cacheWindow: '7d',
    reason: 'Static guidance changes rarely, so it can stay warm.',
    status: 'ready',
  },
  {
    name: 'Bundle analyzer output',
    owner: 'Build tooling',
    cacheWindow: '1d',
    reason: 'Generate a fresh report after dependency or route changes.',
    status: 'watch',
  },
  {
    name: 'Library recommendations',
    owner: 'Frontend guild',
    cacheWindow: '1d',
    reason: 'These are useful defaults but worth refreshing periodically.',
    status: 'watch',
  },
  {
    name: 'Heavy charting package',
    owner: 'Analytics surface',
    cacheWindow: 'On demand',
    reason: 'Load only where it is actually needed to protect the main bundle.',
    status: 'heavy',
  },
] as const

export async function fetchToolSnapshot(): Promise<SolutionSnapshot> {
  await wait(700)

  const now = new Date()
  const minuteSeed = now.getMinutes()

  return {
    generatedAt: now.toISOString(),
    metrics: [
      {
        label: 'Cached guides',
        value: `${12 + (minuteSeed % 4)}`,
        detail: 'Small docs and metadata that are safe to keep fresh for longer.',
      },
      {
        label: 'Bundle delta',
        value: `${34 + (minuteSeed % 5)} KB`,
        detail: 'Example gzip delta you would investigate before merging.',
      },
      {
        label: 'Refetch policy',
        value: '60s',
        detail: 'The demo query uses a friendly stale time instead of instant staleness.',
      },
    ],
    items: baseItems.map((item) => ({
      ...item,
    })),
  }
}
