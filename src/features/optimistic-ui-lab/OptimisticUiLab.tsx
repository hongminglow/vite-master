import { useState, type FormEvent } from 'react'
import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryKey,
} from '@tanstack/react-query'
import { Bolt, CheckCircle2, RefreshCcw, ShieldAlert } from 'lucide-react'

import { SectionShell } from '@/components/layout/SectionShell'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Panel } from '@/components/ui/Panel'
import { formatClock } from '@/lib/format'
import {
  createWorkItem,
  fetchWorkItems,
  toggleWorkItem,
  type WorkItem,
} from '@/features/optimistic-ui-lab/api/work-items'
import { cn } from '@/lib/cn'

type WorkItemViewModel = WorkItem & {
  optimistic?: boolean
  pending?: boolean
}

type MutationLog = {
  id: string
  tone: 'info' | 'success' | 'error'
  message: string
}

const workItemsQueryKey = ['optimistic-work-items'] satisfies QueryKey

const mutationSteps = [
  'Cancel the in-flight query so a refetch does not overwrite the optimistic state mid-mutation.',
  'Snapshot the previous cache value before making the optimistic change.',
  'Update the cache immediately so the UI responds right away.',
  'Rollback on error, then invalidate on settle so the server remains source of truth.',
] as const

function buildLogEntry(tone: MutationLog['tone'], message: string): MutationLog {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    tone,
    message,
  }
}

