<template>
  <div class="s-input" v-bind="mergedProps.subAttrs" :style="mergedStyle" :class="inputClass">
    <el-tooltip :content="'' + data" :disabled="inWidth || mergedProps.hideTooltip" v-bind="mergedProps.tooltipAttrs">
      <div class="s-input__main">
        <el-autocomplete
          v-if="mergedProps.options"
          :model-value="data"
          :fetch-suggestions="querySearch"
          :placeholder="handlePlaceholder()"
          :clearable="$attrs.clearable !== false"
          v-bind="mergedAttrs"
          @mouseover="inputOnMouseOver($event)"
          @update:model-value="handleInputUpdate"
        >
          <template v-if="$attrs.title || $slots.prepend" #prepend>
            <slot v-if="$slots.prepend" name="prepend" />
            <div v-else :style="{ ...computedBoxStyle }" class="s-input__title">
              {{ $attrs.title }}
            </div>
          </template>
        </el-autocomplete>

        <el-input
          v-else
          :model-value="data"
          :placeholder="handlePlaceholder()"
          class="kd-ipt"
          :show-password="showPassword"
          :class="{ 'kd-textarea': $attrs.type === 'textarea' }"
          v-bind="mergedAttrs"
          :show-word-limit="handleShowWordLimit()"
          @focus="focusHandler($event)"
          @mouseover="inputOnMouseOver($event)"
          @update:model-value="handleInputUpdate"
        >
          <template v-if="$attrs.title || $slots.prepend" #prepend>
            <slot v-if="$slots.prepend" name="prepend" />
            <div v-else :style="{ ...computedBoxStyle }" class="s-input__title">
              {{ $attrs.title }}
            </div>
          </template>
          <!-- 插槽默认内容 -->
          <slot />

          <!-- 前缀插槽 -->
          <template v-if="$slots.prefix" #prefix>
            <slot name="prefix" />
          </template>

          <!-- 后缀插槽 -->
          <template v-if="$slots.suffix" #suffix>
            <slot name="suffix" />
          </template>

          <!-- 后置插槽 -->
          <template v-if="$slots.append" #append>
            <slot name="append" />
          </template>
        </el-input>
      </div>
    </el-tooltip>
    <s-icon
      v-if="mergedProps.content"
      class="s-input__icon"
      v-bind="{ name: 'warning', color: 'var(--el-disabled-text-color)', size: '16px', ...mergedProps.iconAttrs }"
      :content="mergedProps.content"
      :dangerously-use-h-t-m-l-string="mergedProps.dangerouslyUseHTMLString"
    />

    <s-icon
      v-if="$attrs.type === 'textarea' && data && !($attrs.disabled === true || $attrs.disabled === '')"
      name="circle-close"
      class="s-input__clear"
      @click="clearTextareaValue"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, useAttrs, watch } from 'vue'
import { useVModel } from '@vueuse/core'
import { processWidth, getType, $toast } from '@sybz-components/utils'
import { inputProps } from 'element-plus/es/components/input'
import type { InputPropsPublic } from 'element-plus/es/components/input'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'
const attrs = useAttrs()

defineOptions({
  name: 'SInput',
  inheritAttrs: false,
})

type InputSize = NonNullable<InputPropsPublic['size']>

const normalizeInputSize = (size: unknown): InputSize | undefined => {
  if (!inputProps.size.validator?.(size)) {
    return undefined
  }

  return size ? (size as InputSize) : undefined
}

interface SInputProps {
  modelValue: any
  boxStyle?: Record<string, any>
  width?: string | number
  height?: string | number
  maxlength?: string | number
  hideMaxLengthError?: boolean
  maxLengthErrorText?: string
  size?: InputSize | ''
  theme?: '' | 'chenghua'
  showWordLimit?: boolean | string
  block?: boolean
  disPlaceholder?: string
  subAttrs?: Record<string, any>
  tooltipAttrs?: Record<string, any>
  iconAttrs?: Record<string, any>
  hideTooltip?: boolean
  options?: any[]
  content?: string
  dangerouslyUseHTMLString?: boolean
}

const props = withDefaults(defineProps<SInputProps>(), {
  boxStyle: () => ({}),
  width: '100%',
  height: '',
  maxlength: undefined,
  hideMaxLengthError: false,
  maxLengthErrorText: '',
  size: '',
  theme: '',
  showWordLimit: '',
  block: false,
  // placeholder在disabled的情况下是不显示的. 如果想要在这种情况下显示placeholder, 那么就用这个属性
  disPlaceholder: '',
  subAttrs: () => ({}),
  tooltipAttrs: () => ({}),
  iconAttrs: () => ({}),
  hideTooltip: false,
  // 适用于el-autocomplete
  options: undefined,
  content: '',
  dangerouslyUseHTMLString: false,
})
const mergedProps = useGlobalComponentConfig('input', props)
const restaurants = ref([])
const inWidth = ref(true)
const lastMaxLengthToastTime = ref(0)
const data = useVModel(props)

const inputClass = computed(() => [
  attrs.class,
  {
    'has-content': mergedProps.value.content,
    's-input--chenghua': mergedProps.value.theme === 'chenghua',
  },
])

const normalizedMaxLength = computed(() => {
  const maxLength = Number(mergedProps.value.maxlength ?? mergedProps.value.maxLength)
  return Number.isFinite(maxLength) && maxLength > 0 ? maxLength : 0
})

const maxLengthErrorMessage = computed(
  () => mergedProps.value.maxLengthErrorText || `输入长度不能超过${normalizedMaxLength.value}`,
)

