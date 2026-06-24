import { computed, isRef, ref, unref, watch } from 'vue'
import type { ComputedRef, Ref } from 'vue'

type MaybeRef<T> = T | Ref<T>

export interface UsePaginationOptions {
  page?: number
  pageSize?: number
  total?: MaybeRef<number>
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

const normalizeInteger = (value: unknown, fallback: number, min = 1) => {
  const numberValue = Number(value)

  if (!Number.isFinite(numberValue)) return fallback

  return Math.max(min, Math.floor(numberValue))
}

const usePagination = (options: UsePaginationOptions = {}): UsePaginationReturn => {
  const initialPage = normalizeInteger(options.page, 1)
  const initialPageSize = normalizeInteger(options.pageSize, 10)

  const page = ref(initialPage)
  const pageSize = ref(initialPageSize)
  const total = ref(normalizeInteger(unref(options.total) ?? 0, 0, 0))
  const pageSizes = options.pageSizes ?? [10, 20, 30, 50, 100]

  const pageCount = computed(() => Math.max(1, Math.ceil(total.value / pageSize.value)))
  const offset = computed(() => (page.value - 1) * pageSize.value)
  const limit = computed(() => pageSize.value)
  const clampPage = (value: number) => Math.min(normalizeInteger(value, 1), pageCount.value)

  const setPage = (value: number) => {
    page.value = clampPage(value)
  }
  const setPageSize = (value: number) => {
    pageSize.value = normalizeInteger(value, initialPageSize)

    if (options.resetPageOnPageSizeChange !== false) {
      page.value = 1
    } else {
      setPage(page.value)
    }
  }
  const setTotal = (value: number) => {
    total.value = normalizeInteger(value, 0, 0)
    setPage(page.value)
  }
  const resetPage = () => {
    page.value = 1
  }
  const reset = () => {
    pageSize.value = initialPageSize
    setPage(initialPage)
  }

  if (isRef(options.total)) {
    watch(options.total, setTotal)
  }

  setPage(page.value)

  watch([pageSize, total], () => {
    setPage(page.value)
  })

  return {
    page,
    pageSize,
    total,
    pageSizes,
    pageCount,
    offset,
    limit,
    setPage,
    setPageSize,
    setTotal,
    resetPage,
    reset,
  }
}

export default usePagination
