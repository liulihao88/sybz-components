import { computed, toValue } from 'vue'
import type { ComputedRef, CSSProperties, MaybeRefOrGetter } from 'vue'
import { processWidth } from '@sybz-components/utils'
import type { SCommonProps } from '@/types/component-props'

export interface UseCommonPropsReturn {
  commonStyle: ComputedRef<CSSProperties>
  commonClass: ComputedRef<Record<string, boolean>>
}

const hasSizeValue = (value: string | number | undefined) => value !== undefined && value !== ''

const useCommonProps = (source: MaybeRefOrGetter<SCommonProps>): UseCommonPropsReturn => ({
  commonStyle: computed(() => {
    const { width, height, color, background } = toValue(source)

    return {
      width: hasSizeValue(width) ? processWidth(width, true) : undefined,
      height: hasSizeValue(height) ? processWidth(height, true) : undefined,
      color: color || undefined,
      background: background || undefined,
      '--s-common-color': color || undefined,
    } as CSSProperties
  }),
  commonClass: computed(() => ({
    's-common--hover-animation': Boolean(toValue(source).hoverAnimation),
  })),
})

export default useCommonProps
