import {
  type DemoTask,
  priorityLabels,
  priorityTone,
  statusLabels,
  statusTone,
} from '@/features/url-state-lab/data/url-state-data'

type TaskTableProps = {
  tasks: DemoTask[]
}

export function TaskTable({ tasks }: TaskTableProps) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-[24px] border border-slate-800/90 bg-slate-900/72 px-6 py-10 text-center text-sm text-slate-400">
        No tasks match your current filters. Try adjusting the search or filters above.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-[24px] border border-slate-200/80">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200/80 bg-slate-50/80">
            <th className="px-4 py-3 text-left font-medium text-slate-600">Task</th>
            <th className="px-4 py-3 text-left font-medium text-slate-600">Assignee</th>
            <th className="px-4 py-3 text-left font-medium text-slate-600">Status</th>
            <th className="px-4 py-3 text-left font-medium text-slate-600">Priority</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr
              className="border-b border-slate-100 last:border-0 transition-colors hover:bg-slate-50/50"
              key={task.id}
            >
              <td className="px-4 py-3 font-medium text-slate-900">{task.name}</td>
              <td className="px-4 py-3 text-slate-600">{task.assignee}</td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusTone[task.status]}`}
                >
                  {statusLabels[task.status]}
                </span>
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${priorityTone[task.priority]}`}
                >
                  {priorityLabels[task.priority]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
