import { Component, type ErrorInfo, type ReactNode } from 'react'

import { Panel } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'

type ErrorBoundaryProps = {
  children: ReactNode
  fallbackTitle?: string
  level?: 'route' | 'component'
}

type ErrorBoundaryState = {
  hasError: boolean
  error: Error | null
}

export class DemoErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // In a real app you'd report to Sentry, DataDog, etc.
    console.error('[ErrorBoundary] Caught:', error, info.componentStack)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    const { hasError, error } = this.state
    const { children, fallbackTitle, level = 'component' } = this.props

    if (!hasError) {
      return children
    }

    const isRoute = level === 'route'

    return (
      <Panel
        className={`p-6 ${isRoute ? 'border-rose-500/30 bg-rose-500/8' : 'border-amber-500/30 bg-amber-500/8'}`}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <p className={`text-xs font-medium uppercase tracking-[0.22em] ${isRoute ? 'text-rose-400' : 'text-amber-400'}`}>
              {isRoute ? 'Route error' : 'Component error'}
            </p>
            <h3 className="font-display text-2xl font-semibold text-slate-950">
              {fallbackTitle ?? 'Something went wrong'}
            </h3>
          </div>

          <div className="rounded-[24px] border border-slate-800/90 bg-slate-900/72 px-4 py-3">
            <code className="text-xs text-red-300">{error?.message ?? 'Unknown error'}</code>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={this.handleReset} variant="primary">
              Try again
            </Button>
            {isRoute && (
              <Button
                onClick={() => { window.location.href = '/' }}
                variant="secondary"
              >
                Go to overview
              </Button>
            )}
          </div>

          <p className="text-sm leading-6 text-slate-600">
            {isRoute
              ? 'This error boundary wraps the entire route. Click "Try again" to re-mount the route content.'
              : 'Only this widget crashed — the rest of the page continues working.'
            }
          </p>
        </div>
      </Panel>
    )
  }
}
