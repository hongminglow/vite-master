import { useCallback, useEffect, useRef, type ReactNode } from 'react'

import { X } from 'lucide-react'
import { cn } from '@/lib/cn'

type DialogProps = {
  open: boolean
  onClose: () => void
  children: ReactNode
  title: string
  description?: string
  className?: string
}

export function Dialog({
  open,
  onClose,
  children,
  title,
  description,
  className,
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const handleClose = useCallback(() => {
    dialogRef.current?.close()
    onClose()
  }, [onClose])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) {
      dialog.showModal()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const handleCancel = (e: Event) => {
      e.preventDefault()
      handleClose()
    }

    dialog.addEventListener('cancel', handleCancel)
    return () => dialog.removeEventListener('cancel', handleCancel)
  }, [handleClose])

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      handleClose()
    }
  }

  return (
    <dialog
      aria-describedby={description ? 'dialog-description' : undefined}
      aria-labelledby="dialog-title"
      className={cn(
        'fixed inset-0 m-auto max-w-lg w-full rounded-[28px] border border-slate-200/80 bg-white p-0 shadow-2xl shadow-black/12 backdrop:bg-black/50 backdrop:backdrop-blur-sm',
        'open:animate-in open:fade-in open:zoom-in-95 open:duration-200',
        className,
      )}
      onClick={handleBackdropClick}
      ref={dialogRef}
    >
      <div className="px-6 pt-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              className="font-display text-xl font-semibold text-slate-950"
              id="dialog-title"
            >
              {title}
            </h2>
            {description && (
              <p
                className="mt-2 text-sm leading-6 text-slate-600"
                id="dialog-description"
              >
                {description}
              </p>
            )}
          </div>
          <button
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            onClick={handleClose}
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
      <div className="p-6">{children}</div>
    </dialog>
  )
}
