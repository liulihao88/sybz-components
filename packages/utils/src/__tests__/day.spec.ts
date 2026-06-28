import { describe, expect, it } from 'vitest'
import { diffDate, diffDateFromCurrent, formatDate, formatDateToDay, formatDateToMinute } from '../day'

describe('day utils', () => {
  it('formats dates with custom formats', () => {
    const date = new Date(2026, 0, 2, 3, 4, 5)

    expect(formatDate(date)).toBe('2026-01-02 03:04:05')
    expect(formatDate(date, 'YYYY/MM/DD')).toBe('2026/01/02')
    expect(formatDateToDay(date)).toBe('2026-01-02')
    expect(formatDateToMinute(date)).toBe('2026-01-02 03:04')
  })

  it('calculates date differences', () => {
    expect(diffDate('2026-04-24 12:00:00', '2026-04-24 11:59:00')).toBe(60)
    expect(diffDate('2026-04-24 12:00:00', '2026-04-24 11:30:00', 'minute')).toBe(30)
    expect(diffDate('', '2026-04-24 11:30:00')).toBeUndefined()
  })

  it('formats relative duration text', () => {
    expect(diffDateFromCurrent(45)).toBe('45秒前')
    expect(diffDateFromCurrent(60)).toBe('1分钟前')
    expect(diffDateFromCurrent(60 * 60)).toBe('1小时前')
    expect(diffDateFromCurrent(60 * 60 * 24)).toBe('1天前')
    expect(diffDateFromCurrent(60 * 60 * 24 * 30)).toBe('1月前')
    expect(diffDateFromCurrent(60 * 60 * 24 * 365)).toBe('1年前')
  })
})
