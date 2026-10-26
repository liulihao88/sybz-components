<script setup lang="ts">
import { ref } from 'vue'

const size = ref<'small' | 'default' | 'large'>('default')

const options = [
  { label: '名字', value: 'andy' },
  { label: '年龄', value: '18' },
  { label: '住址', value: '北京市朝阳区' },
  { label: '备注', value: '这是一段比较长的备注文字，用来展示尺寸变化对单元格宽高和字体的影响。' },
]
</script>

<template>
  <div>
    <s-flex gap="small" direction="column">
      <s-radio v-model="size" :options="['small', 'default', 'large']" type="simple" title="size"></s-radio>
    </s-flex>
    <s-descriptions title="尺寸示例" :options="options" :size="size" :column="2"></s-descriptions>
  </div>
</template>
