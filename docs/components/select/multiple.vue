<script setup lang="ts">
import { ref } from 'vue'
const stepList = [
  { id: '1', name: '开始11开始11开始11开始11开始11开始11开始11开始11开始11开始11开始11开始11开始11开始11开始11开始11' },
  { id: '2', name: 'POSUI2' },
  { id: '3', name: '113333' },
  { id: '4', name: 'GX1234444' },
]
const optionsId = ref(['1', '3'])
function changeSelect(value, label, itemObj) {
  console.log('changeSelect==')
  console.log(`value, label, itemObj`, value, label, itemObj)
}
function change(...rest) {
  console.log('change??')
  console.log(`rest`, rest)
}
</script>

<template>
  <div>
    <s-select
      v-model="optionsId"
      title="你好"
      multiple
      label="name"
      value="id"
      show-prefix
      :options="stepList"
      @change-select="changeSelect"
      @change="change"
    ></s-select>

    <s-title title="use collapse-tags"></s-title>
    <s-select
      v-model="optionsId"
      multiple
      label="name"
      value="id"
      show-prefix
      collapse-tags
      :options="stepList"
      @change-select="changeSelect"
      @change="change"
    ></s-select>
    <s-title title="use collapse-tags-tooltip"></s-title>
    <s-select
      v-model="optionsId"
      multiple
      label="name"
      value="id"
      collapse-tags
      collapse-tags-tooltip
      :options="stepList"
      @change-select="changeSelect"
      @change="change"
    ></s-select>

    <s-title title="use max-collapse-tags"></s-title>
    <s-select
      v-model="optionsId"
      multiple
      label="name"
      value="id"
      collapse-tags
      collapse-tags-tooltip
      :max-collapse-tags="3"
      :options="stepList"
      @change-select="changeSelect"
      @change="change"
    ></s-select>
  </div>
</template>

<style scoped lang="scss"></style>