const resolveMaxLengthValue = (value: unknown) => {
  if (value === null || value === undefined || !normalizedMaxLength.value) return value

  const text = String(value)

  if (text.length <= normalizedMaxLength.value) return value

  const nextValue = text.slice(0, normalizedMaxLength.value)

  if (!mergedProps.value.hideMaxLengthError) {
    const now = Date.now()

    if (now - lastMaxLengthToastTime.value > 800) {
      $toast.error(maxLengthErrorMessage.value)
      lastMaxLengthToastTime.value = now
    }
  }

  return nextValue
}

const handleInputUpdate = (value: unknown) => {
  data.value = resolveMaxLengthValue(value)
}

watch(
  () => mergedProps.value.options,
  (val) => {
    if (!val) {
      return
    }
    restaurants.value = val.map((v) => {
      if (getType(v) === 'object') {
        return v
      } else {
        return {
          value: v,
        }
      }
    })
  },
  {
    deep: true,
    immediate: true,
  },
)

const computedBoxStyle = computed(() => {
  if (mergedProps.value.boxStyle?.width) {
    let minusWidth = parseInt(mergedProps.value.boxStyle.width) - 8 + 'px'
    return {
      ...mergedProps.value.boxStyle,
      width: processWidth(minusWidth, true),
    }
  } else {
    return mergedProps.value.boxStyle
  }
})

function handlePlaceholder(): string {
  if (attrs.disabled === '' || attrs.disabled === true) {
    return mergedProps.value.disPlaceholder
  }

  return typeof attrs.placeholder === 'string' ? attrs.placeholder : '请输入'
}
// 是否显示showWordLimit属性
function handleShowWordLimit() {
  if (typeof mergedProps.value.showWordLimit === 'boolean') {
    return mergedProps.value.showWordLimit
  }
  if (attrs.type === 'textarea') {
    return true
  }
  return false
}
// 如果是密码输入框, focus直接选中文本
function focusHandler(evt) {
  if (attrs.type === 'password') {
    evt.target.select()
  }
}
function inputOnMouseOver(event) {
  const target = event.target
  if (target.offsetWidth + 4 < target.scrollWidth) {
    inWidth.value = false
  } else {
    inWidth.value = true
  }
}

const handleSize = () => {
  const sizeStyle: Record<string, any> = {}

  if (mergedProps.value.width) {
    sizeStyle.width = processWidth(mergedProps.value.width, true)
  }

  if (mergedProps.value.height) {
    const inputHeight = processWidth(mergedProps.value.height, true)
    sizeStyle.height = inputHeight
    sizeStyle['--s-input-height'] = inputHeight
    sizeStyle['--el-input-height'] = inputHeight
  }

  return sizeStyle
}
const clearTextareaValue = () => {
  data.value = ''
}

const showPassword = computed(() => {
  if (attrs.type === 'password' && attrs.showPassword !== false) {
    return true
  }
  return false
})

// 新增对el-auto-complete的支持
const querySearch = (queryString, cb) => {
  const results = queryString ? restaurants.value.filter(createFilter(queryString)) : restaurants.value
  cb(results)
}

const createFilter = (queryString: string) => {
  return (v) => {
    return v.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
  }
}

const mergedAttrs = computed(() => {
  const baseAttrs: Record<string, any> & { size?: InputSize } = {
    resize: 'none',
    rows: 2,
    clearable: true,
    size: normalizeInputSize(mergedProps.value.size),
  }
  const merged = {
    ...baseAttrs,
    ...Object.entries(attrs).reduce(
      (obj, [key, value]) => {
        if (key !== 'class' && key !== 'style' && key !== 'maxlength' && key !== 'max-length' && key !== 'size') {
          obj[key] = value
        }
        return obj
      },
      {} as Record<string, any>,
    ),
  }
  return merged
})

const mergedStyle = computed(() => {
  // ensure both parts are objects before spreading to avoid TS spread errors
  const size = handleSize()
  return {
    ...(typeof size === 'object' && size ? size : {}),
    ...(typeof attrs.style === 'object' && attrs.style ? attrs.style : {}),
  }
})
</script>

<style lang="scss" scoped>
.s-input {
  position: relative;
  display: inline-block;
  width: 100%;

  .s-input__main {
    width: 100%;
    height: 100%;
  }

  :deep(.el-autocomplete),
  :deep(.el-input),
  :deep(.el-textarea) {
    height: 100%;
  }

  :deep(.el-input__wrapper) {
    min-height: var(--s-input-height, var(--el-input-height));
  }

  :deep(.el-textarea__inner) {
    min-height: var(--s-input-height, auto);
  }

  &.has-content {
    .s-input__main {
      width: calc(100% - 32px);
    }
  }

  // el-input的宽度会随着鼠标移入显示clearable而改变, 所以加下面这两行代码
  :deep(.el-input__suffix:not(.el-select .el-input__suffix)) {
    margin-left: -22px;
  }

  :deep(.el-input__inner:not(.el-select .el-input__inner)) {
    margin-right: 22px;
  }

  :deep(.el-textarea__inner) {
    padding-bottom: 20px;
  }

  :deep(.el-input-group__prepend),
  :deep(.el-input-group__append) {
    padding: 0 4px;
  }

  .s-input__icon {
    position: absolute;
    top: 8px;
    right: 8px;
  }

  &:hover {
    .s-input__clear {
      display: block;
    }
  }

  .s-input__title {
    text-align: center;
  }
}

.s-input__clear {
  position: absolute;
  right: 8px;
  bottom: calc(50% - 6px);
  display: none;
  width: 14px;
  height: 14px;
  color: var(--45);
  cursor: pointer;

  &:hover {
    color: var(--blue);
  }
}
</style>
