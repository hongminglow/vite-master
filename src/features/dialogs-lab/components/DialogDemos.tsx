import { useState } from 'react'

import { Button } from '@/components/ui/Button'
import { useDialog } from '@/features/dialogs-lab/context/DialogContext'

export function ConfirmDialog() {
  const [result, setResult] = useState<string | null>(null)
  const { openDialog } = useDialog()

  const handleConfirm = () => {
    setResult('Confirmed — the destructive action would execute here.')
  }

  const handleOpen = () => {
    openDialog({
      description:
        'This action cannot be undone. The item will be permanently removed from the system.',
      title: 'Delete this item?',
      content: (onClose) => (
        <div className="flex justify-end gap-3">
          <Button onClick={onClose} variant="ghost">
            Cancel
          </Button>
          <Button
            className="bg-rose-500 text-white shadow-rose-500/30 hover:bg-rose-400"
            onClick={() => {
              handleConfirm()
              onClose()
            }}
          >
            Yes, delete
          </Button>
        </div>
      ),
    })
  }

  return (
    <div className="space-y-3">
      <Button onClick={handleOpen} variant="secondary">
        Open confirmation dialog
      </Button>

      {result && <p className="text-sm text-emerald-600">{result}</p>}
    </div>
  )
}

export function FormDialog() {
  const [submitted, setSubmitted] = useState<string | null>(null)
  const { openDialog } = useDialog()

  const handleOpen = () => {
    openDialog({
      description:
        'Fill in the details below and submit. Tab focus is trapped inside the dialog.',
      title: 'Create a new item',
      content: (onClose) => (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            const data = new FormData(e.currentTarget)
            const name = data.get('name') as string
            setSubmitted(`Submitted: ${name}`)
            onClose()
          }}
        >
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
            <Button onClick={onClose} type="button" variant="ghost">
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      ),
    })
  }

  return (
    <div className="space-y-3">
      <Button onClick={handleOpen} variant="secondary">
        Open form dialog
      </Button>

      {submitted && <p className="text-sm text-emerald-600">{submitted}</p>}
    </div>
  )
}
