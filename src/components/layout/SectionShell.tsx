import type { ReactNode } from 'react'

import { Panel } from '@/components/ui/Panel'
import { cn } from '@/lib/cn'

type SectionShellProps = {
  id: string
  eyebrow: string
  title: string
  description: string
  children: ReactNode
  className?: string
}

export function SectionShell({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: SectionShellProps) {
  return (
    <Panel className={cn('overflow-hidden', className)} id={id}>
      <div className="border-b border-slate-200/80 px-5 py-5 lg:px-6">
        <div className="space-y-4">
          <span className="section-kicker">{eyebrow}</span>
          <div className="space-y-3">
            <h2 className="max-w-3xl font-display text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              {title}
            </h2>
            <p className="max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
              {description}
            </p>
          </div>
        </div>
      </div>
      <div className="p-5 lg:p-6">{children}</div>
    </Panel>
  )
}
