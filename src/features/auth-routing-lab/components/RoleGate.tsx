import type { ReactNode } from 'react'

import { Panel } from '@/components/ui/Panel'
import {
  useDemoAuth,
  type UserRole,
} from '@/features/auth-routing-lab/context/DemoAuthContext'

type RoleGateProps = {
  children: ReactNode
  requiredRole: UserRole
  fallback?: ReactNode
}

export function RoleGate({ children, requiredRole, fallback }: RoleGateProps) {
  const { hasRole, isAuthenticated } = useDemoAuth()

  if (!isAuthenticated || !hasRole(requiredRole)) {
    return (
      fallback ?? (
        <Panel className="border-amber-500/30 bg-amber-500/8 p-4">
          <p className="text-sm text-amber-300">
            🔒 Requires <strong>{requiredRole}</strong> role or higher.
          </p>
        </Panel>
      )
    )
  }

  return <>{children}</>
}
