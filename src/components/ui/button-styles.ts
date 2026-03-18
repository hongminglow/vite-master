import { cn } from '@/lib/cn'

const buttonVariants = {
  primary:
    'bg-emerald-400 text-slate-950 shadow-[0_20px_36px_-20px_rgba(34,197,94,0.5)] hover:bg-emerald-300',
  secondary:
    'border border-slate-700 bg-slate-900/85 text-slate-100 hover:bg-slate-800',
  ghost: 'bg-transparent text-slate-300 hover:bg-slate-800/65',
} as const

export type ButtonVariant = keyof typeof buttonVariants

export function buttonStyles(variant: ButtonVariant = 'primary') {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300',
    buttonVariants[variant],
  )
}
