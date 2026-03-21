export type SortField = 'name' | 'status' | 'priority'
export type SortDir = 'asc' | 'desc'
export type TaskStatus = 'open' | 'in-progress' | 'done'
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical'

export type DemoTask = {
  id: string
  name: string
  assignee: string
  status: TaskStatus
  priority: TaskPriority
  created: string
}

export const allStatuses: TaskStatus[] = ['open', 'in-progress', 'done']
export const allPriorities: TaskPriority[] = ['low', 'medium', 'high', 'critical']

export const demoPeople = [
  'Alice Chen',
  'Bob Tanaka',
  'Carol Reyes',
  'Dan Olsen',
  'Eva Müller',
] as const

export function generateTasks(): DemoTask[] {
  const tasks: DemoTask[] = []

  const names = [
    'Audit SVG asset pipeline',
    'Migrate user settings to URL params',
    'Fix layout shift on product gallery',
    'Add error boundary to checkout',
    'Profile render performance on dashboard',
    'Implement toast notification system',
    'Add focus trap to confirmation dialog',
    'Debounce autocomplete API calls',
    'Add role guard to admin routes',
    'Lazy-load analytics bundle',
    'Virtualize transaction list',
    'Set up Vitest for form components',
    'Replace PNG hero with responsive WebP',
    'Optimize query cache invalidation',
    'Add multi-step onboarding form',
    'Build protected route wrapper',
    'Throttle window resize handler',
    'Add undo support to bulk delete',
    'Test optimistic toggle rollback',
    'Document env variable conventions',
  ]

  const statuses: TaskStatus[] = ['open', 'in-progress', 'done']
  const priorities: TaskPriority[] = ['low', 'medium', 'high', 'critical']

  for (let i = 0; i < names.length; i++) {
    tasks.push({
      id: `task-${i + 1}`,
      name: names[i],
      assignee: demoPeople[i % demoPeople.length],
      status: statuses[i % statuses.length],
      priority: priorities[i % priorities.length],
      created: new Date(2026, 2, 1 + i).toISOString(),
    })
  }

  return tasks
}

export const statusLabels: Record<TaskStatus, string> = {
  open: 'Open',
  'in-progress': 'In Progress',
  done: 'Done',
}

export const priorityLabels: Record<TaskPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
}

export const priorityTone: Record<TaskPriority, string> = {
  low: 'border-slate-300/80 bg-slate-50 text-slate-700',
  medium: 'border-blue-300/80 bg-blue-50 text-blue-800',
  high: 'border-amber-300/80 bg-amber-50 text-amber-800',
  critical: 'border-rose-300/80 bg-rose-50 text-rose-800',
}

export const statusTone: Record<TaskStatus, string> = {
  open: 'border-cyan-300/80 bg-cyan-50 text-cyan-800',
  'in-progress': 'border-amber-300/80 bg-amber-50 text-amber-800',
  done: 'border-emerald-300/80 bg-emerald-50 text-emerald-800',
}
