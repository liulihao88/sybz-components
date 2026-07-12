<script setup lang="ts">
/** @使用方式
<s-checkbox
  v-model="formData.categoryIds"
  :options="tableData.data"
  value="id"
  :showAll="false"
  label="name"
  :customDisabled="judgeDisabled"
></s-checkbox>
*/
import { ref, watch, computed, useAttrs } from 'vue'
import { Check, Minus } from '@element-plus/icons-vue'
import { isEmpty, processWidth } from '@sybz-components/utils'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'

defineOptions({
  name: 'SCheckbox',
})
const rootAttrs = useAttrs()
interface CheckboxOptionContext<Option = Record<string, any>> {
  option: Option
  index: number
  value: unknown
}
interface CheckboxProps {
  type?: string
  options?: any[]
  showType?: 'check' | 'button'
  modelValue?: any[]
  label?: string
  value?: string
  showAll?: boolean
  attrs?: Record<string, any>
  customDisabled?: (context: CheckboxOptionContext) => boolean
  customLabel?: (context: CheckboxOptionContext) => any
  gap?: number | string
  theme?: 'default' | 'chenghua' | 'shijingshan'
  size?: 'large' | 'default' | 'small'
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  type: '',
  options: () => [],
  showType: 'check', // button
  modelValue: () => [],
  label: 'label',
  value: 'value',
  showAll: true,
  attrs: () => ({}),
  // 自定义label显示多个参数的函数
  gap: '',
  theme: 'default',
  size: 'default',
})

const mergedProps = useGlobalComponentConfig('checkbox', props)
const checkAll = ref(false)
const isIndeterminate = ref(false)
const allCheckList = ref([])

watch(
  () => props.modelValue,
  (newValue) => {
    // 一些不在options里的值, 需要考虑进来, 进行过滤. 这里还要考虑type===simple的情况
    let pureValue = []
    if (isEmpty(newValue) || typeof newValue !== 'object') {
      pureValue = []
    } else {
      pureValue = newValue.filter((v) => {
        return props.options.some((val) => {
          let res = props.type === 'simple' ? val === v : val[props.value]
          return res
        })
      })
    }

    if (isEmpty(pureValue)) {
      isIndeterminate.value = false
      checkAll.value = false
    } else if (pureValue.length === props.options.length) {
      isIndeterminate.value = false
      checkAll.value = true
    } else {
      isIndeterminate.value = true
      checkAll.value = false
    }
  },
  { deep: true, immediate: true },
)

const emits = defineEmits(['update:modelValue'])
function checkAllChange() {
  const optionAll = props.options.map((v) => {
    let res = props.type === 'simple' ? v : v[props.value]
    return res
  })
  if (isIndeterminate.value || (checkAll.value === false && isIndeterminate.value === true)) {
    emitValue(optionAll)
  } else if (checkAll.value === true && isIndeterminate.value === false) {
    emitValue(optionAll)
  } else if (checkAll.value === false && isIndeterminate.value === false) {
    emitValue([])
  }
}
const checkType = computed(() => {
  const obj = {
    check: 'el-checkbox',
    button: 'el-checkbox-button',
  }
  return obj[mergedProps.value.showType] ?? 'el-checkbox'
})
const getOptionValue = (option: any) => (props.type === 'simple' ? option : option[props.value!])
const isDisabled = computed(() => rootAttrs.disabled === '' || Boolean(rootAttrs.disabled))
const getOptionDisabled = (option: any, index: number) => {
  if (isDisabled.value) return true
  return props.customDisabled({ option, index, value: getOptionValue(option) }) ?? false
}
const checkAllClass = computed(() => ({
  's-checkbox__all--none': !checkAll.value && !isIndeterminate.value,
  's-checkbox__all--indeterminate': isIndeterminate.value,
  's-checkbox__all--checked': checkAll.value && !isIndeterminate.value,
  [`el-checkbox-button--${mergedProps.value.size}`]:
    mergedProps.value.showType === 'button' && ['small', 'large'].includes(mergedProps.value.size),
}))
function emitValue(item) {
  allCheckList.value = item
  emits('update:modelValue', allCheckList.value)
}
function handleLabel(option, index) {
  // 如果customLabel是函数就执行customLabel的函数去处理label显示
  if (typeof props.customLabel === 'function') {
    return props.customLabel({ option, index, value: getOptionValue(option) })
  } else {
    let res = props.type === 'simple' ? option : option[props.label]
    return res
  }
}
const filteredAttrs = computed(() => {
  const { label: _label, ...rest } = rootAttrs
  return rest
})
const checkboxModel = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emitValue(value)
  },
})

const getGapValue = computed(() => processWidth(props.gap, true))
const hasGap = computed(() => !isEmpty(getGapValue.value, true))
const checkboxClass = computed(() => ({
  's-gap-checkbox': hasGap.value,
  's-checkbox--chenghua': mergedProps.value.theme === 'chenghua',
  's-checkbox--shijingshan': mergedProps.value.theme === 'shijingshan',
  's-checkbox--button': mergedProps.value.showType === 'button',
  's-checkbox--show-all': mergedProps.value.showAll,
}))
</script>

