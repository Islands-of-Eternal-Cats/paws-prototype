import { describe, it, expect } from 'vitest'
import { formatSimTime, formatDay } from './format'

describe('formatSimTime', () => {
  it('0 сек → 00:00:00', () => {
    expect(formatSimTime(0)).toBe('00:00:00')
  })

  it('1 сек → 00:00:01', () => {
    expect(formatSimTime(1)).toBe('00:00:01')
  })

  it('65 сек → 00:01:05', () => {
    expect(formatSimTime(65)).toBe('00:01:05')
  })

  it('3600 сек → 01:00:00', () => {
    expect(formatSimTime(3600)).toBe('01:00:00')
  })

  it('3661 сек → 01:01:01', () => {
    expect(formatSimTime(3661)).toBe('01:01:01')
  })

  it('86399 сек → 23:59:59', () => {
    expect(formatSimTime(86399)).toBe('23:59:59')
  })

  it('86400 сек → 00:00:00 (сутки)', () => {
    expect(formatSimTime(86400)).toBe('00:00:00')
  })

  it('90061 сек (25ч01м01с) → 01:01:01', () => {
    expect(formatSimTime(90061)).toBe('01:01:01')
  })
})

describe('formatDay', () => {
  it('0 сек → день 1', () => {
    expect(formatDay(0)).toBe(1)
  })

  it('86399 сек → день 1', () => {
    expect(formatDay(86399)).toBe(1)
  })

  it('86400 сек → день 2', () => {
    expect(formatDay(86400)).toBe(2)
  })

  it('172800 сек → день 3', () => {
    expect(formatDay(172800)).toBe(3)
  })
})
