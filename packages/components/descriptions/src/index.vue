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
      <el-descriptions-item v-for="(option, index) in mergedProps.options ?? []" :key="index" v-bind="option.attrs">
        <template #label>
          <template v-if="option.labelRender">
            <descriptions-render :render="option.labelRender" :context="getRenderProps(option, index)" />
          </template>
          <template v-else-if="option.labelSlot">
            <slot
              :name="option.labelSlot"
              :option="option"
              :label="parseLabel(option)"
              :value="parseValue(option, index)"
              :index="index"
            ></slot>
          </template>
          <template v-else-if="!mergedProps.showAll">
            <s-tooltip :content="parseLabel(option)" v-bind="option.labelAttrs"></s-tooltip>
          </template>
          <template v-else>
            {{ parseLabel(option) }}
          </template>
        </template>

        <template v-if="option.render">
          <descriptions-render :render="option.render" :context="getRenderProps(option, index)" />
        </template>
        <template v-else-if="option.valueSlot">
          <slot
            :name="option.valueSlot"
            :option="option"
            :label="parseLabel(option)"
            :value="parseValue(option, index)"
            :index="index"
          ></slot>
        </template>
        <template v-else>
          <template v-if="mergedProps.showAll">
            <descriptions-render
              v-if="isRenderableContent(getValueContent(option, index))"
              :render="() => getValueContent(option, index)"
              :context="getRenderProps(option, index)"
            />
            <template v-else>
              {{ getTooltipContent(option, index) }}
            </template>
          </template>
          <descriptions-render
            v-else-if="isRenderableContent(getValueContent(option, index))"
            :render="() => getValueContent(option, index)"
            :context="getRenderProps(option, index)"
          />
          <s-tooltip
            v-else
            class="s-descriptions__tooltip"
            :content="getTooltipContent(option, index)"
            v-bind="option.valueAttrs"
          ></s-tooltip>
        </template>
      </el-descriptions-item>
    </slot>
  </el-descriptions>
</template>

<script setup lang="ts">
import { computed, defineComponent, isVNode, nextTick, onMounted, ref, useAttrs, watch } from 'vue'
import { ElDescriptions, ElDescriptionsItem } from 'element-plus'
import { processWidth } from '@sybz-components/utils'
import STooltip from '@/components/tooltip/src/index.vue'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'
import type { ComponentPublicInstance, PropType, VNodeChild } from 'vue'

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
  labelRender?: (context: RenderContext) => VNodeChild
  render?: (context: RenderContext) => VNodeChild
  filter?: (context: FilterContext) => any
  attrs?: Record<string, any>
  labelAttrs?: Record<string, any>
  valueAttrs?: Record<string, any>
}

type FilterContext = {
  option: ItemOptions
  index: number
  value: any
  label: any
}

type RenderContext = FilterContext

const DescriptionsRender = defineComponent({
  name: 'SDescriptionsRender',
  props: {
    render: {
      type: Function as PropType<(context: RenderContext) => VNodeChild>,
      required: true,
    },
    context: {
      type: Object as PropType<RenderContext>,
      required: true,
    },
  },
  setup(props) {
    return () => props.render(props.context)
  },
})

const props = withDefaults(defineProps<DescriptionsProps>(), {
  theme: 'default',
  column: 3,
  labelWidth: 'auto',
  showAll: false,
  label: 'label',
  value: 'value',
})
const mergedProps = useGlobalComponentConfig('descriptions', props)

const getOptionField = (option: ItemOptions, key: string, fallbackKey: string) => {
  if (Object.prototype.hasOwnProperty.call(option, key)) {
    return option[key]
  }
  return option[fallbackKey]
}

const parseLabel = (option: ItemOptions) => getOptionField(option, mergedProps.value.label || 'label', 'label') ?? ''

const getRawValue = (option: ItemOptions) => getOptionField(option, mergedProps.value.value || 'value', 'value')

const getFilterContext = (option: ItemOptions, index: number): FilterContext => {
  return {
    option,
    index,
    value: getRawValue(option),
    label: parseLabel(option),
  }
}

const parseValue = (option: ItemOptions, index: number) => {
  const value = getRawValue(option)
  if (option.filter) {
    return option.filter(getFilterContext(option, index))
  } else {
    return value
  }
}

const getRenderOption = (option: ItemOptions, index: number) => ({
  ...option,
  label: parseLabel(option),
  value: parseValue(option, index),
})

const getRenderProps = (option: ItemOptions, index: number): RenderContext => {
  const renderOption = getRenderOption(option, index)

  return {
    option: renderOption,
    value: renderOption.value,
    label: renderOption.label,
    index,
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

  const maxLabelWidth = (mergedProps.value.options ?? []).reduce((maxWidth, option) => {
    const label = parseLabel(option)
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

const getValueContent = (option: ItemOptions, index: number) => parseContent(parseValue(option, index))

const isRenderableContent = (value: any) => {
  return isVNode(value) || (Array.isArray(value) && value.some((item) => isVNode(item)))
}

const getTooltipContent = (option: ItemOptions, index: number) => {
  const value = getValueContent(option, index)
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
