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
          @mouseover.native="inputOnMouseOver($event)"
          @update:model-value="handleInputUpdate"
          v-bind="mergedAttrs"
        >
          <template v-if="$attrs.title" #prepend>
            <div :style="{ ...computedBoxStyle }" class="s-input__title">
              {{ $attrs.title }}
            </div>
          </template>
        </el-autocomplete>

        <el-input
          v-else
          :model-value="data"
          :placeholder="handlePlaceholder()"
          class="kd-ipt"
          :showPassword="showPassword"
          :class="{ 'kd-textarea': $attrs.type === 'textarea' }"
          v-bind="mergedAttrs"
          :show-word-limit="handleShowWordLimit()"
          @focus="focusHandler($event)"
          @mouseover.native="inputOnMouseOver($event)"
          @update:model-value="handleInputUpdate"
        >
          <template v-if="$attrs.title" #prepend>
            <div :style="{ ...computedBoxStyle }" class="s-input__title">
              {{ $attrs.title }}
            </div>
          </template>
          <!-- 插槽默认内容 -->
          <slot />

          <!-- 前缀插槽 -->
          <template v-if="$slots.prefix" v-slot:prefix>
            <slot name="prefix" />
          </template>

          <!-- 后缀插槽 -->
          <template v-if="$slots.suffix" v-slot:suffix>
            <slot name="suffix" />
          </template>

          <!-- 后置插槽 -->
          <template v-if="$slots.append" v-slot:append>
            <slot name="append" />
          </template>

          <!-- 前置插槽 -->
          <template v-if="$slots.prepend" v-slot:prepend>
            <slot name="prepend" />
          </template>
        </el-input>
      </div>
    </el-tooltip>
    <s-icon
      v-if="mergedProps.content"
      class="s-input__icon"
      v-bind="{ name: 'warning', color: 'var(--el-disabled-text-color)', size: '16px', ...mergedProps.iconAttrs }"
      :content="mergedProps.content"
      :dangerouslyUseHTMLString="mergedProps.dangerouslyUseHTMLString"
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
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'
const attrs = useAttrs()

defineOptions({
  name: 'SInput',
  inheritAttrs: false,
})

const props = defineProps({
  modelValue: {
    required: true,
  },
  boxStyle: {
    type: Object,
    default: () => {},
  },
  width: {
    type: [String, Number],
    default: '100%',
  },
  height: {
    type: [String, Number],
    default: '',
  },
  maxlength: {
    type: [String, Number],
  },
  hideMaxLengthError: {
    type: Boolean,
    default: false,
  },
  maxLengthErrorText: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: '',
    validator: (value: string) => ['', 'small', 'default', 'large'].includes(value),
  },
  theme: {
    type: String,
    default: '',
    validator: (value: string) => ['', 'chenghua'].includes(value),
  },
  showWordLimit: {
    type: [Boolean, String],
    default: '',
  },
  block: {
    type: Boolean,
    default: false,
  },
  // placeholder在disabled的情况下是不显示的. 如果想要在这种情况下显示placeholder, 那么就用这个属性
  disPlaceholder: {
    type: String,
    default: '',
  },
  subAttrs: {
    type: Object,
    default: () => {
      return {}
    },
  },
  tooltipAttrs: {
    type: Object,
    default: () => {
      return {}
    },
  },
  iconAttrs: {
    type: Object,
    default: () => {
      return {}
    },
  },
  hideTooltip: {
    type: Boolean,
    default: false,
  },
  // 适用于el-autocomplete
  options: {
    type: Array,
  },
  content: {
    type: String,
    default: '',
  },
  dangerouslyUseHTMLString: {
    type: Boolean,
    default: false,
  },
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

function handlePlaceholder() {
  let res =
    attrs.disabled === '' || !!attrs.disabled === true ? mergedProps.value.disPlaceholder : attrs.placeholder || '请输入'
  return res
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
  let baseAttrs = {
    resize: 'none',
    rows: 2,
    clearable: true,
    size: mergedProps.value.size || undefined,
  }
  const merged = {
    ...baseAttrs,
    ...Object.entries(attrs).reduce((obj, [key, value]) => {
      if (key !== 'class' && key !== 'style' && key !== 'maxlength' && key !== 'max-length') {
        obj[key] = value
      }
      return obj
    }, {}),
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
