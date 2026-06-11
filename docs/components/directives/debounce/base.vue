<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const inputValue = ref()
function baseDebounce() {
  console.log('baseDebounce')
}
function debounce3000() {
  console.log('debounce3000')
}
function debounce200() {
  console.log('debounce200')
}
function inputChange() {
  console.log(`inputValue.value`, inputValue.value)
}
</script>

<template>
  <div>
    <el-input v-debounce="inputChange" v-model="inputValue" />

    <s-flex gap="100" class="m-t-64">
      <div class="m-b-24 p-8" v-debounce="baseDebounce">默认1000毫秒</div>
      <button class="m-b-24 p-8 d-b" v-debounce.200="debounce200">这是200毫秒的</button>
      <el-button v-debounce.3000="debounce3000">这是3000毫秒的</el-button>
    </s-flex>
  </div>
</template>

<style scoped lang="scss"></style>
