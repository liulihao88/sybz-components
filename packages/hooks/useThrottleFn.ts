import { getCurrentInstance, onBeforeUnmount } from 'vue'

type AnyFunction = (...args: any[]) => any

export interface UseThrottleFnOptions {
  leading?: boolean
  trailing?: boolean
}

export type ThrottledFunction<T extends AnyFunction> = ((...args: Parameters<T>) => ReturnType<T> | undefined) & {
  cancel: () => void
  flush: () => ReturnType<T> | undefined
}

const useThrottleFn = <T extends AnyFunction>(
  fn: T,
  wait = 300,
  options: UseThrottleFnOptions = {},
): ThrottledFunction<T> => {
  let timer: ReturnType<typeof setTimeout> | undefined
  let previous = 0
  let lastArgs: Parameters<T> | undefined
  let lastThis: ThisParameterType<T> | undefined
  let result: ReturnType<T> | undefined

  const leading = options.leading !== false
  const trailing = options.trailing !== false

  const cancel = () => {
    if (timer) {
      clearTimeout(timer)
      timer = undefined
    }

    previous = 0
    lastArgs = undefined
    lastThis = undefined
  }

  const invoke = () => {
    if (!lastArgs) return result

    previous = Date.now()
    const args = lastArgs
    const context = lastThis

    lastArgs = undefined
    lastThis = undefined
    result = fn.apply(context, args)
    return result
  }

  const throttled = function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const now = Date.now()

    if (!previous && !leading) {
      previous = now
    }

    const remaining = wait - (now - previous)

    lastArgs = args
    lastThis = this

    if (remaining <= 0 || remaining > wait) {
      if (timer) {
        clearTimeout(timer)
        timer = undefined
      }

      return invoke()
    }

    if (!timer && trailing) {
      timer = setTimeout(() => {
        timer = undefined

        if (!leading) {
          previous = 0
        }

        invoke()
      }, remaining)
    }

    return result
  } as ThrottledFunction<T>

  throttled.cancel = cancel
  throttled.flush = invoke

  if (getCurrentInstance()) {
    onBeforeUnmount(cancel)
  }

  return throttled
}

export default useThrottleFn
