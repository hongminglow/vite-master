import { ArrowUpRight, FlaskConical, Layers, TestTubes, Trophy } from 'lucide-react'

import { SectionShell } from '@/components/layout/SectionShell'
import { Badge } from '@/components/ui/Badge'
import { Panel } from '@/components/ui/Panel'

const testingTrophy = [
  {
    layer: 'E2E tests',
    share: 'Few',
    detail: 'Cover only the most critical user journeys. Slow to run, expensive to maintain, but high confidence.',
    tools: 'Playwright, Cypress',
    color: 'border-rose-300/80 bg-rose-50 text-rose-800',
  },
  {
    layer: 'Integration tests',
    share: 'Most',
    detail: 'Render components with their real dependencies (query client, router). Assert from the user\'s perspective.',
    tools: 'Vitest + Testing Library',
    color: 'border-emerald-300/80 bg-emerald-50 text-emerald-800',
  },
  {
    layer: 'Unit tests',
    share: 'Some',
    detail: 'Test pure functions, custom hooks, and schema validation. Fast, focused, no DOM needed.',
    tools: 'Vitest',
    color: 'border-cyan-300/80 bg-cyan-50 text-cyan-800',
  },
  {
    layer: 'Static analysis',
    share: 'Always on',
    detail: 'TypeScript and ESLint catch type errors and code smells before tests even run.',
    tools: 'TypeScript, ESLint',
    color: 'border-slate-300/80 bg-slate-50 text-slate-700',
  },
] as const

const testExamples = [
  {
    title: 'Component test',
    description: 'Render a form, fill fields with testing-library, submit, and assert the result.',
    code: `import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('submits form with valid data', async () => {
  render(<ContactForm />)
  
  await userEvent.type(screen.getByLabelText('Name'), 'Alice')
  await userEvent.click(screen.getByRole('button', { name: /submit/i }))
  
  expect(screen.getByText(/thank you/i)).toBeInTheDocument()
})`,
  },
  {
    title: 'Hook test',
    description: 'Test a custom debounce hook using renderHook and fake timers.',
    code: `import { renderHook, act } from '@testing-library/react'

test('debounces value after delay', () => {
  vi.useFakeTimers()
  const { result, rerender } = renderHook(
    ({ value }) => useDebouncedValue(value, 300),
    { initialProps: { value: '' } },
  )
  
  rerender({ value: 'hello' })
  expect(result.current).toBe('')
  
  act(() => vi.advanceTimersByTime(300))
  expect(result.current).toBe('hello')
})`,
  },
  {
    title: 'API mock test',
    description: 'Mock an API with MSW, render the component, and assert the loading → success flow.',
    code: `import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
  http.get('/api/tasks', () => 
    HttpResponse.json([{ id: '1', name: 'Task A' }])
  ),
)

test('loads and displays tasks', async () => {
  render(<TaskList />, { wrapper: QueryClientProvider })
  
  expect(screen.getByText(/loading/i)).toBeInTheDocument()
  expect(await screen.findByText('Task A')).toBeInTheDocument()
})`,
  },
  {
    title: 'Schema validation test',
    description: 'Test a Zod schema directly — no DOM, no component. Pure unit test.',
    code: `import { urlStateSchema } from './url-state-schema'

test('parses valid params', () => {
  const result = urlStateSchema.parse({ q: 'deploy', page: '2' })
  expect(result.q).toBe('deploy')
  expect(result.page).toBe(2)
})

test('falls back on invalid input', () => {
  const result = urlStateSchema.parse({ page: 'not-a-number' })
  expect(result.page).toBe(1)
})`,
  },
] as const

