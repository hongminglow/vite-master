import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/cn'

type PanelProps = ComponentPropsWithoutRef<'div'>

export function Panel({ className, ...props }: PanelProps) {
  return <div className={cn('panel', className)} {...props} />
}
