import { getCurrentInstance, onBeforeUnmount } from 'vue'

type AnyFunction = (...args: any[]) => any

export type DebouncedFunction<T extends AnyFunction> = ((...args: Parameters<T>) => ReturnType<T> | undefined) & {
  cancel: () => void
  flush: () => ReturnType<T> | undefined
}

const useDebounceFn = <T extends AnyFunction>(fn: T, wait = 300): DebouncedFunction<T> => {
  let timer: ReturnType<typeof setTimeout> | undefined
  let lastArgs: Parameters<T> | undefined
  let lastThis: ThisParameterType<T> | undefined
  let result: ReturnType<T> | undefined

  const cancel = () => {
    if (timer) {
      clearTimeout(timer)
      timer = undefined
    }

    lastArgs = undefined
    lastThis = undefined
  }

  const invoke = () => {
    if (!lastArgs) return result

    const args = lastArgs
    const context = lastThis

    cancel()
    result = fn.apply(context, args)
    return result
  }

  const debounced = function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    lastArgs = args
    lastThis = this

    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(invoke, wait)
    return result
  } as DebouncedFunction<T>

  debounced.cancel = cancel
  debounced.flush = invoke

  if (getCurrentInstance()) {
    onBeforeUnmount(cancel)
  }

  return debounced
}

export default useDebounceFn
