import { expect, test } from 'vitest'
import { cn } from './utils'

test('merges plain class names', () => {
  expect(cn('a', 'b')).toBe('a b')
})

test('drops falsy values', () => {
  expect(cn('a', false, undefined, null, 'b')).toBe('a b')
})

test('lets a later conflicting Tailwind class win', () => {
  expect(cn('px-2', 'px-4')).toBe('px-4')
})

test('applies conditional object syntax from clsx', () => {
  expect(cn('base', { active: true, hidden: false })).toBe('base active')
})
