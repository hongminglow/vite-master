import { ArrowUpRight, Gauge, HardDriveDownload, Wrench } from 'lucide-react'

import { SectionShell } from '@/components/layout/SectionShell'
import { Badge } from '@/components/ui/Badge'
import { Panel } from '@/components/ui/Panel'
import {
  bookmarkLinks,
  buildSpeedTips,
  bundleWorkflow,
  dependencyNotes,
  lintSpeedTips,
} from '@/data/site'

export function ToolingLab() {
  return (
    <SectionShell
      description="This is the operational side of the repo: how to inspect bundle cost, what to do when builds feel slow, and how to keep lint practical instead of painful."
      eyebrow="Tooling Playbook"
      id="tooling-lab"
      title="Measure first, then tune the slow path with targeted fixes."
    >
      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <Panel className="p-6">
            <div className="flex items-center gap-2 text-slate-900">
              <HardDriveDownload className="size-4" />
              <h3 className="font-display text-2xl font-semibold">
                Scripts included in this repo
              </h3>
            </div>

            <div className="mt-5 space-y-4">
              {bundleWorkflow.map((item) => (
                <div
                  className="rounded-[24px] border border-slate-200/80 bg-slate-50/80 px-4 py-4"
                  key={item.command}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <code className="mono-chip">{item.command}</code>
                    <Badge variant="neutral">{item.output}</Badge>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.note}
                  </p>
                </div>
              ))}
            </div>
          </Panel>

          <div className="grid gap-6 md:grid-cols-2">
            <Panel className="p-6">
              <div className="flex items-center gap-2 text-slate-900">
                <Gauge className="size-4" />
                <h3 className="font-display text-2xl font-semibold">
                  Slow build fixes
                </h3>
              </div>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                {buildSpeedTips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </Panel>

            <Panel className="p-6">
              <div className="flex items-center gap-2 text-slate-900">
                <Wrench className="size-4" />
                <h3 className="font-display text-2xl font-semibold">
                  Slow ESLint fixes
                </h3>
              </div>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                {lintSpeedTips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </Panel>
          </div>
        </div>

        <div className="space-y-6">
          <Panel className="p-6">
            <h3 className="font-display text-2xl font-semibold text-slate-950">
              Installed libraries and why
            </h3>
            <div className="mt-5 space-y-4">
              {dependencyNotes.map((item) => (
                <div
                  className="rounded-[24px] border border-slate-200/80 bg-white px-4 py-4"
                  key={item.name}
                >
                  <p className="text-sm font-semibold text-slate-900">
                    {item.name}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.reason}
                  </p>
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="p-6">
            <h3 className="font-display text-2xl font-semibold text-slate-950">
              Bookmarks worth keeping open
            </h3>
            <div className="mt-5 space-y-3">
              {bookmarkLinks.map((link) => (
                <a
                  className="flex items-start justify-between gap-4 rounded-[24px] border border-slate-200/80 bg-slate-50/80 px-4 py-4 transition-colors duration-200 hover:bg-white"
                  href={link.url}
                  key={link.name}
                  rel="noreferrer"
                  target="_blank"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {link.name}
                    </p>
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
    </SectionShell>
  )
}
