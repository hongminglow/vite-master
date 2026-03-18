import { useDeferredValue, useRef, useState } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { ListTree, Search, SlidersHorizontal } from 'lucide-react'

import { SectionShell } from '@/components/layout/SectionShell'
import { Badge } from '@/components/ui/Badge'
import { Panel } from '@/components/ui/Panel'
import { buildVirtualTasks, type VirtualTaskTrack } from '@/data/virtual-tasks'
import { cn } from '@/lib/cn'

const allTasks = buildVirtualTasks()

const trackOptions: Array<{ value: 'all' | VirtualTaskTrack; label: string }> = [
  { value: 'all', label: 'All tracks' },
  { value: 'routing', label: 'Routing' },
  { value: 'forms', label: 'Forms' },
  { value: 'server-state', label: 'Server state' },
  { value: 'assets', label: 'Assets' },
  { value: 'performance', label: 'Performance' },
  { value: 'tooling', label: 'Tooling' },
]

const toolNotes = [
  'TanStack Virtual is a flexible default when you need virtual grids, tables, or custom measurement.',
  'react-window is still worth knowing when you want a smaller API surface for simple fixed-size lists.',
  'Virtualize only after confirming the real bottleneck is list size or row complexity, not data fetching or filter logic.',
] as const

export function VirtualListLab() {
  const [query, setQuery] = useState('')
  const [track, setTrack] = useState<(typeof trackOptions)[number]['value']>('all')
  const deferredQuery = useDeferredValue(query)
  const parentRef = useRef<HTMLDivElement | null>(null)

  const filteredTasks = allTasks.filter((task) => {
    if (track !== 'all' && task.track !== track) {
      return false
    }

    if (!deferredQuery.trim()) {
      return true
    }

    return deferredQuery
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .every((token) => task.searchText.includes(token))
  })

  // TanStack Virtual intentionally manages imperative measurement APIs here.
  // eslint-disable-next-line react-hooks/incompatible-library
  const rowVirtualizer = useVirtualizer({
    count: filteredTasks.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 144,
    overscan: 8,
  })

  const virtualRows = rowVirtualizer.getVirtualItems()

  return (
    <SectionShell
      description="Large lists are another daily React pain point: backlog tables, user directories, audit logs, and admin tools can all get sluggish if the DOM tries to mount every row at once."
      eyebrow="Performance Patterns"
      id="virtual-list-lab"
      title="Virtualize genuinely large collections, then keep search responsive with deferred filtering."
    >
      <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="space-y-6">
          <Panel className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-2">
                <Badge variant="accent">Real DOM reduction</Badge>
                <h3 className="font-display text-2xl font-semibold text-slate-950">
                  Search a few thousand workflow tasks without mounting them all
                </h3>
                <p className="max-w-2xl text-sm leading-6 text-slate-600">
                  This demo keeps the data set large enough to matter, but only
                  renders the visible rows plus a small overscan window. The input
                  uses a deferred value so typing keeps priority over the filtered
                  list repaint.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="mono-chip">{allTasks.length} seeded tasks</span>
                <span className="mono-chip">{virtualRows.length} DOM rows now</span>
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto]">
              <label className="rounded-[24px] border border-slate-800/90 bg-slate-900/72 px-4 py-3">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
                  <Search className="size-4" />
                  Search tasks
                </div>
                <input
                  className="mt-3 w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Try optimistic, svg, lint, route..."
                  value={query}
                />
              </label>

              <div className="flex flex-wrap gap-2 lg:max-w-xs lg:justify-end">
                {trackOptions.map((option) => (
                  <button
                    className={cn(
                      'rounded-full border px-3 py-2 text-sm font-medium transition-colors duration-200',
                      track === option.value
                        ? 'border-emerald-500/30 bg-emerald-500/12 text-emerald-200'
                        : 'border-slate-800/90 bg-slate-900/72 text-slate-300 hover:bg-slate-800/90',
                    )}
                    key={option.value}
                    onClick={() => setTrack(option.value)}
                    type="button"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div className="rounded-[24px] border border-slate-800/90 bg-slate-900/72 px-4 py-4">
                <p className="text-sm font-semibold text-slate-950">Matching rows</p>
                <p className="mt-3 font-display text-3xl font-semibold text-slate-950">
                  {filteredTasks.length}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Rows after the deferred search filter is applied.
                </p>
              </div>
              <div className="rounded-[24px] border border-slate-800/90 bg-slate-900/72 px-4 py-4">
                <p className="text-sm font-semibold text-slate-950">Mounted now</p>
                <p className="mt-3 font-display text-3xl font-semibold text-slate-950">
                  {virtualRows.length}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Rows currently in the DOM, including the overscan buffer.
                </p>
              </div>
              <div className="rounded-[24px] border border-slate-800/90 bg-slate-900/72 px-4 py-4">
                <p className="text-sm font-semibold text-slate-950">When to use it</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Best for lists or tables where row count and cell complexity are
                  both high enough to make the page noticeably sluggish.
                </p>
              </div>
            </div>

            <div
              className="lab-scroll mt-6 h-[38rem] rounded-[28px] border border-slate-800/90 bg-slate-950/70 p-2"
              ref={parentRef}
            >
              <div
                className="relative w-full"
                style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
              >
                {virtualRows.map((virtualRow) => {
                  const task = filteredTasks[virtualRow.index]

                  if (!task) {
                    return null
                  }

                  return (
                    <div
                      className="absolute left-0 top-0 w-full px-2"
                      key={task.id}
                      ref={rowVirtualizer.measureElement}
                      style={{ transform: `translateY(${virtualRow.start}px)` }}
                    >
                      <div className="rounded-[24px] border border-slate-800/90 bg-slate-900/82 px-4 py-4">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="font-display text-xl font-semibold text-slate-950">
                                {task.title}
                              </p>
                              <Badge variant="neutral">{task.track}</Badge>
                            </div>
                            <p className="mt-2 text-sm leading-6 text-slate-600">
                              {task.painPoint}
                            </p>
                          </div>
                          <Badge
                            className={cn(
                              task.urgency === 'routine' && 'border-cyan-500/30 bg-cyan-500/10 text-cyan-200',
                              task.urgency === 'watch' &&
                                'border-amber-500/30 bg-amber-500/10 text-amber-200',
                              task.urgency === 'spike' &&
                                'border-rose-500/30 bg-rose-500/10 text-rose-200',
                            )}
                            variant="neutral"
                          >
                            {task.urgency}
                          </Badge>
                        </div>
                        <div className="mt-4 grid gap-3 md:grid-cols-[0.28fr_0.72fr]">
                          <div className="rounded-[20px] border border-slate-800/80 bg-slate-950/70 px-3 py-3">
                            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                              Owner
                            </p>
                            <p className="mt-2 text-sm font-medium text-slate-300">
                              {task.owner}
                            </p>
                          </div>
                          <div className="rounded-[20px] border border-slate-800/80 bg-slate-950/70 px-3 py-3">
                            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                              Better default
                            </p>
                            <p className="mt-2 text-sm leading-6 text-slate-300">
                              {task.recommendation}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel className="p-6">
            <div className="flex items-center gap-2 text-slate-300">
              <ListTree className="size-4 text-cyan-200" />
              <h3 className="font-display text-2xl font-semibold text-slate-950">
                When virtualization is the right fix
              </h3>
            </div>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
              <li>The collection is large enough that DOM size becomes part of the slowdown.</li>
              <li>Each row has enough nested UI that rendering all of them is expensive.</li>
              <li>The viewport only needs a small slice of the data at any given moment.</li>
              <li>Row height is stable or at least measurable enough for a virtualizer.</li>
            </ul>
          </Panel>

          <Panel className="p-6">
            <div className="flex items-center gap-2 text-slate-300">
              <SlidersHorizontal className="size-4 text-emerald-300" />
              <h3 className="font-display text-2xl font-semibold text-slate-950">
                Tools worth mentioning
              </h3>
            </div>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
              {toolNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </SectionShell>
  )
}
