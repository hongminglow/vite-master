import { useState } from 'react'
import { Image, Palette, ScanSearch } from 'lucide-react'

import { SectionShell } from '@/components/layout/SectionShell'
import { Badge } from '@/components/ui/Badge'
import { Panel } from '@/components/ui/Panel'
import stackSvgUrl from '@/assets/icons/package-stack.svg'
import FlaskIcon from '@/assets/icons/current-color-flask.svg?react'
import { cn } from '@/lib/cn'
import { svgApproaches } from '@/data/site'

const swatches = [
  { label: 'Ocean', value: '#2563eb' },
  { label: 'Amber', value: '#f59e0b' },
  { label: 'Rose', value: '#e11d48' },
  { label: 'Ink', value: '#0f172a' },
] as const

const sizeMap = {
  Compact: 'size-14',
  Comfortable: 'size-20',
  Large: 'size-24',
} as const

export function SvgLab() {
  const [activeColor, setActiveColor] = useState<(typeof swatches)[number]>(
    swatches[0],
  )
  const [activeSize, setActiveSize] =
    useState<keyof typeof sizeMap>('Comfortable')

  return (
    <SectionShell
      description="SVGs are one of the most repeated frontend chores: exporting them, cleaning them, resizing them, and making them themeable. This lab shows the practical split between keeping an SVG as a file and turning it into a React component."
      eyebrow="SVG Pipeline"
      id="svg-lab"
      title="Use files for static art, use SVGR for themeable UI icons."
    >
      <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <Panel className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <Badge variant="accent">Interactive comparison</Badge>
              <h3 className="font-display text-2xl font-semibold text-slate-950">
                CurrentColor makes SVG theming simple
              </h3>
              <p className="max-w-xl text-sm leading-6 text-slate-600">
                The left example is imported with SVGR and uses
                <code className="mx-1 rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-800">
                  currentColor
                </code>
                so color and size come from CSS. The right example is a plain
                asset URL, which is better when you only need to display the
                artwork as-is.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="mono-chip">?react import</span>
              <span className="mono-chip">SVGO first</span>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-[28px] bg-slate-950 p-5 text-white">
              <div className="flex items-center gap-2 text-amber-300">
                <Palette className="size-4" />
                <p className="text-sm font-semibold">SVGR component</p>
              </div>
              <div className="mt-4 flex min-h-56 items-center justify-center rounded-[24px] border border-white/10 bg-white/10">
                <FlaskIcon
                  className={cn(sizeMap[activeSize], 'transition-all duration-200')}
                  style={{ color: activeColor.value }}
                  title="Themeable React SVG icon"
                />
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                This is ideal for buttons, toggles, status icons, and any
                illustration that needs hover, theme, or status-based styling.
              </p>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center gap-2 text-slate-700">
                <Image className="size-4" />
                <p className="text-sm font-semibold">Static asset URL</p>
              </div>
              <div className="mt-4 flex min-h-56 items-center justify-center rounded-[24px] border border-slate-200 bg-white">
                <img
                  alt="Static package stack illustration"
                  className="h-28 w-28"
                  src={stackSvgUrl}
                />
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                This is a good fit for logos or decorative SVGs where you do not
                need runtime styling control.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Recolor the component
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                {swatches.map((swatch) => (
                  <button
                    aria-pressed={activeColor.label === swatch.label}
                    className={cn(
                      'rounded-full border px-3 py-2 text-sm font-medium transition-colors duration-200',
                      activeColor.label === swatch.label
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
                    )}
                    key={swatch.label}
                    onClick={() => setActiveColor(swatch)}
                    type="button"
                  >
                    <span
                      className="mr-2 inline-block size-2.5 rounded-full"
                      style={{ backgroundColor: swatch.value }}
                    />
                    {swatch.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900">Resize it</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {Object.keys(sizeMap).map((label) => (
                  <button
                    aria-pressed={activeSize === label}
                    className={cn(
                      'rounded-full border px-3 py-2 text-sm font-medium transition-colors duration-200',
                      activeSize === label
                        ? 'border-amber-300 bg-amber-50 text-amber-900'
                        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
                    )}
                    key={label}
                    onClick={() => setActiveSize(label as keyof typeof sizeMap)}
                    type="button"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-[28px] bg-slate-950 px-4 py-4 font-mono text-xs leading-6 text-slate-100">
            <div>import FlaskIcon from '@/assets/icons/current-color-flask.svg?react'</div>
            <div>{'<FlaskIcon className="size-14 text-amber-500" />'}</div>
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel className="p-6">
            <div className="flex items-center gap-2 text-slate-900">
              <ScanSearch className="size-4" />
              <h3 className="font-display text-2xl font-semibold">
                Pick the right SVG approach
              </h3>
            </div>

            <div className="mt-5 space-y-4">
              {svgApproaches.map((approach) => (
                <div
                  className="rounded-[24px] border border-slate-200/80 bg-slate-50/80 px-4 py-4"
                  key={approach.title}
                >
                  <p className="text-sm font-semibold text-slate-900">
                    {approach.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {approach.when}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Watch for: {approach.caution}
                  </p>
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="p-6">
            <h3 className="font-display text-2xl font-semibold text-slate-950">
              Practical SVG checklist
            </h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li>Export the cleanest possible shape from Figma or Illustrator first.</li>
              <li>Run the file through SVGOMG or the local SVGO script before importing it.</li>
              <li>Preserve the viewBox so resizing stays reliable.</li>
              <li>Replace hard-coded fills with currentColor for themeable UI icons.</li>
              <li>Keep static artwork as a file URL when React logic does not need it.</li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="mono-chip">bun run svg:optimize</span>
              <span className="mono-chip">SVGOMG</span>
              <span className="mono-chip">SVGR playground</span>
            </div>
          </Panel>
        </div>
      </div>
    </SectionShell>
  )
}
