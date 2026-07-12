<script setup lang="tsx">
import { ref, getCurrentInstance, computed } from 'vue'
const { proxy } = getCurrentInstance()
const data = ref({
  name: '',
  age: 0,
  height: 0,
})
const options = computed(() => {
  return [
    { label: '名字', labelSlot: 'nameLabel', valueSlot: 'nameValue' },
    {
      label: '年龄',
      value: data.value.age,
      labelRender: ({ label }) => {
        return <div style="color: blue">这是labelRender {label}</div>
      },
      render: ({ value }) => {
        return <div class="cl-red">这是render {value}</div>
      },
    },
    {
      label: '身高',
      value: data.value.height,
    },
  ]
})

const init = async () => {
  await proxy.delay(1000)
  data.value = {
    name: 'andy',
    age: 18,
    height: 1.88,
  }
}
init()
</script>

<template>
  <div>
    <s-descriptions :options="options" class="w-block" :column="1" label-width="200">
      <template #nameLabel="{ option, value, index, label }">这是自定义label：{{ option.label }}</template>
      <template #nameValue="{ option, value, index, label }">这是自定义value：{{ option.value }}</template>
    </s-descriptions>
  </div>
</template>
