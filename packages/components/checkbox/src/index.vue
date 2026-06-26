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
import { isEmpty, processWidth } from '@sybz-components/utils'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'

defineOptions({
  name: 'SCheckbox',
})
const attrs = useAttrs()
const props = defineProps({
  type: {
    type: String,
    default: '',
  },
  options: {
    type: Object,
    default: () => {
      return []
    },
  },
  showType: {
    type: String,
    validator: (value: string) => ['check', 'button'].includes(value),
    default: 'check', // button
  },
  modelValue: {
    type: Array,
    defalut: () => [],
  },
  label: {
    type: String,
    default: 'label',
  },
  value: {
    type: String,
    default: 'value',
  },
  showAll: {
    type: Boolean,
    default: true,
  },
  attrs: {
    type: Object,
    default: () => {},
  },
  customDisabled: {
    type: Function,
    default: () => {},
  },
  // 自定义label显示多个参数的函数
  customLabel: {
    type: [Function, String],
    default: '',
  },
  gap: {
    type: [Number, String],
    default: '',
  },
  theme: {
    type: String,
    default: '',
    validator: (value: string) => ['', 'chenghua'].includes(value),
  },
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
  return obj[props.showType] ?? 'el-checkbox'
})
function groupChange(item) {
  emitValue(item)
}

function emitValue(item) {
  allCheckList.value = item
  emits('update:modelValue', allCheckList.value)
}
function handleLabel(item, index) {
  // 如果customLabel是函数就执行customLabel的函数去处理label显示
  if (typeof props.customLabel === 'function') {
    return props.customLabel(item, index)
  } else {
    let res = props.type === 'simple' ? item : item[props.label]
    return res
  }
}
const filteredAttrs = computed(() => {
  const { label: _label, ...rest } = attrs
  return rest
})

const getGapValue = computed(() => processWidth(props.gap, true))
const hasGap = computed(() => !isEmpty(getGapValue.value, true))
const checkboxClass = computed(() => ({
  's-gap-checkbox': hasGap.value,
  's-checkbox--chenghua': mergedProps.value.theme === 'chenghua',
  's-checkbox--button': mergedProps.value.showType === 'button',
}))
</script>

<template>
  <div class="s-checkbox" :class="checkboxClass">
    <el-checkbox
      v-model="checkAll"
      class="s-checkbox__all"
      :indeterminate="isIndeterminate"
      @change="checkAllChange"
      v-if="mergedProps.showAll"
      v-bind="$attrs"
    >
      全选
    </el-checkbox>
    <el-checkbox-group
      v-model="props.modelValue"
      @change="groupChange"
      v-bind="filteredAttrs"
      class="s-checkbox__wrapper"
    >
      <slot>
        <component
          :is="checkType"
          v-bind="attrs"
          v-for="(item, index) in props.options"
          :key="index"
          :value="props.type === 'simple' ? item : item[props.value!]"
          :label="props.type === 'simple' ? item : item[props.label!]"
          :disabled="props.customDisabled(item)"
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
