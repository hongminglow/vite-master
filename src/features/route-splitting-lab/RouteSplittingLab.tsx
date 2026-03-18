import { lazy, Suspense, useState } from 'react'
import { Boxes, DownloadCloud, Route, TimerReset } from 'lucide-react'

import { SectionShell } from '@/components/layout/SectionShell'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Panel } from '@/components/ui/Panel'

const BundleInspectorPanel = lazy(
  () => import('@/features/route-splitting-lab/components/BundleInspectorPanel'),
)

const routeSplitHeuristics = [
  {
    title: 'Split by screen or journey',
    detail:
      'Routes are usually the cleanest seam because users already navigate there intentionally.',
  },
  {
    title: 'Split by optional capability',
    detail:
      'Charts, editors, maps, and admin-only tools are good second-level candidates when not every user needs them.',
  },
  {
    title: 'Measure before and after',
    detail:
      'If a split only saves a tiny amount, the added suspense/loading state might not be worth the extra complexity.',
  },
] as const

const routeSplitTools = [
  'React lazy + Suspense for declarative apps',
  'React Router route.lazy when using data or framework mode',
  'Vite dynamic import chunks for feature modules',
  'bundlejs / Bundlephobia before install',
  'vite-bundle-analyzer after build',
] as const

export function RouteSplittingLab() {
  const [showInspector, setShowInspector] = useState(false)

  return (
    <SectionShell
      description="Route splitting is one of the most common React requirements once a product grows: the bundle starts creeping up, optional screens become expensive, and suddenly every user is downloading code for pages they never open."
      eyebrow="Delivery Patterns"
      id="route-splitting-lab"
      title="Split by route first, then split optional heavy panels only where the gain is real."
    >
      <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="space-y-6">
          <Panel className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-2">
                <Badge variant="accent">Live architecture</Badge>
                <h3 className="font-display text-2xl font-semibold text-slate-950">
                  This whole app now lazy-loads route pages
                </h3>
                <p className="max-w-2xl text-sm leading-6 text-slate-600">
                  The sidebar and shell stay mounted, while each topic route is
                  loaded on demand through a dynamic import. That means the route
                  structure itself demonstrates the technique instead of only
                  documenting it.
                </p>
              </div>

              <Button
                className="shrink-0"
                onClick={() => setShowInspector((current) => !current)}
                variant={showInspector ? 'secondary' : 'primary'}
              >
                {showInspector ? 'Hide' : 'Load'} optional panel
              </Button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-[24px] border border-slate-800/90 bg-slate-900/72 px-4 py-4">
                <div className="flex items-center gap-2 text-emerald-300">
                  <Route className="size-4" />
                  <p className="text-sm font-semibold">Route seam</p>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  The first split should usually follow navigation boundaries,
                  because the product already has a natural loading state there.
                </p>
              </div>
              <div className="rounded-[24px] border border-slate-800/90 bg-slate-900/72 px-4 py-4">
                <div className="flex items-center gap-2 text-cyan-200">
                  <DownloadCloud className="size-4" />
                  <p className="text-sm font-semibold">On-demand features</p>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Secondary panels can load later if they are genuinely optional,
                  like editors, maps, or analysis views.
                </p>
              </div>
              <div className="rounded-[24px] border border-slate-800/90 bg-slate-900/72 px-4 py-4">
                <div className="flex items-center gap-2 text-amber-300">
                  <TimerReset className="size-4" />
                  <p className="text-sm font-semibold">Keep loading honest</p>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Suspense fallbacks should feel intentional and brief, not a
                  blanket excuse for splitting everything.
                </p>
              </div>
            </div>

            {showInspector ? (
              <Suspense
                fallback={
                  <Panel className="mt-6 border-dashed border-slate-700/90 p-6">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Boxes className="size-4 animate-pulse text-emerald-300" />
                      <p className="text-sm font-semibold">
                        Loading the optional inspector chunk...
                      </p>
                    </div>
                  </Panel>
                }
              >
                <div className="mt-6">
                  <BundleInspectorPanel />
                </div>
              </Suspense>
            ) : null}
          </Panel>

          <Panel className="p-6">
            <h3 className="font-display text-2xl font-semibold text-slate-950">
              Practical heuristics
            </h3>
            <div className="mt-5 space-y-4">
              {routeSplitHeuristics.map((item) => (
                <div
                  className="rounded-[24px] border border-slate-800/90 bg-slate-900/72 px-4 py-4"
                  key={item.title}
                >
                  <p className="text-sm font-semibold text-slate-950">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.detail}</p>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel className="p-6">
            <h3 className="font-display text-2xl font-semibold text-slate-950">
              Starter snippet
            </h3>
            <div className="mt-5 rounded-[24px] bg-slate-950 px-4 py-4 font-mono text-xs leading-6 text-slate-100">
              <div>{`const VirtualListsPage = lazy(() => import('@/app/routes/VirtualListsRoute'))`}</div>
              <div>{`<Suspense fallback={<RouteFallback />}>`}</div>
              <div>{`  <Routes>`}</div>
              <div>{`    <Route path="/virtual-lists" element={<VirtualListsPage />} />`}</div>
              <div>{`  </Routes>`}</div>
              <div>{`</Suspense>`}</div>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              This keeps the shell stable and lets each page compile into its own
              chunk. It is a good default when you are using declarative routes.
            </p>
          </Panel>

          <Panel className="p-6">
            <h3 className="font-display text-2xl font-semibold text-slate-950">
              Tools worth knowing
            </h3>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
              {routeSplitTools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </SectionShell>
  )
}
