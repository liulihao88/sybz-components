<script setup lang="ts">
import { ref } from 'vue'

const defaultCount = ref(0)
const delayCount = ref(0)
const defaultTime = ref('-')
const delayTime = ref('-')

function getTime() {
  return new Date().toLocaleTimeString()
}

function handleDefaultClick() {
  defaultCount.value += 1
  defaultTime.value = getTime()
}

function handleDelayClick() {
  delayCount.value += 1
  delayTime.value = getTime()
}
</script>

<template>
  <div class="throttle-demo">
    <div class="throttle-demo__item">
      <el-button v-throttle="handleDefaultClick" type="primary">默认 1000ms</el-button>
      <span>执行 {{ defaultCount }} 次，最近 {{ defaultTime }}</span>
    </div>

    <div class="throttle-demo__item">
      <el-button v-throttle.3000="handleDelayClick" type="primary">自定义 3000ms</el-button>
      <span>执行 {{ delayCount }} 次，最近 {{ delayTime }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.throttle-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.throttle-demo__item {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}
</style>
