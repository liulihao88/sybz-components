<script setup lang="ts">
import { computed, ref } from 'vue'

const widthProp = ref<'width' | 'w'>('width')
const heightProp = ref<'height' | 'h'>('height')
const width = ref('240')
const height = ref('180')
const minw = ref('unset')
const contentMode = ref('short')
const content = computed(() =>
  contentMode.value === 'long' ? '确认操作前请检查内容。'.repeat(24) : '确认操作前请检查内容。',
)

const sizeValue = (value: string) => (value === 'true' ? true : value === 'false' ? false : value)
const sizeProps = computed(() => ({
  [widthProp.value]: sizeValue(width.value),
  [heightProp.value]: sizeValue(height.value),
  minw: minw.value === 'unset' ? undefined : minw.value,
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
const minWidthOptions = [
  { label: '未设置（默认）', value: 'unset' },
  { label: '240px', value: '240' },
  { label: '320px', value: '320px' },
]
</script>

<template>
  <s-select v-model="width" title="宽度值" :options="widthOptions" mr />
  <s-select v-model="height" title="高度值" :options="heightOptions" />
  <s-flex gap>
    <s-radio v-model="minw" title="minw" :options="minWidthOptions" />
    <s-radio
      v-model="contentMode"
      title="内容长度"
      :options="[
        { label: '短内容', value: 'short' },
        { label: '长内容', value: 'long' },
      ]"
    />
    <s-popconfirm v-bind="sizeProps" :content="content" trigger="click">
      <s-button h>打开确认弹框</s-button>
    </s-popconfirm>
  </s-flex>
</template>
