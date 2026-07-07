<template>
  <div
    class="s-select"
    :style="selectStyle"
    :class="[
      sizeClass,
      themeClass,
      {
        'has-title': mergedProps.title,
        'has-quick': mergedProps.showQuick && !parseDisabled && sOptions.length > 0,
        'is-multiple': multiple,
        'has-custom-height': mergedProps.height,
      },
    ]"
  >
    <s-comp-title v-bind="compTitleProps" />
    <el-tooltip
      v-bind="mergedTooltipAttrs"
      :content="selectTooltipContent"
      :disabled="!mergedProps.showTooltip || selectTooltipDisabled"
      :visible="selectTooltipVisible"
      :persistent="false"
      transition="s-select-tooltip-no-transition"
    >
      <div class="s-select__tooltip-trigger" @mouseleave="hideSelectTooltip" @mouseover="updateSelectTooltip">
        <el-select
          ref="selectRef"
          v-model="childSelectedValue"
          class="s-select__select"
          :class="isEmpty(sOptions, true) && emptyColor ? 's-select__empty' : ''"
          :placeholder="selectPlaceholder"
          :popper-class="selectPopperClass"
          :multiple="multiple"
          v-bind="selectAttrs"
          @clear="hideSelectTooltip"
          @change="changeHandler"
        >
          <template v-if="mergedProps.showPrefix" #prefix>
            <slot name="prefix">
              <span v-if="Array.isArray(childSelectedValue)" class="s-select__fraction">
                <span class="s-select__fraction-text">{{ childSelectedValue.length }}</span>
                <span class="s-select__fraction-line"></span>
                <span class="s-select__fraction-text">{{ sOptions.length }}</span>
              </span>
              <span v-else class="s-select__fraction-text s-select__fraction-text--absolute">
                {{ sOptions.length }}
              </span>
            </slot>
          </template>
          <template v-if="$slots.label" #label="arg">
            <slot name="label" v-bind="arg" />
          </template>
          <template v-for="(arg, name, index) in noDefaultSlots" #[name]>
            <slot :name="name" v-bind="arg" :index="index" />
          </template>

          <div v-if="multiple && mergedProps.showAll" class="s-select__bulk-actions">
            <el-checkbox
              v-model="selectChecked"
              :indeterminate="indeterminate"
              class="s-select__all-select"
              @change="selectAll"
            >
              <div class="s-select__all-select-label">全选</div>
            </el-checkbox>
            <el-button type="primary" size="small" class="reverse-select" @click.stop="reverseSelect">反选</el-button>
          </div>

          <el-option
            v-for="(item, index) in sOptions"
            :key="getOptionKey(item, index)"
            :label="getOptionLabel(item)"
            :value="getOptionValue(item)"
            :disabled="itemDisabled(item, index, sOptions)"
          >
            <slot :options="sOptions" :item="item" />
          </el-option>
        </el-select>
      </div>
    </el-tooltip>

    <span v-if="mergedProps.showQuick && !parseDisabled && sOptions.length > 0" class="s-select__select-box">
      <span class="s-select__select-box__inner">
        <s-icon name="ArrowUp" :size="quickIconSize" @click="quickSelect(false)" />
        <div class="s-select__divider" />
        <s-icon name="ArrowDown" :size="quickIconSize" @click="quickSelect(true)" />
      </span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, useAttrs, watch, useSlots, computed, nextTick } from 'vue'
import { processWidth, isEmpty } from '@sybz-components/utils'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'

defineOptions({
  name: 'SSelect',
})
const attrs = useAttrs()
const emits = defineEmits(['changeSelect', 'update:modelValue', 'change'])
const slots = useSlots()
const noDefaultSlots = computed<Record<string, any>>(() => {
  const copySlots = { ...slots } as Record<string, any>
  delete copySlots.default
  delete copySlots.label
  return copySlots
})

interface SelectProps {
  modelValue?: any[] | string | number
  value?: string
  label?: string | string[]
  options?: any[]
  type?: string
  multiple?: boolean
  showAll?: boolean
  showPrefix?: boolean
  showQuick?: boolean
  size?: string
  theme?: 'default' | 'chenghua' | 'shijingshan'
  title?: string
  compTitleStyle?: Record<string, any>
  connect?: string
  customLabel?: ((...args: any[]) => any) | string
  width?: string | number
  height?: string | number
  disPlaceholder?: string
  itemDisabled?: (...args: any[]) => any
  url?: string | ((...args: any[]) => any)
  urlParams?: Record<string, any>
  optionsExpression?: string
  emptyColor?: boolean
  showTooltip?: boolean
  tooltipAttrs?: Record<string, any>
  dangerouslyUseHTMLString?: boolean
}

