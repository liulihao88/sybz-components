<script setup lang="tsx">
import { ref, computed } from 'vue'
import { formatTime, delay } from '@sybz-components/utils'

const data = ref({})
const sizeValue = ref('default')
const showAll = ref(false)
const options = computed(() => {
  return [
    {
      key: '名11字',
      id: data.value.name,
      attrs: {
        'label-align': 'left',
        align: 'center',
        'label-class-name': 'my-label',
        'class-name': 'my-content',
      },
    },
    {
      key: '时间',
      id: data.value.time,
      filter: ({ value }: DemoFilterContext) => {
        return formatTime(value)
      },
    },
    {
      key: '显示filter下的所有值',
      id: data.value.time,
      filter: ({ value, index, label, row }: DemoFilterContext) => {
        return `${formatTime(value)} : ${index} : ${label} : ${JSON.stringify(row)}`
      },
    },
    {
      key: '是否锁定',
      id: () => {
        if (data.value.isLock) {
          return <s-icon name="lock"></s-icon>
        } else {
          return <s-icon name="unlock"></s-icon>
        }
      },
    },
    {
      key: 'render用法',
      labelRender: ({ label }) => {
        return <div style="color: blue">我是labelRender: {label}</div>
      },
      render: ({ row }) => {
        return <div style="color: blue">我是render: {row.more}</div>
      },
    },
  ]
})

const sizeOptions = ['large', 'default', 'small']

const borderValue = ref(true)

const init = async () => {
  await delay(1000)
  data.value = {
    name: 'andy',
    time: 1638720415900,
    isLock: false,
    more: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit et, repudiandae ex impedit ullam eveniet possimus at, in aspernatur blanditiis neque quibusdam est nulla minus error quis doloribus labore doloremque?',
  }
}
init()
</script>

<template>
  <div>
    <s-flex direction="column">
      <s-radio v-model="sizeValue" :options="sizeOptions" type="simple"></s-radio>
      <s-radio
        v-model="showAll"
        :options="[
          { label: 'showAll:true', value: true },
          { label: 'showAll:false', value: false },
        ]"
      ></s-radio>
    </s-flex>
    <s-descriptions
      title="这是title"
      :options="options"
      :column="1"
      label="key"
      value="id"
      :row="data"
      :size="sizeValue"
      :show-all="showAll"
      :border="borderValue"
      extra="这是extra"
    ></s-descriptions>
  </div>
</template>

<style lang="scss" scoped>
:deep(.my-label) {
  background: pink !important;
}
:deep(.my-content) {
  background: skyblue !important;
}
</style>