export function OptimisticUiLab() {
  const queryClient = useQueryClient()
  const [draftTitle, setDraftTitle] = useState('Flag the next bundle delta for review')
  const [failNextAdd, setFailNextAdd] = useState(false)
  const [failNextToggle, setFailNextToggle] = useState(false)
  const [mutationLog, setMutationLog] = useState<MutationLog[]>([
    buildLogEntry('info', 'Try a toggle or create action to watch the optimistic flow.'),
  ])

  const { data: workItems = [], isLoading } = useQuery<WorkItemViewModel[]>({
    queryKey: workItemsQueryKey,
    queryFn: fetchWorkItems,
  })

  const appendLog = (tone: MutationLog['tone'], message: string) => {
    setMutationLog((current) => [buildLogEntry(tone, message), ...current].slice(0, 6))
  }

  const addMutation = useMutation({
    mutationFn: async ({
      title,
      shouldFail,
    }: {
      title: string
      shouldFail: boolean
    }) => createWorkItem(title, shouldFail),
    onMutate: async ({ title }) => {
      await queryClient.cancelQueries({ queryKey: workItemsQueryKey })
      const previousItems =
        queryClient.getQueryData<WorkItemViewModel[]>(workItemsQueryKey) ?? []
      const optimisticItem: WorkItemViewModel = {
        id: `optimistic-add-${Date.now()}`,
        title,
        team: 'Ops workflow',
        completed: false,
        updatedAt: new Date().toISOString(),
        optimistic: true,
        pending: true,
      }

      queryClient.setQueryData<WorkItemViewModel[]>(workItemsQueryKey, [
        optimisticItem,
        ...previousItems,
      ])
      appendLog('info', `Added "${title}" optimistically before the server answered.`)

      return { previousItems, optimisticId: optimisticItem.id }
    },
    onError: (error, _variables, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData(workItemsQueryKey, context.previousItems)
      }

      appendLog('error', error instanceof Error ? error.message : 'Add mutation failed.')
    },
    onSuccess: (savedItem, _variables, context) => {
      queryClient.setQueryData<WorkItemViewModel[]>(workItemsQueryKey, (current = []) =>
        current.map((item) =>
          item.id === context?.optimisticId ? { ...savedItem } : item,
        ),
      )
      appendLog('success', `Server confirmed "${savedItem.title}".`)
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: workItemsQueryKey })
    },
  })

  const toggleMutation = useMutation({
    mutationFn: async ({
      id,
      shouldFail,
    }: {
      id: string
      shouldFail: boolean
    }) => toggleWorkItem(id, shouldFail),
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: workItemsQueryKey })
      const previousItems =
        queryClient.getQueryData<WorkItemViewModel[]>(workItemsQueryKey) ?? []

      queryClient.setQueryData<WorkItemViewModel[]>(workItemsQueryKey, (current = []) =>
        current.map((item) =>
          item.id === id
            ? {
                ...item,
                completed: !item.completed,
                pending: true,
                optimistic: true,
                updatedAt: new Date().toISOString(),
              }
            : item,
        ),
      )

      const toggledItem = previousItems.find((item) => item.id === id)
      appendLog(
        'info',
        `Optimistically ${toggledItem?.completed ? 'reopened' : 'completed'} "${toggledItem?.title ?? 'task'}".`,
      )

      return { previousItems }
    },
    onError: (error, _variables, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData(workItemsQueryKey, context.previousItems)
      }

      appendLog('error', error instanceof Error ? error.message : 'Toggle mutation failed.')
    },
    onSuccess: (savedItem) => {
      queryClient.setQueryData<WorkItemViewModel[]>(workItemsQueryKey, (current = []) =>
        current.map((item) =>
          item.id === savedItem.id ? { ...savedItem } : item,
        ),
      )
      appendLog(
        'success',
        `"${savedItem.title}" is now ${savedItem.completed ? 'complete' : 'open'} on the server too.`,
      )
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: workItemsQueryKey })
    },
  })

  const handleCreate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedTitle = draftTitle.trim()

    if (!trimmedTitle) {
      return
    }

    addMutation.mutate({ title: trimmedTitle, shouldFail: failNextAdd })
    setDraftTitle('')
    setFailNextAdd(false)
  }

  const handleToggle = (item: WorkItemViewModel) => {
    toggleMutation.mutate({ id: item.id, shouldFail: failNextToggle })
    setFailNextToggle(false)
  }

  return (
    <SectionShell
      description="Optimistic UI is one of the easiest ways to make a React app feel faster, but only if rollback is handled cleanly and the server still wins in the end."
      eyebrow="Data and State"
      id="optimistic-ui-lab"
      title="Make simple mutations feel instant by updating the cache first, then rolling back safely on failure."
    >
      <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="space-y-6">
          <Panel className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-2">
                <Badge variant="success">Cache-first mutations</Badge>
                <h3 className="font-display text-2xl font-semibold text-slate-950">
                  Try optimistic create and toggle flows
                </h3>
                <p className="max-w-2xl text-sm leading-6 text-slate-600">
                  The UI updates immediately, keeps a snapshot for rollback, and
                  still invalidates after settle so the real server state stays in
                  charge. Use the failure toggles to watch rollback happen on purpose.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="mono-chip">queryClient.setQueryData</span>
                <span className="mono-chip">onMutate rollback</span>
              </div>
            </div>

            <form className="mt-6 space-y-4" onSubmit={handleCreate}>
              <label className="block rounded-[24px] border border-slate-800/90 bg-slate-900/72 px-4 py-3">
                <span className="text-sm font-medium text-slate-400">Create a work item</span>
                <input
                  className="mt-3 w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
                  onChange={(event) => setDraftTitle(event.target.value)}
                  placeholder="Write a quick mutation demo task..."
                  value={draftTitle}
                />
              </label>

              <div className="flex flex-wrap items-center gap-3">
                <Button type="submit">Create optimistically</Button>
                <Button
                  aria-pressed={failNextAdd}
                  onClick={() => setFailNextAdd((current) => !current)}
                  variant={failNextAdd ? 'primary' : 'secondary'}
                >
                  {failNextAdd ? 'Will fail next add' : 'Simulate add failure'}
                </Button>
                <Button
                  aria-pressed={failNextToggle}
                  onClick={() => setFailNextToggle((current) => !current)}
                  variant={failNextToggle ? 'primary' : 'secondary'}
                >
                  {failNextToggle ? 'Will fail next toggle' : 'Simulate toggle failure'}
                </Button>
              </div>
            </form>

            <div className="mt-6 space-y-3">
              {isLoading ? (
                <div className="rounded-[24px] border border-slate-800/90 bg-slate-900/72 px-4 py-6 text-sm text-slate-300">
                  Loading work items...
                </div>
              ) : null}

              {workItems.map((item) => (
                <div
                  className={cn(
                    'rounded-[24px] border px-4 py-4 transition-colors duration-200',
                    item.completed
                      ? 'border-emerald-500/22 bg-emerald-500/10'
                      : 'border-slate-800/90 bg-slate-900/72',
                  )}
                  key={item.id}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-display text-xl font-semibold text-slate-950">
                          {item.title}
                        </p>
                        {item.pending ? <Badge variant="accent">Pending</Badge> : null}
                        {item.optimistic ? <Badge variant="neutral">Optimistic</Badge> : null}
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {item.team} • updated {formatClock(item.updatedAt)}
                      </p>
                    </div>

                    <Button
                      disabled={toggleMutation.isPending || addMutation.isPending}
                      onClick={() => handleToggle(item)}
                      variant={item.completed ? 'secondary' : 'primary'}
                    >
                      {item.completed ? 'Reopen' : 'Mark complete'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel className="p-6">
            <div className="flex items-center gap-2 text-emerald-300">
              <Bolt className="size-4" />
              <h3 className="font-display text-2xl font-semibold text-slate-950">
                Why this helps
              </h3>
            </div>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
              <li>Common toggles and short forms feel immediate instead of network-bound.</li>
              <li>The rollback snapshot protects honesty when a request fails.</li>
              <li>Invalidate-on-settle keeps the server as the final source of truth.</li>
              <li>TanStack Query keeps the mutation logic close to the cache instead of scattered across components.</li>
            </ul>
          </Panel>

          <Panel className="p-6">
            <div className="flex items-center gap-2 text-amber-300">
              <RefreshCcw className="size-4" />
              <h3 className="font-display text-2xl font-semibold text-slate-950">
                Mutation timeline
              </h3>
            </div>
            <ol className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
              {mutationSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </Panel>

          <Panel className="p-6">
            <div className="flex items-center gap-2 text-rose-300">
              <ShieldAlert className="size-4" />
              <h3 className="font-display text-2xl font-semibold text-slate-950">
                Recent mutation log
              </h3>
            </div>
            <div className="mt-5 space-y-3">
              {mutationLog.map((entry) => (
                <div
                  className={cn(
                    'rounded-[24px] border px-4 py-4 text-sm leading-6',
                    entry.tone === 'info' && 'border-cyan-500/22 bg-cyan-500/10 text-cyan-100',
                    entry.tone === 'success' &&
                      'border-emerald-500/22 bg-emerald-500/10 text-emerald-100',
                    entry.tone === 'error' && 'border-rose-500/22 bg-rose-500/10 text-rose-100',
                  )}
                  key={entry.id}
                >
                  {entry.tone === 'success' ? (
                    <CheckCircle2 className="mb-2 size-4" />
                  ) : null}
                  {entry.message}
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </SectionShell>
  )
}