const props = withDefaults(defineProps<SelectProps>(), {
  modelValue: undefined,
  value: 'value',
  label: 'label',
  options: () => [],
  // 是简单的options 还是复杂options。默认复杂
  type: '', // 简单选项'simple',
  // 是否多选
  multiple: false,
  showAll: true,
  showPrefix: false,
  showQuick: true,
  size: '',
  theme: 'default',
  title: '',
  compTitleStyle: undefined,

  // 如果label显示多个参数的连接符
  connect: '/',
  // 自定义label显示多个参数的函数
  customLabel: '',
  width: '',
  height: '',
  // placeholder在disabled的情况下是不显示的. 如果想要在这种情况下显示placeholder, 那么就用这个属性
  disPlaceholder: '',
  itemDisabled: () => {},
  url: '',
  urlParams: () => ({}),
  optionsExpression: '',
  emptyColor: false,
  showTooltip: true,
  tooltipAttrs: () => ({}),
  dangerouslyUseHTMLString: false,
})
const mergedProps = useGlobalComponentConfig('select', props)
const compTitleProps = computed(() => {
  const titleProps: Record<string, any> = {
    title: mergedProps.value.title,
    size: mergedProps.value.size || undefined,
    theme: mergedProps.value.theme,
  }

  if (mergedProps.value.compTitleStyle !== undefined) {
    titleProps.compTitleStyle = mergedProps.value.compTitleStyle
  }

  return titleProps
})

type SelectOption = Record<string, any> | string | number | boolean
type SelectModelValue = any[] | string | number | undefined

const sOptions = ref<SelectOption[]>(props.options)

watch(
  () => props.options,
  (val) => {
    sOptions.value = val
  },
  {
    deep: true,
    immediate: true,
  },
)

const disOptions = computed(() => {
  return sOptions.value.filter((...rest) => {
    return !props.itemDisabled(...rest)
  })
})

const selectRef = ref<{ $el?: HTMLElement; $emit?: (...args: any[]) => void } | null>(null)
const selectTooltipContent = ref('')
const selectTooltipDisabled = ref(true)
const selectTooltipVisible = ref(false)
const mergedTooltipAttrs = computed(() => {
  const {
    dangerouslyUseHTMLString,
    rawContent,
    'raw-content': rawContentKebab,
    ...tooltipAttrs
  } = mergedProps.value.tooltipAttrs ?? {}
  const htmlStringEnabled = mergedProps.value.dangerouslyUseHTMLString ?? dangerouslyUseHTMLString

  return {
    placement: 'top',
    effect: 'dark',
    ...tooltipAttrs,
    rawContent: Boolean(htmlStringEnabled || rawContent || rawContentKebab),
  }
})

const selectAttrs = computed<Record<string, any>>(() => {
  const nextAttrs = Object.entries(attrs).reduce<Record<string, any>>((obj, [key, value]) => {
    if (!['class', 'style', 'popper-class', 'popperClass'].includes(key)) {
      obj[key] = value
    }
    return obj
  }, {})

  return {
    clearable: true,
    filterable: true,
    size: mergedProps.value.size || undefined,
    ...nextAttrs,
  }
})

const hideSelectTooltip = () => {
  selectTooltipVisible.value = false
  selectTooltipDisabled.value = true
}

// vue3 v-model简写
const childSelectedValue = computed<SelectModelValue>({
  get() {
    // 如果是多选, 且props.modelValue是空, 那么返回空数组.
    if (isEmpty(props.modelValue, true) && props.multiple) {
      return []
    }
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  },
})
const isRecordOption = (item: SelectOption): item is Record<string, any> => {
  return item !== null && typeof item === 'object' && !Array.isArray(item)
}

const getModelValueArray = () => {
  return Array.isArray(props.modelValue) ? props.modelValue : []
}

const getOptionProp = (item: SelectOption, prop: string | undefined) => {
  if (!prop || !isRecordOption(item)) {
    return undefined
  }
  return item[prop]
}

const handleDifValue = (item: SelectOption) => {
  return props.type === 'simple' ? item : getOptionProp(item, props.value)
}

const getOptionValue = (item: SelectOption) => handleDifValue(item)

const getOptionLabel = (item: SelectOption): string | number => {
  const label = props.type === 'simple' ? item : handleLabel(item)
  return typeof label === 'number' || typeof label === 'string' ? label : String(label ?? '')
}

const getOptionKey = (item: SelectOption, index: number) => {
  const value = getOptionValue(item)
  return typeof value === 'number' || typeof value === 'string' ? value : index
}

