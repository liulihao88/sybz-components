<template>
  <el-descriptions
    ref="descriptionsRef"
    v-bind="{ border: true, ...$attrs }"
    :column="descriptionColumn"
    :label-width="labelWidth2"
    class="s-descriptions"
    :class="descriptionsClass"
  >
    <slot>
      <el-descriptions-item v-for="(item, index) in mergedProps.options ?? []" :key="index" v-bind="item.attrs">
        <template #label>
          <template v-if="item.labelRender">
            <render-comp :render="item.labelRender" v-bind="getRenderProps(item, index)" />
          </template>
          <template v-else-if="item.labelSlot">
            <slot
              :name="item.labelSlot"
              :item="item"
              :label="parseLabel(item)"
              :value="parseValue(item, index)"
              :index="index"
            ></slot>
          </template>
          <template v-else-if="!mergedProps.showAll">
            <s-tooltip :content="parseLabel(item)" v-bind="item.labelAttrs"></s-tooltip>
          </template>
          <template v-else>
            {{ parseLabel(item) }}
          </template>
        </template>

        <template v-if="item.render">
          <render-comp :render="item.render" v-bind="getRenderProps(item, index)" />
        </template>
        <template v-else-if="item.valueSlot">
          <slot
            :name="item.valueSlot"
            :item="item"
            :label="parseLabel(item)"
            :value="parseValue(item, index)"
            :index="index"
          ></slot>
        </template>
        <template v-else>
          <template v-if="mergedProps.showAll">
            <render-comp
              v-if="isRenderableContent(getValueContent(item, index))"
              :render="() => getValueContent(item, index)"
              v-bind="getRenderProps(item, index)"
            />
            <template v-else>
              {{ getTooltipContent(item, index) }}
            </template>
          </template>
          <render-comp
            v-else-if="isRenderableContent(getValueContent(item, index))"
            :render="() => getValueContent(item, index)"
            v-bind="getRenderProps(item, index)"
          />
          <s-tooltip
            v-else
            class="s-descriptions__tooltip"
            :content="getTooltipContent(item, index)"
            v-bind="item.valueAttrs"
          ></s-tooltip>
        </template>
      </el-descriptions-item>
    </slot>
  </el-descriptions>
</template>

<script setup lang="ts">
import RenderComp from '@/components/common/renderComp.vue'
import { computed, nextTick, onMounted, ref, useAttrs, watch, isVNode } from 'vue'
import { ElDescriptions, ElDescriptionsItem } from 'element-plus'
import { processWidth } from '@sybz-components/utils'
import STooltip from '@/components/tooltip/src/index.vue'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'
import type { RenderFunction } from '@/components/common/render'
import type { ComponentPublicInstance } from 'vue'

defineOptions({
  name: 'SDescriptions',
})

const attrs = useAttrs()

type DescriptionsProps = {
  options: ItemOptions[]
  theme?: 'default' | 'chenghua' | 'shijingshan'
  column?: number
  labelWidth?: any
  showAll?: boolean
  label?: string
  value?: string
}

type ItemOptions = {
  [key: string]: any
  label?: string
  value?: any
  labelSlot?: string
  valueSlot?: string
  labelRender?: RenderFunction<ItemOptions, ItemOptions>
  render?: RenderFunction<ItemOptions, ItemOptions>
  filter?: (context: FilterContext) => any
  attrs?: Record<string, any>
  labelAttrs?: Record<string, any>
  valueAttrs?: Record<string, any>
}

type FilterContext = {
  row: ItemOptions
  index: number
  value: any
  label: any
}

const props = withDefaults(defineProps<DescriptionsProps>(), {
  theme: 'default',
  column: 3,
  labelWidth: 'auto',
  showAll: false,
  label: 'label',
  value: 'value',
})
const mergedProps = useGlobalComponentConfig('descriptions', props)

const getOptionField = (item: ItemOptions, key: string, fallbackKey: string) => {
  if (Object.prototype.hasOwnProperty.call(item, key)) {
    return item[key]
  }
  return item[fallbackKey]
}

