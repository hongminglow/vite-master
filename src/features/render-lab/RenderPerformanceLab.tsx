import { useDeferredValue, useState, useTransition } from 'react'
import { Filter, Gauge, Search } from 'lucide-react'

import { SectionShell } from '@/components/layout/SectionShell'
import { Badge } from '@/components/ui/Badge'
import { Panel } from '@/components/ui/Panel'
import {
  buildRenderCatalogue,
  filterRenderCatalogue,
  renderTracks,
  type LabTrack,
} from '@/data/render-catalogue'
import { formatCompactNumber } from '@/lib/format'

export function RenderPerformanceLab() {
  const [catalogue] = useState(() => buildRenderCatalogue(48))
  const [query, setQuery] = useState('')
  const [activeTrack, setActiveTrack] = useState<LabTrack>('all')
  const [isPending, startTransition] = useTransition()

  const deferredQuery = useDeferredValue(query)
  const filteredItems = filterRenderCatalogue(catalogue, deferredQuery, activeTrack)
  const lagging = query !== deferredQuery

  return (
    <SectionShell
      description="Rendering usually gets slow for boring reasons: too much derived work tied directly to keystrokes, duplicated state, or expensive initial setup that reruns on every render. This panel demonstrates a calmer default."
      eyebrow="Render Performance"
      id="render-lab"
      title="Use deferred values and transitions when the UI should stay responsive."
    >
      <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <Panel className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <Badge variant="accent">useDeferredValue + startTransition</Badge>
              <h3 className="font-display text-2xl font-semibold text-slate-950">
                Filter a large recommendation catalogue
              </h3>
            </div>
            <div className="text-sm text-slate-500">
              Lazy initialized once: {formatCompactNumber(catalogue.length)} rows
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                className="w-full rounded-full border border-slate-700 bg-slate-950/85 py-3 pl-11 pr-4 text-sm text-slate-100 outline-none transition-colors duration-200 placeholder:text-slate-500 focus:border-amber-300"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by pain point, library, or pattern"
                value={query}
              />
            </label>

            <div className="flex flex-wrap gap-2">
              {renderTracks.map((track) => (
                <button
                  aria-pressed={activeTrack === track.value}
                  className={`rounded-full border px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    activeTrack === track.value
                      ? 'border-slate-950 bg-slate-950 text-white'
                      : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                  key={track.value}
                  onClick={() => {
                    startTransition(() => {
                      setActiveTrack(track.value)
                    })
                  }}
                  type="button"
                >
                  {track.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Badge variant={lagging || isPending ? 'accent' : 'success'}>
              {lagging || isPending ? 'Updating results' : 'Input stays responsive'}
            </Badge>
            <span className="text-sm text-slate-500">
              Showing {Math.min(filteredItems.length, 12)} of{' '}
              {formatCompactNumber(filteredItems.length)} matches
            </span>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {filteredItems.slice(0, 12).map((item) => (
              <article
                className="rounded-[24px] border border-slate-200/80 bg-slate-50/80 px-4 py-4"
                key={item.id}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-semibold text-slate-900">
                    {item.name}
                  </div>
                  <Badge variant="neutral">{item.track}</Badge>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.painPoint}
                </p>
                <p className="mt-3 text-sm font-medium leading-6 text-slate-800">
                  Better default: {item.recommendation}
                </p>
              </article>
            ))}
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel className="p-6">
            <div className="flex items-center gap-2 text-slate-900">
              <Gauge className="size-4" />
              <h3 className="font-display text-2xl font-semibold">
                Patterns used here
              </h3>
            </div>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li>Lazy useState initialization avoids rebuilding the full catalogue every render.</li>
              <li>useDeferredValue lets typing stay ahead of the heavier filtering work.</li>
              <li>startTransition marks filter-chip changes as non-urgent updates.</li>
              <li>Derived filtered data is computed from source state instead of duplicated state.</li>
            </ul>
          </Panel>

          <Panel className="border-amber-200/90 bg-amber-50/80 p-6">
            <div className="flex items-center gap-2 text-amber-950">
              <Filter className="size-4" />
              <h3 className="font-display text-2xl font-semibold">
                Next step after this demo
              </h3>
            </div>
            <p className="mt-4 text-sm leading-6 text-amber-900/90">
              If a list is still heavy after these patterns, the next move is
              usually virtualization rather than piling on memoization. Keep the
              data path simple first, then measure.
            </p>
          </Panel>
        </div>
      </div>
    </SectionShell>
  )
}