const parseDisabled = computed(() => {
  // 检查直接传入的disabled属性
  const directDisabled = attrs.disabled === '' || !!attrs.disabled

  // 查找祖先组件是否有disabled状态
  let ancestorDisabled = false
  let parent = getCurrentInstance()?.parent
  while (parent && !ancestorDisabled) {
    // 检查父组件实例是否有disabled属性
    if (parent.props?.disabled !== undefined && parent.type?.name) {
      ancestorDisabled = parent.props.disabled === '' || !!parent.props.disabled
    }
    // 检查父组件类型是否为禁用状态的容器（如form）
    if (parent.type?.name === 'ElForm' && parent.props?.disabled) {
      ancestorDisabled = true
    }
    parent = parent.parent
  }

  return directDisabled || ancestorDisabled
})

// 设置半选
const indeterminate = computed({
  get() {
    const _deval = props.modelValue
    if (!Array.isArray(_deval)) return false
    return _deval.length !== disOptions.value.length && _deval.length !== 0
  },
  set(val) {
    return Boolean(val)
  },
})
// 设置全选
const selectChecked = computed({
  get() {
    const _deval = props.modelValue
    return Array.isArray(_deval) && _deval.length === disOptions.value.length
  },
  set(val) {
    return Boolean(val)
  },
})
// 点击全选
const selectAll = (val: any) => {
  if (val) {
    const selectedAllValue = disOptions.value.map((item) => {
      return handleDifValue(item)
    })
    changeMulty(selectedAllValue)
  } else {
    changeMulty([])
  }
}

// 反选
const reverseSelect = () => {
  const noSelectedValue = disOptions.value
    .filter((v) => {
      return !getModelValueArray().includes(handleDifValue(v))
    })
    .map((v) => handleDifValue(v))
  changeMulty(noSelectedValue)
}

const mergedSize = computed(() => mergedProps.value.size || 'default')
const sizeClass = computed(() => {
  return `s-select--${mergedSize.value}`
})
const quickIconBaseSize = computed(() => (mergedSize.value === 'small' ? 10 : 14))
const quickIconSize = computed(() => 'var(--s-select-quick-icon-size)')
const getCompactIconSize = (height: string) => {
  const heightNumber = Number.parseFloat(height)

  if (!Number.isNaN(heightNumber) && height.endsWith('px')) {
    return `${Math.max(4, Math.min(quickIconBaseSize.value, (heightNumber - 2) / 2))}px`
  }

  return `clamp(4px, calc((${height} - 2px) / 2), ${quickIconBaseSize.value}px)`
}
const selectStyle = computed(() => {
  const style: Record<string, any> = {
    ...processWidth(mergedProps.value.width),
    '--s-select-quick-icon-size': `${quickIconBaseSize.value}px`,
  }

  if (mergedProps.value.height) {
    const selectHeight = processWidth(mergedProps.value.height, true)
    style.height = selectHeight
    style.minHeight = selectHeight
    style['--s-select-min-height'] = selectHeight
    style['--el-input-height'] = selectHeight
    style['--s-select-title-font-size'] = `clamp(8px, calc(${selectHeight} - 8px), 14px)`
    style['--s-select-quick-icon-size'] = getCompactIconSize(selectHeight)
  }

  return style
})
const themeClass = computed(() => {
  if (mergedProps.value.theme === 'chenghua') return 's-select--chenghua'
  if (mergedProps.value.theme === 'shijingshan') return 's-select--shijingshan'
  return ''
})
const inheritedPopperClass = computed(() => {
  return [attrs['popper-class'], attrs.popperClass].filter((item) => typeof item === 'string' && item.trim()).join(' ')
})
const selectPopperClass = computed(() => {
  return [
    's-select__multiple-checkbox',
    inheritedPopperClass.value,
    mergedProps.value.theme === 'chenghua' ? 's-select__popper--chenghua' : '',
    mergedProps.value.theme === 'shijingshan' ? 's-select__popper--shijingshan' : '',
  ]
    .filter(Boolean)
    .join(' ')
})

const selectPlaceholder = computed(() => {
  let res = attrs.disabled ? mergedProps.value.disPlaceholder : attrs.placeholder || '请选择'
  return typeof res === 'string' ? res : String(res ?? '')
})

const getTooltipTarget = () => {
  if (props.multiple) {
    return null
  }
  const selectEl = selectRef.value?.$el
  if (!selectEl) {
    return null
  }
  return selectEl.querySelector('.el-select__placeholder:not(.is-transparent)')
}

