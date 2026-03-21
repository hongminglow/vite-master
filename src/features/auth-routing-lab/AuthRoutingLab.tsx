import { KeyRound, Lock, ShieldCheck, ShieldX, UserCheck, Users } from 'lucide-react'

import { SectionShell } from '@/components/layout/SectionShell'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Panel } from '@/components/ui/Panel'
import {
  DemoAuthProvider,
  demoUsers,
  useDemoAuth,
} from '@/features/auth-routing-lab/context/DemoAuthContext'
import { RoleGate } from '@/features/auth-routing-lab/components/RoleGate'
import { cn } from '@/lib/cn'

const guardPatterns = [
  {
    title: 'ProtectedRoute wrapper',
    detail: 'A layout component that checks auth context and redirects unauthenticated users to login.',
    use: 'Wrap groups of routes that require authentication.',
  },
  {
    title: 'RoleGate component',
    detail: 'Conditionally renders children based on the user\'s role. Shows a fallback for insufficient permissions.',
    use: 'Hide admin panels, edit buttons, or sensitive data from unauthorized roles.',
  },
  {
    title: 'Redirect-back pattern',
    detail: 'Store the intended URL before redirecting to login, then navigate back after successful auth.',
    use: 'Prevent users from losing context when they hit a protected page while logged out.',
  },
] as const

function AuthRoutingContent() {
  const { user, isAuthenticated, login, logout } = useDemoAuth()

  return (
    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <div className="space-y-6">
        <Panel className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <Badge variant={isAuthenticated ? 'success' : 'neutral'}>
                {isAuthenticated ? `Logged in as ${user?.role}` : 'Not authenticated'}
              </Badge>
              <h3 className="font-display text-2xl font-semibold text-slate-950">
                Simulated login
              </h3>
              <p className="max-w-2xl text-sm leading-6 text-slate-600">
                Pick a user role to see how the UI adapts. No real backend is needed — the
                auth state lives in React context.
              </p>
            </div>
            <span className="mono-chip">AuthContext</span>
          </div>

          <div className="mt-5 space-y-3">
            {demoUsers.map((demoUser) => (
              <button
                className={cn(
                  'flex w-full items-center justify-between rounded-[24px] border px-4 py-4 text-left transition-colors duration-200',
                  user?.email === demoUser.email
                    ? 'border-emerald-500/30 bg-emerald-500/10'
                    : 'border-slate-800/90 bg-slate-900/72 hover:bg-slate-800/90',
                )}
                key={demoUser.email}
                onClick={() => login(demoUser)}
              >
                <div>
                  <p className="text-sm font-semibold text-slate-950">{demoUser.name}</p>
                  <p className="mt-1 text-xs text-slate-500">{demoUser.email}</p>
                </div>
                <Badge
                  variant={
                    demoUser.role === 'admin' ? 'success' : demoUser.role === 'editor' ? 'accent' : 'neutral'
                  }
                >
                  {demoUser.role}
                </Badge>
              </button>
            ))}

            {isAuthenticated && (
              <Button onClick={logout} variant="secondary">
                Log out
              </Button>
            )}
          </div>
        </Panel>

        <Panel className="p-6">
          <div className="flex items-center gap-2">
            <Lock className="size-4 text-amber-300" />
            <h3 className="font-display text-2xl font-semibold text-slate-950">
              Role-gated content
            </h3>
          </div>
          <div className="mt-5 space-y-4">
            <RoleGate requiredRole="viewer">
              <Panel className="border-emerald-500/20 bg-emerald-500/5 p-4">
                <div className="flex items-center gap-2">
                  <UserCheck className="size-4 text-emerald-500" />
                  <p className="text-sm font-medium text-emerald-800">
                    Viewer content — visible to all authenticated users
                  </p>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  This section is accessible to viewers, editors, and admins.
                </p>
              </Panel>
            </RoleGate>

            <RoleGate requiredRole="editor">
              <Panel className="border-cyan-500/20 bg-cyan-500/5 p-4">
                <div className="flex items-center gap-2">
                  <KeyRound className="size-4 text-cyan-500" />
                  <p className="text-sm font-medium text-cyan-800">
                    Editor content — hidden from viewers
                  </p>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  Edit and create actions would live here. Viewers only see this if promoted.
                </p>
              </Panel>
            </RoleGate>

            <RoleGate requiredRole="admin">
              <Panel className="border-rose-500/20 bg-rose-500/5 p-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-rose-500" />
                  <p className="text-sm font-medium text-rose-800">
                    Admin panel — restricted to admin role only
                  </p>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  Dangerous operations like user management, billing, and system config live here.
                </p>
              </Panel>
            </RoleGate>
          </div>
        </Panel>
      </div>

      <div className="space-y-6">
        <Panel className="p-6">
          <div className="flex items-center gap-2 text-emerald-300">
            <Users className="size-4" />
            <h3 className="font-display text-2xl font-semibold text-slate-950">
              Guard patterns
            </h3>
          </div>
          <div className="mt-5 space-y-4">
            {guardPatterns.map((pattern) => (
              <div
                className="rounded-[24px] border border-slate-200/80 bg-white px-4 py-4"
                key={pattern.title}
              >
                <p className="text-sm font-semibold text-slate-900">{pattern.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{pattern.detail}</p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{pattern.use}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="p-6">
          <div className="flex items-center gap-2 text-amber-300">
            <ShieldX className="size-4" />
            <h3 className="font-display text-2xl font-semibold text-slate-950">
              Common mistakes
            </h3>
          </div>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            <li>Hiding UI but not blocking API calls — always enforce permissions server-side too.</li>
            <li>Hardcoding role checks everywhere — centralize into a RoleGate or hook.</li>
            <li>Losing the redirect-back URL — store it before navigating to login.</li>
            <li>Checking auth on every render without memoization — use useMemo for the context value.</li>
          </ul>
        </Panel>
      </div>
    </div>
  )
}

export function AuthRoutingLab() {
  return (
    <DemoAuthProvider>
      <SectionShell
        description="Almost every product app needs protected routes and role-based rendering. This section demonstrates the patterns without requiring a real backend — just context, a role gate, and redirect logic."
        eyebrow="Delivery"
        id="auth-routing-lab"
        title="Guard routes by auth status and permissions with a reusable context and role gate."
      >
        <AuthRoutingContent />
      </SectionShell>
    </DemoAuthProvider>
  )
}
