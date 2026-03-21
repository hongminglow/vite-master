import { useDeferredValue, useState } from 'react'
import { Clock3, Gauge, Hourglass, Timer } from 'lucide-react'

import { SectionShell } from '@/components/layout/SectionShell'
import { Badge } from '@/components/ui/Badge'
import { Panel } from '@/components/ui/Panel'
import {
  TimingTimeline,
  type TimingEvent,
} from '@/features/input-timing-lab/components/TimingTimeline'
import { useDebouncedValue } from '@/features/input-timing-lab/hooks/use-timing'

function makeEvent(
  label: string,
  strategy: TimingEvent['strategy'],
): TimingEvent {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    label,
    strategy,
    timestamp: Date.now(),
  }
}

const strategyComparison = [
  {
    name: 'Raw (no delay)',
    icon: Timer,
    when: 'Local-only state where instant feedback matters and there is no downstream cost.',
    risk: 'Fires on every keystroke — expensive if it triggers API calls or heavy computation.',
    color: 'text-rose-400',
  },
  {
    name: 'Debounce',
    icon: Hourglass,
    when: 'API search, form auto-save, or analytics events where you only care about the final value.',
    risk: 'Adds perceived latency. Choose a short delay (200–400ms) for search, longer for saves.',
    color: 'text-emerald-400',
  },
  {
    name: 'useDeferredValue',
    icon: Gauge,
    when: 'Expensive derived rendering (large lists, charts) where the input must stay responsive.',
    risk: 'React-only — does not prevent API calls. Use debounce for network, deferred for rendering.',
    color: 'text-cyan-400',
  },
  {
    name: 'Throttle',
    icon: Clock3,
    when: 'Scroll, resize, or drag handlers where you need regular updates but not every frame.',
    risk: 'Can feel less responsive than debounce for typing. Best for continuous physical interactions.',
    color: 'text-amber-400',
  },
] as const

export function InputTimingLab() {
  const [rawInput, setRawInput] = useState('')
  const [events, setEvents] = useState<TimingEvent[]>([])

  const debouncedInput = useDebouncedValue(rawInput, 350)
  const deferredInput = useDeferredValue(rawInput)

  const addEvent = (label: string, strategy: TimingEvent['strategy']) => {
    setEvents((prev) => [makeEvent(label, strategy), ...prev].slice(0, 30))
  }

  const handleInputChange = (value: string) => {
    setRawInput(value)
    addEvent(`"${value.slice(-12)}"`, 'raw')
  }

  // Track debounced fires
  const [prevDebounced, setPrevDebounced] = useState('')
  if (debouncedInput !== prevDebounced) {
    setPrevDebounced(debouncedInput)
    if (debouncedInput) {
      addEvent(`debounced → "${debouncedInput.slice(-12)}"`, 'debounced')
    }
  }

  // Track deferred fires
  const [prevDeferred, setPrevDeferred] = useState('')
  if (deferredInput !== prevDeferred) {
    setPrevDeferred(deferredInput)
    if (deferredInput) {
      addEvent(`deferred → "${deferredInput.slice(-12)}"`, 'deferred')
    }
  }

  return (
    <SectionShell
      description="Search inputs, scroll handlers, and resize listeners all need timing control. This section compares debounce, throttle, and React's useDeferredValue side by side so you can pick the right tool for each job."
      eyebrow="Performance"
      id="input-timing-lab"
      title="Debounce expensive work, throttle continuous events, and defer heavy renders."
    >
      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <Panel className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-2">
                <Badge variant="accent">Live comparison</Badge>
                <h3 className="font-display text-2xl font-semibold text-slate-950">
                  Type and watch the timeline
                </h3>
                <p className="max-w-2xl text-sm leading-6 text-slate-600">
                  Type in the input below. Raw events fire on every keystroke. Debounced
                  events fire after a 350ms pause. Deferred events fire when React
                  can schedule the low-priority update.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="mono-chip">useDebouncedValue</span>
                <span className="mono-chip">useDeferredValue</span>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <input
                className="w-full rounded-xl border border-slate-700/90 bg-slate-900/72 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30"
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Type anything to compare timing strategies..."
                value={rawInput}
              />

              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-[24px] border border-rose-500/20 bg-rose-500/5 px-4 py-3">
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-rose-400">Raw</p>
                  <p className="mt-2 truncate text-sm text-slate-100">{rawInput || '—'}</p>
                </div>
                <div className="rounded-[24px] border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-emerald-400">Debounced (350ms)</p>
                  <p className="mt-2 truncate text-sm text-slate-100">{debouncedInput || '—'}</p>
                </div>
                <div className="rounded-[24px] border border-cyan-500/20 bg-cyan-500/5 px-4 py-3">
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-cyan-400">Deferred</p>
                  <p className="mt-2 truncate text-sm text-slate-100">{deferredInput || '—'}</p>
                </div>
              </div>
            </div>
          </Panel>

          <Panel className="p-6">
            <h3 className="font-display text-2xl font-semibold text-slate-950">
              Event timeline
            </h3>
            <div className="mt-4 max-h-[320px] overflow-y-auto">
              <TimingTimeline events={events} />
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel className="p-6">
            <h3 className="font-display text-2xl font-semibold text-slate-950">
              When to use which strategy
            </h3>
            <div className="mt-5 space-y-4">
              {strategyComparison.map((strategy) => {
                const Icon = strategy.icon
                return (
                  <div
                    className="rounded-[24px] border border-slate-200/80 bg-white px-4 py-4"
                    key={strategy.name}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className={`size-4 ${strategy.color}`} />
                      <p className="text-sm font-semibold text-slate-900">{strategy.name}</p>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      <strong className="font-medium text-slate-800">Use when:</strong> {strategy.when}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      <strong className="font-medium text-slate-800">Watch out:</strong> {strategy.risk}
                    </p>
                  </div>
                )
              })}
            </div>
          </Panel>

          <Panel className="p-6">
            <h3 className="font-display text-2xl font-semibold text-slate-950">
              Implementation checklist
            </h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li>Always clean up timers in useEffect return — stale closures cause subtle bugs.</li>
              <li>Combine debounce with AbortController when the debounced action is an API call.</li>
              <li>Use useDeferredValue for rendering cost, debounce for network cost — they solve different problems.</li>
              <li>Choose delay based on the task: 200–400ms for search, 500–1000ms for auto-save, 100–200ms for scroll throttle.</li>
            </ul>
          </Panel>
        </div>
      </div>
    </SectionShell>
  )
}
