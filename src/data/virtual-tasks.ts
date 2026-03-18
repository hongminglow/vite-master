export type VirtualTaskTrack =
  | 'routing'
  | 'forms'
  | 'server-state'
  | 'assets'
  | 'performance'
  | 'tooling'

export type VirtualTask = {
  id: string
  title: string
  track: VirtualTaskTrack
  owner: string
  urgency: 'routine' | 'watch' | 'spike'
  recommendation: string
  painPoint: string
  searchText: string
}

const seedTasks = [
  {
    title: 'Route-level code splitting',
    track: 'routing',
    owner: 'Shell team',
    urgency: 'watch',
    painPoint: 'Every user downloads admin and lab screens even when they never visit them.',
    recommendation: 'Split by route first and group optional features behind lazy imports.',
  },
  {
    title: 'Search params for filters',
    track: 'routing',
    owner: 'Product team',
    urgency: 'routine',
    painPoint: 'Table filters disappear after refresh or cannot be shared with QA.',
    recommendation: 'Mirror stable filter state into the URL so the view can be refreshed and shared.',
  },
  {
    title: 'SVG recoloring',
    track: 'assets',
    owner: 'Design system',
    urgency: 'routine',
    painPoint: 'Icons arrive with hard-coded fills and do not follow dark mode or status color.',
    recommendation: 'Normalize fills to currentColor and import with SVGR when the icon needs runtime styling.',
  },
  {
    title: 'Responsive image assets',
    track: 'assets',
    owner: 'Marketing UI',
    urgency: 'watch',
    painPoint: 'Hero artwork is large and ships the same asset to every breakpoint.',
    recommendation: 'Use responsive source sets and modern formats before reaching for another image library.',
  },
  {
    title: 'Schema-backed form validation',
    track: 'forms',
    owner: 'Checkout',
    urgency: 'routine',
    painPoint: 'Validation rules drift between the inputs, the submit handler, and backend expectations.',
    recommendation: 'Keep one schema and plug it into the form layer so errors stay consistent.',
  },
  {
    title: 'Multi-step forms',
    track: 'forms',
    owner: 'Onboarding',
    urgency: 'watch',
    painPoint: 'Users need progress saving, step validation, and smarter default values.',
    recommendation: 'Use one form state with clearly scoped step validation instead of isolated mini forms.',
  },
  {
    title: 'Cache invalidation',
    track: 'server-state',
    owner: 'Dashboard',
    urgency: 'watch',
    painPoint: 'Data mutates but the UI still shows stale lists until the page is reloaded.',
    recommendation: 'Invalidate the exact query keys that own the stale data after a mutation settles.',
  },
  {
    title: 'Optimistic updates',
    track: 'server-state',
    owner: 'Ops workflow',
    urgency: 'routine',
    painPoint: 'Simple toggles feel sluggish because the interface waits for the network before moving.',
    recommendation: 'Apply the local cache update first, keep a rollback snapshot, and reconcile after the response.',
  },
  {
    title: 'Deferred search',
    track: 'performance',
    owner: 'Catalog view',
    urgency: 'routine',
    painPoint: 'Typing into big search views lags while results and highlighting recalculate.',
    recommendation: 'Use deferred values so keystrokes stay urgent while heavy result rendering catches up.',
  },
  {
    title: 'Virtualized tables',
    track: 'performance',
    owner: 'Admin',
    urgency: 'spike',
    painPoint: 'The DOM balloons when long tables render every row and nested action cell at once.',
    recommendation: 'Virtualize the rows only when the collection is truly large and row height is predictable enough.',
  },
  {
    title: 'Bundle inspection',
    track: 'tooling',
    owner: 'Platform',
    urgency: 'watch',
    painPoint: 'A seemingly small dependency causes a noticeable increase in the shipped bundle.',
    recommendation: 'Run the analyzer report before and after adding the package, then compare parsed and gzip cost.',
  },
  {
    title: 'Slow typed lint',
    track: 'tooling',
    owner: 'Platform',
    urgency: 'routine',
    painPoint: 'Developers stop running lint locally because the typed path feels too slow.',
    recommendation: 'Keep a cached fast lint command for everyday work and a separate typed path for deeper checks.',
  },
] as const

const owners = ['Frontend guild', 'Growth squad', 'Ops UI', 'Design systems', 'Platform']

export function buildVirtualTasks(repeats = 220) {
  return Array.from({ length: repeats }, (_, repeatIndex) =>
    seedTasks.map((task, taskIndex) => {
      const ownerIndex = (repeatIndex + taskIndex) % owners.length
      const idBase = task.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')

      return {
        id: `${idBase}-${repeatIndex}-${taskIndex}`,
        title: task.title,
        track: task.track,
        owner: owners[ownerIndex] ?? task.owner,
        urgency: task.urgency,
        recommendation: task.recommendation,
        painPoint: task.painPoint,
        searchText: [
          task.title,
          task.track,
          task.owner,
          owners[ownerIndex],
          task.urgency,
          task.painPoint,
          task.recommendation,
          `batch ${repeatIndex + 1}`,
        ]
          .join(' ')
          .toLowerCase(),
      } satisfies VirtualTask
    }),
  ).flat()
}
