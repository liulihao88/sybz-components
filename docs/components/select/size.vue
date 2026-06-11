<script setup lang="ts">
import { ref, getCurrentInstance, watch } from 'vue'
const { proxy } = getCurrentInstance()
const selectValue = ref([])
const options = ref([
  { label: '张三', value: 'z3' },
  { label: '李四', value: 'l4' },
  { label: '王五', value: 'w5' },
  { label: '赵六', value: 'z6' },
])
const size = ref('default')
const changeSelectValue = ref(true)

watch(
  changeSelectValue,
  (val) => {
    if (val) {
      selectValue.value = options.value.map((v) => v.value)
    } else {
      selectValue.value = []
    }
  },
  {
    deep: true,
    immediate: true,
  },
)
</script>

<template>
  <div>
    <s-radio
      v-model="changeSelectValue"
      class="m-r-64"
      :options="[
        { label: '全选', value: true },
        { label: '清空', value: false },
      ]"
    ></s-radio>
    <s-radio :options="['large', 'default', 'small']" v-model="size" type="simple"></s-radio>
    <s-select
      v-model="selectValue"
      :options="options"
      multiple
      :size="size"
      :showQuick="true"
      :title="`选择尺寸=>${size}`"
    />
  </div>
</template>
