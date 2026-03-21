import { useState } from 'react'

import { Button } from '@/components/ui/Button'
import { Dialog } from '@/features/dialogs-lab/components/Dialog'

export function ConfirmDialog() {
  const [open, setOpen] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleConfirm = () => {
    setResult('Confirmed — the destructive action would execute here.')
    setOpen(false)
  }

  return (
    <div className="space-y-3">
      <Button onClick={() => setOpen(true)} variant="secondary">
        Open confirmation dialog
      </Button>

      {result && (
        <p className="text-sm text-emerald-600">{result}</p>
      )}

      <Dialog
        description="This action cannot be undone. The item will be permanently removed from the system."
        onClose={() => setOpen(false)}
        open={open}
        title="Delete this item?"
      >
        <div className="flex justify-end gap-3">
          <Button onClick={() => setOpen(false)} variant="ghost">
            Cancel
          </Button>
          <Button
            className="bg-rose-500 text-white shadow-rose-500/30 hover:bg-rose-400"
            onClick={handleConfirm}
          >
            Yes, delete
          </Button>
        </div>
      </Dialog>
    </div>
  )
}

export function FormDialog() {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = data.get('name') as string
    setSubmitted(`Submitted: ${name}`)
    setOpen(false)
  }

  return (
    <div className="space-y-3">
      <Button onClick={() => setOpen(true)} variant="secondary">
        Open form dialog
      </Button>

      {submitted && (
        <p className="text-sm text-emerald-600">{submitted}</p>
      )}

      <Dialog
        description="Fill in the details below and submit. Tab focus is trapped inside the dialog."
        onClose={() => setOpen(false)}
        open={open}
        title="Create a new item"
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Item name</span>
            <input
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30"
              name="name"
              placeholder="Enter a name..."
              required
            />
          </label>
          <div className="flex justify-end gap-3">
            <Button onClick={() => setOpen(false)} type="button" variant="ghost">
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Dialog>
    </div>
  )
}
