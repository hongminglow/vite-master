import { ArrowUpRight, FolderGit2, Gauge, Sparkles } from 'lucide-react'
import { Link } from 'react-router'

import { HeroSection } from '@/features/hero/HeroSection'
import { Panel } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { bookmarkLinks, bundleWorkflow } from '@/data/site'
import { contentTopics } from '@/data/topics'

const futureTopics = [
  'URL search params for filters and tables',
  'Error boundaries and route-level recovery',
  'Responsive image loading and asset formats',
  'Testing strategy for hooks, forms, and async flows',
  'Auth guards and permission-aware routing',
] as const

export function OverviewPage() {
  const categoryGroups = Array.from(new Set(contentTopics.map((topic) => topic.category)))

  return (
    <div className="space-y-4">
      <HeroSection />

      <div className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
        <Panel className="p-6">
          <div className="flex items-center gap-2 text-cyan-200">
            <Sparkles className="size-4" />
            <p className="text-sm font-semibold uppercase tracking-[0.2em]">
              How to use this lab
            </p>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-[24px] border border-slate-800/90 bg-slate-900/72 px-4 py-4">
              <p className="text-sm font-semibold text-slate-950">Pick the pain point</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Jump straight to the route that matches the current frontend task
                instead of searching one giant demo page.
              </p>
            </div>
            <div className="rounded-[24px] border border-slate-800/90 bg-slate-900/72 px-4 py-4">
              <p className="text-sm font-semibold text-slate-950">Compare the tradeoffs</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Each page shows when the pattern helps, where it can backfire,
                and which library is earning its keep.
              </p>
            </div>
            <div className="rounded-[24px] border border-slate-800/90 bg-slate-900/72 px-4 py-4">
              <p className="text-sm font-semibold text-slate-950">Carry it into README</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                The docs mirror the routes, so the repo works as both a live lab
                and a quick internal handbook later.
              </p>
            </div>
          </div>
        </Panel>

        <Panel className="p-6">
          <div className="flex items-center gap-2 text-emerald-300">
            <Gauge className="size-4" />
            <p className="text-sm font-semibold uppercase tracking-[0.2em]">
              Fast start scripts
            </p>
          </div>
          <div className="mt-5 space-y-3">
            {bundleWorkflow.map((item) => (
              <div
                className="rounded-[24px] border border-slate-800/90 bg-slate-900/72 px-4 py-4"
                key={item.command}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <code className="mono-chip">{item.command}</code>
                  <Badge variant="neutral">{item.output}</Badge>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.note}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel className="p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="section-kicker">Route directory</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-slate-950">
              Topic routes you can browse like a handbook
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
              The overview stays short on purpose. Each card below links to one
              focused route so new topics can be added without squeezing the rest
              of the app back into a single page.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="success">{contentTopics.length} live topics</Badge>
            <Badge variant="neutral">{categoryGroups.length} clusters</Badge>
            <Badge variant="accent">Lazy route modules</Badge>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
          {contentTopics.map((topic) => (
            <Link
              className="group rounded-[28px] border border-slate-800/90 bg-slate-900/72 px-5 py-5 transition-colors duration-200 hover:bg-slate-800/90"
              key={topic.path}
              to={topic.path}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
                    {topic.category}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-slate-950">
                    {topic.navLabel}
                  </h3>
                </div>
                <ArrowUpRight className="mt-1 size-4 shrink-0 text-slate-400 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{topic.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {topic.tags.map((tag) => (
                  <span className="mono-chip" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </Panel>

      <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <Panel className="p-6">
          <div className="flex items-center gap-2 text-amber-300">
            <FolderGit2 className="size-4" />
            <h2 className="font-display text-2xl font-semibold text-slate-950">
              Worth adding next
            </h2>
          </div>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
            {futureTopics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </Panel>

        <Panel className="p-6">
          <h2 className="font-display text-2xl font-semibold text-slate-950">
            Bookmarks worth keeping nearby
          </h2>
          <div className="mt-5 space-y-3">
            {bookmarkLinks.slice(0, 4).map((link) => (
              <a
                className="flex items-start justify-between gap-4 rounded-[24px] border border-slate-800/90 bg-slate-900/72 px-4 py-4 transition-colors duration-200 hover:bg-slate-800/90"
                href={link.url}
                key={link.name}
                rel="noreferrer"
                target="_blank"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-950">{link.name}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {link.description}
                  </p>
                </div>
                <ArrowUpRight className="mt-1 size-4 shrink-0 text-slate-400" />
              </a>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  )
}
