import { cn } from '@/lib/cn'

export type TimingEvent = {
  id: string
  label: string
  timestamp: number
  strategy: 'raw' | 'debounced' | 'deferred' | 'throttled'
}

type TimelineProps = {
  events: TimingEvent[]
}

const strategyColor: Record<TimingEvent['strategy'], string> = {
  raw: 'bg-rose-400',
  debounced: 'bg-emerald-400',
  deferred: 'bg-cyan-400',
  throttled: 'bg-amber-400',
}

const strategyBorder: Record<TimingEvent['strategy'], string> = {
  raw: 'border-rose-500/30 text-rose-200',
  debounced: 'border-emerald-500/30 text-emerald-200',
  deferred: 'border-cyan-500/30 text-cyan-200',
  throttled: 'border-amber-500/30 text-amber-200',
}

export function TimingTimeline({ events }: TimelineProps) {
  const visible = events.slice(0, 20)

  return (
    <div className="space-y-1.5">
      {visible.length === 0 && (
        <p className="py-4 text-center text-sm text-slate-500">
          Start typing above to see events appear here.
        </p>
      )}
      {visible.map((event) => (
        <div
          className={cn(
            'flex items-center gap-3 rounded-xl border px-3 py-1.5 text-xs',
            strategyBorder[event.strategy],
          )}
          key={event.id}
        >
          <span className={cn('size-2 shrink-0 rounded-full', strategyColor[event.strategy])} />
          <span className="font-mono">{new Date(event.timestamp).toLocaleTimeString('en', { hour12: false, fractionalSecondDigits: 2 })}</span>
          <span className="truncate font-medium">{event.label}</span>
          <span className="ml-auto shrink-0 rounded-full border border-inherit px-2 py-0.5">
            {event.strategy}
          </span>
        </div>
      ))}
    </div>
  )
}