const parseLabel = (item: ItemOptions) => getOptionField(item, mergedProps.value.label || 'label', 'label') ?? ''

const getRawValue = (item: ItemOptions) => getOptionField(item, mergedProps.value.value || 'value', 'value')

const getFilterContext = (item: ItemOptions, index: number): FilterContext => {
  return {
    row: item,
    index,
    value: getRawValue(item),
    label: parseLabel(item),
  }
}

const parseValue = (item: ItemOptions, index: number) => {
  const value = getRawValue(item)
  if (item.filter) {
    return item.filter(getFilterContext(item, index))
  } else {
    return value
  }
}

const getRenderItem = (item: ItemOptions, index: number) => ({
  ...item,
  label: parseLabel(item),
  value: parseValue(item, index),
})

const getRenderProps = (item: ItemOptions, index: number) => {
  const renderItem = getRenderItem(item, index)

  return {
    item: renderItem,
    row: renderItem,
    column: renderItem,
    value: renderItem.value,
    label: renderItem.label,
    index,
    extra: {
      label: renderItem.label,
    },
  }
}

const descriptionsRef = ref<ComponentPublicInstance | null>(null)
const autoLabelWidth = ref('auto')
let measureCanvas: HTMLCanvasElement | undefined

// 标签额外宽度补偿值，兜底左右 padding 24px
const LABEL_EXTRA_WIDTH = 24
const LABEL_SAFE_WIDTH = 8

const isAutoLabelWidth = computed(
  () =>
    mergedProps.value.labelWidth === 'auto' ||
    mergedProps.value.labelWidth === '' ||
    mergedProps.value.labelWidth === undefined ||
    mergedProps.value.labelWidth === null,
)

const getDescriptionsElement = () => descriptionsRef.value?.$el as HTMLElement | undefined

const getMeasureContext = () => {
  if (typeof document === 'undefined') return null

  measureCanvas ??= document.createElement('canvas')
  return measureCanvas.getContext('2d')
}

const getLabelMeasureStyle = () => {
  if (typeof window === 'undefined') {
    return {
      font: '600 14px sans-serif',
      extraWidth: LABEL_EXTRA_WIDTH,
    }
  }

  const labelElement = getDescriptionsElement()?.querySelector<HTMLElement>('.el-descriptions__label')
  if (!labelElement) {
    return {
      font: '600 14px sans-serif',
      extraWidth: LABEL_EXTRA_WIDTH,
    }
  }

  const style = window.getComputedStyle(labelElement)
  const paddingLeft = Number.parseFloat(style.paddingLeft) || 0
  const paddingRight = Number.parseFloat(style.paddingRight) || 0

  return {
    font: style.font || `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`,
    extraWidth: paddingLeft + paddingRight || LABEL_EXTRA_WIDTH,
  }
}

const getLabelExtraWidth = (labelElement: HTMLElement) => {
  if (typeof window === 'undefined') return LABEL_EXTRA_WIDTH

  const style = window.getComputedStyle(labelElement)
  const paddingLeft = Number.parseFloat(style.paddingLeft) || 0
  const paddingRight = Number.parseFloat(style.paddingRight) || 0
  const borderLeft = Number.parseFloat(style.borderLeftWidth) || 0
  const borderRight = Number.parseFloat(style.borderRightWidth) || 0

  return paddingLeft + paddingRight + borderLeft + borderRight || LABEL_EXTRA_WIDTH
}

const getRenderedLabelWidth = () => {
  const labelElements = getDescriptionsElement()?.querySelectorAll<HTMLElement>('.el-descriptions__label')
  if (!labelElements?.length) return 0

  return Array.from(labelElements).reduce((maxWidth, labelElement) => {
    const tooltipText = labelElement.querySelector<HTMLElement>('.s-tooltip-box__text')
    const contentWidth = tooltipText
      ? tooltipText.scrollWidth
      : labelElement.scrollWidth - getLabelExtraWidth(labelElement)

    return Math.max(maxWidth, contentWidth + getLabelExtraWidth(labelElement))
  }, 0)
}

