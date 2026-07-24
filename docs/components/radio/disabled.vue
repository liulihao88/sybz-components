<template>
  <div>
    <s-title title="全部disabled"></s-title>
    <s-radio v-model="value" :options="options" :disabled="true" />

    <s-title title="选项1,3disabled"></s-title>
    <s-radio v-model="value" :options="options" :custom-disabled="customDisabled" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const value = ref(2)
const options = ref([
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 },
  { label: 'Option 3', value: 4 },
])
const customDisabled = ({ option }) => {
  return option.value === 1 || option.value === 3
}
</script>
