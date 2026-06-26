<template>
  <div class="s-disabled-count-date">
    <!-- <el-date-picker
      ref="datePickerRef"
      v-model="dateRange"
      type="datetimerange"
      range-separator="至"
      value-format="x"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      :disabled-date="disabledDate"
      :shortcuts="shortcuts"
    /> -->
    <s-date-picker v-model="dateRange" type="daterange" value-format="x"></s-date-picker>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface DisabledCountDateProps {
  modelValue?: number | string | any[]
}

const props = withDefaults(defineProps<DisabledCountDateProps>(), {
  modelValue: () => [new Date().getTime() - 86400 * 1000 * 365, new Date().getTime()],
})
const dateRange = ref(props.modelValue)
const emits = defineEmits(['update:modelValue'])
watch(
  () => dateRange.value,
  (val) => {
    if (!val || val.length < 2) return
    // if (duration < minDuration) {
    //   isValid.value = false
    //   datePickerRef.value.handleOpen()
    //   dateRange.value = props.modelValue
    //   return proxy.$toast('时间范围不能小于30分钟！', 'e')
    // } else if (duration > maxDuration) {
    //   isValid.value = false
    //   dateRange.value = props.modelValue
    //   datePickerRef.value.handleOpen()
    //   return proxy.$toast('时间范围不能超过2周！', 'e')
    // }
    emits('update:modelValue', val)
  },
  {
    deep: true,
    immediate: true,
  },
)
</script>

<style scoped lang="scss">
.s-disabled-count-date {
  display: flex;
  align-items: center;
}
</style>
