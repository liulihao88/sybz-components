<script setup lang="ts">
import { ref, getCurrentInstance, h } from 'vue'
const { proxy } = getCurrentInstance()
const dateValue = ref()

const customPrefix = {
  render() {
    return h('p')
  },
}
</script>

<template>
  <div>
    <s-date-range v-model="dateValue"></s-date-range>
    <s-date-range
      v-model="dateValue"
      width="600"
      size="small"
      title="选择日期"
      class="m-t-8"
      :boxStyle="{ width: 100 }"
    ></s-date-range>
  </div>
</template>

<style scoped lang="scss"></style>
