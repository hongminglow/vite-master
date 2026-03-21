import { useEffect, useRef, useState } from 'react'

export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedValue(value)
    }, delayMs)

    return () => {
      window.clearTimeout(timer)
    }
  }, [value, delayMs])

  return debouncedValue
}

export function useThrottledCallback<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delayMs: number,
) {
  const lastRun = useRef(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const callbackRef = useRef(callback)

  callbackRef.current = callback

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (...args: Args) => {
    const now = Date.now()
    const elapsed = now - lastRun.current

    if (elapsed >= delayMs) {
      lastRun.current = now
      callbackRef.current(...args)
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        lastRun.current = Date.now()
        callbackRef.current(...args)
      }, delayMs - elapsed)
    }
  }
}
