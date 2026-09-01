import { computed, toValue } from 'vue'
import type { ComputedRef, CSSProperties, MaybeRefOrGetter } from 'vue'
import { processWidth } from '@sybz-components/utils'
import type { SWidthHeightProps } from '@/types/component-props'

const hasSizeValue = (value: string | number | undefined) => value !== undefined && value !== ''

const useWidthHeightStyle = (source: MaybeRefOrGetter<SWidthHeightProps>): ComputedRef<CSSProperties> =>
  computed(() => {
    const { width, height } = toValue(source)

    return {
      width: hasSizeValue(width) ? processWidth(width, true) : undefined,
      height: hasSizeValue(height) ? processWidth(height, true) : undefined,
    }
  })

export default useWidthHeightStyle
