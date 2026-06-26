<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const selectVal = ref('xxx')
const options = ref([
  { name: '小瑞瑞', id: 'xrr' },
  { name: '小月月', id: 'xyy' },
  { name: '小鑫鑫', id: 'xxx' },
])
function itemDisabled(item) {
  if (item.id === 'xyy') {
    return true
  }
  return false
}
</script>

<template>
  <div>
    <s-select
      v-model="selectVal"
      title="大部分常用属性"
      :options="options"
      label="name"
      value="id"
      :item-disabled="itemDisabled"
      :custom-label="(item) => item.name + '(' + item.id + ')'"
    ></s-select>
  </div>
</template>

<style scoped lang="scss"></style>
