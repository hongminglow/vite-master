import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type UserRole = 'viewer' | 'editor' | 'admin'

export type DemoUser = {
  name: string
  email: string
  role: UserRole
}

type AuthContextValue = {
  user: DemoUser | null
  isAuthenticated: boolean
  login: (user: DemoUser) => void
  logout: () => void
  hasRole: (role: UserRole) => boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

const roleHierarchy: Record<UserRole, number> = {
  viewer: 0,
  editor: 1,
  admin: 2,
}

export function DemoAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null)

  const login = useCallback((u: DemoUser) => setUser(u), [])
  const logout = useCallback(() => setUser(null), [])

  const hasRole = useCallback(
    (requiredRole: UserRole) => {
      if (!user) return false
      return roleHierarchy[user.role] >= roleHierarchy[requiredRole]
    },
    [user],
  )

  const value = useMemo(
    () => ({ user, isAuthenticated: user !== null, login, logout, hasRole }),
    [user, login, logout, hasRole],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useDemoAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useDemoAuth must be used within DemoAuthProvider')
  }

  return context
}

export const demoUsers: DemoUser[] = [
  { name: 'Viewer User', email: 'viewer@lab.dev', role: 'viewer' },
  { name: 'Editor User', email: 'editor@lab.dev', role: 'editor' },
  { name: 'Admin User', email: 'admin@lab.dev', role: 'admin' },
]
