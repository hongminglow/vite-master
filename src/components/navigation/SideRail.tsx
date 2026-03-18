import { ChevronRight, ShieldCheck, Zap } from 'lucide-react'

import { Badge } from '@/components/ui/Badge'
import { Panel } from '@/components/ui/Panel'

type NavSection = {
  id: string
  label: string
  detail: string
}

type SideRailProps = {
  sections: NavSection[]
}

export function SideRail({ sections }: SideRailProps) {
  return (
    <aside className="space-y-6 xl:sticky xl:top-6 xl:h-fit">
      <Panel className="p-5">
        <div className="space-y-4">
          <div>
            <p className="section-kicker">Navigate</p>
            <h2 className="mt-4 font-display text-2xl font-semibold text-slate-950">
              What this lab covers
            </h2>
          </div>
          <nav aria-label="Section navigation" className="space-y-2">
            {sections.map((section) => (
              <a
                className="group flex items-center justify-between rounded-2xl border border-slate-200/80 bg-slate-50/80 px-4 py-3 transition-colors duration-200 hover:bg-white"
                href={`#${section.id}`}
                key={section.id}
              >
                <div>
                  <div className="text-sm font-medium text-slate-900">
                    {section.label}
                  </div>
                  <div className="text-xs text-slate-500">{section.detail}</div>
                </div>
                <ChevronRight className="size-4 text-slate-400 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            ))}
          </nav>
        </div>
      </Panel>

      <Panel className="border-amber-200/90 bg-amber-50/80 p-5">
        <div className="flex items-center gap-2 text-amber-950">
          <ShieldCheck className="size-4" />
          <p className="text-sm font-semibold">Research-backed defaults</p>
        </div>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-amber-900/90">
          <li>Use local state for UI state, server-state tools for async cache.</li>
          <li>Keep SVGs tiny before turning them into components.</li>
          <li>Prefer cached fast lint by default, typed lint on demand.</li>
        </ul>
      </Panel>

      <Panel className="bg-slate-950 p-5 text-slate-50">
        <div className="flex items-center gap-2">
          <Zap className="size-4 text-amber-300" />
          <p className="text-sm font-semibold">Baseline stack</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge className="border-white/15 bg-white/10 text-white" variant="dark">
            React 19
          </Badge>
          <Badge className="border-white/15 bg-white/10 text-white" variant="dark">
            Tailwind 4
          </Badge>
          <Badge className="border-white/15 bg-white/10 text-white" variant="dark">
            Vite 8
          </Badge>
        </div>
      </Panel>
    </aside>
  )
}