const updateSelectTooltip = async () => {
  if (!mergedProps.value.showTooltip) {
    hideSelectTooltip()
    return
  }

  await nextTick()
  const target = getTooltipTarget() as HTMLElement | null
  const content = target?.textContent?.replace(/\s+/g, ' ').trim() || ''
  const canShow = !!target && !!content && target.scrollWidth > target.clientWidth

  if (!canShow) {
    hideSelectTooltip()
    return
  }

  selectTooltipContent.value = content
  selectTooltipDisabled.value = false
  selectTooltipVisible.value = true
}
// 将label作为多个值连接起来。 比如 admin/管理员, 这是两个属性拼接出来的
function handleLabel(item: SelectOption) {
  // 如果customLabel是函数就执行customLabel的函数去处理label显示
  if (typeof props.customLabel === 'function') {
    return props.customLabel(item)
  } else {
    // 如果label是数组, 就拼接数组。
    if (Array.isArray(props.label)) {
      let str = ''
      props.label.forEach((v) => {
        str += getOptionProp(item, v) + props.connect
      })
      let res = str.slice(0, -1)
      return res
    } else {
      // 直接显示label
      return getOptionProp(item, props.label)
    }
  }
}

const quickSelect = (isPlus: boolean) => {
  if (disOptions.value.length === 0 || attrs.disabled === '' || !!attrs.disabled === true) {
    return
  }
  let nextIdx = 0
  if (isEmpty(props.modelValue, true) || (props.multiple === true && getModelValueArray().length > 1)) {
    nextIdx = 0
  } else {
    let nowIdx = disOptions.value.findIndex((v) => {
      if (props.multiple === true) {
        return handleDifValue(v) === getModelValueArray()[0]
      } else {
        return handleDifValue(v) === props.modelValue
      }
    })
    nextIdx = nowIdx + (isPlus ? 1 : -1)
    if (nextIdx === disOptions.value.length) {
      nextIdx = 0
    }
    if (nextIdx < 0) {
      nextIdx = disOptions.value.length - 1
    }
  }
  let getValue = handleDifValue(disOptions.value[nextIdx])
  if (props.multiple === true) {
    selectRef.value?.$emit?.('change', [getValue])
  } else {
    selectRef.value?.$emit?.('change', getValue)
  }
}

// 处理多选的返回情况
function changeMulty(item: any[]) {
  let selectLabel = []
  const selectObj = sOptions.value.filter((v) => {
    if (item.includes(handleDifValue(v))) {
      selectLabel.push(Array.isArray(props.label) ? handleLabel(v) : getOptionProp(v, props.label))
      return true
    } else {
      return false
    }
  })
  _commonEmits(item, selectLabel, selectObj)
}
// 有些场景， 下拉框不仅需要获取value, 还需要获取选择的对象或者label, el-select原生没有这个属性， 所以changeHandler就做了下处理， 返回的数组包含3个属性， 第一个value, 第二个选中对象， 第三个选中的label。
function changeHandler(item: any) {
  hideSelectTooltip()
  // 如果val是数组, 证明是多选
  if (Array.isArray(item)) {
    changeMulty(item)
    return
  }
  if (isEmpty(item, true)) {
    _commonEmits('', '', '')
    return
  }
  let selectObj = sOptions.value.filter((v) => {
    if (props.type === 'simple') {
      return v === item
    } else {
      return getOptionProp(v, props.value) === item
    }
  })[0]
  let selectLabel = Array.isArray(props.label) ? handleLabel(selectObj) : getOptionProp(selectObj, props.label)
  _commonEmits(item, selectLabel, selectObj)
}
function _commonEmits(item, selectLabel, selectObj) {
  emits('changeSelect', item, selectLabel, selectObj)
  emits('update:modelValue', item)
  emits('change', item)
}
</script>

