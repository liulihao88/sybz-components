<script setup lang="ts">
import { ref } from 'vue'
const checkboxValue = ref(['xxx'])
const options = ref([
  { name: '小月月11111111', id: 'xyy' },
  { name: '小鑫鑫22222222', id: 'xxx' },
  { name: '小瑞瑞', id: 'xrr' },
])

const simpleValue = ref(['7'])
const simpleOptions = ['1', '2', '3', '4', '5']
const size = ref('default')
</script>

<template>
  <div>
    <s-radio v-model="size" :options="['small', 'default', 'large']" type="simple"></s-radio>
    <s-checkbox
      v-model="checkboxValue"
      :options="options"
      label="name"
      value="id"
      :size="size"
      show-type="button"
    ></s-checkbox>
    <s-checkbox v-model="simpleValue" :options="simpleOptions" type="simple" :size="size"></s-checkbox>
  </div>
</template>

<style scoped lang="scss"></style>
