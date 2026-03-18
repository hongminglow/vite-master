import { cn } from '@/lib/cn'

const buttonVariants = {
  primary:
    'bg-slate-950 text-white shadow-[0_18px_30px_-18px_rgba(15,23,42,0.55)] hover:bg-slate-800',
  secondary:
    'border border-slate-300 bg-white text-slate-900 hover:bg-slate-50',
  ghost: 'bg-transparent text-slate-700 hover:bg-slate-100',
} as const

export type ButtonVariant = keyof typeof buttonVariants

export function buttonStyles(variant: ButtonVariant = 'primary') {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950',
    buttonVariants[variant],
  )
}
