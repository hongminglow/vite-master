import { wait } from '@/lib/wait'

export type WorkItem = {
  id: string
  title: string
  team: string
  completed: boolean
  updatedAt: string
}

let workItems: WorkItem[] = [
  {
    id: 'work-item-1',
    title: 'Approve the new SVG cleanup checklist',
    team: 'Design systems',
    completed: true,
    updatedAt: new Date('2026-03-18T08:20:00.000Z').toISOString(),
  },
  {
    id: 'work-item-2',
    title: 'Ship route-level splitting for the reporting area',
    team: 'Platform',
    completed: false,
    updatedAt: new Date('2026-03-18T09:05:00.000Z').toISOString(),
  },
  {
    id: 'work-item-3',
    title: 'Clean up field-array validation edge cases',
    team: 'Checkout',
    completed: false,
    updatedAt: new Date('2026-03-18T09:40:00.000Z').toISOString(),
  },
  {
    id: 'work-item-4',
    title: 'Review the analyzer report after adding virtual lists',
    team: 'Frontend guild',
    completed: false,
    updatedAt: new Date('2026-03-18T10:10:00.000Z').toISOString(),
  },
]

export async function fetchWorkItems() {
  await wait(500)

  return workItems.map((item) => ({ ...item }))
}

export async function createWorkItem(title: string, shouldFail = false) {
  await wait(700)

  if (shouldFail) {
    throw new Error('The server rejected the new work item. Rollback restored the previous cache snapshot.')
  }

  const nextItem = {
    id: `work-item-${crypto.randomUUID()}`,
    title,
    team: 'Ops workflow',
    completed: false,
    updatedAt: new Date().toISOString(),
  } satisfies WorkItem

  workItems = [nextItem, ...workItems]

  return { ...nextItem }
}

export async function toggleWorkItem(id: string, shouldFail = false) {
  await wait(500)

  if (shouldFail) {
    throw new Error('The toggle failed on the server, so the optimistic state was rolled back.')
  }

  let updatedItem: WorkItem | undefined

  workItems = workItems.map((item) => {
    if (item.id !== id) {
      return item
    }

    updatedItem = {
      ...item,
      completed: !item.completed,
      updatedAt: new Date().toISOString(),
    }

    return updatedItem
  })

  if (!updatedItem) {
    throw new Error('The target work item no longer exists.')
  }

  return { ...updatedItem }
}
