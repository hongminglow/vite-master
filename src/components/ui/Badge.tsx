import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/cn'

const badgeVariants = {
  neutral: 'border-slate-300/80 bg-slate-50 text-slate-700',
  accent: 'border-amber-300/80 bg-amber-50 text-amber-900',
  success: 'border-emerald-300/80 bg-emerald-50 text-emerald-900',
  dark: 'border-slate-800 bg-slate-950 text-slate-50',
} as const

type BadgeProps = ComponentPropsWithoutRef<'span'> & {
  variant?: keyof typeof badgeVariants
}

export function Badge({
  className,
  variant = 'neutral',
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium',
        badgeVariants[variant],
        className,
      )}
      {...props}
    />
  )
}
