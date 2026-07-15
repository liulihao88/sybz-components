import {
  unrefElement,
  useElementSize as useVueUseElementSize,
  type ElementSize,
  type MaybeComputedElementRef,
  type UseResizeObserverOptions,
} from '@vueuse/core'
import { watch } from 'vue'

export interface UseFlexFillSizeOptions extends Omit<UseResizeObserverOptions, 'box'> {
  flex?: string
  overflow?: string
  box?: ResizeObserverBoxOptions
  initialSize?: ElementSize
}

export function useFlexFillSize(target: MaybeComputedElementRef, options: UseFlexFillSizeOptions = {}) {
  const {
    flex = '1 1 0',
    overflow = 'hidden',
    initialSize = { width: 0, height: 0 },
    box = 'border-box',
    ...observerOptions
  } = options

  watch(
    () => unrefElement(target),
    (element, _, onCleanup) => {
      if (!(element instanceof HTMLElement)) return

      const original = {
        flex: element.style.flex,
        minHeight: element.style.minHeight,
        minWidth: element.style.minWidth,
        overflow: element.style.overflow,
      }

      element.style.flex = flex
      element.style.minHeight = '0'
      element.style.minWidth = '0'
      element.style.overflow = overflow

      const applied = {
        flex: element.style.flex,
        minHeight: element.style.minHeight,
        minWidth: element.style.minWidth,
        overflow: element.style.overflow,
      }

      onCleanup(() => {
        if (element.style.flex === applied.flex) element.style.flex = original.flex
        if (element.style.minHeight === applied.minHeight) element.style.minHeight = original.minHeight
        if (element.style.minWidth === applied.minWidth) element.style.minWidth = original.minWidth
        if (element.style.overflow === applied.overflow) element.style.overflow = original.overflow
      })
    },
    { immediate: true, flush: 'post' },
  )

  return useVueUseElementSize(target, initialSize, {
    ...observerOptions,
    box,
  })
}

export default useFlexFillSize
