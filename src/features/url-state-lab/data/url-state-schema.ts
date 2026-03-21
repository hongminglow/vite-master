import { z } from 'zod'

export const urlStateSchema = z.object({
  q: z.string().default(''),
  status: z.enum(['all', 'open', 'in-progress', 'done']).default('all'),
  priority: z.enum(['all', 'low', 'medium', 'high', 'critical']).default('all'),
  sort: z.enum(['name', 'status', 'priority']).default('name'),
  dir: z.enum(['asc', 'desc']).default('asc'),
  page: z.coerce.number().int().min(1).default(1),
})

export type UrlStateParams = z.infer<typeof urlStateSchema>

export function parseSearchParams(searchParams: URLSearchParams): UrlStateParams {
  const raw: Record<string, string> = {}

  for (const [key, value] of searchParams.entries()) {
    raw[key] = value
  }

  const result = urlStateSchema.safeParse(raw)
  return result.success ? result.data : urlStateSchema.parse({})
}
