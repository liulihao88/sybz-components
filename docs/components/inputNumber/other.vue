<script setup lang="ts">
import { ref } from 'vue'

const value = ref(12)
const otherParams = ref({
  topTitle: '数量',
  title: '',
  disabled: false,
})
const topTitleOptions = [
  { label: "不设置（默认值：''）", value: '' },
  { label: '数量', value: '数量' },
  { label: '库存上限', value: '库存上限' },
]
const titleOptions = [
  { label: "不设置（默认值：''）", value: '' },
  { label: '左侧标题：数量', value: '数量' },
]
</script>

<template>
  <s-flex gap="small" direction="column" class="p-b-12">
    <s-radio v-model="otherParams.topTitle" :options="topTitleOptions" variant="button" title="top-title" />
    <s-radio v-model="otherParams.title" :options="titleOptions" variant="button" title="title" />
    <s-radio
      v-model="otherParams.disabled"
      :options="[
        { label: 'false（默认值）', value: false },
        { label: 'true', value: true },
      ]"
      variant="button"
      title="disabled"
    />
  </s-flex>
  <s-input-number
    v-model="value"
    :top-title="otherParams.topTitle"
    :title="otherParams.title"
    :disabled="otherParams.disabled"
    width="260"
    :min="0"
    :max="99"
  />
</template>
