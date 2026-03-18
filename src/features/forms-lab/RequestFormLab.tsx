import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2, Plus, Trash2 } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { SectionShell } from '@/components/layout/SectionShell'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Panel } from '@/components/ui/Panel'
import { wait } from '@/lib/wait'

const requestSchema = z.object({
  title: z.string().trim().min(4, 'Give the task a clearer title.'),
  ownerEmail: z.string().email('Use a valid email address.'),
  priority: z.enum(['Low', 'Medium', 'High']),
  dueDate: z.string().min(1, 'Pick a due date.'),
  needsSvgSupport: z.boolean(),
  acceptanceCriteria: z
    .array(
      z.object({
        value: z.string().trim().min(3, 'Keep each criterion descriptive.'),
      }),
    )
    .min(1, 'Add at least one acceptance criterion.'),
})

type RequestFormValues = z.infer<typeof requestSchema>

const fieldClassName =
  'mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/85 px-4 py-3 text-sm text-slate-100 shadow-sm outline-none transition-colors duration-200 placeholder:text-slate-500 focus:border-amber-300'

function createDefaultValues(): RequestFormValues {
  const dueDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 3)
    .toISOString()
    .slice(0, 10)

  return {
    title: 'Ship the React Daily Lab',
    ownerEmail: 'frontend@example.com',
    priority: 'High',
    dueDate,
    needsSvgSupport: true,
    acceptanceCriteria: [
      { value: 'Optimize exported SVGs before importing them.' },
      { value: 'Generate a bundle report before merging new dependencies.' },
    ],
  }
}

export function RequestFormLab() {
  const [submittedPayload, setSubmittedPayload] =
    useState<RequestFormValues | null>(null)
  const [defaults] = useState(() => createDefaultValues())

  const form = useForm<RequestFormValues>({
    defaultValues: defaults,
    resolver: zodResolver(requestSchema),
  })

  const criteria = useFieldArray({
    control: form.control,
    name: 'acceptanceCriteria',
  })

  const onSubmit = form.handleSubmit(async (values) => {
    await wait(450)
    setSubmittedPayload(values)
  })

  return (
    <SectionShell
      description="Forms are one of the fastest ways for a codebase to get noisy. This section keeps the form fast, accessible, and type-safe by combining React Hook Form with a single Zod schema."
      eyebrow="Forms and Validation"
      id="forms-lab"
      title="Use one validation source of truth and let the form stay lean."
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Panel className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <Badge variant="success">React Hook Form + Zod</Badge>
              <h3 className="mt-3 font-display text-2xl font-semibold text-slate-950">
                Example request form
              </h3>
            </div>
            <div className="text-sm text-slate-500">Accessible labels included</div>
          </div>

          <form
            className="mt-6 space-y-5"
            noValidate
            onSubmit={(event) => {
              void onSubmit(event)
            }}
          >
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block text-sm font-medium text-slate-900">
                Task title
                <input
                  aria-invalid={Boolean(form.formState.errors.title)}
                  className={fieldClassName}
                  placeholder="Add a clear frontend task"
                  {...form.register('title')}
                />
                <FieldError message={form.formState.errors.title?.message} />
              </label>

              <label className="block text-sm font-medium text-slate-900">
                Owner email
                <input
                  aria-invalid={Boolean(form.formState.errors.ownerEmail)}
                  className={fieldClassName}
                  placeholder="frontend@example.com"
                  type="email"
                  {...form.register('ownerEmail')}
                />
                <FieldError
                  message={form.formState.errors.ownerEmail?.message}
                />
              </label>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="block text-sm font-medium text-slate-900">
                Priority
                <select className={fieldClassName} {...form.register('priority')}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </label>

              <label className="block text-sm font-medium text-slate-900">
                Due date
                <input
                  aria-invalid={Boolean(form.formState.errors.dueDate)}
                  className={fieldClassName}
                  type="date"
                  {...form.register('dueDate')}
                />
                <FieldError message={form.formState.errors.dueDate?.message} />
              </label>
            </div>

            <div className="rounded-[28px] border border-slate-200/80 bg-slate-50/80 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Acceptance criteria
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    This is a great fit for
                    <code className="mx-1 rounded bg-white px-1.5 py-0.5 text-xs text-slate-800">
                      useFieldArray
                    </code>
                    because the rows stay declarative.
                  </p>
                </div>
                <Button
                  className="shrink-0"
                  onClick={() => criteria.append({ value: '' })}
                  variant="secondary"
                >
                  <Plus className="size-4" />
                  Add item
                </Button>
              </div>

              <div className="mt-4 space-y-3">
                {criteria.fields.map((field, index) => (
                  <div className="flex gap-3" key={field.id}>
                    <input
                      aria-invalid={Boolean(
                        form.formState.errors.acceptanceCriteria?.[index]?.value,
                      )}
                      className={fieldClassName}
                      placeholder="Describe one acceptance criterion"
                      {...form.register(`acceptanceCriteria.${index}.value` as const)}
                    />
                    <Button
                      aria-label={`Remove acceptance criterion ${index + 1}`}
                      className="mt-2 h-[50px] px-3"
                      disabled={criteria.fields.length === 1}
                      onClick={() => criteria.remove(index)}
                      variant="ghost"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <FieldError
                message={form.formState.errors.acceptanceCriteria?.message}
              />
            </div>

            <label className="flex items-start gap-3 rounded-[28px] border border-slate-700/90 bg-slate-950/70 px-4 py-4 text-sm text-slate-300">
              <input
                className="mt-1 size-4 rounded border-slate-600 bg-slate-900 text-amber-300"
                type="checkbox"
                {...form.register('needsSvgSupport')}
              />
              <span>
                Include the SVG workflow in this request
                <span className="mt-1 block text-slate-500">
                  Good when the feature involves icons, brand marks, or
                  illustration updates.
                </span>
              </span>
            </label>

            <div className="flex flex-wrap items-center gap-3">
              <Button disabled={form.formState.isSubmitting} type="submit">
                {form.formState.isSubmitting ? 'Saving request...' : 'Save request'}
              </Button>
              <Button
                onClick={() => {
                  form.reset(defaults)
                  setSubmittedPayload(null)
                }}
                variant="secondary"
              >
                Reset
              </Button>
            </div>
          </form>
        </Panel>

        <div className="space-y-6">
          <Panel className="p-6">
            <div className="flex items-center gap-2 text-emerald-700">
              <CheckCircle2 className="size-4" />
              <h3 className="font-display text-2xl font-semibold text-slate-950">
                Why this combo works
              </h3>
            </div>

            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li>React Hook Form keeps input subscriptions narrow and fast.</li>
              <li>Zod gives one schema you can reuse outside the UI too.</li>
              <li>Field arrays avoid a pile of manual add/remove state.</li>
              <li>Labels, error messages, and button types stay explicit.</li>
            </ul>
          </Panel>

          <Panel className="bg-slate-950 p-6 text-slate-50">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display text-2xl font-semibold">
                Submitted payload
              </h3>
              <Badge className="border-white/15 bg-white/10 text-white" variant="dark">
                Demo output
              </Badge>
            </div>

            <div aria-live="polite" className="mt-4">
              <pre className="overflow-x-auto rounded-[24px] border border-white/10 bg-white/10 p-4 text-xs leading-6 text-slate-200">
                {JSON.stringify(submittedPayload ?? defaults, null, 2)}
              </pre>
            </div>
          </Panel>
        </div>
      </div>
    </SectionShell>
  )
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null
  }

  return (
    <p className="mt-2 text-sm text-rose-600" role="alert">
      {message}
    </p>
  )
}
