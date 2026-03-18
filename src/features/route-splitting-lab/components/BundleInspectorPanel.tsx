import { Box, FileCode2, Gauge } from 'lucide-react'

import { Badge } from '@/components/ui/Badge'
import { Panel } from '@/components/ui/Panel'
import { contentTopics } from '@/data/topics'

export default function BundleInspectorPanel() {
  const highlightedRoutes = contentTopics.slice(0, 4)

  return (
    <Panel className="border-emerald-500/28 bg-emerald-500/10 p-6">
      <div className="flex items-center gap-2 text-emerald-600">
        <Gauge className="size-4" />
        <p className="text-sm font-semibold uppercase tracking-[0.2em]">
          Optional payload demo
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-[24px] border border-emerald-500/25 bg-slate-950/70 px-4 py-4">
          <div className="flex items-center gap-2 text-slate-300">
            <Box className="size-4 text-emerald-300" />
            <p className="text-sm font-semibold">What lazy loading protects</p>
          </div>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
            <li>Optional route code stays out of the initial bundle.</li>
            <li>Heavy screens only pay their cost when a user actually visits them.</li>
            <li>Analyzer reports become easier to reason about by route or feature.</li>
          </ul>
        </div>

        <div className="rounded-[24px] border border-slate-800/90 bg-slate-950/70 px-4 py-4">
          <div className="flex items-center gap-2 text-slate-300">
            <FileCode2 className="size-4 text-emerald-300" />
            <p className="text-sm font-semibold">Routes already split in this app</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {highlightedRoutes.map((topic) => (
              <Badge className="border-white/15 bg-white/8 text-white" key={topic.path} variant="dark">
                {topic.navLabel}
              </Badge>
            ))}
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            This panel is loaded separately on demand too, so the route demonstrates
            both route-level and component-level splitting without adding a fake
            dependency just to prove the concept.
          </p>
        </div>
      </div>
    </Panel>
  )
}
