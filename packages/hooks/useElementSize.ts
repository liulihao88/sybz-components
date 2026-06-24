import { computed, isRef, onBeforeUnmount, onMounted, ref, unref, watch } from 'vue'
import type { ComputedRef, Ref } from 'vue'

type MaybeRef<T> = T | Ref<T>
type SizeTarget = HTMLElement | SVGElement | null | undefined

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

const useElementSize = (target: MaybeRef<SizeTarget>, options: UseElementSizeOptions = {}): UseElementSizeReturn => {
  const width = ref(options.initialWidth ?? 0)
  const height = ref(options.initialHeight ?? 0)
  let observer: ResizeObserver | undefined

  const cleanup = () => {
    observer?.disconnect()
    observer = undefined
  }

  const updateSize = (element: SizeTarget) => {
    if (!element) return

    const rect = element.getBoundingClientRect()

    width.value = rect.width
    height.value = rect.height
  }

  const observe = (element: SizeTarget) => {
    cleanup()

    if (!element) return

    updateSize(element)

    if (typeof ResizeObserver === 'undefined') return

    observer = new ResizeObserver((entries) => {
      const entry = entries[0]

      if (!entry) return

      const boxSize = Array.isArray(entry.contentBoxSize) ? entry.contentBoxSize[0] : entry.contentBoxSize

      if (boxSize) {
        width.value = boxSize.inlineSize
        height.value = boxSize.blockSize
      } else {
        updateSize(element)
      }
    })
    if (options.box) {
      observer.observe(element, { box: options.box })
    } else {
      observer.observe(element)
    }
  }

  onMounted(() => {
    observe(unref(target))
  })

  if (isRef(target)) {
    watch(target, observe, { flush: 'post' })
  }

  onBeforeUnmount(cleanup)

  const size = computed(() => ({
    width: width.value,
    height: height.value,
  }))

  return {
    width,
    height,
    size,
  }
}

export default useElementSize
