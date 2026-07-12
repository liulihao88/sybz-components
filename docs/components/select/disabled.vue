<script setup lang="ts">
import { ref } from 'vue'
const options = ref([
  { label: '张三', value: 'z3' },
  { label: '李四', value: 'l4' },
  { label: '王五', value: 'w5' },
  { label: '赵六', value: 'z6' },
])
const selectValue1 = ref([])
const selectValue2 = ref([])
const selectValue3 = ref([])
const selectValue4 = ref([])
const customDisabled = ({ index }) => {
  return index % 2 === 0
}
const customDisabled2 = ({ index }) => {
  return index % 2 !== 0
}

const options2 = ref(['男人', '女人', '爱情'])
</script>

<template>
  <div>
    <s-select v-model="selectValue1" :options="options" :custom-disabled="customDisabled" title="单选正常" />
    <s-select
      v-model="selectValue2"
      :options="options2"
      :custom-disabled="customDisabled2"
      type="simple"
      title="单选简单"
    />
    <s-select v-model="selectValue3" :options="options" multiple :custom-disabled="customDisabled" title="多选正常" />

    <s-select
      v-model="selectValue4"
      :options="options2"
      multiple
      type="simple"
      :custom-disabled="customDisabled2"
      title="多选简单"
    />
  </div>
</template>
