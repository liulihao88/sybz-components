<script setup lang="ts">
import { ref } from 'vue'
const selectVal = ref()
const options = ref([
  { label: '小月月小月月小月月小月月小月月小月月小月月小月月小月月小月月', value: 'xyy' },
  { label: '小鑫鑫小鑫鑫小鑫鑫小鑫鑫小鑫鑫小鑫鑫小鑫鑫小鑫鑫小鑫鑫小鑫鑫小鑫鑫小鑫鑫', value: 'xxx' },
  { label: '为0', value: 0 },
  {
    label: '测试行高 g、j、p、q、y',
    value: 1,
  },
])
</script>

<template>
  <div>
    <s-select v-model="selectVal" :options="options" title="哈哈"></s-select>
  </div>
</template>

<style scoped lang="scss"></style>
