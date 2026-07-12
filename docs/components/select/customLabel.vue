<script setup lang="ts">
import { ref } from 'vue'
const selectVal = ref()
const options = ref([
  { label: '小月月', value: 'xyy', age: 19 },
  { label: '小鑫鑫', value: 'xxx', age: 18 },
])

const customLabel = ({ option, index, value }) => {
  return `${option.label} - ${option.age}岁（index: ${index}, value: ${value}）`
}
</script>

<template>
  <div>
    <s-select v-model="selectVal" :options="options" :custom-label="customLabel"></s-select>
  </div>
</template>

<style scoped lang="scss"></style>
