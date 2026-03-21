import { useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { Copy, ExternalLink, Link2 } from 'lucide-react'

import { SectionShell } from '@/components/layout/SectionShell'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Panel } from '@/components/ui/Panel'
import { FilterBar } from '@/features/url-state-lab/components/FilterBar'
import { TaskTable } from '@/features/url-state-lab/components/TaskTable'
import {
  type DemoTask,
  type SortField,
  type TaskPriority,
  type TaskStatus,
  generateTasks,
} from '@/features/url-state-lab/data/url-state-data'
import { parseSearchParams } from '@/features/url-state-lab/data/url-state-schema'

const ITEMS_PER_PAGE = 8

const allTasks = generateTasks()

const priorityWeight: Record<TaskPriority, number> = {
  low: 0,
  medium: 1,
  high: 2,
  critical: 3,
}

const statusWeight: Record<TaskStatus, number> = {
  open: 0,
  'in-progress': 1,
  done: 2,
}

function sortTasks(tasks: DemoTask[], field: SortField, dir: 'asc' | 'desc') {
  const multiplier = dir === 'asc' ? 1 : -1

  return [...tasks].sort((a, b) => {
    if (field === 'priority') {
      return (priorityWeight[a.priority] - priorityWeight[b.priority]) * multiplier
    }
    if (field === 'status') {
      return (statusWeight[a.status] - statusWeight[b.status]) * multiplier
    }
    return a.name.localeCompare(b.name) * multiplier
  })
}

const keyKnobs = [
  {
    knob: 'useSearchParams',
    detail: 'Read and write filter state directly from the URL instead of component state.',
  },
  {
    knob: 'Zod schema',
    detail: 'Parse and validate query params with safe defaults so missing or invalid values never crash the page.',
  },
  {
    knob: 'Shareable links',
    detail: 'Every filter combination produces a unique URL that can be copied and shared or bookmarked.',
  },
  {
    knob: 'Back/forward',
    detail: 'The browser history buttons work naturally because state lives in the URL, not in useState.',
  },
] as const

export function UrlStateLab() {
  const [searchParams, setSearchParams] = useSearchParams()
  const params = parseSearchParams(searchParams)

  const handleParamChange = (key: string, value: string) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)

        if (!value || value === 'all' || value === '') {
          next.delete(key)
        } else {
          next.set(key, value)
        }

        // Reset to page 1 when filters change
        if (key !== 'page') {
          next.delete('page')
        }

        return next
      },
      { replace: true },
    )
  }

  const filteredTasks = useMemo(() => {
    let result = allTasks

    if (params.q) {
      const query = params.q.toLowerCase()
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.assignee.toLowerCase().includes(query),
      )
    }

    if (params.status !== 'all') {
      result = result.filter((t) => t.status === params.status)
    }

    if (params.priority !== 'all') {
      result = result.filter((t) => t.priority === params.priority)
    }

    return sortTasks(result, params.sort, params.dir)
  }, [params.q, params.status, params.priority, params.sort, params.dir])

  const totalPages = Math.max(1, Math.ceil(filteredTasks.length / ITEMS_PER_PAGE))
  const safePage = Math.min(params.page, totalPages)
  const pagedTasks = filteredTasks.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE,
  )

  const currentUrl = window.location.href

  const handleCopyUrl = () => {
    void navigator.clipboard.writeText(currentUrl)
  }

  return (
    <SectionShell
      description="Filter state that lives in the URL survives refresh, supports sharing, and gives the browser back/forward buttons something useful to do. This route demonstrates the complete pattern."
      eyebrow="Data and State"
      id="url-state-lab"
      title="Keep filter, sort, and pagination state in the URL so it survives refresh and sharing."
    >
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <Panel className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-2">
                <Badge variant="accent">useSearchParams + Zod</Badge>
                <h3 className="font-display text-2xl font-semibold text-slate-950">
                  Filterable task table
                </h3>
                <p className="max-w-2xl text-sm leading-6 text-slate-600">
                  Every control below writes to the URL. Try filtering, then copy the URL or
                  use the back button — the state persists.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="mono-chip">useSearchParams</span>
                <span className="mono-chip">z.coerce</span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <FilterBar onParamChange={handleParamChange} params={params} />
              <TaskTable tasks={pagedTasks} />

              {totalPages > 1 && (
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm text-slate-500">
                    Showing {(safePage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(safePage * ITEMS_PER_PAGE, filteredTasks.length)} of{' '}
                    {filteredTasks.length} tasks
                  </p>
                  <div className="flex gap-2">
                    <Button
                      disabled={safePage <= 1}
                      onClick={() => handleParamChange('page', String(safePage - 1))}
                      variant="secondary"
                    >
                      Previous
                    </Button>
                    <Button
                      disabled={safePage >= totalPages}
                      onClick={() => handleParamChange('page', String(safePage + 1))}
                      variant="secondary"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Panel>

          <Panel className="p-6">
            <div className="flex items-center gap-2 text-slate-900">
              <Link2 className="size-4" />
              <h3 className="font-display text-2xl font-semibold">
                Current shareable URL
              </h3>
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-[24px] border border-slate-800/90 bg-slate-900/72 px-4 py-3">
              <code className="flex-1 truncate text-xs text-slate-300">{currentUrl}</code>
              <button
                className="shrink-0 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200"
                onClick={handleCopyUrl}
                title="Copy URL"
              >
                <Copy className="size-4" />
              </button>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Paste this URL in another tab or send it to someone — they'll see the exact
              same filtered view. That is the main win of URL state over component state.
            </p>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel className="p-6">
            <div className="flex items-center gap-2 text-emerald-300">
              <ExternalLink className="size-4" />
              <h3 className="font-display text-2xl font-semibold text-slate-950">
                Key patterns
              </h3>
            </div>
            <div className="mt-5 space-y-4">
              {keyKnobs.map((item) => (
                <div
                  className="rounded-[24px] border border-slate-200/80 bg-white px-4 py-4"
                  key={item.knob}
                >
                  <p className="text-sm font-semibold text-slate-900">{item.knob}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.detail}</p>
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="p-6">
            <h3 className="font-display text-2xl font-semibold text-slate-950">
              Common mistakes to avoid
            </h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li>Duplicating URL state into useState — pick one source of truth.</li>
              <li>Forgetting to reset pagination when filters change.</li>
              <li>Not validating params — invalid strings crash downstream logic.</li>
              <li>Using push navigation for every filter change — use replace instead.</li>
            </ul>
          </Panel>
        </div>
      </div>
    </SectionShell>
  )
}
