<script setup lang="tsx">
import { ref, getCurrentInstance, computed, h } from 'vue'
const { proxy } = getCurrentInstance()
import { formatTime } from '@sybz-components/utils'
type IData = {
  name: string
  age: number
  height: number
}
const data = ref<IData>({
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
      labelRender: (item) => {
        return <div style="color: blue">这是labelRender</div>
      },
      render: (item) => {
        // return h('div', { class: ['cl-red'] }, `这是render ${item.value}`)
        return <div class="cl-red">这是render {item.value}</div>
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
    <div>docs/examples/SDescription/base.vue</div>
    <s-descriptions :options="options" class="w-block" :column="1" label-width="200px">
      <template #nameLabel="{ item, value, index, label }">这是自定义label</template>
      <template #nameValue="{ item, value, index, label }">这是自定义value</template>
    </s-descriptions>
  </div>
</template>
