import { ArrowRight, Boxes, FolderTree, PackageSearch, Zap } from 'lucide-react'
import { Link } from 'react-router'

import { buttonStyles } from '@/components/ui/button-styles'
import { Panel } from '@/components/ui/Panel'
import { contentTopics } from '@/data/topics'

const overviewCapabilities = [
  {
    title: 'Foundation patterns',
    summary:
      'SVG handling, forms, and server-state are separated into repeatable labs instead of being hidden inside one starter screen.',
    icon: PackageSearch,
  },
  {
    title: 'Performance patterns',
    summary:
      'Route splitting, render responsiveness, and virtualized lists are grouped so you can compare the right fix for the right bottleneck.',
    icon: Zap,
  },
  {
    title: 'Delivery guidance',
    summary:
      'Tooling advice stays next to the demos so bundle, lint, and build decisions stay grounded in real examples.',
    icon: FolderTree,
  },
] as const

const heroMetrics = [
  {
    value: `${contentTopics.length} topic routes`,
    label: 'Every major topic lives on its own route so the repo can keep growing without turning into one giant scroll page.',
  },
  {
    value: `${new Set(contentTopics.map((topic) => topic.category)).size} workstream clusters`,
    label: 'The route map groups problems into foundations, data and state, performance, and delivery concerns.',
  },
  {
    value: 'Lazy-loaded pages',
    label: 'This shell now demonstrates code splitting as part of the app architecture instead of only describing it in docs.',
  },
] as const

export function HeroSection() {
  return (
    <section className="panel overflow-hidden">
      <div className="grid gap-6 p-6 lg:grid-cols-[1.16fr_0.84fr] lg:p-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <span className="section-kicker">React Daily Lab</span>
            <div className="space-y-4">
              <h1 className="max-w-3xl font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                A route-based handbook for the React problems that keep showing
                up in daily product work.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Instead of treating SVGs, forms, performance, and tooling as
                scattered notes, this lab turns each recurring requirement into a
                dedicated route with a demo, tradeoffs, and practical defaults.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link className={buttonStyles('primary')} to="/route-splitting">
              Start with route splitting
              <ArrowRight className="size-4" />
            </Link>
            <Link className={buttonStyles('secondary')} to="/virtual-lists">
              Jump to virtualized lists
            </Link>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              'React Router',
              'TanStack Query',
              'TanStack Virtual',
              'SVGR + SVGO',
              'Vite analyzer',
            ].map((label) => (
              <span className="mono-chip" key={label}>
                {label}
              </span>
            ))}
          </div>
        </div>

        <Panel className="soft-grid border-slate-700/90 bg-slate-950 px-6 py-6 text-slate-50">
          <div className="flex items-center gap-3 text-amber-300">
            <Boxes className="size-5" />
            <p className="text-sm font-semibold uppercase tracking-[0.22em]">
              What this layout optimizes for
            </p>
          </div>

          <div className="mt-5 space-y-4">
            {overviewCapabilities.map((capability) => {
              const Icon = capability.icon

              return (
                <div
                  className="rounded-3xl border border-white/10 bg-white/10 px-4 py-4"
                  key={capability.title}
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/10 p-2">
                      <Icon className="size-4 text-amber-300" />
                    </div>
                    <h2 className="font-display text-lg font-semibold text-white">
                      {capability.title}
                    </h2>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    {capability.summary}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-white/10 px-4 py-4">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-300">
              Suggested rhythm
            </p>
            <div className="mt-3 space-y-2 font-mono text-sm text-white">
              <div>1. Pick the route that matches the current requirement</div>
              <div>2. Try the live demo and note the tradeoffs</div>
              <div>3. Read the README section before rolling it into production</div>
            </div>
          </div>
        </Panel>
      </div>

      <div className="grid gap-4 border-t border-slate-800/90 px-6 py-6 sm:grid-cols-3 lg:px-8">
        {heroMetrics.map((metric) => (
          <div
            className="rounded-3xl border border-slate-800/90 bg-slate-900/70 px-5 py-4"
            key={metric.value}
          >
            <div className="font-display text-2xl font-semibold text-slate-950">
              {metric.value}
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">{metric.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
