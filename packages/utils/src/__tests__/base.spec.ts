import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { ref } from 'vue'
import {
  clearStorage,
  clone,
  debounce,
  getStorage,
  getType,
  isEmpty,
  merge,
  processWidth,
  random,
  setStorage,
  delay,
  throttle,
  toLine,
  tryCatch,
  mockValue,
  validate,
} from '../base'

describe('base utils', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('sets, gets and clears browser storage', () => {
    setStorage('token', 'abc123')
    setStorage('count', 12)
    setStorage('user', { id: 1, name: 'andy' }, true)

    expect(getStorage('token')).toBe('abc123')
    expect(getStorage('count')).toBe(12)
    expect(getStorage('user', true)).toEqual({ id: 1, name: 'andy' })

    clearStorage('token')
    expect(getStorage('token')).toBeNull()

    clearStorage({ exclude: ['count'] })
    expect(getStorage('count')).toBe(12)
    expect(getStorage('user', true)).toBeNull()

    clearStorage()
    expect(getStorage('count')).toBeNull()
  })

  it('checks empty values with strict and loose modes', () => {
    expect(isEmpty(null)).toBe(true)
    expect(isEmpty(undefined)).toBe(true)
    expect(isEmpty('   ')).toBe(true)
    expect(isEmpty([])).toBe(true)
    expect(isEmpty({})).toBe(true)
    expect(isEmpty(new Map())).toBe(true)
    expect(isEmpty(new Set())).toBe(true)
    expect(isEmpty(new Date('invalid'))).toBe(true)
    expect(isEmpty(0)).toBe(false)
    expect(isEmpty(0, false)).toBe(true)
    expect(isEmpty(false)).toBe(false)
    expect(isEmpty(false, false)).toBe(true)
  })

  it('merges objects while preserving non-empty values', () => {
    expect(merge({ name: '', age: 18, city: 'beijing' }, { name: 'andy', age: 20, city: '' })).toEqual({
      name: 'andy',
      age: 20,
      city: 'beijing',
    })
  })

  it('deep clones objects and repeats arrays', () => {
    const source = { user: { name: 'andy' } }
    const cloned = clone(source)

    expect(cloned).toEqual(source)
    expect(cloned).not.toBe(source)
    expect(cloned.user).not.toBe(source.user)
    expect(clone([1, { id: 2 }], 2)).toEqual([1, { id: 2 }, 1, { id: 2 }])
  })

  it('generates deterministic mockValue values for option arrays and number-like modes', () => {
    expect(mockValue([{ label: 'A', value: 'a' }], 4, { optionsIndex: 0 })).toBe('a')

    vi.spyOn(Math, 'random').mockReturnValue(0)
    expect(mockValue('number', 3)).toBe(111)
    expect(mockValue('ip')).toBe('10.0.11.1')
    expect(mockValue('port')).toBe(1)
  })

  it('returns lower-case raw types and converts names to separator case', () => {
    expect(getType([])).toBe('array')
    expect(getType(null)).toBe('null')
    expect(toLine('CompTitle')).toBe('comp-title')
    expect(toLine('CompTitle', '_')).toBe('comp_title')
  })

  it('normalizes width values', () => {
    expect(processWidth(200)).toEqual({ width: '200px' })
    expect(processWidth('50%', true)).toBe('50%')
    expect(processWidth('12rem')).toEqual({ width: '12rem' })
    expect(processWidth('auto')).toEqual({})
    expect(processWidth('auto', true)).toBe('')
  })

  it('validates values in pure mode and returns rule objects', () => {
    expect(validate('mobile', '13800138000', true)).toBe(true)
    expect(validate('email', 'wrong', true)).toBe(false)
    expect(validate('ip', '192.168.1.1', true)).toBe(true)
    expect(validate('required')).toEqual({
      required: true,
      message: '请输入',
      trigger: ['blur', 'change'],
    })
    expect(validate('自定义提示')).toEqual({
      required: true,
      message: '自定义提示',
      trigger: ['blur', 'change'],
    })
  })

  it('delays and invokes optional callback', async () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const promise = delay(100, fn)

    await vi.advanceTimersByTimeAsync(100)
    await expect(promise).resolves.toBeUndefined()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('wraps success and failure with tryCatch and toggles loading refs', async () => {
    const loading = ref(false)

    await expect(tryCatch(() => 'ok', loading)).resolves.toEqual({ data: 'ok', error: null })
    expect(loading.value).toBe(false)

    const error = new Error('fail')
    const result = await tryCatch(() => {
      throw error
    }, loading)

    expect(result.data).toBeNull()
    expect(result.error).toBe(error)
    expect(loading.value).toBe(false)
  })

  it('throttles repeated calls', async () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const throttled = throttle(fn, 100)

    throttled('first')
    throttled('second')
    throttled('third')

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('first')

    await vi.advanceTimersByTimeAsync(100)
    expect(fn).toHaveBeenCalledTimes(2)
    expect(fn).toHaveBeenLastCalledWith('third')
  })

  it('debounces repeated calls and supports immediate mode', async () => {
    vi.useFakeTimers()
    const fn = vi.fn((value: string) => value.toUpperCase())
    const debounced = debounce(fn, 100)
    const promise = debounced('sybz')

    await vi.advanceTimersByTimeAsync(100)
    await expect(promise).resolves.toBe('SYBZ')
    expect(fn).toHaveBeenCalledTimes(1)

    const immediateFn = vi.fn((value: string) => value)
    const immediateDebounced = debounce(immediateFn, 100, true)

    await expect(immediateDebounced('now')).resolves.toBe('now')
    expect(immediateFn).toHaveBeenCalledTimes(1)
  })

  it('returns random integer inside range', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5)
    expect(random(1, 3)).toBe(2)
  })
})