<style lang="scss" scoped>
.s-select {
  --s-select-min-height: var(--el-component-size, 32px);
  --s-select-title-font-size: 14px;
  --s-select-quick-icon-size: 14px;
  display: inline-flex;
  width: 316px;
  height: 100%;
  min-height: var(--s-select-min-height);
  align-items: stretch;
  vertical-align: bottom;

  .s-select__fraction {
    display: inline-flex;
    min-width: 16px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 1;
    font-size: 12px;
    position: absolute;
    left: 1px;
  }

  .s-select__fraction-text {
    display: block;
    line-height: 1;
    font-size: 12px;
    color: var(--el-disabled-text-color);
  }

  .s-select__fraction-line {
    width: 100%;
    height: 1px;
    margin: 1px 0;
    background: currentColor;
    opacity: 0.6;
  }

  .s-select__tooltip-trigger {
    display: flex;
    flex: 1;
    height: 100%;
    min-width: 0;
  }
  :deep(.el-select) {
    flex: 1;
    height: 100%;
    min-height: inherit;
  }

  :deep(.el-select__wrapper) {
    height: 100%;
    min-height: var(--s-select-min-height);
    padding-top: 0;
    padding-bottom: 0;
  }

  :deep(.el-select__selection),
  :deep(.el-select__selected-item) {
    min-height: 0;
  }

  :deep(.el-select__placeholder) {
    line-height: 1;
  }

  :deep(.el-select__suffix) {
    height: 100%;
    align-items: center;
  }

  :deep(.s-comp-title) {
    height: var(--s-select-min-height) !important;
    min-height: var(--s-select-min-height) !important;
    font-size: var(--s-select-title-font-size) !important;
    line-height: 1 !important;
  }

  :deep(.el-input__inner) {
    border-radius: 0px 2px 2px 0 !important;
  }

  .s-select__empty {
    :deep(.el-select__wrapper) {
      box-shadow: 0 0 0 1px var(--red) inset;
    }
  }

  &.is-multiple:not(.has-custom-height) {
    height: auto;

    .s-select__tooltip-trigger,
    :deep(.el-select),
    :deep(.el-select__wrapper) {
      height: auto;
    }

    :deep(.el-select__wrapper) {
      padding-top: 2px;
      padding-bottom: 2px;
    }

    :deep(.s-comp-title) {
      height: auto !important;
      align-self: stretch;
    }
  }
}

.s-select__fraction-text--absolute {
  position: absolute;
  left: 1px;
}

.s-select__bulk-actions {
  position: relative;
}

.s-select__all-select-label {
  margin-top: 8px;
}

.s-select__divider {
  width: 100%;
  height: 1px;
  flex: 0 0 1px;
  background: var(--line);
}
.has-title {
  :deep(.el-select__wrapper) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
.has-quick {
  :deep(.el-select__wrapper) {
    border-top-right-radius: 0;
    gap: 0;
    border-bottom-right-radius: 0;
  }
}

.s-select__multiple-checkbox.is-multiple .el-select-dropdown__item {
  &.selected::after {
    left: 21px;
    z-index: 10;
    width: 16px;
    height: 16px;
    border: 1px solid var(--primary);
    border-radius: 2px;
    color: var(--el-color-white);
    top: 50%;
    transform: translateY(-50%);
    line-height: 16px;
    text-align: center;
  }
  .el-checkbox__inner {
    width: 16px;
    height: 16px;
  }
  &.selected .el-checkbox__label {
    color: var(--primary);
  }
  &.hover {
    background-color: var(--el-color-primary-light-9);
    border-radius: 1px;
  }
  &.is-disabled {
    &.selected::after {
      background: var(--el-disabled-text-color);
      border: 1px solid var(--el-disabled-text-color);
    }
    .el-checkbox,
    .el-checkbox__label,
    .el-checkbox__inner {
      color: var(--el-disabled-text-color);
      border-color: var(--el-disabled-text-color) !important;
    }
  }
}
:deep(.el-input__wrapper) {
  background: var(--primary);
  & .el-input__inner {
    color: var(--el-color-white) !important;
  }
}
.s-select__all-select {
  display: flex;
  padding: 0px 0px 10px 20px;
  align-items: flex-end;
  &:hover {
    background-color: var(--el-fill-color-light);
  }
}
.s-select__all-select:hover + .el-select-dropdown__item {
  background-color: unset;
}
.reverse-select {
  position: absolute;
  right: 16px;
  top: 4px;
}
.s-select__select-box {
  background: var(--el-fill-color-light);
  vertical-align: middle;
  position: relative;
  border: 1px solid var(--el-border-color);
  border-left: none;
  white-space: nowrap;
  width: 14px;
  min-height: var(--s-select-min-height);
  align-self: stretch;
  box-sizing: border-box;
  overflow: hidden;
  cursor: pointer;
  border-radius: 0px 2px 2px 0px;
  align-items: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--el-color-info);
  .s-select__select-box__inner {
    display: flex;
    height: 100%;
    min-height: 100%;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: stretch;
    overflow: hidden;

    > .s-icon {
      width: 100%;
      flex: 1 1 0;
      min-height: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: var(--s-select-quick-icon-size) !important;
    }

    > .s-icon:hover {
      color: var(--blue);
      background: var(--el-color-primary-light-9);
    }
    .s-icon + .s-icon {
      margin-left: 0;
    }
  }
}

.s-select--small {
  --s-select-min-height: var(--el-component-size-small, 24px);
}

.s-select--large {
  --s-select-min-height: var(--el-component-size-large, 40px);
}
</style>