const updateAutoLabelWidth = async () => {
  if (!isAutoLabelWidth.value) return

  await nextTick()

  const renderedLabelWidth = getRenderedLabelWidth()
  if (renderedLabelWidth) {
    autoLabelWidth.value = `${Math.ceil(renderedLabelWidth + LABEL_SAFE_WIDTH)}px`
    return
  }

  const context = getMeasureContext()
  if (!context) {
    autoLabelWidth.value = 'auto'
    return
  }

  const { font, extraWidth } = getLabelMeasureStyle()
  context.font = font

  const maxLabelWidth = (mergedProps.value.options ?? []).reduce((maxWidth, item) => {
    const label = parseLabel(item)
    const labelWidth = context.measureText(label === null || label === undefined ? '' : String(label)).width
    return Math.max(maxWidth, labelWidth)
  }, 0)

  autoLabelWidth.value = maxLabelWidth ? `${Math.ceil(maxLabelWidth + extraWidth + LABEL_SAFE_WIDTH)}px` : 'auto'
}

const labelWidth2 = computed(() => {
  if (isAutoLabelWidth.value) {
    return autoLabelWidth.value
  }

  if (mergedProps.value.labelWidth && mergedProps.value.labelWidth !== 'auto') {
    return processWidth(mergedProps.value.labelWidth, true)
  }

  return 'auto'
})

const descriptionColumn = computed(() => mergedProps.value.column)

const parseContent = (value: any) => {
  if (typeof value === 'function') {
    return value()
  } else {
    return value
  }
}

const getValueContent = (item: ItemOptions, index: number) => parseContent(parseValue(item, index))

const isRenderableContent = (value: any) => {
  return isVNode(value) || (Array.isArray(value) && value.some((item) => isVNode(item)))
}

const getTooltipContent = (item: ItemOptions, index: number) => {
  const value = getValueContent(item, index)
  return value === null || value === undefined ? '' : String(value)
}

const getTextAlign = computed(() => {
  return attrs.direction === 'vertical' ? 'left' : 'right'
})

const descriptionsClass = computed(() => ({
  's-descriptions--chenghua': mergedProps.value.theme === 'chenghua',
  's-descriptions--shijingshan': mergedProps.value.theme === 'shijingshan',
}))

watch(() => [mergedProps.value.options, mergedProps.value.label, mergedProps.value.labelWidth], updateAutoLabelWidth, {
  deep: true,
  flush: 'post',
})

onMounted(() => {
  updateAutoLabelWidth()

  if (typeof document !== 'undefined' && document.fonts?.ready) {
    document.fonts.ready.then(updateAutoLabelWidth)
  }
})
</script>

<style scoped lang="scss">
.s-descriptions__tooltip {
  width: 100%;
}

.s-descriptions {
  :deep(.el-descriptions__body),
  :deep(.el-descriptions__table) {
    table-layout: fixed;
    .el-descriptions__table:not(.is-bordered) .el-descriptions__cell {
      display: flex;
    }
  }

  :deep(.el-descriptions__table) tr:has(td.is-bordered) {
    display: flex;
  }

  :deep(.el-descriptions__label) {
    width: v-bind(labelWidth2);
    min-width: v-bind(labelWidth2);
    text-align: v-bind(getTextAlign);
  }

  // 当labelWidth为auto时的样式处理
  :deep(.el-descriptions__label.auto-width) {
    width: auto;
    flex-shrink: 0;
  }

  :deep(.el-descriptions__content) {
    width: calc((100% - v-bind(labelWidth2) * v-bind(descriptionColumn)) / v-bind(descriptionColumn));
    min-width: 100px;
  }

  /* 去掉选择器中的空格 */
  :deep(.el-descriptions__table tr:last-child .el-descriptions__content:last-child) {
    flex: 1;
    min-width: 100px;
  }
}
</style>
