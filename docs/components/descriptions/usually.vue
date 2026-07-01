<script setup lang="tsx">
import { ref, getCurrentInstance, computed } from 'vue'
const instance = getCurrentInstance()
import { formatTime, delay } from '@sybz-components/utils'
const data: any = ref({})
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
    },
    {
      key: 'filter的时间',
      id: data.value.time,
      filter: (val) => formatTime(val),
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
      key: '超出文本超出文本超出文本超出文本超出文本',
      id: data.value.more,
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
          { key: 'showAll为true', value: true },
          { key: 'showAll为false', value: false },
        ]"
      ></s-radio>
    </s-flex>
    <s-descriptions
      title="这是title"
      :options="options"
      :column="1"
      label="key"
      value="id"
      :size="sizeValue"
      :show-all="showAll"
      :border="borderValue"
      extra="这是extra"
    ></s-descriptions>
  </div>
</template>

<style lang="scss" scoped>
:deep(.my-label) {
  background: var(--el-color-success-light-9) !important;
}
:deep(.my-content) {
  background: var(--el-color-danger-light-9);
}
</style>
