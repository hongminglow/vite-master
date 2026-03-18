import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/cn'

const badgeVariants = {
  neutral: 'border-slate-700/80 bg-slate-900/80 text-slate-300',
  accent: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-200',
  success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200',
  dark: 'border-slate-700 bg-slate-950 text-slate-50',
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
