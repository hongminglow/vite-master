import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

import { Dialog } from '../components/Dialog'

type DialogOptions = {
  title: string
  description?: string
  content: ReactNode | ((onClose: () => void) => ReactNode)
  className?: string
}

type DialogContextType = {
  openDialog: (options: DialogOptions) => void
  closeDialog: () => void
}

const DialogContext = createContext<DialogContextType | undefined>(undefined)

export function DialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [dialogOptions, setDialogOptions] = useState<DialogOptions | null>(null)

  const openDialog = useCallback((opts: DialogOptions) => {
    setDialogOptions(opts)
    setIsOpen(true)
  }, [])

  const closeDialog = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleClose = useCallback(() => {
    closeDialog()
  }, [closeDialog])

  const content = typeof dialogOptions?.content === 'function' ? dialogOptions.content(closeDialog) : dialogOptions?.content

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      {dialogOptions && (
        <Dialog
          className={dialogOptions.className}
          description={dialogOptions.description}
          onClose={handleClose}
          open={isOpen}
          title={dialogOptions.title}
        >
          {content}
        </Dialog>
      )}
    </DialogContext.Provider>
  )
}

export function useDialog() {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider')
  }
  return context
}