const recommendedLibs = [
  {
    name: 'vitest',
    url: 'https://vitest.dev/',
    reason: 'Shares Vite config, runs fast, supports ESM natively.',
  },
  {
    name: '@testing-library/react',
    url: 'https://testing-library.com/react',
    reason: 'Test from the user\'s perspective — queries by role, label, and text.',
  },
  {
    name: 'msw',
    url: 'https://mswjs.io/',
    reason: 'Mock APIs at the network level so tests are not coupled to fetch internals.',
  },
  {
    name: '@testing-library/user-event',
    url: 'https://testing-library.com/user-event',
    reason: 'Simulates real user interactions more accurately than fireEvent.',
  },
] as const

export function TestingLab() {
  return (
    <SectionShell
      description="Testing does not need to be painful. The right mix of static analysis, unit tests, and integration tests gives you confidence without slowing you down. This section documents the recommended strategy for React + Vite projects."
      eyebrow="Delivery"
      id="testing-lab"
      title="Test the way users interact — not the way components are wired."
    >
      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <Panel className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-2">
                <Badge variant="accent">Testing trophy</Badge>
                <h3 className="font-display text-2xl font-semibold text-slate-950">
                  Test layer distribution
                </h3>
                <p className="max-w-2xl text-sm leading-6 text-slate-600">
                  Follow the testing trophy: mostly integration tests, some unit tests for
                  pure logic, few E2E tests for critical paths.
                </p>
              </div>
              <span className="mono-chip">vitest</span>
            </div>

            <div className="mt-5 space-y-3">
              {testingTrophy.map((layer) => (
                <div
                  className={`flex items-start justify-between gap-3 rounded-[24px] border px-4 py-4 ${layer.color}`}
                  key={layer.layer}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <Trophy className="size-4" />
                      <p className="text-sm font-semibold">{layer.layer}</p>
                    </div>
                    <p className="mt-2 text-sm leading-6 opacity-80">{layer.detail}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-xs font-medium">{layer.share}</p>
                    <p className="mt-1 text-xs opacity-60">{layer.tools}</p>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="p-6">
            <div className="flex items-center gap-2 text-slate-900">
              <FlaskConical className="size-4" />
              <h3 className="font-display text-2xl font-semibold">
                Example tests for this repo
              </h3>
            </div>
            <div className="mt-5 space-y-4">
              {testExamples.map((example) => (
                <div
                  className="rounded-[24px] border border-slate-200/80 bg-slate-50/80 px-4 py-4"
                  key={example.title}
                >
                  <p className="text-sm font-semibold text-slate-900">{example.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{example.description}</p>
                  <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-900/72 px-3 py-3 text-xs text-slate-300">
                    <code>{example.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel className="p-6">
            <div className="flex items-center gap-2 text-emerald-300">
              <TestTubes className="size-4" />
              <h3 className="font-display text-2xl font-semibold text-slate-950">
                Recommended libraries
              </h3>
            </div>
            <div className="mt-5 space-y-3">
              {recommendedLibs.map((lib) => (
                <a
                  className="flex items-start justify-between gap-4 rounded-[24px] border border-slate-200/80 bg-white px-4 py-4 transition-colors duration-200 hover:bg-slate-50"
                  href={lib.url}
                  key={lib.name}
                  rel="noreferrer"
                  target="_blank"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{lib.name}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{lib.reason}</p>
                  </div>
                  <ArrowUpRight className="mt-1 size-4 shrink-0 text-slate-400" />
                </a>
              ))}
            </div>
          </Panel>

          <Panel className="p-6">
            <div className="flex items-center gap-2 text-amber-300">
              <Layers className="size-4" />
              <h3 className="font-display text-2xl font-semibold text-slate-950">
                Testing principles
              </h3>
            </div>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li>Query by role and label, not by class name or test ID — tests should pass even after a CSS refactor.</li>
              <li>Mock at the network layer (MSW), not at the fetch function — tests stay realistic.</li>
              <li>Use fake timers for debounce and animation tests — deterministic timing makes tests reliable.</li>
              <li>Do not test implementation details — test what the user sees and does.</li>
              <li>Run tests on every PR and keep the suite fast enough that developers actually run it locally.</li>
            </ul>
          </Panel>
        </div>
      </div>
    </SectionShell>
  )
}
