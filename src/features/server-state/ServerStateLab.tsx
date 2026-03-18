import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Clock3, Database, RefreshCw } from 'lucide-react'

import { SectionShell } from '@/components/layout/SectionShell'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Panel } from '@/components/ui/Panel'
import {
  fetchToolSnapshot,
  type SolutionSnapshot,
} from '@/features/server-state/api/tool-snapshot'
import { formatClock } from '@/lib/format'

const statusTone = {
  ready: 'border-emerald-300/80 bg-emerald-50 text-emerald-900',
  watch: 'border-amber-300/80 bg-amber-50 text-amber-900',
  heavy: 'border-rose-300/80 bg-rose-50 text-rose-900',
} as const

const loadingMetrics = [
  {
    label: 'Cached guides',
    value: '...',
    detail: 'Loading query snapshot.',
  },
  {
    label: 'Bundle delta',
    value: '...',
    detail: 'Loading query snapshot.',
  },
  {
    label: 'Refetch policy',
    value: '...',
    detail: 'Loading query snapshot.',
  },
]

export function ServerStateLab() {
  const queryClient = useQueryClient()
  const snapshotQuery = useQuery<SolutionSnapshot>({
    queryKey: ['tool-snapshot'],
    queryFn: fetchToolSnapshot,
    staleTime: 60_000,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })

  const snapshot = snapshotQuery.data

  return (
    <SectionShell
      description="Server-state is different from local UI state: it can go stale, it can refetch in the background, and multiple screens may care about the same source. This section demonstrates a small query with an explicit freshness policy."
      eyebrow="Server State"
      id="server-state-lab"
      title="Let a server-state library own fetching, freshness, and invalidation."
    >
      <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
        <Panel className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-3">
              <Badge variant="accent">TanStack Query</Badge>
              <h3 className="font-display text-2xl font-semibold text-slate-950">
                Live cache snapshot
              </h3>
              <p className="text-sm leading-6 text-slate-600">
                This panel uses a
                <code className="mx-1 rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-800">
                  staleTime
                </code>
                of one minute so repeated visits do not refetch instantly.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Badge variant={snapshotQuery.isFetching ? 'accent' : 'success'}>
                {snapshotQuery.isFetching ? 'Fetching' : 'Warm cache'}
              </Badge>
              <Button
                disabled={snapshotQuery.isFetching}
                onClick={() => {
                  void snapshotQuery.refetch()
                }}
                variant="secondary"
              >
                <RefreshCw className="size-4" />
                Refetch now
              </Button>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {(snapshot?.metrics ?? loadingMetrics).map((metric) => (
              <div
                className="rounded-[28px] border border-slate-200/80 bg-slate-50/80 px-4 py-4"
                key={metric.label}
              >
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
                  {metric.label}
                </p>
                <p className="mt-3 font-display text-3xl font-semibold text-slate-950">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {metric.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3">
            {(snapshot?.items ?? []).map((item) => (
              <div
                className="rounded-[28px] border border-slate-200/80 bg-white px-4 py-4"
                key={item.name}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      {item.name}
                    </div>
                    <div className="mt-1 text-sm text-slate-500">
                      Owned by {item.owner}
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${statusTone[item.status]}`}
                  >
                    {item.cacheWindow}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.reason}
                </p>
              </div>
            ))}
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel className="p-6">
            <div className="flex items-center gap-2 text-slate-900">
              <Database className="size-4" />
              <h3 className="font-display text-2xl font-semibold">
                Why this is better than custom fetch state
              </h3>
            </div>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li>One query key can power multiple consumers consistently.</li>
              <li>Freshness is configurable instead of implied by render timing.</li>
              <li>Refetches and invalidation stay declarative.</li>
              <li>Loading and error state are built into the hook contract.</li>
            </ul>
          </Panel>

          <Panel className="p-6">
            <div className="flex items-center gap-2 text-slate-900">
              <Clock3 className="size-4" />
              <h3 className="font-display text-2xl font-semibold">
                Useful defaults to remember
              </h3>
            </div>

            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li>This demo sets staleTime to 60 seconds to avoid immediate refetching.</li>
              <li>It disables refetch on window focus so the UI feels calmer during the lab.</li>
              <li>The garbage-collection window is five minutes, which is a good middle ground.</li>
            </ul>

            <div className="mt-5 flex flex-wrap gap-3">
              <Button
                onClick={() => {
                  void queryClient.invalidateQueries({
                    queryKey: ['tool-snapshot'],
                  })
                }}
                variant="secondary"
              >
                Invalidate query
              </Button>
              <Badge variant="neutral">
                Last updated:{' '}
                {snapshot ? formatClock(snapshot.generatedAt) : 'Loading...'}
              </Badge>
            </div>
          </Panel>
        </div>
      </div>
    </SectionShell>
  )
}
