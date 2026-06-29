<script setup lang="ts">
import { ref } from 'vue'
const checkboxValue = ref()
const options = ref([
  { label: '小月月', value: 'xyy' },
  { label: '小鑫鑫', value: 'xxx' },
  { label: '小瑞瑞', value: 'xrr' },
])
</script>

<template>
  <div>
    <s-checkbox v-model="checkboxValue" :options="options"></s-checkbox>
  </div>
</template>

<style scoped lang="scss"></style>
