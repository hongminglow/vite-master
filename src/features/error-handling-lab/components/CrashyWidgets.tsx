import { useState } from 'react'

import { Button } from '@/components/ui/Button'

export function CrashyWidget() {
  const [shouldCrash, setShouldCrash] = useState(false)

  if (shouldCrash) {
    throw new Error('Intentional widget crash — this is expected for the demo.')
  }

  return (
    <div className="space-y-3">
      <p className="text-sm leading-6 text-slate-600">
        This widget is wrapped in its own component-level error boundary. Crashing it
        does not take down the rest of the page.
      </p>
      <Button onClick={() => setShouldCrash(true)} variant="secondary">
        💥 Crash this widget
      </Button>
    </div>
  )
}

export function CrashyRoute() {
  const [shouldCrash, setShouldCrash] = useState(false)

  if (shouldCrash) {
    throw new Error('Intentional route crash — the route-level boundary catches this.')
  }

  return (
    <div className="space-y-3">
      <p className="text-sm leading-6 text-slate-600">
        This button simulates a crash at the route level. The entire route content will be
        replaced with the error fallback, but you can recover with the retry button.
      </p>
      <Button onClick={() => setShouldCrash(true)} variant="secondary">
        💥 Crash the entire route
      </Button>
    </div>
  )
}
