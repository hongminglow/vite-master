import type { UrlStateParams } from '@/features/url-state-lab/data/url-state-schema'
import { cn } from '@/lib/cn'

type FilterBarProps = {
  params: UrlStateParams
  onParamChange: (key: string, value: string) => void
}

const statusOptions = [
  { value: 'all', label: 'All statuses' },
  { value: 'open', label: 'Open' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
] as const

const priorityOptions = [
  { value: 'all', label: 'All priorities' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'critical', label: 'Critical' },
] as const

const sortOptions = [
  { value: 'name', label: 'Name' },
  { value: 'status', label: 'Status' },
  { value: 'priority', label: 'Priority' },
] as const

const selectClasses =
  'rounded-xl border border-slate-700/90 bg-slate-900/72 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30'

export function FilterBar({ params, onParamChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <input
        className="min-w-[200px] flex-1 rounded-xl border border-slate-700/90 bg-slate-900/72 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30"
        onChange={(e) => onParamChange('q', e.target.value)}
        placeholder="Search tasks..."
        type="text"
        value={params.q}
      />

      <select
        className={selectClasses}
        onChange={(e) => onParamChange('status', e.target.value)}
        value={params.status}
      >
        {statusOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      <select
        className={selectClasses}
        onChange={(e) => onParamChange('priority', e.target.value)}
        value={params.priority}
      >
        {priorityOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      <select
        className={selectClasses}
        onChange={(e) => onParamChange('sort', e.target.value)}
        value={params.sort}
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      <button
        className={cn(
          'rounded-xl border px-3 py-2 text-sm font-medium transition-colors duration-200',
          params.dir === 'asc'
            ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
            : 'border-amber-500/30 bg-amber-500/10 text-amber-200',
        )}
        onClick={() => onParamChange('dir', params.dir === 'asc' ? 'desc' : 'asc')}
      >
        {params.dir === 'asc' ? '↑ Ascending' : '↓ Descending'}
      </button>
    </div>
  )
}
