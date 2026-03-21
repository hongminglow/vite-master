import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export type Toast = {
  id: string
  type: ToastType
  message: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

type ToastContextValue = {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => string
  removeToast: (id: string) => void
  clearAll: () => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const addToast = useCallback(
    (toast: Omit<Toast, 'id'>) => {
      const id = `toast-${Date.now()}-${Math.random().toString(16).slice(2)}`
      const newToast: Toast = { ...toast, id }

      setToasts((prev) => [...prev, newToast].slice(-5))

      const duration = toast.duration ?? 4000
      if (duration > 0) {
        window.setTimeout(() => removeToast(id), duration)
      }

      return id
    },
    [removeToast],
  )

  const clearAll = useCallback(() => setToasts([]), [])

  const value = useMemo(
    () => ({ toasts, addToast, removeToast, clearAll }),
    [toasts, addToast, removeToast, clearAll],
  )

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

export function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }

  return context
}
