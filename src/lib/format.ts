const compactFormatter = new Intl.NumberFormat('en', {
  notation: 'compact',
  maximumFractionDigits: 1,
})

const timeFormatter = new Intl.DateTimeFormat('en', {
  hour: 'numeric',
  minute: '2-digit',
})

export function formatCompactNumber(value: number) {
  return compactFormatter.format(value)
}

export function formatClock(value: string) {
  return timeFormatter.format(new Date(value))
}
