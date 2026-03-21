import { createPortal } from 'react-dom'
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react'

import { cn } from '@/lib/cn'
import { useToast, type ToastType } from '@/features/notifications-lab/context/ToastContext'

const typeStyles: Record<ToastType, string> = {
  success: 'border-emerald-500/30 bg-emerald-950/95 text-emerald-100',
  error: 'border-rose-500/30 bg-rose-950/95 text-rose-100',
  warning: 'border-amber-500/30 bg-amber-950/95 text-amber-100',
  info: 'border-cyan-500/30 bg-cyan-950/95 text-cyan-100',
}

const typeIcons: Record<ToastType, typeof CheckCircle2> = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
}

export function ToastContainer() {
  const { toasts, removeToast } = useToast()

  if (toasts.length === 0) return null

  return createPortal(
    <div
      aria-live="polite"
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2"
      role="status"
    >
      {toasts.map((toast) => {
        const Icon = typeIcons[toast.type]
        return (
          <div
            className={cn(
              'flex items-start gap-3 rounded-2xl border px-4 py-3 shadow-lg shadow-black/20 backdrop-blur-sm animate-in slide-in-from-right-5 fade-in duration-300',
              typeStyles[toast.type],
            )}
            key={toast.id}
          >
            <Icon className="mt-0.5 size-4 shrink-0" />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">{toast.message}</p>
              {toast.action && (
                <button
                  className="text-xs font-semibold underline underline-offset-2 opacity-80 hover:opacity-100"
                  onClick={() => {
                    toast.action?.onClick()
                    removeToast(toast.id)
                  }}
                >
                  {toast.action.label}
                </button>
              )}
            </div>
            <button
              className="shrink-0 rounded-lg p-0.5 opacity-60 hover:opacity-100"
              onClick={() => removeToast(toast.id)}
            >
              <X className="size-3.5" />
            </button>
          </div>
        )
      })}
    </div>,
    document.body,
  )
}
