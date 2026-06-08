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
      title="大部分常用属性"
      v-model="selectVal"
      :options="options"
      label="name"
      value="id"
      :itemDisabled="itemDisabled"
      :customLabel="(item) => item.name + '(' + item.id + ')'"
    ></s-select>
  </div>
</template>

<style scoped lang="scss"></style>
