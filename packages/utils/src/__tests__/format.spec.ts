import { describe, expect, it, vi } from 'vitest'
import { consola } from 'consola'
import {
  formatBytes,
  formatBytesConvert,
  formatDurationTime,
  formatTextToHtml,
  formatThousands,
  formatTime,
  formatToFixed,
} from '../format'

describe('format utils', () => {
  it('formats bytes with unit, precision, prefix, suffix and thousands', () => {
    expect(formatBytes(1024)).toBe('1.00 KB')
    expect(formatBytes('1048576', { digit: 1 })).toBe('1.0 MB')
    expect(formatBytes(1040000, { digit: 3, roundType: 'round', thousands: true, prefix: '$', suffix: '/s' })).toBe(
      '$1,015.625 KB/s',
    )
  })

  it('keeps invalid byte input unchanged', () => {
    expect(formatBytes('abc')).toBe('abc')
  })

  it('converts byte strings back to raw bytes', () => {
    expect(formatBytesConvert('0.5GB')).toBe(536870912)
    expect(formatBytesConvert('1,024 KB')).toBe(1048576)
    expect(formatBytesConvert('1536B', { digit: 2, thounsands: true })).toBe('1,536.00')
  })

  it('returns undefined and warns for invalid byte strings', () => {
    const warn = vi.spyOn(consola, 'warn').mockImplementation(() => {})

    expect(formatBytesConvert('wrong unit')).toBeUndefined()
    expect(warn).toHaveBeenCalled()
  })

  it('formats thousands and keeps unsupported text unchanged', () => {
    expect(formatThousands(1234567)).toBe('1,234,567')
    expect(formatThousands('1234.12MB')).toBe('1,234.12MB')
    expect(formatThousands('abc123')).toBe('abc123')
  })

  it('formats time from Date, second timestamp, date-only string and fallback', () => {
    expect(formatTime(new Date(2026, 0, 2, 3, 4, 5))).toBe('2026-01-02 03:04:05')
    expect(formatTime(1713926400, '{y}/{m}/{d}')).toBe('2024/04/24')
    expect(formatTime('2026-01-02', '{y}-{m}-{d} {h}:{i}:{s}')).toBe('2026-01-02 00:00:00')
    expect(formatTime('2026-07-28T02:21:53.169Z', '{y}')).toBe('2026')
    expect(formatTime('not-date', '{y}-{m}-{d}', 'invalid')).toBe('invalid')
  })

  it('formats duration with omitted zero-leading units', () => {
    expect(formatDurationTime(1162821)).toBe('19分22秒')
    expect(formatDurationTime(5 * 60 * 1000, '{i}分{s}秒')).toBe('05分00秒')
    expect(formatDurationTime(1000)).toBe('01秒')
  })

  it('formats fixed numbers with unit, prefix, suffix and thousands', () => {
    expect(formatToFixed('22.1', 2)).toBe('22.10')
    expect(formatToFixed('1234.5MB', { digit: 1, thousands: true })).toBe('1,234.5MB')
    expect(formatToFixed('22 TB', { digit: 2, unit: false, prefix: '$', suffix: '/s' })).toBe('$22.00/s')
    expect(formatToFixed('abc')).toBe('abc')
  })

  it('formats plain text to html while keeping non-strings unchanged', () => {
    expect(formatTextToHtml('第1行\n\t第2行')).toBe('第1行<br>&nbsp;&nbsp;&nbsp;&nbsp;第2行')
    expect(formatTextToHtml(null)).toBeNull()
  })
})
