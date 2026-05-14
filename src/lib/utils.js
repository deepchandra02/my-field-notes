import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatDate(input) {
  const date = input instanceof Date ? input : new Date(input)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function readingTime(text = '') {
  const words = String(text).trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.round(words / 220))
  return `${minutes} min read`
}
