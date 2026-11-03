<script setup lang="ts">
import { computed, ref } from 'vue'

const widthProp = ref<'width' | 'w'>('width')
const heightProp = ref<'height' | 'h'>('height')
const width = ref('240')
const height = ref('180')

const sizeValue = (value: string) => (value === 'true' ? true : value === 'false' ? false : value)
const sizeProps = computed(() => ({
  [widthProp.value]: sizeValue(width.value),
  [heightProp.value]: sizeValue(height.value),
}))

const widthOptions = [
  { label: '200', value: '200' },
  { label: '240', value: '240' },
  { label: '320px', value: '320px' },
  { label: 'true（100%）', value: 'true' },
  { label: 'false（不设置）', value: 'false' },
]
const heightOptions = [
  { label: '120', value: '120' },
  { label: '180', value: '180' },
  { label: '240px', value: '240px' },
  { label: 'true（100%）', value: 'true' },
  { label: 'false（不设置）', value: 'false' },
]
</script>

<template>
  <s-flex gap>
    <s-select v-model="width" title="宽度值" :options="widthOptions" />
    <s-select v-model="height" title="高度值" :options="heightOptions" />
    <s-popconfirm v-bind="sizeProps" content="可以通过 width / w 和 height / h 调整弹层宽高" trigger="click">
      <s-button h>打开确认弹框</s-button>
    </s-popconfirm>
  </s-flex>
</template>
