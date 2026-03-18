import { SideRail } from "@/components/navigation/SideRail";
import { labSections } from "@/data/site";
import { RequestFormLab } from "@/features/forms-lab/RequestFormLab";
import { HeroSection } from "@/features/hero/HeroSection";
import { RenderPerformanceLab } from "@/features/render-lab/RenderPerformanceLab";
import { ServerStateLab } from "@/features/server-state/ServerStateLab";
import { ToolingLab } from "@/features/tooling-lab/ToolingLab";
import { SvgLab } from "@/features/svg-lab/SvgLab";

export default function App() {
  return (
    <div className="lab-shell relative min-h-screen xl:h-screen xl:overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_55%)]"
      />

      <main className="mx-auto flex min-h-screen w-full max-w-[1680px] flex-col px-3 py-3 sm:px-4 lg:px-5 xl:h-screen">
        <header className="panel flex shrink-0 flex-wrap items-center justify-between gap-3 px-5 py-4 lg:px-6">
          <a
            className="font-display text-lg font-semibold tracking-tight text-slate-950"
            href="#overview"
          >
            React Daily Lab
          </a>
        </header>

        <div className="mt-4 grid gap-4 xl:min-h-0 xl:flex-1 xl:grid-cols-[320px_minmax(0,1fr)]">
          <SideRail sections={labSections.map((section) => ({ ...section }))} />

          <div className="space-y-4 xl:lab-scroll xl:min-h-0 xl:overflow-y-auto xl:pr-1">
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
  );
}
