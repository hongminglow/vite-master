import { AlertTriangle, Layers, Shield, ShieldAlert } from 'lucide-react'

import { SectionShell } from '@/components/layout/SectionShell'
import { Badge } from '@/components/ui/Badge'
import { Panel } from '@/components/ui/Panel'
import { DemoErrorBoundary } from '@/features/error-handling-lab/components/DemoErrorBoundary'
import {
  CrashyRoute,
  CrashyWidget,
} from '@/features/error-handling-lab/components/CrashyWidgets'

const boundaryLevels = [
  {
    title: 'Route-level boundary',
    detail: 'Wraps entire route content. Catches any crash inside the route and shows a full-page fallback with recovery.',
    use: 'Use for the outermost catch so the app never shows a white screen.',
  },
  {
    title: 'Component-level boundary',
    detail: 'Wraps individual widgets or panels. Only the affected widget shows the error — the rest of the page keeps working.',
    use: 'Use for optional or risky widgets like charts, third-party embeds, or user-generated content.',
  },
  {
    title: 'Async boundary (TanStack Query)',
    detail: 'Use throwOnError to let query errors bubble into the nearest error boundary instead of handling them inline.',
    use: 'Use when a failed fetch should trigger the same recovery UI as a rendering crash.',
  },
] as const

const mistakes = [
  'No error boundary at all — a single crash shows a white screen to users.',
  'Only a route-level boundary — one broken widget takes down the whole page.',
  'Error boundary without a retry action — users have no way to recover.',
  'Catching errors in render but not in effects or event handlers.',
] as const

export function ErrorHandlingLab() {
  return (
    <SectionShell
      description="Errors are inevitable. The question is whether your user sees a recovery option or a blank white page. This section shows route-level and component-level error boundaries with retry and fallback patterns."
      eyebrow="Delivery"
      id="error-handling-lab"
      title="Catch rendering and async errors so one crash never kills the whole page."
    >
      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <Panel className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-2">
                <Badge variant="accent">Component boundary</Badge>
                <h3 className="font-display text-2xl font-semibold text-slate-950">
                  Isolated widget crash
                </h3>
              </div>
              <span className="mono-chip">ErrorBoundary</span>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <DemoErrorBoundary fallbackTitle="Widget A crashed" level="component">
                <Panel className="border-emerald-500/20 bg-emerald-500/5 p-4">
                  <p className="mb-2 text-xs font-medium uppercase tracking-[0.22em] text-emerald-600">
                    Widget A
                  </p>
                  <CrashyWidget />
                </Panel>
              </DemoErrorBoundary>

              <DemoErrorBoundary fallbackTitle="Widget B crashed" level="component">
                <Panel className="border-cyan-500/20 bg-cyan-500/5 p-4">
                  <p className="mb-2 text-xs font-medium uppercase tracking-[0.22em] text-cyan-600">
                    Widget B
                  </p>
                  <CrashyWidget />
                </Panel>
              </DemoErrorBoundary>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Crash one widget — the other keeps running. Each has its own boundary with
              a retry button.
            </p>
          </Panel>

          <Panel className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-2">
                <Badge variant="success">Route boundary</Badge>
                <h3 className="font-display text-2xl font-semibold text-slate-950">
                  Full route crash and recovery
                </h3>
              </div>
              <span className="mono-chip">route-level fallback</span>
            </div>
            <div className="mt-5">
              <CrashyRoute />
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel className="p-6">
            <div className="flex items-center gap-2 text-emerald-300">
              <Layers className="size-4" />
              <h3 className="font-display text-2xl font-semibold text-slate-950">
                Boundary levels
              </h3>
            </div>
            <div className="mt-5 space-y-4">
              {boundaryLevels.map((level) => (
                <div
                  className="rounded-[24px] border border-slate-200/80 bg-white px-4 py-4"
                  key={level.title}
                >
                  <div className="flex items-center gap-2">
                    <Shield className="size-4 text-emerald-500" />
                    <p className="text-sm font-semibold text-slate-900">{level.title}</p>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{level.detail}</p>
                  <p className="mt-2 text-xs font-medium text-emerald-700">{level.use}</p>
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="p-6">
            <div className="flex items-center gap-2 text-amber-300">
              <AlertTriangle className="size-4" />
              <h3 className="font-display text-2xl font-semibold text-slate-950">
                Common mistakes
              </h3>
            </div>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              {mistakes.map((m) => (
                <li key={m}>
                  <ShieldAlert className="mr-2 inline size-3.5 text-rose-400" />
                  {m}
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </SectionShell>
  )
}
