import type { ButtonHTMLAttributes } from 'react'

import { buttonStyles, type ButtonVariant } from '@/components/ui/button-styles'
import { cn } from '@/lib/cn'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}

export function Button({
  className,
  variant = 'primary',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonStyles(variant), className)}
      type={type}
      {...props}
    />
  )
}
