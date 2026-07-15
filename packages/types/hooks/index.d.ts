import type { ComputedRef, Ref } from 'vue'
import type { ElementSize, MaybeComputedElementRef, UseResizeObserverOptions } from '@vueuse/core'

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

export interface UseFlexFillSizeOptions extends Omit<UseResizeObserverOptions, 'box'> {
  flex?: string
  overflow?: string
  box?: ResizeObserverBoxOptions
  initialSize?: ElementSize
}

export declare function useFlexFillSize(
  target: MaybeComputedElementRef,
  options?: UseFlexFillSizeOptions,
): {
  width: Ref<number>
  height: Ref<number>
  stop: () => void
}

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
