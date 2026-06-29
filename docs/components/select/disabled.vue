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
const itemDisabled = (item, index) => {
  return index % 2 === 0
}
const itemDisabled2 = (item, index) => {
  return index % 2 !== 0
}

const options2 = ref(['男人', '女人', '爱情'])
</script>

<template>
  <div>
    <s-select v-model="selectValue1" :options="options" :item-disabled="itemDisabled" title="单选正常" />
    <s-select
      v-model="selectValue2"
      :options="options2"
      :item-disabled="itemDisabled2"
      type="simple"
      title="单选简单"
    />
    <s-select v-model="selectValue3" :options="options" multiple :item-disabled="itemDisabled" title="多选正常" />

    <s-select
      v-model="selectValue4"
      :options="options2"
      multiple
      type="simple"
      :item-disabled="itemDisabled2"
      title="多选简单"
    />
  </div>
</template>
