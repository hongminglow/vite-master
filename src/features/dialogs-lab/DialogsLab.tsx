import { Accessibility, Focus, Layers, SquareStack } from 'lucide-react'

import { SectionShell } from '@/components/layout/SectionShell'
import { Badge } from '@/components/ui/Badge'
import { Panel } from '@/components/ui/Panel'
import {
  ConfirmDialog,
  FormDialog,
} from '@/features/dialogs-lab/components/DialogDemos'

const accessibilityChecklist = [
  'Use the native <dialog> element — it handles focus trapping and Escape key natively.',
  'Set aria-labelledby to the dialog title and aria-describedby to the description.',
  'Return focus to the trigger element after the dialog closes.',
  'Use role="alertdialog" for destructive confirmations that require immediate attention.',
  'Ensure the backdrop prevents interaction with content behind the dialog.',
] as const

const dialogPatterns = [
  {
    title: 'Confirmation dialog',
    detail: 'Ask users to confirm a destructive action before proceeding. Show clear consequences and provide both cancel and confirm actions.',
    when: 'Deleting records, canceling in-progress work, or irreversible operations.',
  },
  {
    title: 'Form dialog',
    detail: 'Collect structured input without navigating away from the current page. Focus the first input on open.',
    when: 'Quick creation flows, editing single fields, or collecting an email address.',
  },
  {
    title: 'Non-modal dialog',
    detail: 'Use dialog.show() instead of dialog.showModal() when the dialog should not block page interaction.',
    when: 'Contextual help panels, tooltips, or side drawers.',
  },
] as const

export function DialogsLab() {
  return (
    <SectionShell
      description="Modals look simple, but getting focus trapping, scroll lock, Escape to close, backdrop clicks, and accessibility right is tricky. The native <dialog> element handles most of this for free."
      eyebrow="Foundations"
      id="dialogs-lab"
      title="Use native <dialog> for focus trapping, accessibility, and scroll lock with zero dependencies."
    >
      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <Panel className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-2">
                <Badge variant="accent">Native &lt;dialog&gt;</Badge>
                <h3 className="font-display text-2xl font-semibold text-slate-950">
                  Confirmation dialog
                </h3>
                <p className="max-w-2xl text-sm leading-6 text-slate-600">
                  Click the button to open a destructive confirmation dialog. Notice the
                  backdrop blur, focus trapping, and Escape-to-close — all from native
                  &lt;dialog&gt;.
                </p>
              </div>
              <span className="mono-chip">dialog.showModal()</span>
            </div>
            <div className="mt-5">
              <ConfirmDialog />
            </div>
          </Panel>

          <Panel className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-2">
                <Badge variant="success">Form dialog</Badge>
                <h3 className="font-display text-2xl font-semibold text-slate-950">
                  Dialog with form input
                </h3>
                <p className="max-w-2xl text-sm leading-6 text-slate-600">
                  Open the dialog to see a form inside. The first input receives focus
                  automatically. Tab cycles only within the dialog.
                </p>
              </div>
              <span className="mono-chip">autoFocus</span>
            </div>
            <div className="mt-5">
              <FormDialog />
            </div>
          </Panel>

          <Panel className="p-6">
            <div className="flex items-center gap-2 text-emerald-300">
              <SquareStack className="size-4" />
              <h3 className="font-display text-2xl font-semibold text-slate-950">
                Dialog patterns
              </h3>
            </div>
            <div className="mt-5 space-y-4">
              {dialogPatterns.map((pattern) => (
                <div
                  className="rounded-[24px] border border-slate-200/80 bg-white px-4 py-4"
                  key={pattern.title}
                >
                  <p className="text-sm font-semibold text-slate-900">{pattern.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{pattern.detail}</p>
                  <p className="mt-2 text-xs font-medium text-emerald-700">Use when: {pattern.when}</p>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel className="p-6">
            <div className="flex items-center gap-2 text-cyan-300">
              <Accessibility className="size-4" />
              <h3 className="font-display text-2xl font-semibold text-slate-950">
                Accessibility checklist
              </h3>
            </div>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              {accessibilityChecklist.map((item) => (
                <li key={item}>
                  <Focus className="mr-2 inline size-3.5 text-cyan-500" />
                  {item}
                </li>
              ))}
            </ul>
          </Panel>

          <Panel className="p-6">
            <div className="flex items-center gap-2 text-amber-300">
              <Layers className="size-4" />
              <h3 className="font-display text-2xl font-semibold text-slate-950">
                Why native &lt;dialog&gt;
              </h3>
            </div>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li><strong>Focus trap</strong> — built-in, no library needed.</li>
              <li><strong>Escape to close</strong> — fires a cancel event you can intercept.</li>
              <li><strong>Top layer</strong> — renders above everything, no z-index games.</li>
              <li><strong>Scroll lock</strong> — body scrolling is automatically blocked.</li>
              <li><strong>Backdrop</strong> — styleable via ::backdrop pseudo-element.</li>
            </ul>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Browser support is excellent — all evergreen browsers support &lt;dialog&gt;.
              For most product apps, you no longer need a dialog library.
            </p>
          </Panel>
        </div>
      </div>
    </SectionShell>
  )
}
