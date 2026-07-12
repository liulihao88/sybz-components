<script setup lang="ts">
import { ref } from 'vue'
const checkboxValue = ref(['xxx'])
const options = ref([
  { name: '小月月11111111', id: 'xyy' },
  { name: '小鑫鑫22222222', id: 'xxx' },
  { name: '小瑞瑞', id: 'xrr' },
  { name: '胡汉三', id: 'hhs' },
  { name: '大力哥', id: 'dlg' },
])
function change(checkValue) {
  console.log(`checkValue`, checkValue)
}
function customDisabled({ option, index, value }) {
  return option.id === 'xrr' || index === 4 || value === 'xyy'
}
</script>

<template>
  <s-checkbox
    v-model="checkboxValue"
    :disabled="true"
    :options="options"
    label="name"
    size="small"
    show-type="button"
    theme="chenghua"
    value="id"
    @change="change"
  ></s-checkbox>
  <s-checkbox
    v-model="checkboxValue"
    :options="options"
    label="name"
    size="small"
    show-type="button"
    theme="chenghua"
    value="id"
    :custom-disabled="customDisabled"
    @change="change"
  ></s-checkbox>
</template>
