import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { ref } from 'vue'
import { consola } from 'consola'

const elementPlusMocks = vi.hoisted(() => {
  const message = vi.fn()
  return {
    message,
    closeAll: vi.fn(),
    confirm: vi.fn(() => Promise.resolve('confirm')),
  }
})

vi.mock('element-plus', () => ({
  ElMessage: Object.assign(elementPlusMocks.message, {
    closeAll: elementPlusMocks.closeAll,
  }),
  ElMessageBox: {
    confirm: elementPlusMocks.confirm,
    install: {},
  },
}))

import {
  $toast,
  clearStorage,
  clone,
  configureUtils,
  confirm,
  copy,
  debounce,
  getStorage,
  getType,
  getUtilsBuildTime,
  getVariable,
  isEmpty,
  log,
  merge,
  processWidth,
  random,
  setStorage,
  delay,
  test,
  throttle,
  toLine,
  tryCatch,
  mockValue,
  validate,
  validateForm,
  validateOnSubmit,
} from '../base'

describe('base utils', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
    configureUtils({ theme: 'default' })
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
    expect(processWidth(0)).toEqual({ width: '0px' })
    expect(processWidth(0, true)).toBe('0px')
    expect(processWidth('0', true)).toBe('0px')
    expect(processWidth('50%', true)).toBe('50%')
    expect(processWidth('12rem')).toEqual({ width: '12rem' })
    expect(processWidth('auto')).toEqual({})
    expect(processWidth('auto', true)).toBe('')
  })

  it('validates values in pure mode and returns rule objects', () => {
    expect(validate('mobile', '13800138000', true)).toBe(true)
    expect(validate('email', 'wrong', true)).toBe(false)
    expect(validate('ip', '192.168.1.1', true)).toBe(true)
    expect(validate({ type: 'custom', reg: /^sybz$/, value: 'sybz' }, true)).toBe(true)
    expect(validate('required')).toEqual({
      required: true,
      message: '请输入',
      trigger: ['blur', 'change'],
    })
    expect(validate('change', { required: false, message: '请选择项目' })).toEqual({
      required: false,
      message: '请选择项目',
      trigger: ['blur', 'change'],
    })
    expect(validate('自定义提示')).toEqual({
      required: true,
      message: '自定义提示',
      trigger: ['blur', 'change'],
    })
  })

  it('creates submit-only validation rules and supports pure validation', () => {
    expect(validateOnSubmit('required')).toEqual({
      required: true,
      message: '请输入',
      trigger: [],
    })
    expect(validateOnSubmit({ type: 'mobile', value: '13800138000' }, true)).toBe(true)
  })

  it('wraps form validation as a promise', async () => {
    const successForm = {
      validate(callback: (valid: boolean, status: Record<string, unknown>) => void) {
        callback(true, { name: 'ok' })
      },
    }

    await expect(validateForm(ref(successForm))).resolves.toEqual({ name: 'ok' })

    const errorStatus = { name: [{ message: '请输入名称' }] }
    const failForm = {
      validate(callback: (valid: boolean, status: Record<string, unknown>) => void) {
        callback(false, errorStatus)
      },
    }

    await expect(validateForm(failForm, { showMessage: false })).rejects.toBe(errorStatus)
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

    await expect(tryCatch(Promise.resolve('promise-ok'))).resolves.toEqual({ data: 'promise-ok', error: null })
    await expect(tryCatch(() => 'ok', loading)).resolves.toEqual({ data: 'ok', error: null })
    expect(loading.value).toBe(false)

    const error = new Error('fail')
    const result = await tryCatch(() => {
      throw error
    }, loading)

    expect(result.data).toBeNull()
    expect(result.error).toBe(error)
    expect(loading.value).toBe(false)

    const warn = vi.spyOn(consola, 'warn').mockImplementation(() => {})
    await tryCatch(() => 'ok', { value: false } as any)
    expect(warn).toHaveBeenCalledWith('Cannot modify non-ref sendLoading directly!')
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

  it('supports throttle leading and trailing options', async () => {
    vi.useFakeTimers()
    const leadingFalseFn = vi.fn()
    const leadingFalse = throttle(leadingFalseFn, 100, { leading: false })

    leadingFalse('first')
    leadingFalse('second')

    expect(leadingFalseFn).not.toHaveBeenCalled()

    await vi.advanceTimersByTimeAsync(100)
    expect(leadingFalseFn).toHaveBeenCalledTimes(1)
    expect(leadingFalseFn).toHaveBeenLastCalledWith('second')

    const trailingFalseFn = vi.fn()
    const trailingFalse = throttle(trailingFalseFn, 100, { trailing: false })

    trailingFalse('first')
    trailingFalse('second')

    await vi.advanceTimersByTimeAsync(100)
    expect(trailingFalseFn).toHaveBeenCalledTimes(1)
    expect(trailingFalseFn).toHaveBeenLastCalledWith('first')
  })

  it('supports throttle cancel, flush and result callback', async () => {
    vi.useFakeTimers()
    const resultCallback = vi.fn()
    const fn = vi.fn((value: string) => value.toUpperCase())
    const throttled = throttle(fn, 100, {}, resultCallback)

    expect(throttled('first')).toBe('FIRST')
    expect(resultCallback).toHaveBeenLastCalledWith('FIRST')

    throttled('second')
    expect(throttled.flush()).toBe('SECOND')
    expect(fn).toHaveBeenCalledTimes(2)
    expect(resultCallback).toHaveBeenLastCalledWith('SECOND')

    throttled('third')
    throttled.cancel()

    await vi.advanceTimersByTimeAsync(100)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('debounces repeated calls and supports immediate mode', async () => {
    vi.useFakeTimers()
    const resultCallback = vi.fn()
    const fn = vi.fn((value: string) => value.toUpperCase())
    const debounced = debounce(fn, 100, false, resultCallback)
    const promise = debounced('sybz')

    await vi.advanceTimersByTimeAsync(100)
    await expect(promise).resolves.toBe('SYBZ')
    expect(fn).toHaveBeenCalledTimes(1)
    expect(resultCallback).toHaveBeenCalledWith('SYBZ')

    const immediateFn = vi.fn((value: string) => value)
    const immediateDebounced = debounce(immediateFn, 100, true)

    await expect(immediateDebounced('now')).resolves.toBe('now')
    expect(immediateFn).toHaveBeenCalledTimes(1)
  })

  it('supports debounce cancel', async () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const debounced = debounce(fn, 100)

    debounced('skip')
    debounced.cancel()

    await vi.advanceTimersByTimeAsync(100)
    expect(fn).not.toHaveBeenCalled()
  })

  it('returns random integer inside range', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5)
    expect(random(1, 3)).toBe(2)
  })

  it('normalizes toast calls and shortcuts', () => {
    $toast('保存成功', 's', { closeAll: true, duration: 1000 })
    expect(elementPlusMocks.closeAll).toHaveBeenCalledTimes(1)
    expect(elementPlusMocks.message).toHaveBeenLastCalledWith({
      message: '保存成功',
      type: 'success',
      closeAll: true,
      duration: 1000,
      customClass: 's-antd-message',
    })

    $toast({ message: '原生样式', type: 'warning', customClass: 'el' })
    expect(elementPlusMocks.message).toHaveBeenLastCalledWith({
      message: '原生样式',
      type: 'warning',
      customClass: '',
    })

    $toast.error('失败')
    expect(elementPlusMocks.message).toHaveBeenLastCalledWith({
      message: '失败',
      type: 'error',
      customClass: 's-antd-message',
    })
  })

  it('copies text and optionally hides toast', () => {
    const execCommand = vi.fn()
    Object.defineProperty(document, 'execCommand', {
      value: execCommand,
      configurable: true,
    })

    expect(copy('复制内容')).toBe(true)
    expect(execCommand).toHaveBeenCalledWith('copy')
    expect(elementPlusMocks.message).toHaveBeenLastCalledWith({
      message: '复制内容复制成功',
      type: 'success',
      customClass: 's-antd-message',
    })

    elementPlusMocks.message.mockClear()
    expect(copy('静默复制', { hideToast: true })).toBe(true)
    expect(elementPlusMocks.message).not.toHaveBeenCalled()
  })

  it('logs refs and plain values through consola', () => {
    const logger = vi.spyOn(consola, 'log').mockImplementation(() => {})

    log('count', ref(1))
    log('data', { id: 1 })

    expect(logger).toHaveBeenCalledTimes(2)
  })

  it('opens confirm with default, theme and append target options', async () => {
    const appendTarget = document.createElement('div')
    appendTarget.id = 'dialogRoot'
    document.body.appendChild(appendTarget)

    await expect(confirm('确认删除？', { theme: 'chenghua', appendTo: 'dialogRoot' })).resolves.toBe('confirm')
    expect(elementPlusMocks.confirm).toHaveBeenLastCalledWith(
      '确认删除？',
      expect.objectContaining({
        title: '提示',
        draggable: true,
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        dangerouslyUseHTMLString: true,
        appendTo: appendTarget,
        customClass: 's-message-box--chenghua',
        confirmButtonClass: 's-message-box__confirm-btn s-message-box__confirm-btn--chenghua',
        cancelButtonClass: 's-message-box__cancel-btn s-message-box__cancel-btn--chenghua',
      }),
    )
  })

  it('uses the global utils theme and allows a call to override it', async () => {
    configureUtils({ theme: 'shijingshan' })

    $toast('全局主题')
    expect(elementPlusMocks.message).toHaveBeenLastCalledWith({
      message: '全局主题',
      type: 'success',
      customClass: 's-antd-message s-antd-message--shijingshan',
    })

    $toast({ message: '单次覆盖', theme: 'chenghua' })
    expect(elementPlusMocks.message).toHaveBeenLastCalledWith({
      message: '单次覆盖',
      customClass: 's-antd-message s-antd-message--chenghua',
    })

    await confirm('使用全局主题')
    expect(elementPlusMocks.confirm).toHaveBeenLastCalledWith(
      '使用全局主题',
      expect.objectContaining({
        customClass: 's-message-box--shijingshan',
        confirmButtonClass: 's-message-box__confirm-btn s-message-box__confirm-btn--shijingshan',
      }),
    )

    await confirm('关闭全局主题', { theme: 'default' })
    expect(elementPlusMocks.confirm).toHaveBeenLastCalledWith(
      '关闭全局主题',
      expect.objectContaining({
        customClass: '',
        confirmButtonClass: 's-message-box__confirm-btn',
      }),
    )
  })

  it('applies delete variant defaults and escapes the target', async () => {
    await expect(
      confirm({
        variant: 'delete',
        target: '<机器之心>',
        theme: 'shijingshan',
      }),
    ).resolves.toBe('confirm')

    expect(elementPlusMocks.confirm).toHaveBeenLastCalledWith(
      '确认要删除<code type="danger">&lt;机器之心&gt;</code>吗？删除后不可恢复。',
      expect.objectContaining({
        title: '删除确认',
        confirmButtonText: '删除',
        customClass: 's-message-box--shijingshan s-message-box--delete',
      }),
    )
  })

  it('supports a numeric delete target', async () => {
    await expect(confirm({ variant: 'delete', target: 2 })).resolves.toBe('confirm')

    expect(elementPlusMocks.confirm).toHaveBeenLastCalledWith(
      '确认要删除<code type="danger">2</code>吗？删除后不可恢复。',
      expect.objectContaining({
        title: '删除确认',
        confirmButtonText: '删除',
      }),
    )
  })

  it('reads css variables and reports utils build time fallback', () => {
    document.documentElement.style.setProperty('--sybz-test-color', '#1677ff')

    expect(getVariable('--sybz-test-color')).toBe('#1677ff')
    expect(getVariable('--sybz-missing-color', 'fallback')).toBe('fallback')
    expect(getUtilsBuildTime()).toBe('未注入')
    expect(getUtilsBuildTime('fallback-time')).toBe('fallback-time')
    expect(test()).toBe('build time: 未注入')
  })
})
