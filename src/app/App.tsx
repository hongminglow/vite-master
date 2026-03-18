import { SideRail } from '@/components/navigation/SideRail'
import { labSections } from '@/data/site'
import { RequestFormLab } from '@/features/forms-lab/RequestFormLab'
import { HeroSection } from '@/features/hero/HeroSection'
import { RenderPerformanceLab } from '@/features/render-lab/RenderPerformanceLab'
import { ServerStateLab } from '@/features/server-state/ServerStateLab'
import { ToolingLab } from '@/features/tooling-lab/ToolingLab'
import { SvgLab } from '@/features/svg-lab/SvgLab'

export default function App() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.16),_transparent_55%)]"
      />

      <main className="mx-auto max-w-[1380px] px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <a
            className="font-display text-lg font-semibold tracking-tight text-slate-950"
            href="#overview"
          >
            React Daily Lab
          </a>
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
            <span className="section-kicker">Enterprise-friendly folder split</span>
            <span className="mono-chip">README included</span>
          </div>
        </header>

        <div className="mt-6 grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
          <SideRail sections={labSections.map((section) => ({ ...section }))} />

          <div className="space-y-6">
            <HeroSection />
            <SvgLab />
            <RequestFormLab />
            <ServerStateLab />
            <RenderPerformanceLab />
            <ToolingLab />
          </div>
        </div>
      </main>
    </div>
  )
}