<template>
  <div class="s-checkbox" :class="checkboxClass">
    <component
      :is="checkType"
      v-if="mergedProps.showAll"
      v-model="checkAll"
      class="s-checkbox__all"
      :class="checkAllClass"
      :size="mergedProps.size || undefined"
      :indeterminate="isIndeterminate"
      v-bind="$attrs"
      @change="checkAllChange"
    >
      <span v-if="mergedProps.showType === 'button'" class="s-checkbox__all-icon" aria-hidden="true">
        <el-icon v-if="isIndeterminate"><Minus /></el-icon>
        <el-icon v-else-if="checkAll"><Check /></el-icon>
      </span>
      全选
    </component>
    <el-checkbox-group
      v-model="checkboxModel"
      v-bind="{ ...filteredAttrs, size: mergedProps.size || undefined }"
      class="s-checkbox__wrapper"
    >
      <slot>
        <component
          :is="checkType"
          v-bind="rootAttrs"
          v-for="(item, index) in props.options"
          :key="index"
          :size="mergedProps.size || undefined"
          :value="getOptionValue(item)"
          :label="props.type === 'simple' ? item : item[props.label!]"
          :disabled="getOptionDisabled(item, index)"
          class="s-checkbox__item"
        >
          <slot :name="props.type === 'simple' ? item : item.slot" v-bind="props.type === 'simple' ? {} : item">
            {{ handleLabel(item, index) }}
          </slot>
        </component>
      </slot>
    </el-checkbox-group>
  </div>
</template>

<style scoped lang="scss">
.s-checkbox {
  display: flex;
  align-items: flex-start;
  .s-checkbox__all {
    font-weight: bold;
    margin-bottom: 0;
    white-space: nowrap;
    margin-right: var(--el-checkbox-margin-right, 24px);
  }
}

.s-checkbox--button {
  --s-checkbox-button-primary: var(--el-color-primary);
  --s-checkbox-button-soft: var(--el-color-primary-light-9);

  .s-checkbox__all {
    display: inline-flex;
    align-items: center;
    font-weight: var(--el-font-weight-primary);
    margin-right: 0;
    vertical-align: top;
  }

  .s-checkbox__wrapper {
    display: flex;
    align-items: flex-start;
  }

  :deep(.s-checkbox__all .el-checkbox-button__inner) {
    display: inline-flex;
    align-items: center;
  }

  :deep(.s-checkbox__all--indeterminate .el-checkbox-button__inner) {
    border-color: var(--s-checkbox-button-primary);
    background: var(--s-checkbox-button-soft);
    color: var(--s-checkbox-button-primary);
    box-shadow: -1px 0 0 0 var(--s-checkbox-button-primary);
  }

  .s-checkbox__all-icon {
    display: inline-flex;
    width: 1em;
    height: 1em;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    margin-right: 6px;
    border: 1px solid var(--el-border-color);
    border-radius: 4px;
    background: var(--el-fill-color-blank);

    .el-icon {
      font-size: calc(1em - 4px);
    }
  }

  .s-checkbox__all--indeterminate .s-checkbox__all-icon {
    border-color: var(--s-checkbox-button-primary);
    background: var(--s-checkbox-button-primary);
    color: var(--el-color-white);
  }

  .s-checkbox__all--checked .s-checkbox__all-icon {
    border-color: var(--el-color-white);
    background: var(--el-color-white);
    color: var(--s-checkbox-button-primary);
  }
}

.s-checkbox--button.s-checkbox--chenghua {
  --s-checkbox-button-primary: var(--s-ch-primary);
  --s-checkbox-button-soft: var(--s-ch-primary-soft);
}

.s-checkbox--button.s-checkbox--shijingshan {
  --s-checkbox-button-primary: var(--s-sjs-primary);
  --s-checkbox-button-soft: var(--s-sjs-primary-soft);
}

.s-checkbox--button.s-checkbox--show-all {
  :deep(.s-checkbox__wrapper .el-checkbox-button:first-child .el-checkbox-button__inner) {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
  }
}

.s-gap-checkbox {
  .s-checkbox__all {
    font-weight: bold;
    margin-bottom: 0;
    white-space: nowrap;
    margin-right: v-bind('getGapValue') !important;
  }

  .s-checkbox__wrapper {
    display: flex;
    flex-wrap: wrap;
    column-gap: v-bind('getGapValue'); // 只设置列间距
    row-gap: 8px; // 固定行间距或根据需要设置

    .s-checkbox__item {
      display: inline-flex;
      align-items: center;
    }
    :deep(.el-checkbox) {
      margin-right: 0;
    }
  }
}
</style>
