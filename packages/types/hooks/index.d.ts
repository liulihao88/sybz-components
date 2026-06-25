import type { ComputedRef, Ref } from 'vue'

export interface UseBooleanReturn {
  state: Ref<boolean>
  set: (value: boolean) => void
  setTrue: () => void
  setFalse: () => void
  toggle: () => void
}

export declare function useBoolean(initialValue?: boolean): UseBooleanReturn

export declare function useClickOutside(
  elementRef: Ref<undefined | HTMLElement>,
  callback: (e: MouseEvent) => void,
): void

export type DebouncedFunction<T extends (...args: any[]) => any> = ((
  ...args: Parameters<T>
) => ReturnType<T> | undefined) & {
  cancel: () => void
  flush: () => ReturnType<T> | undefined
}

export declare function useDebounceFn<T extends (...args: any[]) => any>(fn: T, wait?: number): DebouncedFunction<T>

export interface UseElementSizeOptions {
  initialWidth?: number
  initialHeight?: number
  box?: ResizeObserverBoxOptions
}

export interface UseElementSizeReturn {
  width: Ref<number>
  height: Ref<number>
  size: ComputedRef<{
    width: number
    height: number
  }>
}

export declare function useElementSize(
  target: HTMLElement | SVGElement | null | undefined | Ref<HTMLElement | SVGElement | null | undefined>,
  options?: UseElementSizeOptions,
): UseElementSizeReturn

export declare function useEventListener(
  target: Ref<EventTarget | null> | EventTarget,
  event: string,
  handler: (e: Event) => any,
): void

export declare const GLOBAL_COMPONENT_CONFIG_KEY = 'GLOBAL_COMPONENT_CONFIG'
export declare const GLOBAL_COMPONENT_COMMON_PROPS_KEY = '__globalProps'

export declare function useGlobalComponentConfig<T extends Record<string, any>>(
  componentKey: string,
  props: T,
): ComputedRef<T & Record<string, any>>

export interface UseLoadingReturn {
  loading: Ref<boolean>
  setLoading: (value: boolean) => void
  startLoading: () => void
  stopLoading: () => void
  withLoading: <T>(handler: () => T | Promise<T>) => Promise<T>
}

export declare function useLoading(initialValue?: boolean): UseLoadingReturn

export interface UsePaginationOptions {
  page?: number
  pageSize?: number
  total?: number | Ref<number>
  pageSizes?: number[]
  resetPageOnPageSizeChange?: boolean
}

export interface UsePaginationReturn {
  page: Ref<number>
  pageSize: Ref<number>
  total: Ref<number>
  pageSizes: number[]
  pageCount: ComputedRef<number>
  offset: ComputedRef<number>
  limit: ComputedRef<number>
  setPage: (value: number) => void
  setPageSize: (value: number) => void
  setTotal: (value: number) => void
  resetPage: () => void
  reset: () => void
}

export declare function usePagination(options?: UsePaginationOptions): UsePaginationReturn

export interface UseThrottleFnOptions {
  leading?: boolean
  trailing?: boolean
}

export type ThrottledFunction<T extends (...args: any[]) => any> = ((
  ...args: Parameters<T>
) => ReturnType<T> | undefined) & {
  cancel: () => void
  flush: () => ReturnType<T> | undefined
}

export declare function useThrottleFn<T extends (...args: any[]) => any>(
  fn: T,
  wait?: number,
  options?: UseThrottleFnOptions,
): ThrottledFunction<T>

export interface UseZIndexReturn {
  currentZIndex: ComputedRef<number>
  nextZIndex: () => number
  initialZIndex: Ref<number>
}

export declare function useZIndex(initialValue?: number): UseZIndexReturn
